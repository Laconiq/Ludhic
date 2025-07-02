import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import gamesData from '../../../data/games.json';
import GamePageContent from '../../components/GamePageContent';
import Footer from '../../components/Footer';

interface GamePageProps {
  params: Promise<{ title: string }>;
}

// Fonction pour créer un slug à partir du titre
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim();
}

// Fonction pour trouver un jeu par son slug
function findGameBySlug(slug: string) {
  return gamesData.find(game => createSlug(game.title) === slug);
}

// Générer les métadonnées pour chaque jeu
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { title } = await params;
  const game = findGameBySlug(decodeURIComponent(title));
  
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
      url: `https://ludhic.fr/games/${createSlug(game.title)}`,
      type: 'article',
      images: [
        {
          url: `https://ludhic.fr${game.contentFolder}/1.webp`,
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
      images: [`https://ludhic.fr${game.contentFolder}/1.webp`],
    },
    alternates: {
      canonical: `https://ludhic.fr/games/${createSlug(game.title)}`,
    },
  };
}

// Générer toutes les routes statiques possibles
export async function generateStaticParams() {
  return gamesData.map((game) => ({
    title: createSlug(game.title),
  }));
}

export default async function GamePage({ params }: GamePageProps) {
  const { title } = await params;
  const game = findGameBySlug(decodeURIComponent(title));
  
  if (!game) {
    notFound();
  }

  // Schema.org pour le jeu spécifique
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `https://ludhic.fr/games/${createSlug(game.title)}`,
    "image": `https://ludhic.fr${game.contentFolder}/1.webp`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema, null, 2)
        }}
      />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Contenu du jeu */}
        <GamePageContent game={game} />
        <Footer />
      </div>
    </>
  );
} 