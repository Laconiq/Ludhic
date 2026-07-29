import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,

  experimental: {
    optimizeCss: true,
    viewTransition: true,
  },

  async headers() {
    return [
      {
        // Dossiers de `public/` qui ne contiennent que des fichiers statiques.
        source: '/:dir(images|videos|fonts)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Sous `/games`, seuls les fichiers d'assets sont immuables : les pages
        // `/games`, `/games/[title]` et `/games/year/[year]` doivent rester
        // revalidables, sinon un visiteur garde un an une page périmée.
        source: '/games/:slug/:file(.+\\.(?:webp|avif|png|jpe?g|gif|svg|webm|mp4))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  generateEtags: false,

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
