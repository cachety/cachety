// « Ils l'utilisent » : une petite ligne défilante, sans couleur, réservée à
// la page partenaires. Rien quand la liste est vide. Mouvement réduit : la
// liste reste immobile (globals.css coupe les animations).

import { PARTNERS } from "@/lib/partners";

export function PartnerMarquee({ label }: { label: string }) {
  if (!PARTNERS.length) return null;
  const names = PARTNERS.map((p) => p.name);
  return (
    <section aria-label={label} className="mt-12 border-t border-trait pt-6 text-sm text-encre-2 grayscale">
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <div dir="ltr" className="mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
          {[...names, ...names].map((name, i) => (
            <li key={i} aria-hidden={i >= names.length || undefined} className="whitespace-nowrap">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
