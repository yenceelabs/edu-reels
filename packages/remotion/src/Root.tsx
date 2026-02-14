import React from 'react';
import { Composition, Folder } from 'remotion';
import { SimpleReel } from './compositions/SimpleReel';

// Inline constants to avoid import issues
const VIDEO_FPS = 30;
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;

export const Root: React.FC = () => {
  return (
    <>
      {/* SimpleReel - Primary composition for rendering */}
      <Composition
        id="SimpleReel"
        component={SimpleReel}
        durationInFrames={VIDEO_FPS * 60}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          audioUrl: '',
          wordTimestamps: [
            { word: 'Hello', start: 0, end: 0.5 },
            { word: 'World', start: 0.5, end: 1 },
          ],
          duration: 60,
          captionStyle: 'tiktok_bounce' as const,
          primaryColor: '#0f0f23',
          accentColor: '#00ff88',
        }}
      />

      {/* Duration variants */}
      <Folder name="Durations">
        <Composition
          id="SimpleReel-15s"
          component={SimpleReel}
          durationInFrames={VIDEO_FPS * 15}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            audioUrl: '',
            wordTimestamps: [],
            duration: 15,
            captionStyle: 'tiktok_bounce' as const,
            primaryColor: '#0f0f23',
            accentColor: '#00ff88',
          }}
        />
        <Composition
          id="SimpleReel-30s"
          component={SimpleReel}
          durationInFrames={VIDEO_FPS * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            audioUrl: '',
            wordTimestamps: [],
            duration: 30,
            captionStyle: 'tiktok_bounce' as const,
            primaryColor: '#0f0f23',
            accentColor: '#00ff88',
          }}
        />
        <Composition
          id="SimpleReel-90s"
          component={SimpleReel}
          durationInFrames={VIDEO_FPS * 90}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            audioUrl: '',
            wordTimestamps: [],
            duration: 90,
            captionStyle: 'tiktok_bounce' as const,
            primaryColor: '#0f0f23',
            accentColor: '#00ff88',
          }}
        />
      </Folder>
    </>
  );
};
