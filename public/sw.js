const CACHE = "cachety-/*__VERSION__*/";
const PRECACHE = [/*__PRECACHE__*/];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const c = await caches.open(CACHE);
      await Promise.allSettled(PRECACHE.map((u) => c.add(u)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      // La boîte de réception du partage n'est pas un cache de version : elle
      // ne doit pas être purgée par une mise à jour pendant un partage.
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE && k !== SHARE_CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Partage depuis le téléphone (manifest « share_target ») : le POST ne
// quitte jamais l'appareil. Les fichiers sont rangés dans un cache local
// temporaire que la page vide dès qu'elle les a repris (lib/share-inbox.ts).
const SHARE_CACHE = "cachety-share-inbox";
const SHARE_MAX_FILES = 50;

async function receiveShare(req) {
  try {
    const form = await req.formData();
    const files = form.getAll("files").filter((f) => f instanceof File).slice(0, SHARE_MAX_FILES);
    await caches.delete(SHARE_CACHE);
    const cache = await caches.open(SHARE_CACHE);
    await Promise.all(
      files.map((f, i) =>
        cache.put(
          `/share-inbox/${i}`,
          new Response(f, {
            headers: { "Content-Type": f.type, "X-File-Name": encodeURIComponent(f.name) },
          })
        )
      )
    );
  } catch {
    // Partage illisible : la page s'ouvre simplement sans fichier.
  }
  return Response.redirect("/?shared=1", 303);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method === "POST" && url.origin === self.location.origin && url.pathname === "/share-target") {
    e.respondWith(receiveShare(req));
    return;
  }
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    // Chaque page est mise en cache sous sa propre URL ; hors ligne on sert
    // la page demandée si on l'a, sinon la racine (coquille de l'appli).
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(async () => (await caches.match(req)) || caches.match("/"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
