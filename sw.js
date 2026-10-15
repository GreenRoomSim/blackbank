// Black Bank service worker: always tries the network first, falls back to the last copy if offline.
const V = "bb-v1";
const SHELL = ["./", "index.html", "order.html", "balance.html", "admin.html", "nav.js", "firebase-config.js", "firebase-init.js", "manifest.json", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;   // never touch Firebase traffic
  e.respondWith(
    fetch(r, { cache: "no-cache" }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); }
      return res;
    }).catch(() => caches.match(r).then(m => m || caches.match("index.html")))
  );
});
