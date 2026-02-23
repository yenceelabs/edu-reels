/**
 * In-memory rate limiter for serverless environments.
 *
 * Provides per-container burst protection. Each Vercel serverless cold start
 * resets the map, but within a warm container this prevents any single user
 * from hammering expensive endpoints.
 *
 * TODO: Replace with Supabase or Upstash Redis when a persistent store is
 * added to EduReels. Track usage in a `user_renders` table for cross-container
 * limits and proper billing.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

/**
 * Check and increment rate limit for a given key.
 *
 * @param key - Unique identifier (e.g. userId)
 * @param limit - Max allowed requests in the window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    // First request or window expired — start fresh
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
