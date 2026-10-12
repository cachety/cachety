import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { ChevronIcon } from "@/components/icons";
import { BRAND, REPO_URL } from "@/lib/brand";
import { ROADMAP, ROADMAP_COPY, type RoadmapStatus } from "@/lib/roadmap";
import { SITE_COPY } from "@/lib/site-copy";
import { HREFLANG, LANG_CODES, ogImage, pageAlternates, pageTitle, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = ROADMAP_COPY[lang].meta;
  return {
    title: pageTitle(m.title),
    description: m.description,
    alternates: { canonical: `/${lang}/roadmap`, languages: pageAlternates("/roadmap") },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}/${lang}/roadmap`,
      title: m.title,
      description: m.description,
    },
  };
}

const ORDER: RoadmapStatus[] = ["next", "idea", "shipped"];

export default async function RoadmapPage({ params }: Props) {
  const { lang } = await params;
  const c = ROADMAP_COPY[lang];
  const links = Object.fromEntries(LANG_CODES.map((l) => [l, `/${l}/roadmap`])) as Record<Lang, string>;
  const month = (ym: string) =>
    new Date(`${ym}-01T12:00:00Z`).toLocaleDateString(HREFLANG[lang], { month: "long", year: "numeric" });
  return (
    <ContentPage lang={lang} links={links}>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
      <p className="mt-5 text-pretty text-xl text-encre-2">{c.lead}</p>

      <div className="mt-10 flex flex-col gap-10">
        {ORDER.map((status) => {
          const items = ROADMAP.filter((i) => i.status === status);
          return (
            <section key={status} aria-labelledby={`roadmap-${status}`}>
              <h2 id={`roadmap-${status}`} className="text-2xl font-bold tracking-tight">
                {c[status]}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-2xl border p-5 ${
                      status === "next" ? "border-bleu/30 bg-bleu/5" : status === "shipped" ? "border-green-700/25 bg-green-700/5" : "border-trait bg-feuille"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-pretty">{item.text[lang].title}</h3>
                    <p className="mt-1.5 leading-relaxed text-pretty text-encre-2">{item.text[lang].body}</p>
                    {item.shipped && <p className="mt-2 text-sm text-green-800">{month(item.shipped)}</p>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-trait pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-bleu underline underline-offset-2 hover:no-underline"
          >
            {c.suggest}
          </a>
          <p className="mt-1 text-sm text-encre-2">{c.suggestBody}</p>
        </div>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-sceau px-6 py-3 font-semibold text-white transition-colors hover:bg-sceau-fonce"
        >
          {SITE_COPY[lang].landing.backToTop}
          <ChevronIcon direction="right" className="h-4 w-4" />
        </Link>
      </div>
    </ContentPage>
  );
}
