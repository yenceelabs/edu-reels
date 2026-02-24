export const COMPARE_PAGES = [
  { href: '/compare/synthesia', label: 'vs Synthesia' },
  { href: '/use-case/educators', label: 'For Educators' },
] as const;

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://edu-reels-two.vercel.app';

/** Generate a dynamic OG image URL for a compare page */
export function getCompareOgImage(competitor: string): string {
  return `${BASE_URL}/og?page=compare&competitor=${encodeURIComponent(competitor)}`;
}

/** Default OG image for generic compare pages */
export const COMPARE_OG_IMAGE = `${BASE_URL}/og?page=compare`;
