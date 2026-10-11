import type { GuideBlock } from "@/lib/guides";
import Prose from "@/components/Prose";

/** Rendu des blocs d'un guide ou d'une comparaison. Texte brut : React échappe tout. */
export default function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="flex flex-col gap-5 text-lg leading-relaxed text-encre">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-6 text-2xl font-bold tracking-tight text-balance">
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-pretty">
                <Prose text={b.text} />
              </p>
            );
          case "steps":
            return (
              <ol key={i} className="flex flex-col gap-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sceau text-sm font-bold text-white">
                      {j + 1}
                    </span>
                    <span className="text-pretty"><Prose text={item} /></span>
                  </li>
                ))}
              </ol>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-2 ps-1">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-encre-2" aria-hidden />
                    <span className="text-pretty"><Prose text={item} /></span>
                  </li>
                ))}
              </ul>
            );
          case "tip":
            return (
              <p key={i} className="rounded-2xl border border-green-700/25 bg-green-700/5 px-5 py-4 text-base text-pretty text-green-900">
                <Prose text={b.text} />
              </p>
            );
          case "warning":
            return (
              <p key={i} className="rounded-2xl border border-amber-600/40 bg-amber-500/10 px-5 py-4 text-base text-pretty text-amber-900">
                <Prose text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
