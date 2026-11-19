import type { Comparison } from "../types";

// Vergelijkingen voor de Dossier-tool (nl): pdf's en foto's samenvoegen tot
// één bestand en dat onder een maximale grootte krijgen. Dezelfde redactionele
// regel als de andere vergelijkingen (lib/compare/types.ts); elke pagina heeft
// tool: "dossier". Geschreven voor lezers in Nederland. Alleen platte tekst.
// Elke bewering over een andere tool komt van een pagina uit `sources`,
// gelezen op de datum `checked`. Prijzen veranderen vaak en worden niet genoemd.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// De kolom van Cachety beschrijft de Dossier-tool zoals vastgelegd in
// docs/prd-dossier.md (Must-scope). Publiceer samen met de tool, niet eerder,
// en controleer de kolom dan tegen de echte interface.

const CHECKED = "2026-11-18";
const UPDATED = "2026-11-18";

/** Adres van de tool, zonder schema geschreven. */
const TOOL = "cachety.com/nl/dossier";

// Vaste formuleringen voor de kolom van Cachety.
const CACHETY = {
  where: "In je browser, op je eigen apparaat. Er wordt niets geüpload.",
  kept: "Er wordt niets bewaard: er is geen server die je bestanden ontvangt.",
  free: "Gratis, zonder account, zonder betaalde versie en zonder daglimiet. Tot 200 MB per bestand, 500 pagina's per pdf en 1.000 pagina's in totaal.",
  pages: "Alle pagina's van alle bestanden in één raster: een pagina verplaatsen, ook van het ene bestand naar het andere, draaien of verwijderen.",
  size: "Je kiest een maximale grootte: 1, 2, 5 of 10 MB. Cachety zegt vóór het downloaden of het bestand past en leesbaar blijft.",
  output:
    "Elke pagina wordt opnieuw opgebouwd als afbeelding. De tekst is niet te selecteren of te doorzoeken, en een pdf met alleen tekst kan groter uitvallen.",
  hidden: "Uit elk bestand verwijderd: verborgen tekst, auteur en andere eigenschappen, bijlagen, links en de gps-locatie van foto's.",
  inputs: "Pdf's en foto's door elkaar, ook HEIC-foto's van een iPhone. Geen Word-, Excel- of PowerPoint-bestanden.",
  offline: "Niets te installeren. Na het laden blijft de pagina werken in vliegtuigmodus, op een telefoon of een computer.",
  ads: "Geen advertenties en geen trackers. De code is open source.",
};

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Hoe een bestand van Cachety eruitziet" },
  {
    type: "p",
    text: "Cachety voegt je originele pagina's niet samen. Het bouwt elke pagina opnieuw op als afbeelding en maakt van die afbeeldingen een nieuwe pdf. Zo verdwijnt wat je niet ziet: verborgen tekst, de naam van de auteur, bijlagen, links en de gps-locatie van foto's. Daar staat een echte prijs tegenover: de tekst van het nieuwe bestand is niet te selecteren of te doorzoeken, en een pdf met alleen tekst kan groter uitvallen dan het origineel, tenzij je een maximale grootte kiest.",
  },
  {
    type: "warning",
    text: "Cachety is niet de juiste tool als de tekst selecteerbaar of doorzoekbaar moet blijven, als bladwijzers of formuliervelden behouden moeten blijven, als je Word- of Excel-bestanden wilt toevoegen, of als je tekstherkenning (OCR) op een scan nodig hebt.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Zo maak je één pdf met Cachety" },
  {
    type: "steps",
    items: [
      `Open ${TOOL} in je browser, op een computer of een telefoon. Er is niets te installeren en je hoeft geen account aan te maken.`,
      "Voeg je pdf's en foto's toe. Een foto wordt een pagina.",
      "Ga naar de pagina's: sleep ze in de goede volgorde, draai de pagina's die op hun kant liggen en verwijder de pagina's die je niet wilt.",
      "Kies Eén pdf en kies, als er een maximale grootte geldt, 1, 2, 5 of 10 MB.",
      "Controleer het voorbeeld, dek af wat de ontvanger niet nodig heeft en download het bestand.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Worden mijn bestanden geüpload bij Cachety of ${other}?`,
  a: `Bij Cachety niet: het werk gebeurt in je browser en er is geen server die je bestanden ontvangt. ${answer}`,
});

const FAQ_TEXT = {
  q: "Is de tekst nog te selecteren na het samenvoegen met Cachety?",
  a: "Nee. Cachety bouwt elke pagina opnieuw op als afbeelding. Daardoor verdwijnen verborgen gegevens, maar ook de selecteerbare tekst. Heb je de tekst nodig, gebruik dan een tool die de originele pagina's samenvoegt.",
};

export const DOSSIER_COMPARISONS_NL: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety of iLovePDF: pdf's samenvoegen en comprimeren zonder ze te uploaden",
    metaTitle: "Alternatief voor iLovePDF: pdf samenvoegen zonder upload",
    description:
      "iLovePDF voegt pdf's samen en comprimeert ze op zijn servers. Cachety doet het in je browser: geen upload, verborgen gegevens weg. Eerlijk vergeleken.",
    intro:
      "iLovePDF is een van de meest gebruikte verzamelingen online pdf-tools, gemaakt in Barcelona. De tools om samen te voegen en te comprimeren verwerken je bestanden op de servers van iLovePDF. Cachety doet een smallere taak op je eigen apparaat: het zet pdf's en foto's in één bestand, onder een maximale grootte, zonder ze te uploaden.",
    verdict:
      "iLovePDF kan meer: Office-bestanden, tekstherkenning, veel bestanden tegelijk en een betaalde desktopapp die offline werkt. Daarvoor is het de betere keuze. Cachety is de betere keuze als het om persoonlijke documenten gaat die je liever niet uploadt, als foto's en pdf's in hetzelfde bestand moeten, of als een formulier een maximale grootte in megabytes stelt.",
    table: [
      {
        criterion: "Waar de bestanden worden verwerkt",
        cachety: CACHETY.where,
        other: "Bij de website: op de servers van iLovePDF. De desktopapp, met een betaald abonnement, verwerkt bestanden op je computer.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang bestanden worden bewaard",
        cachety: CACHETY.kept,
        other: "Automatisch verwijderd binnen twee uur na verwerking. Met een knop op het downloadscherm verwijder je ze eerder.",
        edge: "cachety",
      },
      {
        criterion: "Account, gratis gebruik en limieten",
        cachety: CACHETY.free,
        other: "Gratis zonder registratie, voor een beperkt aantal documenten. Gratis samenvoegen: tot 100 bestanden en 300 MB per taak. Gratis comprimeren: 5 bestanden per taak. Een betaald abonnement verhoogt de limieten.",
      },
      {
        criterion: "Pagina's op volgorde zetten",
        cachety: CACHETY.pages,
        other: "Bij samenvoegen verander je de volgorde van hele bestanden. Losse pagina's sorteren, verwijderen en draaien doe je in een aparte tool, Organize PDF.",
        edge: "cachety",
      },
      {
        criterion: "Onder een maximale grootte blijven",
        cachety: CACHETY.size,
        other: "Drie compressieniveaus: extreem, aanbevolen en minder. Geen grootte in megabytes om op te mikken.",
        edge: "cachety",
      },
      {
        criterion: "Foto's en pdf's samen",
        cachety: CACHETY.inputs,
        other: "Op de website in twee stappen: eerst de afbeeldingen omzetten naar pdf, dan samenvoegen. Voor Word-, Excel- en PowerPoint-bestanden zijn er aparte converters.",
      },
      {
        criterion: "Hoe de nieuwe pdf eruitziet",
        cachety: CACHETY.output,
        other: "Niet beschreven op de pagina van de samenvoegtool. Een aparte tool herkent tekst (OCR) om een scan doorzoekbaar te maken.",
      },
      {
        criterion: "Verborgen gegevens",
        cachety: CACHETY.hidden,
        other: "Niet gedocumenteerd voor de tools op de website. De desktopapp kan de metadata van een pdf bewerken of wissen.",
      },
      {
        criterion: "Apps en offline gebruik",
        cachety: CACHETY.offline,
        other: "Een desktopapp voor Windows en Mac die offline werkt: de gratis versie is een pdf-lezer, en voor de tools is een betaald abonnement nodig. Apps voor iOS en Android.",
      },
      {
        criterion: "Advertenties en trackers",
        cachety: CACHETY.ads,
        other: "De gratis versie toont advertenties; het betaalde abonnement haalt ze weg.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Een grote online gereedschapskist en een tool die op je apparaat blijft" },
      {
        type: "p",
        text: "Op de website van iLovePDF worden je bestanden naar de servers van iLovePDF gestuurd, daar verwerkt en binnen twee uur automatisch verwijderd. Vanaf het downloadscherm kun je ze eerder verwijderen. iLovePDF zegt de ISO/IEC 27001-certificering te hebben en bestanden via een versleutelde verbinding over te dragen. De site is beschikbaar in 26 talen.",
      },
      {
        type: "p",
        text: "Cachety maakt alleen een bestand klaar om te versturen: de pdf's en foto's waar je om gevraagd bent, op volgorde, in één pdf van de juiste grootte. Alles gebeurt in je browser. Er is geen upload, dus er valt achteraf ook niets te verwijderen.",
      },
      { type: "h2", text: "Waar iLovePDF beter is" },
      {
        type: "list",
        items: [
          "Het zet Word-, Excel- en PowerPoint-bestanden om naar pdf.",
          "Het herkent tekst in scans (OCR), zodat een gescande pdf doorzoekbaar kan worden.",
          "Het verwerkt grote taken: tot 100 bestanden bij gratis samenvoegen.",
          "De betaalde desktopapp verwerkt bestanden op je computer, met dezelfde tools als de website.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter is" },
      {
        type: "list",
        items: [
          "Je bestanden worden nooit geüpload, gratis, op een telefoon net zo goed als op een computer.",
          "Foto's en pdf's gaan in één stap in hetzelfde bestand, en losse pagina's verplaats, draai of verwijder je op dezelfde plek.",
          "Je kiest een grootte in megabytes, zoals online formulieren hun limiet opgeven, en je hoort vóór het downloaden als die niet haalbaar is zonder dat het bestand onleesbaar wordt.",
          "Verborgen gegevens worden uit elk bestand verwijderd, en er zijn geen advertenties.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Je moet Word-, Excel- of PowerPoint-bestanden omzetten, of de tekst van een scan laten herkennen.",
      "Je hebt veel bestanden of heel grote pdf's die je in één keer wilt verwerken.",
      "Je betaalt voor iLovePDF en gebruikt de desktopapp, die op je computer werkt.",
    ],
    chooseCachety: [
      "Het gaat om identiteitsbewijzen, loonstroken of bankafschriften en je uploadt ze liever niet.",
      "Je hebt foto's en pdf's in hetzelfde bestand nodig, met de pagina's in jouw volgorde.",
      "Een formulier vraagt om één bestand kleiner dan 1, 2, 5 of 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Bij de website van iLovePDF wel: bestanden worden op de servers van iLovePDF verwerkt en binnen twee uur verwijderd. De desktopapp verwerkt bestanden op je computer, met een betaald abonnement."
      ),
      {
        q: "Kan iLovePDF een pdf tot een exacte grootte comprimeren?",
        a: "Nee. Het biedt drie compressieniveaus, en de eigen uitleg van iLovePDF zegt dat geen enkele tool een exacte uitvoergrootte kan beloven. Bij Cachety kies je 1, 2, 5 of 10 MB, en je hoort vóór het downloaden als het bestand niet past zonder onleesbaar te worden.",
      },
      {
        q: "Werkt iLovePDF offline?",
        a: "De desktopapp voor Windows en Mac wel, maar voor de tools daarin is een betaald abonnement nodig. Cachety is een webpagina die na het laden blijft werken in vliegtuigmodus, gratis.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: pdf samenvoegen", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: pdf comprimeren", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: prijzen en limieten per tool", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: beveiliging", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: vragen en antwoorden", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "iLovePDF-blog: web, desktop of mobiel", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "iLovePDF-blog: pdf-pagina's ordenen", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "iLovePDF-blog: pdf- en JPG-bestanden samenvoegen", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "iLovePDF-blog: een pdf tot een bepaalde grootte comprimeren", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "iLovePDF-blog: pdf-metadata bewerken of verwijderen",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "iLovePDF-blog: 15 jaar iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-smallpdf-merge",
    competitor: "smallpdf-merge",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety of Smallpdf: pdf's samenvoegen en comprimeren zonder ze te uploaden",
    metaTitle: "Alternatief voor Smallpdf: pdf samenvoegen zonder upload",
    description:
      "Smallpdf voegt pdf's samen en comprimeert ze in de cloud, met een daglimiet voor gratis gebruik. Cachety doet het in je browser, gratis, zonder upload.",
    intro:
      "Smallpdf is een bekende verzameling online pdf-tools uit Zwitserland, met apps voor telefoons en Windows. De tools om samen te voegen en te comprimeren werken in de cloud. Cachety doet een smallere taak op je eigen apparaat: het zet pdf's en foto's in één bestand, onder een maximale grootte, zonder ze te uploaden.",
    verdict:
      "Smallpdf kan meer: het accepteert Word-, Excel- en PowerPoint-bestanden, herkent tekst in scans en heeft een Windows-app die offline werkt. Daarvoor is het de betere keuze. Cachety is de betere keuze als het om persoonlijke documenten gaat die je liever niet uploadt, als je op één dag meer dan een paar bestanden moet klaarmaken, of als een formulier een maximale grootte in megabytes stelt.",
    table: [
      {
        criterion: "Waar de bestanden worden verwerkt",
        cachety: CACHETY.where,
        other: "In de cloud. Bestanden worden geüpload naar servers in de Europese Unie. De desktopapp voor Windows verwerkt bestanden offline.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang bestanden worden bewaard",
        cachety: CACHETY.kept,
        other: "Na een uur van de servers verwijderd, tenzij je ze in je account opslaat.",
        edge: "cachety",
      },
      {
        criterion: "Account, gratis gebruik en limieten",
        cachety: CACHETY.free,
        other: "Geen registratie nodig. Gratis gebruik heeft een dagelijkse downloadlimiet en een limiet voor de bestandsgrootte; een betaald abonnement haalt die weg.",
        edge: "cachety",
      },
      {
        criterion: "Pagina's op volgorde zetten",
        cachety: CACHETY.pages,
        other: "Bij samenvoegen kun je pagina's verplaatsen, draaien en verwijderen. Een aparte tool, Organize, doet hetzelfde voor één pdf.",
      },
      {
        criterion: "Onder een maximale grootte blijven",
        cachety: CACHETY.size,
        other: "Compressieniveaus, geen grootte in megabytes. Basiscompressie is gratis; sterkere niveaus horen bij het betaalde abonnement.",
        edge: "cachety",
      },
      {
        criterion: "Geaccepteerde bestandstypen",
        cachety: CACHETY.inputs,
        other: "Pdf, Word, Excel, PowerPoint, JPG en PNG bij samenvoegen: andere bestanden worden eerst omgezet naar pdf. HEIC-foto's in de tool voor JPG naar pdf.",
        edge: "other",
      },
      {
        criterion: "Hoe de nieuwe pdf eruitziet",
        cachety: CACHETY.output,
        other: "Niet beschreven op de pagina van de samenvoegtool. Tekstherkenning (OCR) wordt als aparte tool aangeboden.",
      },
      {
        criterion: "Verborgen gegevens",
        cachety: CACHETY.hidden,
        other: "Niet gedocumenteerd voor samenvoegen op de product- of helppagina's.",
      },
      {
        criterion: "Apps en offline gebruik",
        cachety: CACHETY.offline,
        other: "Apps voor iOS en Android, en een desktopapp voor Windows die offline werkt. De desktopapp voor Mac wordt niet meer ondersteund.",
      },
    ],
    body: [
      { type: "h2", text: "Een gereedschapskist in de cloud en een tool die op je apparaat blijft" },
      {
        type: "p",
        text: "Smallpdf omschrijft zijn tools om samen te voegen en te comprimeren als cloudgebaseerd: je bestanden worden geüpload, op de servers van Smallpdf verwerkt en na een uur verwijderd, tenzij je ze in je account opslaat. Smallpdf zegt ISO/IEC 27001-gecertificeerd te zijn en TLS-versleuteling te gebruiken tijdens de bestandsoverdracht. De tools zijn beschikbaar in 24 talen.",
      },
      {
        type: "p",
        text: "Cachety heeft hier één taak: van de pdf's en foto's waar iemand je om heeft gevraagd één schoon bestand van de juiste grootte maken. Alles gebeurt in je browser. Er is geen upload, dus er valt achteraf ook niets te verwijderen.",
      },
      { type: "h2", text: "Waar Smallpdf beter is" },
      {
        type: "list",
        items: [
          "Het zet Word-, Excel- en PowerPoint-bestanden om naar pdf en voegt ze in één keer samen.",
          "Het biedt tekstherkenning (OCR), zodat een scan doorzoekbaar kan worden.",
          "Het heeft telefoonapps met een scanner, en een Windows-app die bestanden offline verwerkt.",
          "Met een account bewaar je je documenten online en vind je ze terug op een ander apparaat.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter is" },
      {
        type: "list",
        items: [
          "Je bestanden worden nooit geüpload, op een telefoon net zo goed als op een computer, en er is niets te installeren.",
          "Er is geen daglimiet en geen betaald abonnement.",
          "Je kiest een grootte in megabytes, zoals online formulieren hun limiet opgeven, en je hoort vóór het downloaden als die niet haalbaar is zonder dat het bestand onleesbaar wordt.",
          "Verborgen gegevens worden uit elk bestand verwijderd, zonder aparte stap.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Je moet Word-, Excel- of PowerPoint-bestanden aan de samengevoegde pdf toevoegen.",
      "De tekst van een scan moet worden herkend (OCR).",
      "Je gebruikt Windows en wilt een geïnstalleerde app die offline werkt.",
      "Je wilt je documenten in een online account bewaren.",
    ],
    chooseCachety: [
      "Het gaat om identiteitsbewijzen, loonstroken of bankafschriften en je uploadt ze liever niet.",
      "Een formulier vraagt om één bestand kleiner dan 1, 2, 5 of 10 MB.",
      "Je werkt op een telefoon en wilt geen app installeren of account aanmaken.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Bij de onlinetools van Smallpdf wel: bestanden worden naar de servers van Smallpdf geüpload en na een uur verwijderd, tenzij je ze in je account opslaat. De desktopapp voor Windows verwerkt bestanden offline."
      ),
      {
        q: "Kan Smallpdf een pdf tot een exacte grootte comprimeren?",
        a: "Nee. Smallpdf biedt compressieniveaus, en op het eigen blog staat dat je in de tool geen exacte grootte kunt invullen. Bij Cachety kies je 1, 2, 5 of 10 MB.",
      },
      {
        q: "Is Smallpdf gratis?",
        a: "Deels. Samenvoegen en basiscompressie zijn gratis met een dagelijkse downloadlimiet; sterkere compressie en onbeperkt gebruik horen bij het betaalde abonnement. Cachety is gratis, zonder daglimiet en zonder betaald abonnement.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: pdf samenvoegen", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: pdf comprimeren", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: pdf ordenen", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG naar pdf", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: prijzen en vergelijking van abonnementen", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: privacyverklaring", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: apps en extensies", url: "https://smallpdf.com/download" },
      { label: "Smallpdf-blog: een pdf tot een gekozen grootte comprimeren", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Over Smallpdf", url: "https://smallpdf.com/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-adobe-merge",
    competitor: "adobe-merge",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    title: "Cachety of Adobe Acrobat online: pdf's samenvoegen en comprimeren",
    metaTitle: "Alternatief voor Adobe Acrobat: pdf samenvoegen, geen upload",
    description:
      "De gratis onlinetools van Adobe voegen pdf's samen en comprimeren ze op Adobe-servers. Cachety doet het in je browser, zonder upload en zonder inloggen.",
    intro:
      "Adobe heeft de pdf uitgevonden, en met de gratis onlinetools van Acrobat voeg je in elke browser pdf's samen en comprimeer je ze. De bestanden worden op de servers van Adobe verwerkt. Cachety doet een smallere taak op je eigen apparaat: het zet pdf's en foto's in één bestand, onder een maximale grootte, zonder ze te uploaden.",
    verdict:
      "Voor pdf's waarvan de tekst moet blijven zoals hij is, is samenvoegen bij Adobe de betere keuze: het combineert bestanden zonder de kwaliteit van afbeeldingen, tekst of opmaak te verlagen, en neemt tot 100 bestanden aan. De betaalde desktopapp kan veel meer dan Cachety. Cachety is de betere keuze voor persoonlijke documenten die je liever niet uploadt, om gratis foto's en pdf's te combineren, en om aan een maximale grootte in megabytes te voldoen.",
    table: [
      {
        criterion: "Waar de bestanden worden verwerkt",
        cachety: CACHETY.where,
        other: "Bij de onlinetools: op de servers van Adobe. De desktopapp van Acrobat comprimeert bestanden lokaal op je apparaat.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang bestanden worden bewaard",
        cachety: CACHETY.kept,
        other: "Verwijderd van de servers van Adobe, tenzij je inlogt om ze in je account op te slaan. Na het downloaden kun je een bestand zelf verwijderen.",
        edge: "cachety",
      },
      {
        criterion: "Account, gratis gebruik en limieten",
        cachety: CACHETY.free,
        other: "Samenvoegen: tot 100 bestanden van elk 500 pagina's, zonder watermerk. Comprimeren: gratis met beperkt gebruik; voor onbeperkt gebruik is een betaald abonnement nodig.",
      },
      {
        criterion: "Pagina's op volgorde zetten",
        cachety: CACHETY.pages,
        other: "Bestanden kun je vóór het samenvoegen in een andere volgorde zetten. Om losse pagina's te herschikken moet je inloggen.",
        edge: "cachety",
      },
      {
        criterion: "Onder een maximale grootte blijven",
        cachety: CACHETY.size,
        other: "Drie compressieniveaus: hoog, gemiddeld en laag. Bestanden tot 2 GB.",
      },
      {
        criterion: "Foto's en andere bestandstypen",
        cachety: CACHETY.inputs,
        other: "De gratis samenvoegtool neemt pdf's aan. Pdf's combineren met Word-, Excel-, PowerPoint- of afbeeldingsbestanden hoort bij Acrobat Pro. Een aparte tool zet afbeeldingen om in een pdf, en om het resultaat te downloaden moet je inloggen.",
      },
      {
        criterion: "Hoe de nieuwe pdf eruitziet",
        cachety: CACHETY.output,
        other: "Bestanden worden gecombineerd zonder afbeeldingen, tekst of opmaak te comprimeren of in kwaliteit te verlagen.",
        edge: "other",
      },
      {
        criterion: "Verborgen gegevens",
        cachety: CACHETY.hidden,
        other: "Verborgen informatie verwijderen (“sanitize”) en zwartlakken zijn functies van het betaalde Acrobat Pro.",
        edge: "cachety",
      },
      {
        criterion: "Apps en offline gebruik",
        cachety: CACHETY.offline,
        other: "Met de gratis Acrobat Reader kun je bekijken, annoteren, invullen en ondertekenen. Bewerken, converteren en comprimeren zitten in de betaalde desktopapp. De telefoonapp Adobe Scan bewaart scans in de cloudopslag van Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "De standaard voor pdf's, en een kleine tool voor één taak" },
      {
        type: "p",
        text: "Adobe biedt meer dan 25 gratis onlinetools. De tool om pdf's samen te voegen neemt tot 100 bestanden aan en combineert ze zonder hun kwaliteit te veranderen. De tool om pdf's te comprimeren biedt drie niveaus. Beide sturen je bestanden naar de servers van Adobe, waar ze worden verwijderd tenzij je inlogt om ze op te slaan. Adobe zegt dat bestanden versleuteld zijn tijdens het transport en in opslag, en noemt ISO 27001 en SOC 2 onder zijn certificeringen voor Acrobat op het web.",
      },
      {
        type: "p",
        text: "Cachety maakt alleen een bestand klaar om te versturen: de pdf's en foto's waar je om gevraagd bent, op volgorde, in één pdf van de juiste grootte. Alles gebeurt in je browser, en je hoeft bij geen enkele stap in te loggen.",
      },
      { type: "h2", text: "Waar Adobe Acrobat beter is" },
      {
        type: "list",
        items: [
          "De samengevoegde pdf behoudt de kwaliteit van de originele tekst, afbeeldingen en opmaak.",
          "Het verwerkt grote taken: tot 100 bestanden bij samenvoegen, en bestanden tot 2 GB bij comprimeren.",
          "De betaalde desktopapp bewerkt tekst en afbeeldingen, converteert bestanden, comprimeert en lakt zwart.",
          "Betaal je al voor Acrobat, dan staat alles op één plek, met je bestanden in je Adobe-account.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter is" },
      {
        type: "list",
        items: [
          "Je bestanden worden nooit geüpload, en je hoeft nergens in te loggen.",
          "Losse pagina's verplaatsen, draaien en verwijderen is gratis en kan zonder account.",
          "Foto's en pdf's gaan gratis in hetzelfde bestand, ook HEIC-foto's van een iPhone.",
          "Verborgen gegevens worden uit elk bestand verwijderd, een functie die Adobe voor het betaalde Pro-abonnement houdt.",
          "Je kiest een grootte in megabytes en hoort vóór het downloaden of die haalbaar is.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "De tekst van de samengevoegde pdf moet selecteerbaar en doorzoekbaar blijven.",
      "Je hebt tientallen bestanden of heel grote pdf's om te combineren.",
      "Je betaalt al voor Acrobat, of je moet ook bewerken, converteren of tekst laten herkennen.",
    ],
    chooseCachety: [
      "Het gaat om identiteitsbewijzen, loonstroken of bankafschriften en je uploadt ze liever niet.",
      "Je wilt pagina's verplaatsen, draaien of verwijderen zonder in te loggen.",
      "Je moet foto's en pdf's combineren en het resultaat onder 1, 2, 5 of 10 MB houden.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Bij de onlinetools van Adobe wel: bestanden worden op de servers van Adobe verwerkt en verwijderd, tenzij je inlogt om ze op te slaan. De desktopapp van Acrobat werkt op je eigen apparaat."
      ),
      {
        q: "Heb ik een Adobe-account nodig om pdf's samen te voegen?",
        a: "Niet om samen te voegen en te downloaden. Adobe vraagt je in te loggen om losse pagina's te herschikken, om het bestand met een link te delen, of om een pdf te downloaden die van afbeeldingen is gemaakt. Cachety heeft helemaal geen account.",
      },
      {
        q: "Kan Acrobat online metadata uit een pdf verwijderen?",
        a: "Verborgen informatie verwijderen is een functie van het betaalde Acrobat Pro. Cachety verwijdert verborgen gegevens uit elk bestand dat het maakt, door de pagina's opnieuw op te bouwen als afbeeldingen.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: gratis onlinetools", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: pdf's samenvoegen", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: pdf comprimeren", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG naar pdf", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: pdf-pagina's herschikken", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: pdf-pagina's verwijderen", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: abonnementen vergeleken", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: beveiligingsoverzicht",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: lijst met certificeringen", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── PDF24 ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-pdf24-merge",
    competitor: "pdf24-merge",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/",
    title: "Cachety of PDF24: pdf's samenvoegen en comprimeren zonder ze te uploaden",
    metaTitle: "Alternatief voor PDF24: pdf samenvoegen zonder upload",
    description:
      "De onlinetools van PDF24 voegen pdf's samen en comprimeren ze op zijn servers; de Windows-app werkt offline. Cachety werkt in elke browser, zonder upload.",
    intro:
      "PDF24 is een gratis Duitse verzameling pdf-tools. De onlinetools verwerken bestanden op de servers van PDF24, en het Windows-programma, PDF24 Creator, doet hetzelfde werk op je pc. Cachety werkt in de browser van elk apparaat en uploadt je bestanden nooit, maar doet een smallere taak.",
    verdict:
      "Op een Windows-computer is PDF24 Creator moeilijk te verslaan: het is gratis, werkt offline en voegt de originele pagina's samen, zodat de tekst blijft zoals hij was. Op een telefoon, een Mac of een computer waarop je niets kunt installeren, betekent PDF24 de onlinetools, en die uploaden je bestanden. Daar is Cachety de betere keuze voor persoonlijke documenten, en je kiest er een grootte in megabytes.",
    table: [
      {
        criterion: "Waar de bestanden worden verwerkt",
        cachety: CACHETY.where,
        other: "Onlinetools: in de cloud, op de servers van PDF24. PDF24 Creator (Windows): op je pc, zonder upload.",
      },
      {
        criterion: "Hoe lang bestanden worden bewaard",
        cachety: CACHETY.kept,
        other: "Online: automatisch verwijderd na een uur. Je kunt ze ook meteen met de hand verwijderen.",
        edge: "cachety",
      },
      {
        criterion: "Account, gratis gebruik en limieten",
        cachety: CACHETY.free,
        other: "Gratis en zonder beperking, zonder registratie. Online mag een bestand tot 1.000 MB groot zijn en een taak tot 10 GB.",
      },
      {
        criterion: "Pagina's op volgorde zetten",
        cachety: CACHETY.pages,
        other: "Bestanden zet je met slepen in een andere volgorde. Een paginamodus toont de pagina's van alle bestanden. Pagina's draaien en verwijderen zijn aparte tools.",
      },
      {
        criterion: "Onder een maximale grootte blijven",
        cachety: CACHETY.size,
        other: "Je stelt de resolutie (DPI) en de beeldkwaliteit in, met een optie voor grijstinten. Er is geen optie “comprimeren tot 5 MB”.",
        edge: "cachety",
      },
      {
        criterion: "Geaccepteerde bestandstypen",
        cachety: CACHETY.inputs,
        other: "Pdf's, afbeeldingen, Word-documenten en andere bestanden. HEIC-foto's van een iPhone worden in de samenvoegtool niet ondersteund.",
      },
      {
        criterion: "Hoe de nieuwe pdf eruitziet",
        cachety: CACHETY.output,
        other: "Pagina's worden overgenomen zoals ze zijn, niet opnieuw gemaakt: tekst, afbeeldingen en lettertypen behouden hun kwaliteit.",
        edge: "other",
      },
      {
        criterion: "Verborgen gegevens",
        cachety: CACHETY.hidden,
        other: "Een aparte tool verwijdert de metadata van een pdf.",
      },
      {
        criterion: "Apps en offline gebruik",
        cachety: CACHETY.offline,
        other: "PDF24 Creator brengt alle tools offline, alleen op Windows. Er is nog geen versie voor Mac of Linux, en geen app in de appwinkels voor telefoons.",
      },
      {
        criterion: "Advertenties en trackers",
        cachety: CACHETY.ads,
        other: "De onlinetools worden gefinancierd met advertenties. Het privacybeleid noemt Google AdSense en Google Analytics.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Twee manieren om PDF24 te gebruiken" },
      {
        type: "p",
        text: "De onlinetools van PDF24 zijn gratis, vragen geen registratie en worden betaald met advertenties. Ze verwerken je bestanden op de servers van PDF24: de overdracht is versleuteld, en de bestanden worden na een uur verwijderd. PDF24 wordt gerund door een bedrijf dat in Berlijn is gevestigd.",
      },
      {
        type: "p",
        text: "PDF24 Creator is anders. Het is een gratis Windows-programma dat alle tools van PDF24 naar je pc brengt, waar bestanden lokaal blijven en niet worden geüpload. Gebruik je Windows en kun je software installeren, dan geeft het je de privacy van Cachety en meer functies.",
      },
      { type: "h2", text: "Waar PDF24 beter is" },
      {
        type: "list",
        items: [
          "De samengevoegde pdf behoudt de originele pagina's, dus de tekst blijft selecteerbaar en het bestand blijft licht.",
          "Het accepteert Word-documenten en andere bestanden, en biedt tekstherkenning (OCR).",
          "Op Windows doet PDF24 Creator dit allemaal offline, gratis.",
          "Je kunt de resolutie en de beeldkwaliteit van de compressie zelf instellen.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter is" },
      {
        type: "list",
        items: [
          "Geen upload op welk apparaat dan ook: een telefoon, een Mac, een Linux-computer of een pc waarop je geen software kunt installeren.",
          "Je kiest een grootte in megabytes, in plaats van instellingen te proberen tot het bestand klein genoeg is.",
          "HEIC-foto's van een iPhone worden geaccepteerd zoals ze zijn.",
          "Verborgen gegevens worden uit elk bestand verwijderd, zonder aparte stap.",
          "Geen advertenties en geen trackers.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Je gebruikt Windows en kunt PDF24 Creator installeren: het werkt offline en behoudt de originele pagina's.",
      "De tekst van de samengevoegde pdf moet selecteerbaar en doorzoekbaar blijven.",
      "Je moet Word-documenten toevoegen of de tekst van een scan laten herkennen.",
      "Je wilt de resolutie en de beeldkwaliteit zelf instellen.",
    ],
    chooseCachety: [
      "Je werkt op een telefoon, een Mac of een computer waarop je geen software kunt installeren, en je uploadt je documenten liever niet.",
      "Een formulier vraagt om één bestand kleiner dan 1, 2, 5 of 10 MB.",
      "Je foto's komen van een iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Bij de onlinetools van PDF24 wel: bestanden worden op de servers van PDF24 verwerkt en na een uur verwijderd. Bij PDF24 Creator op Windows niet: bestanden blijven op je pc."
      ),
      {
        q: "Kan PDF24 een pdf tot een bepaalde grootte comprimeren?",
        a: "Niet rechtstreeks. Je stelt de resolutie en de beeldkwaliteit in, en de eigen uitleg van PDF24 zegt dat er geen optie “comprimeren tot 5 MB” is. Bij Cachety kies je 1, 2, 5 of 10 MB.",
      },
      {
        q: "Werkt PDF24 offline op een Mac of een telefoon?",
        a: "Nee. PDF24 Creator is er alleen voor Windows. Op een Mac of een telefoon biedt PDF24 zijn onlinetools aan, die bestanden op de servers van PDF24 verwerken. Cachety werkt in de browser van elk apparaat, zonder te uploaden.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: pdf samenvoegen", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: pdf comprimeren", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: afbeeldingen naar pdf", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: pdf-metadata verwijderen", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: vragen en antwoorden", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "PDF24-hulp: pdf-bestanden samenvoegen", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "PDF24-hulp: een pdf comprimeren", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "PDF24-hulp: Mac, Linux en telefoons", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: privacybeleid", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── Sejda ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-sejda-merge",
    competitor: "sejda-merge",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety of Sejda: pdf's samenvoegen en comprimeren zonder ze te uploaden",
    metaTitle: "Alternatief voor Sejda: pdf samenvoegen zonder upload",
    description:
      "Sejda voegt pdf's samen en comprimeert ze online, of op je computer met de desktopapp, binnen gratis limieten. Cachety werkt in je browser, zonder upload.",
    intro:
      "Sejda is een Nederlandse gereedschapskist voor pdf's met twee gezichten: onlinetools die bestanden op de servers van Sejda verwerken, en Sejda Desktop, een app voor Mac, Windows en Linux die ze op je computer verwerkt. Beide hebben limieten in de gratis versie. Cachety werkt in de browser van elk apparaat, uploadt niets en heeft geen limiet per uur of per dag, maar doet een smallere taak.",
    verdict:
      "Samenvoegen bij Sejda is rijker: het behoudt bladwijzers, maakt een inhoudsopgave en kan de bestandsnaam onderaan de pagina's zetten. Sejda Desktop houdt bestanden op je computer. Kies Sejda als je die opties nodig hebt. Kies Cachety voor persoonlijke documenten op een telefoon of als je niets wilt installeren, voor bestanden boven de gratis limieten van Sejda, en voor een maximale grootte in megabytes.",
    table: [
      {
        criterion: "Waar de bestanden worden verwerkt",
        cachety: CACHETY.where,
        other: "Online: geüpload en verwerkt op de servers van Sejda. Sejda Desktop: op je computer, niet geüpload.",
      },
      {
        criterion: "Hoe lang bestanden worden bewaard",
        cachety: CACHETY.kept,
        other: "Online: automatisch verwijderd na 2 uur. Met een knop verwijder je ze eerder.",
        edge: "cachety",
      },
      {
        criterion: "Account, gratis gebruik en limieten",
        cachety: CACHETY.free,
        other: "Geen registratie. Gratis online samenvoegen: tot 50 pagina's of 50 MB, 3 taken per uur. Gratis comprimeren: tot 200 pagina's of 100 MB. Gratis desktop: 3 taken per dag. Een betaald abonnement haalt de limieten weg.",
        edge: "cachety",
      },
      {
        criterion: "Pagina's op volgorde zetten",
        cachety: CACHETY.pages,
        other: "Bestanden zet je met slepen in een andere volgorde. In een paginaweergave kun je vóór het samenvoegen pagina's verwijderen, verplaatsen en dupliceren.",
      },
      {
        criterion: "Onder een maximale grootte blijven",
        cachety: CACHETY.size,
        other: "Instellingen voor beeldkwaliteit en resolutie, met een optie voor grijstinten. Geen grootte in megabytes om op te mikken.",
        edge: "cachety",
      },
      {
        criterion: "Geaccepteerde bestandstypen",
        cachety: CACHETY.inputs,
        other: "Pdf's en afbeeldingen zoals JPG en PNG in de samenvoegtool. HEIC-afbeeldingen worden niet ondersteund.",
      },
      {
        criterion: "Opties bij het samenvoegen",
        cachety: "Geen, behalve de paginavolgorde: geen bladwijzers, geen inhoudsopgave.",
        other: "Bladwijzers per bestand behouden of aanmaken, een inhoudsopgave, lege pagina's voor dubbelzijdig afdrukken, de bestandsnaam in de voettekst.",
        edge: "other",
      },
      {
        criterion: "Verborgen gegevens",
        cachety: CACHETY.hidden,
        other: "Een aparte tool bewerkt de metadata van een pdf.",
      },
      {
        criterion: "Apps en offline gebruik",
        cachety: CACHETY.offline,
        other: "Sejda Desktop voor Mac, Windows en Linux werkt offline, met dezelfde functies als de onlinedienst.",
      },
    ],
    body: [
      { type: "h2", text: "Online of op je computer: Sejda biedt beide" },
      {
        type: "p",
        text: "Op de website van Sejda upload je je documenten en worden ze op de servers van Sejda verwerkt. Sejda zegt dat bestanden versleuteld zijn tijdens het transport en in opslag, en na twee uur automatisch worden verwijderd. De gratis dienst is beperkt in pagina's, megabytes en taken per uur.",
      },
      {
        type: "p",
        text: "Sejda Desktop verwerkt bestanden op je computer, zonder upload, op Mac, Windows en Linux. De gratis versie staat drie taken per dag toe. Eén detail telt voor persoonlijke documenten: in de servicevoorwaarden van Sejda staat dat gebruikers geen gevoelige persoonlijke informatie, zoals door de overheid uitgegeven identificatienummers, bij de onlinedienst mogen aanleveren.",
      },
      { type: "h2", text: "Waar Sejda beter is" },
      {
        type: "list",
        items: [
          "Opties bij het samenvoegen die Cachety niet heeft: bladwijzers, een inhoudsopgave, lege pagina's voor dubbelzijdig afdrukken.",
          "Een desktopapp voor Mac, Windows en Linux die bestanden op je computer houdt.",
          "Veel andere tools op dezelfde plek: tekstherkenning (OCR), bijsnijden, scans rechtzetten, bewerken.",
          "Nauwkeurige controle over de compressie, met instellingen voor beeldkwaliteit en resolutie.",
        ],
      },
      { type: "h2", text: "Waar Cachety beter is" },
      {
        type: "list",
        items: [
          "Er wordt niets geüpload en niets geïnstalleerd, op een telefoon net zo goed als op een computer.",
          "Geen limiet van 50 pagina's en geen maximum aantal taken per uur of per dag: een bestand van 60 pagina's of een vierde bestand in hetzelfde uur is geen probleem.",
          "Je kiest een grootte in megabytes en hoort vóór het downloaden of die haalbaar is.",
          "HEIC-foto's van een iPhone worden geaccepteerd zoals ze zijn, en verborgen gegevens worden uit elk bestand verwijderd.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Je hebt bladwijzers of een inhoudsopgave nodig in de samengevoegde pdf.",
      "Je kunt Sejda Desktop installeren en je taak past binnen de gratis limieten, of je hebt een betaald abonnement.",
      "Je hebt tekstherkenning nodig, of je wilt scans bijsnijden of rechtzetten.",
    ],
    chooseCachety: [
      "Het gaat om identiteitsbewijzen, loonstroken of bankafschriften, en je werkt op een telefoon of kunt geen software installeren.",
      "Je bestand heeft meer dan 50 pagina's, of je moet in hetzelfde uur meerdere bestanden klaarmaken.",
      "Een formulier vraagt om één bestand kleiner dan 1, 2, 5 of 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Bij de onlinetools van Sejda wel: bestanden worden naar de servers van Sejda geüpload en na twee uur verwijderd. Bij Sejda Desktop niet: bestanden worden op je computer verwerkt."
      ),
      {
        q: "Wat zijn de gratis limieten van Sejda voor samenvoegen?",
        a: "Online: documenten tot 50 pagina's of 50 MB en drie taken per uur. De gratis versie van Sejda Desktop staat drie taken per dag toe. Cachety heeft zulke limieten niet: tot 1.000 pagina's in één bestand.",
      },
      {
        q: "Kan Sejda een pdf tot een bepaalde grootte comprimeren?",
        a: "De compressietool biedt instellingen voor beeldkwaliteit en resolutie, geen grootte om op te mikken. Bij Cachety kies je 1, 2, 5 of 10 MB.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: pdf samenvoegen", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: pdf comprimeren", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG naar pdf", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: pdf-pagina's ordenen", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: pdf-metadata bewerken", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: prijzen en vragen", url: "https://www.sejda.com/pricing" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Sejda: beveiliging", url: "https://www.sejda.com/security" },
      { label: "Sejda: privacybeleid", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: servicevoorwaarden", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
