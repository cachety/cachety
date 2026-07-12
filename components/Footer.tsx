"use client";

import { useT } from "@/lib/i18n";
import { ShieldIcon } from "@/components/icons";

/**
 * Une seule ligne : la paternité, la licence, le code source. Le lien
 * « Pourquoi filigraner ? » vit déjà dans l'en-tête : inutile de le répéter.
 * `width` s'aligne sur le conteneur de la page (l'outil est plus large que
 * la page /about), sinon le pied de page part en biais sous le contenu.
 */
export default function Footer({ width = "max-w-7xl" }: { width?: string }) {
  const t = useT();
  return (
    <footer
      className={`mx-auto mt-16 w-full ${width} border-t border-trait py-6 text-sm text-encre-2`}
    >
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>
          {t.footerMade}{" "}
          <a
            href="https://github.com/KazeTachinuu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bleu underline underline-offset-2 hover:no-underline"
          >
            KazeTachinuu
          </a>
          {t.footerInspired}{" "}
          <a
            href="https://github.com/cyberclarence/filigraneur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bleu underline underline-offset-2 hover:no-underline"
          >
            Filigraneur
          </a>
          {t.footerLicense}
        </span>
        <a
          href="https://github.com/KazeTachinuu/filigrane-local"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-bleu underline underline-offset-2 hover:no-underline sm:ml-auto"
        >
          <ShieldIcon className="h-4 w-4 shrink-0 text-green-700" />
          {t.sourceLong}
        </a>
      </p>
    </footer>
  );
}
