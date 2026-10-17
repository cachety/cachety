// Sites partenaires autorisés à intégrer l'outil (page /embed/<langue> dans
// une iframe). La liste vit dans partners.json, à la racine du dépôt : un
// partenaire en fait la demande par un ticket GitHub, l'ajout est relu puis
// déployé. Elle alimente frame-ancestors (scripts/gen-sw.mjs), l'envoi de la
// hauteur du cadre (seulement vers ces origines) et la liste « Ils l'utilisent ».

import list from "@/partners.json";

export type Partner = {
  /** Origine exacte, https, sans chemin ni joker : « https://www.exemple.fr ». */
  domain: string;
  name: string;
  /** Mois d'arrivée (AAAA-MM). */
  since: string;
};

const ORIGIN = /^https:\/\/[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

/** Vérifie la liste ; lève une erreur (le build échoue) sur une entrée invalide. */
export function validatePartners(raw: unknown): Partner[] {
  if (!Array.isArray(raw)) throw new Error("partners.json : un tableau est attendu");
  const seen = new Set<string>();
  return raw.map((p, i) => {
    const where = `partners.json[${i}]`;
    if (!p || typeof p !== "object") throw new Error(`${where} : objet attendu`);
    const { domain, name, since } = p as Record<string, unknown>;
    if (typeof domain !== "string" || !ORIGIN.test(domain))
      throw new Error(`${where} : domain doit être une origine https exacte, sans chemin ni joker`);
    if (seen.has(domain)) throw new Error(`${where} : ${domain} en double`);
    seen.add(domain);
    if (typeof name !== "string" || !name.trim() || name.length > 60 || /[<>]/.test(name))
      throw new Error(`${where} : name invalide`);
    if (typeof since !== "string" || !/^\d{4}-\d{2}$/.test(since)) throw new Error(`${where} : since au format AAAA-MM`);
    return { domain, name: name.trim(), since };
  });
}

export const PARTNERS: Partner[] = validatePartners(list);

/** Origines qui peuvent recevoir la hauteur du cadre : le site lui-même et les partenaires. */
export const EMBED_PARENTS = (self: string) => [self, ...PARTNERS.map((p) => p.domain)];

/** Message envoyé au parent : la hauteur, et rien d'autre (aucune donnée du document). */
export const heightMessage = (height: number) => ({ type: "cachety:height" as const, height: Math.ceil(height) });

/** Outils que la page intégrée peut proposer, dans l'ordre choisi par le partenaire. */
export const EMBED_TOOLS = ["watermark", "sign"] as const;
export type EmbedTool = (typeof EMBED_TOOLS)[number];

export type Prefill = {
  purpose?: string;
  recipient?: string;
  accent?: string;
  /** Jamais vide : le filigrane seul si le partenaire n'a rien choisi (anciens codes). */
  tools: EmbedTool[];
  /** Mode « signer » : lieu et mention sous la signature. */
  place?: string;
  note?: string;
};

/**
 * Pré-remplissage depuis le fragment de l'URL (après « # », jamais envoyé à
 * un serveur) : « #for=Dossier%20location&to=Agence%20Martin&accent=%23005a9c ».
 * Signature : « #tools=sign&place=Lyon&note=Lu%20et%20approuv%C3%A9 » ;
 * les deux outils au choix du visiteur : « #tools=watermark,sign ».
 */
export function readPrefill(hash: string): Prefill {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const text = (key: string, max: number) => {
    const v = params.get(key)?.replace(/\s+/g, " ").trim();
    return v ? v.slice(0, max) : undefined;
  };
  const accent = params.get("accent")?.trim().toLowerCase();
  const asked = (params.get("tools") ?? "").split(",").map((v) => v.trim().toLowerCase());
  const tools = EMBED_TOOLS.filter((tool) => asked.includes(tool)).sort((a, b) => asked.indexOf(a) - asked.indexOf(b));
  return {
    purpose: text("for", 80),
    recipient: text("to", 60),
    accent: accent && /^#[0-9a-f]{6}$/.test(accent) && contrastWithWhite(accent) >= 4.5 ? accent : undefined,
    tools: tools.length ? tools : ["watermark"],
    place: text("place", 80),
    note: text("note", 80),
  };
}

/** Contraste WCAG entre une couleur #rrggbb et le blanc (texte des boutons). */
export function contrastWithWhite(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return 1.05 / (lum + 0.05);
}

/** Variante plus sombre (survol), en assombrissant chaque composante de 18 %. */
export function darker(hex: string) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * 0.82).toString(16).padStart(2, "0"))
      .join("")
  );
}
