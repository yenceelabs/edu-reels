import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARE_PAGES, BASE_URL, getCompareOgImage } from '@/lib/compare-pages';

const OG_IMAGE = getCompareOgImage('Pictory');

export const metadata: Metadata = {
  title: 'Pictory Alternative — Free AI Educational Video Maker',
  description:
    'Looking for a Pictory alternative? EduReels creates AI-powered educational videos for free. No credit card, no watermarks. Made for teachers and educators.',
  keywords:
    'pictory alternative, AI video generator free, free AI video maker, pictory competitor, educational video creator, AI video for teachers',
  openGraph: {
    title: 'Pictory vs EduReels: The Free Educator Alternative',
    description:
      'Pictory costs $19-119/month. EduReels is free for educators. Compare features, pricing, and use cases.',
    url: `${BASE_URL}/compare/pictory`,
    siteName: 'EduReels',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EduReels vs Pictory — Free AI Educational Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pictory vs EduReels: The Free Educator Alternative',
    description:
      'Pictory costs $19-119/month. EduReels is free for educators. Compare features, pricing, and use cases.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${BASE_URL}/compare/pictory`,
  },
};

const featureComparison = [
  {
    feature: 'Free tier (ongoing)',
    edureels: 'Yes — real free plan',
    pictory: 'Trial only — then $19+/mo',
    winner: 'edureels',
  },
  {
    feature: 'Starting price',
    edureels: 'Free',
    pictory: '$19/mo (annual) / $23/mo',
    winner: 'edureels',
  },
  {
    feature: 'Built for education',
    edureels: 'Yes — educator script mode',
    pictory: 'No — marketing repurposing',
    winner: 'edureels',
  },
  {
    feature: 'AI educator avatar',
    edureels: 'Yes — talking-head teacher',
    pictory: 'No — stock footage overlays',
    winner: 'edureels',
  },
  {
    feature: 'Watermark on free',
    edureels: 'No watermark',
    pictory: 'Yes — watermarked',
    winner: 'edureels',
  },
  {
    feature: 'Educational script generation',
    edureels: 'Concept-driven (intro → explain → example → summary)',
    pictory: 'Blog-to-video repurposing',
    winner: 'edureels',
  },
  {
    feature: 'Stock footage library',
    edureels: 'Limited',
    pictory: 'Extensive — millions of clips',
    winner: 'pictory',
  },
  {
    feature: 'Blog-to-video conversion',
    edureels: 'Not available',
    pictory: 'Core feature — paste URL or text',
    winner: 'pictory',
  },
  {
    feature: 'Content marketing tools',
    edureels: 'Not the focus',
    pictory: 'Auto-captions, highlights, social clips',
    winner: 'pictory',
  },
];

const faqs = [
  {
    q: 'Is EduReels actually free, or is it a trial?',
    a: 'EduReels is free — not a time-limited trial. You can create educational videos without a credit card or subscription. We offer optional paid features for power users, but the core functionality stays free.',
  },
  {
    q: 'How does EduReels compare to Pictory for educational content?',
    a: "Pictory is excellent for marketing teams converting written content into social videos. EduReels is purpose-built for educators — the AI script generation is optimized for teaching structure (concept intro → explanation → example → summary), and the AI avatar format mirrors how a real teacher presents to students.",
  },
  {
    q: 'Does EduReels have a watermark like Pictory\u2019s free trial?',
    a: "EduReels doesn't add watermarks to your videos on the free plan.",
  },
  {
    q: 'Can I use EduReels for corporate training as well as classroom teaching?',
    a: 'Yes. EduReels works well for any instructional video format — K-12, university, corporate L&D, or online courses. The AI adapts the script style based on your learning objective.',
  },
  {
    q: "What's the catch? Why is EduReels free?",
    a: "EduReels is built by NC Labs, a product studio that believes educational tools should be accessible to independent teachers. We're building a user base before monetizing advanced features. The core educational video creation tool stays free.",
  },
  {
    q: 'Does EduReels support custom avatars or just the default?',
    a: 'Currently EduReels includes a professional AI educator avatar. Custom avatar creation (upload your own likeness) is on the roadmap as a future paid feature.',
  },
];

const useCases = [
  {
    title: 'K-12 Classroom',
    description: 'Quick concept videos, homework walkthroughs, class recaps',
  },
  {
    title: 'University Professors',
    description: 'Flipped classroom content, recorded lectures, assignment guides',
  },
  {
    title: 'Corporate L&D',
    description: 'Onboarding videos, compliance training, skill development modules',
  },
  {
    title: 'YouTube Educators',
    description: 'Channel content, explainer series, supplement lectures',
  },
  {
    title: 'Online Course Creators',
    description: 'Udemy/Teachable/Thinkific video content at zero cost',
  },
  {
    title: 'Independent Tutors',
    description: 'Personalized lesson videos, share with students directly',
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

export default function ComparePictoryPage() {
  const currentPath = '/compare/pictory';

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
          <span className="text-neutral-900">EduReels vs Pictory</span>
        </nav>

        {/* Hero */}
        <section className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
            The Pictory Alternative
            <br />
            That&apos;s Free for Educators
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            Pictory starts at $19/month. EduReels creates AI educational videos at zero cost —
            because teachers have enough expenses already.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create Your First Video Free →
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
            {/* Pictory pricing */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Pictory</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">$19<span className="text-lg text-neutral-400">/mo</span></p>
              <p className="text-sm text-neutral-500">Standard plan, billed annually</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Free trial only — no ongoing free tier</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Watermark on trial videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon />
                  <span>Built for marketing, not teaching</span>
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
                  <span>No watermarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Purpose-built for educators</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why People Look for Alternatives */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Why Educators Are Searching for Pictory Alternatives
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-neutral-900">The price shock</h3>
              <p className="mt-1 text-neutral-600">
                Pictory&apos;s cheapest plan is $23/month billed monthly — that&apos;s $276/year. Most
                teachers fund their own classroom materials. That money goes a lot further on
                supplies, books, or literally anything else.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Wrong tool for the job</h3>
              <p className="mt-1 text-neutral-600">
                Pictory is designed to turn blog posts and marketing copy into videos. It&apos;s excellent
                for content marketing. But it doesn&apos;t think about learning objectives, concept flow,
                or how students absorb information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">The watermark wall</h3>
              <p className="mt-1 text-neutral-600">
                Pictory&apos;s free trial puts a watermark on every video. You can try before you
                commit — but you can&apos;t actually show students a Pictory-watermarked video and call
                it professional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Generic output</h3>
              <p className="mt-1 text-neutral-600">
                Pictory videos look polished but generic. They use stock footage that feels like stock
                footage. EduReels creates a talking-head educator format that feels more like a real
                lesson.
              </p>
            </div>
          </div>
        </section>

        {/* How EduReels Works */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">Built for How Teachers Actually Teach</h2>
          <p className="mt-2 text-neutral-600">
            EduReels follows a 4-step process designed around educational content — not marketing repurposing.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: '1',
                title: 'Define your concept',
                desc: 'Describe the topic and learning objectives — 5th grade science, corporate training, university lecture.',
              },
              {
                step: '2',
                title: 'AI writes the educational script',
                desc: 'Not marketing copy. Lesson structure: hook → core concept → example → summary → CTA to learn more.',
              },
              {
                step: '3',
                title: 'AI avatar delivers it',
                desc: 'A professional educator avatar presents your lesson on screen — feels like a teacher, not a slideshow.',
              },
              {
                step: '4',
                title: 'Download and share',
                desc: 'MP4 ready for LMS, YouTube, Google Classroom, or Zoom. No watermark.',
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
                  <th className="text-left py-3 pl-4 font-medium text-neutral-500">Pictory</th>
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
                          row.winner === 'pictory'
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-500'
                        }
                      >
                        {row.pictory}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            Pictory wins on stock footage, blog-to-video conversion, and content marketing tools —
            they&apos;re built for it. EduReels wins on price, education focus, and the AI educator
            avatar format.
          </p>
        </section>

        {/* When Pictory Is Better */}
        <section className="py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            When Pictory Is Still the Better Choice
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Pictory makes sense if you&apos;re:</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A marketing team repurposing blog content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Need extensive stock footage library</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Turning podcasts/interviews into clips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A content agency producing many videos/month</span>
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
                  <span>An educator making YouTube explainers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>A tutor building self-paced courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Anyone who can&apos;t justify $228+/year</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-neutral-600">
            We&apos;re not competing for the same user. If you&apos;re an educator, EduReels was built
            for you. If you&apos;re a marketer repurposing content, Pictory is still excellent.
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

        {/* Try It */}
        <section className="py-12 border-t border-neutral-100">
          <div className="bg-neutral-50 rounded-lg p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              Start Creating for Free — No Credit Card Required
            </h2>
            <p className="mt-3 text-neutral-600 max-w-md mx-auto">
              Join thousands of educators creating AI-powered videos. EduReels takes 3 minutes to
              set up and zero dollars.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center justify-center text-sm font-medium bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Create Your First Video →
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
            Already using Pictory? Export your scripts and reimport them. We&apos;ll handle the rest.
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
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'EduReels vs Pictory',
                item: `${BASE_URL}/compare/pictory`,
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
          }),
        }}
      />
    </div>
  );
}
