/**
 * Rate limiter with dual-layer defense:
 *
 * Layer 1: In-memory Map (per-container burst protection, instant)
 * Layer 2: Clerk user metadata (cross-container persistence, survives cold starts)
 *
 * The in-memory layer catches rapid-fire abuse within a warm container.
 * The Clerk layer ensures limits persist across cold starts and containers.
 */

import { clerkClient } from '@clerk/nextjs/server';

// ---- Layer 1: In-memory (per-container) ----

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, RateLimitEntry>();

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
 * In-memory rate limit check (fast, per-container).
 */
export function checkRateLimitLocal(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
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

// ---- Layer 2: Clerk metadata (cross-container) ----

interface RenderUsage {
  count: number;
  windowStart: number; // epoch ms
}

/**
 * Persistent rate limit using Clerk user publicMetadata.
 * Tracks render count across all serverless containers.
 *
 * @returns { allowed, remaining, resetAt } or null if Clerk call fails (fail-open to Layer 1)
 */
export async function checkRateLimitPersistent(
  userId: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number } | null> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const meta = (user.publicMetadata || {}) as Record<string, unknown>;
    const usage = (meta.renderUsage as RenderUsage | undefined) || { count: 0, windowStart: 0 };
    const now = Date.now();

    // Window expired — reset
    if (now - usage.windowStart >= windowMs) {
      const newUsage: RenderUsage = { count: 1, windowStart: now };
      await client.users.updateUser(userId, {
        publicMetadata: { ...meta, renderUsage: newUsage },
      });
      return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
    }

    // Within window — check limit
    if (usage.count >= limit) {
      const resetAt = usage.windowStart + windowMs;
      return { allowed: false, remaining: 0, resetAt };
    }

    // Increment
    const newUsage: RenderUsage = { count: usage.count + 1, windowStart: usage.windowStart };
    await client.users.updateUser(userId, {
      publicMetadata: { ...meta, renderUsage: newUsage },
    });
    const resetAt = usage.windowStart + windowMs;
    return { allowed: true, remaining: limit - (usage.count + 1), resetAt };
  } catch (error) {
    // Fail open — fall back to in-memory only (better than crashing)
    console.error('Clerk rate limit check failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
}

/**
 * Combined rate limit check: persistent (Clerk) first, in-memory as fallback.
 * Both must allow the request for it to proceed.
 */
export async function checkRateLimit(
  userId: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  // Layer 2: Persistent check (Clerk metadata)
  const persistent = await checkRateLimitPersistent(userId, limit, windowMs);

  if (persistent !== null) {
    // Persistent store available — use it as source of truth
    if (!persistent.allowed) {
      return persistent;
    }
    // Also update local cache for same-container burst protection
    checkRateLimitLocal(`render:${userId}`, limit, windowMs);
    return persistent;
  }

  // Layer 1 fallback: In-memory only (Clerk unavailable)
  return checkRateLimitLocal(`render:${userId}`, limit, windowMs);
}
