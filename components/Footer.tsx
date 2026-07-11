"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { ShieldIcon } from "@/components/icons";

export default function Footer() {
  const t = useT();
  return (
    <footer className="mx-auto mt-12 mb-6 w-full max-w-6xl border-t border-trait pt-5 text-sm text-encre-2">
      <p className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <Link href="/about" className="text-bleu underline hover:no-underline">
          {t.about.nav}
        </Link>
        <a
          href="https://github.com/KazeTachinuu/filigrane-local"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-bleu underline hover:no-underline"
        >
          <ShieldIcon className="h-4 w-4 shrink-0 text-green-700" />
          {t.sourceLong}
        </a>
      </p>
      <p>
        {t.footerMade}{" "}
        <a
          href="https://github.com/KazeTachinuu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bleu underline hover:no-underline"
        >
          KazeTachinuu
        </a>
        {t.footerInspired}{" "}
        <a
          href="https://github.com/cyberclarence/filigraneur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bleu underline hover:no-underline"
        >
          Filigraneur
        </a>
        {t.footerLicense}
      </p>
    </footer>
  );
}
