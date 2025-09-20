const CACHE_NAME = 'military-card-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'military_card_front_camo_PFC_goldInsignia_HOLLOW.png',
  'military_card_back_camo.png',
  'sailor.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
