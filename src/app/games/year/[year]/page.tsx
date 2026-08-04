import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import gamesData from '@/data/games.json';
import Image from 'next/image';
import GameCard from '@/app/components/game/GameCard';
import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';
import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';
import { createBreadcrumbSchema } from '@/lib/schemas';
import JsonLd from '@/app/components/seo/JsonLd';

function getGamesOfYear(year: number) {
  return gamesData.filter(game => game.year === year);
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year: yearParam } = await params;
  const year = parseInt(yearParam, 10);
  if (isNaN(year)) return { title: 'Année non trouvée' };

  const gamesOfYear = getGamesOfYear(year);
  if (gamesOfYear.length === 0) return { title: 'Année non trouvée' };

  const allGenres = [...new Set(gamesOfYear.flatMap(g => g.genres))];
  const description = `Découvrez les ${gamesOfYear.length} jeux vidéo créés par les étudiants du Master HIC en ${year}. Projets étudiants en ${allGenres.slice(0, 3).join(', ')}.`;
  const firstGameImage = `${SITE_URL}${getMainImageUrl(gamesOfYear[0].contentFolder)}`;

  return {
    title: `Jeux étudiants ${year}`,
    description,
    keywords: [
      `jeux ${year}`,
      ...allGenres,
      'Master HIC',
      'jeux étudiants',
      'Ludhic',
      'projets étudiants',
    ],
    openGraph: {
      title: `Jeux étudiants ${year} - Master HIC`,
      description,
      url: `${SITE_URL}/games/year/${year}`,
      type: 'article',
      images: [
        {
          url: firstGameImage,
          width: 1200,
          height: 630,
          alt: `Jeux étudiants Master HIC ${year}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Jeux étudiants ${year} - Master HIC`,
      description: description.slice(0, 160),
      images: [firstGameImage],
    },
    alternates: {
      canonical: `${SITE_URL}/games/year/${year}`,
    },
  };
}

export async function generateStaticParams() {
  const years = Array.from(new Set(gamesData.map(game => game.year)));
  return years.map(year => ({ year: year.toString() }));
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearParam } = await params;
  const year = parseInt(yearParam, 10);
  if (isNaN(year)) return notFound();

  const gamesOfYear = getGamesOfYear(year);
  if (gamesOfYear.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-white">
        <h1 className="text-4xl font-gaming mb-4">Aucun jeu trouvé pour {year}</h1>
        <p className="text-white/60">Il n&apos;y a pas encore de jeux répertoriés pour cette année.</p>
      </div>
    );
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Jeux", url: `${SITE_URL}/games` },
    { name: `${year}`, url: `${SITE_URL}/games/year/${year}` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Jeux étudiants ${year}`,
    "numberOfItems": gamesOfYear.length,
    "itemListElement": gamesOfYear.map((game, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": game.title,
      "url": `${SITE_URL}/games/${createSlug(game.title)}`,
    })),
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, itemListSchema]} />
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
        <Navigation />
        <section className="relative w-full py-16 md:py-24 bg-[var(--bg-primary)] mb-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full flex">
            {gamesOfYear.map((game, index) => (
              <div key={game.id} className="relative flex-1 h-full min-w-0">
                <Image
                  src={getMainImageUrl(game.contentFolder)}
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover w-full h-full blur-sm opacity-70"
                  sizes="(max-width: 768px) 50vw, 320px"
                  quality={50}
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl md:text-5xl font-gaming foil-effect mb-6">JEUX ÉTUDIANTS {year}</h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-gaming">
              Découvrez les créations interactives des étudiants du Master HIC pour l&apos;année {year}.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {gamesOfYear.map(game => (
                <div key={game.id} className="bg-black/40 rounded-xl p-2 md:p-3 flex items-center justify-center shadow-lg">
                  <Image
                    src={getLogoUrl(game.contentFolder)}
                    alt={game.title + ' Logo'}
                    width={100}
                    height={40}
                    className="h-12 w-auto md:h-20 object-contain drop-shadow-xl"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-16 pt-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
            {gamesOfYear.map((game, index) => (
              <GameCard key={game.id} game={game} priority={index < 4} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
