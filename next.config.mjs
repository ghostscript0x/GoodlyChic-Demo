import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a parent lockfile cannot be auto-detected.
  outputFileTracingRoot: projectRoot,
  // Lint is run explicitly with `npm run lint` (flat config, ESLint 9).
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Placeholder-free local photography only. No remote patterns are needed yet;
    // add them here when real product/CDN photography goes live.
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
