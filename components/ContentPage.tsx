import Footer from "@/components/Footer";
import SiteNav, { type NavKey } from "@/components/SiteNav";
import { LangProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/site-meta";

/** Gabarit des pages de lecture (guides, confidentialité) : texte figé dans sa langue. */
export default function ContentPage({
  lang,
  current,
  links,
  children,
}: {
  lang: Lang;
  current?: NavKey;
  links?: Partial<Record<Lang, string>>;
  children: React.ReactNode;
}) {
  return (
    <LangProvider forcedLang={lang}>
      <SiteNav current={current} links={links} />
      <main className="mx-auto w-full max-w-3xl flex-1 pb-4 pt-6 sm:pt-10">{children}</main>
      <Footer width="max-w-7xl" />
    </LangProvider>
  );
}
