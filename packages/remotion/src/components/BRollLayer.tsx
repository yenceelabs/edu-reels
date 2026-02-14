import React from 'react';
import {
  AbsoluteFill,
  Video,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import type { BRollItem, VisualSettings } from '@edu-reels/shared';

interface BRollLayerProps {
  broll: BRollItem;
  visualSettings: VisualSettings;
}

export const BRollLayer: React.FC<BRollLayerProps> = ({
  broll,
  visualSettings,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Fade in/out
  const duration = broll.duration * fps;
  const opacity = interpolate(
    frame,
    [0, fps / 4, duration - fps / 4, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const content = broll.content;

  switch (content.type) {
    case 'text_animation':
      return (
        <TextAnimation
          text={content.text}
          style={content.style}
          fontFamily={visualSettings.fontTitle}
          accentColor={visualSettings.accentColor}
          opacity={opacity}
          fps={fps}
          width={width}
          height={height}
        />
      );

    case 'code_animation':
      return (
        <CodeAnimation
          code={content.code}
          language={content.language}
          theme={content.theme}
          opacity={opacity}
          fps={fps}
          width={width}
          height={height}
        />
      );

    case 'stock_video':
      if (!content.url) return null;
      return (
        <AbsoluteFill style={{ opacity }}>
          <Video
            src={content.url}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      );

    case 'user_upload':
      return (
        <AbsoluteFill style={{ opacity }}>
          {content.assetUrl.match(/\.(mp4|webm|mov)$/i) ? (
            <Video
              src={content.assetUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Img
              src={content.assetUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </AbsoluteFill>
      );

    default:
      return null;
  }
};

// Text Animation Component
const TextAnimation: React.FC<{
  text: string;
  style: 'pop' | 'slide' | 'fade' | 'typewriter';
  fontFamily: string;
  accentColor: string;
  opacity: number;
  fps: number;
  width: number;
  height: number;
}> = ({ text, style, fontFamily, accentColor, opacity, fps, width, height }) => {
  const frame = useCurrentFrame();

  const animationProgress = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  let transform = '';
  let textOpacity = opacity;

  switch (style) {
    case 'pop':
      const scale = interpolate(animationProgress, [0, 1], [0.5, 1]);
      transform = `scale(${scale})`;
      break;
    case 'slide':
      const translateY = interpolate(animationProgress, [0, 1], [100, 0]);
      transform = `translateY(${translateY}px)`;
      break;
    case 'fade':
      textOpacity = opacity * animationProgress;
      break;
    case 'typewriter':
      const visibleChars = Math.floor(animationProgress * text.length);
      return (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity,
            padding: 60,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
              textShadow: `0 4px 20px ${accentColor}`,
            }}
          >
            {text.slice(0, visibleChars)}
            <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
          </span>
        </AbsoluteFill>
      );
  }

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: textOpacity,
        padding: 60,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: 64,
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          transform,
          textShadow: `0 4px 20px ${accentColor}`,
        }}
      >
        {text}
      </span>
    </AbsoluteFill>
  );
};

// Code Animation Component
const CodeAnimation: React.FC<{
  code: string;
  language: string;
  theme: 'dark' | 'light';
  opacity: number;
  fps: number;
  width: number;
  height: number;
}> = ({ code, language, theme, opacity, fps, width, height }) => {
  const frame = useCurrentFrame();
  const lines = code.split('\n');

  // Typewriter effect
  const totalChars = code.length;
  const charsPerFrame = totalChars / (fps * 2); // Type over 2 seconds
  const revealedChars = Math.floor(frame * charsPerFrame);

  let charCount = 0;

  const bgColor = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const textColor = theme === 'dark' ? '#D4D4D4' : '#1E1E1E';

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        padding: 40,
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: 20,
          padding: 32,
          maxWidth: width - 80,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Window controls */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </div>

        {/* Code */}
        <pre
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 24,
            lineHeight: 1.6,
            color: textColor,
            margin: 0,
          }}
        >
          {lines.map((line, i) => {
            const lineStart = charCount;
            charCount += line.length + 1;
            const visibleLength = Math.max(0, Math.min(line.length, revealedChars - lineStart));
            
            return (
              <div key={i}>
                {line.slice(0, visibleLength)}
                {revealedChars >= lineStart && revealedChars < lineStart + line.length && (
                  <span style={{ borderRight: '2px solid #569CD6' }} />
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </AbsoluteFill>
  );
};
