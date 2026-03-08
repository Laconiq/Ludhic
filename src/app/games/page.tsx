import { Metadata } from 'next';
import gamesData from '@/data/games.json';
import { SITE_URL } from '@/constants/site';
import { createBreadcrumbSchema } from '@/lib/schemas';
import { createSlug } from '@/lib/slug';
import GamesPageContent from '@/app/components/game/GamesPageContent';

export const metadata: Metadata = {
  title: 'Tous les jeux étudiants | Ludhic - Master HIC',
  description: `Explorez les ${gamesData.length} jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Portfolio complet de créations interactives étudiantes.`,
  keywords: [
    'jeux étudiants',
    'portfolio jeux vidéo',
    'Master HIC',
    'créations interactives',
    'Ludhic',
    'game design étudiant',
  ],
  openGraph: {
    title: 'Tous les jeux étudiants - Ludhic',
    description: `Explorez les ${gamesData.length} jeux vidéo créés par les étudiants du Master HIC.`,
    url: `${SITE_URL}/games`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/logo.png`,
        width: 512,
        height: 512,
        alt: 'Ludhic - Portfolio jeux étudiants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tous les jeux étudiants - Ludhic',
    description: `Explorez les ${gamesData.length} jeux vidéo créés par les étudiants du Master HIC.`,
    images: [`${SITE_URL}/images/logo.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/games`,
  },
};

export default function GamesPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Jeux", url: `${SITE_URL}/games` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tous les jeux étudiants Ludhic",
    "numberOfItems": gamesData.length,
    "itemListElement": gamesData.map((game, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": game.title,
      "url": `${SITE_URL}/games/${createSlug(game.title)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <GamesPageContent games={gamesData} />
    </>
  );
}
