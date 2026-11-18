// Mode « dossier » : la liste des pages du fichier à produire, dans l'ordre,
// avec leurs retouches (rotation, recadrage, nettoyage) et les sections.
// Rien de React ici, aucun navigateur requis : des fonctions pures, testées
// par lib/pages.test.ts.
//
// L'ordre de sortie est une liste À PLAT de pages, pas une liste de fichiers :
// une page peut passer d'un document à l'autre. Retirer une page ne touche pas
// au document ; seul ce qui change les pixels (rotation, recadrage, nettoyage)
// entre dans editsKey, donc dans le réglage du document à rendre de nouveau.

export type Point = { x: number; y: number };

/** Quatre coins en coordonnées normalisées de l'image (0–1), dans le sens horaire depuis le haut à gauche. */
export type Quad = [Point, Point, Point, Point];

/** Nettoyage d'une photo : fond blanchi (niveaux automatiques), noir et blanc. */
export type CleanOptions = { whiten: boolean; gray: boolean };

/** Une page de sortie : une page d'un document source, avec ses retouches. */
export type PageRef = {
  /** Doc.id */
  doc: string;
  /** Index (0 = première) dans le document source. */
  page: number;
  rotate: 0 | 90 | 180 | 270;
  /** Photos seulement : la feuille à redresser. */
  crop?: Quad;
  clean?: CleanOptions;
};

/** `start` : index, dans la liste des pages, de la première page de la section. */
export type Section = { id: string; name: string; start: number };

export type DossierState = {
  pages: PageRef[];
  /** Vide : un seul fichier. Sinon la première section commence toujours à 0. */
  sections: Section[];
  /**
   * Documents déjà vus, avec leur nombre de pages : un document dont toutes
   * les pages ont été retirées n'est pas pris pour un nouveau document.
   */
  known?: Record<string, number>;
  /** L'utilisateur a déplacé une page : l'ordre ne suit plus celui des fichiers. */
  custom?: boolean;
};

/** Retouches d'une page, telles que le moteur les applique (RenderOptions.edits). */
export type PageEdit = { rotate?: 90 | 180 | 270; crop?: Quad; clean?: CleanOptions };
/** Retouches d'un document, par page (index 0). */
export type PageEdits = Record<number, PageEdit>;

export type DocPages = { id: string; pageCount: number };

/** Mémoire bornée : vignettes et pages rendues (docs/prd-dossier.md §5, étape 1). */
export const MAX_DOSSIER_PAGES = 1000;

export const EMPTY_DOSSIER: DossierState = { pages: [], sections: [] };

const pagesOf = (doc: DocPages): PageRef[] =>
  Array.from({ length: Math.max(0, Math.floor(doc.pageCount)) }, (_, page) => ({ doc: doc.id, page, rotate: 0 as const }));

/** Ordre d'origine : les fichiers dans l'ordre, et chaque fichier page après page. Borné à MAX_DOSSIER_PAGES. */
export function initialPages(docs: DocPages[]): PageRef[] {
  const out: PageRef[] = [];
  for (const doc of docs) {
    const pages = pagesOf(doc);
    if (out.length + pages.length > MAX_DOSSIER_PAGES) continue;
    out.push(...pages);
  }
  return out;
}

/** Bornes de chaque section : [début, fin[ dans la liste des pages. */
function bounds(state: DossierState): { section: Section; from: number; to: number }[] {
  const n = state.pages.length;
  return state.sections.map((section, i) => ({
    section,
    from: Math.min(n, Math.max(0, section.start)),
    to: i + 1 < state.sections.length ? Math.min(n, Math.max(0, state.sections[i + 1].start)) : n,
  }));
}

/** Sections remises d'aplomb : dans l'ordre, la première à 0, aucune au-delà de la fin. */
function tidy(pages: PageRef[], sections: Section[]): Section[] {
  if (!sections.length) return sections;
  let last = 0;
  return sections.map((s, i) => {
    const start = i === 0 ? 0 : Math.min(pages.length, Math.max(last, Math.floor(s.start)));
    last = start;
    return s.start === start ? s : { ...s, start };
  });
}

/**
 * Suit la liste des documents : les pages d'un document retiré s'en vont, les
 * nouveaux documents arrivent (les retouches des autres ne bougent pas). Un
 * nouveau document se place à la suite du document qui le précède dans la
 * liste des fichiers : un PDF déverrouillé plus tard arrive à la place de son
 * fichier, et à la fin s'il est le dernier. Tant qu'aucune page n'a été
 * déplacée à la main, l'ordre suit celui des fichiers.
 *
 * `over` : documents laissés de côté parce que le dossier dépasserait
 * MAX_DOSSIER_PAGES (à signaler : errors.dossier_too_many_pages).
 */
export function syncPages(state: DossierState, docs: DocPages[]): DossierState & { over: string[] } {
  const alive = new Map(docs.map((d) => [d.id, d]));
  const order = new Map(docs.map((d, i) => [d.id, i]));
  const known: Record<string, number> = {};
  for (const [id, count] of Object.entries(state.known ?? {})) if (alive.has(id)) known[id] = count;

  // Pages des documents retirés : les sections qui les suivent remontent d'autant.
  let pages = state.pages;
  let sections = state.sections;
  if (pages.some((p) => !alive.has(p.doc))) {
    const removedBefore: number[] = [];
    let gone = 0;
    for (const p of pages) {
      removedBefore.push(gone);
      if (!alive.has(p.doc)) gone++;
    }
    removedBefore.push(gone);
    sections = sections.map((s) => ({ ...s, start: s.start - removedBefore[Math.min(s.start, pages.length)] }));
    pages = pages.filter((p) => alive.has(p.doc));
  }

  const over: string[] = [];
  let changed = pages !== state.pages;
  for (const doc of docs) {
    if (doc.id in known || !(doc.pageCount > 0)) continue;
    if (pages.length + doc.pageCount > MAX_DOSSIER_PAGES) {
      over.push(doc.id);
      continue;
    }
    known[doc.id] = doc.pageCount;
    // Après la dernière page d'un document placé avant lui dans la liste des fichiers.
    const mine = order.get(doc.id)!;
    let at = -1;
    pages.forEach((p, i) => {
      if ((order.get(p.doc) ?? -1) < mine) at = i;
    });
    // Aucun document avant lui n'a de page : en tête s'il précède ceux qui en ont, sinon à la fin.
    const index = at >= 0 ? at + 1 : pages.some((p) => (order.get(p.doc) ?? -1) > mine) ? 0 : pages.length;
    const added = pagesOf(doc);
    // Une section qui commence au point d'insertion ou après recule : les
    // nouvelles pages rejoignent la section qui précède. La première section
    // commence toujours à 0 (des sections créées avant tout document restent
    // ainsi vides, à la suite, et les pages arrivent dans la première).
    sections = sections.map((s, i) => (i > 0 && s.start >= index ? { ...s, start: s.start + added.length } : s));
    pages = [...pages.slice(0, index), ...added, ...pages.slice(index)];
    changed = true;
  }

  // Ordre des fichiers tant que personne n'a rangé à la main (ni sections ni déplacement).
  if (!state.custom && !sections.length) {
    const sorted = pages
      .map((p, i) => ({ p, i }))
      .sort((a, b) => (order.get(a.p.doc)! - order.get(b.p.doc)!) || a.i - b.i)
      .map((x) => x.p);
    if (sorted.some((p, i) => p !== pages[i])) {
      pages = sorted;
      changed = true;
    }
  }

  const sameKnown =
    Object.keys(known).length === Object.keys(state.known ?? {}).length &&
    Object.entries(known).every(([id, n]) => state.known?.[id] === n);
  if (!changed && sameKnown) return { ...state, over };
  return { ...state, pages, sections: tidy(pages, sections), known, over };
}

/**
 * Déplace la page `from` à la position `to` (index final, borné à la liste).
 * Même objet si rien ne bouge. Avec des sections, la page rejoint la section
 * de la page dont elle prend la place.
 */
export function movePage(state: DossierState, from: number, to: number): DossierState {
  const n = state.pages.length;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || from >= n) return state;
  const target = Math.min(n - 1, Math.max(0, to));
  if (target === from) return state;
  const pages = state.pages.slice();
  const [page] = pages.splice(from, 1);
  pages.splice(target, 0, page);
  // Les débuts de section entre l'ancienne et la nouvelle place glissent d'une page.
  const sections = state.sections.map((s) => {
    if (from < target && s.start > from && s.start <= target) return { ...s, start: s.start - 1 };
    if (target < from && s.start > target && s.start <= from) return { ...s, start: s.start + 1 };
    return s;
  });
  return { ...state, pages, sections: tidy(pages, sections), custom: true };
}

/**
 * Glisser-déposer : la page `from` est lâchée dans l'interstice `slot`
 * (0 = avant la première page, n = après la dernière). `section` précise la
 * section visée quand l'interstice est une frontière (fin de l'une, début de
 * la suivante) : absente, la page reste du côté de la section qui précède.
 */
export function dropPage(state: DossierState, from: number, slot: number, section?: string): DossierState {
  const n = state.pages.length;
  if (!Number.isInteger(from) || from < 0 || from >= n || !Number.isInteger(slot)) return state;
  const at = Math.min(n, Math.max(0, slot));
  if (!state.sections.length) return movePage(state, from, at > from ? at - 1 : at);
  const list = bounds(state);
  // Section visée : celle demandée si l'interstice lui appartient, sinon la
  // dernière qui contient l'interstice (bornes comprises).
  const asked = list.findIndex((b) => b.section.id === section && at >= b.from && at <= b.to);
  let index = asked;
  if (index < 0) {
    index = list.findIndex((b) => at >= b.from && at <= b.to);
    if (index < 0) index = list.length - 1;
  }
  const groups = list.map((b) => state.pages.slice(b.from, b.to));
  const sourceGroup = list.findIndex((b) => from >= b.from && from < b.to);
  if (sourceGroup < 0) return state;
  const offsetInSource = from - list[sourceGroup].from;
  let offset = at - list[index].from;
  if (sourceGroup === index) {
    if (offset === offsetInSource || offset === offsetInSource + 1) return state; // interstices qui l'encadrent
    if (offset > offsetInSource) offset--;
  }
  const [page] = groups[sourceGroup].splice(offsetInSource, 1);
  groups[index].splice(offset, 0, page);
  return { ...fromGroups(state, groups), custom: true };
}

function fromGroups(state: DossierState, groups: PageRef[][]): DossierState {
  let start = 0;
  const sections = state.sections.map((s, i) => {
    const next = { ...s, start };
    start += groups[i].length;
    return next;
  });
  return { ...state, pages: groups.flat(), sections };
}

/**
 * Un pas au clavier (Alt + flèche) : −1 vers le début, +1 vers la fin. En
 * bout de section, la page passe dans la section voisine (à sa fin, ou à son
 * début) au lieu d'échanger sa place avec une page : elle franchit l'intertitre.
 */
export function stepPage(state: DossierState, index: number, dir: -1 | 1): { state: DossierState; index: number } {
  const n = state.pages.length;
  if (index < 0 || index >= n) return { state, index };
  if (state.sections.length) {
    const list = bounds(state);
    const g = list.findIndex((b) => index >= b.from && index < b.to);
    if (g >= 0) {
      const edge = dir < 0 ? index === list[g].from : index === list[g].to - 1;
      if (edge) {
        const neighbour = g + dir;
        if (neighbour < 0 || neighbour >= list.length) return { state, index };
        const groups = list.map((b) => state.pages.slice(b.from, b.to));
        const [page] = groups[g].splice(dir < 0 ? 0 : groups[g].length - 1, 1);
        if (dir < 0) groups[neighbour].push(page);
        else groups[neighbour].unshift(page);
        // La page ne change pas de rang dans la liste à plat : seule la frontière bouge.
        return { state: { ...fromGroups(state, groups), custom: true }, index };
      }
    }
  }
  const to = index + dir;
  if (to < 0 || to >= n) return { state, index };
  return { state: movePage(state, index, to), index: to };
}

/** Un quart de tour dans le sens horaire : 0 → 90 → 180 → 270 → 0. */
export function rotatePage(state: DossierState, index: number): DossierState {
  const page = state.pages[index];
  if (!page) return state;
  const pages = state.pages.slice();
  pages[index] = { ...page, rotate: ((page.rotate + 90) % 360) as PageRef["rotate"] };
  return { ...state, pages };
}

/** Remplace une page (recadrage, nettoyage) sans la déplacer. */
export function updatePage(state: DossierState, index: number, changes: Partial<Pick<PageRef, "crop" | "clean" | "rotate">>): DossierState {
  const page = state.pages[index];
  if (!page) return state;
  const next: PageRef = { ...page, ...changes };
  if (!next.crop) delete next.crop;
  if (!next.clean || (!next.clean.whiten && !next.clean.gray)) delete next.clean;
  const pages = state.pages.slice();
  pages[index] = next;
  return { ...state, pages };
}

/**
 * Retire une page. `undo()` rend l'état d'avant, à l'identique ;
 * `undo(courant)` remet la page dans l'état courant (d'autres retouches ont
 * pu avoir lieu entre-temps), à sa place d'origine ou au plus près.
 */
export function removePage(
  state: DossierState,
  index: number
): { state: DossierState; undo: (current?: DossierState) => DossierState } {
  const page = state.pages[index];
  if (!page) return { state, undo: (current) => current ?? state };
  const section = sectionOf(state, index);
  const pages = state.pages.filter((_, i) => i !== index);
  const sections = state.sections.map((s) => (s.start > index ? { ...s, start: s.start - 1 } : s));
  const next = { ...state, pages, sections };
  const undo = (current?: DossierState) => {
    if (!current || current === next) return state;
    // Déjà revenue (annulation répétée), ou document retiré depuis : rien à remettre.
    if (current.pages.some((p) => p.doc === page.doc && p.page === page.page)) return current;
    if (current.known && !(page.doc in current.known)) return current;
    const list = bounds(current);
    const home = section ? list.find((b) => b.section.id === section.id) : undefined;
    const at = home ? Math.min(home.to, Math.max(home.from, index)) : Math.min(current.pages.length, index);
    const restored = [...current.pages.slice(0, at), page, ...current.pages.slice(at)];
    // Sa section d'origine existe encore : les suivantes reculent d'une page.
    // Sinon, la page rejoint la section qui se trouve à cet endroit.
    const homeIndex = home ? current.sections.findIndex((s) => s.id === home.section.id) : -1;
    const moved = current.sections.map((s, i) =>
      (homeIndex >= 0 ? i > homeIndex && s.start >= at : s.start > at) ? { ...s, start: s.start + 1 } : s
    );
    return { ...current, pages: restored, sections: tidy(restored, moved) };
  };
  return { state: next, undo };
}

/** Remet les pages retirées d'un document, à la suite de celles qui restent (ou à la fin). */
export function restoreDoc(state: DossierState, doc: DocPages): DossierState {
  const kept = new Set(state.pages.filter((p) => p.doc === doc.id).map((p) => p.page));
  const missing = pagesOf(doc).filter((p) => !kept.has(p.page));
  if (!missing.length) return state;
  let at = state.pages.length;
  for (let i = state.pages.length - 1; i >= 0; i--) {
    if (state.pages[i].doc === doc.id) {
      at = i + 1;
      break;
    }
  }
  const pages = [...state.pages.slice(0, at), ...missing, ...state.pages.slice(at)];
  // Elles restent dans la section de la dernière page gardée (ou la dernière section).
  const sections = state.sections.map((s, i) =>
    kept.size > 0 && i > 0 && s.start >= at ? { ...s, start: s.start + missing.length } : s
  );
  return { ...state, pages, sections: tidy(pages, sections) };
}

/** « Rétablir l'ordre d'origine » : ordre des fichiers, page après page. Les pages retirées le restent, les retouches aussi. */
export function resetOrder(state: DossierState, docs: DocPages[]): DossierState {
  const order = new Map(docs.map((d, i) => [d.id, i]));
  const pages = state.pages
    .slice()
    .sort((a, b) => (order.get(a.doc) ?? 0) - (order.get(b.doc) ?? 0) || a.page - b.page);
  // Les sections gardent leur nombre de pages : seul l'ordre des pages change.
  return { ...state, pages, custom: false };
}

export function sectionOf(state: DossierState, index: number): Section | undefined {
  if (index < 0 || index >= state.pages.length) return undefined;
  return bounds(state).find((b) => index >= b.from && index < b.to)?.section;
}

/** Un groupe par section (vide comprise) ; sans section, un seul groupe avec toutes les pages. */
export function splitBySection(state: DossierState): { section?: Section; pages: PageRef[] }[] {
  if (!state.sections.length) return [{ pages: state.pages }];
  return bounds(state).map((b) => ({ section: b.section, pages: state.pages.slice(b.from, b.to) }));
}

let sectionSeq = 0;
const newSectionId = () => `s${Date.now().toString(36)}${(sectionSeq++).toString(36)}`;

/**
 * Commence une section à la page `start`. La première fois, tout ce qui
 * précède devient la première section (`firstName`) : aucune page ne reste
 * hors section.
 */
export function addSection(state: DossierState, start: number, name: string, firstName = ""): DossierState {
  const at = Math.min(state.pages.length, Math.max(0, Math.floor(start)));
  const sections = state.sections.slice();
  if (!sections.length) {
    sections.push({ id: newSectionId(), name: at === 0 ? name : firstName, start: 0 });
    if (at === 0) return { ...state, sections, custom: true };
  }
  const index = sections.findIndex((s) => s.start > at);
  sections.splice(index < 0 ? sections.length : index, 0, { id: newSectionId(), name, start: at });
  return { ...state, sections: tidy(state.pages, sections), custom: true };
}

export function renameSection(state: DossierState, id: string, name: string): DossierState {
  if (!state.sections.some((s) => s.id === id && s.name !== name)) return state;
  return { ...state, sections: state.sections.map((s) => (s.id === id ? { ...s, name } : s)) };
}

/** Retire une section : ses pages rejoignent la précédente (ou la suivante pour la première). */
export function removeSection(state: DossierState, id: string): DossierState {
  if (!state.sections.some((s) => s.id === id)) return state;
  return { ...state, sections: tidy(state.pages, state.sections.filter((s) => s.id !== id)) };
}

/** Sections proposées d'office (noms localisés) : la première reçoit toutes les pages. */
export function presetSections(state: DossierState, names: string[]): DossierState {
  const n = state.pages.length;
  return { ...state, custom: true, sections: names.map((name, i) => ({ id: newSectionId(), name, start: i === 0 ? 0 : n })) };
}

/** Envoie la page à la fin d'une section (« Déplacer vers la section… »). */
export function movePageToSection(state: DossierState, index: number, id: string): { state: DossierState; index: number } {
  const list = bounds(state);
  const target = list.findIndex((b) => b.section.id === id);
  const source = list.findIndex((b) => index >= b.from && index < b.to);
  if (target < 0 || source < 0 || target === source) return { state, index };
  const groups = list.map((b) => state.pages.slice(b.from, b.to));
  const [page] = groups[source].splice(index - list[source].from, 1);
  groups[target].push(page);
  const next = { ...fromGroups(state, groups), custom: true };
  return { state: next, index: next.pages.indexOf(page) };
}

/** Par document : rotations, recadrages et nettoyages de ses pages gardées (RenderOptions.edits). */
export function editsFor(state: DossierState, doc: string): PageEdits {
  const out: PageEdits = {};
  for (const p of state.pages) {
    if (p.doc !== doc) continue;
    const edit: PageEdit = {};
    if (p.rotate) edit.rotate = p.rotate;
    if (p.crop) edit.crop = p.crop;
    if (p.clean && (p.clean.whiten || p.clean.gray)) edit.clean = p.clean;
    if (Object.keys(edit).length) out[p.page] = edit;
  }
  return out;
}

const coord = (v: number) => (Math.round(v * 10000) / 10000).toFixed(4);

/** Clé stable (comme masksKey) : mêmes retouches, même clé, quel que soit l'ordre des pages. « » sans retouche. */
export function editsKey(edits: PageEdits | undefined): string {
  if (!edits) return "";
  return Object.keys(edits)
    .map(Number)
    .sort((a, b) => a - b)
    .map((p) => {
      const e = edits[p];
      const parts: string[] = [];
      if (e.rotate) parts.push(`r${e.rotate}`);
      if (e.crop) parts.push(`c${e.crop.map((c) => `${coord(c.x)},${coord(c.y)}`).join(",")}`);
      if (e.clean?.whiten) parts.push("w");
      if (e.clean?.gray) parts.push("g");
      return parts.length ? `${p}:${parts.join("")}` : "";
    })
    .filter(Boolean)
    .join("|");
}

/** Rotation de chaque page dans une clé produite par editsKey (ce que montre une vignette déjà rendue). */
export function rotationsInKey(key: string): Record<number, number> {
  const out: Record<number, number> = {};
  for (const part of key.split("|")) {
    const m = part.match(/^(\d+):.*?r(90|180|270)/);
    if (m) out[Number(m[1])] = Number(m[2]);
  }
  return out;
}

// Caractères qu'un système de fichiers refuse, et séparateurs de chemin.
const FORBIDDEN = /[\\/:*?"<>|\u0000-\u001f\u007f]/g;

/**
 * Nom de fichier (sans extension) tiré d'un texte saisi : nom de section, nom
 * du dossier. Séparateurs de chemin et caractères interdits retirés, espaces
 * resserrées, jamais de point en tête (« .. », fichier caché), 60 caractères
 * au plus (coupés sur un caractère entier). Vide : `fallback`.
 */
export function safeFileName(text: string, fallback: string): string {
  const clean = Array.from(text.normalize("NFC").replace(FORBIDDEN, " ").replace(/\s+/g, " ").replace(/^[. ]+/, "").replace(/[. ]+$/, ""))
    .slice(0, 60)
    .join("")
    .trim();
  return clean || fallback;
}
