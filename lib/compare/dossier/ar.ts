import type { Comparison } from "../types";

// Comparisons for the Dossier tool (ar): merging PDFs and photos into one
// file and getting it under a size limit. Same editorial rule as the other
// comparisons (lib/compare/types.ts); each entry carries tool: "dossier".
// Written in Modern Standard Arabic for readers across the Arab countries
// (Gulf, Egypt, Morocco…). Plain text only.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Every claim about another tool is translated from the English source
// (lib/compare/dossier/en.ts) and backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.
//
// The Cachety column describes the Dossier tool as shipped (sections, photo
// straightening and custom size included): limits from lib/watermark.ts and
// lib/pages.ts, sizes from lib/size-budget.ts. The quoted labels («ملف PDF
// واحد»، «حجم آخر…») were checked against the `dossier` block of
// lib/locales/ar/strings.ts. Keep the column in step with them.

const CHECKED = "2026-11-19";
const UPDATED = "2026-11-19";

/** Address of the tool, written without a scheme. */
const TOOL = "cachety.com/ar/dossier";

// Shared wording for the Cachety column.
const CACHETY = {
  where: "في متصفحك، على جهازك. لا يُرفع أي شيء.",
  kept: "لا شيء يُحفظ: لا يوجد خادم يستقبل ملفاتك.",
  free: "مجاني، دون حساب ولا خطة مدفوعة ولا حد يومي. حتى 200 MB لكل ملف، و500 صفحة لكل ملف PDF، و1,000 صفحة في المجموع.",
  pages: "كل صفحات كل الملفات في شبكة واحدة: تنقل الصفحة، ولو من ملف إلى آخر، أو تدوّرها أو تحذفها. ملف PDF واحد، أو ملف PDF لكل قسم تسمّيه.",
  size: "تختار حجمًا أقصى: 1 أو 2 أو 5 أو 10 MB، أو أي حد من 0.5 إلى 50 MB. ويخبرك Cachety قبل التنزيل هل سيكون الملف ضمنه ويبقى مقروءًا.",
  output: "يُعاد بناء كل صفحة كصورة. لا يمكن تحديد النص ولا البحث فيه، وقد يصبح ملف PDF النصي أكبر.",
  hidden: "تُحذف من كل ملف: النص المخفي، واسم المؤلف وبقية الخصائص، والمرفقات، والروابط، وموقع GPS في الصور.",
  inputs: "ملفات PDF والصور معًا، ومنها صور iPhone بصيغة HEIC. ويمكن تسوية صورة الورقة وقصّها وتبييضها. لا ملفات Word أو Excel أو PowerPoint.",
  offline: "لا شيء للتثبيت. تواصل الصفحة عملها في وضع الطيران بعد تحميلها، على الهاتف أو الحاسوب.",
  ads: "لا إعلانات ولا أدوات تتبع. والشيفرة مفتوحة المصدر.",
};

/** Table row «خيارات الدمج», for the tools that have bookmarks and tables of contents. */
const MERGE_OPTIONS = "ترتيب الصفحات، وملف PDF لكل قسم إذا أردت عدة ملفات. لا إشارات مرجعية ولا جدول محتويات.";

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "كيف يكون الملف الذي ينشئه Cachety" },
  {
    type: "p",
    text: "لا يضم Cachety صفحاتك الأصلية. بل يعيد بناء كل صفحة كصورة وينشئ ملف PDF جديدًا من هذه الصور. هكذا يحذف ما لا تراه: النص المخفي، واسم المؤلف، والمرفقات، والروابط، وموقع GPS في الصور. ولهذا ثمن حقيقي: لا يمكن تحديد نص الملف الجديد ولا البحث فيه، وقد يصبح ملف PDF الذي لم يكن يحتوي إلا على نص أكبر من الأصل، إلا إذا اخترت حجمًا أقصى.",
  },
  {
    type: "warning",
    text: "ليس Cachety الأداة المناسبة حين يجب أن يبقى النص قابلًا للتحديد أو البحث، أو حين تحتاج إلى الاحتفاظ بالإشارات المرجعية أو بحقول النماذج، أو حين تريد إضافة ملفات Word أو Excel، أو حين تحتاج إلى التعرّف على النص (OCR) في نسخة ممسوحة ضوئيًا.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "كيف تنشئ ملف PDF واحدًا مع Cachety" },
  {
    type: "steps",
    items: [
      `افتح ${TOOL} في متصفحك، على الحاسوب أو الهاتف. لا تحتاج إلى تثبيت أي شيء ولا إلى إنشاء حساب.`,
      "أضف ملفات PDF والصور. كل صورة تصبح صفحة.",
      "انتقل إلى الصفحات: اسحبها لترتيبها، ودوّر المقلوبة على جانبها، واحذف ما لا تريده.",
      "اختر «ملف PDF واحد»، وإذا حُدِّد لك حجم أقصى، فاختر 1 أو 2 أو 5 أو 10 MB، أو «حجم آخر…» لحد آخر.",
      "راجِع المعاينة، وأخفِ أي معلومة لا تحتاجها الجهة المستلمة، ثم نزِّل الملف.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `هل تُرفع ملفاتي مع Cachety أو ${other}؟`,
  a: `مع Cachety، لا: يتم العمل في متصفحك، ولا يوجد خادم يستقبل ملفاتك. ${answer}`,
});

const FAQ_TEXT = {
  q: "هل يبقى النص قابلًا للتحديد بعد الدمج مع Cachety؟",
  a: "لا. يعيد Cachety بناء كل صفحة كصورة، وهذا يحذف البيانات المخفية، لكنه يحذف أيضًا النص القابل للتحديد. إذا كنت تحتاج إلى النص، فاستخدم أداة تضم الصفحات الأصلية.",
};

export const DOSSIER_COMPARISONS_AR: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety أم iLovePDF: دمج ملفات PDF وضغطها دون رفعها",
    metaTitle: "بديل iLovePDF لدمج ملفات PDF دون رفعها",
    description:
      "يدمج iLovePDF ملفات PDF ويضغطها على خوادمه. أما Cachety فيفعل ذلك في متصفحك: لا يُرفع شيء، وتُحذف البيانات المخفية. مقارنة منصفة.",
    intro:
      "iLovePDF من أكثر مجموعات أدوات PDF استخدامًا على الإنترنت، وهو من برشلونة. أداتا الدمج والضغط فيه تعالجان ملفاتك على خوادمه. أما Cachety فيؤدي مهمة أضيق على جهازك: يضع ملفات PDF والصور في ملف واحد، تحت حجم أقصى، دون رفعها.",
    verdict:
      "iLovePDF يفعل أكثر: ملفات Office، والتعرّف على النص، وملفات كثيرة دفعة واحدة، وتطبيق مدفوع للحاسوب يعمل دون اتصال بالإنترنت. ولهذا كله هو الخيار الأفضل. أما Cachety فهو الخيار الأفضل حين تكون الملفات مستندات شخصية تفضّل ألا ترفعها، أو حين يجب أن تجتمع الصور وملفات PDF في ملف واحد، أو حين يحدد نموذج حجمًا أقصى بالميغابايت.",
    table: [
      {
        criterion: "أين تُعالَج الملفات",
        cachety: CACHETY.where,
        other: "على خوادم iLovePDF عند استخدام الموقع. أما تطبيق الحاسوب، في خطة مدفوعة، فيعالج الملفات على حاسوبك.",
        edge: "cachety",
      },
      {
        criterion: "مدة حفظ الملفات",
        cachety: CACHETY.kept,
        other: "تُحذف تلقائيًا خلال ساعتين من معالجتها. ويوجد في شاشة التنزيل زر يحذفها قبل ذلك.",
        edge: "cachety",
      },
      {
        criterion: "الحساب والاستخدام المجاني والحدود",
        cachety: CACHETY.free,
        other: "مجاني دون تسجيل، لعدد محدود من المستندات. الدمج المجاني: حتى 100 ملف و300 MB في المهمة الواحدة. الضغط المجاني: 5 ملفات في المهمة الواحدة. والخطة المدفوعة ترفع الحدود.",
      },
      {
        criterion: "ترتيب الصفحات",
        cachety: CACHETY.pages,
        other: "أداة الدمج تعيد ترتيب الملفات كاملة. وأداة منفصلة، هي Organize PDF، تفرز الصفحات المفردة وتحذفها وتدوّرها، وتستطيع إضافة ملفات أخرى ودمجها (مجانًا: 5 ملفات و100 MB).",
      },
      {
        criterion: "الالتزام بحجم أقصى",
        cachety: CACHETY.size,
        other: "ثلاثة مستويات للضغط: ضغط أقصى، وضغط موصى به، وضغط أقل. لا يوجد حجم بالميغابايت تستهدفه.",
        edge: "cachety",
      },
      {
        criterion: "الصور وملفات PDF معًا",
        cachety: CACHETY.inputs,
        other: "على الموقع بخطوتين: تحوّل الصور إلى PDF أولًا، ثم تدمج. ولملفات Word وExcel وPowerPoint أدوات تحويل خاصة بها.",
      },
      {
        criterion: "كيف يكون ملف PDF الجديد",
        cachety: CACHETY.output,
        other: "غير موصوف في صفحة الدمج. وهناك أداة منفصلة تتعرّف على النص (OCR) ليصبح البحث ممكنًا في النسخة الممسوحة ضوئيًا.",
      },
      {
        criterion: "البيانات المخفية",
        cachety: CACHETY.hidden,
        other: "غير موثّق لأدوات الموقع. أما تطبيق الحاسوب فيستطيع تعديل البيانات الوصفية لملف PDF أو مسحها.",
      },
      {
        criterion: "التطبيقات والعمل دون اتصال بالإنترنت",
        cachety: CACHETY.offline,
        other: "تطبيق للحاسوب على Windows وMac يعمل دون اتصال بالإنترنت: مستواه المجاني قارئ PDF، والأدوات تحتاج إلى خطة مدفوعة. وتطبيقات لنظامي iOS وAndroid.",
      },
      {
        criterion: "الإعلانات وأدوات التتبع",
        cachety: CACHETY.ads,
        other: "الخطة المجانية تعرض إعلانات، والخطة المدفوعة تزيلها.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "صندوق أدوات كبير على الإنترنت، وأداة تبقى على جهازك" },
      {
        type: "p",
        text: "على موقع iLovePDF، تُرسَل ملفاتك إلى خوادمه، وتُعالَج هناك، وتُحذف تلقائيًا خلال ساعتين. ويمكنك حذفها قبل ذلك من شاشة التنزيل. يقول iLovePDF إنه حاصل على شهادة ISO/IEC 27001 وإنه ينقل الملفات عبر اتصال مشفّر. والموقع متاح بـ 26 لغة.",
      },
      {
        type: "p",
        text: "أما Cachety فيجهّز ملفًا للإرسال فقط: ملفات PDF والصور التي طُلبت منك، مرتبةً، في ملف PDF واحد بالحجم المناسب. كل شيء يتم في متصفحك. لا رفع، فلا يوجد ما يُحذف بعد ذلك.",
      },
      { type: "h2", text: "أين يتفوق iLovePDF" },
      {
        type: "list",
        items: [
          "يحوّل ملفات Word وExcel وPowerPoint إلى PDF.",
          "يتعرّف على النص في النسخ الممسوحة ضوئيًا (OCR)، فيمكن أن يصبح ملف PDF الممسوح ضوئيًا قابلًا للبحث.",
          "يقبل المهام الكبيرة: حتى 100 ملف في الدمج المجاني.",
          "تطبيقه المدفوع للحاسوب يعالج الملفات على حاسوبك، بأغلب أدوات الموقع.",
        ],
      },
      { type: "h2", text: "أين يتفوق Cachety" },
      {
        type: "list",
        items: [
          "ملفاتك لا تُرفع أبدًا، مجانًا، على الهاتف كما على الحاسوب.",
          "الصور وملفات PDF تدخل الملف نفسه في خطوة واحدة، ويمكن نقل الصفحات المفردة أو تدويرها أو حذفها في المكان نفسه.",
          "تختار حجمًا بالميغابايت، كما تحدده النماذج الإلكترونية، ويخبرك قبل التنزيل إذا تعذّر بلوغه مع بقاء الملف مقروءًا.",
          "تُحذف البيانات المخفية من كل ملف، ولا توجد إعلانات.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "تحتاج إلى تحويل ملفات Word أو Excel أو PowerPoint، أو إلى التعرّف على نص نسخة ممسوحة ضوئيًا.",
      "لديك ملفات كثيرة أو ملفات PDF كبيرة جدًا تريد معالجتها دفعة واحدة.",
      "تدفع اشتراك iLovePDF وتستخدم تطبيقه للحاسوب، الذي يعمل على حاسوبك.",
    ],
    chooseCachety: [
      "الملفات وثائق هوية أو كشوف رواتب أو كشوف حساب، وتفضّل ألا ترفعها.",
      "تحتاج إلى الصور وملفات PDF في ملف واحد، والصفحات بالترتيب الذي تريده.",
      "يطلب نموذج ملفًا واحدًا، أو ملفًا لكل نوع من المستندات، بحجم أقصى محدد بالميغابايت.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "مع موقع iLovePDF، نعم: تُعالَج الملفات على خوادمه وتُحذف خلال ساعتين. أما تطبيقه للحاسوب فيعالج الملفات على حاسوبك، في خطة مدفوعة."
      ),
      {
        q: "هل يستطيع iLovePDF ضغط ملف PDF إلى حجم محدد بالضبط؟",
        a: "لا. يقدّم ثلاثة مستويات للضغط، ودليله نفسه يقول إنه لا توجد أداة تستطيع أن تضمن حجمًا محددًا بالضبط للملف الناتج. أما مع Cachety فتختار حجمًا أقصى بالميغابايت، ويخبرك قبل التنزيل إذا تعذّر أن يكون الملف ضمنه ويبقى مقروءًا.",
      },
      {
        q: "هل يعمل iLovePDF دون اتصال بالإنترنت؟",
        a: "تطبيقه للحاسوب على Windows وMac يعمل دون اتصال، لكن الأدوات فيه تحتاج إلى خطة مدفوعة. أما Cachety فصفحة ويب تواصل عملها في وضع الطيران بعد تحميلها، مجانًا.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: دمج PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: ضغط PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: الأسعار وحدود كل أداة", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: الأمان", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: أسئلة وأجوبة", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "مدونة iLovePDF: الويب أم الحاسوب أم الهاتف", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "مدونة iLovePDF: تنظيم صفحات PDF", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "مدونة iLovePDF: دمج ملفات PDF وJPG", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "مدونة iLovePDF: ضغط PDF إلى حجم محدد", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "مدونة iLovePDF: تعديل البيانات الوصفية لملف PDF أو حذفها",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "مدونة iLovePDF: 15 عامًا على iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
      { label: "عن iLovePDF", url: "https://www.ilovepdf.com/help/about" },
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
    title: "Cachety أم Smallpdf: دمج ملفات PDF وضغطها دون رفعها",
    metaTitle: "بديل Smallpdf لدمج ملفات PDF دون رفعها",
    description:
      "يدمج Smallpdf ملفات PDF ويضغطها في السحابة، بحد يومي للاستخدام المجاني. أما Cachety فيفعل ذلك في متصفحك، مجانًا ودون رفع. مقارنة منصفة.",
    intro:
      "Smallpdf مجموعة معروفة من أدوات PDF على الإنترنت، من سويسرا، وله تطبيقات للهواتف ولنظام Windows. أداتا الدمج والضغط فيه تعملان في السحابة. أما Cachety فيؤدي مهمة أضيق على جهازك: يضع ملفات PDF والصور في ملف واحد، تحت حجم أقصى، دون رفعها.",
    verdict:
      "Smallpdf يفعل أكثر: يقبل ملفات Word وExcel وPowerPoint، ويتعرّف على النص في النسخ الممسوحة ضوئيًا، وله تطبيق على Windows يعمل دون اتصال بالإنترنت. ولهذا كله هو الخيار الأفضل. أما Cachety فهو الخيار الأفضل حين تكون الملفات مستندات شخصية تفضّل ألا ترفعها، أو حين تبلغ الحد اليومي للخطة المجانية، أو حين يحدد نموذج حجمًا أقصى بالميغابايت.",
    table: [
      {
        criterion: "أين تُعالَج الملفات",
        cachety: CACHETY.where,
        other: "في السحابة. تُرفع الملفات إلى خوادم موجودة في الاتحاد الأوروبي. أما تطبيق الحاسوب على Windows فيعالج الملفات دون اتصال بالإنترنت.",
        edge: "cachety",
      },
      {
        criterion: "مدة حفظ الملفات",
        cachety: CACHETY.kept,
        other: "بحسب صفحات المنتج لدى Smallpdf، تُحذف من الخوادم بعد ساعة، ما لم تحفظها في حسابك.",
        edge: "cachety",
      },
      {
        criterion: "الحساب والاستخدام المجاني والحدود",
        cachety: CACHETY.free,
        other: "لا حاجة إلى تسجيل. للاستخدام المجاني حد يومي للتنزيلات وحد لحجم الملف، والخطة المدفوعة تزيلهما.",
        edge: "cachety",
      },
      {
        criterion: "ترتيب الصفحات",
        cachety: CACHETY.pages,
        other: "أداة الدمج تستطيع عرض صفحات كل ملف لإعادة ترتيبها أو تدويرها أو حذفها، وصفحة الأسعار لدى Smallpdf تذكر عرض الصفحات هذا ضمن الخطة المدفوعة. وأداة Organize تعيد ترتيب الصفحات وتدوّرها وتحذفها وتضيف صفحات، وتستطيع ضم عدة مستندات.",
      },
      {
        criterion: "الالتزام بحجم أقصى",
        cachety: CACHETY.size,
        other: "مستويات ضغط، لا حجم بالميغابايت. الضغط الأساسي مجاني، والمستويات الأقوى جزء من الخطة المدفوعة.",
        edge: "cachety",
      },
      {
        criterion: "أنواع الملفات المقبولة",
        cachety: CACHETY.inputs,
        other: "في أداة الدمج: PDF وWord وExcel وPowerPoint وJPG وPNG، وتُحوَّل الملفات الأخرى إلى PDF أولًا. وصور HEIC في أداة JPG to PDF.",
        edge: "other",
      },
      {
        criterion: "كيف يكون ملف PDF الجديد",
        cachety: CACHETY.output,
        other: "غير موصوف في صفحة الدمج. والتعرّف على النص (OCR) متاح كأداة منفصلة.",
      },
      {
        criterion: "البيانات المخفية",
        cachety: CACHETY.hidden,
        other: "غير موصوف لأداة الدمج. ومدونة Smallpdf تقول إن أداتَي Compress وFlatten فيه تحذفان البيانات الوصفية، في خطوة منفصلة.",
      },
      {
        criterion: "التطبيقات والعمل دون اتصال بالإنترنت",
        cachety: CACHETY.offline,
        other: "تطبيقات لنظامي iOS وAndroid، وتطبيق للحاسوب على Windows يعمل دون اتصال بالإنترنت. أما تطبيق الحاسوب على Mac فلم يعد مدعومًا.",
      },
    ],
    body: [
      { type: "h2", text: "صندوق أدوات في السحابة، وأداة تبقى على جهازك" },
      {
        type: "p",
        text: "يصف Smallpdf أداتَي الدمج والضغط بأنهما تعملان في السحابة: تُرفع ملفاتك، وتُعالَج على خوادمه، وتُحذف بعد ساعة ما لم تحفظها في حسابك. يقول Smallpdf إنه حاصل على شهادة ISO/IEC 27001 وإنه يستخدم تشفير TLS أثناء نقل الملفات. وأدواته متاحة بـ 24 لغة.",
      },
      {
        type: "p",
        text: "لـ Cachety مهمة واحدة هنا: أن يحوّل ملفات PDF والصور التي طُلبت منك إلى ملف واحد نظيف بالحجم المناسب. كل شيء يتم في متصفحك. لا رفع، فلا يوجد ما يُحذف بعد ذلك.",
      },
      { type: "h2", text: "أين يتفوق Smallpdf" },
      {
        type: "list",
        items: [
          "يحوّل ملفات Word وExcel وPowerPoint إلى PDF ويدمجها دفعة واحدة.",
          "يقدّم التعرّف على النص (OCR)، فيمكن أن تصبح النسخة الممسوحة ضوئيًا قابلة للبحث.",
          "له تطبيقات للهاتف فيها ماسح ضوئي، وتطبيق على Windows يعالج الملفات دون اتصال بالإنترنت.",
          "الحساب يتيح لك حفظ مستنداتك على الإنترنت والعثور عليها من جهاز آخر.",
        ],
      },
      { type: "h2", text: "أين يتفوق Cachety" },
      {
        type: "list",
        items: [
          "ملفاتك لا تُرفع أبدًا، على الهاتف كما على الحاسوب، ودون تثبيت أي شيء.",
          "لا حد يومي ولا خطة مدفوعة.",
          "تختار حجمًا بالميغابايت، كما تحدده النماذج الإلكترونية، ويخبرك قبل التنزيل إذا تعذّر بلوغه مع بقاء الملف مقروءًا.",
          "تُحذف البيانات المخفية من كل ملف، دون خطوة منفصلة.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "تحتاج إلى إضافة ملفات Word أو Excel أو PowerPoint إلى ملف PDF المدمج.",
      "تحتاج إلى التعرّف على نص نسخة ممسوحة ضوئيًا (OCR).",
      "تستخدم Windows وتريد تطبيقًا مثبّتًا يعمل دون اتصال بالإنترنت.",
      "تريد حفظ مستنداتك في حساب على الإنترنت.",
    ],
    chooseCachety: [
      "الملفات وثائق هوية أو كشوف رواتب أو كشوف حساب، وتفضّل ألا ترفعها.",
      "يطلب نموذج ملفًا واحدًا، أو ملفًا لكل نوع من المستندات، بحجم أقصى محدد بالميغابايت.",
      "أنت على الهاتف ولا تريد تثبيت تطبيق ولا إنشاء حساب.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "مع أدوات Smallpdf على الإنترنت، نعم: تُرفع الملفات إلى خوادمه، وبحسب صفحات المنتج لديه، تُحذف بعد ساعة ما لم تحفظها في حسابك. أما تطبيقه للحاسوب على Windows فيعالج الملفات دون اتصال بالإنترنت."
      ),
      {
        q: "هل يستطيع Smallpdf ضغط ملف PDF إلى حجم محدد بالضبط؟",
        a: "لا. يقدّم Smallpdf مستويات ضغط، ومدونته نفسها تقول إن الأداة لا تتيح إدخال حجم محدد بالضبط. أما مع Cachety فتختار حجمًا أقصى بالميغابايت، ويبقى الملف تحته متى أمكن ذلك مع بقائه مقروءًا.",
      },
      {
        q: "هل Smallpdf مجاني؟",
        a: "جزئيًا. الدمج والضغط الأساسي مجانيان مع حد يومي للتنزيلات، أما الضغط الأقوى والاستخدام غير المحدود فجزء من الخطة المدفوعة. أما Cachety فمجاني، دون حد يومي ودون خطة مدفوعة.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: دمج PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: ضغط PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: تنظيم PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: تحويل JPG إلى PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: الأسعار ومقارنة الخطط", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: إشعار الخصوصية", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: مركز الثقة", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: التطبيقات والإضافات", url: "https://smallpdf.com/download" },
      { label: "مدونة Smallpdf: ضغط PDF إلى حجم تختاره", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "مدونة Smallpdf: حذف البيانات الوصفية من PDF", url: "https://smallpdf.com/blog/ways-to-remove-pdf-metadata" },
      { label: "عن Smallpdf", url: "https://smallpdf.com/about" },
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
    title: "Cachety أم Adobe Acrobat عبر الإنترنت: دمج ملفات PDF وضغطها",
    metaTitle: "بديل Adobe Acrobat لدمج ملفات PDF دون رفعها",
    description:
      "أدوات Adobe المجانية عبر الإنترنت تدمج ملفات PDF وتضغطها على خوادم Adobe. أما Cachety فيفعل ذلك في متصفحك، دون رفع ودون تسجيل دخول. مقارنة منصفة.",
    intro:
      "Adobe هي التي ابتكرت صيغة PDF، وأدوات Acrobat المجانية عبر الإنترنت تدمج ملفات PDF وتضغطها في أي متصفح. وتُعالَج الملفات على خوادم Adobe. أما Cachety فيؤدي مهمة أضيق على جهازك: يضع ملفات PDF والصور في ملف واحد، تحت حجم أقصى، دون رفعها.",
    verdict:
      "لملفات PDF التي يجب أن يبقى نصها كما هو، دمج Adobe هو الخيار الأفضل: يضم الملفات دون تقليل جودة الصور أو النص أو التنسيق، ويقبل حتى 100 ملف. وتطبيقه المدفوع للحاسوب يفعل أكثر بكثير من Cachety. أما Cachety فهو الخيار الأفضل للمستندات الشخصية التي تفضّل ألا ترفعها، وللجمع بين الصور وملفات PDF في خطوة واحدة، وللالتزام بحجم أقصى محدد بالميغابايت.",
    table: [
      {
        criterion: "أين تُعالَج الملفات",
        cachety: CACHETY.where,
        other: "على خوادم Adobe عند استخدام الأدوات عبر الإنترنت. أما تطبيق Acrobat للحاسوب فيضغط الملفات محليًا على جهازك.",
        edge: "cachety",
      },
      {
        criterion: "مدة حفظ الملفات",
        cachety: CACHETY.kept,
        other: "تُحذف من خوادم Adobe ما لم تسجّل الدخول لحفظها في حسابك. ويمكنك حذف الملف بنفسك بعد تنزيله.",
        edge: "cachety",
      },
      {
        criterion: "الحساب والاستخدام المجاني والحدود",
        cachety: CACHETY.free,
        other: "الدمج: حتى 100 ملف من 500 صفحة لكل منها، و1,500 صفحة في الملف المدمج، دون علامة مائية. الضغط: مجاني باستخدام محدود، والاستخدام غير المحدود يحتاج إلى خطة مدفوعة.",
      },
      {
        criterion: "ترتيب الصفحات",
        cachety: CACHETY.pages,
        other: "يمكن إعادة ترتيب الملفات قبل الدمج. أما إعادة تنظيم الصفحات المفردة فتتطلب تسجيل الدخول، ويكفي لذلك حساب مجاني.",
        edge: "cachety",
      },
      {
        criterion: "الالتزام بحجم أقصى",
        cachety: CACHETY.size,
        other: "ثلاثة مستويات للضغط: عالٍ ومتوسط ومنخفض. ملفات حتى 2 GB.",
      },
      {
        criterion: "الصور وأنواع الملفات الأخرى",
        cachety: CACHETY.inputs,
        other: "الدمج المجاني يقبل ملفات PDF. أما ضم ملفات PDF إلى ملفات Word أو Excel أو PowerPoint أو الصور فجزء من Acrobat Pro. وهناك أدوات مجانية منفصلة تحوّل الصور، ومنها صور HEIC، إلى PDF، لعدد محدود من التحويلات.",
      },
      {
        criterion: "كيف يكون ملف PDF الجديد",
        cachety: CACHETY.output,
        other: "تُضم الملفات دون ضغط ودون تقليل جودة الصور أو النص أو التنسيق.",
        edge: "other",
      },
      {
        criterion: "البيانات المخفية",
        cachety: CACHETY.hidden,
        other: "إزالة المعلومات المخفية («sanitize») وحجب المحتوى من ميزات Acrobat Pro المدفوع.",
        edge: "cachety",
      },
      {
        criterion: "التطبيقات والعمل دون اتصال بالإنترنت",
        cachety: CACHETY.offline,
        other: "تطبيق Acrobat Reader المجاني يعرض الملفات ويتيح التعليق عليها وتعبئتها وتوقيعها. أما التعديل والتحويل والضغط ففي تطبيق الحاسوب المدفوع. وتطبيق Adobe Scan للهاتف يخزّن النسخ الممسوحة ضوئيًا في التخزين السحابي لدى Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "المرجع في ملفات PDF، وأداة صغيرة لمهمة واحدة" },
      {
        type: "p",
        text: "تقدّم Adobe أكثر من 25 أداة مجانية عبر الإنترنت. أداة Merge PDFs تقبل حتى 100 ملف وتضمها دون تغيير جودتها. وأداة Compress PDF تقدّم ثلاثة مستويات. وكلتاهما ترسل ملفاتك إلى خوادم Adobe، حيث تُحذف ما لم تسجّل الدخول لحفظها. تقول Adobe إن الملفات مشفّرة أثناء النقل وأثناء التخزين، وتذكر ISO 27001 وSOC 2 ضمن شهاداتها لخدمة Acrobat على الويب.",
      },
      {
        type: "p",
        text: "أما Cachety فيجهّز ملفًا للإرسال فقط: ملفات PDF والصور التي طُلبت منك، مرتبةً، في ملف PDF واحد بالحجم المناسب. كل شيء يتم في متصفحك، دون تسجيل دخول في أي خطوة.",
      },
      { type: "h2", text: "أين يتفوق Adobe Acrobat" },
      {
        type: "list",
        items: [
          "ملف PDF المدمج يحتفظ بجودة النص والصور والتنسيق الأصلية.",
          "يقبل المهام الكبيرة: حتى 100 ملف في الدمج، وملفات حتى 2 GB في أداة الضغط.",
          "تطبيق الحاسوب المدفوع يعدّل النص والصور، ويحوّل الملفات، ويضغطها، ويحجب المحتوى.",
          "إذا كنت تدفع اشتراك Acrobat أصلًا، فكل شيء في مكان واحد، وملفاتك في حسابك لدى Adobe.",
        ],
      },
      { type: "h2", text: "أين يتفوق Cachety" },
      {
        type: "list",
        items: [
          "ملفاتك لا تُرفع أبدًا، ولا تسجيل دخول في أي مرحلة.",
          "نقل الصفحات المفردة وتدويرها وحذفها مجاني ولا يحتاج إلى حساب.",
          "الصور وملفات PDF تدخل الملف نفسه في خطوة واحدة. أما مع أدوات Adobe المجانية فتحوّل الصور إلى PDF أولًا، ثم تدمج.",
          "تُحذف البيانات المخفية من كل ملف، وهي ميزة تخصّصها Adobe لخطتها المدفوعة Pro.",
          "تختار حجمًا بالميغابايت، ويخبرك قبل التنزيل هل يمكن بلوغه.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "يجب أن يبقى نص ملف PDF المدمج قابلًا للتحديد والبحث.",
      "لديك عشرات الملفات أو ملفات PDF كبيرة جدًا تريد ضمها.",
      "تدفع اشتراك Acrobat أصلًا، أو تحتاج أيضًا إلى التعديل أو التحويل أو التعرّف على النص.",
    ],
    chooseCachety: [
      "الملفات وثائق هوية أو كشوف رواتب أو كشوف حساب، وتفضّل ألا ترفعها.",
      "تريد إعادة ترتيب الصفحات أو تدويرها أو حذفها دون تسجيل الدخول.",
      "تحتاج إلى الجمع بين الصور وملفات PDF، وإبقاء النتيجة تحت حجم أقصى محدد بالميغابايت.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "مع أدوات Adobe عبر الإنترنت، نعم: تُعالَج الملفات على خوادم Adobe وتُحذف ما لم تسجّل الدخول لحفظها. أما تطبيق Acrobat للحاسوب فيعمل على جهازك."
      ),
      {
        q: "هل أحتاج إلى حساب Adobe لدمج ملفات PDF؟",
        a: "ليس للدمج والتنزيل. تطلب Adobe تسجيل الدخول لإعادة تنظيم الصفحات المفردة أو لمشاركة الملف برابط. أما Cachety فلا حساب فيه إطلاقًا.",
      },
      {
        q: "هل يستطيع Acrobat عبر الإنترنت حذف البيانات الوصفية من ملف PDF؟",
        a: "إزالة المعلومات المخفية ميزة من ميزات Acrobat Pro المدفوع. أما Cachety فيحذف البيانات المخفية من كل ملف ينشئه، بإعادة بناء الصفحات كصور.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: الأدوات المجانية عبر الإنترنت", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: دمج ملفات PDF", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: ضغط PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: تحويل JPG إلى PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: تحويل الصور إلى PDF", url: "https://www.adobe.com/acrobat/online/image-to-pdf.html" },
      { label: "Adobe Acrobat: تحويل HEIC إلى PDF", url: "https://acrobat.adobe.com/heic-to-pdf" },
      { label: "Adobe Acrobat: إعادة ترتيب صفحات PDF", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: حذف صفحات PDF", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: مقارنة الخطط", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: نظرة عامة على الأمان",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: قائمة شهادات الامتثال", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
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
    title: "Cachety أم PDF24: دمج ملفات PDF وضغطها دون رفعها",
    metaTitle: "بديل PDF24 لدمج ملفات PDF دون رفعها",
    description:
      "أدوات PDF24 عبر الإنترنت تدمج ملفات PDF وتضغطها على خوادمه، وتطبيقه على Windows يعمل دون اتصال. أما Cachety فيعمل في أي متصفح، دون رفع. مقارنة.",
    intro:
      "PDF24 مجموعة ألمانية مجانية من أدوات PDF. أدواته عبر الإنترنت تعالج الملفات على خوادم PDF24، وبرنامجه على Windows، واسمه PDF24 Creator، يؤدي العمل نفسه على حاسوبك. أما Cachety فيعمل في متصفح أي جهاز ولا يرفع ملفاتك أبدًا، لكنه يؤدي مهمة أضيق.",
    verdict:
      "على حاسوب يعمل بنظام Windows، يصعب التفوق على PDF24 Creator: مجاني، ويعمل دون اتصال بالإنترنت، ويضم الصفحات الأصلية، فيبقى النص كما كان. أما على الهاتف أو على Mac أو على حاسوب لا تستطيع تثبيت شيء عليه، فاستخدام PDF24 يعني أدواته عبر الإنترنت، وهي ترفع ملفاتك. وهنا يكون Cachety الخيار الأفضل للمستندات الشخصية، وهو يتيح لك اختيار حجم بالميغابايت.",
    table: [
      {
        criterion: "أين تُعالَج الملفات",
        cachety: CACHETY.where,
        other: "الأدوات عبر الإنترنت: في السحابة، على خوادم PDF24. وبرنامج PDF24 Creator (على Windows): على حاسوبك، دون رفع.",
      },
      {
        criterion: "مدة حفظ الملفات",
        cachety: CACHETY.kept,
        other: "عبر الإنترنت: تُحذف تلقائيًا بعد ساعة. ويمكن أيضًا حذفها يدويًا فورًا.",
        edge: "cachety",
      },
      {
        criterion: "الحساب والاستخدام المجاني والحدود",
        cachety: CACHETY.free,
        other: "مجاني ودون قيود، ودون تسجيل. عبر الإنترنت، يمكن أن يصل حجم الملف إلى 1,000 MB وحجم المهمة إلى 10 GB.",
      },
      {
        criterion: "ترتيب الصفحات",
        cachety: CACHETY.pages,
        other: "يُعاد ترتيب الملفات بالسحب والإفلات. ويعرض وضع الصفحات صفحات كل الملفات: تختار ما تريده منها وتسحبه لترتيبه، وتترك الباقي. أما تدوير الصفحات فأداة منفصلة.",
      },
      {
        criterion: "الالتزام بحجم أقصى",
        cachety: CACHETY.size,
        other: "تحدد الدقة (DPI) وجودة الصور، مع خيار للتدرج الرمادي. لا يوجد خيار «اضغط إلى 5 MB».",
        edge: "cachety",
      },
      {
        criterion: "أنواع الملفات المقبولة",
        cachety: CACHETY.inputs,
        other: "ملفات PDF وصور ومستندات Word وملفات أخرى. صور iPhone بصيغة HEIC غير مدعومة في أداة الدمج.",
      },
      {
        criterion: "كيف يكون ملف PDF الجديد",
        cachety: CACHETY.output,
        other: "تُؤخذ الصفحات كما هي ولا يُعاد إنشاؤها: يحتفظ النص والصور والخطوط بجودتها.",
        edge: "other",
      },
      {
        criterion: "البيانات المخفية",
        cachety: CACHETY.hidden,
        other: "أداة منفصلة تحذف البيانات الوصفية من ملف PDF. وأداة Compress PDF تستطيع أيضًا إزالة البيانات الوصفية والمرفقات والتعليقات التوضيحية.",
      },
      {
        criterion: "خيارات الدمج",
        cachety: MERGE_OPTIONS,
        other: "إشارات مرجعية، وجدول محتويات، وصفحة غلاف قبل كل ملف، وصفحات فارغة للطباعة على الوجهين، واسم الملف على الصفحات.",
        edge: "other",
      },
      {
        criterion: "التطبيقات والعمل دون اتصال بالإنترنت",
        cachety: CACHETY.offline,
        other: "يوفّر PDF24 Creator كل الأدوات دون اتصال بالإنترنت، على Windows فقط. لا توجد بعدُ نسخة لنظام Mac أو Linux، ولا تطبيق في متاجر تطبيقات الهواتف: يمكن إضافة الأدوات عبر الإنترنت إلى الشاشة الرئيسية للهاتف، لكنها تبقى بحاجة إلى اتصال.",
      },
      {
        criterion: "الإعلانات وأدوات التتبع",
        cachety: CACHETY.ads,
        other: "الأدوات عبر الإنترنت مموَّلة بالإعلانات. وسياسة الخصوصية تذكر Google AdSense وGoogle Analytics، من بين جهات أخرى.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "طريقتان لاستخدام PDF24" },
      {
        type: "p",
        text: "أدوات PDF24 عبر الإنترنت مجانية، ولا تحتاج إلى تسجيل، وتموّلها الإعلانات. وهي تعالج ملفاتك على خوادم PDF24: النقل مشفّر، والملفات تُحذف بعد ساعة. وتدير PDF24 شركة مقرها برلين.",
      },
      {
        type: "p",
        text: "أما PDF24 Creator فمختلف. هو برنامج مجاني على Windows يضع كل أدوات PDF24 على حاسوبك، حيث تبقى الملفات محلية ولا تُرفع. إذا كنت تستخدم Windows وتستطيع تثبيت البرامج، فهو يعطيك خصوصية Cachety وميزات أكثر.",
      },
      { type: "h2", text: "أين يتفوق PDF24" },
      {
        type: "list",
        items: [
          "ملف PDF المدمج يحتفظ بالصفحات الأصلية كما هي: يحتفظ النص والصور والخطوط بجودتها.",
          "خيارات دمج ليست في Cachety: إشارات مرجعية، وجدول محتويات، وصفحات غلاف، وصفحات فارغة للطباعة على الوجهين.",
          "يقبل مستندات Word وملفات أخرى، ويقدّم التعرّف على النص (OCR).",
          "على Windows، يفعل PDF24 Creator ذلك كله دون اتصال بالإنترنت، مجانًا.",
          "يمكنك أن تحدد بنفسك دقة الضغط وجودة الصور فيه.",
        ],
      },
      { type: "h2", text: "أين يتفوق Cachety" },
      {
        type: "list",
        items: [
          "لا رفع على أي جهاز: هاتف، أو Mac، أو حاسوب بنظام Linux، أو حاسوب لا تستطيع تثبيت البرامج عليه.",
          "تختار حجمًا بالميغابايت بدل أن تجرّب الإعدادات حتى يصغر الملف بما يكفي.",
          "صور iPhone بصيغة HEIC مقبولة كما هي.",
          "تُحذف البيانات المخفية من كل ملف دون خطوة منفصلة.",
          "لا إعلانات ولا أدوات تتبع.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "تستخدم Windows وتستطيع تثبيت PDF24 Creator: يعمل دون اتصال بالإنترنت ويحتفظ بالصفحات الأصلية.",
      "يجب أن يبقى نص ملف PDF المدمج قابلًا للتحديد والبحث.",
      "تحتاج إلى إضافة مستندات Word أو إلى التعرّف على نص نسخة ممسوحة ضوئيًا.",
      "تريد أن تحدد الدقة وجودة الصور بنفسك.",
    ],
    chooseCachety: [
      "أنت على هاتف أو Mac أو حاسوب لا تستطيع تثبيت البرامج عليه، وتفضّل ألا ترفع مستنداتك.",
      "يطلب نموذج ملفًا واحدًا، أو ملفًا لكل نوع من المستندات، بحجم أقصى محدد بالميغابايت.",
      "صورك ملتقطة بهاتف iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "مع أدوات PDF24 عبر الإنترنت، نعم: تُعالَج الملفات على خوادمه وتُحذف بعد ساعة. ومع PDF24 Creator على Windows، لا: تبقى الملفات على حاسوبك."
      ),
      {
        q: "هل يستطيع PDF24 ضغط ملف PDF إلى حجم معيّن؟",
        a: "ليس مباشرة. تحدد الدقة وجودة الصور، ودليل PDF24 نفسه يقول إنه لا يوجد خيار «اضغط إلى 5 MB». أما مع Cachety فتختار حجمًا أقصى بالميغابايت، ويبقى الملف تحته متى أمكن ذلك مع بقائه مقروءًا.",
      },
      {
        q: "هل يعمل PDF24 دون اتصال بالإنترنت على Mac أو على الهاتف؟",
        a: "لا. برنامج PDF24 Creator لنظام Windows فقط. وعلى Mac أو الهاتف، يقدّم PDF24 أدواته عبر الإنترنت، وهي تعالج الملفات على خوادمه. أما Cachety فيعمل في متصفح أي جهاز دون رفع.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: دمج PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: ضغط PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: تحويل الصور إلى PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: حذف البيانات الوصفية من PDF", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: تدوير PDF", url: "https://tools.pdf24.org/en/rotate-pdf" },
      { label: "PDF24 Tools: أسئلة وأجوبة", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "مساعدة PDF24: دمج ملفات PDF", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "مساعدة PDF24: ضغط ملف PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "مساعدة PDF24: Mac وLinux والهواتف", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: سياسة الخصوصية", url: "https://www.pdf24.org/en/privacy-policy" },
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
    title: "Cachety أم Sejda: دمج ملفات PDF وضغطها دون رفعها",
    metaTitle: "بديل Sejda لدمج ملفات PDF دون رفعها",
    description:
      "يدمج Sejda ملفات PDF ويضغطها عبر الإنترنت، أو على حاسوبك بتطبيقه للحاسوب، ضمن حدود مجانية. أما Cachety فيعمل في متصفحك دون رفع.",
    intro:
      "Sejda صندوق أدوات PDF هولندي له وجهان: أدوات عبر الإنترنت تعالج الملفات على خوادمه، وتطبيق Sejda Desktop لأنظمة Mac وWindows وLinux، وهو يعالجها على حاسوبك. ولكليهما حدود مجانية. أما Cachety فيعمل في متصفح أي جهاز، ولا يرفع شيئًا، وليس له حد في الساعة ولا في اليوم، لكنه يؤدي مهمة أضيق.",
    verdict:
      "دمج Sejda أغنى: يحتفظ بالإشارات المرجعية، وينشئ جدول محتويات، ويستطيع طباعة اسم الملف في أسفل الصفحات. وتطبيق Sejda Desktop يُبقي الملفات على حاسوبك. اختره حين تحتاج إلى هذه الخيارات. واختر Cachety للمستندات الشخصية على الهاتف أو حين لا تريد تثبيت شيء، وللملفات التي تتجاوز حدود Sejda المجانية، ولحجم أقصى محدد بالميغابايت.",
    table: [
      {
        criterion: "أين تُعالَج الملفات",
        cachety: CACHETY.where,
        other: "عبر الإنترنت: تُرفع وتُعالَج على خوادم Sejda. ومع Sejda Desktop: على حاسوبك، دون رفع.",
      },
      {
        criterion: "مدة حفظ الملفات",
        cachety: CACHETY.kept,
        other: "عبر الإنترنت: تُحذف تلقائيًا بعد ساعتين. وفي صفحة النتيجة زر «Delete files» لحذف الملفات.",
        edge: "cachety",
      },
      {
        criterion: "الحساب والاستخدام المجاني والحدود",
        cachety: CACHETY.free,
        other: "دون تسجيل. الدمج المجاني عبر الإنترنت: حتى 50 صفحة أو 50 MB، و3 مهام في الساعة. الضغط المجاني: حتى 200 صفحة أو 100 MB. تطبيق الحاسوب المجاني: 3 مهام في اليوم، لمستندات حتى 50 MB و200 صفحة. والخطة المدفوعة تزيل حدود الصفحات وحد المهام في الساعة، ويصل الرفع معها إلى 500 MB لكل ملف.",
        edge: "cachety",
      },
      {
        criterion: "ترتيب الصفحات",
        cachety: CACHETY.pages,
        other: "يُعاد ترتيب الملفات بالسحب والإفلات. وعرض الصفحات يتيح حذف الصفحات وإعادة ترتيبها وتكرارها قبل الدمج.",
      },
      {
        criterion: "الالتزام بحجم أقصى",
        cachety: CACHETY.size,
        other: "إعدادات لجودة الصور ودقتها، مع خيار للتدرج الرمادي. لا يوجد حجم بالميغابايت تستهدفه.",
        edge: "cachety",
      },
      {
        criterion: "أنواع الملفات المقبولة",
        cachety: CACHETY.inputs,
        other: "ملفات PDF وصور مثل JPG وPNG في أداة الدمج. صور HEIC غير مدعومة.",
      },
      {
        criterion: "خيارات الدمج",
        cachety: MERGE_OPTIONS,
        other: "إشارات مرجعية تُحفظ أو تُنشأ لكل ملف، وجدول محتويات، وصفحات فارغة للطباعة على الوجهين، واسم الملف في تذييل الصفحة.",
        edge: "other",
      },
      {
        criterion: "البيانات المخفية",
        cachety: CACHETY.hidden,
        other: "أداة منفصلة تعدّل البيانات الوصفية لملف PDF أو تحذفها كلها.",
      },
      {
        criterion: "التطبيقات والعمل دون اتصال بالإنترنت",
        cachety: CACHETY.offline,
        other: "يعمل Sejda Desktop على Mac وWindows وLinux دون اتصال بالإنترنت، بالميزات نفسها الموجودة في الخدمة عبر الإنترنت.",
      },
    ],
    body: [
      { type: "h2", text: "عبر الإنترنت أو على حاسوبك: Sejda يقدّم الاثنين" },
      {
        type: "p",
        text: "على موقع Sejda، ترفع مستنداتك وتُعالَج على خوادمه. يقول Sejda إن الملفات مشفّرة أثناء النقل وأثناء التخزين، وإنها تُحذف تلقائيًا بعد ساعتين. والخدمة المجانية محدودة بعدد الصفحات والميغابايت والمهام في الساعة.",
      },
      {
        type: "p",
        text: "أما Sejda Desktop فيعالج الملفات على حاسوبك، دون رفع، على Mac وWindows وLinux. ونسخته المجانية تسمح بثلاث مهام في اليوم، لمستندات حتى 50 MB و200 صفحة، وبدمج ما يصل إلى 30 ملفًا و50 صفحة. وهناك تفصيل مهم للمستندات الشخصية: شروط الخدمة لدى Sejda تنص على أن المستخدمين يجب ألا يرسلوا إلى خدمته عبر الإنترنت معلومات شخصية حساسة، مثل أرقام الهوية الحكومية.",
      },
      { type: "h2", text: "أين يتفوق Sejda" },
      {
        type: "list",
        items: [
          "خيارات دمج ليست في Cachety: إشارات مرجعية، وجدول محتويات، وصفحات فارغة للطباعة على الوجهين.",
          "تطبيق للحاسوب على Mac وWindows وLinux يُبقي الملفات على حاسوبك.",
          "أدوات أخرى كثيرة في المكان نفسه: التعرّف على النص (OCR)، واقتصاص صفحات ملف PDF وتقويمها، والتعديل.",
          "يستطيع أخذ الملفات مباشرة من Dropbox أو Google Drive أو OneDrive.",
          "تحكّم دقيق في الضغط، بإعدادات لجودة الصور ودقتها.",
        ],
      },
      { type: "h2", text: "أين يتفوق Cachety" },
      {
        type: "list",
        items: [
          "لا يُرفع شيء ولا يُثبَّت شيء، على الهاتف كما على الحاسوب.",
          "لا حد عند 50 صفحة، ولا سقف لعدد المهام في الساعة أو في اليوم: ملف من 60 صفحة أو ملف رابع في الساعة نفسها ليس مشكلة.",
          "تختار حجمًا بالميغابايت، ويخبرك قبل التنزيل هل يمكن بلوغه.",
          "صور iPhone بصيغة HEIC مقبولة كما هي، وتُحذف البيانات المخفية من كل ملف.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "تحتاج إلى إشارات مرجعية أو جدول محتويات في ملف PDF المدمج.",
      "تستطيع تثبيت Sejda Desktop ومهمتك ضمن حدوده المجانية، أو لديك خطة مدفوعة.",
      "تحتاج إلى التعرّف على النص، أو إلى اقتصاص صفحات ملف PDF ممسوح ضوئيًا أو تقويمها: Cachety لا يفعل ذلك إلا للصور.",
    ],
    chooseCachety: [
      "الملفات وثائق هوية أو كشوف رواتب أو كشوف حساب، وأنت على الهاتف أو لا تستطيع تثبيت البرامج.",
      "ملفك يزيد على 50 صفحة، أو لديك عدة ملفات تريد تجهيزها في الساعة نفسها.",
      "يطلب نموذج ملفًا واحدًا، أو ملفًا لكل نوع من المستندات، بحجم أقصى محدد بالميغابايت.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "مع أدوات Sejda عبر الإنترنت، نعم: تُرفع الملفات إلى خوادمه وتُحذف بعد ساعتين. ومع Sejda Desktop، لا: تُعالَج الملفات على حاسوبك."
      ),
      {
        q: "ما حدود Sejda المجانية للدمج؟",
        a: "عبر الإنترنت، مستندات حتى 50 صفحة أو 50 MB وثلاث مهام في الساعة. والنسخة المجانية من Sejda Desktop تسمح بثلاث مهام في اليوم، لمستندات حتى 50 MB و200 صفحة. أما Cachety فليست له حدود كهذه: حتى 1,000 صفحة في ملف واحد.",
      },
      {
        q: "هل يستطيع Sejda ضغط ملف PDF إلى حجم معيّن؟",
        a: "أداة الضغط فيه تقدّم إعدادات لجودة الصور ودقتها، لا حجمًا تستهدفه. أما مع Cachety فتختار حجمًا أقصى بالميغابايت، ويبقى الملف تحته متى أمكن ذلك مع بقائه مقروءًا.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: دمج PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: ضغط PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: تحويل JPG إلى PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: تنظيم صفحات PDF", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: تعديل البيانات الوصفية لملف PDF", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: الخطط والأسئلة", url: "https://www.sejda.com/upgrade" },
      { label: "Sejda: صفحة النتيجة", url: "https://www.sejda.com/result" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "الأمان في Sejda", url: "https://www.sejda.com/security" },
      { label: "Sejda: سياسة الخصوصية", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: شروط الخدمة", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
