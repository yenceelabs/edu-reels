import { NextResponse } from 'next/server';
import { list, del, type ListBlobResult } from '@vercel/blob';

/**
 * GET /api/cron/cleanup-blobs
 *
 * Deletes Vercel Blob files older than 7 days.
 * Triggered by Vercel cron (vercel.json) — runs daily.
 *
 * Security: Protected by CRON_SECRET header check
 * (Vercel injects this automatically for cron invocations).
 */

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET(request: Request) {
  // Verify this is a legitimate cron invocation
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cutoff = Date.now() - MAX_AGE_MS;
  let deletedCount = 0;
  let errorCount = 0;
  let cursor: string | undefined;

  try {
    // Process all blob prefixes
    for (const prefix of ['audio/', 'reels/']) {
      cursor = undefined;
      do {
        const { blobs, cursor: nextCursor }: ListBlobResult = await list({
          prefix,
          cursor,
          limit: 100,
        });

        for (const blob of blobs) {
          if (new Date(blob.uploadedAt).getTime() < cutoff) {
            try {
              await del(blob.url);
              deletedCount++;
            } catch {
              errorCount++;
            }
          }
        }

        cursor = nextCursor || undefined;
      } while (cursor);
    }

    return NextResponse.json({
      ok: true,
      deleted: deletedCount,
      errors: errorCount,
      cutoffDate: new Date(cutoff).toISOString(),
    });
  } catch (error) {
    console.error(
      'Blob cleanup cron error:',
      error instanceof Error ? error.message : 'unknown'
    );
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}
