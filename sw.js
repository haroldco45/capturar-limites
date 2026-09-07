/* Capturar límites — Service Worker
   Desarrollada por Vibras Positivas HM — Derechos de Autor Reservados */
const VERSION = 'capturar-limites-v1';
const TILES = 'capturar-limites-tiles';
const BASICOS = [
  './', './index.html', './manifest.json',
  './vendor/leaflet.js', './vendor/leaflet.css',
  './img/icon-192.png', './img/icon-512.png', './img/icon-maskable-512.png', './img/favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.allSettled(BASICOS.map(u => c.add(u))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  // El caché de tiles no se toca: es el mapa que el usuario descargó a propósito.
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Imágenes del mapa: primero lo guardado, y lo que llegue nuevo se guarda.
  if (url.hostname === 'tile.openstreetmap.org') {
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try { const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; }
      catch { return new Response('', { status: 504 }); }
    }));
    return;
  }

  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)
    .then(r => {
      if (r.ok && url.origin === location.origin) {
        const copia = r.clone();
        caches.open(VERSION).then(c => c.put(e.request, copia));
      }
      return r;
    })
    .catch(() => caches.match('./index.html'))));
});
