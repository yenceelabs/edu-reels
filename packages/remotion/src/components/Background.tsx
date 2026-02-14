import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
} from 'remotion';

interface BackgroundProps {
  style: 'gradient' | 'solid' | 'animated' | 'stock';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  videoUrl?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  style,
  primaryColor,
  secondaryColor,
  accentColor,
  videoUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  if (style === 'solid') {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: primaryColor,
        }}
      />
    );
  }

  if (style === 'gradient') {
    return (
      <AbsoluteFill>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (style === 'animated') {
    // Animated gradient background
    const progress = (frame / fps) * 0.5; // Slow rotation
    const rotation = (progress * 360) % 360;

    // Floating orbs
    const orb1Y = interpolate(
      Math.sin(frame / 30),
      [-1, 1],
      [height * 0.2, height * 0.4]
    );
    const orb2Y = interpolate(
      Math.sin(frame / 25 + 1),
      [-1, 1],
      [height * 0.5, height * 0.7]
    );
    const orb3Y = interpolate(
      Math.sin(frame / 35 + 2),
      [-1, 1],
      [height * 0.6, height * 0.8]
    );

    return (
      <AbsoluteFill>
        {/* Base gradient */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(${rotation}deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${primaryColor} 100%)`,
          }}
        />

        {/* Floating orbs */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            left: width * 0.1,
            top: orb1Y,
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${secondaryColor}50 0%, transparent 70%)`,
            right: width * 0.15,
            top: orb2Y,
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            left: width * 0.4,
            top: orb3Y,
            filter: 'blur(40px)',
          }}
        />
      </AbsoluteFill>
    );
  }

  // Default
  return (
    <AbsoluteFill
      style={{
        backgroundColor: primaryColor,
      }}
    />
  );
};
