/* ===== FlyersFC — service worker ===== */
'use strict';

const CACHE_NAME = 'flyerfc-v6';
const APP_SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/vocab-starters.js',
  './js/vocab-movers.js',
  './js/vocab-flyers.js',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function cachePut(request, response) {
  if (!response || (!response.ok && response.type !== 'opaque')) return response;
  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request)
          .then((response) => cachePut(request, response))
          .catch(() => caches.match('./index.html'))
      );
      return;
    }
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          fetch(request).then((response) => cachePut(request, response)).catch(() => {});
          return cached;
        }
        return fetch(request).then((response) => cachePut(request, response));
      })
    );
    return;
  }

  if (/(^|\.)fonts\.googleapis\.com$/.test(url.hostname) || /(^|\.)fonts\.gstatic\.com$/.test(url.hostname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => cachePut(request, response));
      })
    );
  }
});
