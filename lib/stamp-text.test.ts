import { describe, expect, test } from "bun:test";
import {
  cleanRecipients,
  composeSimple,
  ENGLISH_TOKENS,
  fillTemplate,
  hasToken,
  makeRef,
  MAX_RECIPIENTS,
  recipientSlug,
  REF_LENGTH,
  type StampTokens,
} from "./stamp-text";

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

describe("cleanRecipients", () => {
  test("un champ par destinataire, vides et doublons (casse comprise) retirés", () => {
    expect(cleanRecipients(["  Agence Martin ", "", "Foncia   Lyon", "agence martin", "SeLoger"])).toEqual([
      "Agence Martin",
      "Foncia Lyon",
      "SeLoger",
    ]);
  });

  test("bornée en nombre et en longueur", () => {
    const many = Array.from({ length: 50 }, (_, i) => `Dest ${i}`);
    expect(cleanRecipients(many)).toHaveLength(MAX_RECIPIENTS);
    expect(cleanRecipients(["x".repeat(200)])[0]).toHaveLength(60);
  });
});

describe("composeSimple", () => {
  const fr = { sep: ", ", onDate: (b: string, d: string) => `${b}, le ${d}` };
  const ja = { sep: "、", onDate: (b: string, d: string) => `${b}（${d}）` };

  test("motif, destinataire, date dans l'ordre recommandé", () => {
    expect(composeSimple({ purpose: " Dossier location ", recipient: "Agence Martin", date: "10/10/2026" }, fr)).toBe(
      "Dossier location, Agence Martin, le 10/10/2026"
    );
    expect(composeSimple({ purpose: "賃貸契約", recipient: "マーティン不動産", date: "2026/10/10" }, ja)).toBe(
      "賃貸契約、マーティン不動産（2026/10/10）"
    );
  });

  test("un morceau absent ne laisse pas de séparateur orphelin", () => {
    expect(composeSimple({ purpose: "Dossier location", date: "10/10/2026" }, fr)).toBe("Dossier location, le 10/10/2026");
    expect(composeSimple({ purpose: "", recipient: "Agence Martin", date: "10/10/2026" }, fr)).toBe(
      "Agence Martin, le 10/10/2026"
    );
    expect(composeSimple({ purpose: " ", date: "10/10/2026" }, fr)).toBe("10/10/2026");
  });
});

describe("fillTemplate", () => {
  const fr: StampTokens = { recipient: "{destinataire}", date: "{date}", code: "{code}" };

  test("remplace les mots, traduits ou anglais", () => {
    expect(
      fillTemplate(
        "Copie pour {destinataire}, {date}, réf. {code}",
        { recipient: "Agence Martin", date: "10/10/2026", code: "K7Q2M" },
        fr
      )
    ).toBe("Copie pour Agence Martin, 10/10/2026, réf. K7Q2M");
    expect(fillTemplate("{recipient} · {date}", { recipient: "Foncia", date: "10/10/2026" }, fr)).toBe("Foncia · 10/10/2026");
  });

  test("un mot vide disparaît avec sa ponctuation", () => {
    expect(fillTemplate("Dossier location, {destinataire}, {date}", { date: "10/10/2026" }, fr)).toBe(
      "Dossier location, 10/10/2026"
    );
    expect(fillTemplate("{destinataire}, dossier location", { date: "x" }, fr)).toBe("dossier location");
    expect(fillTemplate("賃貸、{recipient}、{date}", { date: "2026/10/10" }, ENGLISH_TOKENS)).toBe("賃貸、2026/10/10");
  });

  test("hasToken reconnaît les deux formes", () => {
    expect(hasToken("réf. {code}", "code", fr)).toBe(true);
    expect(hasToken("ref. {code}", "code", ENGLISH_TOKENS)).toBe(true);
    expect(hasToken("Copie pour {recipient}", "recipient", fr)).toBe(true);
    expect(hasToken("Dossier", "recipient", fr)).toBe(false);
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
