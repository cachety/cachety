import type { Comparison } from "../types";

// Comparisons for the Dossier tool (ja): merging PDFs and photos into one
// file and getting it under a size limit. Same editorial rule as the other
// comparisons (lib/compare/types.ts); each entry carries tool: "dossier".
// Written for readers in Japan (ja-JP). Plain text only.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Every claim about another tool is backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.
//
// The Cachety column describes the Dossier tool as shipped (sections, photo
// straightening and custom size included): limits from lib/watermark.ts and
// lib/pages.ts, sizes from lib/size-budget.ts and the `dossier` block of
// lib/i18n.tsx. Keep the column in step with them. The quoted labels
// (「1つのPDF」「その他…」) were checked against that block on 2026-11-19.
// The claims about the other tools say the same as the English file
// (lib/compare/dossier/en.ts), re-checked on the same date.
//
// Dossierツールの比較ページ（日本の読者向け）。ほかのツールについての記述は
// すべて `sources` の公開ページにもとづき、`checked` の日付に確認。料金は載せない。

const CHECKED = "2026-11-19";
const UPDATED = "2026-11-19";

/** Address of the tool, written without a scheme. */
const TOOL = "cachety.com/ja/dossier";

// Shared wording for the Cachety column.
const CACHETY = {
  where: "あなたのスマホやパソコンの中（ブラウザ内）。何もアップロードされません",
  kept: "何も保管されません。ファイルを受け取るサーバーがありません",
  free: "無料で登録不要。有料プランも1日の上限もありません。1ファイル200 MBまで、PDFは1つ500ページまで、合計1,000ページまで",
  pages: "すべてのファイルのすべてのページが1つの画面に並びます。ページを移動（別のファイルの中にも）、回転、削除できます。1つのPDFにするか、名前を付けたセクションごとに1つのPDFにします",
  size: "最大サイズを1・2・5・10 MBから選ぶか、0.5〜50 MBの好きな上限を指定します。ファイルが収まり、読める状態を保てるかどうかを、ダウンロードの前に知らせます",
  output: "各ページを画像として作り直します。文字は選択も検索もできず、文字だけのPDFは元より大きくなることがあります",
  hidden: "すべてのファイルで取り除かれます：隠れた文字、作成者などのプロパティ、添付ファイル、リンク、写真の位置情報（GPS）",
  inputs: "PDFと写真を一緒に。iPhoneのHEIC写真も使えます。紙を撮った写真は、傾きを直し、切り抜き、背景を白くできます。Word、Excel、PowerPointのファイルは使えません",
  offline: "インストール不要。ページを読み込んだあとは、スマホでもパソコンでも機内モードで動きます",
  ads: "広告もトラッカー（追跡ツール）もありません。コードは公開されています（オープンソース）",
};

/** Table row 「結合のオプション」, for the tools that have bookmarks and tables of contents. */
const MERGE_OPTIONS = "ページの順番と、複数のファイルがほしいときのセクションごとのPDF。しおりも目次もありません";

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Cachetyで作ったファイルはどんなファイルか" },
  {
    type: "p",
    text: "Cachetyは、元のページをつなぎ合わせるわけではありません。各ページを画像として作り直し、その画像から新しいPDFを作ります。こうすることで、見えないものが取り除かれます。隠れた文字、作成者の名前、添付ファイル、リンク、写真の位置情報（GPS）です。そのかわりに失うものもあります。新しいファイルの文字は選択も検索もできず、文字だけだったPDFは、最大サイズを選ばないかぎり、元より大きくなることがあります。",
  },
  {
    type: "warning",
    text: "文字を選択・検索できるままにしておく必要があるとき、しおりやフォームの入力欄を残す必要があるとき、WordやExcelのファイルを加えたいとき、スキャンの文字認識（OCR）が必要なときには、Cachetyは向いていません。",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Cachetyで1つのPDFを作る手順" },
  {
    type: "steps",
    items: [
      `パソコンかスマホのブラウザで ${TOOL} を開きます。インストールも登録も不要です。`,
      "PDFと写真を追加します。写真は1枚が1ページになります。",
      "ページの画面に進みます。ドラッグして順番に並べ、横向きのページは回転させ、いらないページは外します。",
      "「1つのPDF」を選びます。サイズの上限を指定されているときは、1・2・5・10 MBから選ぶか、「その他…」で別の上限を指定します。",
      "プレビューを確認し、相手に必要のない情報があれば隠してから、ファイルをダウンロードします。",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Cachetyや${other}では、ファイルはアップロードされますか？`,
  a: `Cachetyでは、されません。作業はブラウザの中で行われ、ファイルを受け取るサーバーはありません。${answer}`,
});

const FAQ_TEXT = {
  q: "Cachetyで結合したあとも、文字を選択できますか？",
  a: "できません。Cachetyは各ページを画像として作り直すので、隠れたデータは消えますが、選択できる文字も消えます。文字が必要なら、元のページをそのままつなぐツールを使ってください。",
};

export const DOSSIER_COMPARISONS_JA: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "CachetyとiLovePDFの比較：アップロードせずにPDFを結合・圧縮するなら",
    metaTitle: "iLovePDFとCachetyを比較：アップロードせずにPDFを結合",
    description:
      "iLovePDFはPDFの結合と圧縮を自社のサーバーで行います。Cachetyはブラウザの中で行い、アップロードはなく、隠れたデータも取り除きます。公平に比べました。",
    intro:
      "iLovePDFは、最もよく使われているオンラインPDFツール群の一つで、バルセロナで作られています。結合と圧縮のツールは、ファイルを同社のサーバーで処理します。Cachetyは、あなたの端末の中で、もっと限られた仕事をします。PDFと写真を1つのファイルにまとめ、サイズの上限に収めます。アップロードはしません。",
    verdict:
      "できることが多いのはiLovePDFです。Officeファイル、文字認識、多数のファイルの一括処理に対応し、オフラインで動く有料のデスクトップアプリもあります。そうした用途なら、iLovePDFを選ぶべきです。Cachetyが向いているのは、ファイルがアップロードしたくない個人の書類であるとき、写真とPDFを同じファイルに入れる必要があるとき、フォームがサイズの上限をMBで決めているときです。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: CACHETY.where,
        other: "ウェブサイトではiLovePDFのサーバー。デスクトップアプリは、有料プランで、パソコンの中でファイルを処理",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保管期間",
        cachety: CACHETY.kept,
        other: "処理から2時間以内に自動で削除。ダウンロード画面のボタンで、もっと早く削除できる",
        edge: "cachety",
      },
      {
        criterion: "登録、無料で使える範囲、上限",
        cachety: CACHETY.free,
        other: "登録なしで無料。ただし扱える書類の数に制限あり。無料の結合：1回の作業で100ファイル、300 MBまで。無料の圧縮：1回の作業で5ファイル。有料プランで上限が上がる",
      },
      {
        criterion: "ページの並べ替え",
        cachety: CACHETY.pages,
        other: "結合ツールではファイル単位で並べ替え。別のツール（Organize PDF）では、ページ単位の並べ替え、削除、回転ができ、ファイルを追加して結合することもできる（無料：5ファイル、100 MB）",
      },
      {
        criterion: "サイズの上限に収める",
        cachety: CACHETY.size,
        other: "圧縮レベルは3段階：最大（extreme）、推奨、弱め。目標のサイズをMBで指定することはできない",
        edge: "cachety",
      },
      {
        criterion: "写真とPDFを一緒に",
        cachety: CACHETY.inputs,
        other: "ウェブサイトでは2段階：まず画像をPDFに変換し、それから結合。Word、Excel、PowerPointのファイルには、それぞれ専用の変換ツールがある",
      },
      {
        criterion: "できあがるPDF",
        cachety: CACHETY.output,
        other: "結合ツールのページには説明なし。別のツールが文字を認識（OCR）し、スキャンを検索できるようにする",
      },
      {
        criterion: "隠れたデータ",
        cachety: CACHETY.hidden,
        other: "ウェブサイトのツールについては記載なし。デスクトップアプリでは、PDFのメタデータを編集・消去できる",
      },
      {
        criterion: "アプリとオフラインでの利用",
        cachety: CACHETY.offline,
        other: "WindowsとMac用のデスクトップアプリがあり、オフラインで動く。無料の範囲はPDFの閲覧で、各ツールには有料プランが必要。iOSとAndroid用のアプリあり",
      },
      {
        criterion: "広告とトラッカー",
        cachety: CACHETY.ads,
        other: "無料プランには広告が表示される。有料プランでは表示されない",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "大きなオンラインのツール群と、端末の中にとどまる道具" },
      {
        type: "p",
        text: "iLovePDFのウェブサイトでは、ファイルは同社のサーバーに送られ、そこで処理され、2時間以内に自動で削除されます。ダウンロード画面から、もっと早く削除することもできます。iLovePDFは、ISO/IEC 27001の認証を取得しており、ファイルは暗号化された通信で転送されると説明しています。サイトは26の言語で使えます。",
      },
      {
        type: "p",
        text: "Cachetyがするのは、送るためのファイルを用意することだけです。求められたPDFと写真を、順番どおりに、ちょうどよいサイズの1つのPDFにします。すべてブラウザの中で行われます。アップロードがないので、あとで削除するものもありません。",
      },
      { type: "h2", text: "iLovePDFが向いている点" },
      {
        type: "list",
        items: [
          "Word、Excel、PowerPointのファイルをPDFに変換できます。",
          "スキャンの文字を認識（OCR）するので、スキャンしたPDFを検索できるようにできます。",
          "大きな作業に対応しています。無料の結合で100ファイルまで扱えます。",
          "有料のデスクトップアプリは、ウェブサイトのツールのほとんどを備え、パソコンの中でファイルを処理します。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "ファイルがアップロードされることはありません。無料で、スマホでもパソコンでも同じです。",
          "写真とPDFを一度の操作で同じファイルにまとめられ、同じ画面でページを1枚ずつ移動、回転、削除できます。",
          "オンラインのフォームが上限を示すときと同じように、サイズをMBで選べます。読める状態のまま収められないときは、ダウンロードの前に知らされます。",
          "すべてのファイルから隠れたデータが取り除かれ、広告もありません。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Word、Excel、PowerPointのファイルを変換したいとき、またはスキャンの文字を認識させたいとき",
      "たくさんのファイルや、とても大きなPDFを一度に処理したいとき",
      "iLovePDFの有料プランを契約していて、パソコンの中で動くデスクトップアプリを使っているとき",
    ],
    chooseCachety: [
      "ファイルが身分証、給与明細、取引明細などで、アップロードしたくないとき",
      "写真とPDFを同じファイルに、自分の決めた順番で入れたいとき",
      "フォームが、MBで示されたサイズの上限以下で、1つのファイル、または書類の種類ごとに1つのファイルを求めているとき",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "iLovePDFのウェブサイトでは、されます。ファイルは同社のサーバーで処理され、2時間以内に削除されます。デスクトップアプリは、有料プランで、パソコンの中でファイルを処理します。"
      ),
      {
        q: "iLovePDFで、PDFをぴったり指定したサイズに圧縮できますか？",
        a: "できません。圧縮レベルが3段階あり、同社のガイドにも、出力サイズを正確に約束できるツールはないと書かれています。Cachetyでは最大サイズをMBで選び、読める状態のまま収められないときは、ダウンロードの前に知らされます。",
      },
      {
        q: "iLovePDFはオフラインで使えますか？",
        a: "WindowsとMac用のデスクトップアプリは使えますが、アプリ内のツールには有料プランが必要です。Cachetyはウェブページで、一度読み込んだあとは機内モードでも無料で動きます。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF PDFの結合", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF PDFの圧縮", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF 料金とツールごとの上限", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF セキュリティ", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF よくある質問", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "iLovePDF ブログ：ウェブ、デスクトップ、モバイル", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "iLovePDF ブログ：PDFのページの整理", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "iLovePDF ブログ：PDFとJPGファイルの結合", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "iLovePDF ブログ：PDFを特定のサイズに圧縮", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "iLovePDF ブログ：PDFのメタデータの編集と削除",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "iLovePDF ブログ：iLovePDFの15年", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
      { label: "iLovePDFについて", url: "https://www.ilovepdf.com/help/about" },
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
    title: "CachetyとSmallpdfの比較：アップロードせずにPDFを結合・圧縮するなら",
    metaTitle: "SmallpdfとCachetyを比較：アップロードせずにPDFを結合",
    description:
      "SmallpdfはPDFの結合と圧縮をクラウドで行い、無料利用には1日の上限があります。Cachetyはブラウザの中で、無料で、アップロードなしで行います。公平に比べました。",
    intro:
      "Smallpdfは、スイスのよく知られたオンラインPDFツール群で、スマホ用とWindows用のアプリもあります。結合と圧縮のツールはクラウドで動きます。Cachetyは、あなたの端末の中で、もっと限られた仕事をします。PDFと写真を1つのファイルにまとめ、サイズの上限に収めます。アップロードはしません。",
    verdict:
      "できることが多いのはSmallpdfです。Word、Excel、PowerPointのファイルを受け付け、スキャンの文字を認識でき、オフラインで動くWindowsアプリもあります。そうした用途なら、Smallpdfを選ぶべきです。Cachetyが向いているのは、ファイルがアップロードしたくない個人の書類であるとき、無料プランの1日の上限に達してしまうとき、フォームがサイズの上限をMBで決めているときです。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: CACHETY.where,
        other: "クラウド。ファイルは欧州連合（EU）内にあるサーバーにアップロードされる。Windows用のデスクトップアプリは、オフラインでファイルを扱う",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保管期間",
        cachety: CACHETY.kept,
        other: "Smallpdfの製品ページによると、アカウントに保存しない限り、1時間後にサーバーから削除",
        edge: "cachety",
      },
      {
        criterion: "登録、無料で使える範囲、上限",
        cachety: CACHETY.free,
        other: "登録不要。無料利用には1日のダウンロード上限とファイルサイズの上限があり、有料プランでなくなる",
        edge: "cachety",
      },
      {
        criterion: "ページの並べ替え",
        cachety: CACHETY.pages,
        other: "結合ツールでは、すべてのファイルのページを表示して、並べ替え、回転、削除ができる。Smallpdfの料金ページでは、このページ表示は有料プランの欄に載っている。Organize PDFツールでは、ページの並べ替え、回転、削除、追加ができ、複数の文書を1つにまとめることもできる",
      },
      {
        criterion: "サイズの上限に収める",
        cachety: CACHETY.size,
        other: "圧縮レベルを選ぶ方式で、MBでのサイズ指定ではない。基本の圧縮は無料、より強い圧縮は有料プランに含まれる",
        edge: "cachety",
      },
      {
        criterion: "使えるファイルの種類",
        cachety: CACHETY.inputs,
        other: "結合ツールでPDF、Word、Excel、PowerPoint、JPG、PNG。PDF以外のファイルは先にPDFに変換される。HEIC写真は、JPGをPDFにするツール（JPG to PDF）で使える",
        edge: "other",
      },
      {
        criterion: "できあがるPDF",
        cachety: CACHETY.output,
        other: "結合ツールのページには説明なし。文字認識（OCR）は別のツールとして提供",
      },
      {
        criterion: "隠れたデータ",
        cachety: CACHETY.hidden,
        other: "結合ツールについては説明なし。Smallpdfのブログによると、圧縮ツールとフラット化（Flatten）ツールがメタデータを取り除く。結合とは別の手順になる",
      },
      {
        criterion: "アプリとオフラインでの利用",
        cachety: CACHETY.offline,
        other: "iOSとAndroid用のアプリと、オフラインで動くWindows用デスクトップアプリ。Mac用のデスクトップアプリは、現在サポートされていない",
      },
    ],
    body: [
      { type: "h2", text: "クラウドのツール群と、端末の中にとどまる道具" },
      {
        type: "p",
        text: "Smallpdfは、結合と圧縮のツールをクラウドベースと説明しています。ファイルはアップロードされ、同社のサーバーで処理され、アカウントに保存しない限り1時間後に削除されます。Smallpdfは、ISO/IEC 27001の認証を取得しており、ファイルの転送中はTLS暗号化を使うと説明しています。ツールは24の言語で使えます。",
      },
      {
        type: "p",
        text: "ここでのCachetyの仕事は一つです。求められたPDFと写真を、ちょうどよいサイズの、きれいな1つのファイルにすること。すべてブラウザの中で行われます。アップロードがないので、あとで削除するものもありません。",
      },
      { type: "h2", text: "Smallpdfが向いている点" },
      {
        type: "list",
        items: [
          "Word、Excel、PowerPointのファイルをPDFに変換し、一度の操作で結合できます。",
          "文字認識（OCR）があるので、スキャンを検索できるようにできます。",
          "スキャナー機能のあるスマホアプリと、オフラインでファイルを扱うWindowsアプリがあります。",
          "アカウントがあれば、書類をオンラインに保管し、別の端末から開けます。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "ファイルがアップロードされることはありません。スマホでもパソコンでも同じで、インストールもいりません。",
          "1日の上限も有料プランもありません。",
          "オンラインのフォームが上限を示すときと同じように、サイズをMBで選べます。読める状態のまま収められないときは、ダウンロードの前に知らされます。",
          "別の手順を踏まなくても、すべてのファイルから隠れたデータが取り除かれます。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "結合するPDFに、Word、Excel、PowerPointのファイルを加えたいとき",
      "スキャンの文字認識（OCR）が必要なとき",
      "Windowsを使っていて、オフラインで動くインストール型のアプリがほしいとき",
      "書類をオンラインのアカウントに保管しておきたいとき",
    ],
    chooseCachety: [
      "ファイルが身分証、給与明細、取引明細などで、アップロードしたくないとき",
      "フォームが、MBで示されたサイズの上限以下で、1つのファイル、または書類の種類ごとに1つのファイルを求めているとき",
      "スマホを使っていて、アプリのインストールもアカウントの作成もしたくないとき",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Smallpdfのオンラインツールでは、されます。ファイルは同社のサーバーにアップロードされ、製品ページによると、アカウントに保存しない限り1時間後に削除されます。Windows用のデスクトップアプリは、オフラインでファイルを扱います。"
      ),
      {
        q: "Smallpdfで、PDFをぴったり指定したサイズに圧縮できますか？",
        a: "できません。Smallpdfにあるのは圧縮レベルで、同社のブログにも、このツールでは正確なサイズを入力できないと書かれています。Cachetyでは最大サイズをMBで選びます。読める状態を保てるかぎり、ファイルはそのサイズ以下に収められます。",
      },
      {
        q: "Smallpdfは無料ですか？",
        a: "一部は無料です。結合と基本の圧縮は、1日のダウンロード上限つきで無料です。より強い圧縮と無制限の利用は、有料プランに含まれます。Cachetyは無料で、1日の上限も有料プランもありません。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf PDFの結合", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf PDFの圧縮", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf PDFの整理（Organize PDF）", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf JPGをPDFに（JPG to PDF）", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf 料金とプランの比較", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf プライバシーに関する通知", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf アプリと拡張機能", url: "https://smallpdf.com/download" },
      { label: "Smallpdf ブログ：PDFを選んだサイズに圧縮", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Smallpdf ブログ：PDFのメタデータの削除", url: "https://smallpdf.com/blog/ways-to-remove-pdf-metadata" },
      { label: "Smallpdfについて", url: "https://smallpdf.com/about" },
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
    title: "CachetyとAdobe Acrobatオンラインの比較：PDFを結合・圧縮するなら",
    metaTitle: "Adobe AcrobatとCachetyを比較：アップロードせずにPDFを結合",
    description:
      "Adobeの無料オンラインツールは、PDFの結合と圧縮をAdobeのサーバーで行います。Cachetyはブラウザの中で行い、アップロードもサインインもいりません。公平に比べました。",
    intro:
      "PDFを生み出したのはAdobeです。無料のAcrobatオンラインツールは、どのブラウザでもPDFを結合・圧縮できます。ファイルはAdobeのサーバーで扱われます。Cachetyは、あなたの端末の中で、もっと限られた仕事をします。PDFと写真を1つのファイルにまとめ、サイズの上限に収めます。アップロードはしません。",
    verdict:
      "文字をそのまま残す必要があるPDFなら、Adobeの結合を選ぶべきです。画像、文字、書式の品質を落とさずにファイルを結合し、100ファイルまで扱えます。有料のデスクトップアプリは、Cachetyよりはるかに多くのことができます。Cachetyが向いているのは、アップロードしたくない個人の書類を扱うとき、写真とPDFを一度の操作でまとめたいとき、MBで示されたサイズの上限に合わせたいときです。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: CACHETY.where,
        other: "オンラインツールではAdobeのサーバー。Acrobatのデスクトップアプリは、端末の中でファイルを圧縮する",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保管期間",
        cachety: CACHETY.kept,
        other: "サインインしてアカウントに保存しない限り、Adobeのサーバーから削除される。ダウンロードのあと、自分でファイルを削除することもできる",
        edge: "cachety",
      },
      {
        criterion: "登録、無料で使える範囲、上限",
        cachety: CACHETY.free,
        other: "結合：1つ500ページまでのファイルを100個まで、結合後のファイルは1,500ページまで。透かしは入らない。圧縮：無料だが利用に制限あり。無制限に使うには有料プランが必要",
      },
      {
        criterion: "ページの並べ替え",
        cachety: CACHETY.pages,
        other: "結合の前にファイルを並べ替えられる。ページ単位の整理にはサインインが必要で、無料のアカウントで足りる",
        edge: "cachety",
      },
      {
        criterion: "サイズの上限に収める",
        cachety: CACHETY.size,
        other: "圧縮レベルは3段階：高・中・低。2 GBまでのファイルに対応",
      },
      {
        criterion: "写真とほかのファイル形式",
        cachety: CACHETY.inputs,
        other: "無料の結合で扱えるのはPDF。PDFとWord、Excel、PowerPoint、画像ファイルを組み合わせる機能は、Acrobat Proに含まれる。別の無料ツールで、HEIC写真を含む画像をPDFにできるが、変換できる回数には制限がある",
      },
      {
        criterion: "できあがるPDF",
        cachety: CACHETY.output,
        other: "画像、文字、書式を圧縮したり品質を落としたりせずに、ファイルを結合する",
        edge: "other",
      },
      {
        criterion: "隠れたデータ",
        cachety: CACHETY.hidden,
        other: "非表示情報の削除（sanitize）と墨消しは、有料のAcrobat Proの機能",
        edge: "cachety",
      },
      {
        criterion: "アプリとオフラインでの利用",
        cachety: CACHETY.offline,
        other: "無料のAcrobat Readerでは、閲覧、注釈、フォームへの入力、署名ができる。編集、変換、圧縮は有料のデスクトップアプリの機能。スマホアプリのAdobe Scanは、スキャンをAdobeのクラウドストレージに保存する",
      },
    ],
    body: [
      { type: "h2", text: "PDFの定番と、一つの仕事のための小さな道具" },
      {
        type: "p",
        text: "Adobeは25を超える無料のオンラインツールを提供しています。PDFの結合ツールは100ファイルまで扱え、品質を変えずに結合します。PDFの圧縮ツールには3段階のレベルがあります。どちらもファイルをAdobeのサーバーに送り、サインインして保存しない限り、ファイルはそこで削除されます。Adobeは、ファイルは転送中も保存中も暗号化されると説明しており、ウェブ版Acrobatの認証としてISO 27001とSOC 2を挙げています。",
      },
      {
        type: "p",
        text: "Cachetyがするのは、送るためのファイルを用意することだけです。求められたPDFと写真を、順番どおりに、ちょうどよいサイズの1つのPDFにします。すべてブラウザの中で行われ、どの段階でもサインインはいりません。",
      },
      { type: "h2", text: "Adobe Acrobatが向いている点" },
      {
        type: "list",
        items: [
          "結合したPDFは、元の文字、画像、書式の品質を保ちます。",
          "大きな作業に対応しています。結合は100ファイルまで、圧縮は2 GBまでのファイルを扱えます。",
          "有料のデスクトップアプリでは、文字や画像の編集、ファイルの変換、圧縮、墨消しができます。",
          "すでにAcrobatを有料で使っているなら、すべてが一か所にそろい、ファイルもAdobeのアカウントにあります。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "ファイルがアップロードされることはなく、どの段階でもサインインはいりません。",
          "ページを1枚ずつ移動、回転、削除する操作は無料で、アカウントもいりません。",
          "写真とPDFを一度の操作で同じファイルにまとめられます。Adobeの無料ツールでは、まず写真をPDFに変換し、それから結合します。",
          "すべてのファイルから隠れたデータが取り除かれます。Adobeでは、有料のProプランの機能です。",
          "サイズをMBで選べ、収められるかどうかがダウンロードの前に知らされます。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "結合したPDFの文字を、選択・検索できるままにしておく必要があるとき",
      "数十個のファイルや、とても大きなPDFを結合したいとき",
      "すでにAcrobatを有料で使っているとき、または編集、変換、文字認識も必要なとき",
    ],
    chooseCachety: [
      "ファイルが身分証、給与明細、取引明細などで、アップロードしたくないとき",
      "サインインせずに、ページの並べ替え、回転、削除をしたいとき",
      "写真とPDFを一緒にまとめ、MBで示されたサイズの上限以下に収める必要があるとき",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Adobeのオンラインツールでは、されます。ファイルはAdobeのサーバーで扱われ、サインインして保存しない限り削除されます。Acrobatのデスクトップアプリは、あなたの端末の中で動きます。"
      ),
      {
        q: "PDFを結合するのにAdobeのアカウントは必要ですか？",
        a: "結合してダウンロードするだけなら、必要ありません。ページ単位の整理や、リンクでのファイルの共有には、サインインを求められます。Cachetyには、アカウントそのものがありません。",
      },
      {
        q: "Acrobatのオンラインツールで、PDFのメタデータを削除できますか？",
        a: "非表示情報の削除は、有料のAcrobat Proの機能です。Cachetyは、ページを画像として作り直すことで、作るすべてのファイルから隠れたデータを取り除きます。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat 無料のオンラインツール", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat PDFの結合", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat PDFの圧縮", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat JPGをPDFに", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat 画像をPDFに", url: "https://www.adobe.com/acrobat/online/image-to-pdf.html" },
      { label: "Adobe Acrobat HEICをPDFに", url: "https://acrobat.adobe.com/heic-to-pdf" },
      { label: "Adobe Acrobat PDFのページの並べ替え", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat PDFのページの削除", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat プランの比較", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services セキュリティの概要",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe コンプライアンスの一覧", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
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
    title: "CachetyとPDF24の比較：アップロードせずにPDFを結合・圧縮するなら",
    metaTitle: "PDF24とCachetyを比較：アップロードせずにPDFを結合",
    description:
      "PDF24のオンラインツールは自社のサーバーでPDFを結合・圧縮し、Windowsアプリはオフラインで動きます。Cachetyはどのブラウザでも、アップロードなしで動きます。",
    intro:
      "PDF24は、ドイツの無料PDFツール群です。オンラインツールはファイルをPDF24のサーバーで処理し、WindowsのプログラムであるPDF24 Creatorは、同じ作業をあなたのPCの中で行います。Cachetyはどの端末のブラウザでも動き、ファイルをアップロードすることはありませんが、できることはもっと限られています。",
    verdict:
      "Windowsのパソコンでは、PDF24 Creatorに勝るものはなかなかありません。無料で、オフラインで動き、元のページをそのままつなぐので、文字も元のまま残ります。スマホ、Mac、何もインストールできないパソコンでは、PDF24を使うとはオンラインツールを使うことであり、ファイルはアップロードされます。その場合、個人の書類にはCachetyのほうが向いていて、サイズをMBで選ぶこともできます。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: CACHETY.where,
        other: "オンラインツール：クラウド、PDF24のサーバー。PDF24 Creator（Windows）：あなたのPCの中で、アップロードなし",
      },
      {
        criterion: "ファイルの保管期間",
        cachety: CACHETY.kept,
        other: "オンライン：1時間後に自動で削除。手動ですぐに削除することもできる",
        edge: "cachety",
      },
      {
        criterion: "登録、無料で使える範囲、上限",
        cachety: CACHETY.free,
        other: "無料で制限なし、登録も不要。オンラインでは、1ファイル1,000 MBまで、1回の作業で10 GBまで",
      },
      {
        criterion: "ページの並べ替え",
        cachety: CACHETY.pages,
        other: "ファイルはドラッグ＆ドロップで並べ替え。ページモードでは、すべてのファイルのページが表示され、使いたいページを選んで順番にドラッグする。選ばなかったページは入らない。ページの回転は別のツール",
      },
      {
        criterion: "サイズの上限に収める",
        cachety: CACHETY.size,
        other: "解像度（DPI）と画質を設定する方式で、グレースケールのオプションあり。「5 MBに圧縮」というオプションはない",
        edge: "cachety",
      },
      {
        criterion: "使えるファイルの種類",
        cachety: CACHETY.inputs,
        other: "PDF、画像、Word文書、その他のファイル。iPhoneのHEIC写真は、結合ツールでは対応していない",
      },
      {
        criterion: "できあがるPDF",
        cachety: CACHETY.output,
        other: "ページは作り直さず、そのまま引き継ぐ。文字、画像、フォントの品質は変わらない",
        edge: "other",
      },
      {
        criterion: "隠れたデータ",
        cachety: CACHETY.hidden,
        other: "別のツールでPDFのメタデータを削除できる。PDFの圧縮ツールでも、メタデータ、添付ファイル、注釈を取り除ける",
      },
      {
        criterion: "結合のオプション",
        cachety: MERGE_OPTIONS,
        other: "しおり、目次、各ファイルの前の表紙ページ、両面印刷用の白紙ページ、ページへのファイル名の印字",
        edge: "other",
      },
      {
        criterion: "アプリとオフラインでの利用",
        cachety: CACHETY.offline,
        other: "PDF24 Creatorで、すべてのツールをオフラインで使える。Windowsのみ。MacやLinux用はまだなく、スマホのアプリストアにもアプリはない。オンラインツールはスマホのホーム画面に追加できるが、使うには通信が必要",
      },
      {
        criterion: "広告とトラッカー",
        cachety: CACHETY.ads,
        other: "オンラインツールは広告で運営されている。プライバシーポリシーには、Google AdSenseやGoogle Analyticsなどの記載あり",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "PDF24の2つの使い方" },
      {
        type: "p",
        text: "PDF24のオンラインツールは無料で、登録もいらず、広告によって運営されています。ファイルはPDF24のサーバーで処理されます。転送は暗号化され、ファイルは1時間後に削除されます。PDF24を運営しているのは、ベルリンに拠点を置く会社です。",
      },
      {
        type: "p",
        text: "PDF24 Creatorは別物です。Windows用の無料プログラムで、PDF24のすべてのツールをPCの中で使えます。ファイルはPCの中にとどまり、アップロードされません。Windowsを使っていてソフトをインストールできるなら、Cachetyと同じプライバシーと、より多くの機能が手に入ります。",
      },
      { type: "h2", text: "PDF24が向いている点" },
      {
        type: "list",
        items: [
          "結合したPDFは元のページをそのまま保ちます。文字、画像、フォントの品質は変わりません。",
          "Cachetyにはない結合のオプションがあります。しおり、目次、表紙ページ、両面印刷用の白紙ページです。",
          "Word文書などのファイルも受け付け、文字認識（OCR）もあります。",
          "Windowsでは、PDF24 Creatorがこれらすべてをオフラインで、無料で行います。",
          "圧縮の解像度と画質を自分で設定できます。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "どの端末でもアップロードがありません。スマホ、Mac、Linuxのパソコン、ソフトをインストールできないPCでも同じです。",
          "ファイルが十分小さくなるまで設定を試すかわりに、サイズをMBで選べます。",
          "iPhoneのHEIC写真をそのまま使えます。",
          "別の手順を踏まなくても、すべてのファイルから隠れたデータが取り除かれます。",
          "広告もトラッカーもありません。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Windowsを使っていて、PDF24 Creatorをインストールできるとき。オフラインで動き、元のページをそのまま保ちます",
      "結合したPDFの文字を、選択・検索できるままにしておく必要があるとき",
      "Word文書を加えたいとき、またはスキャンの文字を認識させたいとき",
      "解像度と画質を自分で設定したいとき",
    ],
    chooseCachety: [
      "スマホ、Mac、ソフトをインストールできないパソコンを使っていて、書類をアップロードしたくないとき",
      "フォームが、MBで示されたサイズの上限以下で、1つのファイル、または書類の種類ごとに1つのファイルを求めているとき",
      "写真がiPhoneで撮ったものであるとき",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "PDF24のオンラインツールでは、されます。ファイルは同社のサーバーで処理され、1時間後に削除されます。WindowsのPDF24 Creatorでは、されません。ファイルはPCの中にとどまります。"
      ),
      {
        q: "PDF24で、PDFを指定したサイズに圧縮できますか？",
        a: "直接はできません。解像度と画質を設定する方式で、PDF24のガイドにも「5 MBに圧縮」というオプションはないと書かれています。Cachetyでは最大サイズをMBで選びます。読める状態を保てるかぎり、ファイルはそのサイズ以下に収められます。",
      },
      {
        q: "PDF24は、Macやスマホでオフラインで使えますか？",
        a: "使えません。PDF24 CreatorはWindows専用です。Macやスマホで使えるのはオンラインツールで、ファイルは同社のサーバーで処理されます。Cachetyは、どの端末のブラウザでも、アップロードなしで動きます。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools PDFの結合", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools PDFの圧縮", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools 画像をPDFに", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools PDFのメタデータを削除", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools PDFの回転", url: "https://tools.pdf24.org/en/rotate-pdf" },
      { label: "PDF24 Tools よくある質問", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "PDF24 ヘルプ：PDFファイルの結合", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "PDF24 ヘルプ：PDFの圧縮", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "PDF24 ヘルプ：Mac、Linux、スマホ", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24 プライバシーポリシー", url: "https://www.pdf24.org/en/privacy-policy" },
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
    title: "CachetyとSejdaの比較：アップロードせずにPDFを結合・圧縮するなら",
    metaTitle: "SejdaとCachetyを比較：アップロードせずにPDFを結合",
    description:
      "SejdaはPDFの結合と圧縮を、オンラインか、デスクトップアプリでパソコンの中で行い、無料の範囲には上限があります。Cachetyはブラウザの中で、アップロードなしで動きます。",
    intro:
      "Sejdaは、オランダのPDFツール群で、2つの顔があります。ファイルを同社のサーバーで処理するオンラインツールと、パソコンの中で処理するMac・Windows・Linux用アプリのSejda Desktopです。どちらも無料の範囲に上限があります。Cachetyはどの端末のブラウザでも動き、何もアップロードせず、1時間あたりや1日あたりの上限もありませんが、できることはもっと限られています。",
    verdict:
      "結合の機能が豊富なのはSejdaです。しおりを保ち、目次を作り、ページの下にファイル名を入れることもできます。Sejda Desktopなら、ファイルはパソコンの中にとどまります。こうした機能が必要なら、Sejdaを選んでください。Cachetyを選ぶのは、スマホで、または何もインストールせずに個人の書類を扱うとき、Sejdaの無料の上限を超えるファイルを扱うとき、MBで示されたサイズの上限に合わせたいときです。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: CACHETY.where,
        other: "オンライン：アップロードされ、Sejdaのサーバーで処理。Sejda Desktop：パソコンの中で処理され、アップロードなし",
      },
      {
        criterion: "ファイルの保管期間",
        cachety: CACHETY.kept,
        other: "オンライン：2時間後に自動で削除。結果のページに、ファイルを削除するボタン（Delete files）がある",
        edge: "cachety",
      },
      {
        criterion: "登録、無料で使える範囲、上限",
        cachety: CACHETY.free,
        other: "登録不要。無料のオンライン結合：50ページまたは50 MBまで、1時間に3回まで。無料の圧縮：200ページまたは100 MBまで。無料のデスクトップ版：1日3回まで、50 MB・200ページまでの文書。有料プランではページ数と1時間あたりの上限がなくなり、アップロードは1ファイル500 MBまでになる",
        edge: "cachety",
      },
      {
        criterion: "ページの並べ替え",
        cachety: CACHETY.pages,
        other: "ファイルはドラッグ＆ドロップで並べ替え。ページ表示では、結合の前にページの削除、並べ替え、複製ができる",
      },
      {
        criterion: "サイズの上限に収める",
        cachety: CACHETY.size,
        other: "画質と解像度を設定する方式で、グレースケールのオプションあり。目標のサイズをMBで指定することはできない",
        edge: "cachety",
      },
      {
        criterion: "使えるファイルの種類",
        cachety: CACHETY.inputs,
        other: "結合ツールではPDFと、JPGやPNGなどの画像。HEIC画像には対応していない",
      },
      {
        criterion: "結合のオプション",
        cachety: MERGE_OPTIONS,
        other: "ファイルごとのしおりの保持や作成、目次、両面印刷用の白紙ページ、フッターへのファイル名",
        edge: "other",
      },
      {
        criterion: "隠れたデータ",
        cachety: CACHETY.hidden,
        other: "別のツールで、PDFのメタデータを編集するか、すべて削除できる",
      },
      {
        criterion: "アプリとオフラインでの利用",
        cachety: CACHETY.offline,
        other: "Mac・Windows・Linux用のSejda Desktopがオフラインで動き、機能はオンラインサービスと同じ",
      },
    ],
    body: [
      { type: "h2", text: "オンラインでも、パソコンの中でも：Sejdaには両方あります" },
      {
        type: "p",
        text: "Sejdaのウェブサイトでは、書類をアップロードし、同社のサーバーで処理します。Sejdaは、ファイルは転送中も保存中も暗号化され、2時間後に自動で削除されると説明しています。無料のサービスには、ページ数、MB数、1時間あたりの回数の上限があります。",
      },
      {
        type: "p",
        text: "Sejda Desktopは、Mac、Windows、Linuxで、アップロードなしにパソコンの中でファイルを処理します。無料版で使えるのは1日3回までで、50 MB・200ページまでの文書が対象です。結合は30ファイル、50ページまでです。個人の書類については、大事な点が一つあります。Sejdaの利用規約には、利用者は公的な身分証の番号などの機微な個人情報を、オンラインサービスに送信してはならないと書かれています。",
      },
      { type: "h2", text: "Sejdaが向いている点" },
      {
        type: "list",
        items: [
          "Cachetyにはない結合のオプションがあります。しおり、目次、両面印刷用の白紙ページです。",
          "Mac・Windows・Linux用のデスクトップアプリがあり、ファイルはパソコンの中にとどまります。",
          "同じ場所にほかのツールが多くあります。文字認識（OCR）、PDFのページの切り抜きと傾き補正、編集です。",
          "Dropbox、Google Drive、OneDriveから、ファイルを直接取り込めます。",
          "画質と解像度の設定で、圧縮を細かく調整できます。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "何もアップロードせず、何もインストールしません。スマホでもパソコンでも同じです。",
          "50ページの上限も、1時間あたりや1日あたりの回数の上限もありません。60ページのファイルも、1時間のうちの4つ目のファイルも問題ありません。",
          "サイズをMBで選べ、収められるかどうかがダウンロードの前に知らされます。",
          "iPhoneのHEIC写真をそのまま使え、すべてのファイルから隠れたデータが取り除かれます。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "結合したPDFに、しおりや目次が必要なとき",
      "Sejda Desktopをインストールでき、作業が無料の上限に収まるとき、または有料プランを契約しているとき",
      "文字認識が必要なとき、またはスキャンしたPDFのページを切り抜いたり、傾きを直したりしたいとき。Cachetyでそれができるのは写真だけです",
    ],
    chooseCachety: [
      "ファイルが身分証、給与明細、取引明細などで、スマホを使っているか、ソフトをインストールできないとき",
      "ファイルが50ページを超えるとき、または同じ1時間のうちに複数のファイルを用意するとき",
      "フォームが、MBで示されたサイズの上限以下で、1つのファイル、または書類の種類ごとに1つのファイルを求めているとき",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Sejdaのオンラインツールでは、されます。ファイルは同社のサーバーにアップロードされ、2時間後に削除されます。Sejda Desktopでは、されません。ファイルはパソコンの中で処理されます。"
      ),
      {
        q: "Sejdaの結合は、無料でどこまで使えますか？",
        a: "オンラインでは、50ページまたは50 MBまでの書類を、1時間に3回まで。Sejda Desktopの無料版は、1日3回まで、50 MB・200ページまでの文書です。Cachetyにはこうした上限がなく、1つのファイルに1,000ページまで入れられます。",
      },
      {
        q: "Sejdaで、PDFを指定したサイズに圧縮できますか？",
        a: "圧縮ツールにあるのは画質と解像度の設定で、目標のサイズを指定するものではありません。Cachetyでは最大サイズをMBで選びます。読める状態を保てるかぎり、ファイルはそのサイズ以下に収められます。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda PDFの結合", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda PDFの圧縮", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda JPGをPDFに", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda PDFのページの整理", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda PDFのメタデータの編集", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda プランとよくある質問", url: "https://www.sejda.com/upgrade" },
      { label: "Sejda 結果のページ", url: "https://www.sejda.com/result" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Sejda セキュリティ", url: "https://www.sejda.com/security" },
      { label: "Sejda プライバシーポリシー", url: "https://www.sejda.com/privacy" },
      { label: "Sejda 利用規約", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
