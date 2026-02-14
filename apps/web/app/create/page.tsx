'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Sparkles,
  Mic,
  User,
  Palette,
  Play,
  Download,
  Loader2,
  Check,
  Clock,
  Volume2,
} from 'lucide-react';
import {
  REEL_DURATIONS,
  ELEVENLABS_VOICES,
  STYLE_PRESETS,
  DEFAULT_VOICE_SETTINGS,
  DEFAULT_AVATAR_SETTINGS,
  estimateWordCount,
} from '@/lib/shared';
import type { Concept, AvatarMode, ReelStyle, CaptionStyle } from '@/lib/shared';

type Step = 'concept' | 'voice' | 'avatar' | 'style' | 'preview';

const STEPS: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: 'concept', label: 'Concept', icon: Sparkles },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'avatar', label: 'Avatar', icon: User },
  { id: 'style', label: 'Style', icon: Palette },
  { id: 'preview', label: 'Preview', icon: Play },
];

export default function CreatePage() {
  const [step, setStep] = useState<Step>('concept');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [concept, setConcept] = useState<Concept>({
    id: '',
    topic: '',
    targetAudience: '',
    keyPoints: [],
    tone: 'educational',
    duration: 60,
  });
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_SETTINGS.voiceId);
  const [avatarMode, setAvatarMode] = useState<AvatarMode>('faceless');
  const [avatarPosition, setAvatarPosition] = useState<string>(DEFAULT_AVATAR_SETTINGS.position);
  const [visualStyle, setVisualStyle] = useState<ReelStyle>('modern_minimal');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('tiktok_bounce');

  const stepIdx = STEPS.findIndex((s) => s.id === step);
  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  const next = () => stepIdx < STEPS.length - 1 && setStep(STEPS[stepIdx + 1].id);
  const prev = () => stepIdx > 0 && setStep(STEPS[stepIdx - 1].id);

  const generateScript = async () => {
    if (!concept.topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept }),
      });
      const data = await res.json();
      if (res.ok && data.script) {
        setScript(data.script.fullScript || JSON.stringify(data.script, null, 2));
      } else {
        setError(data.error || 'Failed to generate script');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top bar */}
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:block">EduReels</span>
            </Link>
            
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{concept.duration || 60}s • ~{estimateWordCount(concept.duration || 60)} words</span>
            </div>
          </div>

          {/* Progress section */}
          <div className="pb-4">
            {/* Step pills */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {STEPS.map((s, i) => {
                const isActive = s.id === step;
                const isComplete = i < stepIdx;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStep(s.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : isComplete
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-32">
        {/* Concept Step */}
        {step === 'concept' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">What do you want to teach?</h1>
              <p className="text-slate-400">Enter your concept and AI will generate a viral-ready script.</p>
            </div>

            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Topic / Concept</label>
                <input
                  type="text"
                  value={concept.topic}
                  onChange={(e) => setConcept({ ...concept, topic: e.target.value })}
                  placeholder="e.g., Why compound interest is the 8th wonder of the world"
                  className="w-full px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {REEL_DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setConcept({ ...concept, duration: d })}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        concept.duration === d
                          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['educational', 'casual', 'professional', 'entertaining'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setConcept({ ...concept, tone: t })}
                      className={`py-3 rounded-xl font-medium capitalize transition-all ${
                        concept.tone === t
                          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience (optional)</label>
                <input
                  type="text"
                  value={concept.targetAudience || ''}
                  onChange={(e) => setConcept({ ...concept, targetAudience: e.target.value })}
                  placeholder="e.g., Beginners interested in personal finance"
                  className="w-full px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateScript}
                disabled={!concept.topic.trim() || loading}
                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Script...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Script with AI
                  </>
                )}
              </button>

              {/* Error */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  {error}
                </div>
              )}

              {/* Generated Script */}
              {script && (
                <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-purple-400">✨ Generated Script</span>
                    <button
                      onClick={() => setScript(null)}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{script}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voice Step */}
        {step === 'voice' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose a Voice</h1>
              <p className="text-slate-400">Select the voice for your reel narration.</p>
            </div>
            <div className="space-y-3">
              {ELEVENLABS_VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVoiceId(v.id)}
                  className={`w-full p-5 rounded-xl text-left transition-all flex items-center justify-between ${
                    voiceId === v.id
                      ? 'bg-purple-500/20 border-2 border-purple-500 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-lg text-white">{v.name}</div>
                    <div className="text-sm text-slate-400 capitalize">{v.gender} • {v.style}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {voiceId === v.id && <Check className="w-5 h-5 text-purple-400" />}
                    <Volume2 className="w-5 h-5 text-slate-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Avatar Step */}
        {step === 'avatar' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Avatar Settings</h1>
              <p className="text-slate-400">Choose between face or faceless style.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'faceless' as const, label: 'Faceless', emoji: '🎨', desc: 'Animated visuals + B-roll' },
                { id: 'face' as const, label: 'With Face', emoji: '👤', desc: 'AI avatar or your own' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setAvatarMode(m.id)}
                  className={`p-6 rounded-xl text-center transition-all ${
                    avatarMode === m.id
                      ? 'bg-purple-500/20 border-2 border-purple-500 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                  }`}
                >
                  <div className="text-5xl mb-3">{m.emoji}</div>
                  <div className="font-semibold text-white text-lg">{m.label}</div>
                  <div className="text-sm text-slate-400 mt-1">{m.desc}</div>
                </button>
              ))}
            </div>

            {avatarMode === 'face' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Avatar Position</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'corner_br', label: 'Bottom Right', emoji: '↘️' },
                    { id: 'corner_bl', label: 'Bottom Left', emoji: '↙️' },
                    { id: 'bottom_third', label: 'Bottom', emoji: '⬇️' },
                    { id: 'corner_tr', label: 'Top Right', emoji: '↗️' },
                    { id: 'corner_tl', label: 'Top Left', emoji: '↖️' },
                    { id: 'full', label: 'Full Screen', emoji: '🖼️' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setAvatarPosition(p.id)}
                      className={`p-4 rounded-xl text-center transition-all ${
                        avatarPosition === p.id
                          ? 'bg-purple-500/20 border-2 border-purple-500'
                          : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                      }`}
                    >
                      <div className="text-2xl mb-1">{p.emoji}</div>
                      <div className="text-xs text-slate-300">{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Style Step */}
        {step === 'style' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Visual Style</h1>
              <p className="text-slate-400">Choose the look and feel of your reel.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Style Preset</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(STYLE_PRESETS) as ReelStyle[]).map((s) => {
                  const p = STYLE_PRESETS[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setVisualStyle(s)}
                      className={`p-4 rounded-xl text-center transition-all ${
                        visualStyle === s
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900'
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <div
                        className="h-16 rounded-lg mb-3"
                        style={{ background: `linear-gradient(135deg, ${p.primaryColor}, ${p.secondaryColor})` }}
                      />
                      <div className="text-sm font-medium text-white capitalize">{s.replace('_', ' ')}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Caption Style</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'tiktok_bounce', label: 'TikTok Bounce', emoji: '⬆️', desc: 'Bouncing word animation' },
                  { id: 'highlight_word', label: 'Highlight', emoji: '🟡', desc: 'Highlight current word' },
                  { id: 'karaoke', label: 'Karaoke', emoji: '🎤', desc: 'Karaoke style fill' },
                  { id: 'subtitle_classic', label: 'Classic', emoji: '📝', desc: 'Traditional subtitles' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCaptionStyle(c.id as CaptionStyle)}
                    className={`p-5 rounded-xl text-center transition-all ${
                      captionStyle === c.id
                        ? 'bg-purple-500/20 border-2 border-purple-500'
                        : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-700'
                    }`}
                  >
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <div className="font-medium text-white">{c.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === 'preview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Preview & Generate</h1>
              <p className="text-slate-400">Review your settings and generate your reel.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="font-semibold text-lg text-white mb-4">Summary</h3>
              <div className="space-y-3">
                {[
                  ['Topic', concept.topic || '—'],
                  ['Duration', `${concept.duration} seconds`],
                  ['Tone', concept.tone],
                  ['Voice', ELEVENLABS_VOICES.find((v) => v.id === voiceId)?.name || voiceId],
                  ['Avatar', avatarMode === 'faceless' ? 'Faceless' : `Face (${avatarPosition.replace('_', ' ')})`],
                  ['Style', visualStyle.replace('_', ' ')],
                  ['Captions', captionStyle.replace('_', ' ')],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-white font-medium capitalize">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-green-400 text-xl mb-1">Ready to Generate!</h3>
              <p className="text-slate-400 text-sm">Click the button below to create your reel.</p>
            </div>

            <button className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Generate Reel
            </button>
          </div>
        )}
      </main>

      {/* Fixed bottom nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            className="flex items-center gap-2 px-4 py-3 text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Previous</span>
          </button>
          
          <button
            onClick={next}
            disabled={stepIdx === STEPS.length - 1}
            className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            {stepIdx === STEPS.length - 1 ? 'Generate' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
