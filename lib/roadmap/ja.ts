import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "宛先ごとに別のパスワード",
    body: "宛先ごとのコピーをそれぞれ別のパスワードでロックし、ダウンロード後に番号と一緒に一覧で表示します。パスワードが一つ漏れても、開けるのはそのコピーだけです。",
  },
  "suggested-areas": {
    title: "隠す範囲の提案",
    body: "口座番号やマイナンバーなどをページ上で見つけて、隠すよう提案します。ほかの処理と同じく、検出は端末の中で行われます。",
  },
  "more-languages": {
    title: "対応言語の追加",
    body: "イタリア語、韓国語、トルコ語。",
  },
  "purpose-from-recipient": {
    title: "宛先から用途を提案",
    body: "不動産会社などの宛先を入力すると、それに合った用途を提案できるようにします。",
  },
  "local-word-lists": {
    title: "あなたの言語で読みやすいパスワード",
    body: "パスワードの単語をあなたの言語にします。どのキーボードでも同じように入力できるよう、シンプルな文字だけを使います。",
  },
  "simpler-tool": {
    title: "もっとかんたんな操作",
    body: "わかりやすい言葉で3ステップ：書類、用途と宛先、そしてプレビューとダウンロード。詳しい設定もすぐに開けます。",
  },
  "easy-passwords": {
    title: "読みやすいパスワード",
    body: "ファイルをロックすると、ランダムな12個の単語でできたパスワードが作られます。暗号資産ウォレットの復元フレーズと同じ強さです。",
  },
};

const COPY: RoadmapCopy = {
  nav: "ロードマップ",
  title: "今後の予定",
  lead: "次に取り組むことと、検討中のアイデアです。Cachety はこれからも無料のオープンソースで、書類が端末の外に出ることはありません。",
  next: "次の予定",
  idea: "検討中のアイデア",
  shipped: "最近の追加",
  suggest: "アイデアを提案する",
  suggestBody: "足りない機能はありますか？GitHub で issue を作成してください。どの言語でもかまいません。",
  meta: {
    title: "ロードマップ：Cachety の今後の予定",
    description: "書類を端末から出さない無料の透かしツール Cachety の今後の機能。次の予定、検討中のアイデア、最近追加された機能をまとめています。",
  },
};

export default { items: ITEMS, copy: COPY };
