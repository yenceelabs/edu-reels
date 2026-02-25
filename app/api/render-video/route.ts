import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';

const RenderRequestSchema = z.object({
  script: z.object({
    hook: z.string().max(1000).optional(),
    setup: z.string().max(1000).optional(),
    content: z.array(z.string().max(2000)).max(10).optional(),
    callToAction: z.string().max(500).optional(),
    fullScript: z.string().max(10000),
  }),
  voiceAudioUrl: z.string().url('voiceAudioUrl must be a valid URL (base64 data URIs not accepted)'),
  wordTimestamps: z.array(z.object({
    word: z.string().max(100),
    start: z.number(),
    end: z.number(),
  })).max(2000, 'Too many word timestamps'),
  duration: z.number().min(1).max(300),
  settings: z.object({
    voiceId: z.string().max(100),
    avatarMode: z.enum(['face', 'faceless']),
    avatarPosition: z.string().max(50).optional(),
    visualStyle: z.string().max(50),
    captionStyle: z.string().max(50),
  }),
});

// Style presets
const STYLE_COLORS: Record<string, { primary: string; accent: string }> = {
  modern_minimal: { primary: '#0f0f23', accent: '#00ff88' },
  bold_colorful: { primary: '#1a0a2e', accent: '#ff6b6b' },
  dark_professional: { primary: '#0d1117', accent: '#58a6ff' },
  bright_casual: { primary: '#fff8e7', accent: '#ff9f43' },
  neon_tech: { primary: '#0a0a0a', accent: '#00ffff' },
  clean_corporate: { primary: '#f8f9fa', accent: '#0066cc' },
};

export async function POST(request: Request) {
  try {
    // Authenticate with Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: max renders per user per day to prevent unbounded Vercel Sandbox cost.
    // Default: 3 renders per 24h window. Override via DAILY_RENDER_LIMIT env var.
    const DAILY_RENDER_LIMIT = parseInt(process.env.DAILY_RENDER_LIMIT || '3', 10);
    const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
    const rateCheck = checkRateLimit(`render:${userId}`, DAILY_RENDER_LIMIT, WINDOW_MS);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Daily render limit reached. Upgrade for more renders.',
          limit: DAILY_RENDER_LIMIT,
          resetAt: new Date(rateCheck.resetAt).toISOString(),
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = RenderRequestSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { script, voiceAudioUrl, wordTimestamps, duration, settings } = parseResult.data;
    const colors = STYLE_COLORS[settings.visualStyle] || STYLE_COLORS.modern_minimal;

    // Build render props
    const renderProps = {
      audioUrl: voiceAudioUrl,
      wordTimestamps,
      duration,
      captionStyle: settings.captionStyle as 'tiktok_bounce' | 'highlight_word' | 'subtitle_classic',
      primaryColor: colors.primary,
      accentColor: colors.accent,
    };

    // Try different rendering backends in order of preference

    // 1. Vercel Sandbox (no AWS, no API key — just Vercel Blob Storage)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      return await renderWithVercelSandbox(renderProps, userId);
    }

    // 2. Self-hosted render server
    if (process.env.RENDER_SERVER_URL) {
      return await renderWithServer(renderProps, userId);
    }

    // 3. Demo mode - BLOB_READ_WRITE_TOKEN not configured
    return NextResponse.json({
      status: 'demo',
      duration,
      message: 'Video rendering requires BLOB_READ_WRITE_TOKEN (Vercel Blob Storage). Create a Blob store in your Vercel project dashboard.',
      script: script.fullScript,
      wordTimestamps,
      renderProps,
    });
  } catch (error) {
    console.error('Render video error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json(
      { error: 'Failed to render video' },
      { status: 500 }
    );
  }
}

// Vercel Sandbox rendering — uses @remotion/vercel + @vercel/blob (no AWS needed)
// Note: @remotion/bundler and @remotion/vercel cannot be statically imported in Next.js webpack context.
// We use dynamic require() to load them at runtime only (Node.js API route, never in browser bundle).
async function renderWithVercelSandbox(props: any, userId: string) {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://edu-reels-two.vercel.app';

  // Dynamically import to avoid webpack bundling issues
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createSandbox, addBundleToSandbox, renderMediaOnVercel, uploadToVercelBlob } = require('@remotion/vercel');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { bundle } = require('@remotion/bundler');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');

  // 1. Bundle the Remotion composition (at render time, not build time)
  const bundleDir: string = await bundle({
    entryPoint: path.join(process.cwd(), 'lib/remotion/index.tsx'),
    webpackOverride: (config: any) => config,
  });

  // 2. Create ephemeral Vercel Sandbox VM
  const sandbox = await createSandbox();

  // 3. Upload bundle to sandbox
  await addBundleToSandbox({ sandbox, bundleDir });

  // 4. Render video inside the sandbox
  const renderId = `reel-${userId}-${Date.now()}`;
  const { sandboxFilePath, contentType } = await renderMediaOnVercel({
    sandbox,
    compositionId: 'EduReel',
    inputProps: props,
    codec: 'h264',
    outputFile: `${renderId}.mp4`,
    timeoutInMilliseconds: 240000, // 4 min max
  });

  // 5. Upload rendered video from sandbox to Vercel Blob (persistent)
  const { url } = await uploadToVercelBlob({
    sandbox,
    sandboxFilePath,
    blobPath: `reels/${userId}/${renderId}.mp4`,
    contentType,
    blobToken,
    access: 'public',
  });

  return NextResponse.json({
    status: 'completed',
    videoUrl: url,
    duration: props.duration,
    renderId,
  });
}

// Self-hosted render server
async function renderWithServer(props: any, userId: string) {
  const response = await fetch(`${process.env.RENDER_SERVER_URL}/render`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RENDER_SERVER_SECRET || ''}`,
    },
    body: JSON.stringify({
      composition: 'SimpleReel',
      inputProps: props,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Render server failed');
  }

  const result = await response.json();
  
  return NextResponse.json({
    status: 'completed',
    videoUrl: result.videoUrl,
    duration: props.duration,
  });
}
