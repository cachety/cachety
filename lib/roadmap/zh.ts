import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "每个接收方一个密码",
    body: "每个接收方的副本用各自的密码加密，下载后与编号一起列出。即使一个密码泄露，也只能打开一份副本。",
  },
  "suggested-areas": {
    title: "自动建议遮盖区域",
    body: "Cachety 会找出页面上的银行账号、证件号码等信息，并建议遮盖。和其他功能一样，识别全部在您的设备上完成。",
  },
  "more-languages": {
    title: "更多语言",
    body: "意大利语、韩语和土耳其语。",
  },
  "purpose-from-recipient": {
    title: "根据接收方推荐用途",
    body: "输入接收方（例如房产中介）后，可以推荐相应的用途。",
  },
  "local-word-lists": {
    title: "用您的语言生成好读的密码",
    body: "密码单词使用您自己的语言，只用简单字母，在任何键盘上都能同样输入。",
  },
  "remember-signature": {
    title: "在这台设备上记住我的签名",
    body: "一个需要您主动开启的选项：把签名保存在这台设备上，用一句话说清保存了什么，并且一键就能删除。目前签名从不保存。",
  },
  "keep-vector-pages": {
    title: "保留签名后 PDF 的文字",
    body: "一个签字时不根据像素重新生成页面的选项，让文字仍可搜索。它会配有专门的隐藏数据清除步骤。",
  },
  "sign-embed": {
    title: "在合作网站上签字",
    body: "经过批准的网站可以在自己的页面里显示签字工具，可以单独显示，也可以与水印工具并列，地点和附言可以预先填好。文件仍然留在访客的设备上。",
  },
  "sign": {
    title: "给文件签字",
    body: "手写、输入或上传您的签名，放到 PDF 或照片上，下载签好的 PDF。和水印工具一样，什么都不会上传。",
  },
  "simpler-tool": {
    title: "更简单的工具",
    body: "三步，说法通俗：您的文件，用途和接收方，然后预览并下载。所有高级选项都一点即开。",
  },
  "easy-passwords": {
    title: "好读的密码",
    body: "现在给文件加密时，会生成由 12 个随机单词组成的密码，和加密货币钱包的助记词一样强。",
  },
  "partner-embed": {
    title: "Cachety 进入合作网站",
    body: "经过批准的网站可以在自己的页面中显示这个工具。它仍然运行在 cachety.com 上，因此文件留在访客的设备上，所在网站无法接触。",
  },
};

const COPY: RoadmapCopy = {
  nav: "路线图",
  title: "即将推出",
  lead: "我们接下来要做的，以及正在考虑的想法。Cachety 始终免费、开源，文件始终留在您的设备上。",
  next: "即将推出",
  idea: "正在考虑的想法",
  shipped: "最近新增",
  suggest: "提个建议",
  suggestBody: "缺少什么功能？在 GitHub 上提交 issue 即可，任何语言都欢迎。",
  meta: {
    title: "路线图：Cachety 即将推出的功能",
    description: "Cachety 是免费的水印和签名工具，文件始终留在您的设备上。这里列出即将推出的功能、正在考虑的想法和最近新增的内容。",
  },
};

export default { items: ITEMS, copy: COPY };
