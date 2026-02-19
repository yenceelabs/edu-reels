'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { POSTHOG_KEY, POSTHOG_HOST } from '@/lib/posthog-config';

// Init PostHog once on client (only if key is configured)
if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
  });
}

function PageviewTracker() {
  const ph = usePostHog();
  const pathname = usePathname();

  useEffect(() => {
    if (POSTHOG_KEY && pathname) {
      ph?.capture('$pageview', {
        $current_url: window.location.href,
      });
    }
  }, [ph, pathname]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PageviewTracker />
      {children}
    </PHProvider>
  );
}
