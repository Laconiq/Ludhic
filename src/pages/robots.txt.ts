import type { APIRoute } from 'astro';
import { SITE_URL } from '@/constants/site';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Allow: /games/
Allow: /images/
Allow: /videos/
Allow: /fonts/
Disallow: /_astro/
Disallow: /api/
Disallow: /sw.js
Disallow: /manifest.json
Disallow: /browserconfig.xml
Disallow: /.env
Disallow: /.git/
Disallow: /node_modules/
Disallow: /bingodir/

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
