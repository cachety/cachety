// Polices japonaise et chinoise (Noto Sans JP / SC, licence SIL OFL 1.1),
// copiées dans public/fonts/ au lieu d'être importées par le CSS global :
// leurs ~100 Ko de déclarations @font-face (une par tranche de caractères)
// ne doivent pas peser sur les pages des autres langues. LangProvider ne
// lie la feuille qu'en japonais ou en chinois ; le navigateur ne télécharge
// ensuite que les tranches dont la page a besoin (unicode-range).

import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const FONTS = ["noto-sans-jp", "noto-sans-sc"];
const OUT = join("public", "fonts");

await rm(OUT, { recursive: true, force: true });
for (const name of FONTS) {
  const from = join("node_modules", "@fontsource-variable", name);
  await mkdir(join(OUT, name), { recursive: true });
  await cp(join(from, "index.css"), join(OUT, name, "index.css"));
  await cp(join(from, "files"), join(OUT, name, "files"), { recursive: true });
  await cp(join(from, "LICENSE"), join(OUT, name, "LICENSE"));
}
console.log(`fonts: ${FONTS.join(", ")} → ${OUT}`);
