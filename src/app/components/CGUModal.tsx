'use client';

import { useEffect } from 'react';

interface CGUModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CGUModal({ isOpen, onClose }: CGUModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-gaming text-cyan-400">
            CONDITIONS GÉNÉRALES D&apos;UTILISATION
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="prose prose-invert prose-cyan max-w-none text-white/80 space-y-6">
            
            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">1. Acceptation des Conditions</h3>
              <p className="leading-relaxed">
                En accédant au site web ludhic.fr, vous acceptez d&apos;être lié par ces conditions générales d&apos;utilisation (CGU), 
                toutes les lois et réglementations applicables, et acceptez que vous êtes responsable de la conformité avec les lois 
                locales applicables. Si vous n&apos;êtes pas d&apos;accord avec l&apos;une de ces conditions, vous êtes interdit d&apos;utiliser 
                ou d&apos;accéder à ce site. Les matériaux contenus dans ce site web sont protégés par les lois applicables sur le droit 
                d&apos;auteur et les marques de commerce.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">2. Utilisation du Site</h3>
              <p className="leading-relaxed">
                Le site ludhic.fr est une vitrine pour présenter les travaux des étudiants et anciens étudiants du Master HIC 
                (anciennement MAJIC). Les membres dont les informations ont été recueillies lors de leur adhésion à l&apos;association 
                Ludhic sont les seuls à pouvoir être inscrits avec un compte sur le site. Chaque jeu présenté peut être accompagné 
                de titres, descriptions, images, logos et vidéos, ainsi que des crédits attribués aux membres du projet.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">3. Droits d&apos;Auteur</h3>
              <p className="leading-relaxed">
                Les membres conservent leurs droits d&apos;auteur et toute propriété intellectuelle associée à leurs travaux. 
                L&apos;association Ludhic se réserve le droit d&apos;utiliser, de promouvoir et d&apos;afficher le contenu des travaux sur le site 
                et en dehors du site à des fins de communication et de promotion de l&apos;association et de ses membres.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">4. Confidentialité</h3>
              <p className="leading-relaxed">
                Ludhic.fr est engagé à protéger la confidentialité des membres. Aucune donnée personnelle recueillie lors de 
                l&apos;adhésion ne sera utilisée à des fins autres que celles nécessaires pour la gestion du compte membre sur le site. 
                Pour plus de détails, consultez notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">5. Cookies et Données Techniques</h3>
              <p className="leading-relaxed">
                Le site ludhic.fr utilise des cookies ou des données en cache nécessaires au maintien des sessions des utilisateurs 
                connectés et à l&apos;amélioration de l&apos;expérience utilisateur. Aucune collecte de données à des fins commerciales ou de 
                tracking publicitaire n&apos;est effectuée.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">6. Limitation de Responsabilité</h3>
              <p className="leading-relaxed">
                Ludhic.fr n&apos;est pas responsable du contenu des sites tiers liés à son site web. L&apos;utilisation de tels liens est à 
                la discrétion de l&apos;utilisateur et se fait à ses propres risques. L&apos;association ne saurait être tenue responsable 
                des dommages directs ou indirects résultant de l&apos;utilisation du site.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">7. Modifications des Conditions d&apos;Utilisation</h3>
              <p className="leading-relaxed">
                L&apos;association Ludhic se réserve le droit de réviser ces termes d&apos;utilisation pour son site web à tout moment 
                sans préavis. En utilisant ce site web, vous acceptez d&apos;être lié par la version actuelle de ces Conditions 
                Générales d&apos;Utilisation.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">8. Contact</h3>
              <p className="leading-relaxed">
                Pour toute question concernant ces CGU, veuillez nous contacter à{' '}
                <a href="mailto:ludhic.association@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                  ludhic.association@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">9. Loi Applicable</h3>
              <p className="leading-relaxed">
                Toute réclamation relative au site web ludhic.fr sera régie par les lois de la France sans égard à ses conflits 
                de dispositions légales.
              </p>
            </section>

            <div className="border-t border-gray-700 pt-6 mt-8">
              <p className="text-sm text-white/60 text-center">
                Ces CGU sont effectives à partir du 03 novembre 2023.<br/>
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 