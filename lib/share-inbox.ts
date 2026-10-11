// Fichiers reçus par le menu « Partager » du téléphone (Web Share Target).
//
// Le système envoie un POST multipart à /share-target ; le service worker
// (public/sw.js) l'intercepte — rien ne part sur le réseau —, range les
// fichiers dans un cache local temporaire, puis redirige vers /?shared=1.
// La page les reprend ici et SUPPRIME le cache aussitôt : un document
// partagé ne reste pas sur l'appareil au-delà de son chargement.

export const SHARE_CACHE = "cachety-share-inbox";
export const SHARE_PARAM = "shared";

export async function takeSharedFiles(): Promise<File[]> {
  if (typeof caches === "undefined") return [];
  try {
    if (!(await caches.has(SHARE_CACHE))) return [];
    const cache = await caches.open(SHARE_CACHE);
    const files: File[] = [];
    for (const request of await cache.keys()) {
      const response = await cache.match(request);
      if (!response) continue;
      const name = decodeURIComponent(response.headers.get("X-File-Name") ?? "document");
      const type = response.headers.get("Content-Type") ?? "";
      files.push(new File([await response.blob()], name, { type }));
    }
    return files;
  } finally {
    await caches.delete(SHARE_CACHE).catch(() => {});
  }
}
