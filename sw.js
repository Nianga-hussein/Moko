const CACHE_NAME = 'moko-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/flight-listing.html',
  '/service-details.html',
  '/about-us.html',
  '/contact.html',
  '/flight-booking.html',
  '/assets/css/app.css',
  '/assets/css/vendor/bootstrap.min.css',
  '/assets/css/vendor/font-awesome.css',
  '/assets/css/vendor/slick.css',
  '/assets/css/vendor/slick-theme.css',
  '/assets/js/vendor/jquery-3.6.3.min.js',
  '/assets/js/vendor/bootstrap.min.js',
  '/assets/js/vendor/slick.min.js',
  '/assets/js/app.js',
  '/assets/js/categories-data.js',
  '/assets/js/index-categories.js',
  '/assets/media/logo moko (2).png',
  '/assets/media/LOGO.jpg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('MOKO: Caching offline assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('MOKO: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Stale-While-Revalidate
// Serve from cache first, then update from network in background
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension requests or other non-http schemes
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Check if valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          // Clone and cache new response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
            // Network failed, nothing to do if we have cached response
        });

        // Return cached response immediately if available, else wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
