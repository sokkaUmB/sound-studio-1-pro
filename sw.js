// sw.js - Service Worker per Sound Studio (1) Pro for Nothing Ear (PWA Offline)
const CACHE_NAME = "sound-studio-1-pro-v19";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./LICENSE.md",
  "./js/qrcode.min.js",
  "./js/pako.min.js",
  "./js/i18n/i18n-manager.js",
  "./js/i18n/locales/it.js",
  "./js/i18n/locales/en.js",
  "./js/i18n/locales/fr.js",
  "./js/i18n/locales/de.js",
  "./js/i18n/locales/es.js",
  "./js/i18n/locales/ru.js",
  "./js/i18n/locales/zh.js",
  "./js/i18n/locales/hi.js",
  "./js/i18n/locales/ar.js",
  "./js/app.js",
  "./js/database.js",
  "./js/protocol.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon.svg"
];

// Install: pre-cache all assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA SW] Pre-caching offline assets");
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("[PWA SW] Pre-caching warning:", err);
      });
    })
  );
});

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[PWA SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first with network fallback
self.addEventListener("fetch", (event) => {
  // Ignore non-GET requests or external API calls (e.g. Gemini, OpenAI)
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.hostname.includes("googleapis.com") || url.hostname.includes("openai.com") || url.hostname.includes("groq.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background (stale-while-revalidate for local files)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback to index.html for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
