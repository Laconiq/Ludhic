import type { APIRoute } from 'astro';
import gamesData from '@/data/games.json';
import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';
import { getAvailableYears } from '@/lib/filters';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';

function urlEntry(loc: string, changefreq: string, priority: number, images?: string[]) {
  const imageTags = (images ?? [])
    .map((url) => `    <image:image>\n      <image:loc>${url}</image:loc>\n    </image:image>`)
    .join('\n');
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${imageTags}\n  </url>`;
}

export const GET: APIRoute = () => {
  const entries = [
    urlEntry(SITE_URL, 'weekly', 1),
    urlEntry(`${SITE_URL}/games`, 'weekly', 0.9),
    ...gamesData.map((game) =>
      urlEntry(`${SITE_URL}/games/${createSlug(game.title)}`, 'monthly', 0.9, [
        `${SITE_URL}${getMainImageUrl(game.contentFolder)}`,
        `${SITE_URL}${getLogoUrl(game.contentFolder)}`,
      ])
    ),
    ...getAvailableYears(gamesData).map((year) => urlEntry(`${SITE_URL}/games/year/${year}`, 'monthly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
