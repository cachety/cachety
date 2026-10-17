// Feuille de route publique (page /<lang>/roadmap). La version complète, avec
// le backlog interne, est ROADMAP.md à la racine du dépôt : chaque élément
// ci-dessous y figure sous le même identifiant (vérifié par roadmap.test.ts).
// Un fichier par langue : textes des éléments et de la page.

import type { Lang } from "@/lib/site-meta";
import type { RoadmapCopy, RoadmapId, RoadmapStatus, Text } from "./types";
import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fa from "./fa";
import fr from "./fr";
import id from "./id";
import ja from "./ja";
import nl from "./nl";
import pt from "./pt";
import zh from "./zh";

export type { RoadmapCopy, RoadmapStatus };

const BY_LANG: Record<Lang, { items: Record<RoadmapId, Text>; copy: RoadmapCopy }> = {
  fr, en, ja, zh, es, ar, fa, de, pt, id, nl,
};

const ITEMS: { id: RoadmapId; status: RoadmapStatus; shipped?: string }[] = [
  { id: "per-recipient-password", status: "next" },
  { id: "suggested-areas", status: "next" },
  { id: "more-languages", status: "next" },
  { id: "purpose-from-recipient", status: "idea" },
  { id: "local-word-lists", status: "idea" },
  { id: "remember-signature", status: "idea" },
  { id: "keep-vector-pages", status: "idea" },
  { id: "sign-embed", status: "idea" },
  { id: "sign", status: "shipped", shipped: "2026-10" },
  { id: "simpler-tool", status: "shipped", shipped: "2026-10" },
  { id: "easy-passwords", status: "shipped", shipped: "2026-10" },
  { id: "partner-embed", status: "shipped", shipped: "2026-10" },
];

export type RoadmapItem = (typeof ITEMS)[number] & { text: Record<Lang, Text> };

export const ROADMAP: RoadmapItem[] = ITEMS.map((item) => ({
  ...item,
  text: Object.fromEntries(Object.entries(BY_LANG).map(([lang, l]) => [lang, l.items[item.id]])) as Record<Lang, Text>,
}));

export const ROADMAP_COPY = Object.fromEntries(
  Object.entries(BY_LANG).map(([lang, l]) => [lang, l.copy])
) as Record<Lang, RoadmapCopy>;
