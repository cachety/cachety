import CoreProduct from "@/components/CoreProduct";
import DossierLanding, { DossierLangSync } from "@/components/DossierLanding";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { GuideTeaser } from "@/components/Landing";
import { LangProvider } from "@/lib/i18n";
import { GUIDES } from "@/lib/guides";
import { LANG_CODES, type Lang } from "@/lib/site-meta";

// Composant serveur : seuls titres et résumés des guides de l'outil Dossier
// partent dans la page, pas leur texte intégral (comme HomeApp et SignApp).
const TEASERS = Object.fromEntries(
  LANG_CODES.map((l) => [
    l,
    GUIDES[l]
      .filter((g) => g.tool === "dossier")
      .map(({ slug, title, description }) => ({ slug, title, description })),
  ])
) as Record<Lang, GuideTeaser[]>;

/** Page /<langue>/dossier : le même outil, en mode dossier (docs/prd-dossier.md §6.1). */
export default function DossierApp({ forcedLang }: { forcedLang?: Lang }) {
  return (
    <LangProvider forcedLang={forcedLang}>
      <DossierLangSync />
      <div id="top" />
      <Header tool="dossier" />
      {/* flex-1 : le pied de page reste collé en bas de l'écran (cf. HomeApp). */}
      <main className="flex-1">
        <CoreProduct mode="dossier" />
        <DossierLanding teasers={TEASERS} />
      </main>
      <Footer />
    </LangProvider>
  );
}
