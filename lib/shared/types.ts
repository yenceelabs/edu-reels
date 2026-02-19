// ============================================
// EduReels - Core Types
// ============================================

// Reel Status
export type ReelStatus = 
  | 'draft'
  | 'generating_script'
  | 'generating_voice'
  | 'generating_avatar'
  | 'generating_broll'
  | 'rendering'
  | 'completed'
  | 'failed';

// Avatar Mode
export type AvatarMode = 'face' | 'faceless';

// Visual Style for Reels
export type ReelStyle = 
  | 'modern_minimal'
  | 'bold_colorful'
  | 'dark_professional'
  | 'bright_casual'
  | 'neon_tech'
  | 'clean_corporate';

// Caption Style
export type CaptionStyle = 
  | 'tiktok_bounce'      // Bouncing word-by-word
  | 'highlight_word'     // Highlight current word
  | 'karaoke'            // Karaoke style fill
  | 'subtitle_classic'   // Traditional subtitles
  | 'none';

// B-Roll Types for Reels
export type BRollType = 
  | 'stock_video'
  | 'animated_graphics'
  | 'code_animation'
  | 'diagram_reveal'
  | 'text_animation'
  | 'icon_animation'
  | 'screen_recording'
  | 'user_upload';

// Voice Settings
export interface VoiceSettings {
  provider: 'elevenlabs';
  voiceId: string;
  voiceName: string;
  speed: number;
  emotion?: 'neutral' | 'excited' | 'calm' | 'professional';
}

// Avatar Settings
export interface AvatarSettings {
  mode: AvatarMode;
  // For 'face' mode
  provider?: 'heygen' | 'custom';
  avatarId?: string;
  avatarName?: string;
  customAvatarUrl?: string;
  // Position on screen
  position: 'full' | 'corner_br' | 'corner_bl' | 'corner_tr' | 'corner_tl' | 'bottom_third';
  // For faceless mode
  backgroundStyle?: 'gradient' | 'solid' | 'animated' | 'stock';
}

// Visual Style Settings
export interface VisualSettings {
  style: ReelStyle;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontTitle: string;
  fontBody: string;
  captionStyle: CaptionStyle;
}

// Generated Script
export interface GeneratedScript {
  hook: string;           // Opening hook (1-3 seconds)
  content: string[];      // Main content points
  callToAction: string;   // CTA at the end
  fullScript: string;     // Complete narration script
  estimatedDuration: number;
}

// B-Roll Item
export interface BRollItem {
  id: string;
  type: BRollType;
  startTime: number;
  duration: number;
  content: BRollContent;
}

export type BRollContent = 
  | { type: 'stock_video'; query: string; url?: string }
  | { type: 'animated_graphics'; animation: string; data: Record<string, unknown> }
  | { type: 'code_animation'; language: string; code: string; theme: 'dark' | 'light' }
  | { type: 'diagram_reveal'; diagramType: string; steps: string[] }
  | { type: 'text_animation'; text: string; style: 'pop' | 'slide' | 'fade' | 'typewriter' }
  | { type: 'icon_animation'; iconSet: string; icons: string[] }
  | { type: 'user_upload'; assetUrl: string };

// Concept (Input)
export interface Concept {
  id: string;
  topic: string;
  targetAudience?: string;
  keyPoints?: string[];
  tone?: 'educational' | 'casual' | 'professional' | 'entertaining';
  duration?: 15 | 30 | 60 | 90; // Reel duration in seconds
}

// Reel
export interface Reel {
  id: string;
  userId: string;
  projectId?: string;
  concept: Concept;
  script?: GeneratedScript;
  voiceSettings: VoiceSettings;
  avatarSettings: AvatarSettings;
  visualSettings: VisualSettings;
  bRolls: BRollItem[];
  status: ReelStatus;
  // Generated assets
  voiceAudioUrl?: string;
  voiceDuration?: number;
  wordTimestamps?: WordTimestamp[];
  avatarVideoUrl?: string;
  outputUrl?: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

// Project (Batch of Reels)
export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  // Shared settings for batch production
  defaultVoiceSettings: VoiceSettings;
  defaultAvatarSettings: AvatarSettings;
  defaultVisualSettings: VisualSettings;
  reels: Reel[];
  createdAt: Date;
  updatedAt: Date;
}

// User Asset
export interface Asset {
  id: string;
  userId: string;
  type: 'video' | 'audio' | 'image' | 'avatar';
  filename: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  createdAt: Date;
}

// Render Job
export interface RenderJob {
  id: string;
  reelId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  outputUrl?: string;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

// Batch Job
export interface BatchJob {
  id: string;
  projectId: string;
  reelIds: string[];
  status: 'queued' | 'processing' | 'completed' | 'partial' | 'failed';
  progress: number;
  completedCount: number;
  failedCount: number;
  startedAt?: Date;
  completedAt?: Date;
}

// API Types
export interface GenerateScriptRequest {
  concept: Concept;
  style?: 'hook_heavy' | 'story_driven' | 'fact_based' | 'tutorial';
}

export interface GenerateScriptResponse {
  script: GeneratedScript;
  suggestedBRolls: BRollItem[];
}

// Remotion Composition Props
export interface ReelCompositionProps {
  reel: Reel;
  fps: number;
  width: number;
  height: number;
}
