/* Service worker do app Pilates na Parede (escopo /app/).
 * - Arquivos estáticos do Next (/_next/static) e ícones: cache primeiro (são imutáveis).
 * - Páginas: rede primeiro, com cópia em cache para funcionar offline.
 */
const VERSION = 'pnp21-v1';
const CORE = ['/app/', '/app/manifest.webmanifest', '/app/icons/icon-192.png', '/app/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fontes do Google: cache depois do primeiro uso
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(caches.open(VERSION).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; })));
    return;
  }
  if (url.origin !== location.origin || !url.pathname.startsWith('/app/')) return;
  // Requisições internas de navegação do Next (RSC) seguem direto para a rede
  if (url.searchParams.has('_rsc') || req.headers.get('RSC')) return;

  if (url.pathname.startsWith('/app/_next/static/') || url.pathname.startsWith('/app/icons/') || url.pathname.startsWith('/app/media/')) {
    e.respondWith(caches.open(VERSION).then(async c => (await c.match(req)) || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })));
    return;
  }

  e.respondWith(
    fetch(req)
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })
      .catch(async () => (await caches.match(req)) || (await caches.match('/app/')) || Response.error()),
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(list => {
    const open = list.find(c => c.url.includes('/app/'));
    return open ? open.focus() : self.clients.openWindow('/app/');
  }));
});
