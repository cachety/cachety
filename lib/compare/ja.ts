// Pages comparatives en japonais (« Cachety と X の比較 »), pour des lecteurs au Japon.
// Faits vérifiés le 2026-10-11 sur les pages des éditeurs (voir `sources`).

import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "./types";

const CHECKED = "2026-10-11";
const UPDATED = "2026-10-12";

// Cases « Cachety » reprises d'une page à l'autre (fiche de faits Cachety).
const C = {
  where: "あなたのスマホやパソコンの中（ブラウザ内）。ファイルは送信されません",
  retention: "保存されません。ファイルを受け取るサーバーがありません",
  account: "不要",
  price: "無料。有料プランはありません",
  ads: "現在、広告もトラッカー（追跡ツール）もありません",
  type: "文字の透かしのみ。ページ全体に斜めにくり返し入ります",
  flat: "ページを画像として描き直し、透かしを焼き込みます。PDFの編集では消せません",
  redact: "あり。四角で囲んだ部分はファイルから実際に消去されます",
  password: "あり（AES-256でPDFを暗号化）",
  recipients: "あり。最大20件の宛先ごとに別々のコピーを作成",
  offline: "ページを一度開けば、機内モードでも動きます",
  oss: "はい（AGPL-3.0、コードはGitHubで公開）",
  logo: "できません（文字のみ）",
  tools: "複数ファイルの結合と並べ替え、ファイルサイズの調整のみ",
};

// « Comment faire avec Cachety », commun à toutes les pages.
const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "Cachetyで身分証のコピーに透かしを入れる方法" },
  {
    type: "steps",
    items: [
      "ブラウザで cachety.com を開きます。登録は不要です。",
      "身分証の写真やPDFを画面にドロップします。iPhoneの写真（HEIC）もそのまま使えます。",
      "透かしの文字を入力します。例：「本人確認専用 さくら不動産 2026/10/11」。「今日の日付を追加」で日付も入ります。",
      "番号や顔写真など、見せる必要のない部分は「範囲を隠す」で四角く囲みます。",
      "プレビューを確認して、ダウンロードしたファイルを相手に送ります。",
    ],
  },
];

const AIRPLANE_TIP: GuideBlock = {
  type: "tip",
  text: "本当に送信されていないか、自分で確かめられます。cachety.com を開いたあと、スマホやパソコンを機内モードにしてから透かしを入れてみてください。インターネットにつながっていなくても、最後までちゃんと動きます。",
};

const CACHETY_LIMITS: GuideBlock = {
  type: "p",
  text: "Cachetyにも苦手なことがあります。入れられるのは文字の透かしだけで、ロゴは使えません。安全のためにページを画像として作り直すので、できあがったPDFの文字は選択や検索ができなくなり、元のファイルより重くなることもあります。また、個人が作っているプロジェクトで、会社によるサポート契約はありません。",
};

export const COMPARISONS_JA: Comparison[] = [
  // ---------------------------------------------------------------- iLovePDF
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/ja",
    title: "CachetyとiLovePDFの比較：身分証のコピーに透かしを入れるなら",
    metaTitle: "iLovePDFの代わりに：身分証の透かしはCachetyで",
    description:
      "iLovePDFとCachetyを比較。iLovePDFはファイルをサーバーで処理し2時間以内に削除、Cachetyは端末の外に出しません。身分証に透かしを入れるときの違いをやさしく解説します。",
    intro:
      "iLovePDFは、PDFの結合や圧縮などがそろった人気のオンラインツールで、透かしも入れられます。では、運転免許証やマイナンバーカードのコピーに透かしを入れるとき、どちらが向いているのでしょうか。",
    verdict:
      "いちばんの違いは、ファイルがどこで処理されるかです。iLovePDFではファイルが同社のサーバーにアップロードされ、処理後2時間以内に削除されると案内されています。Cachetyではファイルがあなたの端末から出ません。ロゴの透かしやほかのPDF作業もしたいなら、iLovePDFのほうが便利です。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: C.where,
        other: "iLovePDFのサーバー（通信は暗号化）。パソコン用のデスクトップ版もあり",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保存期間",
        cachety: C.retention,
        other: "処理後2時間以内に自動で削除（プライバシーポリシーより）",
        edge: "cachety",
      },
      {
        criterion: "広告",
        cachety: C.ads,
        other: "「広告なし」は有料のPremiumの特典として案内されています",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "文字または画像。位置の指定か、タイル状（モザイク）の配置。不透明度と回転も調整可",
      },
      {
        criterion: "ロゴの透かし",
        cachety: C.logo,
        other: "画像を透かしとして使えます",
        edge: "other",
      },
      {
        criterion: "透かしが焼き込まれるか",
        cachety: C.flat,
        other: "公開情報では明記されていません。内容の上か下に重ねる設定があります",
      },
      {
        criterion: "見せたくない部分を隠す",
        cachety: C.redact,
        other: "別のツール「墨消し（Redact）」で対応",
      },
      {
        criterion: "パスワード",
        cachety: C.password,
        other: "別のツール「保護（Protect）」で対応",
      },
      {
        criterion: "宛先ごとのコピー",
        cachety: C.recipients,
        other: "透かしツールの案内には記載がありません",
      },
      {
        criterion: "そのほかのPDF機能",
        cachety: C.tools,
        other: "結合、分割、圧縮、変換、署名など多数",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "アップロードするとはどういうことか" },
      {
        type: "p",
        text: "iLovePDFで透かしを入れると、まず身分証のコピーがインターネットを通って同社のサーバーに送られます。処理が終わるまでと、その後しばらくのあいだ、あなたのコピーは他社のコンピューターの上にあります。どう扱われるかは、その会社の規約しだいです。",
      },
      {
        type: "p",
        text: "iLovePDFはスペインの会社で、通信の暗号化や、処理後2時間以内の自動削除を案内しています。情報セキュリティの国際規格ISO/IEC 27001の認証も取得しています。きちんと対策をしているサービスです。それでも、短い時間とはいえ、コピーが手元を離れることに変わりはありません。",
      },
      { type: "h2", text: "Cachetyはファイルを送らない" },
      {
        type: "p",
        text: "Cachetyは、透かしを入れる作業をすべてあなたのブラウザの中で行います。ファイルを受け取るサーバーそのものがありません。さらに、ページの設定でほかのサイトへのデータ送信をブラウザに禁止させています。",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "iLovePDFが向いている場面" },
      {
        type: "p",
        text: "会社のロゴを透かしにしたいとき、PDFを圧縮・変換・署名したいときは、iLovePDFのほうが機能がそろっています。インターネットにつながらない環境で作業したい場合も、同社のデスクトップ版があります。",
      },
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "会社やお店のロゴを透かしとして入れたいとき",
      "透かしのほかに、PDFの圧縮、変換、署名などもまとめて済ませたいとき",
      "パソコンにインストールするアプリで作業したいとき（iLovePDF Desktop）",
    ],
    chooseCachety: [
      "身分証や通帳など、他社のサーバーに置きたくない書類に透かしを入れるとき",
      "賃貸の申込みなどで、宛先ごとに別々の透かし入りコピーを作りたいとき",
      "登録も広告もなしで、さっと済ませたいとき",
    ],
    faq: [
      {
        q: "iLovePDFに身分証をアップロードしても大丈夫？",
        a: "iLovePDFは通信を暗号化し、ファイルを処理後2時間以内に削除すると案内しています。ただ、そのあいだコピーは同社のサーバー上にあります。手元から出したくない書類なら、端末の中だけで処理するツールを選ぶと安心です。",
      },
      {
        q: "iLovePDFの代わりに使える無料の透かしツールは？",
        a: "Cachetyは無料で、登録も不要です。文字の透かしを入れるだけなら、ファイルを送らずにブラウザの中で済ませられます。ロゴの透かしが必要なら、iLovePDFなどほかのツールが向いています。",
      },
      {
        q: "iLovePDFでアップロードしたファイルはいつ消えますか？",
        a: "同社のプライバシーポリシーでは、処理後2時間以内に削除するとしています（電子署名サービスのiLoveSignは別扱いです）。",
      },
      {
        q: "Cachetyでもファイルを送っていないと確かめる方法は？",
        a: "cachety.com を開いたあと、機内モードにして透かしを入れてみてください。インターネットなしで最後まで動けば、ファイルは送られていません。",
      },
    ],
    sources: [
      { label: "iLovePDF プライバシーポリシー（ファイルの削除）", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF よくある質問（サーバーでの処理）", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF セキュリティ（ISO/IEC 27001）", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF 料金プラン（広告なしはPremium）", url: "https://www.ilovepdf.com/pricing" },
      {
        label: "iLovePDF 透かしの入れ方（公式ブログ）",
        url: "https://www.ilovepdf.com/blog/how-to-watermark-pages-in-a-pdf-document-online",
      },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Smallpdf
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/jp",
    title: "CachetyとSmallpdfの比較：身分証の透かしはどちらが安心？",
    metaTitle: "Smallpdfの透かしとCachetyを比較：身分証に使うなら",
    description:
      "SmallpdfとCachetyの透かし機能を比較。Smallpdfはファイルをサーバーにアップロードし、Cachetyは端末の中だけで処理します。身分証のコピーに使うときの違いを解説。",
    intro:
      "Smallpdfは、登録なしで使えるPDFツールとして日本でもよく使われています。透かしも入れられますが、身分証のコピーに使うときは、ファイルがどこへ行くのかを知っておきましょう。",
    verdict:
      "Smallpdfでは、ファイルは同社のサーバーにアップロードされ、ツールのページでは処理後1時間で自動削除と案内されています。Cachetyではファイルが端末から出ません。PDFの編集や圧縮などもまとめて使いたいなら、Smallpdfが便利です。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: C.where,
        other: "Smallpdfのサーバー。EU内のサーバー（Hetzner）で一時保存とプライバシー通知に記載",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保存期間",
        cachety: C.retention,
        other: "ツールのページでは1時間後に自動削除。プライバシー通知では、アカウントなしの場合「最後に開いてから合理的な期間内」",
        edge: "cachety",
      },
      {
        criterion: "アカウント登録",
        cachety: C.account,
        other: "透かしツールは登録なしで使えます",
      },
      {
        criterion: "無料で使える範囲",
        cachety: C.price,
        other: "無料版には1日のダウンロード回数などの制限あり",
        edge: "cachety",
      },
      {
        criterion: "追跡ツール",
        cachety: C.ads,
        other: "同意に応じてGoogle アナリティクス、Hotjar、Google 広告、Facebook ピクセル、LinkedInのタグを使うとプライバシー通知に記載",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "透かしツールは文字のみ。フォント、サイズ、色、不透明度を調整。全ページに自動で入ります",
      },
      {
        criterion: "透かしが焼き込まれるか",
        cachety: C.flat,
        other: "公開情報では明記されていません",
      },
      {
        criterion: "隠す・パスワード",
        cachety: "どちらもあり（範囲を隠す、AES-256のパスワード）",
        other: "別のツール（墨消し、保護、フラット化）で対応",
      },
      {
        criterion: "宛先ごとのコピー",
        cachety: C.recipients,
        other: "透かしツールの案内には記載がありません",
      },
      {
        criterion: "そのほかのPDF機能",
        cachety: C.tools,
        other: "編集、圧縮、変換など多数。デスクトップ版とスマホアプリもあり",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "「ブラウザで」でも、処理はサーバー" },
      {
        type: "p",
        text: "Smallpdfの透かしページには「ブラウザで」すぐ作れるという案内があります。ただ、同じページのよくある質問では、ファイルはアップロードされ、処理後1時間でサーバーから削除されると説明されています。画面はブラウザでも、処理は同社のサーバーで行われるということです。",
      },
      {
        type: "p",
        text: "削除までの時間にも、2つの書き方があります。ツールのページは「1時間」。一方、2025年7月更新のプライバシー通知では、アカウントなしで使った場合、最後にファイルを開いてから「合理的な期間内」に削除するよう努める、と書かれています。気になる方は両方を読んでおくと安心です。",
      },
      { type: "h2", text: "Cachetyは手元だけで完結" },
      {
        type: "p",
        text: "Cachetyでは、身分証のコピーは最初から最後まであなたの端末の中にあります。送らないので、削除の時期を気にする必要もありません。アクセス解析や広告の追跡ツールも、現在は使っていません。",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Smallpdfが向いている場面" },
      {
        type: "p",
        text: "PDFの文字を直したい、圧縮したい、別の形式に変換したいときは、Smallpdfのほうがずっと多くの道具がそろっています。透かしの文字をPDFの中で選択できるまま残したい場合も、ページを画像にするCachetyより向いているでしょう。",
      },
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "透かしのほかに、PDFの編集、圧縮、変換もまとめて行いたいとき",
      "仕上がったPDFの文字を、選択や検索ができるまま残したいとき",
      "アカウントを作って、ファイルをクラウドに保存しておきたいとき",
    ],
    chooseCachety: [
      "マイナンバーカードや運転免許証のコピーを、他社のサーバーに送りたくないとき",
      "見せたくない番号を隠す作業と、透かしを一度に済ませたいとき",
      "1日の回数制限を気にせず、何枚でも作りたいとき",
    ],
    faq: [
      {
        q: "Smallpdfは安全ですか？",
        a: "Smallpdfは通信を暗号化し、ファイルを自動で削除すると案内しています。ISO認証にも触れています。ただし、ファイルは一度同社のサーバーに送られます。身分証のように手元から出したくない書類は、端末の中で処理するツールを使う方法もあります。",
      },
      {
        q: "Smallpdfで透かしを入れるのにアカウントは必要？",
        a: "透かしツールは登録なしで使えると案内されています。ただし、無料版には1日のダウンロード回数などの制限があります。",
      },
      {
        q: "Smallpdfで画像やロゴの透かしは入れられますか？",
        a: "透かしツール自体は文字のみ対応で、画像はPDF編集ツールで追加するよう案内されています。Cachetyも文字の透かしのみです。",
      },
      {
        q: "Smallpdfの代わりに、ファイルを送らずに透かしを入れるには？",
        a: "Cachetyなら、ブラウザの中だけで透かしを入れられます。ページを開いたあと機内モードにしても動くので、送信されていないことを自分で確かめられます。",
      },
    ],
    sources: [
      { label: "Smallpdf 透かしツールとよくある質問", url: "https://smallpdf.com/jp/watermark-pdf" },
      { label: "Smallpdf プライバシー通知（保存期間、追跡ツール）", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf 料金プラン（無料版の制限）", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Adobe Acrobat
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/jp/acrobat.html",
    title: "CachetyとAdobe Acrobatの比較：無料で透かしを入れたいとき",
    metaTitle: "Adobe Acrobatで透かしは無料？Cachetyと比較",
    description:
      "Adobe AcrobatとCachetyを比較。Acrobatの透かしは有料版の機能で、無料のオンラインツールには見当たりません。Cachetyは無料で、ファイルを端末の外に出しません。",
    intro:
      "PDFといえばAdobe Acrobat、という方も多いでしょう。ところが、身分証のコピーに透かしを入れようとすると、無料のオンラインツールにはその機能が見当たりません。",
    verdict:
      "Acrobatの透かしは、有料のAcrobatの機能です。仕事でPDFを毎日扱い、ロゴの透かしや墨消しまで使うなら、Acrobatは頼れる選択肢です。身分証に文字の透かしを入れるだけなら、Cachetyは無料で、登録もアップロードもいりません。",
    table: [
      {
        criterion: "無料で透かしを入れられるか",
        cachety: "はい。無料で、回数の制限もありません",
        other: "無料のオンラインツール一覧に透かしはなく、有料のAcrobatの機能です",
        edge: "cachety",
      },
      {
        criterion: "ファイルを処理する場所",
        cachety: C.where,
        other: "デスクトップ版はパソコンの中、Acrobatのウェブ版はAdobeのクラウド",
      },
      {
        criterion: "アカウント",
        cachety: C.account,
        other: "有料プランの契約にAdobeアカウントが必要",
        edge: "cachety",
      },
      {
        criterion: "追跡",
        cachety: C.ads,
        other: "サービスの利用状況を追跡するためにクッキーなどを使うとプライバシーポリシーに記載",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "文字または画像。フォント、サイズ、色、不透明度、位置を調整。ページの前面か背面に配置",
      },
      {
        criterion: "ロゴの透かし",
        cachety: C.logo,
        other: "画像ファイルを透かしにできます",
        edge: "other",
      },
      {
        criterion: "墨消し",
        cachety: C.redact,
        other: "Acrobat Proで「機密情報の墨消し」に対応",
      },
      {
        criterion: "パスワード",
        cachety: C.password,
        other: "あり。無料のオンラインツール「PDFを保護」もあり",
      },
      {
        criterion: "そのほかのPDF機能",
        cachety: C.tools,
        other: "編集、結合、分割、墨消し（Pro）など、PDFの機能が一通りそろっています",
        edge: "other",
      },
      {
        criterion: "サポート",
        cachety: "個人のプロジェクトのため、サポート契約はありません",
        other: "Adobeの製品で、会社として提供・サポートされています",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "無料のAcrobatオンラインツールには透かしがない" },
      {
        type: "p",
        text: "Adobeは、PDFの編集、結合、分割、パスワード保護などを無料のオンラインツールとして公開しています。ただ、2026年10月時点の一覧には、透かしを入れるツールはありません。透かしは有料のAcrobatで使う機能です。",
      },
      {
        type: "p",
        text: "有料のAcrobatの透かしは高機能です。文字だけでなく画像も使え、ページの前面にも背面にも置けます。会社の書類にロゴを入れるといった用途には、とても向いています。",
      },
      { type: "h2", text: "身分証の透かしだけなら" },
      {
        type: "p",
        text: "賃貸の申込みや口座開設で身分証のコピーを送るとき、必要なのは「何のためのコピーか」を書き込むことです。そのためだけに有料ソフトを契約しなくても、Cachetyなら無料でできます。ファイルはブラウザの中で処理され、どこにも送られません。",
      },
      AIRPLANE_TIP,
      {
        type: "p",
        text: "Cachetyは、ページ全体に斜めにくり返す文字の透かしを、ページの画像に焼き込みます。隠したい番号を消す機能や、宛先ごとに別々のコピーを作る機能もあります。",
      },
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "すでにAcrobatを契約していて、いつもの画面で作業したいとき",
      "会社のロゴなど、画像の透かしを入れたいとき",
      "PDFの編集や墨消しなど、本格的なPDF作業を毎日するとき",
      "会社として、サポートのある製品を使う必要があるとき",
    ],
    chooseCachety: [
      "身分証のコピーに、無料で文字の透かしを入れたいとき",
      "アカウントを作らず、ファイルも送らずに済ませたいとき",
      "スマホだけで、撮った写真にそのまま透かしを入れたいとき",
    ],
    faq: [
      {
        q: "Adobe Acrobatで無料で透かしを入れられますか？",
        a: "Adobeの無料オンラインツールの一覧には、2026年10月時点で透かしのツールはありません。透かしは有料のAcrobatの機能です。",
      },
      {
        q: "Acrobatの透かしではロゴも使えますか？",
        a: "はい。有料のAcrobatでは、文字だけでなく画像の透かしも入れられ、フォント、サイズ、色、不透明度、位置を調整できます。Cachetyは文字の透かしのみです。",
      },
      {
        q: "Acrobatを持っていなくても身分証に透かしを入れるには？",
        a: "Cachetyなら、ブラウザで cachety.com を開くだけで、無料で文字の透かしを入れられます。登録は不要で、ファイルは端末の外に出ません。",
      },
    ],
    sources: [
      { label: "Adobe Acrobat 無料オンラインツール一覧", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat プランの比較", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe 透かしとは（機能の説明）", url: "https://www.adobe.com/acrobat/resources/what-is-a-watermark.html" },
      { label: "Adobe プライバシーポリシー", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- PDF24
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/ja/",
    title: "CachetyとPDF24の比較：無料の透かしツールの違い",
    metaTitle: "PDF24の透かしとCachetyを比較：身分証に使うなら",
    description:
      "PDF24とCachetyを比較。どちらも無料ですが、PDF24のオンライン版はドイツのサーバーで処理し1時間後に削除、Cachetyは端末の中だけで処理します。違いをやさしく解説。",
    intro:
      "PDF24は、ドイツの会社が作っている無料のPDFツールです。オンライン版のほか、Windows用の無料ソフト「PDF24 Creator」もあります。透かしを入れるならどちらが合うか、比べてみましょう。",
    verdict:
      "どちらも無料で使えます。違いは処理の場所で、PDF24のオンライン版はファイルをドイツのサーバーで処理し、1時間後に自動で削除します。Cachetyはファイルを送りません。Windowsのパソコンで多くのPDF作業をするなら、PDF24 Creatorも良い選択肢です。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: C.where,
        other: "オンライン版はPDF24のサーバー（ドイツ）。Windows用のPDF24 Creatorはパソコンの中",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保存期間",
        cachety: C.retention,
        other: "オンライン版は処理後1時間以内に自動削除。手動でも削除可",
        edge: "cachety",
      },
      {
        criterion: "料金",
        cachety: C.price,
        other: "無料。制限なしと案内されています（企業も無料）",
      },
      {
        criterion: "広告・追跡",
        cachety: C.ads,
        other: "広告収入で無料。Google AdSense、Google アナリティクス、Google リマーケティングを使うとプライバシーポリシーに記載",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "文字。フォント、サイズ、色と透明度、角度、間隔。9か所の位置か、ページ全体に敷き詰め",
      },
      {
        criterion: "透かしが焼き込まれるか",
        cachety: C.flat,
        other: "透かしツールの案内には明記されていません。別のツール「PDFをフラット化」があります",
      },
      {
        criterion: "隠す・パスワード・メタデータ",
        cachety: "まとめて対応（範囲を隠す、パスワード、隠れた情報の削除）",
        other: "別々のツールで対応（墨消し、保護、メタデータの削除）",
      },
      {
        criterion: "宛先ごとのコピー",
        cachety: C.recipients,
        other: "透かしツールの案内には記載がありません",
      },
      {
        criterion: "パソコン用ソフト",
        cachety: "なし（ホーム画面に追加して使えます）",
        other: "Windows用の無料ソフトPDF24 Creatorあり",
        edge: "other",
      },
      {
        criterion: "そのほかのPDF機能",
        cachety: C.tools,
        other: "変換、圧縮、結合、OCRなど多数",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "オンライン版はサーバーで処理" },
      {
        type: "p",
        text: "PDF24の透かしページには、透かしは「クラウドの当社サーバーで追加される」と書かれています。サーバーはドイツにあり、ファイルは1時間後に自動で削除されます。処理用のサーバーはすべてEU内にあると案内されています。",
      },
      {
        type: "p",
        text: "それでも、オンライン版を使えば、身分証のコピーは一度海外のサーバーに送られます。なおPDF24は、ファイルがパソコンの中に残るWindows用の無料ソフト「PDF24 Creator」も用意しています。",
      },
      { type: "h2", text: "Cachetyはスマホでもファイルを送らない" },
      {
        type: "p",
        text: "PDF24 CreatorはWindows用です。iPhoneやAndroidで身分証を撮って、そのまま透かしを入れたいときは、Cachetyが使えます。ブラウザの中で処理するので、スマホでもファイルは送られません。広告や追跡ツールも、現在はありません。",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "PDF24が向いている場面" },
      {
        type: "p",
        text: "PDFの変換や圧縮、OCRなど、透かし以外の作業も多いなら、PDF24の豊富なツールが役立ちます。透かしの位置を9か所から選んだり、角度や間隔を細かく決めたりできるのも便利です。",
      },
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Windowsのパソコンで、インストール型の無料ソフトを使いたいとき（PDF24 Creator）",
      "変換、圧縮、OCRなど、透かし以外のPDF作業もたくさんあるとき",
      "透かしの位置や角度を細かく指定したいとき",
    ],
    chooseCachety: [
      "スマホで撮った身分証に、ファイルを送らずに透かしを入れたいとき",
      "広告や追跡ツールのない画面で作業したいとき",
      "宛先ごとに別々の透かし入りコピーを作りたいとき",
    ],
    faq: [
      {
        q: "PDF24は安全ですか？",
        a: "PDF24はドイツの会社で、オンライン版のファイルは1時間以内にサーバーから削除されると案内しています。ただし、オンライン版ではファイルが一度サーバーに送られます。送りたくない場合は、Windows用のPDF24 CreatorやCachetyのように、端末の中で処理する方法があります。",
      },
      {
        q: "PDF24は本当に無料？",
        a: "はい。PDF24は広告収入で運営されていて、制限なしで無料と案内しています。プライバシーポリシーには、Google AdSenseなどの広告・解析ツールが記載されています。",
      },
      {
        q: "iPhoneでPDF24の代わりに透かしを入れるには？",
        a: "Cachetyはスマホのブラウザで動き、iPhoneの写真（HEIC）もそのまま読み込めます。ホーム画面に追加すれば、アプリのように開けます。",
      },
    ],
    sources: [
      { label: "PDF24 透かしツール", url: "https://tools.pdf24.org/en/add-watermark-to-pdf" },
      { label: "PDF24 よくある質問（サーバーの場所、削除）", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 プライバシーポリシー", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24 ツール一覧", url: "https://tools.pdf24.org/en/all-tools" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- PDFelement
  {
    slug: "cachety-vs-pdfelement",
    competitor: "pdfelement",
    competitorName: "PDFelement",
    competitorUrl: "https://pdf.wondershare.jp/",
    title: "CachetyとPDFelementの比較：透かしだけなら無料で十分？",
    metaTitle: "PDFelementの透かしとCachetyを比較：無料で使うなら",
    description:
      "PDFelementとCachetyを比較。PDFelementは高機能なPDF編集ソフトですが、無料体験版は保存時に透かしが追加されます。身分証に文字の透かしを入れるだけならCachetyも選べます。",
    intro:
      "PDFelementは、Wondershareが提供するPDF編集ソフトです。日本でも「PDF 透かし」で調べるとよく紹介されています。身分証のコピーに透かしを入れる目的で、Cachetyと比べてみます。",
    verdict:
      "PDFelementはパソコンやスマホにインストールして使う、高機能な有料ソフトです。無料体験版では、PDFを保存するときにソフト側の透かしが追加されると案内されています。ロゴの透かしやPDFの本格的な編集をするならPDFelement、身分証に文字の透かしを入れるだけなら無料のCachetyが手軽です。",
    table: [
      {
        criterion: "使い方",
        cachety: "ブラウザで開くだけ。インストール不要",
        other: "Windows、Mac、iOS、Android用のアプリ。クラウドサービスもあり",
      },
      {
        criterion: "無料で使える範囲",
        cachety: C.price,
        other: "無料体験版あり。PDFを保存するときに透かしが追加されます（Windows版の案内より）",
        edge: "cachety",
      },
      {
        criterion: "アカウント",
        cachety: C.account,
        other: "体験版は登録すると使える機能が増えます",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "文字と画像。フォント、サイズ、位置、透明度を調整。タイル状に並べる設定あり",
      },
      {
        criterion: "ロゴの透かし",
        cachety: C.logo,
        other: "画像を透かしにできます",
        edge: "other",
      },
      {
        criterion: "透かしの細かい配置",
        cachety: "斜めのくり返しのみ。大きさ、色、濃さ、書体を選べます",
        other: "9か所の位置とミリ単位の調整。テンプレートとして保存可",
        edge: "other",
      },
      {
        criterion: "宛先ごとのコピー",
        cachety: C.recipients,
        other: "透かしの案内には記載がありません",
      },
      {
        criterion: "そのほかのPDF機能",
        cachety: C.tools,
        other: "編集、変換、OCRなど（一部は有料版のみ）",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "PDFelementの透かし機能" },
      {
        type: "p",
        text: "PDFelementの透かしは細かく作り込めます。文字だけでなく画像も使え、位置は9か所から選んだうえでミリ単位で調整できます。タイル状に並べる設定や、よく使う透かしをテンプレートとして保存する機能もあります。",
      },
      {
        type: "p",
        text: "ただし、PDFelementは有料のソフトです。Windows版の購入ページによると、無料体験版ではPDFを保存するときに透かしが追加されます。身分証のコピーにソフト側の透かしまで入ってしまうと、提出先によっては困るかもしれません。",
      },
      { type: "h2", text: "身分証の透かしだけならCachety" },
      {
        type: "p",
        text: "Cachetyは無料で、保存したファイルにCachety自身の透かしが入ることもありません。ブラウザで開くだけで、ソフトのインストールも登録もいりません。処理はすべて端末の中で行われ、ファイルは送られません。",
      },
      AIRPLANE_TIP,
      {
        type: "p",
        text: "透かしの文字には「本人確認専用」「提出先」「日付」を入れるのがおすすめです。Cachetyには「賃貸申込」などのテンプレートと、今日の日付を入れるボタンがあります。",
      },
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "会社のロゴなど、画像の透かしを細かい位置に入れたいとき",
      "PDFの文字の編集、変換、OCRなど、本格的な作業を日常的にするとき",
      "インストール型のソフトで作業したいとき",
    ],
    chooseCachety: [
      "身分証のコピーに、無料で文字の透かしだけを入れたいとき",
      "ソフトのインストールや登録をしたくないとき",
      "番号を隠す作業や、宛先ごとのコピー作りもまとめて済ませたいとき",
    ],
    faq: [
      {
        q: "PDFelementの無料版で透かしは入れられますか？",
        a: "Windows版の購入ページによると、無料体験版でも多くの機能を試せますが、PDFを保存するときに透かしが追加されます。自分で入れた透かしとは別に、ソフト側の透かしが入る点に注意してください。",
      },
      {
        q: "PDFelementの代わりになる無料の透かしツールは？",
        a: "文字の透かしだけでよければ、Cachetyが無料で使えます。ブラウザで動き、ファイルは端末の外に出ません。ロゴの透かしが必要なら、PDFelementなどの画像に対応したツールが向いています。",
      },
      {
        q: "スマホで身分証に透かしを入れるには？",
        a: "Cachetyはスマホのブラウザで cachety.com を開くだけで使えます。撮った写真を選び、文字を入力してダウンロードするだけです。",
      },
    ],
    sources: [
      {
        label: "PDFelement PDFに透かしを入れる方法（公式）",
        url: "https://pdf.wondershare.jp/pdf-edit/pdf-add-watermark-method.html",
      },
      {
        label: "PDFelement 無料トライアル版と有料版の違い（Windows版）",
        url: "https://pdf.wondershare.jp/store/buy-pdfelement-7-b.html",
      },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Canva
  {
    slug: "cachety-vs-canva",
    competitor: "canva",
    competitorName: "Canva",
    competitorUrl: "https://www.canva.com/ja_jp/",
    title: "CachetyとCanvaの比較：身分証の透かしにはどちらが合う？",
    metaTitle: "Canvaで身分証に透かし？Cachetyとの違い",
    description:
      "CanvaとCachetyを比較。Canvaはロゴ入りの透かしやデザインに強いクラウドサービス、Cachetyは身分証のコピーを端末の外に出さずに文字の透かしを入れる無料ツールです。",
    intro:
      "Canvaは、写真やデザインに透かしを入れるのにも使われる人気のデザインサービスです。でも、身分証のコピーとなると、少し事情が変わります。",
    verdict:
      "Canvaはクラウドのサービスで、使うにはアカウントを作り、ファイルをアップロードします。作品の写真にロゴの透かしを入れるならCanvaがとても便利です。身分証のコピーのように手元から出したくない書類には、端末の中で処理するCachetyが向いています。",
    table: [
      {
        criterion: "ファイルを処理する場所",
        cachety: C.where,
        other: "Canvaのクラウド。ファイルはアップロードされます",
        edge: "cachety",
      },
      {
        criterion: "ファイルの保存期間",
        cachety: C.retention,
        other: "「商業的に合理的な期間、正当な目的がある限り」保存。バックアップも含む（プライバシーポリシーより）",
        edge: "cachety",
      },
      {
        criterion: "アカウント",
        cachety: C.account,
        other: "メールアドレスやGoogleアカウントなどで無料登録",
        edge: "cachety",
      },
      {
        criterion: "広告・追跡",
        cachety: C.ads,
        other: "広告の配信や効果測定のためにクッキーなどを使い、広告ネットワークと情報を共有するとプライバシーポリシーに記載",
        edge: "cachety",
      },
      {
        criterion: "AIの学習",
        cachety: "ファイルを受け取らないため、使われません",
        other: "アップロードした内容をAIの学習に使う場合があると記載。設定でオフにできます",
        edge: "cachety",
      },
      {
        criterion: "透かしの種類",
        cachety: C.type,
        other: "アプリ「Watermark Maker」で文字やロゴ。フォントや不透明度、配置を調整",
      },
      {
        criterion: "ロゴの透かし",
        cachety: C.logo,
        other: "ロゴを透かしにできます",
        edge: "other",
      },
      {
        criterion: "見せたくない部分を隠す",
        cachety: C.redact,
        other: "専用の墨消し機能は確認できませんでした",
      },
      {
        criterion: "デザインの自由度",
        cachety: "透かし専用。デザイン機能はありません",
        other: "写真、SNS投稿、チラシなどを自由にデザインできます",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Canvaは作品を守る透かしに強い" },
      {
        type: "p",
        text: "Canvaでは、アプリ「Watermark Maker」を使って、写真やデザインに文字やロゴの透かしを入れられます。イラストや商品写真をSNSに載せる前に、自分の名前やロゴを入れたい人にはとても便利です。",
      },
      { type: "h2", text: "身分証のコピーでは何が違うのか" },
      {
        type: "p",
        text: "Canvaを使うには、アカウントを作ってファイルをアップロードします。プライバシーポリシーによると、アップロードした内容は、目的がある限り「商業的に合理的な期間」保存され、バックアップにも残ることがあります。また、AIの学習に使われる場合があり、設定でオフにできると書かれています。",
      },
      {
        type: "p",
        text: "デザインの作品なら問題にならないことでも、運転免許証やマイナンバーカードのコピーは別です。氏名、住所、生年月日、顔写真がそろった書類は、なるべく自分の手元から出さないほうが安心です。",
      },
      { type: "h2", text: "Cachetyは書類のための透かし" },
      {
        type: "p",
        text: "Cachetyは、身分証や書類のコピーに「何のためのコピーか」を書き込むための道具です。透かしはページ全体に斜めにくり返し入り、ページの画像に焼き込まれます。ファイルは端末の中だけで処理され、アカウントも不要です。",
      },
      AIRPLANE_TIP,
      CACHETY_LIMITS,
      ...HOW_TO,
    ],
    chooseOther: [
      "イラストや商品写真に、自分のロゴやサインの透かしを入れたいとき",
      "透かしと一緒に、画像のデザインやレイアウトも整えたいとき",
      "すでにCanvaで作品を管理しているとき",
    ],
    chooseCachety: [
      "身分証や通帳など、クラウドに保存したくない書類に透かしを入れるとき",
      "アカウントを作らずに、すぐ透かしを入れたいとき",
      "見せたくない番号を、ファイルから確実に消してから送りたいとき",
    ],
    faq: [
      {
        q: "Canvaで身分証に透かしを入れても大丈夫？",
        a: "Canvaでは、ファイルをアップロードして同社のクラウドに保存します。保存期間は「商業的に合理的な期間」とされています。気になる方は、ファイルを送らずに処理するCachetyのようなツールを検討してください。",
      },
      {
        q: "Canvaで透かしを入れるにはアカウントが必要？",
        a: "Canvaはアカウントを作って使うサービスです。メールアドレスやGoogleアカウントなどで無料登録できます。Cachetyは登録なしで使えます。",
      },
      {
        q: "Canvaにアップロードした画像はAIの学習に使われますか？",
        a: "Canvaのプライバシーポリシーには、アップロードした内容をAIの学習に使う場合があり、プライバシー設定でオフにできると書かれています。",
      },
    ],
    sources: [
      { label: "Canva プライバシーポリシー", url: "https://www.canva.com/policies/privacy-policy/" },
      { label: "Canva ヘルプ：登録とログイン", url: "https://www.canva.com/help/sign-up-log-in-variantb/" },
      { label: "Canva アプリ「Watermark Maker」", url: "https://www.canva.com/apps/AAGa702Tp2E/watermark-maker" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
