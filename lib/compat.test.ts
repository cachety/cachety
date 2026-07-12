import { afterEach, describe, expect, test } from "bun:test";
import { installCompatPolyfills, PDFJS_WORKER_SRC, pdfjsWorkerSrc } from "./compat";

// Sauvegarde des éventuelles implémentations natives, restaurées après les
// tests qui les suppriment pour forcer le chemin polyfill.
const proto = Map.prototype as any;
const natives = {
  getOrInsert: proto.getOrInsert,
  getOrInsertComputed: proto.getOrInsertComputed,
};

afterEach(() => {
  for (const [name, fn] of Object.entries(natives)) {
    if (fn) proto[name] = fn;
    else delete proto[name];
  }
  installCompatPolyfills();
});

describe("compat (polyfills « upsert » pour pdf.js 6)", () => {
  test("le polyfill s'installe sur un prototype qui en est privé", () => {
    delete proto.getOrInsert;
    delete proto.getOrInsertComputed;
    installCompatPolyfills();
    expect(typeof proto.getOrInsert).toBe("function");
    expect(typeof proto.getOrInsertComputed).toBe("function");
  });

  test("getOrInsert insère la valeur si absente, sinon renvoie l'existante", () => {
    delete proto.getOrInsert;
    installCompatPolyfills();
    const m = new Map<string, number>() as any;
    expect(m.getOrInsert("a", 1)).toBe(1);
    expect(m.getOrInsert("a", 2)).toBe(1);
    expect(m.get("a")).toBe(1);
  });

  test("getOrInsertComputed calcule via cb(clé) une seule fois", () => {
    delete proto.getOrInsertComputed;
    installCompatPolyfills();
    const m = new Map<string, number[]>() as any;
    let calls = 0;
    const arr = m.getOrInsertComputed("k", (key: string) => {
      calls++;
      expect(key).toBe("k");
      return [];
    });
    arr.push(1);
    expect(m.getOrInsertComputed("k", () => [])).toBe(arr);
    expect(calls).toBe(1);
  });

  test("les implémentations natives ne sont jamais écrasées (garde ??=)", () => {
    const sentinel = () => "natif";
    proto.getOrInsert = sentinel;
    installCompatPolyfills();
    expect(proto.getOrInsert).toBe(sentinel);
  });

  test("Promise.withResolvers et URL.parse respectent leur contrat", async () => {
    // Natifs ou polyfillés selon le moteur : le contrat est le même.
    const { promise, resolve } = (Promise as any).withResolvers();
    resolve(42);
    expect(await promise).toBe(42);
    expect((URL as any).parse("https://exemple.fr/x")?.pathname).toBe("/x");
    expect((URL as any).parse("pas une url")).toBeNull();
  });

  test("pdfjsWorkerSrc reste l'URL du fichier hors navigateur (SSR-safe)", () => {
    expect(pdfjsWorkerSrc()).toBe(PDFJS_WORKER_SRC);
  });
});
