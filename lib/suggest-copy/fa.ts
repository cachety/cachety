import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
// ‌ : نیم‌فاصله (zero-width non-joiner), written as an escape so it stays visible in the source.
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1 ? `${n} شماره پیدا کردیم که شاید بخواهید بپوشانید.` : "یک شماره پیدا کردیم که شاید بخواهید بپوشانید.",
  review: "بررسی",
  title: "پیشنهادها",
  hideAll: "پوشاندن همه",
  hideAllDocs: "پوشاندن همه در همهٔ سندها",
  hide: "پوشاندن",
  hidden: "پوشانده‌شده",
  undo: "واگرد",
  dismiss: "این یکی نه",
  onPage: (p) => `صفحهٔ ${p}`,
  notShown: "صفحه‌هایی که در پیش‌نمایش نیستند",
  coverAll: "پیشنهادها همهٔ صفحه‌ها را در بر می‌گیرند.",
  doneAll: (n, pages, pageCount) => `${n} بخش پوشانده شد (${pageCount > 1 ? "صفحه‌های" : "صفحهٔ"} ${pages}).`,
  none: "در این سند چیزی برای پیشنهاد نیست.",
  noText: "در این سند متنی برای خواندن نیست: بخش‌ها را خودتان بکشید.",
  incomplete: "پیشنهادها پیش از پایان این سند متوقف شدند.",
  footer:
    "پیشنهادها ممکن است چیزهایی را جا بیندازند. خودتان همهٔ صفحه را بررسی کنید. بارکدها و کدهای QR می‌توانند همان اطلاعات را داشته باشند.",
  note: {
    frTax: "گیرنده می‌تواند با آن درستی برگهٔ مالیاتی شما را بررسی کند. فقط اگر به این کار نیازی ندارد آن را بپوشانید.",
    iban: "اگر اطلاعات حساب بانکی‌تان را خواسته است، به آن نیاز دارد.",
  },
  kinds: {
    iban: "شمارهٔ حساب بانکی (IBAN)",
    card: "شمارهٔ کارت",
    "fr-nir": "شمارهٔ تأمین اجتماعی (فرانسه)",
    "fr-tax": "شمارهٔ مالیاتی (فرانسه)",
    "fr-tax-ref": "شمارهٔ مرجع برگهٔ مالیاتی (فرانسه)",
    "de-taxid": "شناسهٔ مالیاتی (آلمان، Steuer-ID)",
    "es-dni": "شمارهٔ شناسایی (اسپانیا، DNI/NIE)",
    "nl-bsn": "شمارهٔ خدمات شهروندی (هلند، BSN)",
    "be-nn": "شمارهٔ ملی (بلژیک)",
    "pt-nif": "شمارهٔ مالیاتی (پرتغال، NIF)",
    "br-cpf": "CPF (برزیل)",
    "it-cf": "کد مالیاتی (ایتالیا، codice fiscale)",
    "cn-id": "شمارهٔ کارت شناسایی (چین)",
    "jp-mynumber": "My Number (ژاپن)",
    "ir-melli": "کد ملی",
    "id-nik": "NIK (اندونزی)",
  },
  announce: (label, page, hidden) => `${label}، صفحهٔ ${page}: ${hidden ? "پوشانده شد" : "دوباره دیده می‌شود"}.`,
};

export default COPY;
