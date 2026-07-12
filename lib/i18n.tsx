"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isLang, SITE_META, type Lang } from "@/lib/site-meta";

export type { Lang };

export type ErrorKey =
  | "unsupported"
  | "pdf_unreadable"
  | "pdf_password"
  | "pdf_password_wrong"
  | "pdf_empty"
  | "image_unreadable"
  | "canvas_unavailable"
  | "export_failed";

const plural = (n: number, s: string) => `${n} ${s}${n > 1 ? "s" : ""}`;

export const STRINGS = {
  fr: {
    langMenu: "Choisir la langue",
    taglinePre: "Ajoutez un filigrane à vos documents sensibles, ",
    taglineStrong: "sans qu'ils ne quittent jamais votre appareil.",
    badge: "Traitement 100 % local, zéro envoi.",
    sourceLong: "code source vérifiable",
    step1: "Vos documents",
    step2: "Texte du filigrane",
    step3: "Vérifiez, puis téléchargez",
    dropTitle: "Déposez vos PDF ou images ici",
    dropHint: "ou cliquez pour parcourir. Vous pouvez aussi coller (Ctrl+V).",
    dropAdd: "Ajouter d'autres documents (dépôt, clic ou Ctrl+V)",
    inputAria: "Ajouter des documents à filigraner (PDF ou images)",
    rejected: (names: string) =>
      `Format non pris en charge : ${names}. Seuls les PDF et les images (JPG, PNG…) sont acceptés.`,
    remove: (name: string) => `Retirer ${name}`,
    pages: (n: number) => plural(n, "page"),
    status: { pending: "en attente", processing: "en cours", ready: "prêt", error: "erreur" },
    unlock: {
      locked: "protégé",
      placeholder: "Mot de passe du PDF",
      button: "Déverrouiller",
      aria: (name: string) => `Mot de passe pour ${name}`,
      hint: "Saisissez son mot de passe dans la liste de vos documents.",
      show: "Afficher le mot de passe",
      hide: "Masquer le mot de passe",
    },
    pageOf: (a: number, b: number) => `page ${a} / ${b}`,
    textareaAria: "Texte du filigrane à apposer sur vos documents",
    // Modèle Cybermalveillance/ANSSI : motif + destinataire + date.
    placeholder: "Ex. : Copie pour mon dossier de location, agence Martin, le 12/07/2026",
    presets: [
      "Copie exclusivement destinée à mon dossier de location. Toute autre utilisation est interdite",
      "Copie fournie uniquement à ma banque. Reproduction et réutilisation interdites",
      "Copie remise pour vérification d'identité. Toute autre utilisation est interdite",
    ],
    addDate: "Ajouter la date du jour",
    onDate: (base: string, date: string) => `${base}, le ${date}`,
    tip: "Conseil : indiquez le destinataire et la date. Un filigrane précis est inutilisable ailleurs.",
    downloadAll: (n: number) => `Tout télécharger (${plural(n, "document")})`,
    zipName: "documents-filigranes",
    autoApply: "Aperçu auto",
    apply: "Appliquer le filigrane",
    applyHint: "Cliquez sur « Appliquer » pour générer l'aperçu.",
    batch: {
      progress: (done: number, total: number) => `${done} / ${total} traités`,
      all: "Tout",
      attention: "À traiter",
      ready: "Prêts",
      searchPlaceholder: "Rechercher un nom…",
      searchAria: "Rechercher un document par son nom",
      matches: (n: number) =>
        n === 0 ? "Aucun document ne correspond." : `${n} document${n > 1 ? "s" : ""} affiché${n > 1 ? "s" : ""}.`,
    },
    staleResults:
      "Le texte a changé : les documents prêts portent encore l'ancien filigrane. Cliquez sur « Appliquer le filigrane ».",
    dropAnywhere: "Déposez vos documents n'importe où",
    clearAll: "Tout effacer",
    emptyStart: "Déposez un document pour commencer.",
    emptyText: "Saisissez un texte de filigrane pour lancer le traitement.",
    processingGeneric: "Traitement en cours…",
    processingDoc: (name: string, p?: [number, number]) =>
      `${name} : filigrane en cours…${p ? ` page ${p[0]} / ${p[1]}` : ""}`,
    docError: (name: string, msg: string) => `${name} : ${msg}`,
    srProcessing: "Filigrane en cours.",
    srReady: (n: number) => `${plural(n, "document")} prêt${n > 1 ? "s" : ""} au téléchargement.`,
    previewAlt: (name: string, p: number) => `${name}, aperçu de la page ${p} filigranée`,
    zoomOpen: (p: number) => `Agrandir l'aperçu de la page ${p}`,
    zoomLabel: (p: number) => `Aperçu agrandi de la page ${p}`,
    zoomAlt: (name: string, p: number) => `${name}, page ${p} agrandie`,
    zoomClose: "Fermer l'aperçu",
    pagerNav: "Navigation entre les pages",
    pagerPrev: "Page précédente",
    pagerNext: "Page suivante",
    previewLimit: (shown: number, total: number) =>
      `Aperçu limité aux ${shown} premières pages. Le fichier téléchargé contient les ${total} pages.`,
    suffix: "filigrane",
    sizeUnit: "Mo",
    locale: "fr-FR",
    footerMade: "Par",
    footerInspired: ", inspiré de",
    footerLicense: ". Licence AGPL.",
    share: "Partager",
    shareCopied: "Lien copié !",
    shareLang: (name: string) => `Copier le lien en ${name}`,
    browserTooOld:
      "Votre navigateur est trop ancien pour cet outil. Mettez-le à jour pour continuer.",
    about: {
      nav: "Pourquoi filigraner ?",
      navTool: "L'outil",
      title: "Pourquoi filigraner vos documents ?",
      lead: "Location, embauche, ouverture de compte : on vous demande sans cesse une copie de vos papiers. Une fois envoyée, cette copie vous échappe. Un filigrane la rattache à un seul usage, pour qu'elle ne puisse servir à rien d'autre.",
      riskTitle: "Le risque d'une copie nue",
      riskBody: "Un simple scan de pièce d'identité suffit à ouvrir un compte, souscrire un crédit ou usurper une identité. Les fuites de données sont quotidiennes, et une copie transférée par e-mail ou stockée sans précaution peut resurgir n'importe où, des années plus tard.",
      whatTitle: "Que faut-il écrire ?",
      whatLead: "Trois éléments suffisent, et c'est ce que recommande Cybermalveillance.gouv.fr.",
      what: [
        { title: "Le motif", body: "« Dossier de location », « ouverture de compte ». Tout autre usage devient visiblement abusif." },
        { title: "Le destinataire", body: "L'agence, la banque, l'employeur. Si la copie fuite, on sait d'où elle vient." },
        { title: "La date", body: "Le jour de l'envoi. Une copie datée ne peut pas resservir des années plus tard." },
      ],
      exampleTitle: "La différence en un coup d'œil",
      exBadLabel: "Copie nue",
      exBadBody: "Réutilisable par n'importe qui, pour n'importe quoi.",
      exGoodLabel: "Copie filigranée",
      exGoodBody: "Liée à un usage précis. Inutilisable ailleurs.",
      specimen: "SPÉCIMEN",
      specimenCard: "Carte d'identité",
      backToTool: "Filigraner un document",
      source: "Cybermalveillance.gouv.fr, dispositif national d'assistance aux victimes de cybermalveillance.",
      exStamp: "DOSSIER DE LOCATION, AGENCE MARTIN, 11/07/2026",
    },
    errors: {
      unsupported: "Format non pris en charge. Choisissez un PDF ou une image (JPG, PNG…).",
      pdf_unreadable: "Ce PDF n'a pas pu être lu. Le fichier semble corrompu.",
      pdf_password: "Ce PDF est protégé par un mot de passe.",
      pdf_password_wrong: "Mot de passe incorrect. Réessayez.",
      pdf_empty: "Ce PDF ne contient aucune page.",
      image_unreadable: "Cette image n'a pas pu être lue. Essayez un JPG ou un PNG.",
      canvas_unavailable: "Votre navigateur ne permet pas le rendu du document.",
      export_failed: "L'export de la page a échoué.",
      generic:
        "Le traitement a échoué. Si cela se reproduit, le document est peut-être trop volumineux pour la mémoire de cet appareil.",
    } as Record<ErrorKey | "generic", string>,
  },
  en: {
    langMenu: "Choose language",
    taglinePre: "Add a watermark to your sensitive documents, ",
    taglineStrong: "without them ever leaving your device.",
    badge: "100% local processing, nothing uploaded.",
    sourceLong: "verifiable source code",
    step1: "Your documents",
    step2: "Watermark text",
    step3: "Review, then download",
    dropTitle: "Drop your PDFs or images here",
    dropHint: "or click to browse. You can also paste (Ctrl+V).",
    dropAdd: "Add more documents (drop, click or Ctrl+V)",
    inputAria: "Add documents to watermark (PDF or images)",
    rejected: (names: string) =>
      `Unsupported format: ${names}. Only PDFs and images (JPG, PNG…) are accepted.`,
    remove: (name: string) => `Remove ${name}`,
    pages: (n: number) => plural(n, "page"),
    status: { pending: "waiting", processing: "processing", ready: "ready", error: "error" },
    unlock: {
      locked: "locked",
      placeholder: "PDF password",
      button: "Unlock",
      aria: (name: string) => `Password for ${name}`,
      hint: "Enter its password in your document list.",
      show: "Show password",
      hide: "Hide password",
    },
    pageOf: (a: number, b: number) => `page ${a} / ${b}`,
    textareaAria: "Watermark text to stamp on your documents",
    placeholder: "e.g. Copy for my rental application, Martin Agency, 12/07/2026",
    presets: [
      "Copy solely for my rental application. Any other use is prohibited",
      "Copy provided to my bank only. Reproduction and reuse prohibited",
      "Copy submitted for identity verification. Any other use is prohibited",
    ],
    addDate: "Add today's date",
    onDate: (base: string, date: string) => `${base}, ${date}`,
    tip: "Tip: include the recipient and the date. A specific watermark can't be reused elsewhere.",
    downloadAll: (n: number) => `Download all (${plural(n, "document")})`,
    zipName: "watermarked-documents",
    autoApply: "Auto preview",
    apply: "Apply watermark",
    applyHint: "Click Apply to generate the preview.",
    batch: {
      progress: (done: number, total: number) => `${done} / ${total} processed`,
      all: "All",
      attention: "Needs you",
      ready: "Ready",
      searchPlaceholder: "Search by name…",
      searchAria: "Search documents by name",
      matches: (n: number) =>
        n === 0 ? "No document matches." : `${n} document${n > 1 ? "s" : ""} shown.`,
    },
    staleResults:
      "The text changed: ready documents still carry the previous watermark. Click Apply watermark.",
    dropAnywhere: "Drop your documents anywhere",
    clearAll: "Clear all",
    emptyStart: "Drop a document to get started.",
    emptyText: "Enter watermark text to start processing.",
    processingGeneric: "Processing…",
    processingDoc: (name: string, p?: [number, number]) =>
      `${name}: watermarking…${p ? ` page ${p[0]} / ${p[1]}` : ""}`,
    docError: (name: string, msg: string) => `${name}: ${msg}`,
    srProcessing: "Watermarking in progress.",
    srReady: (n: number) => `${plural(n, "document")} ready to download.`,
    previewAlt: (name: string, p: number) => `${name}, preview of watermarked page ${p}`,
    zoomOpen: (p: number) => `Enlarge preview of page ${p}`,
    zoomLabel: (p: number) => `Enlarged preview of page ${p}`,
    zoomAlt: (name: string, p: number) => `${name}, page ${p} enlarged`,
    zoomClose: "Close preview",
    pagerNav: "Page navigation",
    pagerPrev: "Previous page",
    pagerNext: "Next page",
    previewLimit: (shown: number, total: number) =>
      `Preview limited to the first ${shown} pages. The downloaded file contains all ${total} pages.`,
    suffix: "watermarked",
    sizeUnit: "MB",
    locale: "en-GB",
    footerMade: "By",
    footerInspired: ", inspired by",
    footerLicense: ". AGPL license.",
    share: "Share",
    shareCopied: "Link copied!",
    shareLang: (name: string) => `Copy the link in ${name}`,
    browserTooOld: "Your browser is too old for this tool. Update it to continue.",
    about: {
      nav: "Why watermark?",
      navTool: "The tool",
      title: "Why watermark your documents?",
      lead: "Renting, hiring, opening an account: you are constantly asked for a copy of your ID. Once sent, that copy is out of your hands. A watermark ties it to a single purpose, so it can't be used for anything else.",
      riskTitle: "The risk of a bare copy",
      riskBody: "A plain scan of an ID is enough to open an account, take out a loan or steal an identity. Data leaks happen daily, and a copy forwarded by email or stored carelessly can resurface anywhere, years later.",
      whatTitle: "What should it say?",
      whatLead: "Three elements are enough, and they are what France's cybersecurity agency recommends.",
      what: [
        { title: "The purpose", body: "“Rental application”, “opening an account”. Any other use becomes visibly improper." },
        { title: "The recipient", body: "The agency, the bank, the employer. If the copy leaks, you know where it came from." },
        { title: "The date", body: "The day you send it. A dated copy cannot resurface usefully years later." },
      ],
      exampleTitle: "The difference at a glance",
      exBadLabel: "Bare copy",
      exBadBody: "Reusable by anyone, for anything.",
      exGoodLabel: "Watermarked copy",
      exGoodBody: "Tied to one purpose. Useless elsewhere.",
      specimen: "SPECIMEN",
      specimenCard: "Identity card",
      backToTool: "Watermark a document",
      source: "Cybermalveillance.gouv.fr, France's national cybercrime victim-support agency.",
      exStamp: "RENTAL APPLICATION, MARTIN AGENCY, 11/07/2026",
    },
    errors: {
      unsupported: "Unsupported format. Choose a PDF or an image (JPG, PNG…).",
      pdf_unreadable: "This PDF could not be read. The file appears to be corrupted.",
      pdf_password: "This PDF is password-protected.",
      pdf_password_wrong: "Incorrect password. Try again.",
      pdf_empty: "This PDF has no pages.",
      image_unreadable: "This image could not be read. Try a JPG or PNG.",
      canvas_unavailable: "Your browser can't render this document.",
      export_failed: "Exporting the page failed.",
      generic:
        "Processing failed. If it happens again, the document may be too large for this device's memory.",
    } as Record<ErrorKey | "generic", string>,
  },
  ja: {
    langMenu: "言語を選択",
    taglinePre: "機密文書に透かしを入れても、",
    taglineStrong: "ファイルが端末の外に出ることは一切ありません。",
    badge: "100% ローカル処理、アップロードなし。",
    sourceLong: "検証可能なソースコード",
    step1: "ドキュメント",
    step2: "透かしのテキスト",
    step3: "確認してダウンロード",
    dropTitle: "PDF または画像をここにドロップ",
    dropHint: "またはクリックして選択。貼り付け（Ctrl+V）も使えます。",
    dropAdd: "他のドキュメントを追加（ドロップ・クリック・Ctrl+V）",
    inputAria: "透かしを入れるドキュメントを追加（PDF または画像）",
    rejected: (names: string) =>
      `対応していない形式です：${names}。PDF と画像（JPG、PNG…）のみ使用できます。`,
    remove: (name: string) => `${name} を削除`,
    pages: (n: number) => `${n} ページ`,
    status: { pending: "待機中", processing: "処理中", ready: "完了", error: "エラー" },
    unlock: {
      locked: "ロック中",
      placeholder: "PDF のパスワード",
      button: "ロック解除",
      aria: (name: string) => `${name} のパスワード`,
      hint: "ドキュメント一覧でパスワードを入力してください。",
      show: "パスワードを表示",
      hide: "パスワードを隠す",
    },
    pageOf: (a: number, b: number) => `${a} / ${b} ページ`,
    textareaAria: "ドキュメントに入れる透かしのテキスト",
    placeholder: "例：賃貸申込専用のコピー、マルタン不動産、2026/07/12",
    presets: [
      "賃貸申込専用のコピー。他の用途は禁止します",
      "銀行提出専用のコピー。複製・再利用を禁止します",
      "本人確認専用のコピー。他の用途は禁止します",
    ],
    addDate: "今日の日付を追加",
    onDate: (base: string, date: string) => `${base}（${date}）`,
    tip: "ヒント：宛先と日付を入れましょう。具体的な透かしは他では使えません。",
    downloadAll: (n: number) => `すべてダウンロード（${n} 件）`,
    zipName: "watermarked-documents",
    autoApply: "自動プレビュー",
    apply: "透かしを適用",
    applyHint: "「適用」をクリックしてプレビューを生成します。",
    batch: {
      progress: (done: number, total: number) => `${done} / ${total} 件処理済み`,
      all: "すべて",
      attention: "要対応",
      ready: "完了",
      searchPlaceholder: "名前で検索…",
      searchAria: "ドキュメントを名前で検索",
      matches: (n: number) => (n === 0 ? "該当するドキュメントはありません。" : `${n} 件を表示中。`),
    },
    staleResults:
      "テキストが変更されました。準備済みのドキュメントには以前の透かしが入っています。「透かしを適用」を押してください。",
    dropAnywhere: "画面のどこにでもドロップできます",
    clearAll: "すべて消去",
    emptyStart: "ドキュメントをドロップして始めましょう。",
    emptyText: "処理を始めるには、透かしのテキストを入力してください。",
    processingGeneric: "処理中…",
    processingDoc: (name: string, p?: [number, number]) =>
      `${name}：透かしを処理中…${p ? ` ${p[0]} / ${p[1]} ページ` : ""}`,
    docError: (name: string, msg: string) => `${name}：${msg}`,
    srProcessing: "透かしを処理中です。",
    srReady: (n: number) => `${n} 件のドキュメントをダウンロードできます。`,
    previewAlt: (name: string, p: number) => `${name}、透かし入り ${p} ページ目のプレビュー`,
    zoomOpen: (p: number) => `${p} ページ目のプレビューを拡大`,
    zoomLabel: (p: number) => `${p} ページ目の拡大プレビュー`,
    zoomAlt: (name: string, p: number) => `${name}、${p} ページ目の拡大`,
    zoomClose: "プレビューを閉じる",
    pagerNav: "ページ移動",
    pagerPrev: "前のページ",
    pagerNext: "次のページ",
    previewLimit: (shown: number, total: number) =>
      `プレビューは最初の ${shown} ページまでです。ダウンロードには全 ${total} ページが含まれます。`,
    suffix: "watermarked",
    sizeUnit: "MB",
    locale: "ja-JP",
    footerMade: "作者：",
    footerInspired: "、着想元：",
    footerLicense: "。AGPL ライセンス。",
    share: "共有",
    shareCopied: "リンクをコピーしました",
    shareLang: (name: string) => `${name}のリンクをコピー`,
    browserTooOld:
      "お使いのブラウザが古いため、このツールを利用できません。続けるにはブラウザを更新してください。",
    about: {
      nav: "なぜ透かしを？",
      navTool: "ツール",
      title: "なぜ書類に透かしを入れるのか",
      lead: "賃貸、就職、口座開設。身分証のコピーを求められる場面は絶えません。一度送ったコピーは、もう自分の手を離れます。透かしを入れれば、そのコピーは一つの用途だけに結びつき、他には使えなくなります。",
      riskTitle: "素のコピーが抱えるリスク",
      riskBody: "身分証をそのままスキャンした画像だけで、口座開設・借入・なりすましが可能になります。情報漏えいは日常的に起き、メールで転送されたり不用意に保存されたコピーは、何年も後にどこかで再び現れることがあります。",
      whatTitle: "何を書けばよいか",
      whatLead: "3つの要素で十分です。フランスの公的機関 Cybermalveillance.gouv.fr もこれを推奨しています。",
      what: [
        { title: "目的", body: "「賃貸申込」「口座開設」など。それ以外の利用は一目で不正だと分かります。" },
        { title: "宛先", body: "不動産会社、銀行、勤務先。コピーが漏れても出どころが分かります。" },
        { title: "日付", body: "送付した日。日付入りのコピーは、何年も後に使い回せません。" },
      ],
      exampleTitle: "ひと目で分かる違い",
      exBadLabel: "素のコピー",
      exBadBody: "誰でも、どんな用途にも使い回せます。",
      exGoodLabel: "透かし入りコピー",
      exGoodBody: "一つの用途に限定。他では使えません。",
      specimen: "見本",
      specimenCard: "身分証明書",
      backToTool: "書類に透かしを入れる",
      source: "Cybermalveillance.gouv.fr（フランスのサイバー犯罪被害者支援機関）。",
      exStamp: "賃貸申込、マルタン不動産、2026/07/11",
    },
    errors: {
      unsupported: "対応していない形式です。PDF または画像（JPG、PNG…）を選んでください。",
      pdf_unreadable: "この PDF を読み込めませんでした。ファイルが破損している可能性があります。",
      pdf_password: "この PDF はパスワードで保護されています。",
      pdf_password_wrong: "パスワードが正しくありません。もう一度お試しください。",
      pdf_empty: "この PDF にページがありません。",
      image_unreadable: "この画像を読み込めませんでした。JPG または PNG をお試しください。",
      canvas_unavailable: "お使いのブラウザではこのドキュメントを描画できません。",
      export_failed: "ページの書き出しに失敗しました。",
      generic:
        "処理に失敗しました。繰り返し失敗する場合、この端末のメモリに対してドキュメントが大きすぎる可能性があります。",
    } as Record<ErrorKey | "generic", string>,
  },
};

export type Strings = (typeof STRINGS)["fr"];

// Exportée pour les tests. La valeur stockée est validée : un "lang" altéré
// dans localStorage (ex. "xx") rendrait STRINGS[lang] indéfini et planterait
// tout composant lisant t.* — on retombe alors sur la détection navigateur.
export function detectLang(saved: string | null, navLang: string): Lang {
  if (saved !== null && isLang(saved)) return saved;
  const nav = navLang.toLowerCase();
  return nav.startsWith("fr") ? "fr" : nav.startsWith("ja") ? "ja" : "en";
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}>({ lang: "fr", setLang: () => {}, t: STRINGS.fr });

export function LangProvider({
  children,
  forcedLang,
}: {
  children: React.ReactNode;
  forcedLang?: Lang;
}) {
  // Une URL /fr, /en ou /ja impose sa langue (liens partageables) ;
  // la racine garde la détection préférence enregistrée → navigateur.
  const [lang, setLangState] = useState<Lang>(forcedLang ?? "fr");

  useEffect(() => {
    if (forcedLang) {
      localStorage.setItem("lang", forcedLang);
      return;
    }
    setLangState(detectLang(localStorage.getItem("lang"), navigator.language));
  }, [forcedLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
    // Sur l'accueil, l'URL reflète la langue affichée : l'adresse reste
    // partageable telle quelle. replaceState évite de démonter l'app
    // (les documents chargés seraient perdus avec une vraie navigation).
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/" || isLang(path.slice(1))) {
      window.history.replaceState(null, "", SITE_META[l].path);
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
