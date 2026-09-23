// Service worker de désinstallation.
//
// L'ancienne app Next enregistrait /sw.js (juin 2025 → février 2026), avec
// une stratégie cache-first sur toute URL contenant /games/ — pages HTML
// comprises. Chez un visiteur de cette période, il tourne encore et peut
// servir une page Next en cache dont les /_next/* répondent 404 depuis la
// migration Astro.
//
// Plus rien n'enregistre ce fichier, mais il doit continuer d'exister : sur
// un 404, le navigateur garde l'ancien worker indéfiniment. À la prochaine
// vérification de mise à jour, celui-ci le remplace, vide les caches, se
// désinscrit et recharge les onglets ouverts sur le réseau.
//
// Pas de gestionnaire `fetch` : aucune requête n'est interceptée.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      await Promise.all(clients.map((client) => client.navigate(client.url)));
    })()
  );
});
