'use client';

import { useState } from 'react';
import CGUModal from './CGUModal';
import PrivacyModal from './PrivacyModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCGUModalOpen, setIsCGUModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Liens utiles */}
            <div className="space-y-4">
              <h4 className="text-lg font-gaming text-white mb-4">LIENS UTILES</h4>
              <div className="space-y-3">
                <a 
                  href="https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  Master MAJIC Officiel →
                </a>
                <a 
                  href="https://univ-cotedazur.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  Université Côte d&apos;Azur →
                </a>
                <a 
                  href="#games"
                  className="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  Portfolio Jeux →
                </a>
                <a 
                  href="#faq"
                  className="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  FAQ →
                </a>
              </div>
            </div>

            {/* Contact et infos */}
            <div className="space-y-4">
              <h4 className="text-lg font-gaming text-white mb-4">CONTACT</h4>
              <div className="space-y-3 text-sm">
                <div className="text-white/80">
                  <div className="font-gaming text-cyan-300 mb-1">ASSOCIATION</div>
                  <a 
                    href="mailto:ludhic.association@gmail.com"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    ludhic.association@gmail.com
                  </a>
                </div>
                <div className="text-white/80">
                  <div className="font-gaming text-cyan-300 mb-1">LOCALISATION</div>
                  <div>Campus de Cannes</div>
                  <div>Université Côte d&apos;Azur</div>
                </div>
              </div>
            </div>
          </div>

          {/* Séparateur gaming */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-8"></div>

          {/* Copyright et liens légaux */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/75 text-sm font-gaming">
              © {currentYear} LUDHIC
            </div>
            
            {/* Liens légaux */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs">
              <button
                onClick={() => setIsCGUModalOpen(true)}
                aria-label="Ouvrir les conditions générales d'utilisation"
                className="text-white/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Conditions Générales d&apos;Utilisation
              </button>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                aria-label="Ouvrir la politique de confidentialité"
                className="text-white/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Politique de Confidentialité
              </button>
            </div>
          </div>

          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(45,66,126,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(45,66,126,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CGUModal 
        isOpen={isCGUModalOpen} 
        onClose={() => setIsCGUModalOpen(false)} 
      />
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </>
  );
} 