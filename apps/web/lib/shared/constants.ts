// ============================================
// EduReels - Constants
// ============================================

// Video Settings (Vertical 9:16)
export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

// Reel Duration Options
export const REEL_DURATIONS = [15, 30, 60, 90] as const;
export const DEFAULT_REEL_DURATION = 60;

// Visual Style Presets
export const STYLE_PRESETS = {
  modern_minimal: {
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    accentColor: '#3B82F6',
    fontTitle: 'Inter',
    fontBody: 'Inter',
  },
  bold_colorful: {
    primaryColor: '#FF6B6B',
    secondaryColor: '#4ECDC4',
    accentColor: '#FFE66D',
    fontTitle: 'Poppins',
    fontBody: 'Inter',
  },
  dark_professional: {
    primaryColor: '#1A1A2E',
    secondaryColor: '#16213E',
    accentColor: '#E94560',
    fontTitle: 'Montserrat',
    fontBody: 'Inter',
  },
  bright_casual: {
    primaryColor: '#FFEAA7',
    secondaryColor: '#FDCB6E',
    accentColor: '#6C5CE7',
    fontTitle: 'Nunito',
    fontBody: 'Nunito',
  },
  neon_tech: {
    primaryColor: '#0D0D0D',
    secondaryColor: '#1A1A1A',
    accentColor: '#00FF88',
    fontTitle: 'Space Grotesk',
    fontBody: 'JetBrains Mono',
  },
  clean_corporate: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#F5F5F5',
    accentColor: '#2563EB',
    fontTitle: 'Plus Jakarta Sans',
    fontBody: 'Inter',
  },
};

// Default Settings
export const DEFAULT_VOICE_SETTINGS = {
  provider: 'elevenlabs' as const,
  voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah
  voiceName: 'Sarah',
  speed: 1.1, // Slightly faster for reels
  emotion: 'excited' as const,
};

export const DEFAULT_AVATAR_SETTINGS = {
  mode: 'faceless' as const,
  position: 'bottom_third' as const,
  backgroundStyle: 'gradient' as const,
};

export const DEFAULT_VISUAL_SETTINGS = {
  style: 'modern_minimal' as const,
  ...STYLE_PRESETS.modern_minimal,
  captionStyle: 'tiktok_bounce' as const,
};

// ElevenLabs Voices (energetic voices for reels)
export const ELEVENLABS_VOICES = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female', style: 'energetic' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male', style: 'confident' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', gender: 'female', style: 'warm' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', gender: 'female', style: 'youthful' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', gender: 'male', style: 'authoritative' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'male', style: 'casual' },
];

// Caption Animation Configs
export const CAPTION_CONFIGS = {
  tiktok_bounce: {
    wordsPerLine: 3,
    animationDuration: 0.15,
    bounce: true,
    scale: 1.2,
  },
  highlight_word: {
    wordsPerLine: 4,
    highlightColor: '#FFFF00',
    backgroundColor: '#000000CC',
  },
  karaoke: {
    wordsPerLine: 5,
    fillColor: '#FFD700',
    emptyColor: '#FFFFFF80',
  },
  subtitle_classic: {
    wordsPerLine: 6,
    backgroundColor: '#000000CC',
    position: 'bottom',
  },
};

// Script Generation Prompts
export const SCRIPT_TEMPLATES = {
  hook_heavy: `Create a viral educational reel script that starts with a powerful hook.
Structure:
1. HOOK (0-3 sec): Provocative question or surprising fact
2. CONTENT (4-50 sec): Key educational points
3. CTA (last 5 sec): Call to action`,
  
  story_driven: `Create an educational reel using storytelling.
Structure:
1. SETUP (0-5 sec): Introduce a relatable scenario
2. CONFLICT (6-40 sec): Present the problem and solution
3. RESOLUTION (41-55 sec): Key takeaway
4. CTA (56-60 sec): Call to action`,
  
  fact_based: `Create a fact-based educational reel.
Structure:
1. HOOK (0-3 sec): "Did you know..." style opener
2. FACTS (4-50 sec): 3-5 surprising facts with context
3. SUMMARY (51-55 sec): Quick recap
4. CTA (56-60 sec): Call to action`,
  
  tutorial: `Create a quick tutorial reel.
Structure:
1. PROMISE (0-3 sec): "Here's how to..."
2. STEPS (4-50 sec): 3-5 clear steps
3. RESULT (51-55 sec): Show the outcome
4. CTA (56-60 sec): Call to action`,
};

// B-Roll Categories
export const BROLL_CATEGORIES = {
  tech: ['code', 'computer', 'developer', 'programming', 'software'],
  business: ['office', 'meeting', 'presentation', 'growth', 'success'],
  science: ['lab', 'experiment', 'research', 'data', 'innovation'],
  lifestyle: ['productivity', 'workspace', 'morning routine', 'habits'],
  creative: ['design', 'art', 'creative', 'studio', 'inspiration'],
};

// File Limits
export const UPLOAD_LIMITS = {
  maxFileSize: 100 * 1024 * 1024, // 100MB for reels
  allowedVideoTypes: ['video/mp4', 'video/webm'],
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxReelsPerBatch: 50,
};
