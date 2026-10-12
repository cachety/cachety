import type { SiteCopy } from "@/lib/site-copy";

// Sitetekst in het Nederlands (Nederland en Vlaanderen), overal "je". Dezelfde
// beloftes als in het Engels, niet meer en niet minder (zie docs/security.md).

export const SITE_NL: SiteCopy = {
  nav: {
    tool: "De tool",
    about: "Waarom een watermerk?",
    guides: "Uitleg",
    privacy: "Privacy",
    menu: "Menu",
    close: "Menu sluiten",
    donate: "Doneren",
    compare: "Vergelijkingen",
    nameShort: "cachet (zegel) + cacher (verbergen)",
  },
  hero: {
    title: "Zet een watermerk op je documenten zonder ze ergens heen te sturen",
    lead: "Identiteitskaart, paspoort, loonstrook, bankafschrift: voeg in een paar seconden een watermerk toe. Je bestanden blijven van begin tot eind op je eigen apparaat.",
    pills: ["Gratis", "Geen account", "Niets wordt geüpload", "Gemaakt in Frankrijk"],
  },
  landing: {
    howTitle: "Zo werkt het",
    how: [
      { title: "Sleep je document erin", body: "Een pdf of een foto, ook een foto van je iPhone. Meerdere tegelijk kan ook." },
      {
        title: "Zeg waarvoor het is",
        body: "Bijvoorbeeld “Huuraanvraag, Makelaardij De Linde, 11-10-2026”. Er zitten kant-en-klare sjablonen bij.",
      },
      {
        title: "Controleren en downloaden",
        body: "Het voorbeeld laat precies zien wat je krijgt. Het bestand met watermerk wordt op je apparaat opgeslagen.",
      },
    ],
    trustTitle: "Je documenten verlaten nooit je apparaat",
    trustLead:
      "De meeste watermerksites uploaden je identiteitsbewijs naar hun servers. Cachety niet: al het werk gebeurt in je browser, op je eigen telefoon of computer.",
    trust: [
      {
        title: "Verwerkt op je apparaat",
        body: "Je bestanden blijven in het geheugen van je apparaat. Sluit het tabblad en alles is weg.",
      },
      {
        title: "Ingebouwde blokkade",
        body: "De pagina verbiedt je browser om gegevens naar een andere website te sturen. Zelfs als er iets misgaat, kunnen je bestanden niet weg.",
      },
      {
        title: "Geen account, geen tracking",
        body: "Geen registratie, geen trackingcookies, geen bezoekersstatistieken, geen advertentienetwerken.",
      },
      {
        title: "Open source en controleerbaar",
        body: "De code is openbaar. Iedereen kan hem lezen, controleren of een eigen kopie van de site draaien.",
      },
    ],
    airplaneTitle: "Controleer het zelf: de vliegtuigmodustest",
    airplaneBody:
      "Open deze pagina en zet daarna je internet uit (vliegtuigmodus). Sleep een document erin: Cachety blijft werken. Het bewijs dat er niets over internet gaat.",
    featuresTitle: "Alles wat je nodig hebt om een kopie te beschermen",
    features: [
      {
        title: "Watermerk over de hele pagina",
        body: "Schuin herhaald en opgenomen in het beeld: je haalt het niet weg door de pdf simpelweg te bewerken.",
      },
      {
        title: "Gegevens zwartlakken",
        body: "Verberg een rekeningnummer, je BSN of een pasfoto. De inhoud wordt echt verwijderd, niet alleen bedekt.",
      },
      {
        title: "Een unieke code op elke kopie",
        body: "Voeg bij het bewerken van de tekst een korte code toe die op elke kopie anders is: duikt er een ergens op, dan weet je waar hij vandaan komt.",
      },
      {
        title: "Eén kopie per ontvanger",
        body: "Voeg elke ontvanger toe: iedereen krijgt een eigen kopie, met de eigen naam erop, in één download.",
      },
      {
        title: "Een wachtwoord dat voor je gemaakt wordt",
        body: "Beveilig het bestand met 12 willekeurige woorden, makkelijk voor te lezen aan de telefoon, en AES-256-versleuteling.",
      },
      {
        title: "Verborgen gegevens verwijderd",
        body: "Selecteerbare tekst, metadata en de gps-locatie van foto's worden uit het eindbestand gehaald.",
      },
      {
        title: "Klein genoeg voor elke website",
        body: "Weigert een website of e-mail je bestand? Verklein het dan tot 10, 5, 2 of 1 MB.",
      },
      {
        title: "Werkt op je telefoon",
        body: "iPhone en Android, HEIC-foto's inbegrepen. Zet Cachety als app op je beginscherm.",
      },
    ],
    originTitle: "Gratis, open source, gemaakt in Frankrijk",
    originBody:
      "Cachety is gratis, opensourcesoftware (AGPL-licentie). De code is voor iedereen open en dat blijft zo. Het bouwt voort op Filigrane Local en Filigraneur, twee Franse opensourceprojecten.",
    originBy: "Ontworpen en onderhouden door",
    supportTitle: "Steun Cachety",
    supportBody:
      "Cachety is gratis en blijft gratis. Maar het kost tijd, en de domeinnaam en ontwikkeltools kosten geld. Heeft Cachety je geholpen? Een kleine donatie houdt het draaiende.",
    supportCta: "Doneren",
    supportNote: "Vrijwillig. De betaling gaat via GitHub Sponsors, buiten deze site.",
    faqTitle: "Veelgestelde vragen",
    faq: [
      {
        q: "Worden mijn bestanden naar een server geüpload?",
        a: "Nee, nooit. De site heeft niet eens een server die een bestand zou kunnen ontvangen. Je browser doet al het werk, en de pagina verbiedt hem technisch om contact te maken met een andere website. De vliegtuigmodustest bewijst het in tien seconden.",
      },
      {
        q: "Is het echt gratis? Wat is het addertje?",
        a: "Er is er geen: geen account, geen betaalde versie, geen gegevens verzameld. Omdat er niets op een server wordt verwerkt, kost het hosten van de site bijna niets, en de open broncode zorgt ervoor dat het gratis blijft. Voor de ontwikkeling rekent Cachety op vrijwillige donaties, en misschien komen er ooit een paar zorgvuldig gekozen gesponsorde links (versleutelingstools, opensourcesoftware…). Nooit advertenties die je volgen, en nooit iets op basis van je documenten.",
      },
      {
        q: "Welke bestanden kan ik watermerken?",
        a: "Pdf's en afbeeldingen: JPG, PNG, iPhone-foto's (HEIC), WebP, GIF, BMP en AVIF. Tot 200 MB per bestand en 500 pagina's per pdf, meerdere bestanden tegelijk.",
      },
      {
        q: "Kan het watermerk worden verwijderd?",
        a: "Niet door de pdf te bewerken: het watermerk is onderdeel van het beeld van elke pagina. Eerlijk is eerlijk: niets houdt iemand tegen om een document te fotograferen of te bewerken. Een watermerk ontmoedigt hergebruik en laat je nagaan waar een lek vandaan komt.",
      },
      {
        q: "Wat zet ik in het watermerk?",
        a: "Drie dingen: waarvoor de kopie is, naar wie je hem stuurt en de datum. Bijvoorbeeld “Huuraanvraag, Makelaardij De Linde, 11-10-2026”.",
      },
      {
        q: "Werkt het op mijn telefoon?",
        a: "Ja, op iPhone en Android. Open cachety.com in je browser, tik op het vak en kies een foto of een pdf. Je kunt Cachety ook op je beginscherm zetten.",
      },
    ],
    guidesTitle: "Praktische uitleg",
    guidesLead: "Stap voor stap hulp bij alledaagse situaties.",
    guidesAll: "Alle uitleg",
    backToTop: "Een document watermerken",
  },
  privacy: {
    title: "Privacy en beveiliging",
    lead: "Je documenten zijn persoonlijk. Hier lees je in gewone taal wat Cachety wel en niet doet, en hoe je dat zelf controleert.",
    updated: "Bijgewerkt op 12 oktober 2026",
    sections: [
      {
        title: "In het kort",
        items: [
          "Je bestanden worden nooit geüpload: je browser verwerkt ze, op je apparaat.",
          "Geen account, geen trackingcookies, geen bezoekersstatistieken, geen advertentienetwerken.",
          "Er wordt niets bewaard: sluit het tabblad en je documenten zijn uit het geheugen verdwenen.",
          "De code is openbaar en iedereen kan hem controleren.",
        ],
      },
      {
        title: "Wat er gebeurt als je een bestand erin sleept",
        paras: [
          "Je browser leest het bestand in het geheugen van je apparaat. Elke pagina wordt omgezet in een afbeelding, het watermerk wordt erop getekend en er wordt een gloednieuw bestand gemaakt. Klik je op Downloaden, dan wordt het direct op je apparaat opgeslagen.",
          "Op geen enkel moment gaan het bestand, de tekst van het watermerk, de namen van de ontvangers of het wachtwoord over internet.",
        ],
      },
      {
        title: "Wat we niet verzamelen",
        items: [
          "Je documenten en de voorbeelden ervan.",
          "De tekst van je watermerk en de namen van je ontvangers.",
          "Je wachtwoorden.",
          "Wie je bent: er is geen account en geen formulier.",
          "Je gewoontes: geen Google Analytics, geen advertentiepixel, geen trackingcookie.",
        ],
      },
      {
        title: "Wat er op je apparaat blijft staan",
        paras: [
          "Alleen je instellingen: taal, uiterlijk van het watermerk en de maximale bestandsgrootte die je koos. Ze blijven in je browser, zodat je ze niet opnieuw hoeft in te stellen. Er wordt daar nooit een bestand, tekst of wachtwoord opgeslagen. Je wist ze op elk moment door de sitegegevens van deze site in je browser te verwijderen.",
          "Om offline te werken, bewaart je browser ook een kopie van de pagina's van de site (niet van je documenten).",
        ],
      },
      {
        title: "Hosting en financiering",
        paras: [
          "De pagina's van de site worden geleverd door Cloudflare. Zoals elke webhost ziet Cloudflare technisch de IP-adressen van bezoekers en de pagina's die ze opvragen, om ze te kunnen leveren. Je documenten ziet het nooit, omdat ze nooit worden verstuurd.",
          "Donaties lopen via GitHub Sponsors, op de eigen website van GitHub en onder het eigen privacybeleid van GitHub. Cachety ziet je betaalgegevens nooit, en de pagina's bevatten geen betaalformulier of betaalscript.",
          "Op Cachety staan vandaag geen advertenties. Om het project draaiende te houden, kunnen er in de toekomst een paar gesponsorde links verschijnen, met de hand gekozen en in lijn met het doel van de site: versleutelingstools, opensourcesoftware, veilig documenten delen. Ze worden duidelijk gemarkeerd, door Cachety zelf getoond zonder advertentienetwerk of script van derden, en hangen nooit af van je documenten. Het beveiligingsbeleid van de pagina blijft elke verbinding met een andere website verbieden.",
        ],
      },
      {
        title: "Zo controleer je het zelf",
        items: [
          "De vliegtuigmodustest: open de site, zet je internet uit en watermerk een document. Alles werkt.",
          "De broncode is openbaar: iedereen kan hem lezen, en automatische tests controleren bij elke wijziging dat er geen gegevens weg kunnen.",
          "Voor wie het wil weten: het beveiligingsbeleid van de pagina (CSP) verbiedt de browser om verbinding te maken met een andere website.",
          "Vertrouw je liever niemand? Je kunt de site op je eigen computer of server draaien.",
        ],
      },
      {
        title: "Extra bescherming voor je kopieën",
        items: [
          "Afgedekte gebieden worden echt uit het bestand verwijderd, niet alleen met een rechthoek bedekt.",
          "Verborgen tekst, metadata en de gps-locatie van foto's worden verwijderd.",
          "Wachtwoorden gebruiken AES-256-versleuteling; een gekopieerd wachtwoord wordt na een minuut van het klembord gewist.",
          "Een beveiligingsprobleem gevonden? Meld het vertrouwelijk via de beveiligingspagina van de GitHub-repository.",
        ],
      },
      {
        title: "Wat een watermerk niet kan",
        paras: [
          "Een watermerk ontmoedigt hergebruik van een kopie en helpt je nagaan waar een lek vandaan komt. Het maakt een kopie niet onmogelijk om te fotograferen of te bewerken. Stuur alleen de documenten die echt worden gevraagd, en dek alles af wat niet nodig is.",
        ],
      },
    ],
  },
  guidesUi: {
    title: "Praktische uitleg",
    lead: "Huren, bankzaken, paspoort, telefoon: zo bescherm je je documenten stap voor stap, zonder technische kennis.",
    read: "Lees de uitleg",
    example: "Voorbeeld van een watermerk",
    faqTitle: "Veelgestelde vragen",
    related: "Lees ook",
    cta: "Mijn document watermerken",
    ctaNote: "Gratis, geen account. Het document verlaat nooit je apparaat.",
    updated: (d) => `Bijgewerkt op ${d}`,
    allGuides: "Alle uitleg",
  },
  compareUi: {
    title: "Cachety vergeleken met andere watermerktools",
    lead: "Heldere, gecontroleerde vergelijkingen met de tools die het meest worden gebruikt: waar je bestanden heen gaan, wat het kost, en wanneer een andere tool de betere keuze is.",
    read: "Lees de vergelijking",
    verdictTitle: "In het kort",
    tableTitle: "Naast elkaar",
    criterion: "Criterium",
    edgeCachety: "Voordeel Cachety",
    edgeOther: (n: string) => `Voordeel ${n}`,
    chooseOther: (n: string) => `Wanneer ${n} de betere keuze is`,
    chooseCachety: "Wanneer Cachety de betere keuze is",
    sourcesTitle: "Bronnen",
    checked: (d: string) =>
      `Feiten gecontroleerd op ${d} op de openbare pagina's van elke aanbieder. Diensten veranderen: klopt hier iets niet meer, laat het ons weten op GitHub en we passen het aan.`,
    disclosure: "Geschreven door de maker van Cachety. We willen feitelijk en eerlijk zijn: elke bewering over een andere tool verwijst naar de bron.",
    allComparisons: "Alle vergelijkingen",
    related: "Andere vergelijkingen",
  },
  footer: {
    tagline: "Zet een watermerk op je documenten zonder dat ze ooit je apparaat verlaten.",
    name: {
      pron: "/ka.ʃə.ti/",
      pos: "zelfstandig naamwoord",
      def: "Van het Franse cachet, het zegel dat voor een document instaat, en cacher, verbergen. Een zegel op wat je deelt, een sluier over de rest.",
    },
    support: "Steun het project",
    madeIn: "Gemaakt in Frankrijk",
    by: "door",
    basedOn: "Gebaseerd op",
    inspiredBy: "zelf geïnspireerd door",
    license: "AGPL-3.0-licentie",
    source: "Broncode",
    free: "Gratis dienst, geen tracking",
  },
};
