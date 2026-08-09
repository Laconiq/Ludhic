import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import gamesData from '@/data/games.json';
import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';
import { getAvailableYears } from '@/lib/filters';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';
import { resolveGameImage } from '@/lib/assetImages';

function urlEntry(loc: string, changefreq: string, priority: number, images?: string[]) {
  const imageTags = (images ?? [])
    .map((url) => `    <image:image>\n      <image:loc>${url}</image:loc>\n    </image:image>`)
    .join('\n');
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${imageTags}\n  </url>`;
}

export const GET: APIRoute = async () => {
  const gameEntries = await Promise.all(
    gamesData.map(async (game) => {
      // Les URL de convention (`/games/<slug>/1.webp`) ne pointent plus vers
      // un fichier réel une fois construites : les images sont traitées par
      // astro:assets et servies sous /_astro/. Il faut résoudre les vraies
      // URL, pas reconstruire le chemin source.
      const [main, logo] = await Promise.all([
        getImage({ src: resolveGameImage(getMainImageUrl(game.contentFolder)), width: 1200, format: 'webp' }),
        getImage({ src: resolveGameImage(getLogoUrl(game.contentFolder)), width: 512, format: 'webp' }),
      ]);
      return urlEntry(`${SITE_URL}/games/${createSlug(game.title)}`, 'monthly', 0.9, [
        `${SITE_URL}${main.src}`,
        `${SITE_URL}${logo.src}`,
      ]);
    })
  );

  const entries = [
    urlEntry(SITE_URL, 'weekly', 1),
    urlEntry(`${SITE_URL}/games`, 'weekly', 0.9),
    ...gameEntries,
    ...getAvailableYears(gamesData).map((year) => urlEntry(`${SITE_URL}/games/year/${year}`, 'monthly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
