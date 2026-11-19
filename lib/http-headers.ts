// Lecture du fichier _headers (format Cloudflare Pages) et d'une CSP.
// Partagé par les tests de sécurité et le serveur e2e, qui rejoue les
// en-têtes de production pour que la suite navigateur tourne sous la vraie CSP.

/** En-têtes du bloc « /* », noms en minuscules. */
export function rootHeaders(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  let inRoot = false;
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      inRoot = line.trim() === "/*";
      continue;
    }
    const m = inRoot && line.match(/^\s+([^:]+):\s*(.*)$/);
    if (m) out[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return out;
}

/** « default-src 'self'; img-src data: » → { "default-src": ["'self'"], "img-src": ["data:"] } */
export function parseCsp(policy: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const d of policy.split(";").map((s) => s.trim()).filter(Boolean)) {
    const [name, ...values] = d.split(/\s+/);
    out[name.toLowerCase()] = values;
  }
  return out;
}

/** Blocs du fichier _headers : motif de chemin → en-têtes (noms en minuscules). */
export function headerRules(text: string): { pattern: string; headers: [string, string][] }[] {
  const rules: { pattern: string; headers: [string, string][] }[] = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      rules.push({ pattern: line.trim(), headers: [] });
      continue;
    }
    // « ! Nom » : retire un en-tête posé par une autre règle (syntaxe Cloudflare).
    const detach = line.match(/^\s+!\s*([^:\s]+)\s*$/);
    if (detach && rules.length) {
      rules.at(-1)!.headers.push([`!${detach[1].toLowerCase()}`, ""]);
      continue;
    }
    const m = line.match(/^\s+([^:]+):\s*(.*)$/);
    if (m && rules.length) rules.at(-1)!.headers.push([m[1].trim().toLowerCase(), m[2].trim()]);
  }
  return rules;
}

/**
 * Motif d'une règle en expression régulière, comme Cloudflare Pages : « * »
 * correspond à n'importe quelle suite, « :nom » (deux-points puis une lettre,
 * puis lettres, chiffres ou « _ ») à un segment de chemin, jamais à un « / ».
 * « /fr/:page » vaut donc pour /fr/sign, pas pour /fr ni /fr/guides/x.
 */
export function rulePattern(pattern: string): RegExp {
  const source = pattern
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:[A-Za-z]\w*/g, "[^/]+"))
    .join(".*");
  return new RegExp(`^${source}$`);
}

/**
 * En-têtes qu'appliquerait Cloudflare Pages à `path` : toutes les règles qui
 * correspondent (chemin exact, « * » pour n'importe quelle suite, ou
 * « :nom » pour un seul segment de chemin, sans « / »), un même en-tête posé
 * par deux règles est joint par une virgule, et « ! Nom » retire un en-tête
 * posé par une règle précédente.
 */
export function headersFor(text: string, path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const { pattern, headers } of headerRules(text)) {
    if (!rulePattern(pattern).test(path)) continue;
    for (const [name, value] of headers) {
      if (name.startsWith("!")) delete out[name.slice(1)];
      else out[name] = name in out ? `${out[name]}, ${value}` : value;
    }
  }
  return out;
}
