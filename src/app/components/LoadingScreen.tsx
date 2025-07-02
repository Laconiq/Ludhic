'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initialisation...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Chargement des ressources...' },
      { progress: 40, text: 'Préparation de l\'interface...' },
      { progress: 60, text: 'Chargement de la vidéo...' },
      { progress: 80, text: 'Finalisation...' },
      { progress: 100, text: 'Prêt !' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      {/* Background avec effet de grille */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Contenu central */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/images/logo.png"
              alt="Ludhic Logo"
              fill
              className="object-contain filter drop-shadow-lg"
              priority
              quality={95}
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-4xl md:text-6xl font-gaming text-cyan-400 mb-8 animate-pulse">
          LUDHIC
        </h1>

        {/* Loader cyber réimaginé avec glow non coupé, sans petits points orbitaux */}
        <div className="mb-6 flex justify-center overflow-visible p-6">
          <svg width="120" height="120" viewBox="0 0 100 100" className="block relative" style={{ overflow: 'visible' }}>
            {/* Cercle principal qui pulse */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="4"
              style={{
                opacity: 0.5,
                filter: 'drop-shadow(0 0 24px #06b6d4cc)',
                animation: 'loader-pulse 1.6s ease-in-out infinite'
              }}
            />
            {/* Arc lumineux (scan/radar) */}
            <path
              d="M50 12 A38 38 0 0 1 88 50"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                opacity: 0.7,
                filter: 'drop-shadow(0 0 16px #06b6d4cc)',
                transformOrigin: '50px 50px',
                animation: 'loader-scan 1.2s linear infinite'
              }}
            />
            {/* Point central qui pulse */}
            <circle
              cx="50"
              cy="50"
              r="5"
              fill="#06b6d4"
              style={{
                filter: 'drop-shadow(0 0 16px #06b6d4cc)',
                animation: 'loader-center-pulse 1.6s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
        {/* Barre de progression avec glow */}
        <div className="w-64 md:w-80 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-glow-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Texte de chargement */}
        <p className="text-cyan-300 text-lg md:text-xl font-gaming mb-4">
          {loadingText}
        </p>

        {/* Pourcentage */}
        <p className="text-cyan-400 text-sm mt-2 font-gaming">
          Chargement…
        </p>

        {/* Effet de particules */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
} 