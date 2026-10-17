import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (zh). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
// Faits vérifiés le 2026-10-17 sur les pages des éditeurs (voir `sources`).
// Disponibilité en Chine continentale des outils étrangers : non vérifiée, donc jamais affirmée.
// Aucun prix ; rien sur l'aplatissement (ou non) des fichiers produits par les autres outils.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Cases « Cachety » reprises d'une page à l'autre (fiche de faits de l'outil Signer).
const C = {
  role: "自己给文件签字：只有您一个签署人，不发送给别人",
  where: "在您自己的手机或电脑上（浏览器里）完成，文件不会上传",
  account: "不需要注册或登录，免费，没有付费版",
  methods: "手写、输入名字或上传签名照片（自动去掉背景）；签名下方可加日期、地点和一句话；可每页加小签名",
  multi: "不支持：不能发给别人签，也没有签署顺序和提醒",
  evidence: "没有审计记录、时间戳或证书。下载后显示文件指纹（SHA-256），由您自己保存",
  level: "只有通常所说的简单电子签名：放在页面上的一张签名图片",
  identity: "不验证身份",
  retention: "什么都不保存：没有接收文件的服务器，签名只在标签页的内存里",
  mobile: "在手机浏览器里使用，不用装 App",
  ads: "目前没有广告，也没有跟踪工具",
};

// « Comment faire avec Cachety », commun à toutes les pages.
const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "用 Cachety 自己签一份文件" },
  {
    type: "steps",
    items: [
      "用浏览器打开 cachety.com/zh/sign，不用安装，也不用注册。",
      "添加 PDF，或者纸质文件的照片（JPG、PNG、iPhone 的 HEIC 都可以），照片会变成一页 A4 大小的 PDF。可以一次添加好几份。",
      "制作签名：用手指或鼠标手写，输入名字，或者上传一张签名照片。签名下方可以加上日期、地点和一句话，比如「已阅读并同意」。",
      "把签名拖到签字处，拖动角落调整大小。需要的话，打开「每一页也加上小签名」，或者加上写明用途和接收方的水印。",
      "检查预览，下载签好的 PDF，再把下载后显示的文件指纹保存好。",
    ],
  },
];

const AIRPLANE_TIP: GuideBlock = {
  type: "tip",
  text: "文件有没有发出去，您可以自己验证：先打开 cachety.com/zh/sign，然后把手机或电脑切换到飞行模式，再签您的文件。断网也能签完，说明文件没有离开您的设备。",
};

// Niveau de signature : prudent, sans droit local cité (voir les guides zh).
const LEVELS: GuideBlock[] = [
  { type: "h2", text: "简单签名和带证书的签名，差在哪里" },
  {
    type: "p",
    text: "Cachety 放到文件上的，是通常所说的简单电子签名：一张手写、输入或上传的签名图片。对于房屋交接单、家长同意书、报价单这类日常文件，一般来说是够用的。但这张图片本身不带任何证据：如果日后有人提出异议，很难证明是谁签的字，依据该文件主张权利的一方需要自己举证。请保留发送文件时所用的电子邮件或消息。",
  },
  {
    type: "p",
    text: "电子签约平台的做法不同：它们记录每一步操作，可以核验签署人的身份，还能使用电子认证服务机构颁发的证书来签名。这样的签名更容易证明可靠，这是简单签名所没有的。",
  },
];

const CACHETY_LIMITS: GuideBlock = {
  type: "warning",
  text: "Cachety 有做不到的事。它不能把文件发给别人签，没有签署顺序、审计记录、时间戳和证书，也不核验身份。签名是一张图片，和扫描的签名一样，有人可以截下来再用。以下情况不适合用它：要求使用带证书的可靠电子签名时；法律要求本人亲笔书写时；订立遗嘱或办理公证文书时；合同需要通过官方平台备案或签署时；对方坚持使用指定的签约平台时。遇到这些情况，请按对方的要求办理。以上内容不构成法律建议。",
};

export const SIGN_COMPARISONS_ZH: Comparison[] = [
  // ---------------------------------------------------------------- DocuSign
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety 和 DocuSign 对比：自己签一份文件，还是用电子签约平台？",
    metaTitle: "DocuSign vs Cachety：自己签 PDF 还是用签约平台",
    description:
      "DocuSign 是收集多人签名的电子签约平台，有完成证书、审计记录和身份核验。Cachety 免费、不用注册，在浏览器里自己给文件签字，文件不上传。看看两者各适合什么情况。",
    intro:
      "DocuSign 是知名的电子签约平台，适合把合同发给别人签，并留下完整的记录。如果您只是要自己在一份 PDF 上签个字再发回去，Cachety 是另一种更轻的做法。",
    verdict:
      "两者解决的不是同一个问题。DocuSign 用来发起签署：把合同发给一个或多个人，按顺序签字，最后得到完成证书和审计记录，还能核验签署人身份、使用带证书的签名。Cachety 只让您自己在浏览器里签字，文件不上传，得到的是通常所说的简单电子签名。需要多人签署、审计记录或带证书的签名时，请选 DocuSign；只是自己签一份日常文件，又不想注册和上传时，Cachety 更简单。",
    table: [
      { criterion: "用途", cachety: C.role, other: "电子签约平台：把文件发给一个或多个人签署，并收集签名" },
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到 DocuSign 的云端，存放在五个数据中心区域之一（美国、加拿大、欧洲、澳大利亚、日本）", edge: "cachety" },
      { criterion: "账号和费用", cachety: C.account, other: "收件人签字免费，不用账号。发起签署要用发件人账号：30 天免费试用，之后是付费方案", edge: "cachety" },
      { criterion: "多人签署", cachety: C.multi, other: "支持串行、并行和混合的签署顺序，自动提醒、模板和批量发送", edge: "other" },
      { criterion: "签署证据", cachety: C.evidence, other: "所有方案都有完成证书和审计记录，文件用公钥基础设施（PKI）进行数字密封", edge: "other" },
      { criterion: "身份核验", cachety: C.identity, other: "可用短信验证码、电话或证件核验签署人身份", edge: "other" },
      { criterion: "高级和合格签名", cachety: C.level, other: "在欧洲是合格信任服务提供商（QTSP），提供高级电子签名，合格电子签名作为附加功能", edge: "other" },
      { criterion: "签名方式", cachety: C.methods, other: "根据姓名自动生成样式、手写，或上传签名图片（PNG、JPG、BMP、GIF，最大 200 KB）；还有首字母、文字、复选框、下拉框等字段" },
      { criterion: "手机", cachety: C.mobile, other: "有 iOS 和 Android App" },
    ],
    body: [
      { type: "h2", text: "DocuSign 是做什么的" },
      {
        type: "p",
        text: "按照 DocuSign 官网的介绍，发件人可以把文件发给多人签署，设定串行或并行的签署顺序，使用自动提醒、模板和批量发送。每份签好的文件都附有完成证书，所有方案都有审计记录，文件还会用公钥基础设施（PKI）进行数字密封。它支持 44 种签署语言，有 1,100 多个集成和 API。",
      },
      {
        type: "p",
        text: "签署别人发来的文件是免费的，也不需要账号。要自己发起签署，则需要发件人账号：DocuSign 提供 30 天免费试用，之后有 Personal、Standard、Business Pro、Advanced 等付费方案。",
      },
      { type: "h2", text: "文件存放在哪里" },
      {
        type: "p",
        text: "用 DocuSign 签署时，文件会上传到 DocuSign 的云端，存放在它的五个数据中心区域之一。保存多久由客户（也就是发起签署的一方）设定，可以随时清除。这也是审计记录能成立的前提：平台要保存文件和每一步操作。Cachety 的思路相反：网页加载完之后，文件在您的设备上处理，签名只存在于标签页的内存里，什么都不保存，所以也留不下证据。",
      },
      ...LEVELS,
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您要把合同发给对方或多个人签署，并设定签署顺序和自动提醒。",
      "您需要完成证书和审计记录，证明谁在什么时候签了字。",
      "对方或相关规定要求带证书的签名、合格电子签名，或者要核验签署人身份。",
      "对方已经用 DocuSign 把文件发给您：直接在 DocuSign 里签，收件人签字免费，也不用注册。",
    ],
    chooseCachety: [
      "只有您一个人签字，比如房屋交接单、家长同意书、报价单。",
      "您不想注册账号，也不想把文件上传到别人的服务器。",
      "您想用手机拍下纸质文件后直接签，并加上水印或每页的小签名。",
    ],
    faq: [
      {
        q: "用 DocuSign 签字要花钱吗？",
        a: "签署别人发来的文件是免费的，也不需要账号。自己发起签署要用发件人账号：DocuSign 提供 30 天免费试用，之后是付费方案，具体以官网为准。Cachety 完全免费，但只能自己签。",
      },
      {
        q: "Cachety 的签名和 DocuSign 的签名效力一样吗？",
        a: "不一样。Cachety 放到文件上的是一张签名图片，属于通常所说的简单电子签名，没有证书、审计记录和身份核验，一旦有人提出异议，很难证明是谁签的。DocuSign 会生成完成证书和审计记录，还提供带证书的签名。重要的合同，请用后者。",
      },
      {
        q: "别人用 DocuSign 发给我的文件，可以下载下来用 Cachety 签吗？",
        a: "不建议。在 DocuSign 里签，签署才会记进 DocuSign 的审计记录。在 DocuSign 里签字是免费的，也不用注册，按邮件里的链接操作即可。",
      },
      {
        q: "DocuSign 有手机 App 吗？",
        a: "有，iOS 和 Android 都有。Cachety 不需要 App，在手机浏览器里就能签。",
      },
    ],
    sources: [
      { label: "DocuSign：30 天免费试用", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign：免费在线签署文件", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign：方案与价格", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign：电子签名功能", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign eSignature 产品介绍", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign：合格电子签名", url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature" },
      { label: "DocuSign：高级电子签名", url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature" },
      { label: "DocuSign：自定义签名", url: "https://docusign.com/blog/quick-tip-customizing-your-signature" },
      { label: "DocuSign：数据存放区域", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign：数据管理与隐私", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Youtrust (Yousign)
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust（原 Yousign）",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety 和 Youtrust（原 Yousign）对比：法国电子签名平台和浏览器签名工具",
    metaTitle: "Youtrust（原 Yousign）vs Cachety：签 PDF 怎么选",
    description:
      "Youtrust（原 Yousign）是法国的电子签名平台，有带时间戳的证据文件、高级和合格签名。Cachety 免费、不用注册，在浏览器里自己签字，文件不上传。对比两者适合的场景。",
    intro:
      "Yousign 是一家法国电子签名服务商，2026 年 7 月起更名为 Youtrust，服务全部托管在法国。它和 Cachety 都能给 PDF 签字，但定位很不一样。",
    verdict:
      "Youtrust 是完整的电子签名平台：可以邀请他人签署、设定顺序和提醒，每个方案都有带时间戳的证据文件，归档保存 10 年，付费方案还能加购高级签名和合格签名。Cachety 不发送、不核验身份，只让您自己在浏览器里签字，生成通常所说的简单电子签名。需要多人签署、证据文件或带证书的签名时，请选 Youtrust；只是自己签一份日常文件，不想注册也不想上传时，Cachety 更省事。",
    table: [
      { criterion: "用途", cachety: C.role, other: "电子签名平台：自己签署，或邀请他人签署" },
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到 Youtrust，服务只托管在法国；证据文件由 Arkhinéo 归档", edge: "cachety" },
      { criterion: "账号", cachety: C.account, other: "免费版也需要注册账号；另有 One、Plus、Pro 付费方案", edge: "cachety" },
      { criterion: "自己签字", cachety: "不限次数，没有广告", other: "免费版可以不限次数地自己签署，没有广告" },
      { criterion: "邀请他人签署", cachety: C.multi, other: "免费版每月 2 次签署请求；支持审批、签署顺序、自动提醒和模板，可接入 Zapier、HubSpot", edge: "other" },
      { criterion: "签署证据", cachety: C.evidence, other: "每个方案都有带时间戳的证据文件（审计记录），归档保存 10 年", edge: "other" },
      { criterion: "签名级别", cachety: C.level, other: "简单签名（可选一次性验证码）、高级签名（核验证件）、合格签名（视频核验身份）；后两者是 Plus、Pro 方案的付费附加项", edge: "other" },
      { criterion: "身份核验", cachety: C.identity, other: "Plus 方案可在签署前发送短信验证码；高级和合格签名会核验身份", edge: "other" },
      { criterion: "签名方式", cachety: C.methods, other: "手写、输入或上传签名，不用安装 App" },
    ],
    body: [
      { type: "h2", text: "从 Yousign 到 Youtrust" },
      {
        type: "p",
        text: "出版方在官网宣布，从 2026 年 7 月起，Yousign 更名为 Youtrust。过渡期间，产品里可能还会看到「Yousign」的名字，应用预计在 2027 年前完成迁移。服务方是位于法国卡昂的 Youtrust SAS，它在欧盟的合格信任服务提供商名单上。",
      },
      { type: "h2", text: "Youtrust 擅长什么" },
      {
        type: "list",
        items: [
          "三种签名级别：简单签名（可选一次性验证码）、高级签名（核验身份证件）、合格签名（视频核验身份）。按照 Youtrust 的说明，合格签名在法律上等同于手写签名。",
          "邀请他人签署的完整流程：审批、签署顺序、自动提醒、模板，可接入 Zapier、HubSpot；API 是单独的产品。",
          "每个方案都有带时间戳的证据文件，归档保存 10 年。",
          "在网页上手写、输入或上传签名，不用安装 App。",
        ],
      },
      { type: "h2", text: "数据在哪里" },
      {
        type: "p",
        text: "Youtrust 表示其服务只托管在法国，证据文件由 Arkhinéo 归档。按照它的隐私政策，签署证据保存 10 年，身份核验数据保存 90 天。对需要留存证据的合同来说，这样的保存是必要的。Cachety 的思路相反：文件不上传，什么都不保存，所以也留不下任何证据。",
      },
      ...LEVELS,
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要邀请对方或多个人签署，并设定顺序和提醒。",
      "您需要带时间戳的证据文件，或者高级、合格电子签名。",
      "您和欧盟的机构或公司签合同，对方要求符合 eIDAS 的签名，或者希望数据托管在法国。",
    ],
    chooseCachety: [
      "只有您自己签字，而且偶尔才签一次，不想为此注册账号。",
      "您不想把文件上传到任何服务器。",
      "您想用手机拍下纸质文件后直接签，并加上水印。",
    ],
    faq: [
      {
        q: "Yousign 和 Youtrust 是同一个服务吗？",
        a: "是的。按照出版方的公告，Yousign 从 2026 年 7 月起更名为 Youtrust。过渡期间，您可能还会看到 Yousign 的名字。",
      },
      {
        q: "Youtrust 可以免费用吗？",
        a: "有免费版，但需要注册账号。免费版可以不限次数地自己签署，没有广告，每月可以发出 2 次签署请求。更多功能在 One、Plus、Pro 等付费方案里，具体以官网为准。",
      },
      {
        q: "Cachety 能做高级签名或合格签名吗？",
        a: "不能。Cachety 只把一张签名图片放到页面上，属于通常所说的简单电子签名，没有证书、时间戳和身份核验。需要高级或合格签名时，请用 Youtrust 这类提供这些服务的平台。",
      },
      {
        q: "Youtrust 的数据存在哪里？",
        a: "Youtrust 表示其服务只托管在法国，签署证据保存 10 年，身份核验数据保存 90 天。",
      },
    ],
    sources: [
      { label: "Youtrust：Yousign 更名为 Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust 官网", url: "https://www.youtrust.com/" },
      { label: "Youtrust：免费版", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust：价格方案", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust：电子签名级别", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust：签署流程功能", url: "https://youtrust.com/application" },
      { label: "Youtrust：如何签署 PDF", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust：安全与托管", url: "https://youtrust.com/security" },
      { label: "Youtrust：隐私政策", url: "https://youtrust.com/privacy" },
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
    title: "Cachety 和 Adobe Acrobat 对比：在线给 PDF 签字，选哪个？",
    metaTitle: "Adobe Acrobat 签名 vs Cachety：在线签 PDF 对比",
    description:
      "Adobe Acrobat 的在线签名工具在 Adobe 服务器上处理文件，完成签署需要登录。Cachety 免费、不用注册，在浏览器里本地签字。对比两者，以及 Acrobat Sign 适合谁。",
    intro:
      "Adobe 有好几种签名方式：网页上的 Acrobat 在线签名工具，手机上的 Acrobat Reader 和 Adobe Fill & Sign，以及面向企业的 Acrobat Sign。和它们相比，Cachety 只做最简单的那件事：自己签字。",
    verdict:
      "如果要把文件发给多人签署、保留审计记录，或者需要带证书的数字签名，Adobe 的 Acrobat Sign 更合适，它支持在欧盟使用高级和合格电子签名。Acrobat 的在线签名工具用起来也方便，但文件由 Adobe 的服务器处理，完成填写需要登录。Cachety 不上传、不用登录，适合自己签一份日常文件，得到的是通常所说的简单电子签名。",
    table: [
      { criterion: "用途", cachety: C.role, other: "在线工具和 Fill & Sign 用来自己填写、签字；Acrobat Sign 用来发给他人签署" },
      { criterion: "文件在哪里处理", cachety: C.where, other: "在线工具：文件由 Adobe 的服务器处理，不登录保存就会删除；页面没有写明保存多久、在哪个国家", edge: "cachety" },
      { criterion: "账号", cachety: C.account, other: "页面写明，完成可填写表单需要登录", edge: "cachety" },
      { criterion: "签名方式", cachety: C.methods, other: "输入、手写或上传签名图片；可加首字母签名、文字、勾号和线条" },
      { criterion: "邀请他人与审计记录", cachety: C.multi, other: "页面写明，向他人请求签名和查看审计记录可能需要付费的 Acrobat 方案；Acrobat Sign 支持多人签署、模板和审计记录", edge: "other" },
      { criterion: "带证书的签名", cachety: C.level, other: "Adobe 称其基于证书的数字签名符合 eIDAS 合格签名等国际标准；Acrobat Sign 可组合使用普通、高级和合格电子签名，支持 200 多家信任服务提供商", edge: "other" },
      { criterion: "办公软件集成", cachety: "没有", other: "Acrobat Sign 可在 Microsoft Word、Teams、Salesforce、Workday 中使用", edge: "other" },
      { criterion: "手机", cachety: C.mobile, other: "iOS 和 Android 上的 Acrobat Reader 可以签字；iOS 上的 Adobe Fill & Sign 可以拍下纸质表单再填写" },
    ],
    body: [
      { type: "h2", text: "Adobe 的几种签名方式" },
      {
        type: "list",
        items: [
          "Acrobat 在线签名工具：在网页上输入、手写或上传签名图片，还能加首字母签名、文字和勾号。文件由 Adobe 的服务器处理，完成可填写表单需要登录。",
          "Acrobat Reader 和 Adobe Fill & Sign：手机 App。Fill & Sign 是 iOS App，可以拍下纸质表单再填写、签字。",
          "Acrobat Sign：面向企业，可以把文件发给多人签署，使用模板和审计记录，并在 Word、Teams、Salesforce、Workday 中直接使用。",
        ],
      },
      { type: "h2", text: "文件去了哪里" },
      {
        type: "p",
        text: "Adobe 的在线签名页面写着：文件由 Adobe 的服务器安全处理，如果不登录保存，就会被删除。页面没有写明保存多久、服务器在哪个国家。在欧盟，Adobe 的数据控制者是 Adobe Systems Software Ireland Limited。Cachety 没有接收文件的服务器：网页加载完之后，所有处理都在您的设备上完成。",
      },
      { type: "h2", text: "Adobe 怎么说签名的效力" },
      {
        type: "p",
        text: "Adobe 称其电子签名符合美国 ESIGN 法和 UETA 的要求，基于证书的数字签名符合 eIDAS 合格签名等国际标准。具体效力取决于您所在地区的规定和签名的类型。Cachety 不提供带证书的签名。",
      },
      ...LEVELS,
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要把文件发给多人签署，并保留审计记录（Acrobat Sign）。",
      "对方要求带证书的数字签名，或者高级、合格电子签名。",
      "您的工作已经离不开 Word、Teams、Salesforce 等软件，想在里面直接发起签署。",
      "您已经有 Adobe 账号和 Acrobat 方案，习惯在 Acrobat 里处理 PDF。",
    ],
    chooseCachety: [
      "您只想自己签一份文件，不想登录 Adobe 账号。",
      "您不想把文件交给任何服务器处理。",
      "您想在签好的文件上加水印、每页加小签名，并保存文件指纹。",
    ],
    faq: [
      {
        q: "用 Adobe 在线签 PDF 要登录吗？",
        a: "按照 Adobe 的页面，完成可填写表单需要登录。文件由 Adobe 的服务器处理，如果不登录保存，就会被删除。Cachety 不需要任何账号。",
      },
      {
        q: "Adobe Fill & Sign 和 Acrobat Sign 有什么区别？",
        a: "Fill & Sign 是 iOS 上的 App，用来自己填写和签署表单，比如拍下纸质表单再签。Acrobat Sign 是面向企业的服务，用来把文件发给多人签署，有模板和审计记录。",
      },
      {
        q: "Cachety 签的文件和 Adobe 数字签名一样可靠吗？",
        a: "不一样。Adobe 提供基于证书的数字签名，并称其符合 eIDAS 合格签名等国际标准。Cachety 放上去的是一张签名图片，属于简单电子签名，没有证书，一旦有人提出异议就很难证明。日常文件一般够用，重要的合同请用带证书的签名。",
      },
    ],
    sources: [
      { label: "Adobe：Acrobat 在线签名工具", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "App Store：Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe：Acrobat Sign 企业版", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe：eIDAS 合规", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe 隐私政策", url: "https://www.adobe.com/privacy/policy.html" },
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
    title: "Cachety 和 iLovePDF 签名对比：在线签 PDF，文件去了哪里？",
    metaTitle: "iLovePDF 签名 vs Cachety：在线签 PDF 怎么选",
    description:
      "iLovePDF 的签名工具可以邀请他人签署，有审计记录和数字签名，文件要上传到服务器。Cachety 免费、不用注册，在浏览器里本地签字，文件不上传。对比两者各适合谁。",
    intro:
      "iLovePDF 除了合并、压缩、加水印，也有签名工具，背后的签名服务叫 iLoveSign。它既能自己签，也能邀请别人签。Cachety 只做前一件事，而且不上传文件。",
    verdict:
      "iLovePDF 的签名工具功能更多：可以邀请多人签署、设定顺序和提醒，完成后生成审计记录；付费版还有带合格时间戳的数字签名，加上短信验证可以成为 eIDAS 高级电子签名。代价是文件要上传到它的服务器。Cachety 不上传、不用注册，只供您自己签字，得到的是通常所说的简单电子签名。需要多人签署、审计记录或数字签名时，请选 iLovePDF；只是自己签一份日常文件时，Cachety 更私密。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到 iLovePDF 的服务器，在欧洲经济区内处理", edge: "cachety" },
      { criterion: "文件保存多久", cachety: C.retention, other: "上传的文件两小时内删除；已签的文件最多保存 5 年；iLoveSign 的审计记录归档 10 年" },
      { criterion: "签名类型", cachety: C.level, other: "简单签名；付费版有数字签名，嵌入签名的认证哈希和合格时间戳", edge: "other" },
      { criterion: "邀请他人签署", cachety: C.multi, other: "可选「仅我自己」或邀请他人签署，可设签署顺序、截止日期和提醒；邀请他人需要账号", edge: "other" },
      { criterion: "身份核验", cachety: C.identity, other: "短信验证可使签名成为 eIDAS 高级电子签名，也可选择扫描证件", edge: "other" },
      { criterion: "签署证据", cachety: C.evidence, other: "签署完成后生成审计记录", edge: "other" },
      { criterion: "广告", cachety: C.ads, other: "免费基础版有广告", edge: "cachety" },
      { criterion: "签名方式", cachety: C.methods, other: "手写、输入或上传（PNG、JPG、SVG）签名和首字母签名，可加日期和文字" },
      { criterion: "手机", cachety: C.mobile, other: "有 iOS 和 Android App" },
    ],
    body: [
      { type: "h2", text: "iLovePDF 的签名工具能做什么" },
      {
        type: "p",
        text: "按照 iLovePDF 的签名页面，您可以选「仅我自己」，也可以邀请其他人签署，并设定签署顺序、截止日期和提醒，签署完成后会生成审计记录。签名有两种：简单签名，和付费版的数字签名，后者会嵌入签名的认证哈希和合格时间戳。加上短信验证，签名可以成为 eIDAS 高级电子签名，还可以选择扫描证件来核验身份。",
      },
      {
        type: "p",
        text: "iLoveSign 的免费版可以不限次数地自己做简单电子签名。免费的 iLovePDF 基础版有广告，签名文件上限 50 MB，签署请求次数有限；付费版每月可发出 5 次邀请，并提供高级签名和短信验证。",
      },
      { type: "h2", text: "文件去了哪里" },
      {
        type: "p",
        text: "iLovePDF 是位于巴塞罗那的 ILOVEPDF S.L. 的服务，数据在欧洲经济区内处理，官方称已获 ISO/IEC 27001 认证。按照它的安全说明，上传的文件两小时内删除，但已签的文件最多保存 5 年。对需要留证据的签署来说，这是合理的；但如果您只是自己签一份文件，这份文件也要先传到别人的服务器上。Cachety 不上传任何东西。",
      },
      ...LEVELS,
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您要邀请别人签署，并设定签署顺序、截止日期和提醒。",
      "您需要审计记录，或者带合格时间戳的数字签名、eIDAS 高级电子签名。",
      "您同时需要合并、压缩、转换等其他 PDF 工具。",
    ],
    chooseCachety: [
      "只有您自己签字，而且不想把文件上传到服务器。",
      "您不想注册，也不想看广告。",
      "您想在签好的文件上加水印、每页加小签名，并保存文件指纹。",
    ],
    faq: [
      {
        q: "iLovePDF 签名免费吗？",
        a: "iLoveSign 的免费版可以不限次数地自己做简单电子签名。免费的 iLovePDF 基础版有广告，签名文件上限 50 MB，签署请求次数有限。高级签名和短信验证在付费版里，具体以官网为准。",
      },
      {
        q: "iLovePDF 会保存我签的文件吗？",
        a: "按照它的安全说明，上传的文件两小时内删除，但已签的文件最多保存 5 年；iLoveSign 的审计记录归档 10 年。",
      },
      {
        q: "iLovePDF 的数字签名和 Cachety 的签名有什么不同？",
        a: "iLovePDF 的数字签名（付费版）会在文件里嵌入签名的认证哈希和合格时间戳。Cachety 放上去的是一张签名图片，属于简单电子签名，没有证书和时间戳，一旦有人提出异议就很难证明。",
      },
    ],
    sources: [
      { label: "iLovePDF：签署 PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      { label: "iLovePDF：如何在线给 PDF 签名", url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf" },
      { label: "iLovePDF 价格方案", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign 价格方案", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF 安全说明", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF 隐私政策", url: "https://www.ilovepdf.com/help/privacy" },
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
    title: "Cachety 和 Smallpdf 签名对比：不用注册在线签 PDF，哪个更放心？",
    metaTitle: "Smallpdf 签名 vs Cachety：免注册签 PDF 对比",
    description:
      "Smallpdf 签 PDF 不用注册，文件上传后一小时删除，邀请他人签署要用 Sign.com。Cachety 免费，在浏览器里本地签字，文件不上传，也没有跟踪工具。对比两者。",
    intro:
      "Smallpdf 是瑞士公司 Smallpdf AG 的在线 PDF 工具，签名不用注册，上手很快。Cachety 同样不用注册，区别在于文件去了哪里，以及需要别人签字时怎么办。",
    verdict:
      "只是自己签字的话，两者都不用注册，都能手写、输入或上传签名。Smallpdf 会把文件传到服务器，一小时后自动删除（除非存到账号里），在您同意后还会使用 Google Analytics 等跟踪工具；Cachety 不上传、不跟踪。要邀请他人签署、追踪进度、拿到完成证书和数字密封，就需要 Smallpdf 的 Sign.com，这时它是更好的选择。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到服务器（TLS 加密），在欧盟的 Hetzner 服务器上处理，并使用 Cloudflare（美国或欧洲）", edge: "cachety" },
      { criterion: "文件保存多久", cachety: C.retention, other: "一小时后自动删除，除非存到 Smallpdf 账号里", edge: "cachety" },
      { criterion: "账号", cachety: C.account, other: "签署 PDF 不用注册，也不用安装" },
      { criterion: "签名方式", cachety: C.methods, other: "手写、输入或上传签名，可加首字母签名、文字和日期" },
      { criterion: "邀请他人签署", cachety: C.multi, other: "通过 Sign.com 请求他人签名，并追踪进度", edge: "other" },
      { criterion: "签署证据", cachety: C.evidence, other: "Sign.com 提供数字密封和完成证书", edge: "other" },
      { criterion: "免费使用的限制", cachety: "没有次数限制", other: "免费使用每天的下载次数有限；Sign.com 免费版每月的文件数有限", edge: "cachety" },
      { criterion: "跟踪工具", cachety: C.ads, other: "经您同意后，使用 Google Analytics、Google Ads 再营销、Facebook Pixel 和 LinkedIn", edge: "cachety" },
      { criterion: "手机", cachety: C.mobile, other: "有 Android 和 iOS App" },
    ],
    body: [
      { type: "h2", text: "Smallpdf 的签名工具" },
      {
        type: "p",
        text: "按照 Smallpdf 的签名页面，签署 PDF 不用注册，也不用安装：手写、输入或上传签名，再加上首字母签名、文字和日期即可。文件经过 TLS 加密上传，一小时后自动删除，除非您把它存到 Smallpdf 账号里。免费使用每天的下载次数有限。",
      },
      {
        type: "p",
        text: "要请别人签字，Smallpdf 会转到 Sign.com：可以请求签名、追踪进度，并得到数字密封和完成证书。Sign.com 的免费版每月能处理的文件数有限，Smallpdf 的不同页面写的数字不一致，请以官网为准。",
      },
      { type: "h2", text: "隐私：上传和跟踪" },
      {
        type: "p",
        text: "按照 Smallpdf 的隐私政策，文件在欧盟的 Hetzner 服务器上处理，并使用 Cloudflare（美国或欧洲）；数据控制者是位于苏黎世的 Smallpdf AG。经您同意后，网站会使用 Google Analytics、Google Ads 再营销、Facebook Pixel 和 LinkedIn。Cachety 没有接收文件的服务器，目前也没有广告和跟踪工具。",
      },
      { type: "h2", text: "Smallpdf 怎么说签名的效力" },
      {
        type: "p",
        text: "Smallpdf 称其签名具有法律约束力，同时提醒用户查阅当地法律；Sign.com 称其签名符合 eIDAS 标准，但没有说明是哪一级。Cachety 不做这样的承诺：它的签名是放在页面上的一张图片。",
      },
      ...LEVELS,
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您要请别人签字，并追踪签署进度（Sign.com）。",
      "您需要 Sign.com 提供的完成证书和数字密封。",
      "您同时需要压缩、转换、合并等其他 PDF 工具。",
    ],
    chooseCachety: [
      "您只想自己签一份文件，而且不想把它上传到服务器。",
      "您不想要任何跟踪工具，也不想受每天下载次数的限制。",
      "您想在签好的文件上加水印、每页加小签名，并保存文件指纹。",
    ],
    faq: [
      {
        q: "Smallpdf 签名需要注册吗？",
        a: "不需要。按照官网，签署 PDF 不用注册，也不用安装。如果要把文件存在 Smallpdf，就需要账号；请别人签字则要通过 Sign.com。",
      },
      {
        q: "Smallpdf 会保存我的文件吗？",
        a: "官网说，文件一小时后自动删除，除非您把它存到 Smallpdf 账号里。Cachety 不上传文件，所以没有什么需要删除。",
      },
      {
        q: "Smallpdf 说签名有法律约束力，Cachety 呢？",
        a: "Smallpdf 称其签名具有法律约束力，并提醒用户查阅当地法律；Sign.com 称符合 eIDAS 标准，但没有说明是哪一级。Cachety 的签名是放在页面上的图片，属于简单电子签名，没有证书和审计记录，一旦有人提出异议就很难证明。日常文件一般够用，重要的合同请用带证书的签约平台。",
      },
    ],
    sources: [
      { label: "Smallpdf：签署 PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf：电子签名", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf 价格方案", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com：Smallpdf 的签名服务", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf 隐私政策", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
