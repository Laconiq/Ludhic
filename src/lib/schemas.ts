import { SITE_URL } from '@/constants/site';
import { createSlug } from '@/lib/slug';
import { getAllImageUrls, getLogoUrl } from '@/lib/images';

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
  imageCount: number;
  hasVideo: boolean;
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
}

export function createVideoGameSchema(game: GameSchemaInput) {
  const screenshots = getAllImageUrls(game.contentFolder, game.imageCount).map(
    (url) => `${SITE_URL}${url}`
  );

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `${SITE_URL}/games/${createSlug(game.title)}`,
    "image": `${SITE_URL}${game.contentFolder}/1.webp`,
    "screenshot": screenshots,
    "thumbnailUrl": `${SITE_URL}${getLogoUrl(game.contentFolder)}`,
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
      "thumbnailUrl": `${SITE_URL}${game.contentFolder}/1.webp`,
      "uploadDate": `${game.year}-01-01`
    };
  }

  return schema;
}
