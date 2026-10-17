import { describe, expect, test } from "bun:test";
import { sha256Hex } from "./fingerprint";

// Vecteurs FIPS 180-2 (« abc ») et chaîne vide.
const ABC = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const EMPTY = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

describe("sha256Hex", () => {
  test("vecteurs connus", async () => {
    expect(await sha256Hex(new TextEncoder().encode("abc"))).toBe(ABC);
    expect(await sha256Hex(new Uint8Array(0))).toBe(EMPTY);
  });

  test("Blob, ArrayBuffer et Uint8Array donnent la même empreinte", async () => {
    const bytes = new TextEncoder().encode("abc");
    expect(await sha256Hex(new Blob([bytes]))).toBe(ABC);
    expect(await sha256Hex(bytes.slice().buffer)).toBe(ABC);
  });

  test("une vue partielle ne hache que ses propres octets", async () => {
    const whole = new TextEncoder().encode("xxabcxx");
    expect(await sha256Hex(whole.subarray(2, 5))).toBe(ABC);
  });
});
