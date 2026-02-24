import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARE_PAGES, BASE_URL, getCompareOgImage } from '@/lib/compare-pages';

const OG_IMAGE = getCompareOgImage('Colossyan');

export const metadata: Metadata = {
  title: 'Colossyan Alternative — Free AI Educational Video Creator | EduReels',
  description:
    'Looking for a free Colossyan alternative? EduReels creates AI-powered educational videos for free. No $19/month subscription. Built for teachers and educators.',
  keywords:
    'colossyan alternative, colossyan vs, ai video generator for educators, free AI video maker, colossyan competitor, educational video creator',
  openGraph: {
    title: 'Colossyan vs EduReels: The Free Educator Alternative',
    description:
      'Colossyan costs $19/month for 10 minutes. EduReels is free for educators. Compare features, pricing, and use cases.',
    url: `${BASE_URL}/compare/colossyan`,
    siteName: 'EduReels',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EduReels vs Colossyan — Free AI Educational Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colossyan vs EduReels: The Free Educator Alternative',
    description:
      'Colossyan costs $19/month for 10 minutes. EduReels is free for educators. Compare features, pricing, and use cases.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/compare/colossyan`,
  },
};

const featureComparison = [
  {
    feature: 'Starting price',
    edureels: 'Free',
    colossyan: '$19/mo (annual) for 10 min',
    winner: 'edureels',
  },
  {
    feature: 'Free tier (ongoing)',
    edureels: 'Yes — real free plan',
    colossyan: 'Trial only — 5 min limit',
    winner: 'edureels',
  },
  {
    feature: 'Built for education',
    edureels: 'Yes — educator-first workflow',
    colossyan: 'No — enterprise L&D focus',
    winner: 'edureels',
  },
  {
    feature: 'AI avatar',
    edureels: 'Yes — educator presenter',
    colossyan: 'Yes — 70+ realistic avatars',
    winner: 'colossyan',
  },
  {
    feature: 'AI script generation',
    edureels: 'Concept → lesson structure',
    colossyan: 'Text-to-video input',
    winner: 'edureels',
  },
  {
    feature: 'SCORM export',
    edureels: 'Not needed for most educators',
    colossyan: 'Yes — enterprise LMS integration',
    winner: 'colossyan',
  },
  {
    feature: 'LMS integration',
    edureels: 'Not needed — simpler workflow',
    colossyan: 'Yes — complex enterprise setup',
    winner: 'colossyan',
  },
  {
    feature: 'Learning curve',
    edureels: 'Low — 3-minute setup',
    colossyan: 'High — enterprise interface',
    winner: 'edureels',
  },
  {
    feature: 'Watermark on free',
    edureels: 'No watermark',
    colossyan: 'Trial only — watermarked',
    winner: 'edureels',
  },
];

const faqs = [
  {
    q: 'Is there a free Colossyan alternative?',
    a: 'Yes. EduReels is completely free to start. Create unlimited educational videos without a subscription. Unlike Colossyan\'s 5-minute trial, EduReels offers a real free tier with no time limit.',
  },
  {
    q: 'What\'s the difference between Colossyan and EduReels?',
    a: 'Colossyan is built for enterprise L&D teams with SCORM compliance, LMS integration, and corporate training features. EduReels is built for individual educators, teachers, and content creators who need fast, free educational video creation without enterprise complexity.',
  },
  {
    q: 'Can I replace Colossyan with EduReels?',
    a: 'If you\'re an educator or content creator making instructional videos, yes. If you need SCORM export, LMS integration, or corporate compliance features for large-scale training departments, Colossyan may still be the right choice for those specific needs.',
  },
  {
    q: 'How much does Colossyan cost?',
    a: 'Colossyan Starter is $19/month (billed annually) for 10 minutes of video per month. Their Business plan is $70/month for 50 minutes. Enterprise pricing is custom. EduReels is free.',
  },
  {
    q: 'Is EduReels really free?',
    a: 'Yes. EduReels is completely free for educators. No credit card required to get started. We\'re built by NC Labs, a product studio that believes educational tools should be accessible to every teacher — not just those with enterprise budgets.',
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
    title: 'Corporate Trainers',
    description: 'Onboarding videos, skill development modules — without the SCORM overhead',
  },
  {
    title: 'YouTube Educators',
    description: 'Channel content, explainer series, educational shorts at zero production cost',
  },
  {
    title: 'Online Course Creators',
    description: 'Udemy, Teachable, Thinkific video content without $19/month tools',
  },
  {
    title: 'Independent Tutors',
    description: 'Personalized lesson videos to share directly with students',
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

export default function CompareColossyanPage() {
  const currentPath = '/compare/colossyan';

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
          <span className="text-neutral-900">EduReels vs Colossyan</span>
        </nav>

        {/* Hero */}
        <section className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
            The Free Colossyan Alternative
            <br />
            for Educators
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            Colossyan costs $19/month for 10 minutes of video. EduReels gives you AI
            educational videos for free — because teachers shouldn&apos;t need enterprise budgets.
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
            {/* Colossyan pricing */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Colossyan</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">$19<span className="text-lg text-neutral-400">/mo</span></p>
              <p className="text-sm text-neutral-500">Starter plan — 10 min/month, billed annually</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>5-minute free trial — not a real free tier</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Enterprise L&D interface — complex for teachers</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>SCORM/LMS features you don&apos;t need</span>
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
                  <span>Real free tier — not a trial</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Built specifically for educators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Simple — 3 minutes to your first video</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What Is Colossyan */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">What Is Colossyan?</h2>
          <p className="mt-4 text-neutral-600">
            Colossyan is an enterprise AI video platform focused on corporate training, L&D
            departments, and compliance content. It offers 70+ realistic talking avatars, SCORM
            exports for LMS systems, and tools designed for training departments at large
            organizations.
          </p>
          <p className="mt-3 text-neutral-600">
            It&apos;s a solid tool for what it does. But what it does is serve enterprise buyers —
            not individual teachers, tutors, or content creators on a teacher&apos;s budget.
          </p>
        </section>

        {/* The Problem */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            The Problem With Colossyan for Educators
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-neutral-900">You&apos;re paying for features you don&apos;t need</h3>
              <p className="mt-1 text-neutral-600">
                SCORM compliance, LMS integration, 70+ corporate avatars, enterprise admin
                controls — these features drive Colossyan&apos;s price up to $19/month. If you&apos;re a
                teacher making concept explainers, you&apos;re subsidizing enterprise features.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">10 minutes per month isn&apos;t enough</h3>
              <p className="mt-1 text-neutral-600">
                The Starter plan gives you 10 minutes of video per month. That&apos;s 3-4 short clips
                at best. If you&apos;re creating weekly content for a class, you&apos;ll blow through
                that in the first week.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">The free trial is barely a test drive</h3>
              <p className="mt-1 text-neutral-600">
                Colossyan&apos;s free trial gives you just 5 minutes. That&apos;s one video — maybe two
                very short ones. Not enough to build a real workflow or evaluate if the tool fits
                your teaching style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Enterprise interface, enterprise complexity</h3>
              <p className="mt-1 text-neutral-600">
                Colossyan is designed for training departments with dedicated production teams.
                The interface reflects this — multiple panels, complex scene editors, avatar
                customization layers. Teachers want simplicity: describe the topic, get the video.
              </p>
            </div>
          </div>
        </section>

        {/* How EduReels Works */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">Built for How Teachers Actually Work</h2>
          <p className="mt-2 text-neutral-600">
            EduReels follows a 4-step process designed around educational content — not corporate training production.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: '1',
                title: 'Define your concept',
                desc: 'Describe the topic and learning level — 5th grade science, university lecture, professional development.',
              },
              {
                step: '2',
                title: 'AI writes the educational script',
                desc: 'Not corporate training copy. Lesson structure: hook → core concept → example → summary → call to action.',
              },
              {
                step: '3',
                title: 'AI presenter delivers it',
                desc: 'A professional educator avatar presents your lesson — feels like a teacher, not a corporate spokesperson.',
              },
              {
                step: '4',
                title: 'Download and share',
                desc: 'MP4 ready for Google Classroom, YouTube, LMS, or anywhere else. No watermark, no enterprise overhead.',
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
                  <th className="text-left py-3 pl-4 font-medium text-neutral-500">Colossyan</th>
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
                          row.winner === 'colossyan'
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-500'
                        }
                      >
                        {row.colossyan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            Colossyan wins on avatar variety, SCORM compliance, and enterprise LMS integration —
            they&apos;re built for corporate L&D. EduReels wins on price, simplicity, and
            educator-focused workflow.
          </p>
        </section>

        {/* Honest Verdict */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Honest Verdict: Who Should Use What
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Use Colossyan if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A corporate L&D team needing SCORM compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Building brand-specific avatar training videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Need LMS integration for compliance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Have enterprise budget for video production</span>
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
                  <span>Anyone who can&apos;t justify $228+/year for video tools</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-neutral-600">
            Colossyan is built for enterprise training. EduReels is built for educators. Different
            tools for different needs — we&apos;re honest about where each one shines.
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
              No subscription. No enterprise pricing. Just the tool you need to teach.
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
            Ready to create educational videos without the enterprise price tag?
          </h2>
          <p className="mt-3 text-neutral-600">
            EduReels takes 3 minutes to set up. Zero dollars to start.
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
      {/* Schema Markup — BreadcrumbList (flat: Home → Compare Colossyan) */}
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
                name: 'Compare Colossyan',
                item: `${BASE_URL}/compare/colossyan`,
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
