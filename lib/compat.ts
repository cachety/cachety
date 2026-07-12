// Compatibilité navigateurs : polyfills minimaux pour pdf.js 6 et détection
// des API indispensables au pipeline. Importable côté serveur (aucun accès à
// window/document au chargement) — surtout pas de "use client" nécessaire ici.

// pdf.js 6 appelle sans garde-fou des API très récentes :
// - Map.prototype.getOrInsertComputed (proposition TC39 « upsert »),
// - Promise.withResolvers, URL.parse.
// Sur un navigateur un peu ancien, le rendu échoue en TypeError générique.
// Tout est polyfillable en quelques lignes, avec garde ??= (jamais écrasé).
//
// IMPORTANT : cette fonction est sérialisée (toString) pour être rejouée dans
// le worker pdf.js (contexte séparé, voir pdfjsWorkerSrc). Elle ne doit donc
// référencer que des globaux — aucune capture de variable du module.
export function installCompatPolyfills() {
  const upsert = (proto: any) => {
    proto.getOrInsert ??= function (this: any, key: unknown, value: unknown) {
      if (!this.has(key)) this.set(key, value);
      return this.get(key);
    };
    proto.getOrInsertComputed ??= function (
      this: any,
      key: unknown,
      cb: (k: unknown) => unknown
    ) {
      if (!this.has(key)) this.set(key, cb(key));
      return this.get(key);
    };
  };
  upsert(Map.prototype);
  upsert(WeakMap.prototype);

  (Promise as any).withResolvers ??= function (this: PromiseConstructor) {
    let resolve!: (v: unknown) => void;
    let reject!: (r?: unknown) => void;
    const promise = new this((res: typeof resolve, rej: typeof reject) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  (URL as any).parse ??= function (url: string, base?: string) {
    try {
      return new URL(url, base);
    } catch {
      return null;
    }
  };
}

// Détection AVANT installation : le worker pdf.js tourne dans le même moteur
// JS que la page, son besoin est donc identique au sien.
const workerNeedsPolyfills =
  typeof Map !== "undefined" &&
  (!("getOrInsertComputed" in Map.prototype) ||
    !("withResolvers" in Promise) ||
    !("parse" in URL));

installCompatPolyfills();

export const PDFJS_WORKER_SRC = "/pdfjs/pdf.worker.min.mjs";

let workerSrcCache: string | undefined;

// Les polyfills posés ci-dessus n'existent pas dans le worker pdf.js
// (contexte isolé). Quand le navigateur en a besoin, on enveloppe le worker
// dans un module blob qui les installe avant de l'importer — même procédé
// que le wrapper CDN de pdf.js, et le CSP autorise worker-src blob:.
// Les navigateurs récents gardent l'URL du fichier, sans détour.
export function pdfjsWorkerSrc(): string {
  if (!workerSrcCache) {
    if (workerNeedsPolyfills && typeof window !== "undefined") {
      const bootstrap =
        `(${installCompatPolyfills.toString()})();\n` +
        `await import(${JSON.stringify(new URL(PDFJS_WORKER_SRC, window.location.href).href)});`;
      workerSrcCache = URL.createObjectURL(
        new Blob([bootstrap], { type: "text/javascript" })
      );
    } else {
      workerSrcCache = PDFJS_WORKER_SRC;
    }
  }
  return workerSrcCache;
}

// API réellement indispensables au pipeline et non polyfillables :
// - createImageBitmap : lecture des images (watermarkImage) et décodage pdf.js ;
// - HTMLCanvasElement.prototype.toBlob : export JPEG/PNG de chaque page ;
// - WebAssembly : décodage JPEG 2000 / profils ICC dans le worker pdf.js
//   (fréquent sur les scans de pièces d'identité).
// Sans jamais toucher window/document au chargement : à n'appeler que côté
// client (useEffect), le HTML statique suppose un navigateur capable.
export function isBrowserSupported(): boolean {
  return (
    typeof createImageBitmap === "function" &&
    typeof HTMLCanvasElement !== "undefined" &&
    typeof HTMLCanvasElement.prototype.toBlob === "function" &&
    typeof WebAssembly === "object"
  );
}
