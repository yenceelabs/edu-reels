import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Video,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { Captions } from '../components/Captions';
import { BRollLayer } from '../components/BRollLayer';
import { AvatarOverlay } from '../components/AvatarOverlay';
import { Background } from '../components/Background';
import type { ReelCompositionProps } from '@edu-reels/shared';
import { secondsToFrames } from '@edu-reels/shared';

export const EduReel: React.FC<ReelCompositionProps> = ({
  reel,
  fps,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { visualSettings, avatarSettings, voiceSettings } = reel;

  // Fade in at start
  const fadeIn = interpolate(frame, [0, fps / 2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Fade out at end
  const totalFrames = secondsToFrames(reel.voiceDuration || 60, fps);
  const fadeOut = interpolate(
    frame,
    [totalFrames - fps / 2, totalFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = fadeIn * fadeOut;

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: visualSettings.primaryColor,
      }}
    >
      {/* Background Layer */}
      <Background
        style={avatarSettings.backgroundStyle || 'gradient'}
        primaryColor={visualSettings.primaryColor}
        secondaryColor={visualSettings.secondaryColor}
        accentColor={visualSettings.accentColor}
      />

      {/* B-Roll Layers */}
      {reel.bRolls.map((broll) => (
        <Sequence
          key={broll.id}
          from={secondsToFrames(broll.startTime, fps)}
          durationInFrames={secondsToFrames(broll.duration, fps)}
        >
          <BRollLayer broll={broll} visualSettings={visualSettings} />
        </Sequence>
      ))}

      {/* Avatar Layer (if face mode) */}
      {avatarSettings.mode === 'face' && reel.avatarVideoUrl && (
        <AvatarOverlay
          videoUrl={reel.avatarVideoUrl}
          position={avatarSettings.position}
        />
      )}

      {/* Voice Audio */}
      {reel.voiceAudioUrl && <Audio src={reel.voiceAudioUrl} />}

      {/* Captions */}
      {reel.wordTimestamps && (
        <Captions
          wordTimestamps={reel.wordTimestamps}
          style={visualSettings.captionStyle}
          fontFamily={visualSettings.fontBody}
          accentColor={visualSettings.accentColor}
          fps={fps}
          avatarPosition={avatarSettings.position}
        />
      )}
    </AbsoluteFill>
  );
};
