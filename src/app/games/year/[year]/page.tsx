import { notFound } from 'next/navigation';
import gamesData from '../../../../data/games.json';
import Image from 'next/image';
import Game from '../../../components/Game';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

export default function YearGamesPage({ params }: { params: { year: string } }) {
  const year = parseInt(params.year, 10);
  if (isNaN(year)) return notFound();

  const gamesOfYear = gamesData.filter(game => game.year === year);
  if (gamesOfYear.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl font-gaming mb-4">Aucun jeu trouvé pour {year}</h1>
        <p className="text-white/60">Il n'y a pas encore de jeux répertoriés pour cette année.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />
      {/* Hero avec bandeau d'images en fond, logos et titre */}
      <section className="relative w-full py-16 md:py-24 bg-gray-900 mb-0 overflow-hidden">
        {/* Bandeau d'images en fond */}
        <div className="absolute inset-0 w-full h-full flex">
          {gamesOfYear.map(game => (
            <div key={game.id} className="relative flex-1 h-full min-w-0">
              <Image
                src={game.contentFolder + '/1.webp'}
                alt={game.title + ' Banner'}
                fill
                className="object-cover w-full h-full blur-sm opacity-70"
                sizes="(max-width: 768px) 100vw, 1800px"
                quality={60}
                priority
              />
            </div>
          ))}
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-gaming foil-effect mb-6">JEUX ÉTUDIANTS {year}</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-gaming">
            Découvrez les créations interactives des étudiants du Master HIC pour l'année {year}.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {gamesOfYear.map(game => (
              <div key={game.id} className="bg-black/40 rounded-xl p-2 md:p-3 flex items-center justify-center shadow-lg">
                <Image
                  src={game.contentFolder + '/logo.webp'}
                  alt={game.title + ' Logo'}
                  width={100}
                  height={40}
                  className="h-12 w-auto md:h-20 object-contain drop-shadow-xl"
                  style={{ maxWidth: '120px' }}
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grille de jeux */}
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
          {gamesOfYear.map(game => (
            <Game
              key={game.id}
              title={game.title}
              longDescription={game.longDescription}
              genres={game.genres}
              contentFolder={game.contentFolder}
              year={game.year}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
} 