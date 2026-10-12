import type { Comparison } from "./types";

// Vergelijkingen in het Nederlands, voor Nederland en Vlaanderen. Vergelijkende
// reclame: elke bewering over een andere tool komt van de eigen openbare pagina's
// van die tool (veld `sources`), gecontroleerd op `checked`. Wat niet openbaar
// beschreven is, zeggen we ook zo ("niet beschreven"). Alleen platte tekst.

const CHECKED = "2026-10-12";
const UPDATED = "2026-10-12";

// Cellen voor Cachety die op elke pagina terugkomen (gecontroleerde feitenlijst).
const C = {
  where: "Op je eigen apparaat, in de browser. Het bestand gaat naar geen enkele server.",
  retention: "Niets te wissen: Cachety ontvangt je bestanden nooit.",
  price: "Gratis, zonder betaalde versie of account.",
  ads: "Vandaag geen advertenties, geen trackers, geen trackingcookies en geen bezoekersstatistieken.",
  watermark: "Alleen tekst, schuin herhaald over de hele pagina en opgenomen in het beeld van de pagina.",
  removal: "Niet simpel: het watermerk zit in het beeld van de pagina, niet in een aparte laag.",
  redact: "Ingebouwd: teken rechthoeken en de afgedekte inhoud wordt echt uit het bestand verwijderd.",
  password: "Ja, optioneel AES-256-wachtwoord op de pdf.",
  recipients: "Ja: tot 20 ontvangers in één keer, elk met een eigen versie en optioneel een uniek kenmerk.",
  otherTools: "Nee: alleen watermerk, afdekken, samenvoegen, wachtwoord en bestandsgrootte.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Open cachety.com in de browser van je telefoon of computer. Er is niets te installeren.",
    "Sleep je ID-kaart, paspoort, loonstrook of bankafschrift erin. Meerdere bestanden tegelijk kan.",
    "Vul in waarvoor de kopie is en wie hem krijgt, bijvoorbeeld: Huuraanvraag, Makelaardij De Linde. De datum komt er automatisch bij.",
    "Dek met Iets afdekken af wat de ontvanger niet hoeft te zien, zoals je BSN, en vink eventueel Beveiligen met een wachtwoord aan.",
    "Download de kopie met watermerk en stuur die, nooit het origineel.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "De vliegtuigmodustest: open Cachety, zet vliegtuigmodus aan en voeg je document toe. Komt het watermerk er gewoon op, dan is er niets van je apparaat af gegaan. Een tool die bestanden uploadt, werkt zonder verbinding niet.",
};

export const COMPARISONS_NL: Comparison[] = [
  // ───────────────────────────── KopieID ─────────────────────────────
  {
    slug: "cachety-vs-kopieid",
    competitor: "kopieid",
    competitorName: "KopieID",
    competitorUrl:
      "https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/identiteitsfraude/vraag-en-antwoord/identiteitsfraude/veilige-kopie-identiteitsbewijs",
    title: "Cachety of de KopieID-app: welke gebruik je voor een veilige kopie?",
    metaTitle: "KopieID of Cachety: veilige kopie van je ID maken",
    description:
      "KopieID van de Rijksoverheid of Cachety? Twee gratis manieren om een veilige kopie van je ID te maken. Wanneer kies je welke? Een eerlijke vergelijking.",
    intro:
      "KopieID is de gratis app van de Rijksoverheid om een veilige kopie van je identiteitsbewijs te maken. Het is een goede, officiële tool, en voor veel mensen precies genoeg. Hier lees je waar hij en Cachety van elkaar verschillen.",
    verdict:
      "Wil je alleen een Nederlands paspoort, ID-kaart of rijbewijs op je telefoon veilig kopiëren, dan is KopieID een uitstekende keuze: gratis, officieel en gemaakt voor precies dat doel. Cachety is handiger als je al een pdf of scan hebt, op een computer werkt, ook loonstroken of bankafschriften wilt beveiligen, of in één keer een eigen versie per ontvanger met een wachtwoord wilt maken.",
    table: [
      {
        criterion: "Wie het maakt",
        cachety: "Een persoonlijk project, gemaakt in Frankrijk, zonder bedrijf erachter.",
        other: "De Rijksoverheid, via de Rijksdienst voor Identiteitsgegevens.",
        edge: "other",
      },
      {
        criterion: "Prijs",
        cachety: C.price,
        other: "Gratis.",
      },
      {
        criterion: "Waar het werkt",
        cachety: "In elke moderne browser: telefoon, tablet of computer. Niets te installeren.",
        other: "App voor iPhone en iPad (App Store) en Android (Google Play). Een versie voor de computer wordt niet genoemd.",
      },
      {
        criterion: "Wat je erin stopt",
        cachety: "Elke pdf of afbeelding (JPG, PNG, HEIC en meer), ook loonstroken en bankafschriften. Meerdere bestanden tegelijk.",
        other: "Volgens de officiële beschrijving maak je in de app een foto van je identiteitsdocument, eventueel ook van de achterkant.",
        edge: "cachety",
      },
      {
        criterion: "Herkenning van het document",
        cachety: "Geen automatische herkenning: je kiest zelf wat je afdekt.",
        other: "Herkent Nederlandse en Caribisch-Nederlandse paspoorten, ID-kaarten en rijbewijzen, en waar de gegevens erop staan.",
        edge: "other",
      },
      {
        criterion: "Gegevens afdekken",
        cachety: C.redact,
        other: "Ja: je streept gegevens door die de ontvanger niet nodig heeft, zoals het BSN of de pasfoto.",
      },
      {
        criterion: "Watermerk",
        cachety: "Doel en ontvanger, met automatisch de datum. Licht, Normaal of Sterk; lettertype, grootte, kleur, dekking en golf onder Meer instellingen.",
        other: "Voor wie en waarvoor de kopie is, met de datum, als watermerk op de kopie.",
      },
      {
        criterion: "Een kopie per ontvanger",
        cachety: C.recipients,
        other: "Niet beschreven: per ontvanger maak je een nieuwe kopie.",
        edge: "cachety",
      },
      {
        criterion: "Wachtwoord op het bestand",
        cachety: C.password,
        other: "Niet beschreven. Opslaan in de app kan alleen als je telefoon of tablet een wachtwoord heeft.",
        edge: "cachety",
      },
      {
        criterion: "Wat er met je gegevens gebeurt",
        cachety: "Niets verlaat je apparaat; geen statistieken of trackers.",
        other: "Volgens het privacylabel in de App Store verzamelt de app alleen diagnosegegevens, zoals crash- en prestatiegegevens.",
      },
    ],
    body: [
      { type: "h2", text: "Wat KopieID doet" },
      {
        type: "p",
        text: "Met KopieID maak je in de app een foto van je paspoort, identiteitskaart of rijbewijs. Je streept de gegevens door die de ontvanger niet nodig heeft, zoals je BSN of pasfoto. Daarna vul je in voor wie de kopie bedoeld is en waarvoor hij nodig is; die tekst komt met de datum als watermerk op de kopie. Je kunt de kopie versturen, printen of bewaren, waarbij bewaren alleen kan als je telefoon of tablet met een wachtwoord is beveiligd. Het is precies het advies van de overheid voor een veilige kopie, in één app gegoten.",
      },
      {
        type: "p",
        text: "De sterke punten zijn duidelijk. KopieID is gratis en officieel, komt van de overheid die je identiteitsbewijs ook uitgeeft, en herkent waar de gegevens op een Nederlands document staan. Wie alleen af en toe een kopie van zijn ID-kaart moet sturen vanaf zijn telefoon, heeft er alles aan.",
      },
      { type: "h2", text: "Wanneer Cachety beter past" },
      {
        type: "list",
        items: [
          "Je hebt al een pdf of scan, bijvoorbeeld van de printer op je werk, en wilt die beveiligen.",
          "Je werkt op een computer, want Cachety draait in elke browser.",
          "Je wilt ook je loonstroken, werkgeversverklaring of bankafschriften van een watermerk voorzien, niet alleen je ID.",
          "Je reageert op meerdere woningen en wilt in één keer een eigen versie per makelaar, met een uniek kenmerk.",
          "Je wilt de pdf met een wachtwoord beveiligen, of alle documenten in één pdf samenvoegen.",
          "Je hebt een Belgische eID of een buitenlands paspoort: Cachety werkt met elk document.",
        ],
      },
      {
        type: "p",
        text: "Het afdekken werkt anders. In KopieID veeg je met je vinger over de gegevens; in Cachety teken je rechthoeken. In beide gevallen is het resultaat een kopie zonder je BSN. Bij Cachety wordt het afgedekte gebied uit het beeld van de pagina gehaald en wordt ook de selecteerbare tekst en de metadata verwijderd.",
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Je wilt alleen een Nederlands paspoort, ID-kaart of rijbewijs kopiëren, vanaf je telefoon.",
      "Je vertrouwt het liefst een tool van de overheid zelf.",
      "Je wilt dat de app voor je herkent waar de gegevens op het document staan.",
    ],
    chooseCachety: [
      "Je wilt een pdf of scan beveiligen die je al hebt, of je werkt op een computer.",
      "Je stuurt ook loonstroken of bankafschriften mee.",
      "Je wilt een eigen versie per ontvanger, een wachtwoord op de pdf, of alles in één bestand.",
    ],
    faq: [
      {
        q: "Is KopieID gratis?",
        a: "Ja. KopieID is een gratis app van de Rijksoverheid voor iPhone, iPad en Android.",
      },
      {
        q: "Kan ik met KopieID ook een loonstrook beveiligen?",
        a: "KopieID is gemaakt voor identiteitsdocumenten: volgens de officiële beschrijving herkent hij paspoorten, ID-kaarten en rijbewijzen. Voor een loonstrook, werkgeversverklaring of bankafschrift kun je een tool gebruiken die met elke pdf werkt, zoals Cachety.",
      },
      {
        q: "Wordt mijn ID geüpload bij KopieID of Cachety?",
        a: "Bij Cachety niet: alles gebeurt in je browser, wat je zelf kunt controleren met de vliegtuigmodustest. Voor KopieID zegt het privacylabel in de App Store dat de app alleen diagnosegegevens verzamelt, zoals crashgegevens.",
      },
      {
        q: "Welke is veiliger?",
        a: "Allebei maken ze een kopie met afgedekte gegevens en een watermerk met doel en datum, en dat is waar het om gaat. Kies KopieID als je alleen je ID vanaf je telefoon kopieert, en Cachety als je meer documenten, een computer of meerdere ontvangers hebt.",
      },
    ],
    sources: [
      {
        label: "Rijksoverheid: hoe maak ik met de KopieID-app een veilige kopie?",
        url: "https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/identiteitsfraude/vraag-en-antwoord/identiteitsfraude/veilige-kopie-identiteitsbewijs",
      },
      { label: "KopieID in de App Store", url: "https://apps.apple.com/nl/app/kopieid/id932970330" },
      {
        label: "Rijksoverheid: fraude voorkomen met een kopie van je identiteitsbewijs",
        url: "https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/identiteitsfraude/vraag-en-antwoord/identiteitsfraude/fraude-voorkomen-met-kopie-id-bewijs",
      },
      {
        label: "ID.nl: zo gebruik je de KopieID-app",
        url: "https://id.nl/huis-en-entertainment/computer-en-gaming/software/zo-gebruik-je-de-kopie-id-app",
      },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/nl",
    title: "Cachety of iLovePDF: waarmee zet je een watermerk op je ID?",
    metaTitle: "Alternatief voor iLovePDF om je ID te watermerken",
    description:
      "iLovePDF uploadt je pdf naar zijn servers en wist hem binnen twee uur. Cachety zet het watermerk op je eigen apparaat. Een eerlijke vergelijking.",
    intro:
      "iLovePDF is een van de bekendste pdf-sites en de watermerktool is snel en uitgebreid. Maar om een watermerk op je paspoort of loonstrook te zetten, moet iLovePDF het bestand op zijn servers hebben. Cachety doet hetzelfde zonder dat het bestand je telefoon of computer verlaat.",
    verdict:
      "Voor een logo als watermerk of dagelijkse pdf-klussen zoals samenvoegen, converteren of ondertekenen is iLovePDF de completere gereedschapskist. Voor een identiteitsbewijs, loonstrook of bankafschrift stuurt Cachety het bestand nergens heen. Wil je je paspoort liever op geen enkele server hebben, dan is dat het verschil dat telt.",
    table: [
      {
        criterion: "Waar je bestand wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van iLovePDF, in de regel binnen de Europese Economische Ruimte. Het bestand wordt versleuteld geüpload.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang het bestand blijft",
        cachety: C.retention,
        other: "Binnen twee uur na verwerking gewist, volgens het privacybeleid.",
        edge: "cachety",
      },
      {
        criterion: "Prijs",
        cachety: C.price,
        other: "Gratis versie met beperkingen. Premium heft die op.",
      },
      {
        criterion: "Advertenties",
        cachety: C.ads,
        other: "Een advertentievrije ervaring staat op de prijspagina als voordeel van Premium.",
        edge: "cachety",
      },
      {
        criterion: "Soort watermerk",
        cachety: C.watermark,
        other: "Tekst of afbeelding, op een gekozen positie of als mozaïek, met doorzichtigheid en draaiing.",
        edge: "other",
      },
      {
        criterion: "Is het watermerk weg te halen?",
        cachety: C.removal,
        other: "Niet beschreven. Je kiest of het watermerk over of onder de inhoud van de pdf komt.",
      },
      {
        criterion: "Gegevens zwartlakken",
        cachety: C.redact,
        other: "Via een aparte tool, Redact PDF.",
      },
      {
        criterion: "Een kopie per ontvanger",
        cachety: C.recipients,
        other: "Niet beschreven in de watermerktool.",
        edge: "cachety",
      },
      {
        criterion: "Apps",
        cachety: "Alleen web, werkt ook op je telefoon.",
        other: "Website, plus apps voor computer en mobiel. De prijspagina noemt toegang via web, mobiel en desktop als voordeel van Premium.",
      },
      {
        criterion: "Andere pdf-tools",
        cachety: C.otherTools,
        other: "Een groot aanbod: samenvoegen, splitsen, comprimeren, converteren, ondertekenen en meer.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Het echte verschil: waar je paspoort heen gaat" },
      {
        type: "p",
        text: "Gebruik je de website van iLovePDF, dan wordt je bestand naar de servers gestuurd, daar bewerkt en teruggestuurd. iLovePDF zegt dat bestanden versleuteld worden verstuurd en binnen twee uur worden gewist, en het bedrijf heeft een ISO 27001-certificering. Dat is een redelijk beleid. Maar in die twee uur staat een kopie van je ID op een computer die jij niet beheert, onder de regels van iemand anders. Cachety werkt anders: alles draait in je browser. Je paspoort wordt op je eigen apparaat gelezen, van een watermerk voorzien en opgeslagen. Dat is geen belofte om het snel te wissen: het bestand wordt gewoon nooit verstuurd.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Waar iLovePDF beter is" },
      {
        type: "p",
        text: "iLovePDF is een complete pdf-gereedschapskist. Wil je samenvoegen, comprimeren, naar Word converteren of ondertekenen, dan kan dat er allemaal, en met Cachety niet. De watermerktool accepteert ook een afbeelding, zodat een bedrijf zijn logo op documenten kan zetten. Cachety doet alleen tekst.",
      },
      { type: "h2", text: "Waar Cachety beter is voor identiteitsbewijzen" },
      {
        type: "list",
        items: [
          "Je bestand verlaat je apparaat niet, dus er is geen upload en geen bewaartermijn om over na te denken.",
          "Het watermerk zit in het beeld van elke pagina en is niet weg te halen door de pdf te bewerken.",
          "Je lakt je BSN of rekeningnummer zwart in dezelfde stap.",
          "Je maakt in één keer een kopie per makelaar, werkgever of bank, elk met een eigen naam.",
          "Verborgen gegevens zoals metadata, de gps-locatie van foto's en de tekstlaag worden verwijderd.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      {
        type: "p",
        text: "Eerlijk is eerlijk: Cachety zet elke pagina om in een afbeelding, dus de tekst in het resultaat is niet meer te selecteren of te doorzoeken. Dat is bewust, om het watermerk moeilijk te verwijderen, maar het bestand kan daardoor groter worden dan het origineel.",
      },
    ],
    chooseOther: [
      "Je wilt een logo of afbeelding als watermerk op je documenten.",
      "Je wilt ook pdf's samenvoegen, comprimeren, converteren of ondertekenen op dezelfde plek.",
      "Je wilt dat de tekst van de pdf na het watermerken selecteerbaar blijft.",
    ],
    chooseCachety: [
      "Je zet een watermerk op een paspoort, ID-kaart, loonstrook of bankafschrift en wilt dat het je apparaat niet verlaat.",
      "Je wilt een eigen kopie met naam voor elke makelaar of werkgever.",
      "Je wilt in dezelfde stap je BSN zwartlakken en een wachtwoord op de pdf zetten.",
    ],
    faq: [
      {
        q: "Is iLovePDF veilig voor een identiteitsbewijs?",
        a: "iLovePDF zegt dat bestanden versleuteld worden verstuurd en binnen twee uur worden gewist, en heeft een ISO 27001-certificering. De vraag is of je het goed vindt dat een kopie van je ID die tijd op de servers staat. Zo niet, gebruik dan een tool die op je apparaat werkt, zoals Cachety.",
      },
      {
        q: "Uploadt iLovePDF mijn bestanden?",
        a: "Ja, de website verwerkt bestanden op de servers van iLovePDF.",
      },
      {
        q: "Kan ik met Cachety een logo als watermerk gebruiken?",
        a: "Nee, Cachety doet alleen tekst. Voor een logo accepteert de watermerktool van iLovePDF afbeeldingen.",
      },
    ],
    sources: [
      { label: "iLovePDF: watermerk toevoegen aan een PDF", url: "https://www.ilovepdf.com/nl/pdf-watermerk" },
      {
        label: "iLovePDF: zo voeg je een watermerk toe",
        url: "https://www.ilovepdf.com/nl/blog/how-to-watermark-pages-in-a-pdf-document-online",
      },
      { label: "iLovePDF privacybeleid", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF beveiliging", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF prijzen", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF Redact PDF", url: "https://www.ilovepdf.com/redact-pdf" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/nl",
    title: "Cachety of Smallpdf: een watermerk op je documenten zetten",
    metaTitle: "Alternatief voor Smallpdf watermerk: Cachety",
    description:
      "Smallpdf uploadt je pdf naar zijn servers om er een watermerk op te zetten. Cachety doet het op je apparaat, gratis en zonder account. Zo verschillen ze.",
    intro:
      "Smallpdf is een populaire, verzorgde pdf-site met een eenvoudige watermerktool. De pagina zegt dat je je watermerk rechtstreeks in je browser aanpast, maar de eigen veelgestelde vragen leggen uit dat bestanden worden geüpload en daarna van de servers gewist. Cachety houdt het bestand van begin tot eind op je apparaat.",
    verdict:
      "Smallpdf is een goede allround pdf-dienst met apps en veel tools, en prima voor alledaagse documenten. Voor een paspoort, ID-kaart of loonstrook slaat Cachety de upload helemaal over en voegt het functies toe die op identiteitsbewijzen zijn gericht, zoals zwartlakken en een kopie per ontvanger.",
    table: [
      {
        criterion: "Waar je bestand wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van Smallpdf; het privacybeleid noemt een hostingbedrijf met servers in de Europese Unie.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang het bestand blijft",
        cachety: C.retention,
        other: "Na een uur verwerking automatisch gewist, tenzij je het in een account opslaat.",
        edge: "cachety",
      },
      {
        criterion: "Gratis gebruik",
        cachety: C.price,
        other: "Tekstwatermerken zijn gratis, met gebruiksbeperkingen voor gratis gebruikers. Pro heft ze op.",
        edge: "cachety",
      },
      {
        criterion: "Statistieken en advertentietrackers",
        cachety: C.ads,
        other: "Het privacybeleid noemt onder meer Google Analytics, Hotjar, Google Ads, Facebook Pixel en LinkedIn Insight Tag.",
        edge: "cachety",
      },
      {
        criterion: "Soort watermerk",
        cachety: C.watermark,
        other: "Alleen tekst in de watermerktool, met lettertype, grootte, kleur en dekking. Afbeeldingen via Pdf bewerken.",
      },
      {
        criterion: "Is het watermerk weg te halen?",
        cachety: C.removal,
        other: "Niet beschreven.",
      },
      {
        criterion: "Zwartlakken en wachtwoord",
        cachety: "Afdekken en een optioneel wachtwoord in hetzelfde scherm.",
        other: "Via aparte tools voor redigeren en wachtwoordbeveiliging.",
      },
      {
        criterion: "Een kopie per ontvanger",
        cachety: C.recipients,
        other: "Niet beschreven in de watermerktool.",
        edge: "cachety",
      },
      {
        criterion: "Apps en andere tools",
        cachety: "Alleen web, werkt op je telefoon. Alleen watermerken en wat daarbij hoort.",
        other: "Een mobiele app en een app voor Windows, plus meer dan 30 pdf-tools met Pro.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "In je browser is niet hetzelfde als op je apparaat" },
      {
        type: "p",
        text: "De watermerkpagina van Smallpdf zegt dat je tekst, lettertype, grootte, kleur en dekking rechtstreeks in je browser aanpast. Dat gaat over waar je klikt, niet over waar het werk gebeurt. In de veelgestelde vragen op dezelfde pagina staat dat uploads en downloads met TLS worden versleuteld en dat bestanden na een uur van de servers worden gewist. Het privacybeleid voegt toe dat geüploade bestanden tijdelijk worden bewaard op servers in de Europese Unie van een hostingbedrijf.",
      },
      {
        type: "p",
        text: "Bij Cachety gebeuren zowel het klikken als het werk op je apparaat. Je document gaat naar geen enkele server, ook niet naar die van ons, want er is geen server die bestanden ontvangt.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Waar Smallpdf beter is" },
      {
        type: "p",
        text: "Smallpdf biedt een breed pakket, van comprimeren en converteren tot elektronisch ondertekenen, met apps voor computer en telefoon. Werk je elke dag met pdf's, dan is dat handig. Cachety doet één ding: documenten beschermen die je deelt. Tekst bewerken, ondertekenen of converteren kan het niet.",
      },
      { type: "h2", text: "Waar Cachety beter is voor identiteitsbewijzen" },
      {
        type: "list",
        items: [
          "Geen upload, dus geen bewaartermijn en geen hostingbedrijf ertussen.",
          "Geen statistieken of advertentietrackers op de pagina.",
          "Het watermerk wordt in elke pagina getekend en herhaald, dus wegknippen is lastig.",
          "Zwartlakken, een wachtwoord en een kopie per ontvanger zitten in hetzelfde scherm.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Je wilt een breed pdf-pakket, met comprimeren, converteren en ondertekenen op één plek.",
      "Je wilt liever een app voor je computer of telefoon dan een website.",
      "Je wilt dat de tekst van de pdf na het watermerken selecteerbaar blijft.",
    ],
    chooseCachety: [
      "Je deelt een identiteitsbewijs, loonstrook of bankafschrift en wilt het nergens uploaden.",
      "Je wilt een pagina zonder statistieken of advertentietrackers.",
      "Je wilt een kopie per ontvanger, of tegelijk gegevens zwartlakken.",
    ],
    faq: [
      {
        q: "Uploadt Smallpdf mijn bestanden?",
        a: "Ja. Volgens de eigen veelgestelde vragen worden bestanden versleuteld geüpload en na een uur van de servers gewist, tenzij je ze in een account opslaat.",
      },
      {
        q: "Is Smallpdf veilig voor een kopie van mijn paspoort?",
        a: "Smallpdf gebruikt versleuteling en noemt AVG-naleving en ISO-certificering. Toch wordt je paspoort geüpload en staat het een tijdje op de servers. Wil je dat vermijden, dan zet Cachety het watermerk op je eigen apparaat.",
      },
      {
        q: "Is de watermerktool van Smallpdf gratis?",
        a: "Tekstwatermerken zijn gratis, maar Smallpdf noemt gebruiksbeperkingen voor gratis gebruikers. Cachety is gratis zonder account en zonder betaalde versie.",
      },
      {
        q: "Blijft de tekst bij Cachety selecteerbaar?",
        a: "Nee. Elke pagina wordt een afbeelding met het watermerk erin, zodat het veel moeilijker te verwijderen is. Heb je doorzoekbare tekst nodig, dan is dat een reden voor een andere tool.",
      },
    ],
    sources: [
      { label: "Smallpdf: pdf van watermerk voorzien (met veelgestelde vragen)", url: "https://smallpdf.com/nl/pdf-watermerk" },
      { label: "Smallpdf privacybeleid", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: alle pdf-tools", url: "https://smallpdf.com/nl/pdf-tools" },
      { label: "Smallpdf: pdf redigeren", url: "https://smallpdf.com/nl/pdf-redigeren" },
      { label: "Smallpdf: wachtwoordbeveiliging pdf", url: "https://smallpdf.com/nl/wachtwoordbeveiliging-pdf" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/nl/",
    title: "Cachety of PDF24: online een watermerk op je documenten",
    metaTitle: "Alternatief voor PDF24 watermerk, zonder uploaden",
    description:
      "PDF24 zet watermerken op zijn servers in Duitsland en wist bestanden na een uur. Cachety doet het op je apparaat. Twee gratis tools vergeleken.",
    intro:
      "PDF24 is een gratis en royaal pakket pdf-tools van een Duits bedrijf, zonder beperkingen en zonder registratie. De online watermerktool draait op de servers van PDF24 in Duitsland. Cachety is ook gratis, maar je bestand verlaat je apparaat niet.",
    verdict:
      "PDF24 is een sterke gratis gereedschapskist, en de Windows-app PDF24 Creator houdt bestanden op je pc. Voor een snel watermerk op een identiteitsbewijs vanaf een telefoon of Mac slaat Cachety de upload over, zonder advertentienetwerken of trackers op de pagina.",
    table: [
      {
        criterion: "Waar je bestand wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van PDF24 in Duitsland voor de online tool. PDF24 Creator voor Windows werkt offline op je pc.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang het bestand blijft",
        cachety: C.retention,
        other: "Na een uur automatisch van de server gewist.",
        edge: "cachety",
      },
      {
        criterion: "Prijs en beperkingen",
        cachety: C.price,
        other: "Gratis, zonder beperkingen en zonder registratie.",
      },
      {
        criterion: "Advertenties en trackers",
        cachety: C.ads,
        other: "Gefinancierd met advertenties. Het privacybeleid noemt Google AdSense, Google Analytics en Google Remarketing.",
        edge: "cachety",
      },
      {
        criterion: "Soort watermerk",
        cachety: C.watermark,
        other: "Tekst met lettertype, kleur en transparantie, negen posities of de hele pagina vullen, plus hoek en afstand.",
      },
      {
        criterion: "Is het watermerk weg te halen?",
        cachety: C.removal,
        other: "Niet beschreven.",
      },
      {
        criterion: "Zwartlakken, wachtwoord, metadata",
        cachety: "Alles in hetzelfde scherm als het watermerk.",
        other: "Via aparte tools: pdf censureren, pdf beveiligen en metadata verwijderen.",
      },
      {
        criterion: "Een kopie per ontvanger",
        cachety: C.recipients,
        other: "Niet beschreven in de watermerktool.",
        edge: "cachety",
      },
      {
        criterion: "Andere pdf-tools",
        cachety: C.otherTools,
        other: "Tientallen gratis tools, plus een gratis desktopapp voor Windows.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Wat er met je bestand gebeurt bij PDF24 online" },
      {
        type: "p",
        text: "PDF24 is er open over: de bestandsoverdracht is met SSL beveiligd, de servers staan in Duitsland en bestanden worden na een uur automatisch van de server verwijderd. Dat is een helder en eerlijk beleid van een Europees bedrijf. Het betekent nog steeds dat een kopie van je paspoort of loonstrook over internet gaat en tot een uur op een machine staat die jij niet beheert.",
      },
      {
        type: "p",
        text: "Cachety pakt het anders aan. De pagina laadt één keer, daarna gebeurt alles in je browser. Je document wordt nergens heen gestuurd, dus er valt achteraf ook niets te wissen.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Waar PDF24 beter is" },
      {
        type: "p",
        text: "PDF24 heeft tientallen gratis tools zonder beperkingen, van comprimeren tot converteren en OCR. Op Windows doet PDF24 Creator het werk op je eigen pc, zonder internet, en dat is ook voor je privacy een goede keuze. Cachety converteert niet, bewerkt geen pdf's en heeft geen desktopapp.",
      },
      { type: "h2", text: "Waar Cachety beter is voor identiteitsbewijzen" },
      {
        type: "list",
        items: [
          "Werkt op je apparaat op elk systeem, ook iPhone, Android en Mac, zonder iets te installeren.",
          "Geen advertentienetwerken en geen advertentietrackers op de pagina.",
          "Watermerk, zwartlakken, wachtwoord en verborgen gegevens verwijderen in één stap.",
          "Een kopie per ontvanger, handig als je op meerdere woningen reageert.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Je gebruikt Windows en wilt een gratis desktopapp die bestanden op je pc houdt.",
      "Je hebt veel andere gratis pdf-tools nodig, zoals converteren, comprimeren of OCR.",
      "Je wilt dat de tekst van de pdf na het watermerken selecteerbaar blijft.",
    ],
    chooseCachety: [
      "Je wilt een watermerk op een identiteitsbewijs zetten vanaf een telefoon of Mac, zonder upload.",
      "Je wilt een pagina zonder advertentienetwerken of advertentietrackers.",
      "Je wilt zwartlakken, een wachtwoord en een kopie per ontvanger in één tool.",
    ],
    faq: [
      {
        q: "Uploadt PDF24 mijn bestanden?",
        a: "Ja, bij de online tools. PDF24 zegt dat de servers in Duitsland staan en dat bestanden na een uur worden verwijderd. De Windows-app PDF24 Creator werkt offline en houdt bestanden op je pc.",
      },
      {
        q: "Is PDF24 veilig voor een paspoort?",
        a: "PDF24 is een Europees bedrijf met een duidelijk verwijderbeleid. Of dat genoeg is, bepaal je zelf. Wil je dat je paspoort je apparaat nooit verlaat, dan omzeilt een tool die alleen in de browser werkt, zoals Cachety, die vraag.",
      },
      {
        q: "Is PDF24 echt gratis?",
        a: "Ja. PDF24 zegt dat de tools gratis en zonder beperkingen zijn, betaald door advertenties. Cachety is ook gratis, en heeft vandaag geen advertenties of trackers.",
      },
    ],
    sources: [
      { label: "PDF24: watermerk in pdf invoegen", url: "https://tools.pdf24.org/nl/watermerk-toevoegen" },
      { label: "PDF24: vragen en antwoorden", url: "https://tools.pdf24.org/nl/faq" },
      { label: "PDF24 privacybeleid", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24: pdf censureren", url: "https://tools.pdf24.org/nl/pdf-censureren" },
      { label: "PDF24: metadata uit pdf verwijderen", url: "https://tools.pdf24.org/nl/metadata-pdf-verwijderen" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/nl/acrobat.html",
    title: "Cachety of Adobe Acrobat: een watermerk op een pdf zonder abonnement",
    metaTitle: "Watermerk in Adobe Acrobat: een gratis alternatief",
    description:
      "De gratis online tools van Adobe hebben geen watermerktool; die zit in betaald Acrobat. Cachety zet gratis een watermerk op je pdf, op je eigen apparaat.",
    intro:
      "Adobe Acrobat is de standaard voor pdf-bewerking en kan watermerken toevoegen. Maar watermerken staat niet tussen de gratis online tools van Adobe: daarvoor heb je Acrobat nodig. Cachety is een gratis manier om een identiteitsbewijs van een watermerk te voorzien zonder je browser te verlaten.",
    verdict:
      "Betaal je al voor Acrobat, of heb je professionele pdf-bewerking nodig, dan is Acrobat de sterkere tool, met tekst- en afbeeldingswatermerken en veel meer. Wil je alleen een watermerk op een paspoort of loonstrook zetten voordat je hem verstuurt, dan doet Cachety dat gratis, zonder account, en blijft je bestand op je apparaat.",
    table: [
      {
        criterion: "Gratis watermerken",
        cachety: C.price,
        other: "Er staat geen watermerktool tussen de gratis online tools. Watermerken zit in Acrobat zelf.",
        edge: "cachety",
      },
      {
        criterion: "Soort watermerk",
        cachety: C.watermark,
        other: "Tekst of afbeelding, met lettertype, grootte, kleur, dekking en plaatsing.",
        edge: "other",
      },
      {
        criterion: "Gevoelige gegevens verwijderen",
        cachety: "Ingebouwd en gratis: de afgedekte inhoud wordt echt verwijderd.",
        other: "Een functie van Acrobat Pro, niet van Acrobat Standard.",
        edge: "cachety",
      },
      {
        criterion: "Wachtwoord",
        cachety: C.password,
        other: "Beschikbaar, ook als gratis online tool Pdf beveiligen.",
      },
      {
        criterion: "Waar je bestand wordt verwerkt",
        cachety: C.where,
        other: "Met de desktopapp op je computer; de gratis online tools werken via de dienst van Adobe.",
      },
      {
        criterion: "Andere pdf-functies",
        cachety: C.otherTools,
        other: "Volledige pdf-bewerking, conversie, OCR, formulieren, ondertekenen en veel meer.",
        edge: "other",
      },
      {
        criterion: "Open source",
        cachety: "Ja, AGPL-3.0, code openbaar op GitHub.",
        other: "Nee, gesloten software.",
      },
    ],
    body: [
      { type: "h2", text: "Kun je gratis een watermerk zetten met Adobe?" },
      {
        type: "p",
        text: "Adobe biedt een flinke lijst gratis online tools, zoals pdf bewerken, samenvoegen, comprimeren en Pdf beveiligen. Een watermerktool zit er niet bij. In Acrobat zelf voeg je een watermerk toe via Pdf bewerken en dan Watermerk, met tekst of een afbeelding. Zoek je een gratis watermerktool van Adobe, dan kom je dus uit bij een betaald abonnement.",
      },
      {
        type: "p",
        text: "Voor een eenmalige klus, zoals een kopie van je paspoort voor een makelaar, is een abonnement veel. Cachety is gratis en heeft geen account nodig.",
      },
      { type: "h2", text: "Waar Acrobat beter is" },
      {
        type: "p",
        text: "Acrobat is een professionele tool. Het kan een afbeelding of logo als watermerk plaatsen, de tekst van een pdf bewerken, formulieren invullen en ondertekenen, OCR uitvoeren en nog veel meer. Voor een bedrijf dat de hele dag met pdf's werkt, speelt het in een andere klasse dan Cachety, dat alleen documenten beschermt voordat je ze deelt.",
      },
      { type: "h2", text: "Waar Cachety beter is voor identiteitsbewijzen" },
      {
        type: "list",
        items: [
          "Gratis, zonder account, abonnement of proefperiode om op te zeggen.",
          "Je bestand wordt in je browser verwerkt en nooit naar een server gestuurd.",
          "Zwartlakken zit erin, dus je verbergt je BSN of rekeningnummer zonder te betalen voor Pro.",
          "Je maakt een kopie met naam per ontvanger, tot 20 tegelijk.",
          "Het werkt op een telefoon, ook met iPhone-foto's, zonder iets te installeren.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Je betaalt al voor Acrobat en bent eraan gewend.",
      "Je wilt een afbeelding of logo als watermerk, of volledige pdf-bewerking, formulieren en OCR.",
      "Je werkgever vraagt om een ondersteund, commercieel product.",
    ],
    chooseCachety: [
      "Je wilt alleen een watermerk op een identiteitsbewijs, loonstrook of afschrift, gratis en zonder abonnement.",
      "Je wilt dat je bestand op je apparaat blijft.",
      "Je wilt gegevens zwartlakken zonder te betalen voor Pro.",
    ],
    faq: [
      {
        q: "Kan ik gratis een watermerk toevoegen in Adobe Acrobat?",
        a: "De lijst met gratis online tools van Adobe bevat geen watermerktool. Watermerken is een functie van Acrobat zelf.",
      },
      {
        q: "Wat is een gratis alternatief voor Adobe om een ID te watermerken?",
        a: "Cachety is gratis en werkt in je browser zonder je bestand te uploaden. Het zet een tekstwatermerk over de hele pagina en kan ook gegevens zwartlakken en een wachtwoord instellen.",
      },
      {
        q: "Kan Cachety een logo plaatsen zoals Acrobat?",
        a: "Nee, Cachety doet alleen tekst. Heb je een logo nodig, dan is Acrobat of een andere tool die afbeeldingen accepteert de betere keuze.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat: gratis online tools", url: "https://www.adobe.com/nl/acrobat/online.html" },
      { label: "Adobe Acrobat: versies vergelijken", url: "https://www.adobe.com/nl/acrobat/pricing/compare-versions.html" },
      { label: "Adobe: wat is een watermerk", url: "https://www.adobe.com/acrobat/resources/what-is-a-watermark.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Sejda ─────────────────────────────
  {
    slug: "cachety-vs-sejda",
    competitor: "sejda",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/nl",
    title: "Cachety of Sejda: welke watermerktool past bij je documenten?",
    metaTitle: "Alternatief voor Sejda watermerk voor je ID",
    description:
      "De webtool van Sejda uploadt bestanden en wist ze na twee uur; Sejda Desktop werkt offline. Cachety zet het watermerk in je browser. Vergelijk ze.",
    intro:
      "Sejda is een capabele pdf-editor met een flexibele watermerktool, met afbeeldingen, exacte positie en meerdere versies van een document tegelijk. De website werkt door je bestanden te uploaden. Cachety biedt een eenvoudiger watermerk, alleen tekst, dat je apparaat nooit verlaat.",
    verdict:
      "Sejda heeft meer watermerkopties dan Cachety, en Sejda Desktop houdt bestanden op je computer. Zoek je een gratis tool voor identiteitsbewijzen die in elke browser werkt zonder iets te uploaden, en die ook gegevens zwartlakt, dan past Cachety beter.",
    table: [
      {
        criterion: "Waar je bestand wordt verwerkt",
        cachety: C.where,
        other: "Op de servers van Sejda bij de webversie. Sejda Desktop werkt offline op je computer.",
        edge: "cachety",
      },
      {
        criterion: "Hoe lang het bestand blijft",
        cachety: C.retention,
        other: "Na 2 uur automatisch verwijderd, volgens de toolpagina.",
        edge: "cachety",
      },
      {
        criterion: "Gratis gebruik",
        cachety: C.price,
        other: "Gratis voor documenten tot 200 pagina's of 50 MB, en 3 taken per uur.",
        edge: "cachety",
      },
      {
        criterion: "Soort watermerk",
        cachety: C.watermark,
        other: "Tekst of afbeelding (JPG, PNG, GIF, SVG), met positie, dekking, draaiing en specifieke pagina's.",
        edge: "other",
      },
      {
        criterion: "Meerdere versies",
        cachety: C.recipients,
        other: "Ja: meerdere watermerkteksten, elk op een nieuwe regel, geven meerdere versies van hetzelfde document.",
      },
      {
        criterion: "Is het watermerk weg te halen?",
        cachety: C.removal,
        other: "Niet beschreven.",
      },
      {
        criterion: "Gegevens zwartlakken",
        cachety: C.redact,
        other: "Niet in de watermerktool.",
        edge: "cachety",
      },
      {
        criterion: "Wachtwoord",
        cachety: C.password,
        other: "Via een aparte tool, Beveiligen.",
      },
      {
        criterion: "Andere pdf-tools",
        cachety: C.otherTools,
        other: "Een volledige pdf-editor online en op de computer.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Wat er met je bestand gebeurt" },
      {
        type: "p",
        text: "Op de webversie van Sejda upload je je pdf, die op de servers van Sejda wordt bewerkt. De toolpagina zegt dat bestanden privé blijven en na 2 uur automatisch worden verwijderd. Voor een paspoort of loonstrook betekent dat nog steeds dat het bestand een tijdje op een computer staat die jij niet beheert. Sejda Desktop werkt offline op je computer, en dat is een goed alternatief als je liever niets uploadt.",
      },
      {
        type: "p",
        text: "Cachety werkt helemaal in je browser, op elke telefoon of computer, zonder iets te installeren. Je bestand gaat nergens heen.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Waar Sejda beter is" },
      {
        type: "p",
        text: "Sejda heeft meer watermerkopties: een afbeelding of logo, precies plaatsen, alleen bepaalde pagina's. Ook Sejda kan meerdere versies maken, met een tekst per regel. En het is een volledige pdf-editor, met tekst bewerken, ondertekenen, converteren en OCR. Cachety doet alleen tekstwatermerken en wat daarbij hoort.",
      },
      { type: "h2", text: "Waar Cachety beter is voor identiteitsbewijzen" },
      {
        type: "list",
        items: [
          "Geen upload, in elke browser, ook op je telefoon.",
          "Geen limiet van taken per uur.",
          "Je BSN of rekeningnummer zwartlakken in dezelfde stap, met echte verwijdering.",
          "Verborgen gegevens zoals metadata en de gps-locatie van foto's worden verwijderd.",
        ],
      },
      { type: "h2", text: "Zo doe je het met Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Je wilt een afbeelding of logo als watermerk, of het precies op één plek zetten.",
      "Je wilt een desktopapp die offline op je computer werkt en ook pdf's bewerkt.",
      "Je hebt een volledige pdf-editor nodig, niet alleen een watermerk.",
    ],
    chooseCachety: [
      "Je wilt een identiteitsbewijs of loonstrook watermerken zonder het te uploaden of iets te installeren.",
      "Je wilt in dezelfde stap gegevens zwartlakken.",
      "Je wilt geen limiet van taken per uur.",
    ],
    faq: [
      {
        q: "Uploadt Sejda mijn bestanden?",
        a: "De webversie wel: bestanden worden geüpload en volgens de toolpagina na 2 uur automatisch verwijderd. Sejda Desktop werkt offline op je computer.",
      },
      {
        q: "Kan Sejda meerdere versies met een ander watermerk maken?",
        a: "Ja. Typ meerdere watermerkteksten, elk op een nieuwe regel, en Sejda maakt meerdere versies. Cachety kan dat ook, met tot 20 ontvangers en een optioneel uniek kenmerk.",
      },
      {
        q: "Wat is een gratis alternatief voor Sejda zonder limiet?",
        a: "Cachety is gratis zonder limiet van taken per uur en werkt in je browser zonder te uploaden. Het doet alleen tekstwatermerken.",
      },
    ],
    sources: [
      { label: "Sejda: pdf online watermerken", url: "https://www.sejda.com/nl/watermark-pdf" },
      { label: "Sejda: watermark PDF (Engelse pagina)", url: "https://www.sejda.com/watermark-pdf" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
