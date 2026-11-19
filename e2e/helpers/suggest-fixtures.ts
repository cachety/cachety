// Documents d'essai des suggestions de masquage (docs/prd-suggested-areas.md
// §11.2) : des PDF fabriqués avec pdf-lib, dont on connaît la position exacte
// de chaque numéro (d'après les métriques de la police), pour vérifier que
// les rectangles suggérés tombent au bon endroit.
//
// Les numéros sont des exemples publiés (registre ISO 13616, spécimen de
// carte Vitale) : aucune donnée réelle.

import { degrees, PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";

/** Zone d'un texte sur la page affichée, en fractions (0–1) comme les masques. */
export type Box = { x: number; y: number; w: number; h: number };
export type Spot = {
  kind: string;
  /** Texte du numéro, tel qu'écrit. */
  text: string;
  /** Page (index 0). */
  page: number;
  /** Boîte exacte du texte dessiné (largeur de la police, ascendante et descendante). */
  box: Box;
  /** Largeur moyenne d'un caractère et hauteur du texte, en fractions de la page : les marges du §5.6 en découlent. */
  advance: { x: number; y: number };
};

export const NIR = "2 69 05 49 588 157 80";
export const IBAN = "FR14 2004 1010 0505 0001 3M02 606";
export const IBAN_PAGE_30 = "DE89 3704 0044 0532 0130 00";

const A4: [number, number] = [595, 842];
const INK = rgb(0.07, 0.07, 0.08);

/** Boîte d'un texte dessiné en (x, y) : en fractions de la page affichée, rotation /Rotate comprise. */
function boxOf(font: PDFFont, size: number, text: string, x: number, y: number, rotate: 0 | 90, [w, h]: [number, number]) {
  const width = font.widthOfTextAtSize(text, size);
  const ascent = font.heightAtSize(size, { descender: false });
  const descent = font.heightAtSize(size) - ascent;
  const height = ascent + descent;
  if (rotate === 0) {
    return {
      box: { x: x / w, y: (h - y - ascent) / h, w: width / w, h: height / h },
      advance: { x: width / text.length / w, y: height / h },
    };
  }
  // /Rotate 90 : le point (x, y) du PDF s'affiche en (y / h, x / w), sur une page de h × w.
  return {
    box: { x: (y - descent) / h, y: x / w, w: height / h, h: width / w },
    advance: { x: height / h, y: width / text.length / w },
  };
}

type Fonts = { regular: PDFFont; bold: PDFFont; serif: PDFFont; mono: PDFFont };
async function fonts(doc: PDFDocument): Promise<Fonts> {
  return {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    serif: await doc.embedFont(StandardFonts.TimesRoman),
    mono: await doc.embedFont(StandardFonts.Courier),
  };
}

export type PayslipFixture = {
  bytes: Uint8Array;
  /** Les deux numéros à suggérer : le NIR, puis l'IBAN. */
  spots: Spot[];
  /** Montants, dates, téléphone, SIRET : rien ne doit y être suggéré. */
  decoys: Box[];
};

/**
 * Page de bulletin de paie (A4) : un NIR au milieu d'une ligne (« N° SS : … »),
 * un IBAN dessiné en deux morceaux, en Times, après son libellé, et des
 * nombres sans rapport. `rotate` : la même page avec /Rotate 90.
 */
export async function makeSuggestPayslip(rotate: 0 | 90 = 0): Promise<PayslipFixture> {
  const doc = await PDFDocument.create();
  const f = await fonts(doc);
  const page = doc.addPage(A4);
  const spots: Spot[] = [];
  const decoys: Box[] = [];
  const draw = (text: string, x: number, y: number, size: number, font: PDFFont) =>
    page.drawText(text, { x, y, size, font, color: INK });
  const decoy = (text: string, x: number, y: number, size = 9, font = f.regular) => {
    draw(text, x, y, size, font);
    decoys.push(boxOf(font, size, text, x, y, rotate, A4).box);
  };

  draw("BULLETIN DE PAIE", 40, 790, 16, f.bold);
  decoy("Période du 01/11/2026 au 30/11/2026", 40, 770);
  decoy("SARL Exemple Conseil, SIRET 812 345 678 00021, APE 6202A", 40, 755);
  decoy("Tél. 01 23 45 67 89 - Fax 01 98 76 54 32", 40, 740);
  draw("Salariée : Camille DURAND, consultante", 40, 705, 10, f.bold);

  // Le NIR au milieu d'un seul élément de texte : sa position dépend de la
  // répartition de la largeur entre les caractères (lib/text-lines.ts).
  const before = "N° SS : ";
  draw(`${before}${NIR} (clé comprise)`, 40, 688, 10, f.regular);
  spots.push({
    kind: "fr-nir",
    text: NIR,
    page: 0,
    ...boxOf(f.regular, 10, NIR, 40 + f.regular.widthOfTextAtSize(before, 10), 688, rotate, A4),
  });

  decoy("Matricule 000123 - Entrée le 02/01/2019", 40, 672, 9, f.mono);
  ["Rubrique", "Base", "Taux", "Montant"].forEach((h, i) => draw(h, [48, 280, 360, 430][i], 640, 9, f.bold));
  const rows: [string, string, string, string][] = [
    ["Salaire de base", "151,67", "19,450", "2 950,00"],
    ["Prime d'ancienneté", "2 950,00", "3,000", "88,50"],
    ["Sécurité sociale plafonnée", "3 038,50", "6,900", "209,66"],
    ["Retraite complémentaire T1", "3 038,50", "4,010", "121,84"],
    ["CSG déductible", "2 985,33", "6,800", "203,00"],
  ];
  rows.forEach(([label, base, rate, amount], i) => {
    const y = 620 - i * 18;
    draw(label, 48, y, 9, f.regular);
    decoy(base, 280, y);
    decoy(`${rate} %`, 360, y);
    decoy(`${amount} €`, 430, y);
  });
  decoy("NET À PAYER : 2 345,67 €", 330, 500, 12, f.bold);
  decoy("Cumul imposable 2026 : 31 204,18 € - Heures 1 668,37", 40, 470);

  // L'IBAN en deux morceaux (deux opérateurs de texte), après son libellé.
  const label = "IBAN : ";
  const head = "FR14 2004 1010 0505";
  const tail = IBAN.slice(head.length);
  const x0 = 40 + f.serif.widthOfTextAtSize(label, 10);
  draw(label, 40, 430, 10, f.serif);
  draw(head, x0, 430, 10, f.serif);
  draw(tail, x0 + f.serif.widthOfTextAtSize(head, 10), 430, 10, f.serif);
  spots.push({ kind: "iban", text: IBAN, page: 0, ...boxOf(f.serif, 10, IBAN, x0, 430, rotate, A4) });
  draw("BIC : PSSTFRPPXXX - Virement le 30/11/2026", 40, 414, 9, f.regular);

  if (rotate) page.setRotation(degrees(rotate));
  return { bytes: await doc.save(), spots, decoys };
}

/** PDF de `pages` pages A4 portant chacune un peu de texte ; un IBAN sur la page `ibanPage` (numérotée à partir de 1). */
export async function makeLongPdf(pages = 40, ibanPage = 30): Promise<{ bytes: Uint8Array; spot: Spot }> {
  const doc = await PDFDocument.create();
  const f = await fonts(doc);
  let spot: Spot | undefined;
  for (let i = 0; i < pages; i++) {
    const page: PDFPage = doc.addPage(A4);
    page.drawText(`Contrat de location, page ${i + 1} sur ${pages}`, { x: 50, y: 790, size: 11, font: f.regular, color: INK });
    page.drawText("Loyer mensuel : 1 250,00 € - Dépôt de garantie : 2 500,00 €", { x: 50, y: 770, size: 9, font: f.regular, color: INK });
    if (i === ibanPage - 1) {
      const label = "Compte du bailleur : ";
      page.drawText(`${label}${IBAN_PAGE_30}`, { x: 50, y: 600, size: 11, font: f.regular, color: INK });
      spot = {
        kind: "iban",
        text: IBAN_PAGE_30,
        page: i,
        ...boxOf(f.regular, 11, IBAN_PAGE_30, 50 + f.regular.widthOfTextAtSize(label, 11), 600, 0, A4),
      };
    }
  }
  return { bytes: await doc.save(), spot: spot! };
}

/**
 * PDF de `pages` petites pages (300 × 400) remplies de texte : mesure du coût
 * de la lecture du texte par rapport au rendu. Petites pages exprès : le rendu
 * y coûte peu, la lecture du texte y pèse donc proportionnellement plus.
 */
export async function makeTextHeavyPdf(pages: number, linesPerPage = 30): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < pages; i++) {
    const page = doc.addPage([300, 400]);
    for (let l = 0; l < linesPerPage; l++) {
      const n = i * linesPerPage + l;
      page.drawText(`Ligne ${l + 1} : écriture ${n} du ${String((n % 28) + 1).padStart(2, "0")}/11/2026, montant ${(n * 37) % 9000},${String(n % 100).padStart(2, "0")} €`, {
        x: 16,
        y: 384 - l * 12,
        size: 7,
        font,
        color: INK,
      });
    }
  }
  return doc.save();
}

/**
 * PDF hostile pour la lecture du texte : une page qui porte `items` éléments
 * de texte minuscules, chacun à sa place (un opérateur de texte par élément).
 */
export async function makeManyItemsPdf(items: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([400, 400]);
  for (let i = 0; i < items; i++) {
    page.drawText(String(i % 10), { x: 4 + (i % 97) * 4, y: 392 - (Math.floor(i / 97) % 97) * 4, size: 3, font, color: INK });
  }
  return doc.save();
}

/** Zones qui se touchent ? (fractions de page) */
export const intersects = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/**
 * Le rectangle suggéré couvre-t-il la boîte du texte, sans dépasser les
 * marges du §5.6 (15 % de la hauteur du texte, une demi-largeur de
 * caractère) de plus de 1 % de la largeur de la page affichée ? `aspect` :
 * largeur / hauteur de cette page (la tolérance en y en dépend). `vertical` :
 * texte lu de haut en bas (page tournée). Rend la liste des écarts ; vide si
 * tout va bien.
 */
export function coverage(rect: Box, spot: Spot, aspect: number, vertical = false): string[] {
  const tolerance = 0.01;
  const { box, advance } = spot;
  // Marges attendues, dans le sens du texte et en travers.
  const mx = vertical ? 0.15 * advance.x : 0.5 * advance.x;
  const my = vertical ? 0.5 * advance.y : 0.15 * advance.y;
  const eps = 0.0015;
  const problems: string[] = [];
  const check = (ok: boolean, what: string) => {
    if (!ok) problems.push(`${spot.kind} : ${what} (rect ${JSON.stringify(rect)}, texte ${JSON.stringify(box)})`);
  };
  check(rect.x <= box.x + eps, "ne couvre pas le début du texte");
  check(rect.y <= box.y + eps, "ne couvre pas le haut du texte");
  check(rect.x + rect.w >= box.x + box.w - eps, "ne couvre pas la fin du texte");
  check(rect.y + rect.h >= box.y + box.h - eps, "ne couvre pas le bas du texte");
  check(rect.x >= box.x - mx - tolerance, "déborde avant le texte");
  check(rect.y >= box.y - my - tolerance * aspect, "déborde au-dessus du texte");
  check(rect.x + rect.w <= box.x + box.w + mx + tolerance, "déborde après le texte");
  check(rect.y + rect.h <= box.y + box.h + my + tolerance * aspect, "déborde sous le texte");
  return problems;
}
