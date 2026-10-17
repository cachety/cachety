import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (id). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// Halaman perbandingan alat tanda tangan, dalam bahasa Indonesia. Setiap
// pernyataan tentang alat lain didukung halaman di `sources`, dibaca pada
// 2026-10-17. Harga tidak dikutip. Hanya teks biasa.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Sel Cachety yang berulang di setiap halaman.
const C = {
  purpose: "Menandatangani sendiri sebuah dokumen, lalu mengunduh PDF yang sudah ditandatangani.",
  where: "Di perangkat Anda sendiri, di dalam browser. Dokumen tidak di-upload ke server mana pun.",
  account: "Tanpa akun, tanpa daftar. Gratis, tanpa paket berbayar.",
  create:
    "Gambar dengan jari atau mouse, ketik nama, atau unggah foto tanda tangan (latarnya dihapus). Tanggal, tempat, dan catatan singkat di bawahnya bersifat opsional.",
  signers: "Tidak: satu orang menandatangani dokumennya sendiri. Tidak ada pengiriman ke orang lain maupun urutan penandatangan.",
  audit:
    "Tidak ada jejak audit atau stempel waktu. Setelah mengunduh, sidik jari SHA-256 file ditampilkan untuk Anda simpan.",
  identity: "Tidak ada: Cachety tidak memeriksa siapa yang menandatangani.",
  level: "Tanda tangan elektronik tidak tersertifikasi: gambar yang ditempatkan di halaman, tanpa sertifikat elektronik.",
  stored: "Tidak ada: dokumen dan tanda tangan hanya ada di memori tab.",
  ads: "Tanpa iklan dan tanpa pelacak.",
  phone: "Berjalan di browser HP, tanpa aplikasi. Foto dokumen kertas menjadi halaman seukuran A4.",
};

const LEGAL: GuideBlock[] = [
  { type: "h2", text: "Seberapa kuat tanda tangan dari Cachety" },
  {
    type: "p",
    text: "Tanda tangan yang digambar atau diketik lalu ditempatkan di dokumen adalah tanda tangan elektronik tidak tersertifikasi. Untuk dokumen sehari-hari, seperti perjanjian sewa kos atau kontrakan, surat izin sekolah, atau penawaran harga, biasanya ini diterima. Jika terjadi sengketa, pihak yang mengandalkan dokumen itulah yang harus membuktikan siapa yang menandatanganinya: simpan email atau pesan WhatsApp yang Anda pakai untuk mengirimnya kembali. Tanda tangan elektronik tersertifikasi, yang dibuat dengan sertifikat dari penyelenggara resmi, punya kekuatan pembuktian yang lebih kuat.",
  },
  {
    type: "warning",
    text: "Tanda tangan dari Cachety adalah gambar, sama seperti tanda tangan yang dipindai. Gambar itu sendiri tidak membuktikan siapa yang menandatangani atau bahwa dokumen tidak diubah sesudahnya, sehingga mudah dibantah. Jangan pakai Cachety jika diwajibkan tanda tangan elektronik tersertifikasi, jika hukum mewajibkan bentuk khusus seperti surat wasiat atau akta notaris, atau jika pihak lain meminta platform tanda tangan tertentu. Ini bukan nasihat hukum.",
  },
];

const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "Cara tanda tangan dengan Cachety" },
  {
    type: "steps",
    items: [
      "Buka cachety.com/id/sign di browser HP atau komputer. Tidak perlu instal apa pun, tidak perlu akun.",
      "Masukkan PDF atau foto dokumen Anda. Beberapa dokumen bisa ditambahkan sekaligus.",
      "Gambar, ketik, atau unggah tanda tangan Anda. Jika mau, biarkan tanggal hari ini dan tambahkan tempat serta catatan seperti \"Telah dibaca dan disetujui\".",
      "Geser tanda tangan ke garis yang tepat dan atur ukurannya. Jika diminta paraf di setiap halaman, aktifkan pilihan itu.",
      "Periksa pratinjau, lalu unduh PDF yang sudah ditandatangani. Simpan sidik jari file yang muncul setelah unduhan.",
    ],
  },
  {
    type: "tip",
    text: "Tes mode pesawat: buka cachety.com/id/sign, nyalakan mode pesawat, lalu tanda tangani dokumen. Jika tetap berjalan, tidak ada yang keluar dari perangkat Anda. Platform yang menerima file tidak bisa bekerja tanpa internet.",
  },
];

export const SIGN_COMPARISONS_ID: Comparison[] = [
  // ---------------------------------------------------------------- DocuSign
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety atau DocuSign: mana yang cocok untuk tanda tangan dokumen?",
    metaTitle: "DocuSign atau Cachety: Tanda Tangan PDF Tanpa Upload",
    description:
      "DocuSign mengirim kontrak ke banyak penanda tangan dengan jejak audit. Cachety menandatangani PDF Anda di perangkat sendiri, gratis dan tanpa akun.",
    intro:
      "DocuSign adalah platform tanda tangan elektronik: Anda mengirim dokumen, orang lain menandatanganinya, dan semuanya tercatat. Cachety melakukan hal lain: membantu Anda menandatangani sendiri sebuah PDF di browser, tanpa akun dan tanpa meng-upload file.",
    verdict:
      "Keduanya tidak mengerjakan hal yang sama. Untuk kontrak dengan beberapa pihak, urutan penandatangan, verifikasi identitas, dan sertifikat penyelesaian, DocuSign adalah pilihan yang lebih tepat. Untuk menandatangani sendiri perjanjian sewa, surat izin, atau penawaran harga lalu mengirimnya kembali, Cachety selesai dalam semenit, gratis, dan dokumen tidak keluar dari perangkat Anda. Sebagai gantinya, tanda tangan dari Cachety hanyalah gambar, sehingga lebih mudah dibantah.",
    table: [
      {
        criterion: "Kegunaan",
        cachety: C.purpose,
        other: "Mengirim dokumen untuk ditandatangani orang lain, memantau prosesnya, dan menyimpan buktinya.",
      },
      {
        criterion: "Di mana dokumen disimpan",
        cachety: C.where,
        other:
          "Di cloud DocuSign, di salah satu dari lima wilayah pusat data (Amerika Serikat, Kanada, Eropa, Australia, Jepang). Pelanggan menentukan berapa lama dokumen disimpan.",
        edge: "cachety",
      },
      {
        criterion: "Akun dan biaya",
        cachety: C.account,
        other:
          "Penerima menandatangani gratis tanpa akun. Untuk mengirim, ada uji coba gratis 30 hari, lalu paket berbayar (Personal, Standard, Business Pro, Advanced).",
        edge: "cachety",
      },
      {
        criterion: "Cara membuat tanda tangan",
        cachety: C.create,
        other: "Gaya otomatis dari nama Anda, digambar, atau foto tanda tangan (PNG, JPG, BMP, atau GIF, maksimal 200 KB).",
      },
      {
        criterion: "Beberapa penanda tangan",
        cachety: C.signers,
        other: "Ya, berurutan, paralel, atau campuran, dengan pengingat otomatis, templat, dan pengiriman massal.",
        edge: "other",
      },
      {
        criterion: "Bukti penandatanganan",
        cachety: C.audit,
        other: "Sertifikat penyelesaian dan log audit di semua paket.",
        edge: "other",
      },
      {
        criterion: "Verifikasi identitas",
        cachety: C.identity,
        other: "Kode sekali pakai lewat SMS, telepon, atau verifikasi tanda pengenal resmi.",
        edge: "other",
      },
      {
        criterion: "Jenis tanda tangan",
        cachety: C.level,
        other:
          "Dokumen disegel secara digital dengan infrastruktur kunci publik (PKI). Tanda tangan elektronik terkualifikasi standar Eropa tersedia sebagai tambahan paket.",
        edge: "other",
      },
      {
        criterion: "Kolom di dokumen",
        cachety: "Tanda tangan, tanggal, tempat, catatan singkat, dan paraf di setiap halaman.",
        other: "Paraf, teks, kotak centang, tombol pilihan, daftar tarik-turun, dan kolom lain.",
        edge: "other",
      },
      {
        criterion: "Di HP",
        cachety: C.phone,
        other: "Aplikasi untuk iPhone dan Android.",
      },
    ],
    body: [
      { type: "h2", text: "Dua alat untuk pekerjaan yang berbeda" },
      {
        type: "p",
        text: "DocuSign dibuat untuk pihak yang perlu mengumpulkan tanda tangan: perusahaan yang mengirim kontrak ke klien, bagian HR yang mengirim dokumen ke karyawan, atau agen properti yang mengatur tanda tangan beberapa pihak. Dokumen diunggah ke platform, setiap orang menerima tautan dan menandatangani sesuai urutan. Di akhir, ada sertifikat penyelesaian yang mencatat siapa melakukan apa.",
      },
      {
        type: "p",
        text: "Cachety menangani kasus yang lebih sederhana tetapi sangat sering terjadi: seseorang mengirim PDF untuk Anda tanda tangani dan kirim kembali. Anda menggambar atau mengetik tanda tangan, menaruhnya di tempat yang tepat, lalu mengunduh file, tanpa membuat akun dan tanpa dokumen melewati server.",
      },
      { type: "h2", text: "Di mana dokumen Anda berada" },
      {
        type: "p",
        text: "Di DocuSign, dokumen disimpan di cloud perusahaan, di salah satu dari lima wilayah pusat data yang tersedia, dan pengirim menentukan berapa lama dokumen itu disimpan serta bisa menghapusnya kapan saja. Itu masuk akal: bukti tanda tangan memang harus disimpan di suatu tempat. Di Cachety, dokumen dibaca di memori browser dan PDF yang sudah ditandatangani langsung disimpan di perangkat Anda. Tidak ada salinan di pihak lain.",
      },
      { type: "h2", text: "Kelebihan DocuSign" },
      {
        type: "list",
        items: [
          "Beberapa penanda tangan, berurutan atau bersamaan, dengan pengingat otomatis.",
          "Sertifikat penyelesaian dan log audit di semua paket.",
          "Verifikasi identitas lewat SMS, telepon, atau tanda pengenal resmi.",
          "Dokumen disegel dengan PKI, dan tanda tangan terkualifikasi standar Eropa sebagai tambahan.",
          "Penandatanganan dalam 44 bahasa, lebih dari 1.100 integrasi, dan API untuk otomatisasi.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Gratis dan tanpa akun, juga untuk menandatangani dokumen Anda sendiri.",
          "Dokumen tidak keluar dari perangkat, dan tetap berjalan dalam mode pesawat.",
          "Foto dokumen kertas menjadi halaman seukuran A4, siap ditandatangani.",
          "PDF hasil tanda tangan bersih dari teks tersembunyi, metadata, dan lokasi GPS foto, dengan kata sandi opsional.",
          "Paraf di setiap halaman dan watermark opsional berisi keperluan, penerima, dan tanggal.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Kontrak harus ditandatangani beberapa orang dengan urutan tertentu.",
      "Anda butuh jejak audit, sertifikat penyelesaian, atau verifikasi identitas penanda tangan.",
      "Diminta tanda tangan berbasis sertifikat, bukan sekadar gambar.",
      "Perusahaan Anda sering mengirim dokumen untuk ditandatangani dan butuh templat, pengingat, serta integrasi.",
    ],
    chooseCachety: [
      "Anda hanya perlu menandatangani dan mengirim kembali dokumen sehari-hari, seperti perjanjian sewa, surat izin, atau penawaran harga.",
      "Anda tidak ingin membuat akun atau meng-upload dokumen ke server.",
      "Anda ingin tanda tangan dari HP, bahkan dari foto dokumen kertas, tanpa instal aplikasi.",
    ],
    faq: [
      {
        q: "Apakah DocuSign bisa dipakai gratis?",
        a: "Untuk menandatangani dokumen yang dikirim seseorang lewat DocuSign, ya: penerima menandatangani gratis tanpa akun. Untuk mengirim dokumen, DocuSign menawarkan uji coba gratis 30 hari, lalu paket berbayar.",
      },
      {
        q: "Apakah tanda tangan dari Cachety sekuat DocuSign?",
        a: "Tidak. Cachety menempatkan gambar tanda tangan Anda di halaman, yaitu tanda tangan elektronik tidak tersertifikasi, dan tidak mencatat siapa yang menandatangani atau kapan. DocuSign menambahkan segel digital, log audit, dan jika diatur, verifikasi identitas. Dalam sengketa, bukti seperti itu berpengaruh. Untuk dokumen sehari-hari, tanda tangan sederhana biasanya diterima.",
      },
      {
        q: "Saya menerima kontrak lewat DocuSign. Bisakah saya menandatanganinya dengan Cachety?",
        a: "Sebaiknya tidak. Jika pihak lain mengirim lewat DocuSign, mereka menunggu tanda tangan di dalam platform itu beserta catatannya. Tanda tangani lewat tautan yang Anda terima. Cachety cocok jika Anda menerima PDF lewat email atau WhatsApp dan diminta mengirimnya kembali dalam keadaan sudah ditandatangani.",
      },
      {
        q: "Apakah DocuSign menyimpan dokumen saya?",
        a: "Ya, di cloud perusahaan, di salah satu wilayah pusat datanya. Pengirim menentukan jangka waktunya dan bisa menghapus kapan saja. Di Cachety tidak ada yang perlu dihapus: dokumen tidak pernah dikirim.",
      },
    ],
    sources: [
      { label: "DocuSign: uji coba gratis 30 hari", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign: tanda tangan gratis tanpa akun", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign: paket eSignature", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign: fitur eSignature", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign: mengatur tanda tangan", url: "https://docusign.com/blog/quick-tip-customizing-your-signature" },
      {
        label: "DocuSign: tanda tangan terkualifikasi",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature",
      },
      { label: "DocuSign: bahasa dan integrasi", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign: wilayah pusat data", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign: pengelolaan dan retensi data", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Youtrust (sebelumnya Yousign)
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (sebelumnya Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety atau Youtrust (sebelumnya Yousign): mana yang cocok?",
    metaTitle: "Youtrust (sebelumnya Yousign) atau Cachety untuk PDF",
    description:
      "Youtrust (sebelumnya Yousign) adalah platform tanda tangan elektronik Prancis, dengan akun dan arsip bukti. Bandingkan dengan Cachety di perangkat Anda.",
    intro:
      "Yousign, platform tanda tangan elektronik asal Prancis, berganti nama menjadi Youtrust sejak Juli 2026. Layanan ini menyimpan bukti setiap tanda tangan dan menawarkan tingkat lanjutan dan terkualifikasi. Cachety adalah alat sederhana untuk menandatangani sendiri sebuah PDF di browser, tanpa akun.",
    verdict:
      "Jika Anda perlu mengirim kontrak untuk ditandatangani orang lain, dengan arsip bukti bertanda waktu, atau butuh tanda tangan lanjutan atau terkualifikasi, Youtrust adalah pilihan yang lebih tepat. Jika Anda hanya perlu menandatangani dan mengirim kembali dokumen sehari-hari, Cachety melakukannya tanpa akun dan tanpa file keluar dari perangkat. Namun tanda tangan dari Cachety hanyalah gambar, sehingga lebih mudah dibantah.",
    table: [
      {
        criterion: "Kegunaan",
        cachety: C.purpose,
        other: "Menandatangani dan meminta tanda tangan, dengan tingkat sederhana, lanjutan, dan terkualifikasi.",
      },
      {
        criterion: "Di mana dokumen disimpan",
        cachety: C.where,
        other: "Di server Youtrust, yang dihosting khusus di Prancis. Bukti tanda tangan diarsipkan oleh Arkhinéo.",
        edge: "cachety",
      },
      {
        criterion: "Akun",
        cachety: "Tanpa akun, tanpa daftar.",
        other: "Wajib, termasuk untuk paket gratis.",
        edge: "cachety",
      },
      {
        criterion: "Paket gratis",
        cachety: "Semuanya gratis: tidak ada paket berbayar.",
        other: "Tanpa iklan, tanda tangan dokumen sendiri tanpa batas, dan 2 permintaan tanda tangan per bulan. Paket berbayar: One, Plus, Pro.",
      },
      {
        criterion: "Bukti penandatanganan",
        cachety: C.audit,
        other: "Berkas bukti bertanda waktu yang diarsipkan 10 tahun, di semua paket.",
        edge: "other",
      },
      {
        criterion: "Tingkat tanda tangan",
        cachety: C.level,
        other:
          "Sederhana (dengan kode opsional), lanjutan (dengan verifikasi identitas), dan terkualifikasi (dengan verifikasi identitas lewat video). Lanjutan dan terkualifikasi adalah tambahan berbayar di paket Plus dan Pro.",
        edge: "other",
      },
      {
        criterion: "Alur penandatanganan",
        cachety: C.signers,
        other: "Persetujuan, urutan penanda tangan, pengingat otomatis, dan templat. Terhubung dengan Zapier dan HubSpot; API adalah produk terpisah.",
        edge: "other",
      },
      {
        criterion: "Cara membuat tanda tangan",
        cachety: C.create,
        other: "Digambar, diketik, atau diunggah, tanpa perlu instal aplikasi.",
      },
      {
        criterion: "Apa yang disimpan",
        cachety: C.stored,
        other: "Bukti tanda tangan selama 10 tahun dan data identitas selama 90 hari, menurut kebijakan privasinya.",
      },
    ],
    body: [
      { type: "h2", text: "Yousign kini bernama Youtrust" },
      {
        type: "p",
        text: "Sejak Juli 2026, Yousign memakai nama Youtrust. Perusahaan pengelolanya, Youtrust SAS, berkedudukan di Caen, Prancis. Selama masa transisi, aplikasinya mungkin masih tampil dengan nama Yousign, dan perpindahannya ditargetkan selesai paling lambat 2027. Jika Anda mengenal Yousign, ini layanan yang sama.",
      },
      { type: "h2", text: "Dua alat untuk pekerjaan yang berbeda" },
      {
        type: "p",
        text: "Youtrust adalah platform tanda tangan elektronik: Anda mengirim dokumen, mengundang para penanda tangan, memantau siapa yang sudah menandatangani, dan di akhir mendapat berkas bukti bertanda waktu. Perusahaan ini menyatakan tanda tangannya sesuai regulasi Eropa eIDAS dan berlaku di Uni Eropa dan Inggris, tidak seperti tanda tangan yang hanya berupa gambar atau hasil pindaian. Untuk dokumen yang dipakai di Indonesia, tanyakan kepada penerima jenis tanda tangan apa yang mereka terima.",
      },
      {
        type: "p",
        text: "Cachety tidak mengirim apa pun ke siapa pun. Alat ini untuk kasus ketika seseorang mengirim PDF agar Anda tanda tangani dan kirim kembali: Anda menaruh tanda tangan, mengunduh file, lalu membalas email atau pesan.",
      },
      { type: "h2", text: "Di mana dokumen Anda berada" },
      {
        type: "p",
        text: "Di Youtrust, dokumen berada di server perusahaan yang dihosting hanya di Prancis, dan bukti tanda tangan disimpan selama 10 tahun. Itu bagian dari layanannya: bertahun-tahun kemudian, tetap bisa ditunjukkan siapa yang menandatangani dan kapan. Di Cachety, dokumen tidak pernah keluar dari perangkat, sehingga juga tidak ada catatan yang disimpan pihak lain. Jika tanda tangan dibantah, yang Anda punya hanyalah PDF Anda, sidik jarinya, dan email atau pesan yang dipakai untuk mengirimnya.",
      },
      { type: "h2", text: "Kelebihan Youtrust" },
      {
        type: "list",
        items: [
          "Berkas bukti bertanda waktu, diarsipkan 10 tahun, di semua paket termasuk yang gratis.",
          "Tanda tangan lanjutan dan terkualifikasi dengan verifikasi identitas, sebagai tambahan berbayar.",
          "Terdaftar di daftar Uni Eropa untuk penyelenggara layanan kepercayaan terkualifikasi.",
          "Urutan penanda tangan, persetujuan, pengingat otomatis, dan templat.",
          "Kode akses lewat SMS sebelum menandatangani, di paket Plus.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Tidak perlu membuat akun: buka halaman, lalu tanda tangani.",
          "Dokumen tidak keluar dari perangkat, dan tetap berjalan dalam mode pesawat.",
          "Foto dokumen kertas menjadi halaman seukuran A4, siap ditandatangani.",
          "PDF hasil tanda tangan bersih dari teks tersembunyi, metadata, dan lokasi GPS foto, dengan kata sandi opsional.",
          "Beberapa dokumen sekaligus, dengan paraf di setiap halaman jika diperlukan.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda perlu mengumpulkan tanda tangan orang lain, dengan urutan dan pengingat.",
      "Anda ingin berkas bukti bertanda waktu yang disimpan bertahun-tahun.",
      "Diminta tanda tangan lanjutan atau terkualifikasi dengan verifikasi identitas.",
      "Anda berurusan dengan perusahaan Eropa dan lebih suka penyedia yang dihosting di Prancis.",
    ],
    chooseCachety: [
      "Anda hanya perlu menandatangani dan mengirim kembali dokumen sehari-hari.",
      "Anda tidak ingin membuat akun atau meninggalkan salinan dokumen di server.",
      "Anda ingin menandatangani beberapa PDF atau foto dokumen sekaligus, gratis.",
    ],
    faq: [
      {
        q: "Apakah Yousign dan Youtrust sama?",
        a: "Ya. Yousign mengumumkan bahwa namanya berganti menjadi Youtrust mulai Juli 2026. Selama masa transisi, aplikasinya mungkin masih tampil dengan nama lama.",
      },
      {
        q: "Apakah Youtrust punya paket gratis?",
        a: "Ada. Paket ini butuh akun, tanpa iklan, memungkinkan Anda menandatangani dokumen sendiri tanpa batas dan mengirim 2 permintaan tanda tangan per bulan. Berkas bukti juga tersedia di paket gratis.",
      },
      {
        q: "Apakah tanda tangan dari Cachety sekuat Youtrust?",
        a: "Tidak. Tanda tangan dari Cachety adalah gambar, tanpa berkas bukti dan tanpa verifikasi identitas. Youtrust sendiri mengingatkan bahwa tanda tangan yang hanya berupa gambar atau hasil pindaian lebih lemah. Untuk dokumen sehari-hari, tanda tangan sederhana biasanya diterima; untuk dokumen yang bisa berujung sengketa, pilih platform yang menyimpan bukti.",
      },
      {
        q: "Di mana Youtrust menyimpan dokumen saya?",
        a: "Di server yang dihosting khusus di Prancis, menurut halaman keamanannya. Bukti tanda tangan disimpan selama 10 tahun.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign menjadi Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust: paket gratis", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust: paket", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: tingkat tanda tangan", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: fitur aplikasi", url: "https://youtrust.com/application" },
      { label: "Youtrust: cara menandatangani PDF", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust: keamanan dan hosting", url: "https://youtrust.com/security" },
      { label: "Youtrust: kebijakan privasi", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Adobe Acrobat
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety atau Adobe Acrobat: mana yang cocok untuk tanda tangan PDF?",
    metaTitle: "Adobe Acrobat atau Cachety: Tanda Tangan PDF Online",
    description:
      "Tanda tangan PDF di Adobe Acrobat atau Cachety? Di mana file diproses, kapan harus login, dan kapan tanda tangan bersertifikat dari Acrobat lebih tepat.",
    intro:
      "Acrobat dari Adobe punya beberapa cara untuk tanda tangan: alat online Sign PDF, aplikasi Adobe Fill & Sign, dan Acrobat Sign untuk perusahaan. Cachety hanya melakukan satu hal: membantu Anda menandatangani dokumen di browser, tanpa meng-upload file dan tanpa login.",
    verdict:
      "Untuk meminta tanda tangan orang lain, mendapatkan jejak audit, atau memakai tanda tangan digital berbasis sertifikat, Acrobat adalah pilihan yang lebih tepat. Untuk menandatangani PDF sehari-hari lalu mengirimnya kembali, Cachety tidak meng-upload file dan tidak meminta akun. Tanda tangan dari Cachety hanyalah gambar, jauh lebih mudah dibantah daripada tanda tangan bersertifikat.",
    table: [
      {
        criterion: "Kegunaan",
        cachety: C.purpose,
        other: "Tanda tangan PDF online, meminta tanda tangan, dan lewat Acrobat Sign, mengelola penandatanganan dokumen di perusahaan.",
      },
      {
        criterion: "Di mana dokumen diproses",
        cachety: C.where,
        other: "Di server Adobe, yang menghapus file kecuali Anda login untuk menyimpannya. Halamannya tidak menyebut berapa lama atau di negara mana.",
        edge: "cachety",
      },
      {
        criterion: "Akun",
        cachety: "Tanpa akun, tanpa daftar.",
        other: "Halaman alatnya menyebut Anda harus login untuk menyelesaikan formulir yang bisa diisi.",
        edge: "cachety",
      },
      {
        criterion: "Cara membuat tanda tangan",
        cachety: C.create,
        other: "Diketik, digambar, atau unggah gambar tanda tangan.",
      },
      {
        criterion: "Kolom di dokumen",
        cachety: "Tanda tangan, tanggal, tempat, catatan singkat, dan paraf di setiap halaman.",
        other: "Tanda tangan, paraf, teks, tanda centang, dan garis.",
      },
      {
        criterion: "Meminta tanda tangan dan jejak audit",
        cachety: C.signers,
        other: "Bisa, tetapi mungkin memerlukan paket Acrobat berbayar. Acrobat Sign mengirim ke beberapa penanda tangan, dengan templat dan jejak audit.",
        edge: "other",
      },
      {
        criterion: "Tanda tangan berbasis sertifikat",
        cachety: C.level,
        other:
          "Tanda tangan digital berbasis sertifikat yang menurut Adobe memenuhi tingkat terkualifikasi eIDAS. Acrobat Sign bekerja dengan lebih dari 200 penyelenggara layanan kepercayaan.",
        edge: "other",
      },
      {
        criterion: "Integrasi",
        cachety: "Tidak ada: Cachety adalah halaman web.",
        other: "Acrobat Sign bisa dipakai di dalam Microsoft Word, Teams, Salesforce, dan Workday.",
        edge: "other",
      },
      {
        criterion: "Di HP",
        cachety: C.phone,
        other: "Aplikasi Acrobat Reader untuk iPhone dan Android dengan fitur tanda tangan, dan aplikasi Adobe Fill & Sign untuk iPhone yang bisa memotret formulir kertas.",
      },
    ],
    body: [
      { type: "h2", text: "Acrobat punya beberapa alat tanda tangan" },
      {
        type: "p",
        text: "Tanda tangan dengan Adobe bisa berarti tiga hal: alat online Sign PDF yang berjalan di situsnya, aplikasi Adobe Fill & Sign untuk mengisi dan menandatangani formulir di iPhone, dan Acrobat Sign, layanan bagi perusahaan untuk mengirim dokumen ke beberapa penanda tangan dengan templat dan jejak audit. Halaman ini terutama membandingkan Cachety dengan alat online, yang paling mirip dengannya.",
      },
      { type: "h2", text: "Di mana dokumen Anda berada" },
      {
        type: "p",
        text: "Alat online Adobe mengirim PDF ke server perusahaan. Halamannya menyebut file ditangani dengan aman dan dihapus kecuali Anda login untuk menyimpannya, tetapi tidak menyebut berapa lama atau di negara mana. Di Cachety, PDF dibaca di memori browser dan file yang sudah ditandatangani langsung disimpan di perangkat Anda.",
      },
      { type: "h2", text: "Kelebihan Acrobat" },
      {
        type: "list",
        items: [
          "Tanda tangan digital berbasis sertifikat, yang menurut Adobe memenuhi tingkat terkualifikasi eIDAS.",
          "Acrobat Sign: beberapa penanda tangan, templat, dan jejak audit.",
          "Terintegrasi dengan Microsoft Word, Teams, Salesforce, dan Workday.",
          "Aplikasi HP, termasuk Fill & Sign yang bisa memotret formulir kertas.",
          "Lebih banyak kolom di dokumen, seperti tanda centang dan garis.",
        ],
      },
      {
        type: "p",
        text: "Adobe juga menyatakan tanda tangan elektroniknya sah menurut ESIGN Act dan UETA, yaitu undang-undang Amerika Serikat. Untuk dokumen yang dipakai di Indonesia, yang berlaku adalah aturan Indonesia dan apa yang diterima pihak lain.",
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Tidak perlu login, termasuk untuk mengunduh dokumen yang sudah ditandatangani.",
          "Dokumen tidak keluar dari perangkat, dan tetap berjalan dalam mode pesawat.",
          "Foto dokumen kertas menjadi halaman seukuran A4, langsung di browser HP.",
          "PDF hasil tanda tangan bersih dari teks tersembunyi, metadata, dan lokasi GPS foto, dengan kata sandi opsional.",
          "Beberapa dokumen sekaligus, dengan watermark opsional berisi keperluan, penerima, dan tanggal.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda diminta tanda tangan digital berbasis sertifikat.",
      "Anda perlu mengirim dokumen ke beberapa orang untuk ditandatangani, dengan jejak audit.",
      "Perusahaan Anda sudah memakai Word, Teams, atau Salesforce dan ingin tanda tangan dari sana.",
      "Anda sudah punya akun Adobe dan ingin menyimpan dokumen di sana.",
    ],
    chooseCachety: [
      "Anda hanya ingin menandatangani dan mengirim kembali PDF tanpa login ke akun mana pun.",
      "Anda lebih suka dokumen tidak di-upload ke server.",
      "Anda hanya punya versi kertas dan ingin menandatangani fotonya lewat browser HP.",
    ],
    faq: [
      {
        q: "Apakah perlu akun untuk tanda tangan PDF di situs Adobe?",
        a: "Halaman alat Sign PDF menyebut Anda harus login untuk menyelesaikan formulir yang bisa diisi. Di Cachety tidak ada akun: buka halaman, lalu tanda tangani.",
      },
      {
        q: "Apakah Adobe menyimpan PDF saya?",
        a: "Menurut halaman alatnya, file ditangani di server Adobe dan dihapus kecuali Anda login untuk menyimpannya. Halaman itu tidak menyebut berapa lama.",
      },
      {
        q: "Apa beda tanda tangan Cachety dengan tanda tangan digital Acrobat?",
        a: "Tanda tangan Cachety adalah gambar yang ditempatkan di halaman, yaitu tanda tangan elektronik tidak tersertifikasi. Tanda tangan digital Acrobat memakai sertifikat yang mengaitkan tanda tangan dengan penanda tangannya dan menunjukkan jika dokumen diubah sesudahnya. Jika diminta tanda tangan bersertifikat, pakai alat seperti Acrobat.",
      },
      {
        q: "Apakah Adobe Fill & Sign sama dengan Cachety?",
        a: "Sebagian: keduanya bisa menandatangani foto formulir kertas. Fill & Sign adalah aplikasi iPhone. Cachety berjalan di browser HP atau komputer apa pun dan tidak meng-upload dokumen.",
      },
    ],
    sources: [
      { label: "Adobe: Sign PDF online", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "App Store: Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe: Acrobat Sign untuk bisnis", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe: kepatuhan eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe: kebijakan privasi", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- iLovePDF
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety atau iLovePDF: mana yang cocok untuk tanda tangan PDF?",
    metaTitle: "iLovePDF atau Cachety untuk Tanda Tangan PDF",
    description:
      "Tanda tangan PDF di iLovePDF atau Cachety: upload file, akun, iklan, jejak audit, dan tanda tangan digital. Lihat kapan masing-masing lebih tepat.",
    intro:
      "iLovePDF, dari perusahaan di Barcelona, punya alat tanda tangan PDF yang terhubung dengan layanan iLoveSign. Anda bisa menandatangani sendiri atau mengundang orang lain. Cachety hanya menandatangani dokumen Anda sendiri, tanpa meng-upload file.",
    verdict:
      "iLovePDF menawarkan tanda tangan sederhana dan, di Premium, tanda tangan digital dengan hash bersertifikat dan stempel waktu terkualifikasi, ditambah undangan, urutan penanda tangan, dan jejak audit. Untuk kontrak dengan beberapa pihak atau yang butuh bukti, iLovePDF adalah pilihan yang lebih tepat. Untuk menandatangani sendiri dokumen sehari-hari, Cachety tidak meng-upload file, tanpa iklan, dan tanpa akun; sebagai gantinya, tanda tangannya hanya gambar yang lebih mudah dibantah.",
    table: [
      {
        criterion: "Di mana dokumen diproses",
        cachety: C.where,
        other: "Di server iLovePDF, di dalam Kawasan Ekonomi Eropa. File dihapus dalam dua jam; dokumen yang sudah ditandatangani disimpan paling lama 5 tahun.",
        edge: "cachety",
      },
      {
        criterion: "Akun",
        cachety: "Tanpa akun, tanpa daftar.",
        other: "Diperlukan untuk meminta tanda tangan dari orang lain.",
      },
      {
        criterion: "Jenis tanda tangan",
        cachety: C.level,
        other: "Tanda tangan sederhana dan, di Premium, tanda tangan digital dengan hash bersertifikat dan stempel waktu terkualifikasi yang ditanamkan di PDF.",
        edge: "other",
      },
      {
        criterion: "Beberapa penanda tangan",
        cachety: C.signers,
        other: "Pilihan hanya Anda sendiri atau mengundang orang lain, dengan urutan penanda tangan, batas waktu, dan pengingat.",
        edge: "other",
      },
      {
        criterion: "Bukti penandatanganan",
        cachety: C.audit,
        other: "Jejak audit dibuat setelah selesai; halaman paket iLoveSign menyebut arsip selama 10 tahun.",
        edge: "other",
      },
      {
        criterion: "Verifikasi identitas",
        cachety: C.identity,
        other: "Validasi lewat SMS, yang menjadikannya tanda tangan lanjutan menurut eIDAS, dan pilihan pindai tanda pengenal.",
        edge: "other",
      },
      {
        criterion: "Cara membuat tanda tangan",
        cachety: C.create,
        other: "Digambar, diketik, atau diunggah (PNG, JPG, atau SVG), dengan paraf, tanggal, dan kolom teks.",
      },
      {
        criterion: "Iklan dan batas paket gratis",
        cachety: "Tanpa iklan, tanpa pelacak, dan tanpa paket berbayar.",
        other: "Paket Basic gratis menampilkan iklan, membatasi file tanda tangan sampai 50 MB, dan permintaan tanda tangan terbatas.",
        edge: "cachety",
      },
      {
        criterion: "Di HP",
        cachety: C.phone,
        other: "Aplikasi untuk iPhone dan Android.",
      },
    ],
    body: [
      { type: "h2", text: "Tanda tangan sederhana atau digital" },
      {
        type: "p",
        text: "iLovePDF menawarkan dua jenis. Tanda tangan sederhana mirip dengan Cachety: Anda menggambar, mengetik, atau mengunggah tanda tangan lalu menaruhnya di halaman. Tanda tangan digital, di Premium, lebih jauh lagi: iLovePDF menanamkan hash bersertifikat dan stempel waktu terkualifikasi di PDF, yang berguna untuk menunjukkan bahwa dokumen tidak diubah sesudahnya. Dengan validasi SMS, tanda tangan itu menjadi tanda tangan lanjutan menurut standar Eropa eIDAS.",
      },
      {
        type: "p",
        text: "Cachety hanya melakukan yang pertama: tanda tangan elektronik tidak tersertifikasi, tanpa sertifikat dan tanpa stempel waktu. Sebagai gantinya, dokumen tidak pernah keluar dari perangkat Anda.",
      },
      { type: "h2", text: "Di mana dokumen Anda berada" },
      {
        type: "p",
        text: "Di iLovePDF, PDF dikirim ke server perusahaan di dalam Kawasan Ekonomi Eropa. Halaman keamanannya menyebut file dihapus dalam dua jam, dan dokumen yang sudah ditandatangani disimpan paling lama 5 tahun. Perusahaan ini bersertifikat ISO/IEC 27001. Di Cachety, tidak ada server yang menerima dokumen, jadi tidak ada yang perlu dihapus.",
      },
      { type: "h2", text: "Kelebihan iLovePDF" },
      {
        type: "list",
        items: [
          "Tanda tangan digital dengan hash bersertifikat dan stempel waktu terkualifikasi, di Premium.",
          "Undangan untuk orang lain, dengan urutan penanda tangan, batas waktu, dan pengingat.",
          "Jejak audit setelah penandatanganan selesai.",
          "Validasi lewat SMS dan pindai tanda pengenal.",
          "Banyak alat PDF lain di situs yang sama, plus aplikasi HP.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Dokumen tidak keluar dari perangkat, dan tetap berjalan dalam mode pesawat.",
          "Tanpa iklan, tanpa akun, dan tanpa paket berbayar.",
          "Foto dokumen kertas menjadi halaman seukuran A4, siap ditandatangani.",
          "PDF hasil tanda tangan bersih dari teks tersembunyi, metadata, dan lokasi GPS foto, dengan kata sandi opsional.",
          "Sidik jari SHA-256 untuk setiap file setelah diunduh, untuk Anda simpan.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda perlu mengundang orang lain untuk menandatangani dengan urutan tertentu.",
      "Anda butuh jejak audit atau tanda tangan digital dengan stempel waktu terkualifikasi.",
      "Diminta tanda tangan lanjutan, dengan validasi SMS atau tanda pengenal.",
      "Anda sudah memakai iLovePDF untuk urusan PDF lain dan ingin semuanya di satu tempat.",
    ],
    chooseCachety: [
      "Anda hanya perlu menandatangani dan mengirim kembali dokumen sehari-hari.",
      "Anda tidak ingin dokumen melewati server, walau hanya dua jam.",
      "Anda ingin tanda tangan tanpa iklan dan tanpa membuat akun.",
    ],
    faq: [
      {
        q: "Apakah iLovePDF menyimpan dokumen yang sudah saya tanda tangani?",
        a: "Halaman keamanannya menyebut file dihapus dalam dua jam, tetapi dokumen yang sudah ditandatangani disimpan paling lama 5 tahun. Di Cachety, dokumen tidak pernah dikirim.",
      },
      {
        q: "Apa beda tanda tangan sederhana dan digital di iLovePDF?",
        a: "Tanda tangan sederhana ditaruh di halaman, seperti di Cachety. Tanda tangan digital, di Premium, menanamkan hash bersertifikat dan stempel waktu terkualifikasi di PDF, yang berguna untuk menunjukkan jika dokumen diubah sesudahnya.",
      },
      {
        q: "Apakah tanda tangan dari Cachety punya jejak audit?",
        a: "Tidak. Cachety tidak mencatat siapa yang menandatangani atau kapan. Cachety menampilkan sidik jari SHA-256 file setelah diunduh, yang membantu mengenali versi yang Anda tanda tangani, tetapi itu tidak menggantikan jejak audit. Jika Anda membutuhkannya, pakai platform seperti iLovePDF.",
      },
    ],
    sources: [
      { label: "iLovePDF: tanda tangan PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      {
        label: "iLovePDF: cara tanda tangan PDF (blog)",
        url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf",
      },
      { label: "iLovePDF: paket", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign: paket tanda tangan", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF: keamanan", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: kebijakan privasi", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Smallpdf
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety atau Smallpdf: mana yang cocok untuk tanda tangan PDF?",
    metaTitle: "Smallpdf atau Cachety: Tanda Tangan PDF Tanpa Daftar",
    description:
      "Smallpdf dan Cachety sama-sama bisa tanda tangan PDF tanpa daftar. Bedanya: Smallpdf meng-upload file ke servernya, Cachety bekerja di perangkat Anda.",
    intro:
      "Smallpdf, dari perusahaan di Zurich, punya alat tanda tangan PDF yang tidak meminta pendaftaran atau instalasi. Untuk meminta tanda tangan dari orang lain, Smallpdf memakai layanan Sign.com. Cachety juga tanpa pendaftaran, tetapi dokumen tidak keluar dari perangkat Anda.",
    verdict:
      "Untuk menandatangani sendiri, cara pakai keduanya mirip: gambar, ketik, atau unggah tanda tangan, tanpa membuat akun. Bedanya ada di tempat file berada: Smallpdf memprosesnya di server dan menghapusnya setelah satu jam, sementara Cachety tidak mengirim apa pun. Jika Anda perlu meminta tanda tangan orang lain, dengan pemantauan dan sertifikat penyelesaian, Smallpdf dengan Sign.com adalah pilihan yang lebih tepat.",
    table: [
      {
        criterion: "Akun",
        cachety: "Tanpa akun, tanpa daftar.",
        other: "Tidak perlu daftar atau instal untuk menandatangani.",
      },
      {
        criterion: "Di mana dokumen diproses",
        cachety: C.where,
        other: "Di server Smallpdf, dengan pengiriman terenkripsi (TLS). Kebijakan privasinya menyebut server Hetzner di Uni Eropa dan Cloudflare.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama disimpan",
        cachety: "Tidak ada yang perlu dihapus: Cachety tidak pernah menerima dokumen.",
        other: "Dihapus otomatis setelah satu jam, kecuali Anda menyimpannya di akun Smallpdf.",
        edge: "cachety",
      },
      {
        criterion: "Cara membuat tanda tangan",
        cachety: C.create,
        other: "Digambar, diketik, atau diunggah; bisa menambahkan paraf, teks, dan tanggal.",
      },
      {
        criterion: "Meminta tanda tangan orang lain",
        cachety: C.signers,
        other: "Bisa, lewat Sign.com, dengan pemantauan, segel digital, dan sertifikat penyelesaian.",
        edge: "other",
      },
      {
        criterion: "Pemakaian gratis",
        cachety: "Gratis, tanpa paket berbayar dan tanpa kuota unduhan, karena semuanya berjalan di perangkat Anda.",
        other: "Ada batas unduhan harian untuk pemakaian gratis; Sign.com gratis membatasi jumlah dokumen per bulan.",
        edge: "cachety",
      },
      {
        criterion: "Pelacakan",
        cachety: C.ads,
        other: "Dengan persetujuan Anda: Google Analytics, remarketing Google Ads, Facebook Pixel, dan LinkedIn.",
        edge: "cachety",
      },
      {
        criterion: "Klaim soal keabsahan",
        cachety: "Tanda tangan elektronik tidak tersertifikasi, berupa gambar: tidak membuktikan sendiri siapa yang menandatangani dan mudah dibantah.",
        other: "Sign.com menyebut tanda tangannya sah menurut standar eIDAS tanpa menyebut tingkatnya; Smallpdf menyebutnya mengikat secara hukum dan meminta Anda memeriksa hukum setempat.",
      },
      {
        criterion: "Di HP",
        cachety: C.phone,
        other: "Aplikasi untuk Android dan iPhone.",
      },
    ],
    body: [
      { type: "h2", text: "Cara pakai mirip, jalur file berbeda" },
      {
        type: "p",
        text: "Di Smallpdf dan Cachety, langkahnya hampir sama: buka halaman, buat tanda tangan, taruh di tempatnya, lalu unduh PDF, tanpa daftar. Bedanya tidak terlihat di layar. Di Smallpdf, file dikirim dengan enkripsi ke server perusahaan, diproses di sana, lalu dihapus setelah satu jam jika tidak disimpan di akun. Di Cachety, file tidak pernah keluar dari browser.",
      },
      {
        type: "p",
        text: "Kebijakan privasi Smallpdf juga menyebut bahwa, dengan persetujuan Anda, situsnya memakai alat seperti Google Analytics, remarketing Google Ads, Facebook Pixel, dan LinkedIn. Cachety tidak punya iklan maupun pelacak.",
      },
      { type: "h2", text: "Kelebihan Smallpdf" },
      {
        type: "list",
        items: [
          "Meminta tanda tangan orang lain dan memantau prosesnya, lewat Sign.com.",
          "Segel digital dan sertifikat penyelesaian untuk dokumen yang dikirim lewat Sign.com.",
          "Kolom teks dan tanggal, selain tanda tangan dan paraf.",
          "Banyak alat PDF lain di situs yang sama, plus aplikasi HP.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety" },
      {
        type: "list",
        items: [
          "Dokumen tidak keluar dari perangkat, dan tetap berjalan dalam mode pesawat.",
          "Tanpa pelacak, tanpa iklan, dan tanpa batas harian.",
          "Foto dokumen kertas menjadi halaman seukuran A4, siap ditandatangani.",
          "PDF hasil tanda tangan bersih dari teks tersembunyi, metadata, dan lokasi GPS foto, dengan kata sandi opsional.",
          "Paraf di setiap halaman dan watermark opsional berisi keperluan, penerima, dan tanggal.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Anda perlu mengirim dokumen ke orang lain untuk ditandatangani dan memantau siapa yang sudah menandatangani.",
      "Anda ingin segel digital dan sertifikat penyelesaian, seperti yang ada di Sign.com.",
      "Anda sudah memakai Smallpdf untuk urusan PDF lain dan ingin semuanya di satu tempat.",
    ],
    chooseCachety: [
      "Anda ingin tanda tangan tanpa dokumen di-upload, walau hanya satu jam.",
      "Anda lebih suka situs tanpa pelacak iklan.",
      "Anda menandatangani banyak dokumen dan tidak ingin terbentur batas harian.",
    ],
    faq: [
      {
        q: "Apakah Smallpdf perlu daftar untuk tanda tangan?",
        a: "Tidak. Halaman tanda tangannya menyebut tidak perlu membuat akun atau menginstal apa pun. Cachety juga tanpa daftar. Bedanya, Smallpdf meng-upload file ke servernya.",
      },
      {
        q: "Berapa lama Smallpdf menyimpan PDF saya?",
        a: "Menurut halaman alatnya, file dihapus otomatis setelah satu jam, kecuali Anda menyimpannya di akun Smallpdf.",
      },
      {
        q: "Apakah tanda tangan Smallpdf lebih kuat daripada Cachety?",
        a: "Untuk menandatangani sendiri, keduanya menaruh tanda tangan Anda di halaman. Saat Anda meminta tanda tangan lewat Sign.com, ada segel digital dan sertifikat penyelesaian yang tidak dimiliki Cachety. Smallpdf sendiri meminta Anda memeriksa hukum setempat. Untuk dokumen sehari-hari, tanda tangan sederhana biasanya diterima.",
      },
    ],
    sources: [
      { label: "Smallpdf: tanda tangan PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: tanda tangan elektronik", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf: paket", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com untuk Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf: kebijakan privasi", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
