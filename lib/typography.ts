// Typographie française à l'affichage : l'espace avant « : ; ? ! » et à
// l'intérieur des guillemets devient insécable (U+202F, espace fine), pour
// que la ponctuation ne parte pas seule à la ligne dans un titre. Les textes
// sources gardent des espaces ordinaires (plus simples à écrire et à relire).

export function frenchSpaces(text: string) {
  return text.replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ");
}

/** Titre affiché : retouché en français seulement. */
export const displayTitle = (lang: string, text: string) => (lang === "fr" ? frenchSpaces(text) : text);
