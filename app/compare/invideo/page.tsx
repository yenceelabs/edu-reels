import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARE_PAGES, BASE_URL, getCompareOgImage } from '@/lib/compare-pages';

const OG_IMAGE = getCompareOgImage('InVideo');

export const metadata: Metadata = {
  title: 'InVideo Alternative — Free AI Educational Video Creator | EduReels',
  description:
    'Looking for a free InVideo alternative? EduReels creates AI educational videos for free — no watermarks, no subscription. Built for teachers in India.',
  keywords:
    'invideo alternative, invideo AI alternative, invideo free alternative, ai video maker free, invideo vs, educational video creator',
  openGraph: {
    title: 'InVideo vs EduReels: The Free Educator Alternative',
    description:
      'InVideo AI costs ₹2,999/month. EduReels is free for educators. Compare features, pricing, and use cases.',
    url: `${BASE_URL}/compare/invideo`,
    siteName: 'EduReels',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EduReels vs InVideo — Free AI Educational Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InVideo vs EduReels: The Free Educator Alternative',
    description:
      'InVideo AI costs ₹2,999/month. EduReels is free for educators. Compare features, pricing, and use cases.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/compare/invideo`,
  },
};

const featureComparison = [
  {
    feature: 'Starting price',
    edureels: 'Free',
    invideo: '₹1,250/mo (Starter)',
    winner: 'edureels',
  },
  {
    feature: 'Watermark-free',
    edureels: 'Yes — no watermark',
    invideo: 'Paid plans only',
    winner: 'edureels',
  },
  {
    feature: 'AI script generation',
    edureels: 'Concept → lesson structure',
    invideo: 'Text-to-video prompt',
    winner: 'edureels',
  },
  {
    feature: 'AI voice',
    edureels: 'Yes — educator voice',
    invideo: 'Yes — multiple voices',
    winner: 'tie',
  },
  {
    feature: 'Built for educators',
    edureels: 'Yes — education-first',
    invideo: 'No — marketing-first',
    winner: 'edureels',
  },
  {
    feature: 'Stock footage library',
    edureels: 'Not needed for edu content',
    invideo: 'Yes — 5,000+ templates',
    winner: 'invideo',
  },
  {
    feature: 'Templates',
    edureels: 'AI-generated instead',
    invideo: '5,000+ templates',
    winner: 'invideo',
  },
  {
    feature: 'Export limits (free)',
    edureels: 'AI-native generation',
    invideo: '4 exports/week',
    winner: 'edureels',
  },
  {
    feature: 'India pricing',
    edureels: 'Free',
    invideo: '₹2,999/mo (Business)',
    winner: 'edureels',
  },
  {
    feature: 'Learning curve',
    edureels: 'Low — 3-minute setup',
    invideo: 'Medium-High',
    winner: 'edureels',
  },
];

const faqs = [
  {
    q: 'Is there a free InVideo alternative?',
    a: 'Yes. EduReels is completely free for educators. Create AI-powered educational videos without watermarks, export limits, or a subscription.',
  },
  {
    q: "What's the difference between InVideo and EduReels?",
    a: "InVideo is a template-based video tool built for marketing teams with a stock footage library. EduReels is an AI-native educational video creator built for teachers — no templates, just describe your lesson and the AI builds the video.",
  },
  {
    q: 'Does InVideo have a free plan?',
    a: 'InVideo has a free tier, but it adds an InVideo watermark to all exports and limits you to 4 videos per week. EduReels is free without watermarks.',
  },
  {
    q: 'How much does InVideo cost in India?',
    a: 'InVideo AI costs ₹1,250/month (Starter) or ₹2,999/month (Business), billed annually. The Business plan is required for AI features at scale.',
  },
  {
    q: 'Can I use EduReels instead of InVideo for YouTube videos?',
    a: "If you're creating educational YouTube content — yes. EduReels generates AI scripts, voiceovers, and video for educational content. If you need stock footage-heavy marketing videos, InVideo is the better fit.",
  },
];

const useCases = [
  {
    title: 'K-12 Teachers',
    description: 'Quick concept videos, homework walkthroughs, visual explanations for any subject',
  },
  {
    title: 'University Professors',
    description: 'Flipped classroom content, recorded lectures, supplemental material for students',
  },
  {
    title: 'YouTube Educators',
    description: 'Channel content, explainer series, educational shorts at zero production cost',
  },
  {
    title: 'Online Course Creators',
    description: 'Udemy, Teachable, Thinkific video content without ₹2,999/month tools',
  },
  {
    title: 'Independent Tutors',
    description: 'Personalized lesson videos to share directly with students',
  },
  {
    title: 'EdTech Creators',
    description: 'Scale educational content production without breaking the budget',
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

function XIcon() {
  return (
    <svg
      className="w-5 h-5 text-red-500 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function CompareInVideoPage() {
  const currentPath = '/compare/invideo';

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
          <span className="text-neutral-900">EduReels vs InVideo</span>
        </nav>

        {/* Hero */}
        <section className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
            The Free InVideo Alternative
            <br />
            Built for Educators
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            InVideo AI costs ₹2,999/month. EduReels lets you create AI educational
            videos free — no watermarks, no subscription required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create My First Video Free →
            </Link>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-100 text-neutral-900 px-6 py-3 rounded-md hover:bg-neutral-200 transition"
            >
              See the Comparison
            </a>
          </div>
        </section>

        {/* TL;DR Comparison */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">TL;DR — Quick Comparison</h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* InVideo pricing */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">InVideo AI</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">₹2,999<span className="text-lg text-neutral-400">/mo</span></p>
              <p className="text-sm text-neutral-500">Business plan — billed annually</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Watermark on all free-tier exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>4 exports/week max on free plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>5,000+ templates built for marketing, not education</span>
                </li>
              </ul>
            </div>

            {/* EduReels pricing */}
            <div className="border-2 border-neutral-900 rounded-lg p-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">EduReels</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">Free</p>
              <p className="text-sm text-neutral-500">no credit card required</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>No watermark — ever</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Built specifically for educators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>AI-native — no templates needed</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What Is InVideo */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">What Is InVideo?</h2>
          <p className="mt-4 text-neutral-600">
            InVideo is one of India&apos;s most popular video creation tools, offering a library
            of 5,000+ templates, stock footage, and AI voiceovers. It&apos;s excellent for
            marketing content — social media ads, promotional clips, and YouTube intros.
          </p>
          <p className="mt-3 text-neutral-600">
            But InVideo wasn&apos;t built for educators. It&apos;s a template-first tool with AI
            features added later — not an AI-native educational video creator. And its pricing
            reflects a marketing audience, not a teacher&apos;s budget.
          </p>
        </section>

        {/* The Problem */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            The Problem With InVideo for Educators
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-neutral-900">₹2,999/month is a month&apos;s tuition for some students</h3>
              <p className="mt-1 text-neutral-600">
                The Business plan — which is what you need for full AI features — costs ₹2,999/month.
                Even the Starter plan at ₹1,250/month is steep for an independent teacher or
                college professor in India.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">The free tier watermarks everything</h3>
              <p className="mt-1 text-neutral-600">
                Every video exported on InVideo&apos;s free plan has an InVideo watermark. That&apos;s
                fine for personal experiments — but if you&apos;re sharing videos with students or
                uploading to YouTube, it looks unprofessional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">4 exports per week — less than one per day</h3>
              <p className="mt-1 text-neutral-600">
                The free plan limits you to 4 video exports per week. If you&apos;re a teacher creating
                daily content for a class, that&apos;s not enough to cover Monday through Thursday.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">5,000 templates you&apos;ll never use</h3>
              <p className="mt-1 text-neutral-600">
                InVideo&apos;s library is packed with marketing templates — Instagram reels, product
                promos, real estate ads. If you&apos;re explaining photosynthesis or solving quadratic
                equations, none of those templates help.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Template-first, not AI-first</h3>
              <p className="mt-1 text-neutral-600">
                InVideo started as a template tool and added AI features later. EduReels is AI-native
                from the ground up — describe your topic, and the AI builds the video structure,
                script, and voice.
              </p>
            </div>
          </div>
        </section>

        {/* How EduReels Works */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">Built for How Teachers Actually Work</h2>
          <p className="mt-2 text-neutral-600">
            EduReels follows a simple process designed around educational content — not marketing templates.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: '1',
                title: 'Define your concept',
                desc: 'Describe the topic and learning level — 5th grade science, university lecture, competitive exam prep.',
              },
              {
                step: '2',
                title: 'AI writes the educational script',
                desc: 'Not marketing copy. A proper lesson: hook → core concept → example → summary → call to action.',
              },
              {
                step: '3',
                title: 'AI presenter delivers it',
                desc: 'A professional educator avatar presents your lesson — no stock footage needed.',
              },
              {
                step: '4',
                title: 'Download and share',
                desc: 'MP4 ready for Google Classroom, YouTube, WhatsApp groups, or anywhere else. No watermark.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison */}
        <section id="comparison" className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">Feature Comparison</h2>
          <p className="mt-2 text-neutral-600">An honest look at both tools.</p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 pr-4 font-medium text-neutral-500">Feature</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-900">EduReels</th>
                  <th className="text-left py-3 pl-4 font-medium text-neutral-500">InVideo AI</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row) => (
                  <tr key={row.feature} className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-600">{row.feature}</td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          row.winner === 'edureels'
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-500'
                        }
                      >
                        {row.edureels}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <span
                        className={
                          row.winner === 'invideo'
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-500'
                        }
                      >
                        {row.invideo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            InVideo wins on template variety and stock footage — they&apos;re built for marketing teams.
            EduReels wins on price, simplicity, and educator-focused workflow.
          </p>
        </section>

        {/* Honest Verdict */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Honest Verdict: Who Should Use What
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Use InVideo if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A marketing team creating promotional content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A social media manager who needs stock footage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A content agency producing videos at scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Have budget for ₹2,999/month tools</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Use EduReels if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A teacher creating classroom or homework videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>An educator making YouTube explainer content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A tutor building self-paced lesson libraries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Anyone who can&apos;t justify ₹2,999/month for video tools</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-neutral-600">
            InVideo is India&apos;s go-to for marketing videos. EduReels is built for India&apos;s
            educators. Different tools for different needs — we&apos;re honest about where each one shines.
          </p>
        </section>

        {/* Use Cases */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">Perfect for Every Type of Educator</h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((uc) => (
              <div key={uc.title} className="border border-neutral-200 rounded-lg p-5">
                <h3 className="font-semibold text-neutral-900">{uc.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Try It CTA */}
        <section className="py-12 border-t border-neutral-100">
          <div className="bg-neutral-50 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              Create Your First Educational Video — Free
            </h2>
            <p className="mt-3 text-neutral-600 max-w-md mx-auto">
              No subscription. No watermarks. No ₹2,999/month. Just the tool you need to teach.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create Video Free →
            </Link>
            <p className="mt-3 text-xs text-neutral-400">
              No credit card. No watermark. No time limit.
            </p>
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
            Ready to create educational videos without the ₹2,999 price tag?
          </h2>
          <p className="mt-3 text-neutral-600">
            EduReels takes 3 minutes to set up. Zero rupees to start.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
          >
            Create My First EduReel Free →
          </Link>
        </section>

        {/* Cross-links */}
        <section className="py-8 border-t border-neutral-100">
          <p className="text-sm text-neutral-500 mb-3">Compare EduReels with others:</p>
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
      {/* Schema Markup — BreadcrumbList (flat: Home → Compare InVideo) */}
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
                name: 'Compare InVideo',
                item: `${BASE_URL}/compare/invideo`,
              },
            ],
          }),
        }}
      />
      {/* Schema Markup — SoftwareApplication (NO fake aggregateRating) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'EduReels',
            applicationCategory: 'MultimediaApplication',
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
