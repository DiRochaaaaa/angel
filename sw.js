// Service Worker para Angel Oasis
// Versão 3.0 - Cache Automático com Build Timestamp

// Gera versão automática baseada no timestamp do deploy
const BUILD_TIMESTAMP = Date.now();
const VERSION = `build-${BUILD_TIMESTAMP}`;
const CACHE_NAME = `angel-oasis-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const DYNAMIC_CACHE = `dynamic-${VERSION}`;

// Detecta se é um novo deploy comparando com cache anterior
const CACHE_PREFIX = 'angel-oasis-';
const DEPLOY_KEY = 'last-deploy-timestamp';

console.log('[SW] Build timestamp:', BUILD_TIMESTAMP);
console.log('[SW] Cache version:', VERSION);

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
  console.log('[SW] Installing new deploy:', VERSION);
  
  // Força instalação imediata para qualquer novo deploy
  self.skipWaiting();
  
  event.waitUntil(
    Promise.all([
      // Detectar e limpar caches de deploys anteriores
      caches.keys().then(cacheNames => {
        console.log('[SW] Existing caches:', cacheNames);
        const oldCaches = cacheNames.filter(name => 
          name.startsWith(CACHE_PREFIX) && !name.includes(VERSION)
        );
        
        if (oldCaches.length > 0) {
          console.log('[SW] New deploy detected! Clearing old caches:', oldCaches);
          return Promise.all(
            oldCaches.map(cacheName => {
              console.log('[SW] Deleting old deploy cache:', cacheName);
              return caches.delete(cacheName);
            })
          );
        } else {
          console.log('[SW] No old caches found, fresh install');
          return Promise.resolve();
        }
      }),
      
      // Cachear assets do novo deploy
      caches.open(STATIC_CACHE).then(function(cache) {
        console.log('[SW] Caching assets for new deploy:', VERSION);
        return cache.addAll(staticAssets).then(() => {
          // Salvar timestamp do deploy atual
          return cache.put(DEPLOY_KEY, new Response(BUILD_TIMESTAMP.toString()));
        });
      })
    ]).then(() => {
      console.log('[SW] New deploy installation complete:', VERSION);
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
  console.log('[SW] Activating new deploy:', VERSION);
  
  event.waitUntil(
    Promise.all([
      // Limpeza final de qualquer cache remanescente de deploys antigos
      caches.keys().then(function(cacheNames) {
        console.log('[SW] Final cleanup on activate:', cacheNames);
        const oldCaches = cacheNames.filter(name => 
          name.startsWith(CACHE_PREFIX) && !name.includes(VERSION)
        );
        
        if (oldCaches.length > 0) {
          console.log('[SW] Cleaning remaining old caches:', oldCaches);
          return Promise.all(
            oldCaches.map(cacheName => {
              console.log('[SW] Final cleanup of:', cacheName);
              return caches.delete(cacheName);
            })
          );
        }
        return Promise.resolve();
      }),
      
      // Tomar controle imediato de todas as abas
      self.clients.claim().then(() => {
        console.log('[SW] New deploy now controlling all tabs:', VERSION);
        
        // Notificar todas as abas sobre o novo deploy
        return self.clients.matchAll().then(clients => {
          console.log('[SW] Notifying', clients.length, 'clients about new deploy');
          clients.forEach(client => {
            client.postMessage({
              type: 'NEW_DEPLOY_ACTIVE',
              version: VERSION,
              buildTimestamp: BUILD_TIMESTAMP,
              message: 'Novo deploy ativo! Recarregando...'
            });
          });
        });
      })
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
