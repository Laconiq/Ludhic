import { SITE_URL } from '@/constants/site';
import { createSlug } from '@/lib/slug';
import type { JsonLdSchema } from '@/types/game';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

interface GameSchemaInput {
  title: string;
  longDescription: string;
  contentFolder: string;
  year: number;
  genres: string[];
  hasVideo: boolean;
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
}

interface GameSchemaImages {
  /** URL absolue de la première capture, déjà résolue via astro:assets. */
  main: string;
  /** URL absolue du logo, déjà résolue via astro:assets. */
  logo: string;
  /** URL absolues de toutes les captures, déjà résolues via astro:assets. */
  screenshots: string[];
}

// Les URL d'images sont résolues par l'appelant (astro:assets ne tourne
// qu'au build/SSR) et passées ici déjà prêtes — cette fonction reste une
// fonction pure, sans dépendance à Astro.
export function createVideoGameSchema(game: GameSchemaInput, images: GameSchemaImages) {
  const schema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `${SITE_URL}/games/${createSlug(game.title)}`,
    "image": images.main,
    "screenshot": images.screenshots,
    "thumbnailUrl": images.logo,
    "dateCreated": `${game.year}`,
    "datePublished": `${game.year}-01-01`,
    "genre": game.genres,
    "applicationCategory": "Game",
    "operatingSystem": "Web",
    "creator": game.credits.map(member => ({
      "@type": "Person",
      "name": `${member.firstName} ${member.lastName}`,
      "jobTitle": member.roles[0] || "Contributeur"
    })),
    "publisher": {
      "@type": "Organization",
      "name": "Association Ludhic"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "educationalUse": "Student Project",
    "inLanguage": "fr-FR"
  };

  if (game.hasVideo) {
    schema["video"] = {
      "@type": "VideoObject",
      "name": `${game.title} - Gameplay`,
      "description": `Vidéo de gameplay du jeu ${game.title}`,
      "contentUrl": `${SITE_URL}${game.contentFolder}/video.webm`,
      "thumbnailUrl": images.main,
      "uploadDate": `${game.year}-01-01`
    };
  }

  return schema;
}
