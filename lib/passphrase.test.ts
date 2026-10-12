import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { BIP39_ENGLISH } from "./bip39-english";
import { generatePassphrase, isPassphrase, PASSPHRASE_BITS, PASSPHRASE_WORDS } from "./passphrase";
import { passwordUtf8Length } from "./file-password";

describe("liste BIP39", () => {
  test("identique à l'original (empreinte SHA-256 de english.txt)", () => {
    const digest = createHash("sha256").update(BIP39_ENGLISH.join("\n") + "\n").digest("hex");
    expect(digest).toBe("2f5eed53a4727b4bf8880d8f3f199efc90e58503646d9ff8eff3a2ed3b24dbda");
  });

  test("2 048 mots distincts, a-z, quatre premières lettres uniques", () => {
    expect(BIP39_ENGLISH).toHaveLength(2048);
    expect(new Set(BIP39_ENGLISH).size).toBe(2048);
    for (const w of BIP39_ENGLISH) expect(w).toMatch(/^[a-z]{3,8}$/);
    expect(new Set(BIP39_ENGLISH.map((w) => w.slice(0, 4))).size).toBe(2048);
  });
});

describe("generatePassphrase", () => {
  test("12 mots de la liste, séparés par des tirets, 132 bits", () => {
    const p = generatePassphrase();
    expect(p.split("-")).toHaveLength(PASSPHRASE_WORDS);
    expect(isPassphrase(p)).toBe(true);
    expect(PASSPHRASE_BITS).toBe(132);
  });

  test("chaque valeur aléatoire donne exactement un mot (11 bits, sans biais)", () => {
    const fixed = (n: number) => Uint16Array.from({ length: n }, (_, i) => [0, 2047, 2048, 65535][i % 4]);
    expect(generatePassphrase(fixed).split("-").slice(0, 4)).toEqual(["abandon", "zoo", "abandon", "zoo"]);
  });

  test("utilise l'aléa cryptographique du navigateur", () => {
    const original = crypto.getRandomValues;
    let calls = 0;
    crypto.getRandomValues = ((a: Uint16Array) => {
      calls++;
      return original.call(crypto, a);
    }) as typeof crypto.getRandomValues;
    try {
      generatePassphrase();
    } finally {
      crypto.getRandomValues = original;
    }
    expect(calls).toBe(1);
  });

  test("tous les mots sortent à peu près aussi souvent", () => {
    const counts = new Map<string, number>();
    const runs = 20_000;
    for (let i = 0; i < runs; i++)
      for (const w of generatePassphrase().split("-")) counts.set(w, (counts.get(w) ?? 0) + 1);
    const expected = (runs * PASSPHRASE_WORDS) / 2048;
    // Khi² à 2 047 degrés de liberté : ~2 047 attendu, 2 300 très au-delà du seuil à 0,1 %.
    let chi2 = 0;
    for (const w of BIP39_ENGLISH) chi2 += ((counts.get(w) ?? 0) - expected) ** 2 / expected;
    expect(chi2).toBeLessThan(2300);
  });

  test("ne dépasse jamais la limite PDF de 127 octets", () => {
    const longest = Math.max(...BIP39_ENGLISH.map((w) => w.length));
    expect(longest * PASSPHRASE_WORDS + PASSPHRASE_WORDS - 1).toBeLessThanOrEqual(127);
    for (let i = 0; i < 200; i++) expect(passwordUtf8Length(generatePassphrase())).toBeLessThanOrEqual(127);
  });

  test("isPassphrase refuse ce qui n'en est pas une", () => {
    expect(isPassphrase("abandon-zoo")).toBe(false);
    expect(isPassphrase(Array(12).fill("notaword").join("-"))).toBe(false);
    expect(isPassphrase("")).toBe(false);
  });
});
