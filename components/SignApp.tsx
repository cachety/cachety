import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { GuideTeaser } from "@/components/Landing";
import SignLanding, { SignLangSync } from "@/components/SignLanding";
import { LangProvider } from "@/lib/i18n";
import { GUIDES } from "@/lib/guides";
import { LANG_CODES, type Lang } from "@/lib/site-meta";

// Composant serveur : seuls titres et résumés des guides de signature partent
// dans la page, pas leur texte intégral (comme HomeApp).
const TEASERS = Object.fromEntries(
  LANG_CODES.map((l) => [
    l,
    GUIDES[l]
      .filter((g) => g.tool === "sign")
      .map(({ slug, title, description }) => ({ slug, title, description })),
  ])
) as Record<Lang, GuideTeaser[]>;

/** Page /<langue>/sign : le même outil, en mode signature (docs/prd-sign.md §6.1). */
export default function SignApp({ forcedLang }: { forcedLang?: Lang }) {
  return (
    <LangProvider forcedLang={forcedLang}>
      <SignLangSync />
      <div id="top" />
      <Header tool="sign" />
      {/* flex-1 : le pied de page reste collé en bas de l'écran (cf. HomeApp). */}
      <main className="flex-1">
        <CoreProduct mode="sign" />
        <SignLanding teasers={TEASERS} />
      </main>
      <Footer />
    </LangProvider>
  );
}
