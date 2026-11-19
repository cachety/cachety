import type { Comparison } from "../types";

// Comparisons for the Dossier tool (zh): merging PDFs and photos into one
// file and getting it under a size limit. Same editorial rule as the other
// comparisons (lib/compare/types.ts); each entry carries tool: "dossier".
// Written for readers in mainland China (Simplified Chinese). Plain text only.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Every claim about another tool is backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.
// Availability of the foreign tools in mainland China: not checked, so never stated.
//
// The Cachety column describes the Dossier tool as shipped (sections, photo
// straightening and custom size included): limits from lib/watermark.ts and
// lib/pages.ts, sizes from lib/size-budget.ts and the `dossier` block of
// lib/i18n.tsx. Keep the column in step with them. The quoted labels
// (「一个 PDF」「其他…」) were checked against that block on 2026-11-19.
// The claims about the other tools say the same as the English file
// (lib/compare/dossier/en.ts), re-checked on the same date.

const CHECKED = "2026-11-19";
const UPDATED = "2026-11-19";

/** Address of the tool, written without a scheme. */
const TOOL = "cachety.com/zh/dossier";

// Shared wording for the Cachety column.
const CACHETY = {
  where: "在您自己设备的浏览器里完成。什么都不上传。",
  kept: "什么都不保存：没有接收文件的服务器。",
  free: "免费，不用注册，没有付费版，也没有每日限制。每个文件最大 200 MB，每个 PDF 最多 500 页，总共最多 1,000 页。",
  pages: "所有文件的每一页都在同一个网格里：可以移动页面（包括从一个文件移到另一个文件）、旋转或移除。可以生成一个 PDF，也可以按您命名的分组，每组一个 PDF。",
  size: "您选一个最大大小：1、2、5 或 10 MB，或者 0.5 到 50 MB 之间的任意上限。下载之前，Cachety 会告诉您文件能不能控制在这个大小以内，同时保持清晰可读。",
  output: "每一页都重新生成为图片。文字不能选中或搜索，只含文字的 PDF 生成后可能更大。",
  hidden: "每个文件都会去掉：隐藏的文字、作者等属性、附件、链接，以及照片的 GPS 位置。",
  inputs: "PDF 和照片可以一起放，包括 iPhone 的 HEIC 照片。拍纸质材料的照片可以拉正、裁剪，背景可以变白。不支持 Word、Excel 和 PowerPoint 文件。",
  offline: "不用安装。页面加载好以后，开启飞行模式也能照常使用，手机和电脑都可以。",
  ads: "没有广告，也没有跟踪工具。源代码公开。",
};

/** Table row 「合并选项」, for the tools that have bookmarks and tables of contents. */
const MERGE_OPTIONS = "页面顺序，以及需要多个文件时每个分组一个 PDF。没有书签，没有目录。";

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Cachety 生成的文件是什么样的" },
  {
    type: "p",
    text: "Cachety 并不是把您的原始页面拼接起来。它把每一页重新生成为一张图片，再用这些图片做成一个新的 PDF。看不见的东西就是这样去掉的：隐藏的文字、作者姓名、附件、链接和照片的 GPS 位置。代价是实实在在的：新文件里的文字不能选中，也不能搜索；原本只含文字的 PDF，生成后可能比原文件还大，除非您选了最大大小。",
  },
  {
    type: "warning",
    text: "以下情况不适合用 Cachety：文字必须保持可以选中或搜索；需要保留书签或表单域；想加入 Word 或 Excel 文件；或者需要对扫描件做文字识别（OCR）。",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "用 Cachety 做成一个 PDF" },
  {
    type: "steps",
    items: [
      `用电脑或手机的浏览器打开 ${TOOL}。不用安装，也不用注册。`,
      "添加您的 PDF 和照片。每张照片会变成一页。",
      "进入整理页面这一步：拖动页面排好顺序，把横着的转正，把不要的移除。",
      "选择「一个 PDF」；如果对方给了大小限制，就选 1、2、5 或 10 MB，或者点「其他…」填别的上限。",
      "检查预览，遮盖对方不需要的信息，然后下载文件。",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `用 Cachety 或 ${other}，我的文件会被上传吗？`,
  a: `用 Cachety 不会：处理在您的浏览器里完成，没有接收文件的服务器。${answer}`,
});

const FAQ_TEXT = {
  q: "用 Cachety 合并之后，文字还能选中吗？",
  a: "不能。Cachety 把每一页重新生成为图片，这样会去掉隐藏数据，可以选中的文字也随之没有了。如果需要保留文字，请使用把原始页面拼接起来的工具。",
};

export const DOSSIER_COMPARISONS_ZH: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety 和 iLovePDF 对比：合并、压缩 PDF，不用上传文件",
    metaTitle: "iLovePDF 替代工具：合并 PDF 不用上传",
    description:
      "iLovePDF 在它的服务器上合并和压缩 PDF。Cachety 在您的浏览器里完成：什么都不上传，隐藏数据也会去掉。一份公平的对比。",
    intro:
      "iLovePDF 是使用最多的在线 PDF 工具集之一，来自巴塞罗那。它的合并和压缩工具在它的服务器上处理您的文件。Cachety 做的事范围更小，但在您自己的设备上完成：把 PDF 和照片合成一个文件，控制在大小限制以内，而且不上传。",
    verdict:
      "iLovePDF 能做的更多：Office 文件、文字识别、一次处理很多文件，还有可以离线使用的付费桌面版。需要这些时，它是更好的选择。如果文件是您不愿上传的个人材料，照片和 PDF 必须放进同一个文件，或者表单规定了以 MB 计的大小限制，Cachety 是更好的选择。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: CACHETY.where,
        other: "网站：在 iLovePDF 的服务器上。桌面版（付费方案）在您的电脑上处理文件。",
        edge: "cachety",
      },
      {
        criterion: "文件保存多久",
        cachety: CACHETY.kept,
        other: "处理后两小时内自动删除。下载页面上有一个按钮，可以更早删除。",
        edge: "cachety",
      },
      {
        criterion: "账号、免费使用和限制",
        cachety: CACHETY.free,
        other: "不用注册即可免费使用，但文件数量有限。免费合并：每次任务最多 100 个文件、300 MB。免费压缩：每次任务 5 个文件。付费方案会提高这些限制。",
      },
      {
        criterion: "调整页面顺序",
        cachety: CACHETY.pages,
        other: "合并工具调整的是整个文件的顺序。另一个工具 Organize PDF 可以对单独的页面排序、删除和旋转，还可以再添加文件并合并（免费：5 个文件、100 MB）。",
      },
      {
        criterion: "控制在大小限制以内",
        cachety: CACHETY.size,
        other: "三个压缩级别：极度压缩、推荐压缩和低压缩。不能指定以 MB 计的目标大小。",
        edge: "cachety",
      },
      {
        criterion: "照片和 PDF 一起放",
        cachety: CACHETY.inputs,
        other: "在网站上分两步：先把图片转成 PDF，再合并。Word、Excel 和 PowerPoint 文件各有自己的转换工具。",
      },
      {
        criterion: "新 PDF 是什么样的",
        cachety: CACHETY.output,
        other: "合并页面上没有说明。另有一个工具可以识别文字（OCR），让扫描件可以搜索。",
      },
      {
        criterion: "隐藏数据",
        cachety: CACHETY.hidden,
        other: "网站上的工具没有相关说明。桌面版可以编辑或清除 PDF 的元数据。",
      },
      {
        criterion: "App 和离线使用",
        cachety: CACHETY.offline,
        other: "有适用于 Windows 和 Mac 的桌面版，可以离线运行：它的免费版是 PDF 阅读器，各种工具需要付费方案。另有 iOS 和 Android App。",
      },
      {
        criterion: "广告和跟踪工具",
        cachety: CACHETY.ads,
        other: "免费版显示广告；付费版去掉广告。",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "一个大型在线工具箱，和一个留在您设备上的工具" },
      {
        type: "p",
        text: "在 iLovePDF 的网站上，您的文件会被发送到它的服务器，在那里处理，并在两小时内自动删除。您也可以在下载页面上更早删除。iLovePDF 表示它持有 ISO/IEC 27001 认证，并通过加密连接传输文件。网站提供 26 种语言。",
      },
      {
        type: "p",
        text: "Cachety 只负责准备一份要发出去的文件：把对方要的 PDF 和照片按顺序合成一个大小合适的 PDF。一切都在您的浏览器里完成。没有上传，所以事后也没有什么需要删除。",
      },
      { type: "h2", text: "iLovePDF 更强的地方" },
      {
        type: "list",
        items: [
          "它能把 Word、Excel 和 PowerPoint 文件转成 PDF。",
          "它能识别扫描件里的文字（OCR），让扫描的 PDF 可以搜索。",
          "它能处理大任务：免费合并一次最多 100 个文件。",
          "它的付费桌面版在您的电脑上处理文件，网站上的工具大部分都有。",
        ],
      },
      { type: "h2", text: "Cachety 更强的地方" },
      {
        type: "list",
        items: [
          "您的文件始终不上传，而且免费，手机和电脑上都一样。",
          "照片和 PDF 一步就能放进同一个文件，单独的页面可以在同一个地方移动、旋转或移除。",
          "您选的是以 MB 计的大小，和网上表单写限制的方式一样；如果做不到既在这个大小以内又清晰可读，下载之前就会告诉您。",
          "每个文件的隐藏数据都会去掉，而且没有广告。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "您需要转换 Word、Excel 或 PowerPoint 文件，或者识别扫描件里的文字。",
      "您有很多文件或很大的 PDF 要一次处理。",
      "您是 iLovePDF 的付费用户，并使用它在您电脑上运行的桌面版。",
    ],
    chooseCachety: [
      "文件是身份证件、工资单或银行流水，您不愿意上传。",
      "您需要把照片和 PDF 放进同一个文件，并按自己的顺序排列页面。",
      "表单要求交一个文件，或者每类材料一个文件，并且有以 MB 计的大小限制。",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "用 iLovePDF 的网站会：文件在它的服务器上处理，并在两小时内删除。它的桌面版在您的电脑上处理文件，需要付费方案。"
      ),
      {
        q: "iLovePDF 能把 PDF 压缩到指定的大小吗？",
        a: "不能。它提供三个压缩级别，它自己的指南也说，没有任何工具能保证精确的输出大小。用 Cachety，您选的是一个以 MB 计的最大大小；如果文件没法既控制在这个大小以内又保持清晰可读，下载之前就会告诉您。",
      },
      {
        q: "iLovePDF 能离线使用吗？",
        a: "它适用于 Windows 和 Mac 的桌面版可以，但里面的工具需要付费方案。Cachety 是一个网页，加载好以后开启飞行模式也能照常使用，而且免费。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF：合并 PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF：压缩 PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF 价格方案和各工具的限制", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF 安全说明", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF 常见问题", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF 桌面版", url: "https://www.ilovepdf.com/desktop" },
      { label: "iLovePDF 博客：网页版、桌面版还是手机版", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "iLovePDF 博客：整理 PDF 页面", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "iLovePDF 博客：合并 PDF 和 JPG 文件", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "iLovePDF 博客：把 PDF 压缩到指定大小", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "iLovePDF 博客：编辑或删除 PDF 元数据",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "iLovePDF 博客：iLovePDF 15 周年", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
      { label: "关于 iLovePDF", url: "https://www.ilovepdf.com/help/about" },
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
    title: "Cachety 和 Smallpdf 对比：合并、压缩 PDF，不用上传文件",
    metaTitle: "Smallpdf 替代工具：合并 PDF 不用上传",
    description:
      "Smallpdf 在云端合并和压缩 PDF，免费使用有每日限制。Cachety 在您的浏览器里完成，免费，不上传。一份公平的对比。",
    intro:
      "Smallpdf 是来自瑞士的知名在线 PDF 工具集，有手机 App 和 Windows 版。它的合并和压缩工具在云端运行。Cachety 做的事范围更小，但在您自己的设备上完成：把 PDF 和照片合成一个文件，控制在大小限制以内，而且不上传。",
    verdict:
      "Smallpdf 能做的更多：它接受 Word、Excel 和 PowerPoint 文件，能识别扫描件里的文字，还有可以离线使用的 Windows 版。需要这些时，它是更好的选择。如果文件是您不愿上传的个人材料，您会碰到免费版的每日限制，或者表单规定了以 MB 计的大小限制，Cachety 是更好的选择。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: CACHETY.where,
        other: "在云端。文件会上传到位于欧盟的服务器。Windows 桌面版可以离线处理文件。",
        edge: "cachety",
      },
      {
        criterion: "文件保存多久",
        cachety: CACHETY.kept,
        other: "按照 Smallpdf 产品页面的说法，一小时后从服务器上删除，除非您把它们存到自己的账号里。",
        edge: "cachety",
      },
      {
        criterion: "账号、免费使用和限制",
        cachety: CACHETY.free,
        other: "不用注册。免费使用有每日下载次数限制和文件大小限制；付费方案取消这些限制。",
        edge: "cachety",
      },
      {
        criterion: "调整页面顺序",
        cachety: CACHETY.pages,
        other: "合并工具可以显示每个文件的页面，用来重排、旋转或删除；Smallpdf 的价格页面把这个页面视图列在付费方案里。Organize 工具可以重排、旋转、删除和添加页面，也可以合并多份文档。",
      },
      {
        criterion: "控制在大小限制以内",
        cachety: CACHETY.size,
        other: "提供的是压缩级别，不是以 MB 计的大小。基本压缩免费；更强的级别属于付费方案。",
        edge: "cachety",
      },
      {
        criterion: "支持的文件类型",
        cachety: CACHETY.inputs,
        other: "合并工具支持 PDF、Word、Excel、PowerPoint、JPG 和 PNG：其他文件会先转成 PDF。HEIC 照片可以在 JPG 转 PDF 工具里使用。",
        edge: "other",
      },
      {
        criterion: "新 PDF 是什么样的",
        cachety: CACHETY.output,
        other: "合并页面上没有说明。文字识别（OCR）作为单独的工具提供。",
      },
      {
        criterion: "隐藏数据",
        cachety: CACHETY.hidden,
        other: "合并工具没有相关说明。Smallpdf 的博客说，它的压缩工具和拼合（Flatten）工具会去掉元数据，这是另外的一步。",
      },
      {
        criterion: "App 和离线使用",
        cachety: CACHETY.offline,
        other: "有 iOS 和 Android App，以及可以离线使用的 Windows 桌面版。Mac 桌面版已不再受支持。",
      },
    ],
    body: [
      { type: "h2", text: "一个云端工具箱，和一个留在您设备上的工具" },
      {
        type: "p",
        text: "Smallpdf 把它的合并和压缩工具称为基于云端的工具：您的文件会被上传，在它的服务器上处理，一小时后删除，除非您把它们存到自己的账号里。Smallpdf 表示它已获 ISO/IEC 27001 认证，并在文件传输过程中使用 TLS 加密。它的工具提供 24 种语言。",
      },
      {
        type: "p",
        text: "Cachety 在这里只做一件事：把别人向您要的 PDF 和照片，变成一个大小合适的干净文件。一切都在您的浏览器里完成。没有上传，所以事后也没有什么需要删除。",
      },
      { type: "h2", text: "Smallpdf 更强的地方" },
      {
        type: "list",
        items: [
          "它能把 Word、Excel 和 PowerPoint 文件转成 PDF，并一次合并好。",
          "它提供文字识别（OCR），让扫描件可以搜索。",
          "它有带扫描功能的手机 App，还有可以离线处理文件的 Windows 版。",
          "有了账号，您可以把文件存在网上，在另一台设备上找到它们。",
        ],
      },
      { type: "h2", text: "Cachety 更强的地方" },
      {
        type: "list",
        items: [
          "您的文件始终不上传，手机和电脑上都一样，而且不用安装。",
          "没有每日限制，也没有付费方案。",
          "您选的是以 MB 计的大小，和网上表单写限制的方式一样；如果做不到既在这个大小以内又清晰可读，下载之前就会告诉您。",
          "每个文件的隐藏数据都会去掉，不需要额外的步骤。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "您需要把 Word、Excel 或 PowerPoint 文件加进合并后的 PDF。",
      "您需要识别扫描件里的文字（OCR）。",
      "您用 Windows，想要一个装在电脑上、可以离线使用的软件。",
      "您想把文件存在一个在线账号里。",
    ],
    chooseCachety: [
      "文件是身份证件、工资单或银行流水，您不愿意上传。",
      "表单要求交一个文件，或者每类材料一个文件，并且有以 MB 计的大小限制。",
      "您用的是手机，不想装 App，也不想注册账号。",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "用 Smallpdf 的在线工具会：文件会上传到它的服务器，按照它产品页面的说法，一小时后删除，除非您把它们存到自己的账号里。它的 Windows 桌面版可以离线处理文件。"
      ),
      {
        q: "Smallpdf 能把 PDF 压缩到指定的大小吗？",
        a: "不能。Smallpdf 提供的是压缩级别，它自己的博客也说，这个工具不能输入精确的大小。用 Cachety，您选的是一个以 MB 计的最大大小；只要还能保持清晰可读，文件就会控制在这个大小以内。",
      },
      {
        q: "Smallpdf 免费吗？",
        a: "部分免费。合并和基本压缩免费，但有每日下载次数限制；更强的压缩和不限次数的使用属于付费方案。Cachety 免费，没有每日限制，也没有付费方案。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf：合并 PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf：压缩 PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf：整理 PDF 页面（Organize PDF）", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf：JPG 转 PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf 价格方案和方案对比", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf 隐私声明", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf 信任中心", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf App 和扩展程序", url: "https://smallpdf.com/download" },
      { label: "Smallpdf 博客：把 PDF 压缩到选定的大小", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Smallpdf 博客：删除 PDF 元数据", url: "https://smallpdf.com/blog/ways-to-remove-pdf-metadata" },
      { label: "关于 Smallpdf", url: "https://smallpdf.com/about" },
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
    title: "Cachety 和 Adobe Acrobat 在线工具对比：合并和压缩 PDF",
    metaTitle: "Adobe Acrobat 替代工具：合并 PDF 不用上传",
    description:
      "Adobe 的免费在线工具在 Adobe 的服务器上合并和压缩 PDF。Cachety 在您的浏览器里完成，不上传，也不用登录。一份公平的对比。",
    intro:
      "PDF 是 Adobe 发明的，它免费的 Acrobat 在线工具可以在任何浏览器里合并和压缩 PDF。文件在 Adobe 的服务器上处理。Cachety 做的事范围更小，但在您自己的设备上完成：把 PDF 和照片合成一个文件，控制在大小限制以内，而且不上传。",
    verdict:
      "如果 PDF 的文字必须保持原样，Adobe 的合并工具是更好的选择：它合并文件时不降低图片、文字或格式的质量，一次最多 100 个文件。它的付费桌面版能做的事远比 Cachety 多。如果是您不愿上传的个人材料，想一步把照片和 PDF 混在一起，或者要满足以 MB 计的大小限制，Cachety 是更好的选择。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: CACHETY.where,
        other: "在线工具：在 Adobe 的服务器上。Acrobat 桌面版在您的设备上本地压缩文件。",
        edge: "cachety",
      },
      {
        criterion: "文件保存多久",
        cachety: CACHETY.kept,
        other: "会从 Adobe 的服务器上删除，除非您登录并把文件存到账号里。下载之后，您也可以自己删除文件。",
        edge: "cachety",
      },
      {
        criterion: "账号、免费使用和限制",
        cachety: CACHETY.free,
        other: "合并：最多 100 个文件，每个最多 500 页，合并后的文件最多 1,500 页，不加水印。压缩：免费，但使用次数有限；不限次数使用需要付费方案。",
      },
      {
        criterion: "调整页面顺序",
        cachety: CACHETY.pages,
        other: "合并之前可以调整文件的顺序。重新整理单独的页面需要登录；免费账号就够了。",
        edge: "cachety",
      },
      {
        criterion: "控制在大小限制以内",
        cachety: CACHETY.size,
        other: "三个压缩级别：高、中、低。文件最大 2 GB。",
      },
      {
        criterion: "照片和其他文件类型",
        cachety: CACHETY.inputs,
        other: "免费的合并工具接受的是 PDF。把 PDF 和 Word、Excel、PowerPoint 或图片文件合在一起，属于 Acrobat Pro 的功能。另有免费的工具可以把图片（包括 HEIC 照片）转成 PDF，但转换次数有限。",
      },
      {
        criterion: "新 PDF 是什么样的",
        cachety: CACHETY.output,
        other: "合并文件时不压缩，也不降低图片、文字或格式的质量。",
        edge: "other",
      },
      {
        criterion: "隐藏数据",
        cachety: CACHETY.hidden,
        other: "删除隐藏信息（“sanitize”）和涂黑敏感内容（redaction），是付费的 Acrobat Pro 的功能。",
        edge: "cachety",
      },
      {
        criterion: "App 和离线使用",
        cachety: CACHETY.offline,
        other: "免费的 Acrobat Reader 可以查看、批注、填写和签名。编辑、转换和压缩在付费的桌面版里。手机 App Adobe Scan 把扫描件存在 Adobe 的云存储里。",
      },
    ],
    body: [
      { type: "h2", text: "PDF 的标杆，和一个只做一件事的小工具" },
      {
        type: "p",
        text: "Adobe 提供超过 25 个免费的在线工具。合并工具一次最多 100 个文件，合并时不改变文件的质量。压缩工具提供三个级别。两者都会把您的文件发送到 Adobe 的服务器，文件会在那里被删除，除非您登录保存。Adobe 表示文件在传输和存储时都经过加密，并把 ISO 27001 和 SOC 2 列为网页版 Acrobat 的认证。",
      },
      {
        type: "p",
        text: "Cachety 只负责准备一份要发出去的文件：把对方要的 PDF 和照片按顺序合成一个大小合适的 PDF。一切都在您的浏览器里完成，任何一步都不用登录。",
      },
      { type: "h2", text: "Adobe Acrobat 更强的地方" },
      {
        type: "list",
        items: [
          "合并后的 PDF 保留原来文字、图片和格式的质量。",
          "它能处理大任务：一次合并最多 100 个文件，压缩工具支持最大 2 GB 的文件。",
          "付费的桌面版可以编辑文字和图片、转换文件、压缩和涂黑敏感内容。",
          "如果您已经是 Acrobat 的付费用户，所有功能都在一处，文件也都在您的 Adobe 账号里。",
        ],
      },
      { type: "h2", text: "Cachety 更强的地方" },
      {
        type: "list",
        items: [
          "您的文件始终不上传，任何时候都不用登录。",
          "移动、旋转和移除单独的页面是免费的，不需要账号。",
          "照片和 PDF 一步就能放进同一个文件。用 Adobe 的免费工具，要先把照片转成 PDF，再合并。",
          "每个文件的隐藏数据都会去掉，而 Adobe 把这个功能留给了付费的 Pro 方案。",
          "您选的是以 MB 计的大小，下载之前就会知道能不能做到。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "合并后的 PDF 必须保留可以选中和搜索的文字。",
      "您有几十个文件或很大的 PDF 要合并。",
      "您已经是 Acrobat 的付费用户，或者还需要编辑、转换或识别文字。",
    ],
    chooseCachety: [
      "文件是身份证件、工资单或银行流水，您不愿意上传。",
      "您想不登录就重排、旋转或移除页面。",
      "您需要把照片和 PDF 混在一起，并把结果控制在以 MB 计的大小限制以内。",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "用 Adobe 的在线工具会：文件在 Adobe 的服务器上处理，并会被删除，除非您登录保存。Acrobat 桌面版在您自己的设备上运行。"
      ),
      {
        q: "合并 PDF 需要 Adobe 账号吗？",
        a: "合并和下载不需要。重新整理单独的页面，或者用链接分享文件时，Adobe 会要求您登录。Cachety 根本没有账号。",
      },
      {
        q: "Acrobat 在线工具能删除 PDF 的元数据吗？",
        a: "删除隐藏信息是付费的 Acrobat Pro 的功能。Cachety 通过把页面重新生成为图片，去掉它生成的每个文件里的隐藏数据。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat：免费在线工具", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat：合并 PDF", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat：压缩 PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat：JPG 转 PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat：图片转 PDF", url: "https://www.adobe.com/acrobat/online/image-to-pdf.html" },
      { label: "Adobe Acrobat：HEIC 转 PDF", url: "https://acrobat.adobe.com/heic-to-pdf" },
      { label: "Adobe Acrobat：调整 PDF 页面顺序", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat：删除 PDF 页面", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat 方案对比", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services 安全概述",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe 合规认证列表", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
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
    title: "Cachety 和 PDF24 对比：合并、压缩 PDF，不用上传文件",
    metaTitle: "PDF24 替代工具：合并 PDF 不用上传",
    description:
      "PDF24 的在线工具在它的服务器上合并和压缩 PDF；它的 Windows 程序可以离线使用。Cachety 在任何浏览器里都能用，不上传。两者对比。",
    intro:
      "PDF24 是一套免费的德国 PDF 工具。它的在线工具在 PDF24 的服务器上处理文件，而它的 Windows 程序 PDF24 Creator 在您的电脑上做同样的事。Cachety 在任何设备的浏览器里运行，始终不上传您的文件，但做的事范围更小。",
    verdict:
      "在 Windows 电脑上，PDF24 Creator 很难被超越：它免费，可以离线使用，而且拼接的是原始页面，文字保持原样。在手机、Mac，或者不能安装任何东西的电脑上，用 PDF24 就意味着用它的在线工具，而这些工具会上传您的文件。这时，处理个人材料用 Cachety 是更好的选择，而且它可以让您选一个以 MB 计的大小。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: CACHETY.where,
        other: "在线工具：在云端，在 PDF24 的服务器上。PDF24 Creator（Windows）：在您的电脑上，不上传。",
      },
      {
        criterion: "文件保存多久",
        cachety: CACHETY.kept,
        other: "在线：一小时后自动删除。也可以立即手动删除。",
        edge: "cachety",
      },
      {
        criterion: "账号、免费使用和限制",
        cachety: CACHETY.free,
        other: "免费，不设限制，不用注册。在线使用时，单个文件最大 1,000 MB，单次任务最大 10 GB。",
      },
      {
        criterion: "调整页面顺序",
        cachety: CACHETY.pages,
        other: "通过拖放调整文件的顺序。页面模式会显示所有文件的页面：您选出要用的页面，拖动排好顺序，其余的不会放进去。旋转页面是单独的工具。",
      },
      {
        criterion: "控制在大小限制以内",
        cachety: CACHETY.size,
        other: "由您设置分辨率（DPI）和图片质量，另有灰度选项。没有“压缩到 5 MB”这样的选项。",
        edge: "cachety",
      },
      {
        criterion: "支持的文件类型",
        cachety: CACHETY.inputs,
        other: "PDF、图片、Word 文档和其他文件。合并工具不支持 iPhone 的 HEIC 照片。",
      },
      {
        criterion: "新 PDF 是什么样的",
        cachety: CACHETY.output,
        other: "页面原样沿用，不重新生成：文字、图片和字体保持原有质量。",
        edge: "other",
      },
      {
        criterion: "隐藏数据",
        cachety: CACHETY.hidden,
        other: "另有一个工具可以删除 PDF 的元数据。压缩 PDF 的工具也可以去掉元数据、附件和批注。",
      },
      {
        criterion: "合并选项",
        cachety: MERGE_OPTIONS,
        other: "书签、目录、每个文件前的封面页、用于双面打印的空白页、印在页面上的文件名。",
        edge: "other",
      },
      {
        criterion: "App 和离线使用",
        cachety: CACHETY.offline,
        other: "PDF24 Creator 让所有工具都能离线使用，但只有 Windows 版。目前还没有 Mac 或 Linux 版，手机应用商店里也没有 App：在线工具可以添加到手机主屏幕，但仍然需要联网。",
      },
      {
        criterion: "广告和跟踪工具",
        cachety: CACHETY.ads,
        other: "在线工具靠广告维持。隐私政策中提到了 Google AdSense 和 Google Analytics 等。",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "PDF24 的两种用法" },
      {
        type: "p",
        text: "PDF24 的在线工具免费，不用注册，靠广告维持。它们在 PDF24 的服务器上处理您的文件：传输经过加密，文件在一小时后删除。PDF24 由一家位于柏林的公司运营。",
      },
      {
        type: "p",
        text: "PDF24 Creator 则不同。它是一个免费的 Windows 程序，把 PDF24 的所有工具带到您的电脑上，文件留在本地，不上传。如果您用 Windows，又可以安装软件，它能给您和 Cachety 一样的隐私保护，功能还更多。",
      },
      { type: "h2", text: "PDF24 更强的地方" },
      {
        type: "list",
        items: [
          "合并后的 PDF 原样保留原始页面：文字、图片和字体保持原有质量。",
          "Cachety 没有的合并选项：书签、目录、封面页、用于双面打印的空白页。",
          "它接受 Word 文档和其他文件，并提供文字识别（OCR）。",
          "在 Windows 上，PDF24 Creator 可以离线完成这一切，而且免费。",
          "压缩时的分辨率和图片质量可以自己设置。",
        ],
      },
      { type: "h2", text: "Cachety 更强的地方" },
      {
        type: "list",
        items: [
          "在任何设备上都不上传：手机、Mac、Linux 电脑，或者不能安装软件的电脑。",
          "您直接选一个以 MB 计的大小，不用反复试各种设置，直到文件够小为止。",
          "iPhone 的 HEIC 照片可以直接用。",
          "每个文件的隐藏数据都会去掉，不需要额外的步骤。",
          "没有广告，也没有跟踪工具。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "您用 Windows，并且可以安装 PDF24 Creator：它可以离线使用，并保留原始页面。",
      "合并后的 PDF 必须保留可以选中和搜索的文字。",
      "您需要加入 Word 文档，或者识别扫描件里的文字。",
      "您想自己设置分辨率和图片质量。",
    ],
    chooseCachety: [
      "您用的是手机、Mac 或不能安装软件的电脑，又不愿意上传自己的材料。",
      "表单要求交一个文件，或者每类材料一个文件，并且有以 MB 计的大小限制。",
      "您的照片是用 iPhone 拍的。",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "用 PDF24 的在线工具会：文件在它的服务器上处理，一小时后删除。用 Windows 上的 PDF24 Creator 不会：文件留在您的电脑上。"
      ),
      {
        q: "PDF24 能把 PDF 压缩到指定的大小吗？",
        a: "不能直接做到。您要设置分辨率和图片质量，PDF24 自己的指南也说，没有“压缩到 5 MB”这样的选项。用 Cachety，您选的是一个以 MB 计的最大大小；只要还能保持清晰可读，文件就会控制在这个大小以内。",
      },
      {
        q: "PDF24 能在 Mac 或手机上离线使用吗？",
        a: "不能。PDF24 Creator 只有 Windows 版。在 Mac 或手机上，PDF24 提供的是它的在线工具，这些工具在它的服务器上处理文件。Cachety 在任何设备的浏览器里运行，不上传文件。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools：合并 PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools：压缩 PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools：图片转 PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools：删除 PDF 元数据", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools：旋转 PDF", url: "https://tools.pdf24.org/en/rotate-pdf" },
      { label: "PDF24 Tools：常见问题", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "PDF24 帮助：合并 PDF 文件", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "PDF24 帮助：压缩 PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "PDF24 帮助：Mac、Linux 和手机", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24 隐私政策", url: "https://www.pdf24.org/en/privacy-policy" },
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
    title: "Cachety 和 Sejda 对比：合并、压缩 PDF，不用上传文件",
    metaTitle: "Sejda 替代工具：合并 PDF 不用上传",
    description:
      "Sejda 可以在线合并和压缩 PDF，也可以用桌面版在您的电脑上处理，免费使用都有限制。Cachety 在您的浏览器里运行，不上传。",
    intro:
      "Sejda 是一套荷兰的 PDF 工具，有两种形态：在线工具在它的服务器上处理文件，Sejda Desktop 则是适用于 Mac、Windows 和 Linux 的软件，在您的电脑上处理文件。两者的免费使用都有限制。Cachety 在任何设备的浏览器里运行，什么都不上传，也没有每小时或每天的限制，但做的事范围更小。",
    verdict:
      "Sejda 的合并功能更丰富：它能保留书签，生成目录，还能把文件名印在页脚。Sejda Desktop 把文件留在您的电脑上。需要这些选项时，请选它。如果要在手机上、或者在不安装任何东西的情况下处理个人材料，如果文件超出了 Sejda 的免费限制，或者对方给的是以 MB 计的大小限制，请选 Cachety。",
    table: [
      {
        criterion: "文件在哪里处理",
        cachety: CACHETY.where,
        other: "在线：上传到 Sejda 的服务器并在那里处理。Sejda Desktop：在您的电脑上，不上传。",
      },
      {
        criterion: "文件保存多久",
        cachety: CACHETY.kept,
        other: "在线：2 小时后自动删除。结果页面上有一个删除文件的按钮（Delete files）。",
        edge: "cachety",
      },
      {
        criterion: "账号、免费使用和限制",
        cachety: CACHETY.free,
        other: "不用注册。免费在线合并：最多 50 页或 50 MB，每小时 3 次任务。免费压缩：最多 200 页或 100 MB。免费桌面版：每天 3 次任务，文件最大 50 MB、最多 200 页。付费方案取消页数限制和每小时的限制；这时每个文件最大可以上传 500 MB。",
        edge: "cachety",
      },
      {
        criterion: "调整页面顺序",
        cachety: CACHETY.pages,
        other: "通过拖放调整文件的顺序。在页面视图里，可以在合并之前删除、重排和复制页面。",
      },
      {
        criterion: "控制在大小限制以内",
        cachety: CACHETY.size,
        other: "提供图片质量和分辨率设置，另有灰度选项。不能指定以 MB 计的目标大小。",
        edge: "cachety",
      },
      {
        criterion: "支持的文件类型",
        cachety: CACHETY.inputs,
        other: "合并工具支持 PDF 以及 JPG、PNG 等图片。不支持 HEIC 图片。",
      },
      {
        criterion: "合并选项",
        cachety: MERGE_OPTIONS,
        other: "按文件保留或创建书签、目录、用于双面打印的空白页、页脚中的文件名。",
        edge: "other",
      },
      {
        criterion: "隐藏数据",
        cachety: CACHETY.hidden,
        other: "另有一个工具可以编辑 PDF 的元数据，或者把它全部删除。",
      },
      {
        criterion: "App 和离线使用",
        cachety: CACHETY.offline,
        other: "适用于 Mac、Windows 和 Linux 的 Sejda Desktop 可以离线使用，功能和在线服务相同。",
      },
    ],
    body: [
      { type: "h2", text: "在线，或者在您的电脑上：Sejda 两种都有" },
      {
        type: "p",
        text: "在 Sejda 的网站上，您上传文件，文件在它的服务器上处理。Sejda 表示文件在传输和存储时都经过加密，并在两小时后自动删除。免费服务按页数、MB 数和每小时的任务次数设有限制。",
      },
      {
        type: "p",
        text: "Sejda Desktop 在您的电脑上处理文件，不上传，支持 Mac、Windows 和 Linux。它的免费版每天可以做三次任务，文件最大 50 MB、最多 200 页，合并时最多 30 个文件、50 页。对个人材料来说，有一个细节值得注意：Sejda 的服务条款写明，用户不得向它的在线服务提交敏感的个人信息，例如政府签发的身份证件号码。",
      },
      { type: "h2", text: "Sejda 更强的地方" },
      {
        type: "list",
        items: [
          "Cachety 没有的合并选项：书签、目录、用于双面打印的空白页。",
          "适用于 Mac、Windows 和 Linux 的桌面版，把文件留在您的电脑上。",
          "同一个地方还有很多其他工具：文字识别（OCR）、裁剪和拉正 PDF 的页面、编辑。",
          "它可以直接从 Dropbox、Google Drive 或 OneDrive 取文件。",
          "对压缩的精细控制：可以设置图片质量和分辨率。",
        ],
      },
      { type: "h2", text: "Cachety 更强的地方" },
      {
        type: "list",
        items: [
          "什么都不上传，什么都不用安装，手机和电脑上都一样。",
          "没有 50 页的上限，也没有每小时或每天任务次数的限制：60 页的文件，或者一小时内的第四个文件，都不成问题。",
          "您选的是以 MB 计的大小，下载之前就会知道能不能做到。",
          "iPhone 的 HEIC 照片可以直接用，每个文件的隐藏数据都会去掉。",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "您需要合并后的 PDF 带有书签或目录。",
      "您可以安装 Sejda Desktop，而且任务在它的免费限制以内，或者您有付费方案。",
      "您需要文字识别，或者要裁剪、拉正扫描版 PDF 的页面：Cachety 只能对照片这样做。",
    ],
    chooseCachety: [
      "文件是身份证件、工资单或银行流水，而您用的是手机，或者不能安装软件。",
      "您的文件超过 50 页，或者同一个小时里要准备好几个文件。",
      "表单要求交一个文件，或者每类材料一个文件，并且有以 MB 计的大小限制。",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "用 Sejda 的在线工具会：文件会上传到它的服务器，两小时后删除。用 Sejda Desktop 不会：文件在您的电脑上处理。"
      ),
      {
        q: "Sejda 免费合并有哪些限制？",
        a: "在线使用时，文件最多 50 页或 50 MB，每小时三次任务。Sejda Desktop 的免费版每天可以做三次任务，文件最大 50 MB、最多 200 页。Cachety 没有这类限制：一个文件最多可以有 1,000 页。",
      },
      {
        q: "Sejda 能把 PDF 压缩到指定的大小吗？",
        a: "它的压缩工具提供的是图片质量和分辨率设置，而不是一个目标大小。用 Cachety，您选的是一个以 MB 计的最大大小；只要还能保持清晰可读，文件就会控制在这个大小以内。",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda：合并 PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda：压缩 PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda：JPG 转 PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda：整理 PDF 页面", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda：编辑 PDF 元数据", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda 方案和常见问题", url: "https://www.sejda.com/upgrade" },
      { label: "Sejda：结果页面", url: "https://www.sejda.com/result" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Sejda 的安全措施", url: "https://www.sejda.com/security" },
      { label: "Sejda 隐私政策", url: "https://www.sejda.com/privacy" },
      { label: "Sejda 服务条款", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
