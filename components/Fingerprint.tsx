"use client";

// Après le téléchargement (mode « signer ») : l'empreinte SHA-256 de chaque
// fichier produit. Calculée en mémoire, montrée une fois, jamais conservée.
// Elle ne prouve pas qui a signé ; elle permet de reconnaître la version
// envoyée si une autre réapparaît.

import { useState } from "react";
import { useT } from "@/lib/i18n";

export type FingerprintItem = { name: string; hash: string };

/** Empreinte groupée par blocs de 8 : plus facile à relire et à comparer à voix haute. */
const grouped = (hash: string) => hash.match(/.{1,8}/g)?.join(" ") ?? hash;

export function Fingerprint({ items }: { items: FingerprintItem[] }) {
  const t = useT();
  const f = t.sign.fingerprint;
  const [copied, setCopied] = useState<string | null>(null);
  if (!items.length) return null;

  const copy = async (item: FingerprintItem) => {
    try {
      // Pas un secret : copie simple, sans effacement différé.
      await navigator.clipboard.writeText(item.hash);
      setCopied(item.name);
      setTimeout(() => setCopied((c) => (c === item.name ? null : c)), 4000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div data-testid="fingerprint" className="mt-4 rounded-xl border border-trait bg-feuille p-3">
      <p className="font-semibold">{f.title}</p>
      <p className="mt-1 text-sm text-encre-2">{f.body}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.name} className="border-t border-trait pt-2">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <div className="mt-1 flex flex-wrap items-start gap-2">
              {/* L'empreinte reste en chiffres latins de gauche à droite, même en arabe ou en persan. */}
              <code
                dir="ltr"
                data-hash={item.hash}
                className="min-w-0 flex-1 rounded-lg bg-white px-2 py-1.5 font-mono text-xs break-all text-encre"
              >
                {grouped(item.hash)}
              </code>
              <button
                type="button"
                onClick={() => copy(item)}
                aria-label={f.copyAria(item.name)}
                className="shrink-0 rounded-lg border border-trait bg-white px-3 py-1.5 text-sm font-medium hover:border-bleu hover:text-bleu"
              >
                {copied === item.name ? f.copied : f.copy}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
