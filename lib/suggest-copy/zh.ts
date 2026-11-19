import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) => `我们找到了 ${n} 个您可能想遮盖的号码。`,
  review: "查看",
  title: "建议",
  hideAll: "全部遮盖",
  hideAllDocs: "在所有文件中全部遮盖",
  hide: "遮盖",
  hidden: "已遮盖",
  undo: "撤销",
  dismiss: "这个不用",
  onPage: (p) => `第 ${p} 页`,
  notShown: "未在预览中显示的页面",
  coverAll: "建议涵盖所有页面。",
  doneAll: (n, pages) => `已遮盖 ${n} 处（第 ${pages} 页）。`,
  none: "这份文件没有可建议的内容。",
  noText: "这份文件没有可读取的文字：请自己画出要遮盖的区域。",
  incomplete: "建议在这份文件结束前就停止了。",
  footer: "建议可能有遗漏。请自己检查整页。条形码和二维码也可能包含同样的信息。",
  note: {
    frTax: "收件人可能会用它来核实您的税单是否真实。只有对方不需要时才遮盖。",
    iban: "如果对方要您的银行账户信息，就需要它。",
  },
  kinds: {
    iban: "银行账号（IBAN）",
    card: "银行卡号",
    "fr-nir": "社会保障号码（法国）",
    "fr-tax": "税号（法国）",
    "fr-tax-ref": "税单参考号（法国）",
    "de-taxid": "税务识别号（德国，Steuer-ID）",
    "es-dni": "身份证件号码（西班牙，DNI/NIE）",
    "nl-bsn": "公民服务号码（荷兰，BSN）",
    "be-nn": "国民登记号（比利时）",
    "pt-nif": "税号（葡萄牙，NIF）",
    "br-cpf": "CPF（巴西）",
    "it-cf": "税号（意大利，codice fiscale）",
    "cn-id": "居民身份证号码",
    "jp-mynumber": "个人编号 My Number（日本）",
    "ir-melli": "国民代码（伊朗）",
    "id-nik": "NIK（印度尼西亚）",
  },
  announce: (label, page, hidden) => `${label}，第 ${page} 页：${hidden ? "已遮盖" : "已恢复显示"}。`,
};

export default COPY;
