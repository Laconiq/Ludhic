import Modal from './Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleId="privacy-modal-title"
      title="POLITIQUE DE CONFIDENTIALITÉ"
      closeLabel="Fermer la politique de confidentialité"
    >
      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Introduction</h3>
        <p class="leading-relaxed">
          L&apos;association Ludhic s&apos;engage à protéger la vie privée et les données personnelles de ses membres.
          Cette politique de confidentialité vise à informer les visiteurs et membres de nos pratiques en matière
          de gestion et de protection des données personnelles conformément au Règlement Général sur la Protection
          des Données (RGPD) et aux lois françaises applicables.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Données Affichées sur le Site</h3>
        <p class="leading-relaxed mb-4">
          Le site ludhic.fr est un portfolio statique qui ne collecte aucune donnée personnelle de ses visiteurs.
          Les seules données personnelles présentes sur le site sont les crédits des projets (prénoms et noms des
          membres), affichés avec le consentement des personnes concernées.
        </p>
        <p class="leading-relaxed">
          Les informations collectées lors de l&apos;adhésion à l&apos;association (email, adresse postale, téléphone)
          sont gérées en dehors du site et ne sont pas accessibles publiquement.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Utilisation des Données</h3>
        <p class="leading-relaxed">
          Les données personnelles des membres sont utilisées exclusivement dans le cadre des activités de l&apos;association :
        </p>
        <ul class="list-disc list-inside space-y-2 text-white/70 mt-4">
          <li>Communication avec les membres</li>
          <li>Présentation des projets étudiants (crédits)</li>
          <li>Promotion de l&apos;association et de ses membres</li>
        </ul>
        <p class="leading-relaxed mt-4">
          Vos données ne sont pas partagées avec des tiers, sauf obligation légale ou consentement explicite.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Cookies et Technologies de Suivi</h3>
        <p class="leading-relaxed">
          Le site ludhic.fr ne dépose aucun cookie et ne collecte aucune donnée de navigation.
          Aucun outil d&apos;analyse, de tracking publicitaire ou de suivi comportemental n&apos;est utilisé.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Droits des Utilisateurs (RGPD)</h3>
        <p class="leading-relaxed mb-4">
          Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul class="list-disc list-inside space-y-2 text-white/70">
          <li><strong>Droit à l&apos;information</strong> : être informé de l&apos;utilisation de vos données</li>
          <li><strong>Droit d&apos;accès</strong> : accéder à vos données personnelles</li>
          <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
          <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
          <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
          <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format lisible</li>
          <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
        </ul>
        <p class="leading-relaxed mt-4">
          Pour exercer ces droits, contactez-nous à{' '}
          <a href="mailto:ludhic.association@gmail.com" class="text-cyan-400 hover:text-cyan-300">
            ludhic.association@gmail.com
          </a>
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Sécurité des Données</h3>
        <p class="leading-relaxed">
          Nous prenons la sécurité des données au sérieux et utilisons des mesures de sécurité appropriées
          pour empêcher l&apos;accès non autorisé, la divulgation, la modification ou la destruction non autorisée
          des données. Nos serveurs sont hébergés dans l&apos;Union Européenne (Pays-Bas) et respectent les normes de sécurité européennes.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Hébergement</h3>
        <p class="leading-relaxed">
          Le site est hébergé par Railway Corp. sur des serveurs situés dans l&apos;Union Européenne (région europe-west4,
          Pays-Bas). Le site ne collecte aucune donnée personnelle de navigation. La page Bingodir utilise un pseudonyme
          stocké localement sur votre appareil (localStorage) qui n&apos;est jamais transmis à des tiers.
        </p>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Responsable de la Protection des Données</h3>
        <p class="leading-relaxed">
          L&apos;association Ludhic est le responsable de la protection des données. Pour toute question relative
          à la vie privée et à la protection des données personnelles, contactez-nous :
        </p>
        <div class="bg-[var(--bg-tertiary)]/50 rounded-lg p-4 mt-4">
          <p class="text-white/90">
            <strong>Email :</strong>{' '}
            <a href="mailto:ludhic.association@gmail.com" class="text-cyan-400 hover:text-cyan-300">
              ludhic.association@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-gaming text-cyan-400 mb-3">Modifications de la Politique</h3>
        <p class="leading-relaxed">
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
          Toute modification substantielle sera notifiée aux membres et entrera en vigueur après publication
          sur notre site web.
        </p>
      </section>

      <div class="border-t border-[var(--border-primary)] pt-6 mt-8">
        <p class="text-sm text-white/60 text-center">
          Cette politique est effective à partir du 03 novembre 2023.<br/>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>
    </Modal>
  );
}
