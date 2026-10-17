import { describe, expect, test } from "bun:test";
import { displayTitle, frenchSpaces } from "./typography";

describe("typographie française", () => {
  test("espace insécable avant : ; ? ! et dans les guillemets", () => {
    expect(frenchSpaces("Cachety ou Youtrust : quel outil ?")).toBe("Cachety ou Youtrust : quel outil ?");
    expect(frenchSpaces("une signature « simple » !")).toBe("une signature « simple » !");
    // Pas d'espace avant : rien à changer (URL, heure, anglais).
    expect(frenchSpaces("https://cachety.com 10:30")).toBe("https://cachety.com 10:30");
  });

  test("les autres langues restent telles quelles", () => {
    expect(displayTitle("en", "Cachety vs DocuSign: which ?")).toBe("Cachety vs DocuSign: which ?");
    expect(displayTitle("fr", "A : b")).toBe("A : b");
  });
});
