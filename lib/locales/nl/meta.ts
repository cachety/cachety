import { BRAND } from "@/lib/brand";
import type { LocaleMeta } from "@/lib/site-meta";

export const META_NL: LocaleMeta = {
  site: {
    path: "/nl",
    ogLocale: "nl_NL",
    title: `${BRAND}: gratis watermerk op je ID, zonder uploaden`,
    ogTitle: `${BRAND}: veilige kopie van je ID, zonder iets te uploaden`,
    description:
      "Zet gratis een watermerk op je ID-kaart, paspoort of loonstrook en lak je BSN zwart. Alles gebeurt in je browser: niets wordt geüpload. Open source.",
  },
  about: {
    title: `Waarom een watermerk op je ID-kopie? | ${BRAND}`,
    description:
      "Waarom een watermerk op de kopie van je identiteitsbewijs of loonstrook: hergebruik voorkomen, een lek traceren en identiteitsfraude moeilijker maken.",
  },
  privacy: {
    title: `Privacy: je bestanden blijven bij jou | ${BRAND}`,
    description:
      "Hoe Cachety je documenten beschermt: verwerkt in je browser, nooit geüpload, geen account of trackingcookies. Helder uitgelegd en zelf te controleren.",
  },
  guides: {
    title: `Uitleg: veilige kopie ID en watermerk PDF | ${BRAND}`,
    description:
      "Stap voor stap: een veilige kopie van je ID maken, je BSN zwartlakken, documenten voor een huurwoning of hypotheek beschermen. Gratis, zonder uploaden.",
  },
  compare: {
    title: `Watermerk- en ondertekentools vergeleken | ${BRAND}`,
    description:
      "Cachety naast KopieID, iLovePDF, DocuSign en meer: waar je bestanden heen gaan, wat het kost en wat het kan. Eerlijke vergelijkingen met bronnen.",
  },
  sign: {
    title: `Een pdf gratis ondertekenen, zonder upload | ${BRAND}`,
    description:
      "Teken, typ of importeer je handtekening en plaats hem op een pdf of foto. Alles gebeurt in je browser: er wordt niets geüpload. Gratis, zonder account.",
  },
  // Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
  dossier: {
    title: "Documenten samenvoegen tot één kleine pdf, zonder upload",
    description:
      "Pdf's en foto's in één bestand, in de juiste volgorde en onder de gevraagde grootte. Alles gebeurt in je browser: er wordt niets geüpload. Gratis, open source.",
  },
};
