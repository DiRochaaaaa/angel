// Service Worker para Angel Oasis
// Versão 1.0 - Otimizado para velocidade

const CACHE_NAME = 'angel-oasis-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/js/config.js',
  '/assets/images/Angel-Oasis-logo-300x79.webp',
  '/assets/images/background-image.webp',
  '/assets/images/cropped-Angel-Oasis-wing-32x32.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Buscar recursos
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - retorna resposta do cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Atualizar Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
