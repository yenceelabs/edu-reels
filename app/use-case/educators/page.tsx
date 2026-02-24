import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARE_PAGES } from '@/lib/compare-pages';

const BASE_URL = 'https://edu-reels-two.vercel.app';
const OG_IMAGE = `${BASE_URL}/og?page=use-case&title=AI+Video+Maker+for+Teachers`;

export const metadata: Metadata = {
  title: 'AI Video Maker for Teachers — Create Educational Videos Free | EduReels',
  description:
    'Turn any lesson concept into an AI-narrated educational video in minutes. Free AI video creator for teachers, educators, and classroom content. No editing required.',
  keywords:
    'AI video maker for teachers, educational video creator free, AI educational video, video lesson creator, free AI video for education, create educational videos free',
  openGraph: {
    title: 'EduReels — AI Video Maker for Teachers (Free)',
    description:
      'AI-powered educational video creation. Describe a concept → EduReels builds the script, narration, and video. Free to start.',
    url: `${BASE_URL}/use-case/educators`,
    siteName: 'EduReels',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EduReels — AI Video Maker for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduReels — AI Video Maker for Teachers (Free)',
    description:
      'AI-powered educational video creation. Describe a concept → EduReels builds the script, narration, and video. Free to start.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/use-case/educators`,
  },
};

const howItWorks = [
  {
    step: '1',
    title: 'Describe the concept',
    description:
      '"Photosynthesis: how plants make food using sunlight" — just type or paste your lesson topic.',
    icon: '📝',
  },
  {
    step: '2',
    title: 'Choose the voice & style',
    description:
      'Pick a narration voice and visual format that fits your students.',
    icon: '🎤',
  },
  {
    step: '3',
    title: 'AI scripts and voices',
    description:
      'EduReels builds the script, adds AI narration, and creates the visual breakdown.',
    icon: '🤖',
  },
  {
    step: '4',
    title: 'Download or share',
    description:
      'Get an MP4 file or a shareable link. Send it to students instantly.',
    icon: '🚀',
  },
];

const featureComparison = [
  {
    feature: 'Price',
    edureels: 'Free',
    synthesia: '$22+/mo',
    camtasia: '$299/yr',
    loom: '$12.50/mo',
  },
  {
    feature: 'AI narration',
    edureels: '✅',
    synthesia: '✅',
    camtasia: '❌',
    loom: '❌',
  },
  {
    feature: 'Concept → Script',
    edureels: '✅',
    synthesia: '❌',
    camtasia: '❌',
    loom: '❌',
  },
  {
    feature: 'No account needed',
    edureels: '✅',
    synthesia: '❌',
    camtasia: '❌',
    loom: '❌',
  },
  {
    feature: 'Educational templates',
    edureels: '✅',
    synthesia: 'Limited',
    camtasia: '❌',
    loom: '❌',
  },
  {
    feature: 'Video editing needed',
    edureels: 'None',
    synthesia: 'Minimal',
    camtasia: 'Extensive',
    loom: 'Minimal',
  },
];

const useCases = [
  {
    title: 'Flipped Classroom',
    description:
      'Record lectures students watch at home. Class time becomes discussion and practice.',
    icon: '🏫',
  },
  {
    title: 'Concept Explainers',
    description:
      'Break complex topics into bite-sized visual steps. Perfect for STEM subjects.',
    icon: '🔬',
  },
  {
    title: 'ESL & Accessibility',
    description:
      'Clear AI narration helps non-native speakers and students with reading difficulties.',
    icon: '🌍',
  },
  {
    title: 'Test Prep Summaries',
    description:
      'Create quick review videos for exams. Students retain more from video than text.',
    icon: '📋',
  },
  {
    title: 'YouTube Education',
    description:
      'Build educational content for your channel without expensive recording equipment.',
    icon: '▶️',
  },
  {
    title: 'Corporate Training',
    description:
      'Onboarding videos, process documentation, and internal knowledge sharing.',
    icon: '💼',
  },
];

const faqs = [
  {
    q: 'Do I need any video editing experience?',
    a: 'None. EduReels handles all the editing. You describe the concept, we build the video — narration, pacing, and visuals included.',
  },
  {
    q: 'Can I use EduReels for free?',
    a: 'Yes. Create your first educational video free, no credit card required. The free tier gives you real videos, not demos.',
  },
  {
    q: 'What subjects does EduReels work for?',
    a: 'Any subject. EduReels is content-agnostic — STEM, history, languages, arts, business. If you can explain it, EduReels can make a video from it.',
  },
  {
    q: 'How long can the videos be?',
    a: 'Free tier creates 1-2 minute explainer videos. Pro creates longer format content for full lectures and course modules.',
  },
  {
    q: 'Can students access the video without logging in?',
    a: 'Yes. Every video gets a shareable link that works without any account. Just send the link to your students.',
  },
  {
    q: 'How does EduReels compare to Synthesia?',
    a: "Synthesia focuses on corporate training with realistic avatars at $22/mo minimum. EduReels is optimized for educational content structure at zero cost. If you need a corporate presenter, Synthesia. If you need fast, free educational explainers, EduReels.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-600 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function UseCaseEducatorsPage() {
  const currentPath = '/use-case/educators';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-neutral-900 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-sm">EduReels</span>
          </Link>
          <Link
            href="/create"
            className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Create Free →
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="py-4 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-neutral-500">Use Cases</span>
          <span className="mx-2">›</span>
          <span className="text-neutral-900">Educators</span>
        </nav>

        {/* Hero */}
        <section className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
            Turn your lesson plan into a video.
            <br />
            In minutes. Free.
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            AI-powered educational video creation for teachers who know their content
            but don&apos;t have time to produce it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create My First Video — Free →
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            No account required · No credit card · Free forever for basic use
          </p>
        </section>

        {/* The Problem */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">The Problem</h2>
          <p className="mt-4 text-neutral-600">
            Your students want video. You have the knowledge. But between lesson prep,
            grading, and actually teaching — who has time to learn video editing?
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-neutral-200 rounded-lg p-5">
              <p className="text-2xl mb-2">📚</p>
              <p className="text-sm text-neutral-700 font-medium">
                Your lesson notes are in Google Docs.
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Your students want video.
              </p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-5">
              <p className="text-2xl mb-2">⏰</p>
              <p className="text-sm text-neutral-700 font-medium">
                Editing software takes hours.
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Hours you don&apos;t have.
              </p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-5">
              <p className="text-2xl mb-2">💰</p>
              <p className="text-sm text-neutral-700 font-medium">
                AI video tools cost $22+/mo.
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                More than your classroom budget.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">How EduReels Works</h2>
          <p className="mt-2 text-neutral-600">
            Four steps. No editing. No design skills needed.
          </p>

          <div className="mt-8 space-y-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    <span className="text-neutral-400 mr-1">{item.step}.</span> {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Try It */}
        <section className="py-12 border-t border-neutral-100">
          <div className="bg-neutral-50 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">Try It Right Now</h2>
            <p className="mt-3 text-neutral-600 max-w-md mx-auto">
              Create your first educational video — describe any concept and watch EduReels turn it into a video.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Start Creating — It&apos;s Free →
            </Link>
            <p className="mt-3 text-xs text-neutral-400">
              Try with: &quot;Explain the water cycle to 8th graders&quot;
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Why Teachers Choose EduReels
          </h2>
          <p className="mt-2 text-neutral-600">An honest comparison with the alternatives.</p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 pr-4 font-medium text-neutral-500">Feature</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-900">EduReels</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-500">Synthesia</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-500">Camtasia</th>
                  <th className="text-left py-3 pl-3 font-medium text-neutral-500">Loom</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row) => (
                  <tr key={row.feature} className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-600">{row.feature}</td>
                    <td className="py-3 px-3 text-neutral-900 font-medium">{row.edureels}</td>
                    <td className="py-3 px-3 text-neutral-500">{row.synthesia}</td>
                    <td className="py-3 px-3 text-neutral-500">{row.camtasia}</td>
                    <td className="py-3 pl-3 text-neutral-500">{row.loom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            What Educators Build with EduReels
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((uc) => (
              <div key={uc.title} className="border border-neutral-200 rounded-lg p-5">
                <p className="text-2xl mb-2">{uc.icon}</p>
                <h3 className="font-semibold text-neutral-900 text-sm">{uc.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-neutral-100 pb-6">
                <h3 className="font-semibold text-neutral-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Your next lesson deserves a video.
          </h2>
          <p className="mt-3 text-neutral-600">
            Build it in minutes — free.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
          >
            Start Creating → Free
          </Link>
        </section>

        {/* Cross-links */}
        <section className="py-8 border-t border-neutral-100">
          <p className="text-sm text-neutral-500 mb-3">Explore more:</p>
          <div className="flex flex-wrap gap-3">
            {COMPARE_PAGES.filter((p) => p.href !== currentPath).map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} EduReels. Built by NC Labs.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-neutral-900 transition">
              Home
            </Link>
            <Link href="/create" className="hover:text-neutral-900 transition">
              Create
            </Link>
            <Link href="/compare/synthesia" className="hover:text-neutral-900 transition">
              vs Synthesia
            </Link>
          </div>
        </div>
      </footer>

      {/* Schema Markup — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Schema Markup — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Educators',
                item: `${BASE_URL}/use-case/educators`,
              },
            ],
          }),
        }}
      />

      {/* Schema Markup — SoftwareApplication (no fake ratings!) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'EduReels',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Web',
            url: BASE_URL,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free AI educational video creator for teachers and educators.',
            },
          }),
        }}
      />
    </div>
  );
}
