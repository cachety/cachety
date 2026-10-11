import { describe, expect, test } from "bun:test";
import { composeStamp, makeRef, MAX_RECIPIENTS, parseRecipients, recipientSlug, REF_LENGTH } from "./stamp-text";

describe("makeRef", () => {
  test("5 caractères, alphabet sans I, L, O, U", () => {
    for (let i = 0; i < 200; i++) {
      const ref = makeRef();
      expect(ref).toHaveLength(REF_LENGTH);
      expect(ref).toMatch(/^[0-9A-HJKMNP-TV-Z]+$/);
    }
  });

  test("répartition sans biais : chaque octet tombe sur un caractère", () => {
    expect(makeRef(() => Uint8Array.from([0, 31, 32, 255, 64]))).toBe("0Z0Z0");
  });

  test("deux références consécutives diffèrent (aléa cryptographique)", () => {
    const refs = new Set(Array.from({ length: 500 }, () => makeRef()));
    expect(refs.size).toBeGreaterThan(495);
  });
});

describe("parseRecipients", () => {
  test("une ligne par destinataire, vides et doublons (casse comprise) retirés", () => {
    expect(parseRecipients("  Agence Martin \n\nFoncia   Lyon\nagence martin\r\nSeLoger")).toEqual([
      "Agence Martin",
      "Foncia Lyon",
      "SeLoger",
    ]);
  });

  test("bornée en nombre et en longueur", () => {
    const many = Array.from({ length: 50 }, (_, i) => `Dest ${i}`).join("\n");
    expect(parseRecipients(many)).toHaveLength(MAX_RECIPIENTS);
    expect(parseRecipients("x".repeat(200))[0]).toHaveLength(60);
  });
});

describe("composeStamp", () => {
  const trace = { date: "10/10/2026", ref: "K7Q2M", refLabel: "réf." };

  test("texte seul, avec destinataire, avec traçabilité", () => {
    expect(composeStamp(" Dossier location ")).toBe("Dossier location");
    expect(composeStamp("Dossier location", { recipient: "Agence Martin" })).toBe(
      "Dossier location — Agence Martin"
    );
    expect(composeStamp("Dossier location", { recipient: "Agence Martin", trace })).toBe(
      "Dossier location — Agence Martin · 10/10/2026 · réf. K7Q2M"
    );
  });

  test("la date n'est pas répétée si le texte la porte déjà", () => {
    expect(composeStamp("Dossier location, le 10/10/2026", { trace })).toBe(
      "Dossier location, le 10/10/2026 · réf. K7Q2M"
    );
  });
});

describe("recipientSlug", () => {
  test("nom de dossier sûr : accents retirés, aucun séparateur de chemin", () => {
    expect(recipientSlug("Agence Martin & Fils")).toBe("agence-martin-fils");
    expect(recipientSlug("Crédit Agricole")).toBe("credit-agricole");
    expect(recipientSlug("../../etc/passwd")).toBe("etc-passwd");
    expect(recipientSlug("株式会社テスト")).toBe("株式会社テスト");
    // Kana voisés : la décomposition sépare la marque de sonorisation, qui doit rester attachée.
    expect(recipientSlug("デザイン").normalize("NFC")).toBe("デザイン");
    expect(recipientSlug("///")).toBe("destinataire");
  });
});
