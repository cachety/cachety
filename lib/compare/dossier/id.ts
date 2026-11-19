import type { Comparison } from "../types";

// Comparatifs de l'outil Dossier (id). Même règle éditoriale que les autres
// comparatifs (lib/compare/types.ts) ; chaque entrée porte tool: "dossier".
//
// Halaman perbandingan alat Dossier, dalam bahasa Indonesia: menggabungkan PDF
// dan foto menjadi satu file dan menjaganya di bawah batas ukuran. Ditulis
// untuk pembaca di Indonesia. Hanya teks biasa. Setiap pernyataan tentang alat
// lain didukung halaman di `sources`, dibaca pada tanggal `checked`. Harga
// sering berubah, jadi tidak dikutip.
//
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// The Cachety column describes the Dossier tool as specified in
// docs/prd-dossier.md (Must scope). Publish with the tool, not before, and
// re-check the column against the shipped interface.

const CHECKED = "2026-11-18";
const UPDATED = "2026-11-18";

/** Alamat alat, ditulis tanpa skema. */
const TOOL = "cachety.com/id/dossier";

// Sel Cachety yang berulang di setiap halaman.
const CACHETY = {
  where: "Di browser Anda, di perangkat Anda sendiri. Tidak ada yang di-upload.",
  kept: "Tidak ada yang disimpan: tidak ada server yang menerima file Anda.",
  free: "Gratis, tanpa akun, tanpa paket berbayar, dan tanpa batas harian. Sampai 200 MB per file, 500 halaman per PDF, dan 1.000 halaman secara keseluruhan.",
  pages: "Semua halaman dari semua file dalam satu tampilan: pindahkan halaman, bahkan dari satu file ke file lain, putar, atau buang.",
  size: "Anda memilih ukuran maksimum: 1, 2, 5, atau 10 MB. Sebelum unduhan, Cachety memberi tahu apakah file akan muat dan tetap terbaca.",
  output:
    "Setiap halaman dibuat ulang sebagai gambar. Teksnya tidak bisa diseleksi atau dicari, dan PDF yang hanya berisi teks bisa menjadi lebih besar.",
  hidden: "Dihapus di setiap file: teks tersembunyi, nama pembuat dan properti lain, lampiran, tautan, dan lokasi GPS foto.",
  inputs: "PDF dan foto sekaligus, termasuk foto HEIC dari iPhone. File Word, Excel, atau PowerPoint tidak diterima.",
  offline: "Tidak perlu instal apa pun. Setelah terbuka, halaman ini tetap berjalan dalam mode pesawat, di HP maupun komputer.",
  ads: "Tanpa iklan dan tanpa pelacak. Kodenya terbuka (open source).",
};

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Seperti apa file buatan Cachety" },
  {
    type: "p",
    text: "Cachety tidak menyambung halaman asli Anda. Cachety membuat ulang setiap halaman sebagai gambar, lalu membuat PDF baru dari gambar-gambar itu. Begitulah caranya menghapus apa yang tidak terlihat: teks tersembunyi, nama pembuat, lampiran, tautan, dan lokasi GPS foto. Ada harga yang harus dibayar: teks di file baru tidak bisa diseleksi atau dicari, dan PDF yang tadinya hanya berisi teks bisa menjadi lebih besar dari aslinya, kecuali Anda memilih ukuran maksimum.",
  },
  {
    type: "warning",
    text: "Cachety bukan alat yang tepat jika teks harus tetap bisa diseleksi atau dicari, jika bookmark atau kolom formulir harus dipertahankan, jika Anda ingin menambahkan file Word atau Excel, atau jika Anda memerlukan pengenalan teks (OCR) pada hasil scan.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Cara membuat satu PDF dengan Cachety" },
  {
    type: "steps",
    items: [
      `Buka ${TOOL} di browser, di komputer atau HP. Tidak perlu instal apa pun dan tidak perlu membuat akun.`,
      "Masukkan PDF dan foto Anda. Satu foto menjadi satu halaman.",
      "Lanjut ke bagian halaman: seret ke urutan yang benar, putar yang miring, dan buang yang tidak Anda perlukan.",
      "Pilih satu file PDF dan, jika Anda diberi batas ukuran, pilih 1, 2, 5, atau 10 MB.",
      "Periksa pratinjau, sensor data yang tidak dibutuhkan penerima, lalu unduh filenya.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Apakah file saya di-upload jika memakai Cachety atau ${other}?`,
  a: `Dengan Cachety, tidak: semuanya dikerjakan di browser Anda dan tidak ada server yang menerima file Anda. ${answer}`,
});

const FAQ_TEXT = {
  q: "Apakah teksnya masih bisa diseleksi setelah digabung dengan Cachety?",
  a: "Tidak. Cachety membuat ulang setiap halaman sebagai gambar, yang menghapus data tersembunyi tetapi juga teks yang bisa diseleksi. Jika Anda memerlukan teksnya, pakai alat yang menyambung halaman aslinya.",
};

export const DOSSIER_COMPARISONS_ID: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety atau iLovePDF: gabung dan kompres PDF tanpa upload",
    metaTitle: "Alternatif iLovePDF: Gabung PDF Tanpa Upload",
    description:
      "iLovePDF menggabungkan dan mengompres PDF di servernya. Cachety melakukannya di browser Anda: tanpa upload, dan data tersembunyi dihapus. Perbandingan adil.",
    intro:
      "iLovePDF adalah salah satu kumpulan alat PDF online yang paling banyak dipakai, dibuat di Barcelona. Alat gabung dan kompresnya memproses file Anda di servernya. Cachety mengerjakan hal yang lebih sempit di perangkat Anda sendiri: menyatukan PDF dan foto menjadi satu file, di bawah batas ukuran, tanpa upload.",
    verdict:
      "iLovePDF bisa lebih banyak: file Office, pengenalan teks, banyak file sekaligus, dan aplikasi desktop berbayar yang bekerja offline. Untuk itu, iLovePDF pilihan yang lebih tepat. Cachety lebih tepat jika filenya dokumen pribadi yang tidak ingin Anda upload, jika foto dan PDF harus masuk ke file yang sama, atau jika formulir menetapkan batas ukuran dalam megabyte.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: CACHETY.where,
        other: "Di server iLovePDF untuk situs webnya. Aplikasi desktop, dengan paket berbayar, memproses file di komputer Anda.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: CACHETY.kept,
        other: "Dihapus otomatis dalam dua jam setelah diproses. Tombol di layar unduhan menghapusnya lebih cepat.",
        edge: "cachety",
      },
      {
        criterion: "Akun, pemakaian gratis, dan batasnya",
        cachety: CACHETY.free,
        other: "Gratis tanpa mendaftar, untuk jumlah dokumen yang terbatas. Gabung gratis: sampai 100 file dan 300 MB per tugas. Kompres gratis: 5 file per tugas. Paket berbayar menaikkan batas itu.",
      },
      {
        criterion: "Mengatur urutan halaman",
        cachety: CACHETY.pages,
        other: "Alat gabung mengurutkan ulang file utuh. Mengurutkan, menghapus, dan memutar halaman satu per satu dilakukan di alat terpisah, Organize PDF.",
        edge: "cachety",
      },
      {
        criterion: "Memenuhi batas ukuran",
        cachety: CACHETY.size,
        other: "Tiga tingkat kompresi: ekstrem, disarankan, dan lebih ringan. Tidak ada ukuran dalam megabyte yang bisa dituju.",
        edge: "cachety",
      },
      {
        criterion: "Foto dan PDF sekaligus",
        cachety: CACHETY.inputs,
        other: "Dalam dua langkah di situs webnya: ubah dulu gambar menjadi PDF, lalu gabungkan. File Word, Excel, dan PowerPoint punya konverternya masing-masing.",
      },
      {
        criterion: "Seperti apa PDF yang baru",
        cachety: CACHETY.output,
        other: "Tidak dijelaskan di halaman alat gabungnya. Alat terpisah mengenali teks (OCR) agar hasil scan bisa dicari.",
      },
      {
        criterion: "Data tersembunyi",
        cachety: CACHETY.hidden,
        other: "Tidak didokumentasikan untuk alat-alat di situs webnya. Aplikasi desktop bisa mengedit atau mengosongkan metadata PDF.",
      },
      {
        criterion: "Aplikasi dan pemakaian offline",
        cachety: CACHETY.offline,
        other: "Aplikasi desktop untuk Windows dan Mac yang berjalan offline: versi gratisnya adalah pembaca PDF, dan alat-alatnya memerlukan paket berbayar. Aplikasi untuk iOS dan Android.",
      },
      {
        criterion: "Iklan dan pelacak",
        cachety: CACHETY.ads,
        other: "Paket gratis menampilkan iklan; paket berbayar menghilangkannya.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Kumpulan alat online yang besar dan alat yang tetap di perangkat Anda" },
      {
        type: "p",
        text: "Di situs web iLovePDF, file Anda dikirim ke servernya, diproses di sana, dan dihapus otomatis dalam dua jam. Anda bisa menghapusnya lebih cepat dari layar unduhan. iLovePDF menyatakan memegang sertifikasi ISO/IEC 27001 dan mentransfer file lewat koneksi terenkripsi. Situsnya tersedia dalam 26 bahasa.",
      },
      {
        type: "p",
        text: "Cachety hanya menyiapkan file untuk dikirim: PDF dan foto yang diminta dari Anda, berurutan, dalam satu PDF dengan ukuran yang pas. Semuanya terjadi di browser Anda. Tidak ada upload, jadi tidak ada yang perlu dihapus sesudahnya.",
      },
      { type: "h2", text: "Kelebihan iLovePDF" },
      {
        type: "list",
        items: [
          "Mengubah file Word, Excel, dan PowerPoint menjadi PDF.",
          "Mengenali teks pada hasil scan (OCR), sehingga PDF hasil scan bisa dicari.",
          "Menerima pekerjaan besar: sampai 100 file dalam satu penggabungan gratis.",
          "Aplikasi desktop berbayarnya memproses file di komputer Anda, dengan alat yang sama seperti di situs webnya.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "File Anda tidak pernah di-upload, gratis, di HP maupun di komputer.",
          "Foto dan PDF masuk ke file yang sama dalam satu langkah, dan halaman satu per satu bisa dipindahkan, diputar, atau dibuang di tempat yang sama.",
          "Anda memilih ukuran dalam megabyte, seperti cara formulir online menyebut batasnya, dan Anda diberi tahu sebelum unduhan jika ukuran itu tidak bisa dicapai sambil tetap terbaca.",
          "Data tersembunyi dihapus dari setiap file, dan tidak ada iklan.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda perlu mengubah file Word, Excel, atau PowerPoint, atau mengenali teks hasil scan.",
      "Anda punya banyak file atau PDF yang sangat besar untuk diproses sekaligus.",
      "Anda berlangganan iLovePDF dan memakai aplikasi desktopnya, yang bekerja di komputer Anda.",
    ],
    chooseCachety: [
      "Filenya berupa dokumen identitas, slip gaji, atau rekening koran, dan Anda tidak ingin meng-upload file itu.",
      "Anda perlu foto dan PDF dalam satu file, dengan urutan halaman yang Anda tentukan.",
      "Formulir meminta satu file di bawah 1, 2, 5, atau 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Dengan situs web iLovePDF, ya: file diproses di servernya dan dihapus dalam dua jam. Aplikasi desktopnya memproses file di komputer Anda, dengan paket berbayar."
      ),
      {
        q: "Bisakah iLovePDF mengompres PDF ke ukuran yang persis?",
        a: "Tidak. iLovePDF menawarkan tiga tingkat kompresi, dan panduannya sendiri menyebut tidak ada alat yang bisa menjanjikan ukuran hasil yang persis. Dengan Cachety Anda memilih 1, 2, 5, atau 10 MB, dan Anda diberi tahu sebelum unduhan jika file tidak bisa muat sambil tetap terbaca.",
      },
      {
        q: "Apakah iLovePDF bisa dipakai offline?",
        a: "Aplikasi desktopnya untuk Windows dan Mac bisa, tetapi alat-alat di dalamnya memerlukan paket berbayar. Cachety adalah halaman web yang tetap berjalan dalam mode pesawat setelah terbuka, gratis.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: gabungkan PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: kompres PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: paket dan batas tiap alat", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: keamanan", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: tanya jawab", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "Blog iLovePDF: web, desktop, atau HP", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "Blog iLovePDF: mengatur halaman PDF", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "Blog iLovePDF: menggabungkan file PDF dan JPG", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "Blog iLovePDF: mengompres PDF ke ukuran tertentu", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "Blog iLovePDF: mengedit atau menghapus metadata PDF",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "Blog iLovePDF: 15 tahun iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
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
    title: "Cachety atau Smallpdf: gabung dan kompres PDF tanpa upload",
    metaTitle: "Alternatif Smallpdf: Gabung PDF Tanpa Upload",
    description:
      "Smallpdf menggabungkan dan mengompres PDF di cloud, dengan batas harian untuk pemakaian gratis. Cachety melakukannya di browser, gratis, tanpa upload.",
    intro:
      "Smallpdf adalah kumpulan alat PDF online yang terkenal dari Swiss, dengan aplikasi untuk HP dan Windows. Alat gabung dan kompresnya bekerja di cloud. Cachety mengerjakan hal yang lebih sempit di perangkat Anda sendiri: menyatukan PDF dan foto menjadi satu file, di bawah batas ukuran, tanpa upload.",
    verdict:
      "Smallpdf bisa lebih banyak: menerima file Word, Excel, dan PowerPoint, mengenali teks pada hasil scan, dan punya aplikasi Windows yang bekerja offline. Untuk itu, Smallpdf pilihan yang lebih tepat. Cachety lebih tepat jika filenya dokumen pribadi yang tidak ingin Anda upload, jika Anda harus menyiapkan lebih dari satu atau dua file dalam sehari, atau jika formulir menetapkan batas ukuran dalam megabyte.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: CACHETY.where,
        other: "Di cloud. File di-upload ke server yang berlokasi di Uni Eropa. Aplikasi desktop Windows menangani file secara offline.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: CACHETY.kept,
        other: "Dihapus dari server setelah satu jam, kecuali Anda menyimpannya ke akun Anda.",
        edge: "cachety",
      },
      {
        criterion: "Akun, pemakaian gratis, dan batasnya",
        cachety: CACHETY.free,
        other: "Tidak perlu mendaftar. Pemakaian gratis punya batas unduhan harian dan batas ukuran file; paket berbayar menghilangkannya.",
        edge: "cachety",
      },
      {
        criterion: "Mengatur urutan halaman",
        cachety: CACHETY.pages,
        other: "Alat gabung menyusun ulang, memutar, dan menghapus halaman. Alat Organize yang terpisah melakukan hal yang sama pada satu PDF.",
      },
      {
        criterion: "Memenuhi batas ukuran",
        cachety: CACHETY.size,
        other: "Tingkat kompresi, bukan ukuran dalam megabyte. Kompresi dasar gratis; tingkat yang lebih kuat termasuk dalam paket berbayar.",
        edge: "cachety",
      },
      {
        criterion: "Jenis file yang diterima",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG, dan PNG di alat gabung: file lain diubah dulu menjadi PDF. Foto HEIC di alat JPG ke PDF.",
        edge: "other",
      },
      {
        criterion: "Seperti apa PDF yang baru",
        cachety: CACHETY.output,
        other: "Tidak dijelaskan di halaman alat gabungnya. Pengenalan teks (OCR) ditawarkan sebagai alat terpisah.",
      },
      {
        criterion: "Data tersembunyi",
        cachety: CACHETY.hidden,
        other: "Tidak didokumentasikan untuk alat gabung di halaman produk maupun halaman bantuan.",
      },
      {
        criterion: "Aplikasi dan pemakaian offline",
        cachety: CACHETY.offline,
        other: "Aplikasi untuk iOS dan Android, dan aplikasi desktop Windows yang bekerja offline. Aplikasi desktop Mac tidak lagi didukung.",
      },
    ],
    body: [
      { type: "h2", text: "Kumpulan alat di cloud dan alat yang tetap di perangkat Anda" },
      {
        type: "p",
        text: "Smallpdf menyebut alat gabung dan kompresnya berbasis cloud: file Anda di-upload, diproses di servernya, dan dihapus setelah satu jam kecuali Anda menyimpannya ke akun Anda. Smallpdf menyatakan bersertifikat ISO/IEC 27001 dan memakai enkripsi TLS saat file ditransfer. Alat-alatnya tersedia dalam 24 bahasa.",
      },
      {
        type: "p",
        text: "Di sini Cachety hanya punya satu tugas: mengubah PDF dan foto yang diminta dari Anda menjadi satu file bersih dengan ukuran yang pas. Semuanya terjadi di browser Anda. Tidak ada upload, jadi tidak ada yang perlu dihapus sesudahnya.",
      },
      { type: "h2", text: "Kelebihan Smallpdf" },
      {
        type: "list",
        items: [
          "Mengubah file Word, Excel, dan PowerPoint menjadi PDF dan menggabungkannya sekaligus.",
          "Menawarkan pengenalan teks (OCR), sehingga hasil scan bisa dicari.",
          "Punya aplikasi HP dengan pemindai, dan aplikasi Windows yang menangani file secara offline.",
          "Dengan akun, dokumen Anda bisa disimpan online dan dibuka di perangkat lain.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "File Anda tidak pernah di-upload, di HP maupun di komputer, tanpa perlu instal apa pun.",
          "Tidak ada batas harian dan tidak ada paket berbayar.",
          "Anda memilih ukuran dalam megabyte, seperti cara formulir online menyebut batasnya, dan Anda diberi tahu sebelum unduhan jika ukuran itu tidak bisa dicapai sambil tetap terbaca.",
          "Data tersembunyi dihapus dari setiap file, tanpa langkah terpisah.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda perlu menambahkan file Word, Excel, atau PowerPoint ke PDF gabungan.",
      "Anda perlu teks hasil scan dikenali (OCR).",
      "Anda memakai Windows dan menginginkan aplikasi terpasang yang bekerja offline.",
      "Anda ingin menyimpan dokumen di akun online.",
    ],
    chooseCachety: [
      "Filenya berupa dokumen identitas, slip gaji, atau rekening koran, dan Anda tidak ingin meng-upload file itu.",
      "Formulir meminta satu file di bawah 1, 2, 5, atau 10 MB.",
      "Anda memakai HP dan tidak ingin menginstal aplikasi atau membuat akun.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Dengan alat online Smallpdf, ya: file di-upload ke servernya dan dihapus setelah satu jam kecuali Anda menyimpannya ke akun Anda. Aplikasi desktop Windows-nya menangani file secara offline."
      ),
      {
        q: "Bisakah Smallpdf mengompres PDF ke ukuran yang persis?",
        a: "Tidak. Smallpdf menawarkan tingkat kompresi, dan blognya sendiri menyebut alat itu tidak memungkinkan Anda memasukkan ukuran yang persis. Dengan Cachety Anda memilih 1, 2, 5, atau 10 MB.",
      },
      {
        q: "Apakah Smallpdf gratis?",
        a: "Sebagian. Gabung dan kompresi dasar gratis dengan batas unduhan harian; kompresi yang lebih kuat dan pemakaian tanpa batas termasuk dalam paket berbayar. Cachety gratis, tanpa batas harian dan tanpa paket berbayar.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: gabungkan PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: kompres PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: mengatur halaman PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG ke PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: harga dan perbandingan paket", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: pemberitahuan privasi", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: aplikasi dan ekstensi", url: "https://smallpdf.com/download" },
      { label: "Blog Smallpdf: mengompres PDF ke ukuran pilihan", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Tentang Smallpdf", url: "https://smallpdf.com/about" },
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
    title: "Cachety atau Adobe Acrobat online: gabung dan kompres PDF",
    metaTitle: "Alternatif Adobe Acrobat: Gabung PDF Tanpa Upload",
    description:
      "Alat online gratis Adobe menggabungkan dan mengompres PDF di server Adobe. Cachety melakukannya di browser Anda, tanpa upload dan tanpa login.",
    intro:
      "Adobe menciptakan format PDF, dan alat online gratis Acrobat-nya menggabungkan dan mengompres PDF di browser apa pun. File ditangani di server Adobe. Cachety mengerjakan hal yang lebih sempit di perangkat Anda sendiri: menyatukan PDF dan foto menjadi satu file, di bawah batas ukuran, tanpa upload.",
    verdict:
      "Untuk PDF yang teksnya harus tetap seperti semula, alat gabung Adobe pilihan yang lebih tepat: file digabungkan tanpa menurunkan kualitas gambar, teks, atau format, dan bisa sampai 100 file. Aplikasi desktop berbayarnya bisa jauh lebih banyak daripada Cachety. Cachety lebih tepat untuk dokumen pribadi yang tidak ingin Anda upload, untuk mencampur foto dan PDF secara gratis, dan untuk memenuhi batas ukuran yang disebut dalam megabyte.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: CACHETY.where,
        other: "Di server Adobe untuk alat online. Aplikasi desktop Acrobat mengompres file secara lokal di perangkat Anda.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: CACHETY.kept,
        other: "Dihapus dari server Adobe kecuali Anda login untuk menyimpannya ke akun Anda. Anda bisa menghapus sendiri sebuah file setelah mengunduhnya.",
        edge: "cachety",
      },
      {
        criterion: "Akun, pemakaian gratis, dan batasnya",
        cachety: CACHETY.free,
        other: "Gabung: sampai 100 file, masing-masing 500 halaman, tanpa watermark. Kompres: gratis dengan pemakaian terbatas; pemakaian tanpa batas memerlukan paket berbayar.",
      },
      {
        criterion: "Mengatur urutan halaman",
        cachety: CACHETY.pages,
        other: "File bisa diurutkan ulang sebelum digabung. Mengatur ulang halaman satu per satu mengharuskan login.",
        edge: "cachety",
      },
      {
        criterion: "Memenuhi batas ukuran",
        cachety: CACHETY.size,
        other: "Tiga tingkat kompresi: tinggi, sedang, dan rendah. File sampai 2 GB.",
      },
      {
        criterion: "Foto dan jenis file lain",
        cachety: CACHETY.inputs,
        other: "Alat gabung gratis menerima PDF. Menggabungkan PDF dengan file Word, Excel, PowerPoint, atau gambar adalah bagian dari Acrobat Pro. Alat terpisah mengubah gambar menjadi PDF, dan Anda harus login untuk mengunduh hasilnya.",
      },
      {
        criterion: "Seperti apa PDF yang baru",
        cachety: CACHETY.output,
        other: "File digabungkan tanpa mengompres atau menurunkan kualitas gambar, teks, atau format.",
        edge: "other",
      },
      {
        criterion: "Data tersembunyi",
        cachety: CACHETY.hidden,
        other: "Menghapus informasi tersembunyi (\"sanitize\") dan menyensor isi dokumen (redaction) adalah fitur Acrobat Pro yang berbayar.",
        edge: "cachety",
      },
      {
        criterion: "Aplikasi dan pemakaian offline",
        cachety: CACHETY.offline,
        other: "Acrobat Reader yang gratis bisa menampilkan, memberi anotasi, mengisi, dan menandatangani. Mengedit, mengonversi, dan mengompres ada di aplikasi desktop berbayar. Aplikasi HP Adobe Scan menyimpan hasil scan di penyimpanan cloud Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "Rujukan untuk PDF, dan alat kecil untuk satu tugas" },
      {
        type: "p",
        text: "Adobe menawarkan lebih dari 25 alat online gratis. Alat gabungnya menerima sampai 100 file dan menggabungkannya tanpa mengubah kualitasnya. Alat kompresnya menawarkan tiga tingkat. Keduanya mengirim file Anda ke server Adobe, dan di sana file dihapus kecuali Anda login untuk menyimpannya. Adobe menyatakan file dienkripsi saat dikirim dan saat disimpan, dan mencantumkan ISO 27001 dan SOC 2 di antara sertifikasinya untuk Acrobat di web.",
      },
      {
        type: "p",
        text: "Cachety hanya menyiapkan file untuk dikirim: PDF dan foto yang diminta dari Anda, berurutan, dalam satu PDF dengan ukuran yang pas. Semuanya terjadi di browser Anda, tanpa login di langkah mana pun.",
      },
      { type: "h2", text: "Kelebihan Adobe Acrobat" },
      {
        type: "list",
        items: [
          "PDF gabungan mempertahankan kualitas teks, gambar, dan format aslinya.",
          "Menangani pekerjaan besar: sampai 100 file dalam satu penggabungan, dan file sampai 2 GB di alat kompres.",
          "Aplikasi desktop berbayarnya mengedit teks dan gambar, mengonversi file, mengompres, dan menyensor.",
          "Jika Anda sudah berlangganan Acrobat, semuanya ada di satu tempat, dengan file Anda di akun Adobe Anda.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "File Anda tidak pernah di-upload, dan tidak ada login di tahap mana pun.",
          "Memindahkan, memutar, dan membuang halaman satu per satu gratis dan tidak memerlukan akun.",
          "Foto dan PDF masuk ke file yang sama secara gratis, termasuk foto HEIC dari iPhone.",
          "Data tersembunyi dihapus dari setiap file, fitur yang oleh Adobe disediakan di paket Pro berbayar.",
          "Anda memilih ukuran dalam megabyte dan diberi tahu sebelum unduhan apakah ukuran itu bisa dicapai.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Teks di PDF gabungan harus tetap bisa diseleksi dan dicari.",
      "Anda punya puluhan file atau PDF yang sangat besar untuk digabungkan.",
      "Anda sudah berlangganan Acrobat, atau Anda juga perlu mengedit, mengonversi, atau mengenali teks.",
    ],
    chooseCachety: [
      "Filenya berupa dokumen identitas, slip gaji, atau rekening koran, dan Anda tidak ingin meng-upload file itu.",
      "Anda ingin mengurutkan ulang, memutar, atau membuang halaman tanpa login.",
      "Anda perlu mencampur foto dan PDF, dan menjaga hasilnya di bawah 1, 2, 5, atau 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Dengan alat online Adobe, ya: file ditangani di server Adobe dan dihapus kecuali Anda login untuk menyimpannya. Aplikasi desktop Acrobat bekerja di perangkat Anda sendiri."
      ),
      {
        q: "Apakah perlu akun Adobe untuk menggabungkan PDF?",
        a: "Tidak untuk menggabungkan dan mengunduh. Adobe meminta Anda login untuk mengatur ulang halaman satu per satu, membagikan file lewat tautan, atau mengunduh PDF yang dibuat dari gambar. Cachety sama sekali tidak memakai akun.",
      },
      {
        q: "Bisakah Acrobat online menghapus metadata dari PDF?",
        a: "Menghapus informasi tersembunyi adalah fitur Acrobat Pro yang berbayar. Cachety menghapus data tersembunyi dari setiap file yang dibuatnya, dengan membuat ulang halaman sebagai gambar.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: alat online gratis", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: gabungkan PDF", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: kompres PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG ke PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: mengurutkan ulang halaman PDF", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: menghapus halaman PDF", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: perbandingan paket", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: ikhtisar keamanan",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: daftar kepatuhan", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
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
    title: "Cachety atau PDF24: gabung dan kompres PDF tanpa upload",
    metaTitle: "Alternatif PDF24: Gabung PDF Tanpa Upload",
    description:
      "Alat online PDF24 menggabungkan dan mengompres PDF di servernya; aplikasi Windows-nya bekerja offline. Cachety berjalan di browser apa pun, tanpa upload.",
    intro:
      "PDF24 adalah kumpulan alat PDF gratis dari Jerman. Alat online-nya memproses file di server PDF24, dan program Windows-nya, PDF24 Creator, mengerjakan hal yang sama di PC Anda. Cachety berjalan di browser perangkat apa pun dan tidak pernah meng-upload file Anda, tetapi cakupan kerjanya lebih sempit.",
    verdict:
      "Di komputer Windows, PDF24 Creator sulit ditandingi: gratis, bekerja offline, dan menyambung halaman aslinya, sehingga teks tetap seperti semula. Di HP, Mac, atau komputer yang tidak bisa Anda pasangi apa pun, PDF24 berarti alat online-nya, yang meng-upload file Anda. Di situ Cachety lebih tepat untuk dokumen pribadi, dan Anda bisa memilih ukuran dalam megabyte.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: CACHETY.where,
        other: "Alat online: di cloud, di server PDF24. PDF24 Creator (Windows): di PC Anda, tanpa upload.",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: CACHETY.kept,
        other: "Online: dihapus otomatis setelah satu jam. File juga bisa langsung dihapus secara manual.",
        edge: "cachety",
      },
      {
        criterion: "Akun, pemakaian gratis, dan batasnya",
        cachety: CACHETY.free,
        other: "Gratis dan tanpa batasan, tanpa pendaftaran. Secara online, satu file bisa sampai 1.000 MB dan satu pekerjaan sampai 10 GB.",
      },
      {
        criterion: "Mengatur urutan halaman",
        cachety: CACHETY.pages,
        other: "File diurutkan ulang dengan seret dan lepas. Mode halaman menampilkan halaman dari semua file. Memutar dan menghapus halaman adalah alat terpisah.",
      },
      {
        criterion: "Memenuhi batas ukuran",
        cachety: CACHETY.size,
        other: "Anda mengatur resolusi (DPI) dan kualitas gambar, dengan pilihan skala abu-abu. Tidak ada pilihan \"kompres ke 5 MB\".",
        edge: "cachety",
      },
      {
        criterion: "Jenis file yang diterima",
        cachety: CACHETY.inputs,
        other: "PDF, gambar, dokumen Word, dan file lain. Foto HEIC dari iPhone tidak didukung di alat gabung.",
      },
      {
        criterion: "Seperti apa PDF yang baru",
        cachety: CACHETY.output,
        other: "Halaman diambil apa adanya, tidak dibuat ulang: teks, gambar, dan font mempertahankan kualitasnya.",
        edge: "other",
      },
      {
        criterion: "Data tersembunyi",
        cachety: CACHETY.hidden,
        other: "Alat terpisah menghapus metadata PDF.",
      },
      {
        criterion: "Aplikasi dan pemakaian offline",
        cachety: CACHETY.offline,
        other: "PDF24 Creator menghadirkan semua alat secara offline, hanya di Windows. Belum ada versi Mac atau Linux, dan tidak ada aplikasi di toko aplikasi HP.",
      },
      {
        criterion: "Iklan dan pelacak",
        cachety: CACHETY.ads,
        other: "Alat online dibiayai iklan. Kebijakan privasinya menyebut Google AdSense dan Google Analytics.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Dua cara memakai PDF24" },
      {
        type: "p",
        text: "Alat online PDF24 gratis, tidak memerlukan pendaftaran, dan dibiayai iklan. Alat ini memproses file Anda di server PDF24: transfernya dienkripsi, dan file dihapus setelah satu jam. PDF24 dijalankan oleh perusahaan yang berkantor di Berlin.",
      },
      {
        type: "p",
        text: "PDF24 Creator lain lagi. Ini program Windows gratis yang menghadirkan semua alat PDF24 di PC Anda, dan di sana file tetap lokal dan tidak di-upload. Jika Anda memakai Windows dan bisa menginstal perangkat lunak, program ini memberi Anda privasi seperti Cachety dan lebih banyak fitur.",
      },
      { type: "h2", text: "Kelebihan PDF24" },
      {
        type: "list",
        items: [
          "PDF gabungan mempertahankan halaman aslinya, sehingga teks tetap bisa diseleksi dan file tetap ringan.",
          "Menerima dokumen Word dan file lain, dan menawarkan pengenalan teks (OCR).",
          "Di Windows, PDF24 Creator mengerjakan semua ini secara offline, gratis.",
          "Anda bisa mengatur sendiri resolusi dan kualitas gambar kompresinya.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Tanpa upload di perangkat apa pun: HP, Mac, komputer Linux, atau PC yang tidak bisa Anda pasangi perangkat lunak.",
          "Anda memilih ukuran dalam megabyte, tanpa perlu mencoba-coba pengaturan sampai file cukup kecil.",
          "Foto HEIC dari iPhone diterima apa adanya.",
          "Data tersembunyi dihapus dari setiap file tanpa langkah terpisah.",
          "Tanpa iklan dan tanpa pelacak.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda memakai Windows dan bisa menginstal PDF24 Creator: programnya bekerja offline dan mempertahankan halaman asli.",
      "Teks di PDF gabungan harus tetap bisa diseleksi dan dicari.",
      "Anda perlu menambahkan dokumen Word atau mengenali teks hasil scan.",
      "Anda ingin mengatur sendiri resolusi dan kualitas gambar.",
    ],
    chooseCachety: [
      "Anda memakai HP, Mac, atau komputer yang tidak bisa dipasangi perangkat lunak, dan Anda tidak ingin meng-upload dokumen Anda.",
      "Formulir meminta satu file di bawah 1, 2, 5, atau 10 MB.",
      "Foto Anda berasal dari iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Dengan alat online PDF24, ya: file diproses di servernya dan dihapus setelah satu jam. Dengan PDF24 Creator di Windows, tidak: file tetap di PC Anda."
      ),
      {
        q: "Bisakah PDF24 mengompres PDF ke ukuran tertentu?",
        a: "Tidak secara langsung. Anda mengatur resolusi dan kualitas gambar, dan panduan PDF24 sendiri menyebut tidak ada pilihan \"kompres ke 5 MB\". Dengan Cachety Anda memilih 1, 2, 5, atau 10 MB.",
      },
      {
        q: "Apakah PDF24 bisa dipakai offline di Mac atau HP?",
        a: "Tidak. PDF24 Creator hanya untuk Windows. Di Mac atau HP, PDF24 menawarkan alat online-nya, yang memproses file di servernya. Cachety berjalan di browser perangkat apa pun tanpa upload.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: gabungkan PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: kompres PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: gambar ke PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: hapus metadata PDF", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: tanya jawab", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "Bantuan PDF24: menggabungkan file PDF", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "Bantuan PDF24: mengompres PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "Bantuan PDF24: Mac, Linux, dan HP", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: kebijakan privasi", url: "https://www.pdf24.org/en/privacy-policy" },
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
    title: "Cachety atau Sejda: gabung dan kompres PDF tanpa upload",
    metaTitle: "Alternatif Sejda: Gabung PDF Tanpa Upload",
    description:
      "Sejda menggabungkan dan mengompres PDF online, atau di komputer lewat aplikasi desktopnya, dengan batas gratis. Cachety berjalan di browser, tanpa upload.",
    intro:
      "Sejda adalah kumpulan alat PDF dari Belanda yang punya dua wajah: alat online yang memproses file di servernya, dan Sejda Desktop, aplikasi untuk Mac, Windows, dan Linux yang memprosesnya di komputer Anda. Keduanya punya batas pemakaian gratis. Cachety berjalan di browser perangkat apa pun, tidak meng-upload apa pun, dan tidak punya batas per jam atau per hari, tetapi cakupan kerjanya lebih sempit.",
    verdict:
      "Alat gabung Sejda lebih kaya: mempertahankan bookmark, membuat daftar isi, dan bisa mencetak nama file di kaki halaman. Sejda Desktop menjaga file tetap di komputer Anda. Pilih Sejda jika Anda memerlukan pilihan-pilihan itu. Pilih Cachety untuk dokumen pribadi di HP atau tanpa instal apa pun, untuk file yang melebihi batas gratis Sejda, dan untuk batas ukuran yang disebut dalam megabyte.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: CACHETY.where,
        other: "Online: di-upload dan diproses di server Sejda. Sejda Desktop: di komputer Anda, tidak di-upload.",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: CACHETY.kept,
        other: "Online: dihapus otomatis setelah 2 jam. Ada tombol untuk menghapusnya lebih cepat.",
        edge: "cachety",
      },
      {
        criterion: "Akun, pemakaian gratis, dan batasnya",
        cachety: CACHETY.free,
        other: "Tanpa mendaftar. Gabung online gratis: sampai 50 halaman atau 50 MB, 3 tugas per jam. Kompres gratis: sampai 200 halaman atau 100 MB. Desktop gratis: 3 tugas per hari. Paket berbayar menghilangkan batas itu.",
        edge: "cachety",
      },
      {
        criterion: "Mengatur urutan halaman",
        cachety: CACHETY.pages,
        other: "File diurutkan ulang dengan seret dan lepas. Tampilan halaman bisa menghapus, mengurutkan ulang, dan menggandakan halaman sebelum digabung.",
      },
      {
        criterion: "Memenuhi batas ukuran",
        cachety: CACHETY.size,
        other: "Pengaturan kualitas gambar dan resolusi, dengan pilihan skala abu-abu. Tidak ada ukuran dalam megabyte yang bisa dituju.",
        edge: "cachety",
      },
      {
        criterion: "Jenis file yang diterima",
        cachety: CACHETY.inputs,
        other: "PDF dan gambar seperti JPG dan PNG di alat gabung. Gambar HEIC tidak didukung.",
      },
      {
        criterion: "Pilihan penggabungan",
        cachety: "Tidak ada selain urutan halaman: tanpa bookmark, tanpa daftar isi.",
        other: "Bookmark dipertahankan atau dibuat per file, daftar isi, halaman kosong untuk cetak bolak-balik, nama file di kaki halaman.",
        edge: "other",
      },
      {
        criterion: "Data tersembunyi",
        cachety: CACHETY.hidden,
        other: "Alat terpisah mengedit metadata PDF.",
      },
      {
        criterion: "Aplikasi dan pemakaian offline",
        cachety: CACHETY.offline,
        other: "Sejda Desktop untuk Mac, Windows, dan Linux bekerja offline, dengan fitur yang sama seperti layanan online-nya.",
      },
    ],
    body: [
      { type: "h2", text: "Online atau di komputer Anda: Sejda menawarkan keduanya" },
      {
        type: "p",
        text: "Di situs web Sejda, Anda meng-upload dokumen dan dokumen itu diproses di servernya. Sejda menyatakan file dienkripsi saat dikirim dan saat disimpan, dan dihapus otomatis setelah dua jam. Layanan gratisnya dibatasi menurut jumlah halaman, megabyte, dan tugas per jam.",
      },
      {
        type: "p",
        text: "Sejda Desktop memproses file di komputer Anda, tanpa upload, di Mac, Windows, dan Linux. Versi gratisnya mengizinkan tiga tugas sehari. Ada satu hal yang penting untuk dokumen pribadi: ketentuan layanan Sejda menyebut pengguna tidak boleh mengirimkan informasi pribadi yang sensitif, seperti nomor identitas yang diterbitkan pemerintah, ke layanan online-nya.",
      },
      { type: "h2", text: "Kelebihan Sejda" },
      {
        type: "list",
        items: [
          "Pilihan penggabungan yang tidak dimiliki Cachety: bookmark, daftar isi, halaman kosong untuk cetak bolak-balik.",
          "Aplikasi desktop untuk Mac, Windows, dan Linux yang menjaga file tetap di komputer Anda.",
          "Banyak alat lain di tempat yang sama: pengenalan teks (OCR), pemotongan, pelurusan hasil scan, pengeditan.",
          "Kendali yang rinci atas kompresi, dengan pengaturan kualitas gambar dan resolusi.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Tidak ada yang di-upload dan tidak ada yang diinstal, di HP maupun di komputer.",
          "Tidak ada batas 50 halaman dan tidak ada batas jumlah tugas per jam atau per hari: file 60 halaman atau file keempat dalam satu jam bukan masalah.",
          "Anda memilih ukuran dalam megabyte, dan diberi tahu sebelum unduhan apakah ukuran itu bisa dicapai.",
          "Foto HEIC dari iPhone diterima apa adanya, dan data tersembunyi dihapus dari setiap file.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda memerlukan bookmark atau daftar isi di PDF gabungan.",
      "Anda bisa menginstal Sejda Desktop dan pekerjaan Anda masuk dalam batas gratisnya, atau Anda punya paket berbayar.",
      "Anda memerlukan pengenalan teks, pemotongan, atau pelurusan hasil scan.",
    ],
    chooseCachety: [
      "Filenya berupa dokumen identitas, slip gaji, atau rekening koran, dan Anda memakai HP atau tidak bisa menginstal perangkat lunak.",
      "File Anda lebih dari 50 halaman, atau Anda harus menyiapkan beberapa file dalam jam yang sama.",
      "Formulir meminta satu file di bawah 1, 2, 5, atau 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Dengan alat online Sejda, ya: file di-upload ke servernya dan dihapus setelah dua jam. Dengan Sejda Desktop, tidak: file diproses di komputer Anda."
      ),
      {
        q: "Apa batas gratis Sejda untuk menggabungkan PDF?",
        a: "Secara online, dokumen sampai 50 halaman atau 50 MB dan tiga tugas per jam. Versi gratis Sejda Desktop mengizinkan tiga tugas per hari. Cachety tidak punya batas seperti itu: sampai 1.000 halaman dalam satu file.",
      },
      {
        q: "Bisakah Sejda mengompres PDF ke ukuran tertentu?",
        a: "Alat kompresnya menawarkan pengaturan kualitas gambar dan resolusi, bukan ukuran yang bisa dituju. Dengan Cachety Anda memilih 1, 2, 5, atau 10 MB.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: gabungkan PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: kompres PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG ke PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: mengatur halaman PDF", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: mengedit metadata PDF", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: harga dan tanya jawab", url: "https://www.sejda.com/pricing" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Keamanan di Sejda", url: "https://www.sejda.com/security" },
      { label: "Sejda: kebijakan privasi", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: ketentuan layanan", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
