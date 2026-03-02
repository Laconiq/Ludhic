'use client';

import { useEffect } from 'react';
import GamingButton from '@/app/components/ui/GamingButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-5xl font-gaming text-red-400 mb-4">
          GAME OVER
        </h1>

        <p className="text-white/80 mb-2 text-lg">
          Une erreur inattendue est survenue
        </p>

        <p className="text-white/50 mb-8 text-sm">
          Pas de panique, ça arrive même aux meilleurs speedrunners.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GamingButton
            onClick={reset}
            size="md"
          >
            RECOMMENCER
          </GamingButton>

          <GamingButton
            href="/"
            size="md"
          >
            RETOUR AU MENU
          </GamingButton>
        </div>
      </div>
    </div>
  );
}
