import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { ChevronIcon, ShieldIcon } from "@/components/icons";
import { BRAND, REPO_URL } from "@/lib/brand";
import { SITE_COPY } from "@/lib/site-copy";
import { LANG_CODES, pageAlternates, PRIVACY_META, SITE_META, SITE_URL, type Lang, ogImage } from "@/lib/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = PRIVACY_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}/privacy`, languages: pageAlternates("/privacy") },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}/${lang}/privacy`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const c = SITE_COPY[lang];
  const p = c.privacy;
  const links = Object.fromEntries(LANG_CODES.map((l) => [l, `/${l}/privacy`])) as Record<Lang, string>;
  return (
    <ContentPage lang={lang} current="privacy" links={links}>
      <ShieldIcon className="h-10 w-10 text-green-700" />
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h1>
      <p className="mt-2 text-sm text-encre-2">{p.updated}</p>
      <p className="mt-5 text-pretty text-xl text-encre-2">{p.lead}</p>

      <div className="mt-10 flex flex-col gap-10">
        {p.sections.map((s, i) => (
          <section key={s.title} className={i === 0 ? "rounded-2xl border border-green-700/25 bg-green-700/5 p-6" : ""}>
            <h2 className="text-2xl font-bold tracking-tight">{s.title}</h2>
            {s.paras?.map((t) => (
              <p key={t} className="mt-3 text-lg leading-relaxed text-pretty">
                {t}
              </p>
            ))}
            {s.items && (
              <ul className="mt-4 flex flex-col gap-2.5">
                {s.items.map((t) => (
                  <li key={t} className="flex gap-3 text-lg leading-relaxed">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" aria-hidden />
                    <span className="text-pretty">{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-trait pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-bleu underline underline-offset-2 hover:no-underline"
        >
          {c.footer.source}
        </a>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce"
        >
          {c.landing.backToTop}
          <ChevronIcon direction="right" className="h-4 w-4" />
        </Link>
      </div>
    </ContentPage>
  );
}
