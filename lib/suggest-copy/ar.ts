import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1 ? `وجدنا أرقامًا قد ترغب في إخفائها (العدد: ${n}).` : "وجدنا رقمًا قد ترغب في إخفائه.",
  review: "مراجعة",
  title: "اقتراحات",
  hideAll: "إخفاء الكل",
  hideAllDocs: "إخفاء الكل في جميع المستندات",
  hide: "إخفاء",
  hidden: "مخفي",
  undo: "تراجع",
  dismiss: "ليس هذا",
  onPage: (p) => `الصفحة ${p}`,
  notShown: "صفحات لا تظهر في المعاينة",
  coverAll: "الاقتراحات تشمل جميع الصفحات.",
  doneAll: (n, pages, pageCount) => `المناطق المخفية: ${n} (${pageCount > 1 ? "الصفحات" : "الصفحة"}: ${pages}).`,
  none: "لا شيء نقترحه في هذا المستند.",
  noText: "لا يوجد نص يمكن قراءته في هذا المستند: ارسم المناطق بنفسك.",
  incomplete: "توقفت الاقتراحات قبل نهاية هذا المستند.",
  footer:
    "قد تفوت الاقتراحات بعض الأشياء. راجع الصفحة كلها بنفسك. الرموز الشريطية ورموز QR قد تحتوي على المعلومات نفسها.",
  note: {
    frTax: "قد يستخدمه المستلم للتحقق من صحة إشعارك الضريبي. لا تُخفِه إلا إذا لم يكن بحاجة إلى ذلك.",
    iban: "إذا طلب منك بياناتك البنكية فهو يحتاج إليه.",
  },
  kinds: {
    iban: "رقم الحساب البنكي (IBAN)",
    card: "رقم البطاقة",
    "fr-nir": "رقم الضمان الاجتماعي (فرنسا)",
    "fr-tax": "الرقم الضريبي (فرنسا)",
    "fr-tax-ref": "مرجع الإشعار الضريبي (فرنسا)",
    "de-taxid": "رقم التعريف الضريبي (ألمانيا، Steuer-ID)",
    "es-dni": "رقم الهوية (إسبانيا، DNI/NIE)",
    "nl-bsn": "رقم خدمة المواطن (هولندا، BSN)",
    "be-nn": "الرقم الوطني (بلجيكا)",
    "pt-nif": "الرقم الضريبي (البرتغال، NIF)",
    "br-cpf": "CPF (البرازيل)",
    "it-cf": "الرمز الضريبي (إيطاليا، codice fiscale)",
    "cn-id": "رقم بطاقة هوية المقيم (الصين)",
    "jp-mynumber": "My Number (اليابان)",
    "ir-melli": "الرمز الوطني (إيران)",
    "id-nik": "NIK (إندونيسيا)",
  },
  announce: (label, page, hidden) => `${label}، الصفحة ${page}: ${hidden ? "مخفي" : "ظاهر من جديد"}.`,
};

export default COPY;
