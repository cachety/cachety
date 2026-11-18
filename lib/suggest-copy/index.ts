// Textes des suggestions de masquage (`t.suggest`, docs/prd-suggested-areas.md
// §10). Un fichier par langue, comme lib/partners-copy : le français et
// l'anglais viennent du PRD ; les neuf autres en sont traduits et attendent
// une relecture par des locuteurs natifs (ROADMAP.md, « Native review »).

import type { Lang } from "@/lib/site-meta";
import type { SuggestCopy } from "./types";
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

export type { SuggestCopy };

export const SUGGEST_COPY: Record<Lang, SuggestCopy> = { fr, en, ja, zh, es, ar, fa, de, pt, id, nl };
