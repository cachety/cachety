import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) => `隠したほうがよさそうな番号が ${n} 件見つかりました。`,
  review: "確認する",
  title: "候補",
  hideAll: "すべて隠す",
  hideAllDocs: "すべての書類でまとめて隠す",
  hide: "隠す",
  hidden: "隠しました",
  undo: "元に戻す",
  dismiss: "これは隠さない",
  onPage: (p) => `${p} ページ`,
  notShown: "プレビューに表示されていないページ",
  coverAll: "候補はすべてのページが対象です。",
  doneAll: (n, pages) => `${n} か所を隠しました（${pages} ページ）。`,
  none: "この書類には候補がありません。",
  noText: "この書類には読み取れる文字がありません。隠す範囲はご自分で描いてください。",
  incomplete: "候補の検出は、この書類の途中で止まりました。",
  footer:
    "候補には見落としがあるかもしれません。ページ全体をご自分で確認してください。バーコードや QR コードにも同じ情報が入っていることがあります。",
  note: {
    frTax: "受け取る側が、納税通知書が本物かどうかを確かめるために使うことがあります。その必要がない場合だけ隠してください。",
    iban: "口座情報を求められた場合は、相手に必要な番号です。",
  },
  kinds: {
    iban: "口座番号（IBAN）",
    card: "カード番号",
    "fr-nir": "社会保障番号（フランス）",
    "fr-tax": "納税者番号（フランス）",
    "fr-tax-ref": "納税通知書の参照番号（フランス）",
    "de-taxid": "納税者識別番号（ドイツ、Steuer-ID）",
    "es-dni": "身分証番号（スペイン、DNI/NIE）",
    "nl-bsn": "市民サービス番号（オランダ、BSN）",
    "be-nn": "国民登録番号（ベルギー）",
    "pt-nif": "納税者番号（ポルトガル、NIF）",
    "br-cpf": "CPF（ブラジル）",
    "it-cf": "納税者コード（イタリア、codice fiscale）",
    "cn-id": "居民身分証番号（中国）",
    "jp-mynumber": "マイナンバー（個人番号）",
    "ir-melli": "国民番号（イラン）",
    "id-nik": "NIK（インドネシア）",
  },
  announce: (label, page, hidden) => `${label}、${page} ページ：${hidden ? "隠しました" : "元に戻しました"}。`,
};

export default COPY;
