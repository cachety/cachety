import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LangProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/site-meta";

export default function HomeApp({ forcedLang }: { forcedLang?: Lang }) {
  return (
    <LangProvider forcedLang={forcedLang}>
      <Header />
      {/* flex-1 : l'outil occupe la hauteur disponible, le pied de page reste
          collé en bas de l'écran même quand rien n'est encore déposé. */}
      <main className="flex-1">
        <CoreProduct />
      </main>
      <Footer />
    </LangProvider>
  );
}
