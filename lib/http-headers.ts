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
    const m = line.match(/^\s+([^:]+):\s*(.*)$/);
    if (m && rules.length) rules.at(-1)!.headers.push([m[1].trim().toLowerCase(), m[2].trim()]);
  }
  return rules;
}

/**
 * En-têtes qu'appliquerait Cloudflare Pages à `path` : toutes les règles qui
 * correspondent (chemin exact, ou « * » pour n'importe quelle suite), et un
 * même en-tête posé par deux règles est joint par une virgule.
 */
export function headersFor(text: string, path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const { pattern, headers } of headerRules(text)) {
    const re = new RegExp(`^${pattern.split("*").map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);
    if (!re.test(path)) continue;
    for (const [name, value] of headers) out[name] = name in out ? `${out[name]}, ${value}` : value;
  }
  return out;
}
