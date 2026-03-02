import Navigation from '@/app/components/layout/Navigation';
import GamingButton from '@/app/components/ui/GamingButton';

export default function NotFound() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-gaming text-cyan-400 mb-4">
            NOCLIP DÉTECTÉ
          </h1>
          
          <p className="text-white/80 mb-2 text-lg">
            Oops ! Tu as noclip dans les <span className="text-yellow-400 font-semibold">Backrooms</span>
          </p>
          
          <p className="text-white/60 mb-8 text-sm">
            Cette page n&apos;existe pas... ou peut-être qu&apos;elle est dans un autre niveau ? 🤔
          </p>

          <div className="space-y-4">
            <GamingButton
              href="/"
              size="md"
              className="block w-fit mx-auto"
            >
              🚪 RETOUR À LA RÉALITÉ
            </GamingButton>
            
            <div className="text-xs text-white/40">
              <p>Conseil : Évitez de regarder derrière vous... 👁️</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 