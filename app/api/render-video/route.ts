import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { renderMediaOnVercel } from '@remotion/vercel';
import { put } from '@vercel/blob';

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

    // 2. Remotion Lambda (via function URL)
    if (process.env.REMOTION_LAMBDA_URL) {
      return await renderWithLambda(renderProps, userId);
    }

    // 3. Remotion Cloud (managed service)
    if (process.env.REMOTION_CLOUD_API_KEY) {
      return await renderWithCloud(renderProps, userId);
    }

    // 4. Self-hosted render server
    if (process.env.RENDER_SERVER_URL) {
      return await renderWithServer(renderProps, userId);
    }

    // 5. Demo mode - return explanation + sample video
    return NextResponse.json({
      status: 'demo',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration,
      message: 'Video rendering requires one of: REMOTION_LAMBDA_URL (Lambda), REMOTION_CLOUD_API_KEY (Cloud), or RENDER_SERVER_URL (self-hosted)',
      script: script.fullScript,
      wordTimestamps,
      renderProps, // Return props so they can be used elsewhere
    });
  } catch (error) {
    console.error('Render video error:', error);
    return NextResponse.json(
      { error: 'Failed to render video' },
      { status: 500 }
    );
  }
}

// Vercel Sandbox rendering — uses @remotion/vercel + @vercel/blob (no AWS needed)
async function renderWithVercelSandbox(props: any, userId: string) {
  const { serveUrl, renderId } = await renderMediaOnVercel({
    composition: 'EduReel',
    serveUrl: process.env.REMOTION_SERVE_URL || `${process.env.NEXT_PUBLIC_APP_URL || 'https://edu-reels-two.vercel.app'}/remotion`,
    inputProps: props,
    codec: 'h264',
    outName: `reel-${userId}-${Date.now()}.mp4`,
    timeoutInMilliseconds: 240000, // 4 min max
  });

  // Upload rendered video to Vercel Blob for persistent storage
  const videoBuffer = await fetch(serveUrl).then(r => r.arrayBuffer());
  const blob = await put(`reels/${userId}/${renderId}.mp4`, videoBuffer, {
    access: 'public',
    contentType: 'video/mp4',
  });

  return NextResponse.json({
    status: 'completed',
    videoUrl: blob.url,
    duration: props.duration,
    renderId,
  });
}

// Remotion Lambda rendering via AWS Lambda invoke (no SDK dependency)
async function renderWithLambda(props: any, userId: string) {
  // Use fetch to invoke Lambda directly via function URL or API Gateway
  const lambdaUrl = process.env.REMOTION_LAMBDA_URL;
  if (!lambdaUrl) {
    throw new Error('REMOTION_LAMBDA_URL not configured');
  }

  const response = await fetch(lambdaUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.REMOTION_LAMBDA_API_KEY || '',
    },
    body: JSON.stringify({
      composition: 'SimpleReel',
      inputProps: props,
      codec: 'h264',
      outName: `reel-${userId}-${Date.now()}.mp4`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Lambda render failed: ${response.statusText}`);
  }

  const result = await response.json();

  return NextResponse.json({
    status: 'completed',
    videoUrl: result.outputFile || result.videoUrl,
    duration: props.duration,
  });
}

// Remotion Cloud rendering (managed service)
async function renderWithCloud(props: any, userId: string) {
  const response = await fetch('https://api.remotion.dev/render', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REMOTION_CLOUD_API_KEY}`,
    },
    body: JSON.stringify({
      composition: 'SimpleReel',
      inputProps: props,
      codec: 'h264',
      serveUrl: process.env.REMOTION_SERVE_URL,
    }),
  });

  if (!response.ok) {
    throw new Error('Remotion Cloud render failed');
  }

  const result = await response.json();
  
  return NextResponse.json({
    status: 'completed',
    videoUrl: result.outputUrl,
    duration: props.duration,
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
