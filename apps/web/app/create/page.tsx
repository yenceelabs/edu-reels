'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  REEL_DURATIONS,
  ELEVENLABS_VOICES,
  STYLE_PRESETS,
  DEFAULT_VOICE_SETTINGS,
  DEFAULT_AVATAR_SETTINGS,
  estimateWordCount,
} from '@/lib/shared';
import type { Concept, AvatarMode, ReelStyle, CaptionStyle } from '@/lib/shared';
import { Zap, ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

type Step = 'concept' | 'voice' | 'avatar' | 'style' | 'preview';

const STEPS: { id: Step; label: string }[] = [
  { id: 'concept', label: 'Concept' },
  { id: 'voice', label: 'Voice' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'style', label: 'Style' },
  { id: 'preview', label: 'Preview' },
];

export default function CreatePage() {
  const [step, setStep] = useState<Step>('concept');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [concept, setConcept] = useState<Concept>({
    id: '', topic: '', targetAudience: '', keyPoints: [], tone: 'educational', duration: 60,
  });
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_SETTINGS.voiceId);
  const [avatarMode, setAvatarMode] = useState<AvatarMode>('faceless');
  const [avatarPosition, setAvatarPosition] = useState<string>(DEFAULT_AVATAR_SETTINGS.position);
  const [visualStyle, setVisualStyle] = useState<ReelStyle>('modern_minimal');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('tiktok_bounce');

  const stepIdx = STEPS.findIndex((s) => s.id === step);

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
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-3xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">EduReels</span>
            </Link>
            <span className="text-sm text-neutral-500">
              {concept.duration || 60}s • ~{estimateWordCount(concept.duration || 60)} words
            </span>
          </div>

          {/* Steps */}
          <div className="pb-4 flex items-center gap-2 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  s.id === step && "bg-neutral-900 text-white",
                  s.id !== step && i < stepIdx && "bg-neutral-100 text-neutral-900",
                  s.id !== step && i >= stepIdx && "text-neutral-400 hover:text-neutral-600"
                )}
              >
                {i < stepIdx && <Check className="w-3.5 h-3.5" />}
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-xl mx-auto px-6 py-10 pb-32">
        {step === 'concept' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">What do you want to teach?</h1>
              <p className="text-neutral-500">Enter your concept and AI will generate a viral-ready script.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic / Concept</Label>
                <Input
                  id="topic"
                  value={concept.topic}
                  onChange={(e) => setConcept({ ...concept, topic: e.target.value })}
                  placeholder="e.g., Why compound interest is the 8th wonder"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="grid grid-cols-4 gap-2">
                  {REEL_DURATIONS.map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant={concept.duration === d ? "default" : "outline"}
                      onClick={() => setConcept({ ...concept, duration: d })}
                    >
                      {d}s
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['educational', 'casual', 'professional', 'entertaining'] as const).map((t) => (
                    <Button
                      key={t}
                      type="button"
                      variant={concept.tone === t ? "default" : "outline"}
                      onClick={() => setConcept({ ...concept, tone: t })}
                      className="capitalize"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience (optional)</Label>
                <Input
                  id="audience"
                  value={concept.targetAudience || ''}
                  onChange={(e) => setConcept({ ...concept, targetAudience: e.target.value })}
                  placeholder="e.g., Beginners interested in finance"
                />
              </div>

              <Button
                onClick={generateScript}
                disabled={!concept.topic.trim() || loading}
                className="w-full h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Script with AI'
                )}
              </Button>

              {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {script && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Generated Script</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setScript(null)}>
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 whitespace-pre-wrap leading-relaxed">{script}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {step === 'voice' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Choose a Voice</h1>
              <p className="text-neutral-500">Select the voice for your reel narration.</p>
            </div>
            <RadioGroup value={voiceId} onValueChange={setVoiceId} className="space-y-3">
              {ELEVENLABS_VOICES.map((v) => (
                <label
                  key={v.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
                    voiceId === v.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={v.id} id={v.id} />
                    <div>
                      <div className="font-medium">{v.name}</div>
                      <div className="text-sm text-neutral-500 capitalize">{v.gender} • {v.style}</div>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 'avatar' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Avatar Settings</h1>
              <p className="text-neutral-500">Choose between face or faceless style.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'faceless' as const, label: 'Faceless', desc: 'Animated visuals only' },
                { id: 'face' as const, label: 'With Face', desc: 'AI avatar presenter' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setAvatarMode(m.id)}
                  className={cn(
                    "p-6 rounded-lg border text-left transition-colors",
                    avatarMode === m.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div className="font-medium mb-1">{m.label}</div>
                  <div className="text-sm text-neutral-500">{m.desc}</div>
                </button>
              ))}
            </div>
            {avatarMode === 'face' && (
              <div className="space-y-3">
                <Label>Position</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'corner_br', label: 'Bottom Right' },
                    { id: 'corner_bl', label: 'Bottom Left' },
                    { id: 'bottom_third', label: 'Bottom' },
                    { id: 'corner_tr', label: 'Top Right' },
                    { id: 'corner_tl', label: 'Top Left' },
                    { id: 'full', label: 'Full Screen' },
                  ].map((p) => (
                    <Button
                      key={p.id}
                      type="button"
                      variant={avatarPosition === p.id ? "default" : "outline"}
                      onClick={() => setAvatarPosition(p.id)}
                      className="text-xs"
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'style' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Visual Style</h1>
              <p className="text-neutral-500">Choose the look and feel.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Style Preset</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.keys(STYLE_PRESETS) as ReelStyle[]).map((s) => {
                    const p = STYLE_PRESETS[s];
                    return (
                      <button
                        key={s}
                        onClick={() => setVisualStyle(s)}
                        className={cn(
                          "p-3 rounded-lg border text-center transition-colors",
                          visualStyle === s ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        <div 
                          className="h-12 rounded mb-2" 
                          style={{ background: `linear-gradient(135deg, ${p.primaryColor}, ${p.secondaryColor})` }} 
                        />
                        <div className="text-sm capitalize">{s.replace('_', ' ')}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Caption Style</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'tiktok_bounce', label: 'TikTok Bounce' },
                    { id: 'highlight_word', label: 'Highlight' },
                    { id: 'karaoke', label: 'Karaoke' },
                    { id: 'subtitle_classic', label: 'Classic' },
                  ].map((c) => (
                    <Button
                      key={c.id}
                      type="button"
                      variant={captionStyle === c.id ? "default" : "outline"}
                      onClick={() => setCaptionStyle(c.id as CaptionStyle)}
                    >
                      {c.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Preview & Generate</h1>
              <p className="text-neutral-500">Review your settings and generate.</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  ['Topic', concept.topic || '—'],
                  ['Duration', `${concept.duration}s`],
                  ['Voice', ELEVENLABS_VOICES.find((v) => v.id === voiceId)?.name || voiceId],
                  ['Avatar', avatarMode === 'face' ? `With Face (${avatarPosition.replace('_', ' ')})` : 'Faceless'],
                  ['Style', visualStyle.replace('_', ' ')],
                  ['Captions', captionStyle.replace('_', ' ')],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                    <span className="text-neutral-500">{k}</span>
                    <span className="font-medium capitalize">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
              <Check className="w-8 h-8 mx-auto mb-2 text-neutral-900" />
              <h3 className="font-semibold">Ready to Generate</h3>
              <p className="text-sm text-neutral-500 mt-1">Your reel will be ready in about 2 minutes</p>
            </div>
            <Button className="w-full h-12">
              Generate Reel
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 border-t border-neutral-200 bg-white">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={prev}
            disabled={stepIdx === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={next}
            disabled={stepIdx === STEPS.length - 1}
          >
            {stepIdx === STEPS.length - 1 ? 'Generate' : 'Next'}
            {stepIdx < STEPS.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </footer>
    </div>
  );
}
