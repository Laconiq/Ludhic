import Hero from '@/app/components/layout/Hero';
import GameGrid from '@/app/components/game/GameGrid';
import FAQ from '@/app/components/layout/FAQ';
import Footer from '@/app/components/layout/Footer';
import Navigation from '@/app/components/layout/Navigation';
import SEOSchema from '@/app/components/seo/SEOSchema';
import gamesData from '@/data/games.json';


export default function Home() {
  return (
    <>
      <SEOSchema games={gamesData} />
      <Navigation />
      <main>
        <Hero />
        <GameGrid games={gamesData} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
