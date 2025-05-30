/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  // Configure for Replit deployment
  async headers() {
    return [
      {
        source: '/api/health',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // Ensure proper port binding for Replit
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000', 10),
  },
};

module.exports = nextConfig;