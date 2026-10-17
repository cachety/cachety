"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { SITE_COPY } from "@/lib/site-copy";
import { ROADMAP_COPY } from "@/lib/roadmap";
import { PARTNERS_COPY } from "@/lib/partners-copy";
import { BRAND, DONATE_URL, REPO_URL, UPSTREAM } from "@/lib/brand";
import AuthorLink from "@/components/AuthorLink";
import { Flag, HeartIcon, Logo, ShieldIcon } from "@/components/icons";

/**
 * Pied de page : définition du nom, paternité, œuvres d'origine (AGPL §5a),
 * lien vers le code source (AGPL §13 : tout utilisateur du service doit
 * pouvoir obtenir le code), dons, et navigation secondaire.
 * Les liens sortants n'envoient rien (noreferrer), sauf celui vers le site de
 * l'auteur (origine seule, cf. AuthorLink).
 * `width` s'aligne sur le conteneur de la page.
 */
export default function Footer({ width = "max-w-7xl" }: { width?: string }) {
  const { lang } = useLang();
  const c = SITE_COPY[lang];
  const f = c.footer;
  const link = "text-bleu underline underline-offset-2 hover:no-underline";
  return (
    <footer className={`mx-auto mt-20 w-full ${width} border-t border-trait py-10 text-sm text-encre-2`}>
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="text-lg font-bold tracking-tight text-encre">{BRAND}</span>
          </div>
          <p className="mt-2 max-w-md text-pretty">{f.tagline}</p>
          <p className="mt-3 max-w-md border-s-2 border-trait ps-3 text-pretty">
            <span className="font-semibold text-encre">{BRAND}</span>{" "}
            <span className="text-encre-2">{f.name.pron}</span>{" "}
            <i>{f.name.pos}</i> — {f.name.def}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <Flag className="h-3.5 w-5 shrink-0 rounded-[2px] border border-trait" />
            <span>
              {f.madeIn} {f.by}{" "}
              <AuthorLink className={link} />
            </span>
          </p>
          <p className="mt-2">
            {f.basedOn}{" "}
            <a href={UPSTREAM[0].url} target="_blank" rel="noopener noreferrer" className={link}>
              {UPSTREAM[0].name}
            </a>{" "}
            ({UPSTREAM[0].author}), {f.inspiredBy}{" "}
            <a href={UPSTREAM[1].url} target="_blank" rel="noopener noreferrer" className={link}>
              {UPSTREAM[1].name}
            </a>{" "}
            ({UPSTREAM[1].author}).
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <nav aria-label={c.nav.menu} className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            <Link href={`/${lang}/sign`} className="hover:text-encre">
              {c.nav.sign}
            </Link>
            <Link href={`/${lang}/guides`} className="hover:text-encre">
              {c.nav.guides}
            </Link>
            <Link href={`/${lang}/compare`} className="hover:text-encre">
              {c.nav.compare}
            </Link>
            <Link href={`/${lang}/about`} className="hover:text-encre">
              {c.nav.about}
            </Link>
            <Link href={`/${lang}/privacy`} className="hover:text-encre">
              {c.nav.privacy}
            </Link>
            <Link href={`/${lang}/roadmap`} className="hover:text-encre">
              {ROADMAP_COPY[lang].nav}
            </Link>
            <Link href={`/${lang}/partners`} className="hover:text-encre">
              {PARTNERS_COPY[lang].nav}
            </Link>
          </nav>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-medium text-bleu underline underline-offset-2 hover:no-underline"
          >
            <ShieldIcon className="h-4 w-4 shrink-0 text-green-700" />
            {f.source}
          </a>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-bleu underline underline-offset-2 hover:no-underline"
          >
            <HeartIcon className="h-4 w-4 shrink-0 text-sceau" />
            {f.support}
          </a>
          <span>
            {f.free} · {f.license}
          </span>
        </div>
      </div>
    </footer>
  );
}
