import { SITE_URL } from '@/constants/site';
import { createSlug } from '@/lib/slug';

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
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
}

export function createVideoGameSchema(game: GameSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `${SITE_URL}/games/${createSlug(game.title)}`,
    "image": `${SITE_URL}${game.contentFolder}/1.webp`,
    "dateCreated": `${game.year}`,
    "genre": game.genres,
    "creator": game.credits.map(member => ({
      "@type": "Person",
      "name": `${member.firstName} ${member.lastName}`,
      "jobTitle": member.roles[0] || "Contributeur"
    })),
    "publisher": {
      "@type": "Organization",
      "name": "Association Ludhic"
    },
    "educationalUse": "Student Project",
    "inLanguage": "fr-FR"
  };
}
