// Name of the cache
const CACHE_NAME = 'carparks-cache-v1';

// List all the files you want to cache so they can be served offline
const FILES_TO_CACHE = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/Car_parks.csv',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// The 'install' event runs when the service worker is installed.
// This is a good time to cache everything in FILES_TO_CACHE.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// The 'activate' event runs after install.
// It's a good time to clean up old caches if the cache name changed.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Ensure our service worker takes control of the page ASAP.
  self.clients.claim();
});

// The 'fetch' event intercepts network requests.
// If the file is in the cache, serve it. Otherwise, fetch from the network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
