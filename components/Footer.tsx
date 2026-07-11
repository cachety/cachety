"use client";

import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();
  return (
    <footer className="mx-auto mt-12 mb-6 w-full max-w-6xl border-t border-trait pt-5 text-sm text-encre-2">
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
