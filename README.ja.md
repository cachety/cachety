# Cachety

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · **日本語** · [简体中文](README.zh.md)

**身分証や大切な書類に、端末の外へ一度も出さずに透かしを入れられます。**

Cachety は、PDF や写真（運転免許証、パスポート、給与明細、税金の通知書、銀行の取引明細など）に透かしを入れるツールです。処理はすべて、あなたのブラウザの中で行われます。ファイルがアップロードされることはありません。そもそも、ファイルを受け取るサーバーが存在しないからです。無料で、登録も不要、追跡もなく、オープンソースです。

### 👉 今すぐ使う：**[cachety.com](https://cachety.com)**

対応言語：English、Français、Español、Português、Deutsch、Nederlands、Bahasa Indonesia、العربية、فارسی、日本語、简体中文。

![Cachety：ブラウザの中で透かしを入れた PDF](docs/preview.png)

## なぜ作ったのか

部屋を借りるとき、仕事を始めるとき、銀行口座を開くとき。私たちは何かと書類のコピーを求められます。一度渡したコピーは、そのままでは何にでも使い回せてしまい、なりすましに悪用されることもあります。「何のためのコピーか」「誰に渡すか」「日付」を透かしで書き込んでおけば、そのコピーはその一回の用途にしか使えなくなります。フランス政府のサイバー被害相談窓口 [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr) も、まさにこの方法をすすめています。

オンラインの透かしツールの多くは、あなたの身分証をサーバーにアップロードして処理します。Cachety はアップロードしません。

## オンライン版がいちばんおすすめです

インストールもビルドも必要ありません。どなたにも、**[cachety.com](https://cachety.com)** をおすすめします。

- **プライバシーはそのまま。** オンラインで使っても、ファイルが端末の外に出ることはありません。処理はすべてブラウザの中でページが行い、外部へのデータ送信はしくみの上で禁止されています。ご自身で確かめられます。ページを開いてから機内モードにして、書類に透かしを入れてみてください。
- **より安全。** 公式サイトは、必要なセキュリティヘッダーをすべてそろえて配信しています（クリックジャッキング対策、HSTS、クロスオリジン分離、ページごとの厳格な Content-Security-Policy）。一般的な Web サーバーで自分で立てたコピーでは、その一部が抜けていることがよくあります。
- **いつも最新。** セキュリティの修正や改善は、次に開いたときに自動で届きます。更新作業は何もいりません。
- **どこでも速い。** 世界中に配置された CDN から配信されるので、どこからでもすばやく開けます。一度読み込めばオフラインでも使えます。
- **どの端末でも快適。** パソコン、iPhone、Android で使えます。アプリのようにホーム画面に追加でき、Android ならファイルを共有メニューから Cachety に直接送れます。
- **ヘルプつき。** はじめての方には、どこから始めればよいかをガイドツアーでご案内します。よくある場面ごとの実用ガイドもあります。

もちろん、自分でホスティングすることもでき、正式にサポートしています（下記参照）。必要とする組織の方はご利用ください。

## 機能

- **PDF と画像：** JPG、PNG、WebP、GIF、BMP、AVIF、iPhone の写真（HEIC）。1 ファイルでも、複数まとめてでも処理できます（1 ファイル 200 MB、PDF は 500 ページまで）。
- **ページ全体に透かし**を入れ、画像そのものに焼き込みます。PDF を編集しただけでは消せず、配置はコピーごとに少しずつ変わります。フォント、サイズ、色、透明度、波打つ効果を選べます。
- **かんたん 3 ステップ：** 書類を選び、用途と渡す相手を入れて、プレビューしてからダウンロード。透かしの文言は自動で用意され（「用途・相手・日付」、すぐ使える例つき）、自由に書き換えられます。
- **隠れたデータを削除：** 選択できる文字、メタデータ、写真の位置情報（GPS）を取り除きます。各ページは画素から作り直されます。
- **黒塗り：** 口座番号（IBAN）、税番号、顔写真などを黒く塗りつぶせます。上から覆うだけでなく、中身そのものを消去します。
- **追跡できるコピー：** 文言に `{code}` を入れると、コピーごとに短い固有の番号が入ります。番号はダウンロード後に一覧で表示されるので、控えておけます。
- **複数の宛先：** 宛先ごとに、その人の名前が入ったコピーを作り（最大 20 件）、まとめてダウンロードできます。
- **パスワード：** AES-256 による PDF の暗号化（PDF 2.0）。「パスワードでロックする」にチェックを入れると、ランダムな 12 個の単語からなる読みやすいパスワードが作られます（132 ビット、BIP39 の単語リスト）。自分で決めたパスワードや、ランダムな 256 ビットのパスワードも選べます。クリップボードの自動消去つき。
- **ダウンロード前にファイルサイズを表示**し、「サイズを小さくする」（10・5・2・1 MB）で、容量制限のあるアップロード先やメールにも対応します。
- **1 つの PDF** にまとめる（ドラッグ＆ドロップで順番を指定）か、**ZIP** ファイルでダウンロードできます。
- **スマホでも使え**、アプリとしてインストールでき、一度読み込めば**オフライン**でも動きます。
- **11 言語**に対応。アラビア語とペルシア語は右から左へのレイアウトで表示し、文字ごとに専用のフォントを用意しています。
- **ヘルプツアー：** はじめての方が迷っていそうなときに、ご案内を表示します。
- **書類に署名：** 署名を手書き、入力、または画像で用意して、PDFや写真にブラウザの中で署名できます。何もアップロードされません。簡易な電子署名で、電子証明書付きの署名ではありません。[cachety.com/ja/sign](https://cachety.com/ja/sign) から使えます。
- **92 本の実用ガイド：** フランス、イギリス、ドイツ、オランダ、スペインと中南米、ブラジル、インドネシア、アラブ諸国、イラン、日本、中国の身近な場面に対応しています。
- **82 本の比較記事：** 他の透かしツール（FiligraneFacile、iLovePDF、Proton、Smallpdf、PDF24、Adobe Acrobat など）との比較を、事実を確認し出典つきでまとめています。署名ツール（DocuSign、Youtrust、Adobe Acrobat、iLovePDF、Smallpdf）との比較も 55 本（各言語 5 本）あります。他のツールの方が向いている場面もはっきり書いています。
- **パートナーサイトでも：** 承認されたサイトは自分のページにツールを表示できます（cachety.com が配信する iframe なので、掲載サイトからは書類が見えません）。[docs/embed.md](docs/embed.md) と [cachety.com/ja/partners](https://cachety.com/ja/partners) を参照。

## 設計からプライバシーを守り、しかも検証できる

- 処理はすべてブラウザの中で行われます（pdf.js、canvas、pdf-lib）。ファイルはメモリ上の `File`/`Blob` オブジェクトとしてしか存在しません。
- Content-Security-Policy で `connect-src 'self'` を指定しているため、万一悪意のあるコードが動いたとしても、他のドメインへの通信はブラウザ自身が拒否します。
- クッキー、アクセス解析、外部スクリプト、アカウントは一切ありません。`localStorage` に保存するのは表示の設定だけです。フォントもこのサイト自身から配信しています。
- これらの約束はすべて、変更のたびに実行される自動テストで確認しています。CSP、外部リソースがないこと、出力ファイルの無害化、そしてデータ持ち出しの模擬テストです。

脅威モデル、対策、テストの詳細：**[docs/security.md](docs/security.md)**。脆弱性の報告方法は **[SECURITY.md](SECURITY.md)** をご覧ください。

## 自分でホスティングする

私たちの運営を信用する必要はありません。このサイトは静的ファイルとして書き出せるので、ご自身でホスティングできます。

必要なもの：[Bun](https://bun.sh)。

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # static export in out/
bunx serve out     # or any static file server
```

`out/` は、そのままどんな静的ホスティングにも置けます。各ページは `<meta>` タグに自分専用の Content-Security-Policy を持っているので、私たちの HTTP ヘッダーがなくても通信の制限は働きます。cachety.com と同じ保護を得るには、`out/_headers` にあるヘッダーも設定してください。Cloudflare Pages、GitHub Pages、その他のサーバーについては [docs/deploy.md](docs/deploy.md) をご覧ください。

## あなたのサイトに Cachety を埋め込む（パートナー）

不動産会社、人事プラットフォーム、団体など、承認されたサイトは自分のページにツールをそのまま表示できます。書類を送る人が、その場で透かしを入れられます。

- **設計からプライベート：** ツールは cachety.com が配信する枠の中で動きます。掲載ページやそこにあるスクリプトは書類を読めません。書類は訪問者の端末から出ません。
- **カスタマイズ可能：** 用途と宛先をあらかじめ入力（訪問者は変更できます）、ボタンの色、言語。掲載ページに送られるのは枠の高さだけです。
- **承認されたパートナーのみ：** 許可されたサイトは [`partners.json`](partners.json) に載っています。それ以外のサイトではブラウザが表示を拒否します。
- **無料**です。役に立ったら寄付をいただけるとうれしいです。

**参加方法：** サイトのアドレスを書いて[パートナー申請](https://github.com/cachety/cachety/issues/new?template=partner.yml)を出してください。承認されて公開されたら、次のコードを貼り付けます。

```html
<iframe src="https://cachety.com/embed/ja#for=%E8%B3%83%E8%B2%B8%E3%81%AE%E7%94%B3%E8%BE%BC%E3%81%BF&to=%E3%81%BF%E3%81%AA%E3%81%A8%E4%B8%8D%E5%8B%95%E7%94%A3"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

[サイト運営者向けページ](https://cachety.com/ja/partners)では、このコードをプレビュー付きで作れます。高さを自動調整する短いスクリプトと、そのまま使える説明文もあります。技術的な詳細：[docs/embed.md](docs/embed.md)

## 開発

```sh
bun run dev        # development server
bun test           # unit tests and static security checks
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

使用技術：Next.js（静的書き出し）、React、Tailwind CSS、PDF.js、pdf-lib、libheif。

- 画面の文言：`lib/i18n.tsx`（フランス語、英語、日本語、中国語）と `lib/locales/<lang>/strings.ts`（その他の言語）。
- サイトの文章：`lib/site-copy.ts` と `lib/locales/<lang>/site.ts`。ページのメタデータ：`lib/site-meta.ts` と `lib/locales/<lang>/meta.ts`。
- ガイド：`lib/guides/<lang>.ts`。
- 比較ページ（「Cachety vs X」）：`lib/compare/<lang>.ts`。他のツールについての記述には、必ず出典（`sources`）と確認した日付（`checked`）をつけ、どのページでも他のツールの方が向いている場面を書いてください。サービスは変わるので、定期的に事実を確認し直してください。
- 右から左へ書く言語では、`ml-`、`pr-`、`left-`、`right-` ではなく、論理プロパティの Tailwind クラス（`ms-`、`pe-`、`start-`、`end-` など）を使います。

すべての言語で同じ構成を保つ必要があり、テストで確認しています。

## プロジェクトを応援する

Cachety は無料で、これからも無料です。お役に立てたなら、[GitHub Sponsors で応援](https://github.com/sponsors/amirhmoradi)していただけるとうれしいです。寄付は、ドメイン名や開発ツールの費用、そして何より開発にかかる時間を支えてくれます。

現在、広告はありません。将来、同じ考え方に沿った厳選したスポンサーリンク（暗号化ツール、オープンソースソフト、安全な書類共有サービスなど）をいくつか表示することがあるかもしれません。その場合のルールは厳格で、プライバシーの約束の一部です。

- スポンサーであることをはっきり表示します。
- Cachety 自身のドメインから配信します（画像とリンクのみ）。広告配信ネットワーク、外部スクリプト、トラッキングピクセルは使いません。
- ツールに入力された内容をもとに選んだり、表示を変えたりすることは決してありません。
- Content-Security-Policy は今と同じく厳格なままです（`connect-src 'self'`）。

## クレジットとライセンス

Cachety は個人のプロジェクトで、フランスで **[Amir Moradi](https://amirmoradi.com)** が設計・運営しています。

Hugo Sibony（KazeTachinuu）による **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** を改変したものです。そのプロジェクト自体も、CyberClarence による **[Filigraneur](https://github.com/cyberclarence/filigraneur)** に着想を得て書き直されたものです。お二人に感謝します。詳しくは [NOTICE](NOTICE) をご覧ください。

読みやすいパスワードには **[BIP39 の英語単語リスト](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)**（MIT License、© 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe）を使っています。

今後の予定：**[ROADMAP.md](ROADMAP.md)**（[cachety.com/ja/roadmap](https://cachety.com/ja/roadmap) でも公開しています）。

ライセンスは **GNU Affero General Public License v3.0**（[LICENSE](LICENSE)）です。改変したバージョンをサービスとして提供する場合、AGPL により、利用者にそのソースコードを提供する必要があります。
