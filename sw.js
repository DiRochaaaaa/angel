// Service Worker para Angel Oasis
// Versão 2.0 - Cache Inteligente e Otimizado

const VERSION = '2.1.0';
const CACHE_NAME = `angel-oasis-v${VERSION}-${Date.now()}`;
const STATIC_CACHE = `static-${VERSION}`;
const DYNAMIC_CACHE = `dynamic-${VERSION}`;

// Assets estáticos para cache agressivo
const staticAssets = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/js/config.js',
  '/script.js',
  '/manifest.json',
  // Imagens principais
  '/assets/images/Angel-Oasis-logo-300x79.webp',
  '/assets/images/background-image.webp',
  '/assets/images/cropped-Angel-Oasis-wing-32x32.png',
  // Imagens dos anjos
  '/assets/images/ariel.jpg',
  '/assets/images/haniel.jpg',
  '/assets/images/jeremiel-224.jpg',
  '/assets/images/jophiel.jpg',
  '/assets/images/michael.jpg',
  '/assets/images/raguel.jpg',
  '/assets/images/raphael.jpg',
  '/assets/images/raziel.jpg',
  '/assets/images/uriel.jpg',
  // Imagens de prova social
  '/assets/images/provas/mulher1.png',
  '/assets/images/provas/mulher2.jpg',
  '/assets/images/provas/mulher3.jpg',
  '/assets/images/provas/mulher4.jpg',
  '/assets/images/provas/mulher5.png',
  '/assets/images/provas/homem1.jpg',
  '/assets/images/provas/homem2.jpg',
  // Fontes externas
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  console.log('[SW] Installing version:', VERSION);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        console.log('[SW] Caching static assets');
        return cache.addAll(staticAssets);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Estratégia de cache híbrida
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-HTTP
  if (!request.url.startsWith('http')) return;
  
  // Estratégia baseada no tipo de recurso
  if (request.destination === 'document') {
    // HTML: Network First (sempre busca versão mais recente)
    event.respondWith(networkFirst(request));
  } else if (staticAssets.includes(url.pathname) || request.destination === 'image' || request.destination === 'style' || request.destination === 'script') {
    // Assets estáticos: Cache First (performance máxima)
    event.respondWith(cacheFirst(request));
  } else {
    // Outros recursos: Network First com fallback
    event.respondWith(networkFirst(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed for:', request.url);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Ativar Service Worker
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating version:', VERSION);
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar controle imediatamente
      self.clients.claim()
    ])
  );
});

// Mensagens do cliente
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: VERSION });
  }
});
