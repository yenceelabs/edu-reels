import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import type { WordTimestamp, CaptionStyle } from '@edu-reels/shared';
import { getCaptionPosition, secondsToFrames } from '@edu-reels/shared';

interface CaptionsProps {
  wordTimestamps: WordTimestamp[];
  style: CaptionStyle;
  fontFamily: string;
  accentColor: string;
  fps: number;
  avatarPosition: string;
}

export const Captions: React.FC<CaptionsProps> = ({
  wordTimestamps,
  style,
  fontFamily,
  accentColor,
  fps,
  avatarPosition,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const currentTime = frame / fps;
  const position = getCaptionPosition(avatarPosition);

  // Find visible words (3 words at a time for TikTok style)
  const wordsPerGroup = 3;
  const currentWordIndex = wordTimestamps.findIndex(
    (w, i) =>
      currentTime >= w.start &&
      (i === wordTimestamps.length - 1 || currentTime < wordTimestamps[i + 1].start)
  );

  const groupStart = Math.floor(currentWordIndex / wordsPerGroup) * wordsPerGroup;
  const visibleWords = wordTimestamps.slice(groupStart, groupStart + wordsPerGroup);

  if (visibleWords.length === 0 || style === 'none') return null;

  const positionStyles = getPositionStyles(position, height);

  if (style === 'tiktok_bounce') {
    return (
      <TikTokCaptions
        words={visibleWords}
        currentWordIndex={currentWordIndex}
        groupStart={groupStart}
        fontFamily={fontFamily}
        accentColor={accentColor}
        fps={fps}
        positionStyles={positionStyles}
        width={width}
      />
    );
  }

  if (style === 'highlight_word') {
    return (
      <HighlightCaptions
        words={visibleWords}
        currentWordIndex={currentWordIndex}
        groupStart={groupStart}
        fontFamily={fontFamily}
        accentColor={accentColor}
        positionStyles={positionStyles}
        width={width}
      />
    );
  }

  // Default: subtitle_classic
  return (
    <ClassicCaptions
      words={visibleWords}
      fontFamily={fontFamily}
      positionStyles={positionStyles}
      width={width}
    />
  );
};

// Position helper
function getPositionStyles(position: string, height: number): React.CSSProperties {
  switch (position) {
    case 'top':
      return { top: height * 0.15 };
    case 'center':
      return { top: '50%', transform: 'translateY(-50%)' };
    case 'bottom':
    default:
      return { bottom: height * 0.2 };
  }
}

// TikTok-style bouncing captions
const TikTokCaptions: React.FC<{
  words: WordTimestamp[];
  currentWordIndex: number;
  groupStart: number;
  fontFamily: string;
  accentColor: string;
  fps: number;
  positionStyles: React.CSSProperties;
  width: number;
}> = ({ words, currentWordIndex, groupStart, fontFamily, accentColor, fps, positionStyles, width }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        ...positionStyles,
      }}
    >
      {words.map((word, i) => {
        const absoluteIndex = groupStart + i;
        const isCurrentWord = absoluteIndex === currentWordIndex;
        const wordFrame = secondsToFrames(word.start, fps);

        // Bounce animation
        const bounce = isCurrentWord
          ? spring({
              frame: frame - wordFrame,
              fps,
              config: { damping: 10, mass: 0.5, stiffness: 200 },
            })
          : 1;

        const scale = interpolate(bounce, [0, 1], [0.8, 1]);
        const translateY = interpolate(bounce, [0, 0.5, 1], [20, -10, 0]);

        return (
          <span
            key={`${word.word}-${absoluteIndex}`}
            style={{
              fontFamily,
              fontSize: 72,
              fontWeight: 900,
              color: isCurrentWord ? accentColor : '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transform: `scale(${scale}) translateY(${translateY}px)`,
              textTransform: 'uppercase',
            }}
          >
            {word.word}
          </span>
        );
      })}
    </div>
  );
};

// Highlight word captions
const HighlightCaptions: React.FC<{
  words: WordTimestamp[];
  currentWordIndex: number;
  groupStart: number;
  fontFamily: string;
  accentColor: string;
  positionStyles: React.CSSProperties;
  width: number;
}> = ({ words, currentWordIndex, groupStart, fontFamily, accentColor, positionStyles, width }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
        ...positionStyles,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: 16,
          padding: '16px 32px',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: width - 80,
        }}
      >
        {words.map((word, i) => {
          const absoluteIndex = groupStart + i;
          const isCurrentWord = absoluteIndex === currentWordIndex;

          return (
            <span
              key={`${word.word}-${absoluteIndex}`}
              style={{
                fontFamily,
                fontSize: 48,
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: isCurrentWord ? accentColor : 'transparent',
                padding: isCurrentWord ? '4px 12px' : '4px 0',
                borderRadius: 8,
                transition: 'background-color 0.1s',
              }}
            >
              {word.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Classic subtitle captions
const ClassicCaptions: React.FC<{
  words: WordTimestamp[];
  fontFamily: string;
  positionStyles: React.CSSProperties;
  width: number;
}> = ({ words, fontFamily, positionStyles, width }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
        ...positionStyles,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: 8,
          padding: '12px 24px',
          maxWidth: width - 80,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 500,
            color: '#FFFFFF',
          }}
        >
          {words.map((w) => w.word).join(' ')}
        </span>
      </div>
    </div>
  );
};
