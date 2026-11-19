// Les guides et comparatifs citent les libellés de l'interface (« Voir »,
// « Tout masquer », « Un seul PDF »…). Si un libellé change dans
// lib/i18n.tsx, lib/locales/* ou lib/suggest-copy/*, le guide qui le cite
// doit suivre : ce test échoue tant que ce n'est pas fait, dans les 11 langues.

import { describe, expect, test } from "bun:test";
import { COMPARISONS, compareTool } from "@/lib/compare";
import { STRINGS } from "@/lib/i18n";
import { LANG_CODES } from "@/lib/site-meta";
import { DOSSIER_TOPICS, GUIDES, HIDE_TOPICS } from "./index";
import type { Guide } from "./types";

const guideText = (g: Guide) =>
  [g.title, g.intro, ...g.body.flatMap((b) => ("text" in b ? [b.text] : b.items)), ...g.faq.flatMap((f) => [f.q, f.a])].join("\n");

describe("libellés de l'interface cités dans les guides et les comparatifs", () => {
  for (const lang of LANG_CODES) {
    test(lang, () => {
      const t = STRINGS[lang];
      const d = t.dossier;
      const hide = GUIDES[lang].filter((g) => HIDE_TOPICS.includes(g.topic)).map(guideText).join("\n");
      // Les quatre guides écrits pour l'outil (les deux autres sujets, « dossier » et « size », vivent dans lib/guides/<langue>.ts).
      const dossier = GUIDES[lang]
        .filter((g) => DOSSIER_TOPICS.includes(g.topic) && g.topic !== "dossier" && g.topic !== "size")
        .map(guideText)
        .join("\n");
      const compare = COMPARISONS[lang]
        .filter((c) => compareTool(c) === "dossier")
        .flatMap((c) => c.body.flatMap((b) => ("text" in b ? [b.text] : b.items)))
        .join("\n");

      const cited: [where: string, text: string, key: string, label: string][] = [
        ["hide", hide, "suggest.review", t.suggest.review],
        ["hide", hide, "suggest.hideAll", t.suggest.hideAll],
        ["hide", hide, "suggest.dismiss", t.suggest.dismiss],
        ["hide", hide, "mask.done", t.mask.done],
        ["hide", hide, "tools.hide", t.tools.hide],
        ["dossier", dossier, "output.one", d.output.one],
        ["dossier", dossier, "output.sections", d.output.sections],
        ["dossier", dossier, "sections.split", d.sections.split],
        ["dossier", dossier, "sections.add", d.sections.add],
        ["dossier", dossier, "photo.fix", d.photo.fix],
        ["dossier", dossier, "photo.apply", d.photo.apply],
        ["dossier", dossier, "photo.whiten", d.photo.whiten],
        ["dossier", dossier, "photo.gray", d.photo.gray],
        ["dossier", dossier, "photo.applyAll", d.photo.applyAll],
        ["dossier", dossier, "size.other", d.size.other],
        ["dossier", dossier, "grid.undo", d.grid.undo],
        ["dossier", dossier, "grid.restore", d.grid.restore],
        ["compare", compare, "output.one", d.output.one],
        ["compare", compare, "size.other", d.size.other],
      ];
      const missing = cited.filter(([, text, , label]) => !text.includes(label)).map(([where, , key, label]) => `${where}: ${key} = ${label}`);
      expect(missing, lang).toEqual([]);
    });
  }
});
