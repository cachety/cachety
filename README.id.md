# Cachety

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · **Bahasa Indonesia** · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Beri watermark pada KTP dan dokumen penting Anda, tanpa dokumen itu pernah keluar dari perangkat Anda.**

Cachety menambahkan watermark pada PDF dan foto (KTP, paspor, slip gaji, dokumen pajak, rekening koran) sepenuhnya di dalam browser. Tidak ada file yang di-upload: memang tidak ada server yang bisa menerimanya. Gratis, tanpa akun, tanpa pelacakan, dan open source.

### 👉 Pakai sekarang: **[cachety.com](https://cachety.com)**

Tersedia dalam English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語, dan 简体中文.

![Cachety: PDF diberi watermark di browser](docs/preview.png)

## Mengapa Cachety dibuat

Kita terus-menerus diminta salinan dokumen: untuk sewa kos, mulai kerja, atau buka rekening. Begitu terkirim, salinan polos bisa dipakai untuk apa saja, termasuk pencurian identitas. Watermark yang menyebut untuk apa salinan itu, untuk siapa, dan tanggalnya mengikat salinan itu pada satu keperluan saja. Lembaga resmi Prancis untuk bantuan korban kejahatan siber, [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), menganjurkan cara ini.

Kebanyakan alat watermark online melakukannya dengan meng-upload KTP Anda ke server mereka. Cachety tidak.

## Pakai versi online: itu cara terbaik

Anda tidak perlu menginstal atau membangun apa pun. **[cachety.com](https://cachety.com)** adalah versi yang kami sarankan untuk semua orang:

- **Sama privatnya.** Meski online, file Anda tidak pernah keluar dari perangkat: halaman ini mengerjakan semuanya di dalam browser, dan secara teknis dilarang mengirim data ke mana pun. Buktikan sendiri: buka halamannya, nyalakan mode pesawat, lalu beri watermark pada dokumen.
- **Perlindungan lebih baik.** Situs resmi disajikan dengan header keamanan lengkap (perlindungan clickjacking, HSTS, isolasi lintas origin, Content-Security-Policy ketat per halaman). Salinan buatan sendiri di server web biasa sering melewatkan sebagian di antaranya.
- **Selalu terbaru.** Perbaikan keamanan dan peningkatan sampai kepada Anda di kunjungan berikutnya, tanpa perlu memperbarui apa pun.
- **Cepat di mana saja.** Disajikan dari CDN global, jadi cepat terbuka di mana pun Anda berada, dan tetap berjalan tanpa internet setelah dimuat.
- **Nyaman di perangkat apa pun.** Bisa di komputer, iPhone, dan Android. Tambahkan ke layar utama seperti aplikasi; di Android, bagikan file langsung ke Cachety.
- **Bantuan tersedia.** Tur terpandu menunjukkan kepada pengunjung baru harus mulai dari mana, dan panduan praktis menjelaskan situasi sehari-hari.

Self-hosting tetap bisa dan didukung penuh (lihat di bawah), untuk organisasi yang membutuhkannya.

## Fitur

- **PDF dan gambar:** JPG, PNG, WebP, GIF, BMP, AVIF, dan foto iPhone (HEIC). Satu file atau banyak sekaligus (maksimal 200 MB per file, 500 halaman per PDF).
- **Watermark di seluruh halaman**, menyatu dengan gambar. Tidak bisa dihapus hanya dengan mengedit PDF, dan polanya berbeda di setiap salinan. Pilihan font, ukuran, warna, opasitas, dan efek gelombang.
- **Tiga langkah mudah:** dokumen Anda, untuk apa dan siapa penerimanya, lalu pratinjau dan unduh. Teks watermark dibuatkan untuk Anda ("keperluan, penerima, tanggal", dengan contoh siap pakai) dan bisa diubah sesuka hati.
- **Data tersembunyi dihapus:** teks yang bisa diseleksi, metadata, dan lokasi GPS foto. Setiap halaman dibangun ulang dari piksel.
- **Sensor:** tutup nomor rekening, NIK, atau foto. Isinya benar-benar dihapus, bukan sekadar ditutupi.
- **Salinan yang bisa dilacak:** tambahkan `{code}` ke teks dan setiap salinan mendapat kode pendeknya sendiri, yang ditampilkan dalam daftar setelah diunduh agar bisa Anda simpan.
- **Beberapa penerima:** satu salinan per penerima (sampai 20), masing-masing dengan namanya, dalam satu kali unduh.
- **Kata sandi:** enkripsi PDF AES-256 (PDF 2.0). Mencentang "Kunci dengan kata sandi" akan membuat kata sandi yang mudah dibaca dari 12 kata acak (132 bit, daftar kata BIP39); kata sandi Anda sendiri atau kata sandi acak 256 bit tetap bisa dipakai. Pembersihan clipboard otomatis.
- **Ukuran file ditampilkan sebelum diunduh**, dengan "Perkecil ukuran" (10, 5, 2, atau 1 MB) untuk portal upload dan email yang membatasinya.
- **Satu PDF** dengan urutan pilihan Anda (seret dan lepas), atau arsip **ZIP**.
- **Bisa di HP**, bisa dipasang seperti aplikasi, dan tetap berjalan **tanpa internet** setelah dimuat.
- **11 bahasa**, dengan tata letak kanan ke kiri untuk bahasa Arab dan Persia, serta font khusus untuk setiap aksara.
- **Tur bantuan terpandu** untuk pengunjung baru, ditawarkan saat seseorang tampak bingung harus mulai dari mana.
- **92 panduan praktis** untuk situasi sehari-hari di Indonesia, Prancis, Inggris, Jerman, Belanda, Spanyol dan Amerika Latin, Brasil, dunia Arab, Iran, Jepang, dan Tiongkok.
- **Tanda tangani dokumen:** tanda tangani PDF atau foto di browser dengan menggambar, mengetik, atau mengimpor foto tanda tangan Anda, tanpa meng-upload apa pun: [cachety.com/id/sign](https://cachety.com/id/sign). Ini tanda tangan elektronik tidak tersertifikasi, bukan tanda tangan tersertifikasi.
- **82 perbandingan yang sudah dicek faktanya** dengan alat watermark lain (FiligraneFacile, iLovePDF, Proton, Smallpdf, PDF24, Adobe Acrobat, dan lainnya) dan 55 dengan alat tanda tangan (DocuSign, Youtrust, Adobe Acrobat, iLovePDF, Smallpdf), lengkap dengan sumber, termasuk kapan alat lain justru lebih cocok.
- **Di situs mitra:** situs yang disetujui bisa menampilkan alat ini di halamannya sendiri (iframe dari cachety.com, jadi situs tersebut tidak bisa melihat dokumen). Lihat [docs/embed.md](docs/embed.md) dan [cachety.com/id/partners](https://cachety.com/id/partners).

## Privasi sejak rancangan, dan bisa diperiksa

- Semua proses terjadi di browser (pdf.js, canvas, pdf-lib). File hanya ada di memori sebagai objek `File`/`Blob`.
- Content-Security-Policy menetapkan `connect-src 'self'`, sehingga browser sendiri menolak setiap permintaan ke domain lain, bahkan jika kode berbahaya entah bagaimana berjalan.
- Tidak ada cookie, analitik, skrip pihak ketiga, atau akun. Hanya preferensi tampilan yang disimpan di `localStorage`. Font disajikan oleh situs itu sendiri.
- Setiap jaminan ditegakkan oleh pengujian otomatis yang berjalan di setiap perubahan: CSP, ketiadaan sumber daya eksternal, pembersihan file hasil, dan simulasi upaya pencurian data.

Model ancaman lengkap, kontrol, dan pengujian: **[docs/security.md](docs/security.md)**. Untuk melaporkan celah keamanan, lihat **[SECURITY.md](SECURITY.md)**.

## Self-hosting

Anda tidak perlu memercayai deployment kami: situs ini adalah ekspor statis yang bisa Anda host sendiri.

Prasyarat: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # ekspor statis di out/
bunx serve out     # atau server file statis apa pun
```

`out/` bisa langsung ditaruh di hosting statis mana pun. Setiap halaman membawa Content-Security-Policy sendiri dalam tag `<meta>`, jadi penguncian jaringan tetap bekerja tanpa header HTTP kami. Untuk mendapatkan perlindungan yang sama dengan cachety.com, pasang juga header dari `out/_headers`. Lihat [docs/deploy.md](docs/deploy.md) untuk Cloudflare Pages, GitHub Pages, dan server lain.

## Pasang Cachety di situs Anda (mitra)

Agen properti, platform HR, komunitas: situs yang disetujui bisa menampilkan alat ini secara lengkap di halamannya sendiri, supaya orang yang mengirim dokumen bisa langsung memberi watermark di sana.

- **Privat sejak rancangan:** alat berjalan di dalam bingkai yang disajikan cachety.com. Halaman yang menampilkannya, dan skrip apa pun di sana, tidak bisa membaca dokumen. Dokumen tidak pernah meninggalkan perangkat pengunjung.
- **Bisa disesuaikan:** tujuan dan penerima sudah terisi (pengunjung tetap bisa mengubahnya), warna tombol, dan bahasa. Hanya tinggi bingkai yang dikirim ke halaman.
- **Hanya mitra yang disetujui:** situs yang diizinkan tercantum di [`partners.json`](partners.json). Browser menolak situs lain.
- **Gratis**, seperti bagian lain proyek ini. Donasi sangat dihargai jika alat ini bermanfaat.

**Cara bergabung:** [ajukan permintaan](https://github.com/cachety/cachety/issues/new?template=partner.yml) dengan alamat situs Anda. Setelah disetujui dan dipublikasikan, tempel kode berikut:

```html
<iframe src="https://cachety.com/embed/id#for=Pengajuan%20sewa&to=Agen%20Properti%20Martin"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

[Halaman untuk situs web](https://cachety.com/id/partners) membuatkan kode ini untuk Anda, dengan pratinjau langsung, skrip singkat untuk tinggi otomatis, dan teks yang bisa dipakai ulang. Detail teknis: [docs/embed.md](docs/embed.md).

## Pengembangan

```sh
bun run dev        # server pengembangan
bun test           # unit test dan pemeriksaan keamanan statis
bun run test:e2e   # rangkaian uji browser (CHROMIUM_EXE=/path/to/chrome untuk memakai Chrome lokal)
```

Teknologi: Next.js (ekspor statis), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Teks antarmuka: `lib/i18n.tsx` (Prancis, Inggris, Jepang, Tionghoa) dan `lib/locales/<lang>/strings.ts` (bahasa lainnya).
- Teks situs: `lib/site-copy.ts` dan `lib/locales/<lang>/site.ts`. Metadata halaman: `lib/site-meta.ts` dan `lib/locales/<lang>/meta.ts`.
- Panduan: `lib/guides/<lang>.ts`.
- Halaman perbandingan ("Cachety vs X"): `lib/compare/<lang>.ts`. Setiap pernyataan tentang alat lain harus menyebut sumbernya (`sources`) dan tanggal pengecekannya (`checked`), dan setiap halaman harus menyebut kapan alat lain lebih cocok. Periksa ulang fakta ini secara berkala: layanan bisa berubah.
- Gambar untuk berbagi di media sosial (`public/og/<lang>.png`, 1200×630) dibuat dari teks dan font situs itu sendiri dengan `bun run og` (butuh Chrome: atur `CHROMIUM_EXE`). Jalankan ulang saat judul atau janji situs berubah.
- Bahasa kanan ke kiri memakai kelas Tailwind logis (`ms-`, `pe-`, `start-`, `end-`…), bukan `ml-`, `pr-`, `left-`, `right-`.

Setiap bahasa harus memiliki struktur yang sama; pengujian memeriksanya. Aturan kontribusi dan peta file: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Dukung proyek ini

Cachety gratis dan akan tetap gratis. Jika bermanfaat bagi Anda, Anda bisa [mendukungnya lewat GitHub Sponsors](https://github.com/sponsors/amirhmoradi). Donasi membantu membayar domain dan alat pengembangan, dan terutama waktu yang dibutuhkan.

Saat ini tidak ada iklan. Suatu hari proyek ini mungkin menampilkan beberapa tautan bersponsor pilihan yang sejalan dengan semangatnya (alat enkripsi, perangkat lunak open source, pengiriman dokumen yang aman). Aturannya ketat dan menjadi bagian dari janji privasi:

- diberi tanda jelas sebagai bersponsor;
- disajikan dari domain Cachety sendiri (hanya gambar dan tautan): tanpa jaringan iklan, tanpa skrip pihak ketiga, tanpa piksel pelacak;
- tidak pernah dipilih atau ditampilkan berdasarkan apa pun yang dimasukkan pengguna ke alat ini;
- Content-Security-Policy tetap seketat sekarang (`connect-src 'self'`).

## Kredit dan lisensi

Cachety adalah proyek pribadi, dirancang dan dikelola oleh **[Amir Moradi](https://amirmoradi.com)** di Prancis.

Cachety adalah versi modifikasi dari **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** karya Hugo Sibony (KazeTachinuu). Proyek itu sendiri ditulis ulang dengan terinspirasi dari **[Filigraneur](https://github.com/cyberclarence/filigraneur)** karya CyberClarence. Terima kasih kepada keduanya. Lihat [NOTICE](NOTICE) untuk detailnya.

Kata sandi yang mudah dibaca memakai **[daftar kata BIP39 bahasa Inggris](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (Lisensi MIT, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

Rencana ke depan: **[ROADMAP.md](ROADMAP.md)**, juga bisa dilihat di [cachety.com/id/roadmap](https://cachety.com/id/roadmap).

Dilisensikan di bawah **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Jika Anda menjalankan versi yang dimodifikasi sebagai layanan, AGPL mewajibkan Anda menyediakan kode sumbernya bagi pengguna.
