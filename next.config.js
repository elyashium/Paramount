/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Next.js built-in image optimisation (WebP/AVIF, responsive sizes, lazy loading)
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        // Supabase Storage — replace with your project ref if it changes
        protocol: 'https',
        hostname: 'ivfkurnxigxskunoezff.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Cache static assets aggressively
  async headers() {
    return [
      {
        source: '/(:path*\\.(?:jpg|jpeg|png|gif|ico|webp|avif|svg|woff2|woff|ttf|otf))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  // Compress responses
  compress: true,
  transpilePackages: ['@react-three/fiber', 'three', '@react-three/drei'],

  // Ignore ESLint during builds for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
