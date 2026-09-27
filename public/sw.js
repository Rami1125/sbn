// Service Worker for ח. סבן חומרי בניין (1994) בע״מ PWA
const CACHE_NAME = 'saban-pwa-v1.2.0';
const STATIC_CACHE_NAME = 'saban-static-v1.2.0';
const DYNAMIC_CACHE_NAME = 'saban-dynamic-v1.2.0';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
  '/google4fccee9f84731cf5.html',
  '/returns.html'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-caching non-fatal issue:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Cache-First for static assets, Network-First for product pages & dynamic routes
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET and chrome-extension requests
  if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // 1. Static Assets (Images, Fonts, CSS, JS, Manifest, Icons) -> Cache-First
  const isStaticAsset =
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|css|js|ico)$/i) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('ibb.co');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(STATIC_CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // If offline and image, return SVG icon placeholder
            if (request.destination === 'image') {
              return caches.match('/icon.svg');
            }
            return new Response('', { status: 408, statusText: 'Request timed out' });
          });
      })
    );
    return;
  }

  // 2. Navigation / Product Page / API -> Network-First with Offline Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // Fallback to app root index.html for SPA client-side routing
        if (request.mode === 'navigate') {
          const indexCached = await caches.match('/index.html');
          if (indexCached) return indexCached;
        }
        return new Response(
          '<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>סבן חומרי בניין - מצב לא מקוון</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>ח. סבן חומרי בניין (1994) בע״מ</h2><p>אתה כרגע במצב ללא חיבור לאינטרנט. המידע השמור במכשירך זמין.</p><a href="/" style="color:#0F3E7A;font-weight:bold;">רענן דף</a></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
  );
});

// Push Event - Receive notification from OneSignal or backend
self.addEventListener('push', (event) => {
  let data = {
    title: 'ח. סבן חומרי בניין',
    body: 'ההזמנה שלך עודכנה במערכת סבן!',
    icon: '/pwa-192x192.png',
    badge: '/icon.svg',
    tag: 'saban-order-update',
    url: '/?view=account'
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    } catch (e) {
      data.body = event.data.text() || data.body;
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/pwa-192x192.png',
    badge: data.badge || '/icon.svg',
    tag: data.tag || 'saban-order-status',
    vibrate: [200, 100, 200, 100, 300],
    data: {
      url: data.url || '/?view=account'
    },
    actions: [
      { action: 'open_order', title: '📦 צפה בהזמנה' },
      { action: 'navigate_branch', title: '📍 נווט לסניף' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Event - Focus or open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  let targetUrl = event.notification.data?.url || '/?view=account';

  if (action === 'navigate_branch') {
    targetUrl = 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
