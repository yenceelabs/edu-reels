// ============================================
// EduReels - Utility Functions
// ============================================

import { VIDEO_FPS, REEL_DURATIONS } from './constants';
import type { Concept, GeneratedScript } from './types';

/**
 * Convert seconds to frames
 */
export function secondsToFrames(seconds: number, fps: number = VIDEO_FPS): number {
  return Math.round(seconds * fps);
}

/**
 * Convert frames to seconds
 */
export function framesToSeconds(frames: number, fps: number = VIDEO_FPS): number {
  return frames / fps;
}

/**
 * Format duration for display (0:30 format)
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Estimate word count for target duration
 * Reels typically have faster speech (~180 WPM)
 */
export function estimateWordCount(durationSeconds: number): number {
  const wordsPerMinute = 180;
  return Math.floor((durationSeconds / 60) * wordsPerMinute);
}

/**
 * Estimate duration from word count
 */
export function estimateDuration(wordCount: number): number {
  const wordsPerMinute = 180;
  return (wordCount / wordsPerMinute) * 60;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate reel duration
 */
export function isValidDuration(duration: number): boolean {
  return REEL_DURATIONS.includes(duration as typeof REEL_DURATIONS[number]);
}

/**
 * Build GPT prompt for script generation
 */
export function buildScriptPrompt(concept: Concept, template: string): string {
  const targetWords = estimateWordCount(concept.duration || 60);
  
  return `
${template}

CONCEPT: ${concept.topic}
${concept.targetAudience ? `TARGET AUDIENCE: ${concept.targetAudience}` : ''}
${concept.keyPoints?.length ? `KEY POINTS TO COVER:\n${concept.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}` : ''}
TONE: ${concept.tone || 'educational'}
TARGET DURATION: ${concept.duration || 60} seconds (~${targetWords} words)

Write a script that:
1. Hooks viewers in the first 3 seconds
2. Delivers value quickly and clearly
3. Uses conversational, engaging language
4. Ends with a clear call-to-action
5. Is approximately ${targetWords} words

Output format:
{
  "hook": "Opening line (first 3 seconds)",
  "content": ["Point 1", "Point 2", "Point 3"],
  "callToAction": "Ending CTA",
  "fullScript": "Complete narration script word for word"
}
`;
}

/**
 * Parse GPT response to GeneratedScript
 */
export function parseScriptResponse(response: string): GeneratedScript {
  try {
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        hook: parsed.hook || '',
        content: parsed.content || [],
        callToAction: parsed.callToAction || parsed.cta || '',
        fullScript: parsed.fullScript || parsed.script || '',
        estimatedDuration: estimateDuration(
          (parsed.fullScript || parsed.script || '').split(/\s+/).length
        ),
      };
    }
  } catch {
    // Fallback: treat entire response as script
  }
  
  return {
    hook: '',
    content: [],
    callToAction: '',
    fullScript: response,
    estimatedDuration: estimateDuration(response.split(/\s+/).length),
  };
}

/**
 * Split script into timed segments for captions
 */
export function splitScriptForCaptions(
  script: string,
  wordTimestamps: { word: string; start: number; end: number }[]
): { text: string; start: number; end: number }[] {
  const segments: { text: string; start: number; end: number }[] = [];
  const wordsPerSegment = 3; // TikTok style
  
  for (let i = 0; i < wordTimestamps.length; i += wordsPerSegment) {
    const segmentWords = wordTimestamps.slice(i, i + wordsPerSegment);
    if (segmentWords.length === 0) continue;
    
    segments.push({
      text: segmentWords.map(w => w.word).join(' '),
      start: segmentWords[0].start,
      end: segmentWords[segmentWords.length - 1].end,
    });
  }
  
  return segments;
}

/**
 * Suggest B-roll based on script content
 */
export function suggestBRoll(script: string): string[] {
  const keywords = script.toLowerCase();
  const suggestions: string[] = [];
  
  // Tech keywords
  if (/code|programming|developer|software|app/.test(keywords)) {
    suggestions.push('code_animation', 'screen_recording');
  }
  
  // Business keywords
  if (/business|money|success|grow|startup/.test(keywords)) {
    suggestions.push('animated_graphics', 'stock_video');
  }
  
  // Process/steps keywords
  if (/step|first|then|next|finally|how to/.test(keywords)) {
    suggestions.push('diagram_reveal', 'text_animation');
  }
  
  // Default suggestions
  if (suggestions.length === 0) {
    suggestions.push('text_animation', 'icon_animation');
  }
  
  return suggestions;
}

/**
 * Calculate optimal caption position based on avatar settings
 */
export function getCaptionPosition(avatarPosition: string): 'top' | 'center' | 'bottom' {
  switch (avatarPosition) {
    case 'bottom_third':
    case 'corner_br':
    case 'corner_bl':
      return 'center';
    case 'corner_tr':
    case 'corner_tl':
      return 'bottom';
    case 'full':
    default:
      return 'center';
  }
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
