// Service worker for caching strategies
const CACHE_NAME = 'edigital-v1';
const urlsToCache = [
  '/',
  '/data/courses.json',
  '/logo.webp',
  '/favicon.webp'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Don't cache requests to external APIs
  if (event.request.url.includes('be.edigital.globalinfosofts.com') ||
      event.request.url.includes('googletagmanager.com') ||
      event.request.url.includes('facebook.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then(response => {
          // Cache important responses
          if (response.status === 200 && 
              (event.request.url.endsWith('.webp') || 
               event.request.url.endsWith('.json') ||
               event.request.url === self.location.origin + '/')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});