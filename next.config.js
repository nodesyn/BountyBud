/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Optimized for container deployments like repl.it
  experimental: {
    optimizeCss: true,
  },
  // Enable static exports for Replit deployment
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 