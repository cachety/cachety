import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LangProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/site-meta";

export default function HomeApp({ forcedLang }: { forcedLang?: Lang }) {
  return (
    <LangProvider forcedLang={forcedLang}>
      <Header />
      <main>
        <CoreProduct />
      </main>
      <Footer />
    </LangProvider>
  );
}
