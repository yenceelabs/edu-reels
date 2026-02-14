'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Mic, Film } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">EduReels</span>
          </div>
          <Button asChild>
            <Link href="/create">Create Reel</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-neutral-500 mb-4">
            AI-Powered Educational Content
          </p>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Turn Ideas into Viral Reels
          </h1>
          
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
            Create engaging educational short-form videos in minutes. 
            AI generates scripts, adds voiceovers, and produces TikTok-ready content.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="xl" asChild>
              <Link href="/create" className="gap-2">
                Start Creating
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {[
            {
              icon: <Zap className="w-5 h-5" />,
              title: 'AI Script Generation',
              desc: 'Enter a topic, get a viral-ready script with hooks, key points, and CTAs.',
            },
            {
              icon: <Mic className="w-5 h-5" />,
              title: 'Natural Voiceovers',
              desc: 'Choose from multiple AI voices or use your own. ElevenLabs quality.',
            },
            {
              icon: <Film className="w-5 h-5" />,
              title: 'Auto Visual Styling',
              desc: 'TikTok-style captions, B-roll, and animations generated automatically.',
            },
          ].map((f) => (
            <Card key={f.title}>
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-neutral-400 text-sm">
          Built with AI • Powered by OpenAI, ElevenLabs, and Remotion
        </div>
      </footer>
    </div>
  );
}
