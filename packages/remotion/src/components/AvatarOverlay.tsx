import React from 'react';
import { Video, useVideoConfig } from 'remotion';

interface AvatarOverlayProps {
  videoUrl: string;
  position: 'full' | 'corner_br' | 'corner_bl' | 'corner_tr' | 'corner_tl' | 'bottom_third';
}

export const AvatarOverlay: React.FC<AvatarOverlayProps> = ({
  videoUrl,
  position,
}) => {
  const { width, height } = useVideoConfig();

  const positionStyles = getPositionStyles(position, width, height);

  return (
    <div style={positionStyles}>
      <Video
        src={videoUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: position === 'full' ? 0 : 20,
        }}
      />
    </div>
  );
};

function getPositionStyles(
  position: AvatarOverlayProps['position'],
  width: number,
  height: number
): React.CSSProperties {
  const cornerSize = {
    width: width * 0.35,
    height: width * 0.35, // Square for corners
  };

  const bottomThirdSize = {
    width: width,
    height: height * 0.4,
  };

  switch (position) {
    case 'full':
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };

    case 'corner_br':
      return {
        position: 'absolute',
        bottom: 40,
        right: 40,
        ...cornerSize,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      };

    case 'corner_bl':
      return {
        position: 'absolute',
        bottom: 40,
        left: 40,
        ...cornerSize,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      };

    case 'corner_tr':
      return {
        position: 'absolute',
        top: 80, // Account for status bar
        right: 40,
        ...cornerSize,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      };

    case 'corner_tl':
      return {
        position: 'absolute',
        top: 80,
        left: 40,
        ...cornerSize,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      };

    case 'bottom_third':
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: bottomThirdSize.height,
        // Gradient mask at top
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
      };

    default:
      return {
        position: 'absolute',
        bottom: 40,
        right: 40,
        ...cornerSize,
      };
  }
}
