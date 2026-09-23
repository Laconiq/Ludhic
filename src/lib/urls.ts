import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';

// Chemins publics des pages, tous avec `/` final. C'est la forme que nginx
// sert directement : sans lui, `/games/x` répond 301 vers `/games/x/`
// (try_files `$uri/`). Un lien, une canonical ou une entrée de sitemap sans
// `/` final coûte donc une redirection au visiteur, et envoie à Google une
// URL canonique qui redirige elle-même.

export const HOME_PATH = '/';
export const GAMES_PATH = '/games/';

export function gamePath(title: string): string {
  return `/games/${createSlug(title)}/`;
}

export function yearPath(year: number | string): string {
  return `/games/year/${year}/`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
