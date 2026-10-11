import { describe, expect, test } from "bun:test";
import { SITE_COPY } from "./site-copy";
import { LANG_CODES } from "./site-meta";

/** Structure d'un objet : clés et longueurs de listes, sans les valeurs. */
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (typeof v === "function") return "fn";
  if (v && typeof v === "object")
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]));
  return typeof v;
}

describe("textes du site (parité entre toutes les langues)", () => {
  test("même structure dans les quatre langues", () => {
    for (const l of LANG_CODES) expect(shape(SITE_COPY[l])).toEqual(shape(SITE_COPY.fr));
  });

  test("aucun texte vide", () => {
    const walk = (v: unknown): void => {
      if (typeof v === "string") expect(v.trim().length).toBeGreaterThan(0);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    for (const l of LANG_CODES) walk(SITE_COPY[l]);
  });
});
