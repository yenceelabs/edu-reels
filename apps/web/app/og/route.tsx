import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'compare';
  const competitor = searchParams.get('competitor') || '';

  // Build title based on params
  let title = 'EduReels';
  let subtitle = 'Free AI Educational Video Creator';

  if (page === 'compare' && competitor) {
    title = `EduReels vs ${competitor}`;
    subtitle = 'Free AI Educational Videos — No Subscription Required';
  } else if (page === 'compare') {
    title = 'EduReels vs Competitors';
    subtitle = 'Free AI Educational Video Creator';
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
          padding: 60,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#7c3aed',
              fontSize: 28,
            }}
          >
            🎬
          </div>
          <span
            style={{
              color: '#a78bfa',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            EDUREELS
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontSize: competitor ? 56 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: '#94a3b8',
              fontSize: 28,
              fontWeight: 400,
              margin: 0,
              maxWidth: 800,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 40,
            padding: '10px 24px',
            borderRadius: 999,
            background: 'rgba(124, 58, 237, 0.2)',
            border: '1px solid rgba(124, 58, 237, 0.4)',
          }}
        >
          <span style={{ color: '#c4b5fd', fontSize: 18, fontWeight: 500 }}>
            ✨ Free forever — No credit card required
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
