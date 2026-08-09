import Modal from './Modal';

interface CGUModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CGUModal({ isOpen, onClose }: CGUModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleId="cgu-modal-title"
      title="CONDITIONS GÉNÉRALES D'UTILISATION"
      closeLabel="Fermer les conditions générales d'utilisation"
    >
      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">1. Acceptation des Conditions</h3>
        <p class="leading-relaxed">
          En accédant au site web ludhic.fr, vous acceptez d&apos;être lié par ces conditions générales d&apos;utilisation (CGU),
          toutes les lois et réglementations applicables, et acceptez que vous êtes responsable de la conformité avec les lois
          locales applicables. Si vous n&apos;êtes pas d&apos;accord avec l&apos;une de ces conditions, vous êtes interdit d&apos;utiliser
          ou d&apos;accéder à ce site. Les matériaux contenus dans ce site web sont protégés par les lois applicables sur le droit
          d&apos;auteur et les marques de commerce.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">2. Utilisation du Site</h3>
        <p class="leading-relaxed">
          Le site ludhic.fr est un portfolio présentant les projets de jeux vidéo réalisés par les étudiants
          et anciens étudiants du Master HIC (anciennement MAJIC). Le site ne requiert aucune inscription ni création
          de compte. Chaque jeu présenté peut être accompagné de titres, descriptions, images, logos et vidéos, ainsi
          que des crédits attribués aux membres du projet. Le site peut également proposer des fonctionnalités
          interactives temporaires (comme le Bingodir) utilisant un pseudonyme choisi librement et stocké
          localement sur votre appareil.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">3. Droits d&apos;Auteur</h3>
        <p class="leading-relaxed">
          Les membres conservent leurs droits d&apos;auteur et toute propriété intellectuelle associée à leurs travaux.
          L&apos;association Ludhic se réserve le droit d&apos;utiliser, de promouvoir et d&apos;afficher le contenu des travaux sur le site
          et en dehors du site à des fins de communication et de promotion de l&apos;association et de ses membres.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">4. Confidentialité</h3>
        <p class="leading-relaxed">
          Le site ludhic.fr ne collecte aucune donnée personnelle de ses visiteurs. Les données des membres de
          l&apos;association (noms, prénoms) sont affichées dans les crédits des projets avec leur consentement.
          Pour plus de détails, consultez notre politique de confidentialité.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">5. Cookies et Données Techniques</h3>
        <p class="leading-relaxed">
          Le site ludhic.fr ne dépose aucun cookie et ne collecte aucune donnée de navigation. Aucun outil d&apos;analyse,
          de tracking publicitaire ou de suivi comportemental n&apos;est utilisé. Certaines fonctionnalités interactives
          peuvent utiliser le stockage local de votre navigateur (localStorage) pour conserver vos préférences
          (comme un pseudonyme). Ces données restent sur votre appareil et ne sont jamais transmises à des tiers.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">6. Limitation de Responsabilité</h3>
        <p class="leading-relaxed">
          Ludhic.fr n&apos;est pas responsable du contenu des sites tiers liés à son site web. L&apos;utilisation de tels liens est à
          la discrétion de l&apos;utilisateur et se fait à ses propres risques. L&apos;association ne saurait être tenue responsable
          des dommages directs ou indirects résultant de l&apos;utilisation du site.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">7. Modifications des Conditions d&apos;Utilisation</h3>
        <p class="leading-relaxed">
          L&apos;association Ludhic se réserve le droit de réviser ces termes d&apos;utilisation pour son site web à tout moment
          sans préavis. En utilisant ce site web, vous acceptez d&apos;être lié par la version actuelle de ces Conditions
          Générales d&apos;Utilisation.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">8. Contact</h3>
        <p class="leading-relaxed">
          Pour toute question concernant ces CGU, veuillez nous contacter à{' '}
          <a href="mailto:ludhic.association@gmail.com" class="text-cyan-400 hover:text-cyan-300">
            ludhic.association@gmail.com
          </a>
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">9. Loi Applicable</h3>
        <p class="leading-relaxed">
          Toute réclamation relative au site web ludhic.fr sera régie par les lois de la France sans égard à ses conflits
          de dispositions légales.
        </p>
      </section>

      <div class="border-t border-[var(--border-primary)] pt-6 mt-8">
        <p class="text-sm text-white/60 text-center">
          Ces CGU sont effectives à partir du 03 novembre 2023.<br/>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>
    </Modal>
  );
}
