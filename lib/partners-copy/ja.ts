import type { PartnersCopy } from "./types";

const COPY: PartnersCopy = {
  nav: "サイト運営者の方へ",
  meta: {
    title: "Cachety をウェブサイトに埋め込む",
    description: "Cachety の透かしツールを無料でウェブサイトに設置できます。訪問者の書類は端末から出ないため、あなたのサイトも Cachety も中身を見ることはできません。",
  },
  title: "Cachety をウェブサイトに埋め込む",
  lead: "不動産会社、人事プラットフォーム、各種団体の方へ。身分証や給与明細を送ってくる方が、あなたのページ上でそのまま透かしを入れられるようにしましょう。無料で、書類が端末の外に出ることはありません。",
  privacyTitle: "プライバシーが守られる理由",
  privacy: [
    "ツールは cachety.com から配信されるフレームの中で動きます。あなたのページやそこで動くスクリプトから、中身を読み取ることはできません。",
    "書類は訪問者の端末で処理されます。あなたにも私たちにも、何もアップロードされません。",
    "ツールを表示できるのは承認済みのサイトだけなので、誤解を招くページに組み込まれることはありません。",
  ],
  codeTitle: "コードを取得",
  codeLead: "オプションを選んでから、2つのコードをページに貼り付けてください。",
  options: {
    lang: "言語",
    purpose: "用途（訪問者向けに入力済みにする）",
    purposePlaceholder: "例：賃貸申込",
    recipient: "宛先（訪問者向けに入力済みにする）",
    recipientPlaceholder: "例：あなたの会社名",
    accent: "ボタンの色",
    accentHint: "明るすぎる色は無視され、ボタンの読みやすさが保たれます。",
  },
  embedCode: "1. フレーム",
  resizeCode: "2. 高さの自動調整",
  resizeHelp: "この短いスクリプトはフレームの高さを調整します。受け取るのは高さを表す数値だけです。",
  copy: "コピー",
  copied: "コピーしました",
  previewTitle: "プレビュー",
  previewNote: "訪問者にはこのように表示されます。入力済みの内容は、訪問者があとから変更できます。",
  wordingTitle: "掲載用の説明文",
  wordingLead: "ツールの横に添える、短く正確な説明文です：",
  wording: "このツールは cachety.com 上で動いています。書類が端末の外に出ることはなく、このサイトも Cachety も中身を見ることはできません。",
  joinTitle: "参加方法",
  join: [
    "ウェブサイトのアドレスを添えて、GitHub でリクエストを送ってください。",
    "内容を確認し、承認済みサイトの一覧に追加します。",
    "更新が公開されると、あなたのページでツールが使えるようになります。",
  ],
  joinCta: "パートナーを申し込む",
  freeTitle: "無料",
  free: "Cachety の埋め込みは、サイトのほかの機能と同じく無料です。あなたや訪問者のお役に立てたなら、寄付が継続の支えになります。",
  donateCta: "Cachety を支援する",
  usedBy: "導入サイト",
  embed: { runsOn: "cachety.com 上で動作", private: "ファイルは端末から出ません" },
};

export default COPY;
