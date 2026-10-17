import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (ja). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// 署名ツールの比較ページ（日本の読者向け）。ほかのツールについての記述は
// すべて `sources` の公開ページにもとづき、2026-10-17 に確認。料金は載せない。

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Cases « Cachety » reprises d'une page à l'autre (fiche de faits Cachety).
const C = {
  purpose: "自分で書類に署名し、署名済みのPDFをダウンロードする",
  where: "あなたのスマホやパソコンの中（ブラウザ内）。書類はどのサーバーにも送られません",
  account: "登録不要。無料で、有料プランはありません",
  create: "指やマウスで手書き、名前を入力、または署名の写真を読み込み（背景は自動で除去）。署名の下に日付・場所・一言も入れられます",
  signers: "なし。自分の書類に一人で署名します。ほかの人への送信や署名順の設定はできません",
  audit: "監査証跡もタイムスタンプもありません。ダウンロード後にファイルのSHA-256指紋が表示されるので、控えとして保管できます",
  identity: "なし。署名した人が誰かは確認しません",
  level: "いわゆる簡易な電子署名（電子サイン）。署名の画像をページに置くもので、電子証明書は使いません",
  stored: "なし。書類も署名もタブのメモリの中にしかありません",
  ads: "広告もトラッカー（追跡ツール）もありません",
  phone: "スマホのブラウザで動き、アプリは不要。紙の書類を撮った写真はA4サイズのページになります",
};

const LEGAL: GuideBlock[] = [
  { type: "h2", text: "Cachetyで入れた署名の効力は？" },
  {
    type: "p",
    text: "手書きや入力で作り、書類に置いた署名は、いわゆる簡易な電子署名（電子サイン）です。賃貸の書類、学校の同意書、見積書など日常的な書類であれば、多くの場合これで足ります。後で争われたときは、その書類を根拠にする側が、誰が署名したかを示す必要があります。書類を返送したときのメールやメッセージは残しておいてください。電子証明書を使った署名には、簡易な署名にはない、信頼性を示しやすいという強みがあります。",
  },
  {
    type: "warning",
    text: "Cachetyの署名は、スキャンした紙の署名と同じく画像です。それだけでは誰が署名したかも、その後に書類が変更されていないことも証明できず、争われると弱い署名です。電子証明書付きの署名や押印が必要な場合、法律で特別な方式が決まっている場合（遺言や公正証書など）、相手が特定の署名サービスを指定している場合には、Cachetyを使わないでください。これは法的な助言ではありません。",
  },
];

const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "Cachetyで署名する手順" },
  {
    type: "steps",
    items: [
      "スマホかパソコンのブラウザで cachety.com/ja/sign を開きます。インストールも登録も不要です。",
      "PDFか書類の写真を画面にドロップします。複数の書類をまとめて追加できます。",
      "署名を手書きするか、名前を入力するか、署名の写真を読み込みます。必要なら今日の日付を残し、場所や「内容を確認し同意します」のような一言を加えます。",
      "署名を署名欄までドラッグし、大きさを調整します。すべてのページに署名を求められている場合は、そのオプションをオンにします。",
      "プレビューを確認して、署名済みのPDFをダウンロードします。ダウンロード後に表示される指紋は控えとして保管しておきましょう。",
    ],
  },
  {
    type: "tip",
    text: "機内モードテスト：cachety.com/ja/sign を開いたあと機内モードにして、書類に署名してみてください。そのまま動けば、何も端末の外に出ていません。ファイルを受け取るサービスは、インターネットなしでは動きません。",
  },
];

export const SIGN_COMPARISONS_JA: Comparison[] = [
  // ---------------------------------------------------------------- DocuSign
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "CachetyとDocuSignの比較：書類に署名するならどちら？",
    metaTitle: "DocuSignとCachetyを比較：PDFへの署名、送らずに済ませるなら",
    description:
      "DocuSignは複数の相手に署名を依頼し、監査証跡を残す電子契約サービス。Cachetyは自分のPDFに端末の中だけで署名する無料ツールです。違いと使い分けを解説します。",
    intro:
      "DocuSignは、書類を送って相手に署名してもらい、その経過を記録する電子署名サービスです。Cachetyはそれとは別の道具で、届いたPDFに自分で署名するためのものです。登録は不要で、書類はブラウザの外に出ません。",
    verdict:
      "この2つは同じ仕事をする道具ではありません。複数の当事者がいる契約、署名順の指定、本人確認、完了証明書が必要なら、DocuSignを選ぶべきです。賃貸の書類や同意書、見積書に自分で署名して返送するだけなら、Cachetyは無料で1分ほどで済み、書類が端末から出ることもありません。そのかわり、Cachetyの署名は画像による簡易な署名なので、争われると弱くなります。",
    table: [
      {
        criterion: "用途",
        cachety: C.purpose,
        other: "書類を送ってほかの人に署名してもらい、進み具合を確認し、証拠を残す",
      },
      {
        criterion: "書類が置かれる場所",
        cachety: C.where,
        other: "DocuSignのクラウド。米国、カナダ、欧州、オーストラリア、日本の5つのデータセンター地域のいずれか。保存期間は利用者が設定",
        edge: "cachety",
      },
      {
        criterion: "登録と費用",
        cachety: C.account,
        other: "受け取った人はアカウントなしで無料で署名できる。送信側は30日間の無料トライアルのあと有料プラン（Personal、Standard、Business Pro、Advanced）",
        edge: "cachety",
      },
      {
        criterion: "署名の作り方",
        cachety: C.create,
        other: "名前から自動で作るスタイル、手書き、署名の画像の読み込み（PNG、JPG、BMP、GIF、200 KBまで）",
      },
      {
        criterion: "複数の署名者",
        cachety: C.signers,
        other: "順番、同時、その組み合わせで回せる。自動リマインダー、テンプレート、一括送信もあり",
        edge: "other",
      },
      {
        criterion: "署名の証拠",
        cachety: C.audit,
        other: "すべてのプランで完了証明書と監査ログ",
        edge: "other",
      },
      {
        criterion: "本人確認",
        cachety: C.identity,
        other: "SMSのワンタイムパスコード、電話、公的な身分証による確認",
        edge: "other",
      },
      {
        criterion: "署名の種類",
        cachety: C.level,
        other: "書類は公開鍵基盤（PKI）でデジタル封印される。欧州の適格電子署名（QES）は追加オプション",
        edge: "other",
      },
      {
        criterion: "書類に入れられる項目",
        cachety: "署名、日付、場所、一言、すべてのページへの小さな署名",
        other: "イニシャル、テキスト、チェックボックス、ラジオボタン、ドロップダウンなど",
        edge: "other",
      },
      {
        criterion: "スマホ",
        cachety: C.phone,
        other: "iPhone用とAndroid用のアプリあり",
      },
    ],
    body: [
      { type: "h2", text: "役割の違う2つの道具" },
      {
        type: "p",
        text: "DocuSignは、署名を集める側のためのサービスです。取引先に契約書を送る会社、社員に書類を回す人事部、複数の当事者の署名をまとめる不動産会社などが使います。書類をアップロードすると、相手それぞれにリンクが届き、決めた順番で署名していきます。最後に、誰がいつ何をしたかを記録した完了証明書ができあがります。",
      },
      {
        type: "p",
        text: "Cachetyが扱うのは、もっと単純で、よくある場面です。署名して返送してほしいPDFが届いた。手書きか入力で署名を作り、署名欄に置いて、ファイルをダウンロードする。アカウントは作らず、書類がサーバーを通ることもありません。",
      },
      { type: "h2", text: "書類はどこに置かれるか" },
      {
        type: "p",
        text: "DocuSignでは、書類は同社のクラウドに保存されます。データセンターの地域は5つあり、日本もその一つです。保存期間は送信した側が決め、いつでも削除できます。署名の証拠をどこかに残しておく必要があるので、これは当然の仕組みです。Cachetyでは、書類はブラウザのメモリの中で読み込まれ、署名済みのPDFはそのままあなたの端末に保存されます。他社の手元にコピーが残ることはありません。",
      },
      { type: "h2", text: "DocuSignが向いている点" },
      {
        type: "list",
        items: [
          "複数の署名者に、順番どおりまたは同時に署名を依頼でき、自動リマインダーもあります。",
          "すべてのプランで完了証明書と監査ログが付きます。",
          "SMS、電話、公的な身分証で署名者の本人確認ができます。",
          "PKIによるデジタル封印があり、欧州の適格電子署名も追加できます。",
          "44言語での署名、1,100以上の連携先、APIによる自動化に対応しています。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "自分の書類に署名するだけなら、無料で登録もいりません。",
          "書類は端末の外に出ず、機内モードでも動きます。",
          "紙の書類を撮った写真が、A4サイズのページになってそのまま署名できます。",
          "署名済みのPDFからは、隠れた文字、メタデータ、写真の位置情報（GPS）が消えます。パスワードも付けられます。",
          "すべてのページへの小さな署名や、用途・提出先・日付を入れた透かしも追加できます。",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "契約書に複数の人の署名が必要で、順番も決めたいとき",
      "監査証跡、完了証明書、署名者の本人確認が必要なとき",
      "電子証明書を使った署名（高度な署名や適格署名）を求められているとき",
      "会社として署名の依頼を日常的に送り、テンプレートや連携を使いたいとき",
    ],
    chooseCachety: [
      "賃貸の書類、同意書、見積書など、日常の書類に署名して返送するだけのとき",
      "アカウントを作らず、書類をサーバーに送りたくないとき",
      "アプリを入れずに、スマホで紙の書類の写真に署名したいとき",
    ],
    faq: [
      {
        q: "DocuSignは無料で使えますか？",
        a: "誰かがDocuSignで送ってきた書類に署名するだけなら、アカウントなしで無料です。自分から書類を送る場合は、30日間の無料トライアルのあと有料プランになります。",
      },
      {
        q: "Cachetyの署名はDocuSignと同じ効力がありますか？",
        a: "ありません。Cachetyは署名の画像をページに置くだけの簡易な電子署名で、誰がいつ署名したかを記録しません。DocuSignはデジタル封印や監査ログを付け、設定すれば本人確認も行います。争いになったときは、こうした証拠が重みを持ちます。日常的な書類なら、簡易な署名で足りることが多いです。",
      },
      {
        q: "DocuSignで届いた契約書を、Cachetyで署名してもいいですか？",
        a: "おすすめしません。相手がDocuSignで送ってきたのなら、記録が残るDocuSignの中での署名を待っています。届いたリンクから署名してください。Cachetyは、PDFがメールやメッセージで届き、署名して返送するよう頼まれたときのための道具です。",
      },
      {
        q: "DocuSignは書類を保存しますか？",
        a: "はい。同社のクラウドの、いずれかのデータセンター地域に保存されます。保存期間は送信した側が決め、いつでも削除できます。Cachetyには削除するものがありません。書類が送られることがないからです。",
      },
    ],
    sources: [
      { label: "DocuSign 30日間の無料トライアル", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign 受信者は無料・登録不要", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign eSignature のプラン", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign eSignature の機能", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign 署名のカスタマイズ（公式ブログ）", url: "https://docusign.com/blog/quick-tip-customizing-your-signature" },
      {
        label: "DocuSign 適格電子署名（QES）",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature",
      },
      { label: "DocuSign 対応言語と連携", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign データセンターの地域", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign データの管理と保存期間", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Youtrust（旧 Yousign）
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust（旧 Yousign）",
    competitorUrl: "https://www.youtrust.com/",
    title: "CachetyとYoutrust（旧 Yousign）の比較：署名するならどちら？",
    metaTitle: "Youtrust（旧 Yousign）とCachetyを比較：PDFへの署名",
    description:
      "Youtrust（旧 Yousign）は、アカウント制で署名の証拠を保管するフランスの電子署名サービス。端末の中だけで署名するCachetyとの違いを解説します。",
    intro:
      "フランスの電子署名サービスYousignは、2026年7月からYoutrustという名前に変わりました。署名ごとの証拠を保管し、高度な署名や適格署名も用意しています。Cachetyは、ブラウザの中で自分のPDFに署名するだけの、登録不要のシンプルな道具です。",
    verdict:
      "ほかの人に署名を依頼したい、タイムスタンプ付きの証拠ファイルを残したい、高度な署名や適格署名が必要、という場合はYoutrustを選ぶべきです。日常の書類に署名して返送するだけなら、Cachetyは登録なしで、ファイルを端末の外に出さずに済みます。ただし、Cachetyの署名は画像による簡易な署名で、争われると弱くなります。",
    table: [
      {
        criterion: "用途",
        cachety: C.purpose,
        other: "署名と署名依頼。シンプル、高度、適格の3つのレベル",
      },
      {
        criterion: "書類が置かれる場所",
        cachety: C.where,
        other: "Youtrustのサーバー。ホスティングはフランス国内のみ。証拠はArkhinéoが保管",
        edge: "cachety",
      },
      {
        criterion: "アカウント",
        cachety: "登録不要",
        other: "無料プランも含めて必要",
        edge: "cachety",
      },
      {
        criterion: "無料プラン",
        cachety: "すべて無料。有料プランはありません",
        other: "広告なし。自分の書類への署名は無制限、署名依頼は月2件まで。有料プランはOne、Plus、Pro",
      },
      {
        criterion: "署名の証拠",
        cachety: C.audit,
        other: "すべてのプランで、タイムスタンプ付きの証拠ファイルを10年間保管",
        edge: "other",
      },
      {
        criterion: "署名のレベル",
        cachety: C.level,
        other: "シンプル（任意で確認コード）、高度（身分証による本人確認）、適格（ビデオによる本人確認）。高度と適格はPlus・Proの有料オプション",
        edge: "other",
      },
      {
        criterion: "署名の流れ",
        cachety: C.signers,
        other: "承認、署名者の順番、自動リマインダー、テンプレート。ZapierやHubSpotと連携。APIは別製品",
        edge: "other",
      },
      {
        criterion: "署名の作り方",
        cachety: C.create,
        other: "手書き、入力、画像の読み込み。インストール不要",
      },
      {
        criterion: "保管されるもの",
        cachety: C.stored,
        other: "プライバシーポリシーによると、署名の証拠は10年間、本人確認のデータは90日間",
      },
    ],
    body: [
      { type: "h2", text: "YousignはYoutrustになりました" },
      {
        type: "p",
        text: "Yousignは2026年7月から、Youtrustという名前を使っています。運営するYoutrust SASは、フランスのカーンにある会社です。移行期間中はアプリにYousignの名前が残っていることがあり、移行は2027年までに終わる予定です。Yousignを使ったことがあるなら、同じサービスです。",
      },
      { type: "h2", text: "役割の違う2つの道具" },
      {
        type: "p",
        text: "Youtrustは電子署名サービスです。書類を送り、署名者を招待し、誰が署名したかを確認でき、最後にタイムスタンプ付きの証拠ファイルが残ります。同社は、自社の署名は欧州の規則eIDASに準拠し、EUと英国で有効で、画像やスキャンだけの署名とは違って法的に執行できると説明しています。日本で使う書類の場合は、どんな署名なら受け付けてもらえるか、提出先に確認してください。",
      },
      {
        type: "p",
        text: "Cachetyは、誰にも何も送りません。PDFが届いて、署名して返送するよう頼まれたときのための道具です。署名を置いてファイルをダウンロードし、メールに返信するだけです。",
      },
      { type: "h2", text: "書類はどこに置かれるか" },
      {
        type: "p",
        text: "Youtrustでは、書類はフランス国内だけでホスティングされている同社のサーバーに置かれ、署名の証拠は10年間保管されます。これはサービスの一部で、何年たっても、誰がいつ署名したかを示せるようにするためのものです。Cachetyでは書類が端末から出ないので、第三者のもとに記録が残ることもありません。署名が争われたとき手元にあるのは、あなたのPDFとその指紋、そして送ったときのメールやメッセージだけです。",
      },
      { type: "h2", text: "Youtrustが向いている点" },
      {
        type: "list",
        items: [
          "無料プランも含むすべてのプランで、タイムスタンプ付きの証拠ファイルを10年間保管します。",
          "本人確認付きの高度な署名や適格署名を、有料オプションで使えます。",
          "EUの適格トラストサービス事業者のリストに載っています。",
          "署名者の順番、承認、自動リマインダー、テンプレートがあります。",
          "Plusプランでは、署名の前にSMSのアクセスコードを求められます。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "アカウントを作る必要がなく、ページを開けばすぐ署名できます。",
          "書類は端末の外に出ず、機内モードでも動きます。",
          "紙の書類を撮った写真が、A4サイズのページになってそのまま署名できます。",
          "署名済みのPDFからは、隠れた文字、メタデータ、写真の位置情報（GPS）が消えます。パスワードも付けられます。",
          "複数の書類にまとめて署名でき、必要ならすべてのページに小さく署名を入れられます。",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "ほかの人の署名を、順番やリマインダー付きで集めたいとき",
      "タイムスタンプ付きの証拠ファイルを何年も残したいとき",
      "本人確認付きの高度な署名や適格署名を求められているとき",
      "欧州の取引先とのやりとりで、フランス国内でホスティングされるサービスを使いたいとき",
    ],
    chooseCachety: [
      "日常の書類に署名して返送するだけのとき",
      "アカウントを作らず、サーバーに書類のコピーを残したくないとき",
      "複数のPDFや書類の写真に、まとめて無料で署名したいとき",
    ],
    faq: [
      {
        q: "YousignとYoutrustは同じサービスですか？",
        a: "はい。Yousignは、2026年7月からYoutrustという名前になると発表しました。移行期間中は、アプリに旧名が表示されることがあります。",
      },
      {
        q: "Youtrustに無料プランはありますか？",
        a: "あります。アカウントは必要ですが、広告はなく、自分の書類への署名は無制限、署名依頼は月2件まで送れます。証拠ファイルも無料プランに含まれます。",
      },
      {
        q: "Cachetyの署名はYoutrustと同じ効力がありますか？",
        a: "ありません。Cachetyの署名は画像で、証拠ファイルも本人確認もありません。Youtrust自身も、画像やスキャンだけの署名は弱いと説明しています。日常的な書類なら簡易な署名で足りることが多いですが、争いになりそうな書類には、証拠を残すサービスを選んでください。",
      },
      {
        q: "Youtrustは書類をどこに保管しますか？",
        a: "同社のセキュリティのページによると、ホスティングはフランス国内のみです。署名の証拠は10年間保管されます。",
      },
    ],
    sources: [
      { label: "Youtrust YousignからYoutrustへ", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust 無料プラン", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust プラン", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust 署名のレベル", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust アプリの機能", url: "https://youtrust.com/application" },
      { label: "Youtrust PDFに署名する方法", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust セキュリティとホスティング", url: "https://youtrust.com/security" },
      { label: "Youtrust プライバシーポリシー", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Adobe Acrobat
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "CachetyとAdobe Acrobatの比較：PDFに署名するならどちら？",
    metaTitle: "Adobe AcrobatとCachetyを比較：PDFに署名するなら",
    description:
      "Adobe AcrobatとCachetyでPDFに署名するときの違い。ファイルはどこで処理されるか、ログインは必要か、Acrobatの証明書付き署名が必要になるのはどんなときかを解説。",
    intro:
      "AdobeのAcrobatには、署名の方法がいくつかあります。オンラインツールの「PDFに署名」、アプリのAdobe Fill & Sign、そして企業向けのAcrobat Signです。Cachetyができるのは一つだけで、ブラウザの中で書類に署名することです。ファイルは送られず、ログインもいりません。",
    verdict:
      "ほかの人に署名を依頼したい、監査証跡がほしい、証明書を使ったデジタル署名が必要、という場合はAcrobatを選ぶべきです。日常的なPDFに署名して返送するだけなら、Cachetyはファイルを送らず、アカウントも求めません。Cachetyの署名は画像による簡易な署名で、証明書付きの署名よりずっと争われやすいものです。",
    table: [
      {
        criterion: "用途",
        cachety: C.purpose,
        other: "オンラインでPDFに署名、署名の依頼。Acrobat Signでは会社での署名業務をまとめて管理",
      },
      {
        criterion: "書類を処理する場所",
        cachety: C.where,
        other: "Adobeのサーバー。サインインして保存しない限り削除される。期間と国は書かれていない",
        edge: "cachety",
      },
      {
        criterion: "アカウント",
        cachety: "登録不要",
        other: "ツールのページに、入力可能なフォームを完成させるにはサインインが必要と書かれている",
        edge: "cachety",
      },
      {
        criterion: "署名の作り方",
        cachety: C.create,
        other: "入力、手書き、署名の画像の読み込み",
      },
      {
        criterion: "書類に入れられる項目",
        cachety: "署名、日付、場所、一言、すべてのページへの小さな署名",
        other: "署名、イニシャル、テキスト、チェックマーク、線",
      },
      {
        criterion: "署名の依頼と監査証跡",
        cachety: C.signers,
        other: "可能。ただし有料のAcrobatプランが必要な場合がある。Acrobat Signは複数の署名者への送信、テンプレート、監査証跡に対応",
        edge: "other",
      },
      {
        criterion: "証明書を使った署名",
        cachety: C.level,
        other: "証明書ベースのデジタル署名。Adobeによると、eIDASの適格レベルなどの国際基準を満たす。Acrobat Signは200以上のトラストサービス事業者に対応",
        edge: "other",
      },
      {
        criterion: "ほかのアプリとの連携",
        cachety: "なし。ウェブページで使う道具です",
        other: "Acrobat SignはMicrosoft Word、Teams、Salesforce、Workdayの中で使える",
        edge: "other",
      },
      {
        criterion: "スマホ",
        cachety: C.phone,
        other: "署名機能のあるAcrobat Readerアプリ（iPhone・Android）と、紙のフォームを撮影できるAdobe Fill & Sign（iPhone）",
      },
    ],
    body: [
      { type: "h2", text: "Acrobatの署名ツールはいくつかある" },
      {
        type: "p",
        text: "Adobeで署名するというとき、指しているものは3つあります。サイト上で動くオンラインツールの「PDFに署名」、iPhoneでフォームに記入して署名できるアプリのAdobe Fill & Sign、そして複数の署名者に書類を送り、テンプレートや監査証跡を使える企業向けのAcrobat Signです。このページでは主に、Cachetyにいちばん近いオンラインツールと比べています。",
      },
      { type: "h2", text: "書類はどこに置かれるか" },
      {
        type: "p",
        text: "Adobeのオンラインツールは、PDFを同社のサーバーに送ります。ページには、ファイルは安全に扱われ、サインインして保存しない限り削除されると書かれていますが、いつ削除されるのか、どの国で処理されるのかは書かれていません。Cachetyでは、PDFはブラウザのメモリの中で読み込まれ、署名済みのファイルはそのままあなたの端末に保存されます。",
      },
      { type: "h2", text: "Acrobatが向いている点" },
      {
        type: "list",
        items: [
          "証明書ベースのデジタル署名があり、AdobeはeIDASの適格レベルを満たすと説明しています。",
          "Acrobat Signなら、複数の署名者、テンプレート、監査証跡が使えます。",
          "Microsoft Word、Teams、Salesforce、Workdayと連携できます。",
          "紙のフォームを撮影できるFill & Signなど、スマホアプリがあります。",
          "チェックマークや線など、書類に入れられる項目が多くあります。",
        ],
      },
      {
        type: "p",
        text: "Adobeはまた、自社の電子署名は米国の法律であるESIGN法とUETAのもとで法的に十分だと説明しています。日本で使う書類なら、基準になるのは日本のルールと、相手が何を受け付けるかです。",
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "署名済みの書類をダウンロードするときも、ログインはいりません。",
          "書類は端末の外に出ず、機内モードでも動きます。",
          "紙の書類を撮った写真が、スマホのブラウザだけでA4サイズのページになります。",
          "署名済みのPDFからは、隠れた文字、メタデータ、写真の位置情報（GPS）が消えます。パスワードも付けられます。",
          "複数の書類にまとめて署名でき、用途・提出先・日付を入れた透かしも追加できます。",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "証明書を使ったデジタル署名を求められているとき",
      "複数の人に書類を送って署名してもらい、監査証跡も残したいとき",
      "会社でWord、Teams、Salesforceを使っていて、その中で署名したいとき",
      "すでにAdobeのアカウントがあり、書類をそこに保存したいとき",
    ],
    chooseCachety: [
      "どのアカウントにもログインせず、PDFに署名して返送したいとき",
      "書類をサーバーに送りたくないとき",
      "紙の書類しか手元になく、スマホのブラウザでその写真に署名したいとき",
    ],
    faq: [
      {
        q: "AdobeのサイトでPDFに署名するにはアカウントが必要ですか？",
        a: "「PDFに署名」のページには、入力可能なフォームを完成させるにはサインインが必要と書かれています。Cachetyにはアカウントがなく、ページを開けばすぐ署名できます。",
      },
      {
        q: "AdobeはPDFを保存しますか？",
        a: "ツールのページによると、ファイルはAdobeのサーバーで扱われ、サインインして保存しない限り削除されます。いつ削除されるかは書かれていません。",
      },
      {
        q: "Cachetyの署名とAcrobatのデジタル署名はどう違いますか？",
        a: "Cachetyの署名は、ページに置いた画像で、簡易な電子署名です。Acrobatのデジタル署名は電子証明書を使い、署名を署名者に結び付け、その後に書類が変更されたかどうかを示せます。証明書付きの署名を求められたら、Acrobatのようなツールを使ってください。",
      },
      {
        q: "Adobe Fill & SignとCachetyは同じことができますか？",
        a: "一部は同じです。どちらも紙のフォームの写真に署名できます。Fill & SignはiPhoneのアプリで、Cachetyはどのスマホやパソコンでもブラウザで動き、書類を送りません。",
      },
    ],
    sources: [
      { label: "Adobe オンラインでPDFに署名", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "App Store Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe 企業向けAcrobat Sign", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe eIDASへの対応", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe プライバシーポリシー", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- iLovePDF
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "CachetyとiLovePDFの比較：PDFに署名するならどちら？",
    metaTitle: "iLovePDFとCachetyを比較：PDFへの電子署名",
    description:
      "iLovePDFとCachetyでPDFに署名するときの違い。ファイルのアップロード、アカウント、広告、監査証跡、デジタル署名を比べ、どちらが向いているかを解説します。",
    intro:
      "バルセロナの会社が運営するiLovePDFには、電子署名サービスiLoveSignと連動した「PDFに署名」ツールがあります。自分だけで署名することも、ほかの人を招待することもできます。Cachetyは自分の書類に署名するだけの道具で、ファイルを送らずに済ませます。",
    verdict:
      "iLovePDFには簡易な署名のほか、Premiumでは証明済みハッシュと適格タイムスタンプを埋め込むデジタル署名があり、招待、署名順、監査証跡にも対応しています。複数の当事者がいる契約や、証拠が必要な書類ならiLovePDFを選ぶべきです。日常の書類に自分で署名するだけなら、Cachetyはファイルを送らず、広告もアカウントもありません。そのかわり署名は画像なので、争われると弱くなります。",
    table: [
      {
        criterion: "書類を処理する場所",
        cachety: C.where,
        other: "欧州経済領域（EEA）内のiLovePDFのサーバー。ファイルは2時間以内に削除、署名済みの書類は最長5年保管",
        edge: "cachety",
      },
      {
        criterion: "アカウント",
        cachety: "登録不要",
        other: "ほかの人に署名を依頼するには必要",
      },
      {
        criterion: "署名の種類",
        cachety: C.level,
        other: "簡易な署名と、Premiumでは証明済みハッシュと適格タイムスタンプをPDFに埋め込むデジタル署名",
        edge: "other",
      },
      {
        criterion: "複数の署名者",
        cachety: C.signers,
        other: "「自分だけ」か「ほかの人を招待」を選べる。署名順、有効期限、リマインダーあり",
        edge: "other",
      },
      {
        criterion: "署名の証拠",
        cachety: C.audit,
        other: "署名完了後に監査証跡を作成。iLoveSignの料金ページでは10年間の保管と案内",
        edge: "other",
      },
      {
        criterion: "本人確認",
        cachety: C.identity,
        other: "SMSによる確認でeIDASの高度な電子署名になる。身分証のスキャンも選べる",
        edge: "other",
      },
      {
        criterion: "署名の作り方",
        cachety: C.create,
        other: "手書き、入力、画像の読み込み（PNG、JPG、SVG）。イニシャル、日付、テキスト欄も",
      },
      {
        criterion: "広告と無料プランの制限",
        cachety: "広告もトラッカーも有料プランもありません",
        other: "無料のBasicプランには広告があり、署名は50 MBまで、署名依頼の数にも制限あり",
        edge: "cachety",
      },
      {
        criterion: "スマホ",
        cachety: C.phone,
        other: "iPhone用とAndroid用のアプリあり",
      },
    ],
    body: [
      { type: "h2", text: "簡易な署名とデジタル署名" },
      {
        type: "p",
        text: "iLovePDFの署名には2種類あります。簡易な署名はCachetyと似ていて、手書きや入力、画像で署名を作り、ページに置きます。Premiumのデジタル署名はさらに一歩進んでいて、証明済みのハッシュと適格タイムスタンプをPDFに埋め込みます。これによって、その後に書類が変更されていないことを示しやすくなります。SMSによる確認を加えると、欧州のeIDASでいう高度な電子署名になります。",
      },
      {
        type: "p",
        text: "Cachetyができるのは前者だけで、証明書もタイムスタンプもない簡易な電子署名です。そのかわり、書類は端末の外に出ません。",
      },
      { type: "h2", text: "書類はどこに置かれるか" },
      {
        type: "p",
        text: "iLovePDFでは、PDFは欧州経済領域内にある同社のサーバーに送られます。セキュリティのページによると、ファイルは2時間以内に削除され、署名済みの書類は最長5年保管されます。同社は情報セキュリティの国際規格ISO/IEC 27001の認証を取得しています。Cachetyでは書類を受け取るサーバーがないので、削除するものもありません。",
      },
      { type: "h2", text: "iLovePDFが向いている点" },
      {
        type: "list",
        items: [
          "Premiumでは、証明済みハッシュと適格タイムスタンプ付きのデジタル署名が使えます。",
          "ほかの人を招待でき、署名順、有効期限、リマインダーを設定できます。",
          "署名が終わると監査証跡が作られます。",
          "SMSによる確認や身分証のスキャンができます。",
          "同じサイトにほかのPDFツールが多くあり、スマホアプリもあります。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "書類は端末の外に出ず、機内モードでも動きます。",
          "広告もアカウントも有料プランもありません。",
          "紙の書類を撮った写真が、A4サイズのページになってそのまま署名できます。",
          "署名済みのPDFからは、隠れた文字、メタデータ、写真の位置情報（GPS）が消えます。パスワードも付けられます。",
          "ダウンロード後に、ファイルごとのSHA-256指紋が表示され、控えとして保管できます。",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "ほかの人を招待して、決めた順番で署名してもらいたいとき",
      "監査証跡や、適格タイムスタンプ付きのデジタル署名が必要なとき",
      "SMSや身分証による本人確認付きの、高度な署名を求められているとき",
      "ほかのPDF作業でもiLovePDFを使っていて、まとめて済ませたいとき",
    ],
    chooseCachety: [
      "日常の書類に署名して返送するだけのとき",
      "2時間であっても、書類をサーバーに置きたくないとき",
      "広告なし、アカウントなしで署名したいとき",
    ],
    faq: [
      {
        q: "iLovePDFは署名済みの書類を保存しますか？",
        a: "セキュリティのページによると、ファイルは2時間以内に削除されますが、署名済みの書類は最長5年保管されます。Cachetyでは、書類が送られることはありません。",
      },
      {
        q: "iLovePDFの簡易な署名とデジタル署名はどう違いますか？",
        a: "簡易な署名は、Cachetyと同じようにページに署名を置くものです。Premiumのデジタル署名は、証明済みハッシュと適格タイムスタンプをPDFに埋め込み、その後に書類が変更されたかどうかを示せるようにします。",
      },
      {
        q: "Cachetyの署名に監査証跡はありますか？",
        a: "ありません。Cachetyは、誰がいつ署名したかを記録しません。ダウンロード後にファイルのSHA-256指紋を表示するので、自分が署名した版を見分ける助けにはなりますが、監査証跡の代わりにはなりません。必要なら、iLovePDFのようなサービスを使ってください。",
      },
    ],
    sources: [
      { label: "iLovePDF PDFに署名", url: "https://www.ilovepdf.com/sign-pdf" },
      {
        label: "iLovePDF PDFに署名する方法（公式ブログ）",
        url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf",
      },
      { label: "iLovePDF 料金プラン", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign 電子署名のプラン", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF セキュリティ", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF プライバシーポリシー", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Smallpdf
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "CachetyとSmallpdfの比較：PDFに署名するならどちら？",
    metaTitle: "SmallpdfとCachetyを比較：登録なしでPDFに署名",
    description:
      "SmallpdfもCachetyも、登録なしでPDFに署名できます。違いは、Smallpdfはファイルを自社のサーバーに送り、Cachetyは端末の中だけで署名することです。",
    intro:
      "チューリッヒの会社が運営するSmallpdfには、登録もインストールもいらない「PDFに署名」ツールがあります。ほかの人に署名を依頼するときは、Sign.comというサービスを使います。Cachetyも登録はいりませんが、書類は端末の外に出ません。",
    verdict:
      "自分で署名するだけなら、使い方はよく似ています。手書き、入力、画像のいずれかで署名を作り、アカウントは作りません。違うのはファイルの置き場所です。Smallpdfは自社のサーバーで処理して1時間後に削除し、Cachetyは何も送りません。ほかの人に署名を依頼し、進み具合を確認して完了証明書を受け取りたいなら、Sign.comと組み合わせたSmallpdfを選ぶべきです。",
    table: [
      {
        criterion: "アカウント",
        cachety: "登録不要",
        other: "署名するだけなら登録もインストールも不要",
      },
      {
        criterion: "書類を処理する場所",
        cachety: C.where,
        other: "Smallpdfのサーバー（通信はTLSで暗号化）。プライバシーポリシーには、EU内のHetznerのサーバーとCloudflareの記載あり",
        edge: "cachety",
      },
      {
        criterion: "保存期間",
        cachety: "削除するものがありません。Cachetyは書類を受け取りません",
        other: "Smallpdfのアカウントに保存しない限り、1時間後に自動で削除",
        edge: "cachety",
      },
      {
        criterion: "署名の作り方",
        cachety: C.create,
        other: "手書き、入力、画像の読み込み。イニシャル、テキスト、日付も追加可",
      },
      {
        criterion: "ほかの人への署名依頼",
        cachety: C.signers,
        other: "Sign.comで可能。進み具合の確認、デジタルシール、完了証明書あり",
        edge: "other",
      },
      {
        criterion: "無料で使う場合",
        cachety: "無料で、有料プランもダウンロードの上限もありません。処理はすべて端末の中です",
        other: "無料利用には1日のダウンロード上限あり。Sign.comの無料版は月に送れる書類の数に制限あり",
        edge: "cachety",
      },
      {
        criterion: "追跡",
        cachety: C.ads,
        other: "同意した場合、Google Analytics、Google広告のリマーケティング、Facebookピクセル、LinkedIn",
        edge: "cachety",
      },
      {
        criterion: "効力についての説明",
        cachety: "簡易な電子署名（画像）。それだけでは誰が署名したかを示せず、争われると弱い",
        other: "Sign.comはeIDASの基準で有効と説明（レベルの記載なし）。Smallpdfは法的拘束力があるとしつつ、各地の法律を確認するよう案内",
      },
      {
        criterion: "スマホ",
        cachety: C.phone,
        other: "Android用とiPhone用のアプリあり",
      },
    ],
    body: [
      { type: "h2", text: "使い方は似ていても、ファイルの通り道が違う" },
      {
        type: "p",
        text: "SmallpdfでもCachetyでも、手順はほぼ同じです。ページを開き、署名を作り、署名欄に置いて、PDFをダウンロードする。登録もいりません。違いは画面には表れません。Smallpdfでは、ファイルは暗号化された通信で同社のサーバーに送られ、そこで処理され、アカウントに保存しなければ1時間後に削除されます。Cachetyでは、ファイルがブラウザの外に出ることはありません。",
      },
      {
        type: "p",
        text: "Smallpdfのプライバシーポリシーには、同意した場合にGoogle Analytics、Google広告のリマーケティング、Facebookピクセル、LinkedInなどを使うとも書かれています。Cachetyには広告もトラッカーもありません。",
      },
      { type: "h2", text: "Smallpdfが向いている点" },
      {
        type: "list",
        items: [
          "Sign.comで、ほかの人に署名を依頼し、進み具合を確認できます。",
          "Sign.comで送った書類には、デジタルシールと完了証明書が付きます。",
          "署名やイニシャルのほかに、テキストや日付の欄も入れられます。",
          "同じサイトにほかのPDFツールが多くあり、スマホアプリもあります。",
        ],
      },
      { type: "h2", text: "Cachetyが役立つ点" },
      {
        type: "list",
        items: [
          "書類は端末の外に出ず、機内モードでも動きます。",
          "トラッカーも広告も、1日の上限もありません。",
          "紙の書類を撮った写真が、A4サイズのページになってそのまま署名できます。",
          "署名済みのPDFからは、隠れた文字、メタデータ、写真の位置情報（GPS）が消えます。パスワードも付けられます。",
          "すべてのページへの小さな署名や、用途・提出先・日付を入れた透かしも追加できます。",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "ほかの人に書類を送って署名してもらい、誰が署名したかを確認したいとき",
      "Sign.comのようなデジタルシールや完了証明書がほしいとき",
      "ほかのPDF作業でもSmallpdfを使っていて、まとめて済ませたいとき",
    ],
    chooseCachety: [
      "1時間であっても、書類をアップロードせずに署名したいとき",
      "広告のためのトラッカーがないサイトを使いたいとき",
      "たくさんの書類に署名するので、1日の上限を気にしたくないとき",
    ],
    faq: [
      {
        q: "Smallpdfで署名するのに登録は必要ですか？",
        a: "必要ありません。署名のページには、アカウントの作成もインストールもいらないと書かれています。Cachetyも登録は不要です。違いは、Smallpdfがファイルを自社のサーバーに送ることです。",
      },
      {
        q: "SmallpdfはPDFをどのくらい保存しますか？",
        a: "ツールのページによると、Smallpdfのアカウントに保存しない限り、ファイルは1時間後に自動で削除されます。",
      },
      {
        q: "Smallpdfの署名はCachetyより強いですか？",
        a: "自分で署名するだけなら、どちらもページに署名を置くものです。Sign.comで署名を依頼すると、Cachetyにはないデジタルシールと完了証明書が付きます。Smallpdf自身も、各地の法律を確認するよう案内しています。日常的な書類なら、簡易な署名で足りることが多いです。",
      },
    ],
    sources: [
      { label: "Smallpdf PDFに署名", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf 電子署名", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf 料金プラン", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com（Smallpdf）", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf プライバシーポリシー", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
