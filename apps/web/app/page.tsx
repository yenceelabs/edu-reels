import Link from 'next/link';
import { Sparkles, Zap, Video, Mic, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              EduReels
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link
              href="/create"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Create Reel
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6 border border-purple-500/30">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Concept → Viral Reel in Minutes</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Educational Reels
          </span>
          <br />
          <span className="text-white">Mass Produced by AI</span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
          Enter a concept, get a viral educational reel. AI generates the script, 
          voiceover, and visuals. Face or faceless — your choice.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            href="/create"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/25"
          >
            <Zap className="w-5 h-5" />
            Create Your First Reel
          </Link>
          <Link
            href="/examples"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-white/10"
          >
            See Examples
          </Link>
        </div>

        {/* Phone mockup placeholder */}
        <div className="max-w-xs mx-auto aspect-[9/16] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[3rem] border-4 border-white/10 flex items-center justify-center">
          <div className="text-center text-white/40">
            <Video className="w-16 h-16 mx-auto mb-4" />
            <p>Reel Preview</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
            From concept to published reel in 3 simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Enter Your Concept"
              description="Just type what you want to teach. AI understands context, audience, and generates a viral-ready script."
              icon={<Sparkles className="w-6 h-6" />}
              color="purple"
            />
            <StepCard
              number={2}
              title="Customize Style"
              description="Choose face or faceless, select voice, pick visual style. Upload your own avatar or go fully automated."
              icon={<Video className="w-6 h-6" />}
              color="pink"
            />
            <StepCard
              number={3}
              title="Generate & Publish"
              description="AI creates voice, captions, B-roll. Download your reel ready for TikTok, Instagram, YouTube Shorts."
              icon={<TrendingUp className="w-6 h-6" />}
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Mass Produce Educational Content</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon="🎯" title="Concept to Script" description="AI generates hook-heavy, viral scripts from any topic" />
            <FeatureCard icon="🎤" title="AI Voiceover" description="Natural ElevenLabs voices with perfect pacing" />
            <FeatureCard icon="👤" title="Face or Faceless" description="HeyGen avatar or animated B-roll — your choice" />
            <FeatureCard icon="📝" title="TikTok Captions" description="Auto-generated bouncing word captions" />
            <FeatureCard icon="🎨" title="Visual Styles" description="6 preset styles or fully custom colors" />
            <FeatureCard icon="📊" title="Batch Production" description="Create 50 reels at once with variations" />
            <FeatureCard icon="📱" title="9:16 Vertical" description="Perfect for TikTok, Reels, Shorts" />
            <FeatureCard icon="⚡" title="15-90 Seconds" description="Optimized for engagement" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Viral?</h2>
          <p className="text-xl text-white/60 mb-8">
            Your first reel is free. No credit card required.
          </p>
          <Link
            href="/create"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
          >
            <Zap className="w-5 h-5" />
            Start Creating
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40">
          <p>Built with Remotion, ElevenLabs, HeyGen & GPT-4</p>
        </div>
      </footer>
    </main>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
  color,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'purple' | 'pink' | 'blue';
}) {
  const colors = {
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    blue: 'from-blue-500 to-blue-600',
  };

  return (
    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
      <div className={`absolute -top-4 left-8 w-8 h-8 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
        {number}
      </div>
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center text-white mb-4 mt-2`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-white/50">{description}</p>
    </div>
  );
}
