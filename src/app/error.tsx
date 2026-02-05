'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 pt-20">
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
          <button
            onClick={reset}
            className="btn-gaming px-6 py-3 rounded-lg font-gaming text-sm md:text-base hover:scale-105 transition-transform cursor-pointer"
          >
            RECOMMENCER
          </button>

          <Link
            href="/"
            className="btn-gaming px-6 py-3 rounded-lg font-gaming text-sm md:text-base hover:scale-105 transition-transform text-center"
          >
            RETOUR AU MENU
          </Link>
        </div>
      </div>
    </div>
  );
}
