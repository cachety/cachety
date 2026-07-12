// Point d'entrée de `bun run test:e2e` : garantit l'export statique puis
// lance la suite navigateur.
//
// Les fichiers *.e2e.ts ne correspondent pas aux motifs de découverte de
// `bun test` (volontaire : les unitaires ne doivent ni ouvrir de navigateur
// ni exiger un build) ; on les passe donc explicitement en chemins.

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");

if (!existsSync(join(ROOT, "out", "index.html"))) {
  console.log("[test:e2e] out/ absent — `bun run build`…");
  const build = Bun.spawnSync(["bun", "run", "build"], {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  });
  if (build.exitCode !== 0) process.exit(build.exitCode ?? 1);
}

const files = readdirSync(join(ROOT, "e2e"))
  .filter((f) => f.endsWith(".e2e.ts"))
  .sort()
  // Préfixe ./ requis : bun test traite alors l'argument comme un chemin
  // (sinon simple filtre, qui ignorerait nos *.e2e.ts hors motifs).
  .map((f) => `./e2e/${f}`);

// Un processus par fichier : chaque suite ouvre son propre navigateur et
// réserve le port 4181. Dans un seul processus, la seconde suite héritait
// des ressources de la première (navigateur lent à mourir, port encore
// tenu) et sa fermeture pouvait bloquer jusqu'au délai d'expiration.
let failed = 0;
for (const file of files) {
  const run = Bun.spawnSync(["bun", "test", "--timeout", "120000", file], {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
    env: process.env,
  });
  if (run.exitCode !== 0) failed++;
}
process.exit(failed ? 1 : 0);
