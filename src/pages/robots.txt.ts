import type { APIRoute } from 'astro';
import { SITE_URL } from '@/constants/site';

// Tout est explorable. En particulier /_astro/, qui sert les CSS, JS et
// toutes les images traitées par astro:assets : le bloquer empêchait les
// moteurs autres que Google et Bing d'afficher le rendu et d'indexer les
// images. /bingodir/ n'est pas bloqué non plus : il porte un noindex, que
// les robots ne peuvent lire que s'ils ont le droit d'explorer la page.
export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
