import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SEOSchema from '../components/SEOSchema';
import GamePageWrapper from '../components/GamePageWrapper';
import gamesData from '../../data/games.json';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

// Générer toutes les routes de jeux
export async function generateStaticParams() {
  return gamesData.map((game) => {
    const folderName = game.contentFolder.split('/').pop();
    return {
      slug: folderName,
    };
  }).filter(Boolean); // Enlever les valeurs nulles/undefined
}

// Générer les métadonnées pour chaque jeu
export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const game = gamesData.find(g => {
    const folderName = g.contentFolder.split('/').pop();
    return folderName === slug;
  });
  
  if (!game) {
    return {
      title: 'Jeu non trouvé | Ludhic',
    };
  }

  return {
    title: `${game.title} | Ludhic - Master HIC`,
    description: `${game.longDescription.slice(0, 160)}...`,
    keywords: [
      game.title,
      ...game.genres,
      `jeu ${game.year}`,
      'Master HIC',
      'étudiant',
      'projet',
      ...game.credits.map(c => `${c.firstName} ${c.lastName}`)
    ],
    openGraph: {
      title: `${game.title} - Jeu étudiant Master HIC`,
      description: game.longDescription,
      url: `https://ludhic.fr/${slug}`,
      type: 'article',
      images: [
        {
          url: `https://ludhic.fr${game.contentFolder}/image1.jpg`,
          width: 1200,
          height: 630,
          alt: `Screenshot du jeu ${game.title}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Jeu étudiant Master HIC`,
      description: game.longDescription.slice(0, 160),
      images: [`https://ludhic.fr${game.contentFolder}/image1.jpg`],
    },
    alternates: {
      canonical: `https://ludhic.fr/${slug}`,
    },
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  // Éviter les conflits avec les routes existantes
  const reservedRoutes = ['bingodir', 'games', 'api'];
  if (reservedRoutes.includes(slug)) {
    notFound();
  }

  // Chercher le jeu par le nom du dossier
  const game = gamesData.find(g => {
    // Extraire le nom du dossier depuis contentFolder
    // "/games/anthares" -> "anthares"
    const folderName = g.contentFolder.split('/').pop();
    return folderName === slug;
  });

  if (!game) {
    notFound();
  }

  // Rendu de la page avec SEO et wrapper client
  return (
    <>
      <SEOSchema games={gamesData} />
      <GamePageWrapper game={game} games={gamesData} />
    </>
  );
} 