'use client';

import { useEffect } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
            POLITIQUE DE CONFIDENTIALITÉ
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
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Introduction</h3>
              <p className="leading-relaxed">
                L&apos;association Ludhic s&apos;engage à protéger la vie privée et les données personnelles de ses membres. 
                Cette politique de confidentialité vise à informer nos utilisateurs de nos pratiques en matière de collecte, 
                d&apos;utilisation, de gestion et de protection de leurs données personnelles conformément au Règlement Général 
                sur la Protection des Données (RGPD) et aux lois françaises applicables.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Données Personnelles Collectées</h3>
              <p className="leading-relaxed mb-4">
                Nous collectons les informations suivantes lors de l&apos;adhésion à l&apos;association Ludhic :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Prénom et nom</li>
                <li>Adresse e-mail</li>
                <li>Adresse postale</li>
                <li>Numéro de téléphone</li>
                <li>Informations sur le parcours académique (Master HIC)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Ces données sont nécessaires pour créer un compte membre sur notre site, gérer votre adhésion, 
                et présenter vos travaux dans le portfolio des étudiants.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Utilisation des Données</h3>
              <p className="leading-relaxed">
                Les données personnelles collectées sont utilisées exclusivement dans le cadre des activités de l&apos;association :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 mt-4">
                <li>Gestion des comptes membres</li>
                <li>Communication avec les membres</li>
                <li>Présentation des projets étudiants</li>
                <li>Promotion de l&apos;association et de ses membres</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Vos données ne sont pas partagées avec des tiers, sauf obligation légale ou consentement explicite.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Cookies et Technologies de Suivi</h3>
              <p className="leading-relaxed">
                Le site ludhic.fr utilise uniquement des cookies techniques nécessaires au fonctionnement du site 
                (sessions utilisateurs, préférences). Nous n&apos;utilisons pas de cookies de tracking publicitaire 
                ou d&apos;analyse comportementale à des fins commerciales.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Droits des Utilisateurs (RGPD)</h3>
              <p className="leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li><strong>Droit à l&apos;information</strong> : être informé de l&apos;utilisation de vos données</li>
                <li><strong>Droit d&apos;accès</strong> : accéder à vos données personnelles</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format lisible</li>
                <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:ludhic.association@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                  ludhic.association@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Sécurité des Données</h3>
              <p className="leading-relaxed">
                Nous prenons la sécurité des données au sérieux et utilisons des mesures de sécurité appropriées 
                pour empêcher l&apos;accès non autorisé, la divulgation, la modification ou la destruction non autorisée 
                des données. Nos serveurs sont hébergés en Europe et respectent les normes de sécurité européennes.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Hébergement et Transferts de Données</h3>
              <p className="leading-relaxed">
                Aucun transfert de données personnelles n&apos;est effectué en dehors de l&apos;Union Européenne. 
                Notre hébergeur, Hostinger, est basé en Lituanie et adhère aux normes de protection des données de l&apos;UE. 
                Toutes les données restent sur des serveurs européens conformes au RGPD.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Responsable de la Protection des Données</h3>
              <p className="leading-relaxed">
                L&apos;association Ludhic est le responsable de la protection des données. Pour toute question relative 
                à la vie privée et à la protection des données personnelles, contactez-nous :
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                <p className="text-white/90">
                  <strong>Email :</strong>{' '}
                  <a href="mailto:ludhic.association@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                    ludhic.association@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-gaming text-cyan-400 mb-3">Modifications de la Politique</h3>
              <p className="leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Toute modification substantielle sera notifiée aux membres et entrera en vigueur après publication 
                sur notre site web.
              </p>
            </section>

            <div className="border-t border-gray-700 pt-6 mt-8">
              <p className="text-sm text-white/60 text-center">
                Cette politique est effective à partir du 03 novembre 2023.<br/>
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 