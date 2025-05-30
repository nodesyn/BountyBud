/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Optimized for container deployments like repl.it
  compress: true, // Enable compression for better performance
  experimental: {
    optimizeCss: true,
  },
  // Enable static exports for Replit deployment
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;