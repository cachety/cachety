import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";

const OUT = "out";

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(OUT);

const precache = files
  .map((f) => "/" + relative(OUT, f).split("\\").join("/"))
  .filter(
    (u) =>
      !u.endsWith(".map") &&
      !u.endsWith("/sw.js") &&
      (u.startsWith("/_next/static/") ||
        u.startsWith("/pdfjs/") ||
        u === "/index.html" ||
        u === "/manifest.webmanifest" ||
        u === "/favicon.ico" ||
        /^\/(icon-\d+|apple-touch-icon)\.png$/.test(u))
  )
  .map((u) => (u === "/index.html" ? "/" : u))
  .sort();

const version = createHash("sha1").update(precache.join("\n")).digest("hex").slice(0, 8);

const swPath = join(OUT, "sw.js");
let sw = await readFile(swPath, "utf8");
sw = sw
  .replace("/*__VERSION__*/", version)
  .replace("/*__PRECACHE__*/", precache.map((u) => JSON.stringify(u)).join(","));
await writeFile(swPath, sw);

console.log(`sw.js: precached ${precache.length} files, cache filigrane-${version}`);
