import { useState } from 'preact/hooks';
import CGUModal from './CGUModal';
import PrivacyModal from './PrivacyModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCGUModalOpen, setIsCGUModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer class="bg-gradient-to-t from-[var(--bg-secondary)] to-[var(--bg-primary)] border-t border-[var(--border-primary)]">
        <div class="max-w-7xl mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <h4 class="text-lg font-gaming text-white mb-4">LIENS UTILES</h4>
              <div class="space-y-3">
                <a
                  href="https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  Master MAJIC Officiel →
                </a>
                <a
                  href="https://univ-cotedazur.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming"
                >
                  Université Côte d&apos;Azur →
                </a>
                <a href="#games" class="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming">
                  Portfolio Jeux →
                </a>
                <a href="#faq" class="block text-white/80 hover:text-cyan-300 transition-colors text-sm font-gaming">
                  FAQ →
                </a>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-lg font-gaming text-white mb-4">CONTACT</h4>
              <div class="space-y-3 text-sm">
                <div class="text-white/80">
                  <div class="font-gaming text-cyan-300 mb-1">ASSOCIATION</div>
                  <a href="mailto:ludhic.association@gmail.com" class="hover:text-cyan-300 transition-colors">
                    ludhic.association@gmail.com
                  </a>
                </div>
                <div class="text-white/80">
                  <div class="font-gaming text-cyan-300 mb-1">LOCALISATION</div>
                  <div>Campus de Cannes</div>
                  <div>Université Côte d&apos;Azur</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-8"></div>

          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div class="text-white/75 text-sm font-gaming">
              © {currentYear} LUDHIC
            </div>

            <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs">
              <button
                onClick={() => setIsCGUModalOpen(true)}
                aria-label="Ouvrir les conditions générales d'utilisation"
                class="text-white/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Conditions Générales d&apos;Utilisation
              </button>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                aria-label="Ouvrir la politique de confidentialité"
                class="text-white/60 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Politique de Confidentialité
              </button>
            </div>
          </div>

          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div class="w-full h-full gaming-grid-bg" />
          </div>
        </div>
      </footer>

      <CGUModal isOpen={isCGUModalOpen} onClose={() => setIsCGUModalOpen(false)} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </>
  );
}
