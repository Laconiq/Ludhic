const CACHE_NAME = 'ludhic-v1';
const urlsToCache = [
  '/',

  '/images/logo.png',
  '/images/logo-16x16.png',
  '/images/logo-32x32.png',
  '/images/logo-180x180.png',
  '/manifest.json',
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache: Cache First pour les ressources statiques
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Cache les images et les ressources statiques
  if (request.destination === 'image' || 
      request.url.includes('/games/') ||
      request.url.includes('/images/') ||
      request.url.includes('/public/')) {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          // Retourner la réponse du cache si elle existe
          if (response) {
            return response;
          }
          
          // Sinon, faire la requête réseau et mettre en cache
          return fetch(request).then((response) => {
            // Ne pas mettre en cache les erreurs
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cloner la réponse car elle ne peut être utilisée qu'une fois
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            
            return response;
          });
        })
    );
  }
  
  // Pour les autres requêtes, utiliser la stratégie Network First
  else if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettre en cache la réponse si elle est valide
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // En cas d'échec réseau, essayer le cache
          return caches.match(request);
        })
    );
  }
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 