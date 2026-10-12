// Pages comparatives en chinois simplifié (« Cachety 和 X 对比 »), pour des lecteurs en Chine continentale.
// Faits vérifiés le 2026-10-11 sur les pages des éditeurs (voir `sources`).
// Disponibilité en Chine continentale des outils étrangers : non vérifiée, donc jamais affirmée.

import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "./types";

const CHECKED = "2026-10-11";
const UPDATED = "2026-10-12";

// Cases « Cachety » reprises d'une page à l'autre (fiche de faits Cachety).
const C = {
  where: "在您自己的手机或电脑上（浏览器里）完成，文件不会发出去",
  retention: "不保存。根本没有接收文件的服务器",
  account: "不需要注册或登录",
  price: "免费，没有付费版",
  ads: "目前没有广告，也没有跟踪工具",
  type: "只有文字水印，沿斜线铺满整页",
  flat: "每一页重新生成为图片，水印直接画进去，编辑 PDF 也去不掉",
  redact: "有。框住的部分会从文件里真正删除，不只是盖上一层",
  password: "有（可选，用 AES-256 加密 PDF）",
  recipients: "有。最多 20 个接收方，每人一份单独的版本，还可加上 5 位编号",
  offline: "页面打开后，开飞行模式也能继续用",
  oss: "是（AGPL-3.0 许可，代码在 GitHub 公开）",
  logo: "不支持，只能用文字",
  tools: "只有合并多个文件、调整顺序、控制文件大小",
};

// « Comment faire avec Cachety », commun à toutes les pages.
const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "用 Cachety 给证件加水印，只要几步" },
  {
    type: "steps",
    items: [
      "用浏览器打开 cachety.com，不用注册。",
      "把身份证照片或 PDF 拖进页面。iPhone 拍的照片（HEIC）也可以直接用。",
      "在「这份副本用来做什么？」里写上用途（例如「开户」），在「交给谁？」里写上接收方（例如「华信银行」）。日期会自动加上。",
      "身份证号、照片等对方用不到的地方，可以用预览下方的「遮盖内容」框住，然后点「完成」。",
      "检查预览，下载加好水印的文件，再发给对方。",
    ],
  },
];

const AIRPLANE_TIP: GuideBlock = {
  type: "tip",
  text: "文件到底有没有发出去，您可以自己验证：先打开 cachety.com，然后把手机或电脑切换到飞行模式，再加水印。断网的情况下照样能做完，说明文件没有离开您的设备。",
};

const CACHETY_LIMITS: GuideBlock = {
  type: "p",
  text: "Cachety 也有做不到的事。它只能加文字水印，不能加 Logo 或图片。为了安全，它会把每一页重新生成为图片，所以生成的 PDF 里的文字不能再选中或搜索，文件也可能比原来大。它不能编辑文字、签名、转换格式，也没有电脑客户端。它是个人开发的开源项目，背后没有公司，也没有售后服务合同。",
};

const UPLOAD_EXPLAINED: GuideBlock = {
  type: "p",
  text: "在线工具的原理很简单：您点「上传」，证件就复制了一份，传到对方公司的服务器上处理，处理完再让您下载。哪怕只停留一小时，这份副本在这段时间里也存放在别人的电脑上，按别人的规则管理。Cachety 的做法不一样：网页加载完之后，所有处理都在您自己的手机或电脑里完成，证件不会传到任何地方。",
};

export const COMPARISONS_ZH: Comparison[] = [
  // ---------------------------------------------------------------- WPS Office
  {
    slug: "cachety-vs-wps-office",
    competitor: "wps-office",
    competitorName: "WPS Office",
    competitorUrl: "https://www.wps.cn/",
    title: "Cachety 和 WPS Office 对比：给身份证复印件加水印，用哪个？",
    metaTitle: "WPS 加水印 vs Cachety：身份证 PDF 加水印怎么选",
    description:
      "WPS Office 的 PDF 水印是会员功能，Cachety 免费、不用注册，在浏览器里本地处理证件。本文从隐私、水印能否去掉、遮盖信息等方面对比两者，帮您选对工具。",
    intro:
      "很多人电脑上都装了 WPS Office，想给身份证 PDF 加水印，第一个想到的就是它。WPS 功能很全，但给证件加水印这件事，Cachety 的做法有些不同。",
    verdict:
      "如果您已经是 WPS 会员，平时就在 WPS 里处理文档，用它加水印很顺手。如果您不想开会员、不想登录账号，只想快速给证件加一个盖满整页、去不掉的水印，再遮住身份证号，Cachety 更简单。两者都可以在自己的电脑上处理文件，区别主要在费用、账号和水印的牢固程度。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "在电脑或手机上的 WPS 软件里打开。只有您手动上传或开启「文档云同步」时，文档才会存到 WPS 的服务器" },
      { criterion: "需要账号吗", cachety: C.account, other: "PDF 水印是会员功能，需要登录并开通会员", edge: "cachety" },
      { criterion: "费用", cachety: C.price, other: "PDF 水印属于 WPS 会员权益，价格以官网为准", edge: "cachety" },
      { criterion: "水印样式", cachety: C.type, other: "可选预设水印或自定义文字，可调字体、字号、比例、角度、不透明度和位置" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "官方教程没有说明水印是否与页面合成为图片" },
      { criterion: "遮盖身份证号等信息", cachety: C.redact, other: "本文未核实（WPS 官方帮助中未找到相关说明）" },
      { criterion: "每个接收方一份", cachety: C.recipients, other: "官方教程未提及" },
      { criterion: "其他办公功能", cachety: C.tools, other: "完整办公套件：文字、表格、演示、PDF 编辑等", edge: "other" },
      { criterion: "是否开源", cachety: C.oss, other: "否，商业软件", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "WPS 能给 PDF 加水印吗？" },
      {
        type: "p",
        text: "能。按照 WPS 学堂的官方教程，用 WPS Office 打开 PDF，依次点「插入」再点「水印」，就可以选预设水印或者自定义文字。WPS 官方社区的教程也写明，PDF 的「水印」是会员功能。所以如果您没有开通会员，这一步可能就走不下去。",
      },
      { type: "h2", text: "隐私方面：两者都能在本地处理" },
      {
        type: "p",
        text: "WPS 是装在电脑或手机上的软件。按照它的隐私政策，只有当您手动上传或主动开启「文档云同步」时，文档才会保存到 WPS 的服务器上。所以给证件加水印之前，最好确认一下这份文件没有放在同步文件夹或云文档里。Cachety 不需要安装，在浏览器里打开就能用，它本身没有任何云端存储，证件不会传到网上。",
      },
      { type: "h2", text: "给证件加水印，要注意什么" },
      {
        type: "list",
        items: [
          "水印要铺满整页，盖过证件的主要内容。只写在角落，很容易被裁掉。",
          "写清楚用途、接收方和日期，例如「仅供华信银行开户使用，他用无效 2026年10月11日」。",
          "对方用不到的信息，比如身份证号的一部分，最好直接遮住。",
          "普通 PDF 里的水印通常是单独的一层，用 PDF 编辑器有可能被删掉。Cachety 把水印画进页面图片里，就是为了避免这种情况。",
        ],
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您已经是 WPS 会员，习惯在 WPS 里处理所有文档。",
      "您需要编辑文字、表格、演示文稿，或者对 PDF 做更多编辑。",
      "您需要在 Word 文档里加水印，而不是在证件照片或 PDF 上。",
    ],
    chooseCachety: [
      "您不想开会员，也不想登录账号，只想免费加个水印。",
      "您希望水印铺满整页，并且直接画进页面，编辑 PDF 也去不掉。",
      "您需要遮住身份证号等信息，或者给不同的接收方各做一份带编号的副本。",
    ],
    faq: [
      {
        q: "WPS 给 PDF 加水印要开会员吗？",
        a: "根据 WPS 官方社区的教程，PDF 的「水印」功能是会员功能。具体权益和价格请以 WPS 官网为准。Cachety 完全免费，不用注册。",
      },
      {
        q: "用 WPS 加水印，文件会上传吗？",
        a: "按照 WPS 的隐私政策，只有您手动上传或开启「文档云同步」时，文档才会保存到它的服务器。如果文件在云文档或同步文件夹里，它就会存在云端。",
      },
      {
        q: "WPS 加的水印能去掉吗？",
        a: "WPS 的官方教程没有说明这一点。一般来说，PDF 里单独一层的水印可以用 PDF 编辑器删除。Cachety 会把每一页重新生成为图片，水印画在图片里，编辑 PDF 也去不掉。",
      },
      {
        q: "手机上能给身份证照片加水印吗？",
        a: "可以。用手机浏览器打开 cachety.com，直接选择相册里的身份证照片就行，不用装 App。也可以把它添加到主屏幕，像 App 一样打开。",
      },
    ],
    sources: [
      { label: "WPS 官方社区：如何在 PDF 中添加水印（会员功能）", url: "https://bbs.wps.cn/topic/11188" },
      { label: "WPS 学堂：如何在 PDF 文档中自定义水印", url: "https://www.wps.cn/learning/question/detail/id/13449.html" },
      { label: "WPS Office 隐私政策（2026-08-27 版）", url: "https://privacy.wps.cn/policies/privacy/wps-office" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- 福昕
  {
    slug: "cachety-vs-foxit",
    competitor: "foxit",
    competitorName: "福昕 PDF（PDF365 / 福昕高级PDF编辑器）",
    competitorUrl: "https://www.pdf365.cn/",
    title: "Cachety 和福昕 PDF 对比：在线加水印、编辑器加水印，哪种更适合证件？",
    metaTitle: "福昕 PDF 加水印 vs Cachety：证件加水印怎么选",
    description:
      "福昕的 PDF365 在云端服务器加水印，福昕高级PDF编辑器在电脑上处理。Cachety 免费、不上传，在浏览器里本地给证件加水印。看看三种方式各适合谁。",
    intro:
      "福昕有两种加水印的方式：网页版 PDF365，和装在电脑上的福昕高级PDF编辑器。Cachety 是第三种：在浏览器里直接处理，文件不上传。",
    verdict:
      "如果您需要专业的 PDF 编辑、批量处理，或者加图片水印，福昕高级PDF编辑器更强。PDF365 用起来方便，但文件要传到福昕的云端服务器。如果只是给证件加一个去不掉的文字水印，又不想上传、不想装软件，Cachety 更合适。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "PDF365：上传到福昕的云端服务器处理。高级PDF编辑器：在您的电脑上处理", edge: "cachety" },
      { criterion: "上传文件保存多久", cachety: C.retention, other: "PDF365 的水印页面没有写明保存时间" },
      { criterion: "费用和限制", cachety: C.price, other: "PDF365 按文件大小消耗「额度」，可签到领额度；网页版单个文件限 10M 以内。编辑器价格以官网为准", edge: "cachety" },
      { criterion: "水印类型", cachety: C.type, other: "文字或图片水印，可选字体、角度、透明度，可放在文字上方或下方", edge: "other" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "福昕帮助中心介绍了用编辑器「全部移除」水印的方法" , edge: "cachety" },
      { criterion: "遮盖敏感信息", cachety: C.redact, other: "高级PDF编辑器有「擦除」和「密文」功能，可真正删除内容" },
      { criterion: "批量处理", cachety: "可一次处理多个文件，最多 20 个接收方各一份", other: "PDF365 一次最多上传 10 个文件；编辑器支持批量加水印", edge: "other" },
      { criterion: "其他 PDF 功能", cachety: C.tools, other: "转换、合并、拆分、压缩、加密、编辑等大量功能", edge: "other" },
      { criterion: "需要账号吗", cachety: C.account, other: "PDF365 签到领额度、开通权益需要登录" },
      { criterion: "是否开源", cachety: C.oss, other: "否，商业软件", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "福昕的两种加水印方式" },
      {
        type: "p",
        text: "PDF365 是福昕的在线平台。它的加水印页面写着「拥有多个PDF加水印云端服务器」，也就是说文件要先上传到福昕的服务器。网页版单个文件限 10M 以内，按文件大小消耗额度。福昕高级PDF编辑器是电脑软件，文件在本地处理，支持批量加水印，也能加图片水印。",
      },
      UPLOAD_EXPLAINED,
      { type: "h2", text: "水印加上去，还能被删掉吗？" },
      {
        type: "p",
        text: "这一点对证件很重要。福昕自己的帮助中心就有教程：在高级PDF编辑器里点「页面管理」、「水印」、「全部移除」，就能把 PDF 里的水印删掉，还能批量操作。这说明普通 PDF 水印通常是可以拿掉的一层。这对编辑文档是好事，但对证件来说，拿到文件的人也可以这样做。Cachety 把每一页重新生成为图片，水印直接画在图片里，没有可以单独删除的那一层。",
      },
      {
        type: "warning",
        text: "给证件加水印，目的就是让它不能被挪作他用。如果水印一键就能删掉，保护作用会大打折扣。无论用哪个工具，都建议选择能把水印和页面合成在一起的方式。",
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要专业的 PDF 编辑：改文字、转换格式、签名、OCR 等。",
      "您要加公司 Logo 或图片水印。",
      "您经常要批量处理大量 PDF，并希望在电脑软件里完成（福昕高级PDF编辑器）。",
    ],
    chooseCachety: [
      "您不想把身份证上传到任何服务器，也不想装软件。",
      "您希望水印画进页面里，用 PDF 编辑器也删不掉。",
      "您只是偶尔给证件加水印，不想买软件或消耗额度。",
    ],
    faq: [
      {
        q: "PDF365 加水印要上传文件吗？",
        a: "要。PDF365 的加水印页面写明使用云端服务器处理，文件需要先上传。它的页面没有写明文件会保存多久。",
      },
      {
        q: "福昕编辑器加的水印能去掉吗？",
        a: "福昕帮助中心介绍了在高级PDF编辑器里通过「页面管理」、「水印」、「全部移除」删除水印的方法。Cachety 的水印画在页面图片里，没有这样一层可以删除。",
      },
      {
        q: "福昕能遮盖身份证号吗？",
        a: "能。福昕高级PDF编辑器有「擦除」和「密文」功能，可以把选中的内容真正删除。Cachety 的「遮盖内容」也会把框住的内容从文件里真正删掉。",
      },
      {
        q: "Cachety 能加图片水印吗？",
        a: "不能，Cachety 只支持文字水印。如果要加 Logo，福昕这类工具更合适。",
      },
    ],
    sources: [
      { label: "PDF365：在线 PDF 加水印", url: "https://www.pdf365.cn/watermark/" },
      { label: "福昕网络隐私策略", url: "https://myd.pdf365.cn/agreement/foxitprivacy.html" },
      { label: "福昕帮助中心：如何批量对 PDF 文件添加水印", url: "https://support.fuxinsoft.cn/?p=8614" },
      { label: "福昕帮助中心：如何批量移除水印", url: "https://support.fuxinsoft.cn/?p=9434" },
      { label: "福昕帮助中心：使用福昕高级PDF编辑器删除敏感信息", url: "https://support.fuxinsoft.cn/?p=116" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- 迅捷PDF
  {
    slug: "cachety-vs-xunjie-pdf",
    competitor: "xunjie-pdf",
    competitorName: "迅捷PDF转换器在线版",
    competitorUrl: "https://app.xunjiepdf.com/",
    title: "Cachety 和迅捷PDF转换器对比：在线给证件加水印，文件去了哪里？",
    metaTitle: "迅捷PDF加水印 vs Cachety：证件加水印安全吗",
    description:
      "迅捷PDF转换器在线版把文件传到云端服务器处理，24 小时后自动删除，免费试用限 0.5M。Cachety 免费、不上传，在浏览器里本地加水印。详细对比看这里。",
    intro:
      "搜索「PDF 加水印」，常会看到迅捷PDF转换器的在线版。它功能多、上手快，但给身份证这类文件加水印之前，值得先看看文件会去哪里。",
    verdict:
      "迅捷PDF转换器在线版有一百多种功能，能加文字或图片水印，适合处理普通文件。但它需要把文件上传到云端服务器，按页面说明 24 小时后自动删除，免费试用的文件也很小。给证件加水印，Cachety 不上传、不限次数，也不用付费。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到迅捷的云端服务器处理", edge: "cachety" },
      { criterion: "上传文件保存多久", cachety: C.retention, other: "水印页面写明 24 小时后自动删除，可在「我的文件」手动删除；隐私协议写明目前每天清除", edge: "cachety" },
      { criterion: "费用和限制", cachety: C.price, other: "PDF 加水印免费试用限 0.5M 以内的文件，开通 VIP 可处理 200M", edge: "cachety" },
      { criterion: "需要账号吗", cachety: C.account, other: "提供手机号、QQ、微信登录；开通 VIP 需要账号" },
      { criterion: "水印类型", cachety: C.type, other: "文字或图片水印，可设坐标位置、旋转角度、字体、颜色、大小、透明度", edge: "other" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "页面没有说明；同一网站另提供「PDF删除水印」工具" },
      { criterion: "每个接收方一份", cachety: C.recipients, other: "页面未提及" },
      { criterion: "其他功能", cachety: C.tools, other: "转换、合并、压缩、加密、翻译、OCR 等一百多种功能", edge: "other" },
      { criterion: "离线使用", cachety: C.offline, other: "在线版需要联网上传文件；另有电脑客户端", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "迅捷在线版是怎么加水印的" },
      {
        type: "p",
        text: "按照迅捷PDF转换器在线版的说明，您先选择 PDF，点「开始处理」，文件会上传到它的服务器，加好水印后再下载。网站写的是「云端处理」「高效率云端服务器」。页面写明文件 24 小时后自动删除，您也可以在「我的文件」里手动删除。它的隐私协议说，上传的文档会暂存在网站服务器上，目前每天清除一次。",
      },
      UPLOAD_EXPLAINED,
      { type: "h2", text: "免费能用到什么程度" },
      {
        type: "p",
        text: "PDF 加水印的免费试用只支持 0.5M 以内的文件。手机拍的身份证照片转成 PDF，经常会超过这个大小。开通 VIP 后可处理 200M 的文件。Cachety 没有付费版，单个文件最大 200 MB，也不限使用次数。",
      },
      {
        type: "tip",
        text: "交给对方的证件，一般不需要很高的清晰度。Cachety 还可以把输出文件控制在 1、2、5 或 10 MB 以内，方便上传到有大小限制的表格或系统里。",
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您要处理的是普通文件，不介意上传，还需要 PDF 转 Word、OCR、翻译等其他功能。",
      "您需要加 Logo 或图片水印。",
      "您需要在线保存处理记录，在不同设备上找回文件。",
    ],
    chooseCachety: [
      "您不希望身份证、户口本这类文件上传到任何服务器，哪怕只存 24 小时。",
      "您的文件超过 0.5M，又不想为加一次水印开 VIP。",
      "您需要遮盖身份证号，或者给多个接收方各做一份带编号的副本。",
    ],
    faq: [
      {
        q: "迅捷PDF在线加水印，文件会保存多久？",
        a: "它的水印页面写的是文件 24 小时后自动删除，也可以在「我的文件」里手动删除。隐私协议写的是目前每天清除一次。",
      },
      {
        q: "迅捷PDF加水印免费吗？",
        a: "有免费试用，但 PDF 加水印的免费试用只支持 0.5M 以内的文件，更大的文件需要开通 VIP。Cachety 完全免费。",
      },
      {
        q: "用在线工具给身份证加水印安全吗？",
        a: "正规的在线工具一般会加密传输，并在一段时间后删除文件。但在这段时间里，证件的副本存放在别人的服务器上。如果不想有这一步，可以用 Cachety 这类在本机处理的工具，并用飞行模式自己验证。",
      },
    ],
    sources: [
      { label: "迅捷PDF转换器在线版：PDF添加水印", url: "https://app.xunjiepdf.com/watermark/" },
      { label: "迅捷PDF转换器在线版：图片加水印", url: "https://app.xunjiepdf.com/jiashuiyin/" },
      { label: "迅捷办公 隐私协议", url: "https://www.xunjiepdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- iLovePDF
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/zh-cn",
    title: "Cachety 和 iLovePDF 对比：给身份证 PDF 加水印，哪个更放心？",
    metaTitle: "iLovePDF 加水印 vs Cachety：证件加水印对比",
    description:
      "iLovePDF 把文件传到服务器处理，两小时内删除，免费版有广告。Cachety 在浏览器里本地加水印，证件不上传。本文对比隐私、水印、遮盖信息等方面，并说明各自适合谁。",
    intro:
      "iLovePDF 是一家西班牙公司做的在线 PDF 工具，有中文界面，功能很全。给身份证加水印之前，可以先了解它和 Cachety 处理文件的方式有什么不同。",
    verdict:
      "iLovePDF 工具齐全，支持图片水印、马赛克式平铺，还有电脑客户端，处理普通 PDF 很方便。它的在线版会把文件上传到服务器，按其政策在两小时内删除。给证件加水印，Cachety 不上传文件、不用注册、目前没有广告，还能遮盖信息、给每个接收方各做一份。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "在线版：上传到 iLovePDF 的服务器处理", edge: "cachety" },
      { criterion: "上传文件保存多久", cachety: C.retention, other: "隐私政策：处理后两小时内删除", edge: "cachety" },
      { criterion: "广告和跟踪", cachety: C.ads, other: "「无广告」是付费版的功能，免费版有广告", edge: "cachety" },
      { criterion: "水印类型", cachety: C.type, other: "文字或图片水印，可单个放置或平铺，可放在内容上方或下方", edge: "other" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "官方没有说明" },
      { criterion: "遮盖敏感信息", cachety: C.redact, other: "有单独的「PDF 标记密文」工具" },
      { criterion: "密码保护", cachety: C.password, other: "有单独的「PDF加密」工具" },
      { criterion: "离线使用", cachety: C.offline, other: "有 Windows、Mac 电脑版，可离线处理" },
      { criterion: "其他 PDF 功能", cachety: C.tools, other: "合并、拆分、压缩、转换、签名等大量工具", edge: "other" },
      { criterion: "安全认证", cachety: "代码公开，任何人都可以检查", other: "官方称已获 ISO/IEC 27001 认证，符合 GDPR" },
    ],
    body: [
      { type: "h2", text: "iLovePDF 是怎么处理文件的" },
      {
        type: "p",
        text: "按照 iLovePDF 的常见问题和隐私政策，在线工具会把文件上传到它的服务器，传输经过加密，处理后两小时内删除。它还提供电脑版，官方说可以离线在本地处理文件。",
      },
      UPLOAD_EXPLAINED,
      { type: "h2", text: "两者的主要区别" },
      {
        type: "list",
        items: [
          "处理位置：iLovePDF 在线版上传到服务器；Cachety 在您的设备上完成。",
          "水印：iLovePDF 支持图片和文字，可平铺；Cachety 只有文字，斜线铺满整页，并画进页面里。",
          "广告：iLovePDF 免费版有广告；Cachety 目前没有广告和跟踪工具。",
          "功能范围：iLovePDF 是全套 PDF 工具；Cachety 只专注给证件加水印和遮盖信息。",
        ],
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要合并、压缩、转换、签名等多种 PDF 功能。",
      "您要加 Logo 或图片水印。",
      "您需要一个能离线使用的电脑软件（iLovePDF 电脑版）。",
    ],
    chooseCachety: [
      "您不想把身份证、护照上传到任何服务器。",
      "您不想注册，也不想看广告。",
      "您需要水印画进页面里，并给不同接收方各做一份带编号的副本。",
    ],
    faq: [
      {
        q: "iLovePDF 上传的文件会保存多久？",
        a: "根据 iLovePDF 的隐私政策，文件在服务器上处理后两小时内删除。",
      },
      {
        q: "iLovePDF 加水印免费吗？",
        a: "可以免费使用，但免费版有使用限制和广告，「无广告」是付费版的功能。具体限制以官网为准。",
      },
      {
        q: "iLovePDF 适合给身份证加水印吗？",
        a: "它能加水印，传输也有加密。不过在线版需要把证件上传到服务器。如果您希望证件完全不离开自己的设备，可以用 Cachety，并用飞行模式自己验证。",
      },
    ],
    sources: [
      { label: "iLovePDF：PDF 添加水印", url: "https://www.ilovepdf.com/zh-cn/pdf_add_watermark" },
      { label: "iLovePDF 隐私政策", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF 常见问题", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF 价格方案", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF 安全说明", url: "https://www.ilovepdf.com/help/security" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Smallpdf
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/cn",
    title: "Cachety 和 Smallpdf 对比：给证件 PDF 加文字水印，选哪个？",
    metaTitle: "Smallpdf 加水印 vs Cachety：证件 PDF 加水印对比",
    description:
      "Smallpdf 的水印工具把文件上传到服务器，处理后 1 小时删除。Cachety 免费、不注册，在浏览器里本地给证件加水印，还能遮盖信息。看看两者的区别和各自适合的场景。",
    intro:
      "Smallpdf 是瑞士公司做的在线 PDF 工具，有中文界面。它的加水印工具不用注册，界面简洁。和 Cachety 比，最大的区别在于文件要不要离开您的设备。",
    verdict:
      "Smallpdf 工具齐全、界面友好，还能批量给多个 PDF 加同一个水印。它的水印工具需要上传文件，官方说处理后 1 小时自动删除。给证件加水印，Cachety 不上传，水印画进页面里，还能遮盖身份证号、给每个接收方各做一份。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "上传到 Smallpdf 的服务器处理（隐私政策提到使用欧盟境内的 Hetzner 服务器）", edge: "cachety" },
      { criterion: "上传文件保存多久", cachety: C.retention, other: "工具页面：1 小时后自动删除。隐私政策对未登录用户的说法是「合理时间内」删除", edge: "cachety" },
      { criterion: "需要账号吗", cachety: C.account, other: "加水印无需注册；免费用户有使用限制" },
      { criterion: "广告和跟踪", cachety: C.ads, other: "隐私政策列出 Google Analytics、Hotjar、Google Ads、Facebook Pixel 等（需征得同意）", edge: "cachety" },
      { criterion: "水印类型", cachety: C.type, other: "只支持文字水印，可调字体、大小、颜色、不透明度，自动加到所有页面" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "官方没有说明" },
      { criterion: "遮盖敏感信息", cachety: C.redact, other: "有单独的「标记密文」工具" },
      { criterion: "其他 PDF 功能", cachety: C.tools, other: "转换、压缩、签名、加密、AI 摘要等大量工具", edge: "other" },
      { criterion: "安全认证", cachety: "代码公开，任何人都可以检查", other: "官方称 TLS 加密、符合 GDPR、通过 ISO/IEC 27001 认证" },
    ],
    body: [
      { type: "h2", text: "Smallpdf 的文件会上传吗？" },
      {
        type: "p",
        text: "会。Smallpdf 的页面说可以「直接在浏览器中自定义」水印，但它的常见问题写得很清楚：所有上传和下载都用 TLS 加密，处理完成后 1 小时自动从服务器删除，除非您注册账户并保存文件。也就是说，界面在浏览器里，处理在它的服务器上。",
      },
      UPLOAD_EXPLAINED,
      { type: "h2", text: "两者的主要区别" },
      {
        type: "list",
        items: [
          "处理位置：Smallpdf 上传到服务器；Cachety 在您的设备上完成。",
          "水印：两者都只支持文字水印。Cachety 沿斜线铺满整页，并画进页面图片里。",
          "跟踪：Smallpdf 的隐私政策列出多种分析和广告跟踪工具；Cachety 目前没有。",
          "功能范围：Smallpdf 是全套 PDF 工具；Cachety 专注于证件水印和遮盖信息。",
        ],
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要转换、压缩、电子签名等多种 PDF 功能。",
      "您想把文件保存在网上账户里，换台设备也能找到。",
      "您要处理的是普通文件，需要保留可搜索的文字（Cachety 输出的 PDF 文字不能搜索）。",
    ],
    chooseCachety: [
      "您不想把证件上传到服务器，哪怕只存 1 小时。",
      "您需要遮盖身份证号，或给多个接收方各做一份带编号的副本。",
      "您希望水印画进页面，用 PDF 编辑器也去不掉。",
    ],
    faq: [
      {
        q: "Smallpdf 是在浏览器里本地处理的吗？",
        a: "不是。界面在浏览器里，但根据它的常见问题，文件会上传到服务器处理，1 小时后自动删除。",
      },
      {
        q: "Smallpdf 能加图片水印吗？",
        a: "它的水印工具只支持文字。官方建议用「编辑 PDF」工具插入图片。Cachety 也只支持文字水印。",
      },
      {
        q: "Smallpdf 加水印要注册吗？",
        a: "官方说加水印不需要注册，但免费用户有使用限制。Cachety 不需要注册，也没有使用次数限制。",
      },
    ],
    sources: [
      { label: "Smallpdf：为 PDF 添加水印（含常见问题）", url: "https://smallpdf.com/cn/watermark-pdf" },
      { label: "Smallpdf 隐私政策", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf 价格方案", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- PDF24
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24 Tools",
    competitorUrl: "https://tools.pdf24.org/zh/",
    title: "Cachety 和 PDF24 对比：都免费，给证件加水印有什么不同？",
    metaTitle: "PDF24 加水印 vs Cachety：免费证件加水印对比",
    description:
      "PDF24 免费、不用注册，但文件要传到德国的服务器，1 小时后删除，靠广告维持。Cachety 同样免费，在浏览器里本地加水印，证件不上传。本文详细对比两者。",
    intro:
      "PDF24 是一家德国公司做的免费 PDF 工具，有中文界面，不用注册，很多人都在用。Cachety 也免费，区别在于文件去了哪里。",
    verdict:
      "PDF24 完全免费、不限次数，还有能离线使用的 Windows 软件 PDF24 Creator，PDF 功能非常全。它的在线工具会把文件传到德国的服务器，1 小时后删除，网站靠广告维持。给证件加水印，Cachety 不上传、目前没有广告，还能遮盖信息、给每个接收方各做一份。",
    table: [
      { criterion: "文件在哪里处理", cachety: C.where, other: "在线版：上传到 PDF24 位于德国的服务器处理", edge: "cachety" },
      { criterion: "上传文件保存多久", cachety: C.retention, other: "1 小时后自动从服务器删除", edge: "cachety" },
      { criterion: "费用", cachety: C.price, other: "免费，不限次数" },
      { criterion: "需要账号吗", cachety: C.account, other: "不需要注册" },
      { criterion: "广告和跟踪", cachety: C.ads, other: "靠广告免费；隐私政策提到 Google AdSense、Google Analytics 等", edge: "cachety" },
      { criterion: "水印类型", cachety: C.type, other: "文字水印，可选字体、大小、颜色、透明度、位置或铺满页面、角度、间距" },
      { criterion: "水印能不能被去掉", cachety: C.flat, other: "官方没有说明" },
      { criterion: "遮盖、加密、删除元数据", cachety: "都在同一个页面完成", other: "有单独的打码、加密、删除元数据工具" },
      { criterion: "离线使用", cachety: C.offline, other: "PDF24 Creator（Windows）可在电脑上本地处理", edge: "other" },
      { criterion: "其他 PDF 功能", cachety: C.tools, other: "几十种 PDF 工具", edge: "other" },
    ],
    body: [
      { type: "h2", text: "PDF24 的在线工具是怎么处理文件的" },
      {
        type: "p",
        text: "PDF24 的加水印页面写明：采用 SSL 方式传输文件，服务器位于德国，一小时后从服务器上自动删除文件。页面还说，水印工具在云服务器上运行。网站写着「100% 免费，感谢广告」。",
      },
      UPLOAD_EXPLAINED,
      { type: "h2", text: "想要不上传，PDF24 也有办法" },
      {
        type: "p",
        text: "公平地说，PDF24 也提供了不上传的选择：Windows 电脑可以安装免费的 PDF24 Creator，官方说文件留在您的电脑上。如果您用 Windows，又需要很多 PDF 功能，这是个好选择。Cachety 则不用安装，手机和苹果电脑也能直接用。",
      },
      ...HOW_TO,
      AIRPLANE_TIP,
      CACHETY_LIMITS,
    ],
    chooseOther: [
      "您需要很多 PDF 功能，比如压缩、转换、拆分。",
      "您用 Windows 电脑，愿意安装软件在本地处理（PDF24 Creator）。",
      "您需要把水印放在页面的某个固定位置，而不是铺满整页。",
    ],
    chooseCachety: [
      "您不想把证件上传到服务器，也不想安装软件。",
      "您在手机或苹果电脑上处理证件。",
      "您需要遮盖信息、加密码、给多个接收方各做一份，一次在同一个页面完成。",
    ],
    faq: [
      {
        q: "PDF24 真的免费吗？",
        a: "是的，官方说免费、不限次数，靠网站广告维持。Cachety 也免费，目前没有广告。",
      },
      {
        q: "PDF24 上传的文件会保存多久？",
        a: "根据 PDF24 的页面和常见问题，文件在处理后一小时内从服务器自动删除。",
      },
      {
        q: "有没有不上传文件的加水印方法？",
        a: "有。PDF24 Creator 是 Windows 上的本地软件；Cachety 在浏览器里本地处理，手机也能用。您可以开飞行模式验证 Cachety 确实没有上传文件。",
      },
    ],
    sources: [
      { label: "PDF24：PDF 添加水印", url: "https://tools.pdf24.org/zh/add-watermark-to-pdf" },
      { label: "PDF24 常见问题", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 隐私政策", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24 全部工具", url: "https://tools.pdf24.org/en/all-tools" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Proton
  {
    slug: "cachety-vs-proton-watermark",
    competitor: "proton",
    competitorName: "Proton",
    competitorUrl: "https://proton.me/drive/watermark-pdf",
    title: "Cachety 和 Proton 水印工具对比：两个注重隐私的选择",
    metaTitle: "Cachety vs Proton 水印工具：客观对比",
    description:
      "Proton 和 Cachety 都在浏览器里给文件加水印，不上传文件。不同之处在于：隐藏数据、水印能否去掉、遮盖信息和给每个接收方各做一份。",
    intro:
      "Proton 是一家瑞士公司，旗下有 Proton Mail 和 Proton Drive，它提供免费的 PDF 和图片水印工具。和 Cachety 一样，这些工具在浏览器里运行，文件不会上传。所以问题不在于把文件交给谁：两者都把文件留在您的设备上。区别在于每个工具对文档做了什么。",
    verdict:
      "两者都是注重隐私的好选择，哪一个都比直接发送没加水印的证件副本好得多。如果要加 Logo 水印、保留 PDF 里可选中的文字，或者批量给照片加水印并保持原格式，Proton 更合适。Cachety 专为证件设计：它会去除隐藏数据，把水印融进每一页，不能简单地编辑掉，还能遮盖信息，给每个接收方各做一份带名字的副本。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: "在浏览器里，在您自己的设备上完成，不上传任何内容",
        other: "在浏览器里，在您自己的设备上完成。Proton 表示文件不会被上传、存储或保留",
      },
      {
        criterion: "费用和账号",
        cachety: "免费，不需要账号",
        other: "免费，不需要账号",
      },
      {
        criterion: "水印类型",
        cachety: C.type,
        other: "文字或图片（Logo），平铺排列，可调字体、颜色、大小、透明度、间距和角度",
        edge: "other",
      },
      {
        criterion: "水印怎样加到 PDF 上",
        cachety: "融进每一页的图片里，页面由像素重新生成",
        other: "在我们的测试中，作为单独的文字画在原页面上方，原页面保持不变",
      },
      {
        criterion: "能不能从 PDF 里编辑掉水印",
        cachety: "没有简单的办法：水印是页面图片的一部分",
        other: "由于是单独的文字，理论上可以用 PDF 编辑器删除",
        edge: "cachety",
      },
      {
        criterion: "隐藏数据（元数据、文字层、照片位置）",
        cachety: "从生成的文件中删除",
        other: "保留。Proton 表示加水印不会删除元数据，建议另外清理文件",
        edge: "cachety",
      },
      {
        criterion: "文字能否选中、搜索",
        cachety: "不能：页面有意转成图片",
        other: "能：原来的文字仍可选中",
        edge: "other",
      },
      {
        criterion: "遮盖信息（银行账号、照片等）",
        cachety: "内置：框住的部分会被真正删除",
        other: "水印工具不提供",
        edge: "cachety",
      },
      {
        criterion: "每个接收方一份，每份一个唯一编号",
        cachety: "有：最多 20 个接收方，每份写上对方名字，还可加上编号",
        other: "不提供",
        edge: "cachety",
      },
      {
        criterion: "下载的文件加密码",
        cachety: "有，AES-256 加密",
        other: "水印工具里没有。Proton Drive 提供带密码保护的分享链接",
        edge: "cachety",
      },
      {
        criterion: "照片",
        cachety: "JPG、PNG、WebP、HEIC（iPhone）等",
        other: "页面列出 JPG、PNG 和 WebP，可批量处理，按原格式保存",
      },
      {
        criterion: "页面上的统计分析",
        cachety: "没有",
        other: "在我们的测试中有使用统计（页面浏览、点击），不含文档内容。Proton 称其分析为自行托管并经过匿名化处理",
        edge: "cachety",
      },
      {
        criterion: "源代码",
        cachety: "公开（AGPL），任何人都可以检查",
        other: "我们没有找到这些工具的公开源代码",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "两个工具都做对了什么" },
      {
        type: "p",
        text: "大多数在线加水印网站会把您的文档上传到它们的服务器。Proton 的工具和 Cachety 不会：处理在浏览器里完成，文件留在您的手机或电脑上。在我们对 Proton PDF 工具的测试中，文档没有被发送到任何地方。Proton 还表示，它不会记录、跟踪或分析您的内容。对于护照或工资单，两个工具都是安全的选择。",
      },
      { type: "h2", text: "我们是怎么对比的" },
      {
        type: "p",
        text: "2026 年 10 月 12 日，我们阅读了 Proton 的公开页面，并在 Chrome 中用一个测试文件运行了它的 PDF 水印工具。这个文件包含可选中的文字，元数据里有标题和作者。然后我们检查了下载的 PDF。本文关于 Proton 的所有内容都来自这些页面或这次测试。",
      },
      { type: "h2", text: "区别在于：文档会被怎样处理" },
      {
        type: "p",
        text: "在我们的测试中，Proton 的工具没有改动原页面，而是把水印作为文字画在上面。生成的文件很小，文字仍可选中，适合合同或报告。但正如 Proton 自己提醒的，原来的标题和作者还留在文件里；而且由单独文字构成的水印，理论上可以用 PDF 编辑器删除。Cachety 的做法正好相反，专为证件设计：每一页都由像素重新生成，水印融入其中，文字层、元数据和照片位置都会被去掉。文件更大，文字也不能选中，但里面不再留有任何隐藏内容，水印也不能简单地删掉。",
      },
      { type: "h2", text: "Proton 更合适的地方" },
      {
        type: "list",
        items: [
          "用 Logo 或图片做水印，并能精细调整角度和间距。",
          "需要保留可选中、可搜索文字的 PDF。",
          "批量处理照片并保持原格式。",
          "如果您已经在用 Proton Drive，可以用带密码保护的链接分享结果。",
        ],
      },
      { type: "h2", text: "处理证件时 Cachety 更合适的地方" },
      {
        type: "list",
        items: [
          "删除隐藏数据（元数据、文字层、照片的 GPS 位置）。",
          "水印融进页面，不能简单地编辑掉。",
          "发送前可以遮盖银行账号等信息。",
          "每个接收方一份，各写上对方名字，还可加上唯一编号，用来追查泄露来源。",
          "下载的文件可加密码，密码由 12 个易读的单词组成。",
          "支持 iPhone 照片（HEIC）和 11 种语言，代码任何人都可以检查。",
        ],
      },
      ...HOW_TO,
    ],
    chooseOther: [
      "您想用 Logo 或图片做水印。",
      "PDF 里的文字必须保持可选中、可搜索。",
      "您要批量给照片加水印，并希望保持原格式。",
      "您已经在用 Proton Drive，想通过它分享结果。",
    ],
    chooseCachety: [
      "您要发送身份证、工资单或银行流水，不想在文件里留下任何隐藏数据。",
      "您想要一个不能从 PDF 里简单编辑掉的水印。",
      "您需要遮盖信息，或者给每个接收方发一份带名字的副本。",
      "您想给文件加密码，或者想自己检查代码。",
    ],
    faq: [
      {
        q: "Proton 的水印工具会上传我的文件吗？",
        a: "不会。Proton 表示它的工具在浏览器里本地处理文件；在我们对 PDF 工具的测试中，文档也没有被发送到任何地方。不过页面会发送页面浏览、点击等使用统计，在我们的测试中其中不含文档内容。",
      },
      {
        q: "Proton 和 Cachety 哪个更保护隐私？",
        a: "两者都把文件留在您的设备上。区别在于生成的文件：Cachety 会删除元数据、照片位置等隐藏数据，而 Proton 的工具会保留这些数据，Proton 自己也说明了这一点。",
      },
      {
        q: "Proton 加的水印能去掉吗？",
        a: "在我们的测试中，水印是作为单独的文字加在 PDF 原页面上方的。这样的水印理论上可以用 PDF 编辑器删除。Cachety 则把水印融进每一页的图片里。",
      },
      {
        q: "Cachety 能加 Logo 水印吗？",
        a: "不能。Cachety 只能加文字水印。如果要用 Logo，Proton 的工具支持图片。",
      },
    ],
    sources: [
      { label: "Proton：免费给 PDF 文件加水印", url: "https://proton.me/drive/watermark-pdf" },
      { label: "Proton：免费图片水印制作工具", url: "https://proton.me/drive/image-watermark" },
      { label: "Proton 隐私政策（网站统计分析）", url: "https://proton.me/legal/privacy" },
    ],
    checked: "2026-10-12",
    updated: "2026-10-12",
  },
];
