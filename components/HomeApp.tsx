import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Landing, { type GuideTeaser } from "@/components/Landing";
import { LangProvider } from "@/lib/i18n";
import { GUIDES } from "@/lib/guides";
import { LANG_CODES, type Lang } from "@/lib/site-meta";

// Composant serveur : seuls titres et résumés des guides partent dans la
// page, pas leur texte intégral (qui alourdirait le JavaScript de l'outil).
const TEASERS = Object.fromEntries(
  LANG_CODES.map((l) => [
    l,
    GUIDES[l].map(({ slug, title, description }) => ({ slug, title, description })),
  ])
) as Record<Lang, GuideTeaser[]>;

export default function HomeApp({ forcedLang }: { forcedLang?: Lang }) {
  return (
    <LangProvider forcedLang={forcedLang}>
      <div id="top" />
      <Header />
      {/* flex-1 : l'outil occupe la hauteur disponible, le pied de page reste
          collé en bas de l'écran même quand rien n'est encore déposé. */}
      <main className="flex-1">
        <CoreProduct />
        <Landing teasers={TEASERS} />
      </main>
      <Footer />
    </LangProvider>
  );
}
