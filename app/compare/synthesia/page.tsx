import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARE_PAGES, getCompareOgImage } from '@/lib/compare-pages';

const OG_IMAGE = getCompareOgImage('Synthesia');

export const metadata: Metadata = {
  title: 'Synthesia Alternative Free — EduReels | AI Educational Video Creator',
  description:
    'Looking for a Synthesia alternative? EduReels creates AI-powered educational videos for free. No watermarks, no subscription. Built for teachers and tutors.',
  keywords:
    'synthesia alternative, synthesia alternative free, free AI video generator education, AI video maker without watermark, cheap synthesia alternative, synthesia competitor',
  openGraph: {
    title: 'Synthesia Alternative — EduReels | Free AI Educational Videos',
    description:
      'Synthesia is $22/mo. EduReels is free. Create educational AI videos without the corporate price tag.',
    url: 'https://edu-reels-two.vercel.app/compare/synthesia',
    siteName: 'EduReels',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EduReels vs Synthesia — Free AI Educational Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synthesia Alternative — EduReels | Free AI Educational Videos',
    description:
      'Synthesia is $22/mo. EduReels is free. Create educational AI videos without the corporate price tag.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: 'https://edu-reels-two.vercel.app/compare/synthesia',
  },
};

const featureComparison = [
  {
    feature: 'Free plan (real, not demo)',
    edureels: 'Yes — create real videos',
    synthesia: '3-minute demo only',
    winner: 'edureels',
  },
  {
    feature: 'Starting price',
    edureels: 'Free',
    synthesia: '$22/mo (annual)',
    winner: 'edureels',
  },
  {
    feature: 'Built for education',
    edureels: 'Yes — designed for teachers & tutors',
    synthesia: 'Corporate training focus',
    winner: 'edureels',
  },
  {
    feature: 'Conversational AI format',
    edureels: 'Interactive, engaging',
    synthesia: 'One-way presentation',
    winner: 'edureels',
  },
  {
    feature: 'Watermark on free',
    edureels: 'No watermark',
    synthesia: 'Yes — watermarked',
    winner: 'edureels',
  },
  {
    feature: 'AI script generation',
    edureels: 'Viral-optimized scripts',
    synthesia: 'Basic scripting',
    winner: 'edureels',
  },
  {
    feature: 'Avatar variety',
    edureels: 'Growing library',
    synthesia: '230+ avatars',
    winner: 'synthesia',
  },
  {
    feature: 'Multi-language',
    edureels: 'English (more coming)',
    synthesia: '140+ languages',
    winner: 'synthesia',
  },
  {
    feature: 'Enterprise features',
    edureels: 'Not yet',
    synthesia: 'API, SSO, custom avatars',
    winner: 'synthesia',
  },
];

const faqs = [
  {
    q: 'Is EduReels actually free?',
    a: 'Yes — EduReels has a real free tier. No watermarks, no 3-minute limit, no credit card required to get started. You can create full educational videos from day one.',
  },
  {
    q: 'How is EduReels different from Synthesia?',
    a: "Synthesia is built for corporate HR training — it's great for companies with training budgets. EduReels is built specifically for educational content: teachers, tutors, and creators who need to explain things, not just present them. Our conversational AI format means students actually learn, not just watch.",
  },
  {
    q: 'Can I use EduReels for YouTube educational content?',
    a: 'Absolutely. EduReels was designed for exactly this — explainer videos, course lessons, tutorial content, and educational reels for social media.',
  },
  {
    q: "What's the best free Synthesia alternative?",
    a: "EduReels is the strongest free alternative if your goal is educational content. For corporate training, Colossyan or D-ID are worth comparing. For creative/social content, Pictory or Descript might fit better. It depends on what you're making.",
  },
  {
    q: 'Does EduReels have AI avatars?',
    a: 'Yes — EduReels supports AI-powered video avatars that present your educational content naturally. We focus on avatars that feel relatable to students, not corporate.',
  },
  {
    q: 'Can I switch from Synthesia to EduReels?',
    a: "You can keep your Synthesia account while you try EduReels — there's no migration needed. Create your first video for free and see if it fits your workflow before making any changes.",
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

export default function CompareSynthesiaPage() {
  const currentPath = '/compare/synthesia';

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
          <span className="text-neutral-900">EduReels vs Synthesia</span>
        </nav>

        {/* Hero */}
        <section className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
            Synthesia is $22/mo.
            <br />
            EduReels is free.
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            Create AI-powered educational videos in minutes — no subscription, no credit card, no
            corporate avatars.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create Your First EduReel Free →
            </Link>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-100 text-neutral-900 px-6 py-3 rounded-md hover:bg-neutral-200 transition"
            >
              See the Comparison
            </a>
          </div>
        </section>

        {/* Price Reality Check */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">The Price Reality Check</h2>
          <p className="mt-4 text-neutral-600">
            Synthesia was built for Fortune 500 training budgets. EduReels was built for teachers,
            tutors, and indie educators.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Synthesia pricing */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Synthesia</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">$22<span className="text-lg text-neutral-400">/mo</span></p>
              <p className="text-sm text-neutral-500">billed annually ($264/year)</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Free plan is a 3-minute demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Watermark on free tier</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Annual commitment required</span>
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
                  <span>Real free tier — not a demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>No watermarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>No long-term commitment</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            At Synthesia&apos;s price, that&apos;s $264/year before you make your first real video.
          </p>
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
                  <th className="text-left py-3 pl-4 font-medium text-neutral-500">Synthesia</th>
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
                          row.winner === 'synthesia'
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-500'
                        }
                      >
                        {row.synthesia}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            Synthesia wins on avatar variety and language support — they&apos;ve been at it longer. 
            EduReels wins on price, education focus, and accessibility for independent creators.
          </p>
        </section>

        {/* Who It's For */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Who Synthesia Is For (And Who It Isn&apos;t)
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Synthesia makes sense if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A large company with L&D budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Producing corporate training videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Need 140+ language support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Want custom avatar cloning</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">EduReels is better if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A teacher creating classroom content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A content creator making educational videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A tutor building self-paced courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A student making a presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Anyone who can&apos;t justify $264/year</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-neutral-600">
            Synthesia serves enterprise training departments. EduReels serves the people who actually
            teach — the independent educators, creators, and students who need great content without
            the corporate price tag.
          </p>
        </section>

        {/* Try It */}
        <section className="py-12 border-t border-neutral-100">
          <div className="bg-neutral-50 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">Try EduReels Now</h2>
            <p className="mt-3 text-neutral-600 max-w-md mx-auto">
              Create your first educational reel right here — no signup required to try.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Start Creating — It&apos;s Free →
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
            Ready to create educational videos without the price tag?
          </h2>
          <p className="mt-3 text-neutral-600">
            Join educators who chose EduReels over $22/mo subscriptions.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
          >
            Create Your First EduReel Free →
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

      {/* Schema Markup */}
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
                item: 'https://edu-reels-two.vercel.app',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'EduReels vs Synthesia',
                item: 'https://edu-reels-two.vercel.app/compare/synthesia',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'EduReels',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '10',
            },
          }),
        }}
      />
    </div>
  );
}
