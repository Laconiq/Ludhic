import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import gamesData from '@/data/games.json';
import GamePageContent from '@/app/components/game/GamePageContent';
import RelatedGames from '@/app/components/game/RelatedGames';
import Footer from '@/app/components/layout/Footer';
import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';
import { createBreadcrumbSchema, createVideoGameSchema } from '@/lib/schemas';
import { GameData } from '@/types/game';

function findGameBySlug(slug: string) {
  return gamesData.find(game => createSlug(game.title) === slug);
}

function getRelatedGames(game: GameData, limit = 4): GameData[] {
  const otherGames = gamesData.filter(g => g.id !== game.id);

  const scored = otherGames.map(g => {
    let score = 0;
    if (g.year === game.year) score += 2;
    const commonGenres = g.genres.filter(genre => game.genres.includes(genre));
    score += commonGenres.length;
    return { game: g, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.game);
}

export async function generateMetadata({ params }: { params: Promise<{ title: string }> }): Promise<Metadata> {
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
      url: `${SITE_URL}/games/${createSlug(game.title)}`,
      type: 'article',
      images: [
        {
          url: `${SITE_URL}${game.contentFolder}/1.webp`,
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
      images: [`${SITE_URL}${game.contentFolder}/1.webp`],
    },
    alternates: {
      canonical: `${SITE_URL}/games/${createSlug(game.title)}`,
    },
  };
}

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    title: createSlug(game.title),
  }));
}

export default async function Page({ params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const game = findGameBySlug(decodeURIComponent(title));

  if (!game) {
    notFound();
  }

  const gameSchema = createVideoGameSchema(game);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Jeux", url: `${SITE_URL}/games` },
    { name: game.title, url: `${SITE_URL}/games/${createSlug(game.title)}` }
  ]);

  const relatedGames = getRelatedGames(game);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2)
        }}
      />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <GamePageContent game={game} />
        <RelatedGames games={relatedGames} />
        <Footer />
      </div>
    </>
  );
}
