import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,

  // `pnpm-workspace.yaml` fait croire à Turbopack qu'on est dans un monorepo et
  // lui fait inférer une racine erronée. On la fixe explicitement.
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    // AVIF coûte plusieurs fois le CPU de WebP à l'encodage, pour un gain nul
    // ici : les sources sont déjà des WebP. Un seul format = un seul encodage
    // par variante, et un cache qui ne se dédouble pas selon le navigateur.
    formats: ['image/webp'],

    // Plafond volontaire à 1080. Les sources font 1920 px : à cette largeur
    // l'optimiseur ne redimensionne plus et se contente de ré-encoder, ce qui
    // produit ~717 Ko par visuel contre 73 Ko en 1080 — pour des captures
    // affichées au plus dans 1200 px. Un écran DPR2 demande toujours le double
    // de la taille annoncée, donc seul ce plafond borne réellement le poids.
    deviceSizes: [640, 828, 1080],
    imageSizes: [64, 128, 256],

    // Next 16 n'autorise que les qualités listées ici (défaut : [75]) et
    // répond 400 pour toute autre valeur. 50 sert aux visuels floutés.
    qualities: [50, 75],

    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compress: true,

  experimental: {
    optimizeCss: true,
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
