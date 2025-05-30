/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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