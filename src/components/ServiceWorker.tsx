'use client';

import { useEffect } from 'react';

export default function ServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker enregistré avec succès:', registration.scope);
            
            // Vérifier les mises à jour
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Nouvelle version disponible
                    console.log('Nouvelle version disponible');
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.log('Échec de l\'enregistrement du Service Worker:', error);
          });
      });
    }
  }, []);

  return null;
} 