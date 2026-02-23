/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude Remotion server-side packages from webpack bundling.
  // These are Node.js-only and use esbuild/native binaries that webpack can't process.
  // Next.js 14.1 uses experimental.serverComponentsExternalPackages (renamed to serverExternalPackages in 15+)
  experimental: {
    serverComponentsExternalPackages: [
      '@remotion/bundler',
      '@remotion/renderer',
      '@remotion/vercel',
      '@vercel/sandbox',
      'esbuild',
    ],
  },
};

module.exports = nextConfig;
