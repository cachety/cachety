import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Caractères de contrôle bidirectionnel (LRM, RLM, LRE…PDF, LRI…PDI) : invisibles,
// ils changent l'ordre d'affichage et peuvent masquer du texte. Interdits dans
// les textes publiés : l'ordre correct s'obtient par la formulation.
const BIDI = new RegExp('[\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069]');
const ROOT = join(import.meta.dir, "..");

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p, ext) : ext.test(name) ? [p] : [];
  });
}

describe("hygiène des textes", () => {
  test("aucun caractère de contrôle bidirectionnel dans les README ni les textes du site", () => {
    const targets = [
      ...readdirSync(ROOT).filter((f) => /^README(\.\w+)?\.md$/.test(f)).map((f) => join(ROOT, f)),
      join(ROOT, "ROADMAP.md"),
      ...files(join(ROOT, "lib"), /\.tsx?$/),
    ];
    const offenders = targets.filter((f) => BIDI.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
