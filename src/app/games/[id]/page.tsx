import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import gamesData from '../../../data/games.json';
import Image from 'next/image';

interface GamePageProps {
  params: { id: string };
}

// Générer les métadonnées pour chaque jeu
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = gamesData.find(g => g.id === parseInt(params.id));
  
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
      url: `https://ludhic.fr/games/${game.id}`,
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
      canonical: `https://ludhic.fr/games/${game.id}`,
    },
  };
}

// Générer toutes les routes statiques possibles
export async function generateStaticParams() {
  return gamesData.map((game) => ({
    id: game.id.toString(),
  }));
}

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData.find(g => g.id === parseInt(params.id));
  
  if (!game) {
    notFound();
  }

  // Schema.org pour le jeu spécifique
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `https://ludhic.fr/games/${game.id}`,
    "image": `https://ludhic.fr${game.contentFolder}/image1.jpg`,
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
      
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-cyan-400">Accueil</Link></li>
              <li className="before:content-['/'] before:mx-2">
                <Link href="/#games" className="hover:text-cyan-400">Jeux</Link>
              </li>
              <li className="before:content-['/'] before:mx-2 text-white">{game.title}</li>
            </ol>
          </nav>

          {/* Contenu du jeu */}
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={`${game.contentFolder}/image1.jpg`}
                  alt={`Screenshot principal de ${game.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Informations */}
            <div className="space-y-6">
              <header>
                <h1 className="text-4xl font-gaming text-cyan-400 mb-2">{game.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.genres.map(genre => (
                    <span key={genre} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-300">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-lg text-white/80">{game.longDescription}</p>
              </header>

              {/* Équipe */}
              <section>
                <h2 className="text-2xl font-gaming text-cyan-400 mb-4">Équipe de développement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {game.credits.map((member, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="font-semibold text-white">{member.firstName} {member.lastName}</div>
                      <div className="text-sm text-cyan-300">{member.roles.join(', ') || 'Contributeur'}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Métadonnées */}
              <section className="border-t border-gray-700 pt-6">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-white/60">Année</dt>
                    <dd className="font-semibold text-white">{game.year}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Genre</dt>
                    <dd className="font-semibold text-white">{game.genres.join(', ')}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </article>
        </div>
      </div>
    </>
  );
} 