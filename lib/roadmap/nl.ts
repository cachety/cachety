import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Een ander wachtwoord voor elke ontvanger",
    body: "Elke kopie krijgt een eigen wachtwoord, na het downloaden vermeld bij de codes. Lekt er een wachtwoord uit, dan opent dat maar één kopie.",
  },
  "suggested-areas": {
    title: "Voorstellen voor wat je kunt afdekken",
    body: "Cachety herkent rekeningnummers, BSN's en vergelijkbare gegevens op de pagina en stelt voor ze af te dekken. Dat herkennen gebeurt op je apparaat, net als al het andere.",
  },
  "more-languages": {
    title: "Meer talen",
    body: "Italiaans, Koreaans en Turks.",
  },
  "purpose-from-recipient": {
    title: "Doel voorstellen op basis van de ontvanger",
    body: "Typ je de ontvanger, zoals een makelaar, dan kan het bijpassende doel meteen worden voorgesteld.",
  },
  "local-word-lists": {
    title: "Goed leesbare wachtwoorden in je eigen taal",
    body: "Wachtwoordwoorden in je eigen taal, met alleen gewone letters, zodat je ze op elk toetsenbord hetzelfde typt.",
  },
  "simpler-tool": {
    title: "Een eenvoudigere tool",
    body: "Drie stappen in gewone taal: je document, waarvoor en voor wie, dan voorbeeld en download. Alle extra opties blijven één tik verwijderd.",
  },
  "easy-passwords": {
    title: "Goed leesbare wachtwoorden",
    body: "Beveilig je een bestand, dan krijg je nu een wachtwoord van 12 willekeurige woorden, net zo sterk als de herstelzin van een cryptowallet.",
  },
  "partner-embed": {
    title: "Cachety op partnerwebsites",
    body: "Goedgekeurde websites kunnen de tool op hun eigen pagina's tonen. Hij draait nog steeds op cachety.com, dus de documenten blijven op het apparaat van de bezoeker, buiten bereik van de website zelf.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Roadmap",
  title: "Wat er aankomt",
  lead: "Waar we hierna aan werken, en ideeën die we overwegen. Cachety blijft gratis, open source en op je eigen apparaat.",
  next: "Binnenkort",
  idea: "Ideeën die we overwegen",
  shipped: "Onlangs toegevoegd",
  suggest: "Stel een idee voor",
  suggestBody: "Mis je iets? Open een issue op GitHub. Ideeën zijn welkom in elke taal.",
  meta: {
    title: "Roadmap: wat er aankomt voor Cachety",
    description: "Geplande functies van Cachety, de gratis watermerktool waarbij je documenten op je apparaat blijven: wat eraan komt, ideeën en wat nieuw is.",
  },
};

export default { items: ITEMS, copy: COPY };
