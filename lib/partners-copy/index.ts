// Textes de la page partenaires (/<langue>/partners) et du bandeau de la page
// intégrée (/embed/<langue>). Un fichier par langue.

import type { Lang } from "@/lib/site-meta";
import type { PartnersCopy } from "./types";
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

export type { PartnersCopy };

export const PARTNERS_COPY: Record<Lang, PartnersCopy> = { fr, en, ja, zh, es, ar, fa, de, pt, id, nl };
