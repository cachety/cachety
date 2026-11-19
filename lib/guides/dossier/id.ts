// Panduan untuk alat Dossier (id): menggabungkan PDF, foto menjadi PDF,
// urutan dan rotasi halaman, menghapus data tersembunyi. Setiap entri
// membawa tool: "dossier". Ditulis untuk pembaca di Indonesia.
// Hanya teks biasa: tanpa tautan, HTML, atau markdown.
// Nama orang, usaha, dan perusahaan dalam contoh adalah fiktif.
//
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// These guides describe the Dossier tool (docs/prd-dossier.md), Must scope only:
// no sections, no photo straightening, no custom size. Publish them with the
// tool, not before. The labels of the new tool are not quoted here (they do
// not exist yet in lib/locales/id/strings.ts): the steps describe the action
// instead. Re-check them against the shipped interface.

import type { Guide } from "../types";

const UPDATED = "2026-11-18";

/** Alamat alat, ditulis tanpa skema (panduan tidak memuat tautan). */
const TOOL = "cachety.com/id/dossier";

const NOT_UPLOADED =
  "Cachety bekerja di dalam browser Anda. Tidak ada server yang menerima file Anda, dan halaman ini melarang browser menghubungi situs lain. Anda bisa memeriksanya sendiri: buka halamannya, nyalakan mode pesawat, dan semuanya tetap berjalan. Cachety gratis, tanpa akun, dan kodenya terbuka (open source).";

const PIXELS =
  "Untuk menghapus data tersembunyi, Cachety membuat ulang setiap halaman sebagai gambar. Karena itu, teks di PDF baru tidak bisa diseleksi atau dicari, dan PDF yang tadinya hanya berisi teks bisa menjadi lebih besar dari aslinya. File asli Anda tidak diubah: simpan baik-baik.";

export const DOSSIER_GUIDES_ID: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "gabung-pdf-tanpa-upload",
    topic: "merge",
    tool: "dossier",
    title: "Cara menggabungkan beberapa file PDF menjadi satu tanpa upload",
    metaTitle: "Gabung PDF Jadi Satu Tanpa Upload, Gratis",
    description:
      "Gabungkan PDF dan foto menjadi satu PDF di browser. Atur urutan halaman, jaga ukuran file di bawah batas, tanpa upload apa pun. Gratis, tanpa akun.",
    intro:
      "\"Mohon kirim semuanya dalam satu file PDF.\" Sebagian besar alat gratis untuk menggabungkan PDF lebih dulu meng-upload file Anda ke server mereka. Jika file itu KTP, slip gaji, dan rekening koran Anda, ada cara lain: kerjakan di perangkat Anda sendiri.",
    example: "Hanya untuk pengajuan sewa rumah, Graha Asri Properti Bandung, 18/11/2026",
    body: [
      { type: "h2", text: "Mengapa menggabungkan PDF secara online bukan hal sepele" },
      {
        type: "p",
        text: "Dokumen yang digabungkan orang jarang berupa foto liburan. Biasanya itu berkas yang diminta pemilik kontrakan, bank, kantor, atau instansi pemerintah: bukti identitas, bukti penghasilan, bukti alamat. Mengirim semuanya sekaligus ke situs yang tidak begitu Anda kenal, hanya untuk menyatukannya, adalah risiko yang tidak perlu Anda ambil.",
      },
      { type: "h2", text: "Gabungkan file Anda dengan Cachety" },
      {
        type: "steps",
        items: [
          `Buka ${TOOL} di browser, di komputer atau HP. Tidak perlu instal apa pun dan tidak perlu membuat akun.`,
          "Masukkan file Anda: PDF dan foto bisa dicampur (JPG, PNG, foto HEIC dari iPhone, dan lainnya). Satu foto menjadi satu halaman.",
          "Lanjut ke bagian halaman. Setiap halaman dari setiap file ditampilkan sebagai gambar kecil. Seret halaman untuk memindahkannya, bahkan dari satu dokumen ke dokumen lain. Putar halaman yang miring, dan buang halaman yang tidak Anda perlukan.",
          "Pilih satu file PDF sebagai hasilnya. Jika situs tujuan punya batas ukuran, pilih batasnya: 1, 2, 5, atau 10 MB. Sebelum Anda mengunduh, Cachety memberi tahu apakah file akan muat dan tetap terbaca.",
          "Periksa pratinjau, beri nama file, lalu unduh.",
        ],
      },
      {
        type: "tip",
        text: "Sebelum mengunduh, Anda bisa menyensor nomor rekening atau data lain yang tidak dibutuhkan penerima. Area yang disensor dihapus dari file, bukan sekadar ditutupi.",
      },
      { type: "h2", text: "Apa yang terjadi dengan file Anda" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "Seperti apa PDF yang baru" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "Sisi baiknya, file baru membawa lebih sedikit data daripada aslinya: tanpa nama pembuat, tanpa teks tersembunyi, tanpa lampiran, dan tanpa lokasi GPS dari foto Anda. Yang dilihat penerima adalah semua yang ada.",
      },
      {
        type: "warning",
        text: "Jika teks di PDF gabungan harus tetap bisa diseleksi dan dicari, misalnya untuk laporan atau skripsi, Cachety bukan alat yang tepat. Pakai aplikasi yang berjalan di komputer Anda dan menyambung halaman asli apa adanya, misalnya Pratinjau di Mac.",
      },
      { type: "h2", text: "Beberapa batas yang perlu diketahui" },
      {
        type: "list",
        items: [
          "Sampai 200 MB per file, 500 halaman per PDF, dan 1.000 halaman secara keseluruhan.",
          "File Word dan Excel tidak diterima: simpan dulu sebagai PDF (Cetak, lalu Simpan sebagai PDF).",
          "PDF yang dikunci bisa dimasukkan: Cachety meminta kata sandinya, di perangkat Anda.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah PDF saya di-upload untuk digabungkan?",
        a: "Tidak. Penggabungan terjadi di browser Anda, di perangkat Anda. Cachety tidak punya server yang bisa menerima file Anda.",
      },
      {
        q: "Bisakah PDF dan foto digabung sekaligus?",
        a: "Bisa. Masukkan PDF dan foto dalam campuran apa pun. Setiap foto menjadi satu halaman, dan semua halaman bisa Anda susun sesuai urutan yang Anda inginkan.",
      },
      {
        q: "Apakah teksnya masih bisa diseleksi setelah digabung?",
        a: "Tidak. Setiap halaman dibuat ulang sebagai gambar, dan cara itu menghapus data tersembunyi. Jika Anda perlu teks yang bisa diseleksi, pakai aplikasi di komputer yang mempertahankan halaman aslinya.",
      },
      {
        q: "Mengapa file gabungan kadang lebih besar daripada file saya?",
        a: "PDF yang hanya berisi teks sangat ringan, sedangkan gambar dari halaman yang sama lebih berat. Pilih ukuran maksimum dan Cachety akan mengecilkan halaman-halamannya agar muat.",
      },
      {
        q: "Apakah bisa dipakai di HP?",
        a: "Bisa, di iPhone dan Android, lewat browser. Halaman bisa dipindahkan dengan jari.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "ubah-foto-jadi-pdf-di-hp-tanpa-aplikasi",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Cara mengubah foto dokumen kertas menjadi satu PDF di HP",
    metaTitle: "Ubah Foto Jadi Satu PDF di HP, Tanpa Aplikasi",
    description:
      "Foto dokumen kertas Anda, lalu ubah fotonya menjadi satu PDF di browser HP. Tanpa aplikasi, tanpa upload, dan cukup kecil untuk formulir online.",
    intro:
      "Sebuah situs meminta PDF, padahal Anda hanya punya kertasnya. Atau situs itu menolak foto iPhone Anda karena formatnya. Anda tidak perlu scanner atau aplikasi scan: kamera HP dan browsernya sudah cukup.",
    example: "Hanya untuk pendaftaran siswa baru, SD Bukit Cendekia, 18/11/2026",
    body: [
      { type: "h2", text: "Ambil foto yang mudah dibaca" },
      {
        type: "list",
        items: [
          "Letakkan kertas rata di permukaan polos yang gelap, dekat jendela. Hindari flash, yang meninggalkan bercak putih.",
          "Pegang HP lurus di atas kertas, supaya tepi-tepinya tampak sejajar, dan penuhi bingkai foto dengan halaman itu.",
          "Ambil satu foto per halaman. Pastikan tulisan kecilnya tajam sebelum lanjut.",
        ],
      },
      { type: "h2", text: "Dari foto menjadi satu PDF" },
      {
        type: "steps",
        items: [
          `Buka ${TOOL} di browser HP Anda. Tidak ada aplikasi yang perlu diinstal.`,
          "Ketuk area dokumen dan pilih foto-foto Anda. Foto iPhone berformat HEIC bisa langsung dipakai.",
          "Lanjut ke bagian halaman. Setiap foto sudah menjadi satu halaman. Putar yang miring dan seret ke urutan yang benar.",
          "Pilih satu file PDF dan, jika formulirnya punya batas ukuran, pilih 1, 2, 5, atau 10 MB.",
          "Periksa pratinjau dan unduh PDF-nya. File tersimpan di HP Anda, siap dilampirkan.",
        ],
      },
      {
        type: "tip",
        text: "Foto bisa dicampur dengan PDF yang sudah Anda punya, misalnya slip gaji yang Anda unduh. Semuanya menjadi satu file, dengan urutan yang Anda tentukan.",
      },
      { type: "h2", text: "Mengapa formulir menolak foto Anda" },
      {
        type: "p",
        text: "Formulir online sering hanya menerima PDF, JPG, atau PNG, dan membatasi ukurannya sampai beberapa megabyte. Foto dari HP keluaran baru bisa lebih berat dari itu, dan iPhone menyimpan foto sebagai HEIC, format yang tidak dibaca banyak situs. Mengubah foto menjadi satu PDF dengan batas ukuran menyelesaikan dua masalah itu sekaligus.",
      },
      { type: "h2", text: "Foto Anda tetap di HP" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Foto juga menyimpan di mana dan kapan foto itu diambil, dan dengan HP apa. Cachety membuat ulang setiap halaman sebagai gambar baru, sehingga informasi tersembunyi itu, termasuk lokasi GPS, tidak ada di PDF yang Anda kirim.",
      },
      {
        type: "warning",
        text: "Batas ukuran yang sangat kecil dan banyak halaman foto tidak selalu bisa dipenuhi sekaligus. Jika file tidak bisa muat sambil tetap terbaca, Cachety mengatakannya sebelum Anda mengunduh: buang beberapa halaman, atau kirim dua file.",
      },
    ],
    faq: [
      {
        q: "Apakah saya perlu aplikasi scan?",
        a: "Tidak. Ambil fotonya dengan kamera HP dan buka Cachety di browser. Tidak ada yang diinstal.",
      },
      {
        q: "Apakah foto iPhone (HEIC) bisa dipakai?",
        a: "Bisa. Foto HEIC dibaca di perangkat Anda dan menjadi halaman PDF, seperti foto lainnya.",
      },
      {
        q: "Apakah foto saya di-upload?",
        a: "Tidak. Semuanya terjadi di browser HP Anda. Tidak ada server yang menerima foto Anda.",
      },
      {
        q: "Bisakah teks di PDF itu dicari atau disalin?",
        a: "Tidak. Halamannya berupa gambar: Cachety tidak membaca teks dari foto. Untuk formulir yang meminta PDF, itu jarang menjadi masalah.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "putar-urutkan-hapus-halaman-pdf-tanpa-upload",
    topic: "pdf-pages",
    tool: "dossier",
    title: "Cara memutar, mengurutkan ulang, atau menghapus halaman PDF tanpa upload",
    metaTitle: "Putar, Urutkan, atau Hapus Halaman PDF Tanpa Upload",
    description:
      "Putar halaman yang miring, ubah urutan halaman, atau hapus halaman dari PDF di browser Anda. Gratis, tanpa akun, dan file tidak keluar dari perangkat Anda.",
    intro:
      "Hasil scan yang terbalik, halaman kosong di tengah, kontrak yang hanya Anda perlukan halaman 1 dan 7-nya: perbaikan kecil, tetapi sebagian besar alat gratis meminta Anda meng-upload seluruh dokumen dulu. Begini cara mengerjakannya di perangkat Anda sendiri.",
    example: "Hanya untuk pengajuan KPR, Bank Gerbang Utara Sejahtera, 18/11/2026",
    body: [
      { type: "h2", text: "Rapikan halaman dengan Cachety" },
      {
        type: "steps",
        items: [
          `Buka ${TOOL} di browser, di komputer atau HP.`,
          "Masukkan PDF Anda. Anda bisa menambahkan beberapa file, juga foto.",
          "Lanjut ke bagian halaman. Setiap halaman ditampilkan sebagai gambar kecil, sesuai urutan di file akhir.",
          "Seret halaman untuk memindahkannya. Pakai tombol putar untuk memutarnya seperempat putaran setiap kali. Pakai tombol hapus untuk membuangnya. Jika salah membuang halaman, batalkan dan halaman itu kembali.",
          "Pilih satu file PDF, periksa pratinjau, lalu unduh.",
        ],
      },
      {
        type: "tip",
        text: "Di komputer, semuanya bisa dilakukan dari keyboard: Alt dan tombol panah memindahkan halaman yang dipilih, R memutarnya, dan Delete membuangnya.",
      },
      { type: "h2", text: "Benar-benar diputar, bukan hanya pengaturan tampilan" },
      {
        type: "p",
        text: "Banyak alat hanya menambahkan catatan di PDF yang berbunyi \"tampilkan halaman ini dalam keadaan diputar\". Sebagian aplikasi pembaca PDF mengabaikannya, dan halaman itu miring lagi di layar penerima. Cachety membuat ulang halaman dalam posisi yang benar, sehingga tampilannya sama di mana pun.",
      },
      { type: "h2", text: "Halaman yang dibuang benar-benar hilang" },
      {
        type: "p",
        text: "Halaman yang Anda buang sama sekali tidak ada di file baru. Begitu juga hal-hal yang tidak terlihat di PDF: teks tersembunyi, lampiran, nama pembuat. File baru dibuat dari apa yang tampak di setiap halaman, tidak lebih.",
      },
      { type: "h2", text: "Seperti apa hasilnya" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Jika Anda perlu mempertahankan teks yang bisa diseleksi, bookmark, atau kolom formulir, pakai aplikasi yang berjalan di komputer Anda dan mengedit halaman aslinya, misalnya Pratinjau di Mac.",
      },
      { type: "h2", text: "Tidak ada yang di-upload" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Bisakah memutar satu halaman PDF saja?",
        a: "Bisa. Setiap halaman punya tombol putarnya sendiri. Halaman lain tidak berubah.",
      },
      {
        q: "Bisakah memindahkan halaman dari satu PDF ke PDF lain?",
        a: "Bisa. Masukkan kedua file: semua halamannya tampil bersama dan bisa dipindahkan dengan bebas, lalu disimpan sebagai satu PDF.",
      },
      {
        q: "Bisakah halaman yang sudah dibuang dikembalikan?",
        a: "Bisa, selama halaman Cachety masih terbuka: batalkan tepat setelah membuangnya, atau kembalikan urutan aslinya. File asli Anda tidak pernah diubah.",
      },
      {
        q: "Apakah PDF saya di-upload?",
        a: "Tidak. Halaman ditampilkan dan dibuat ulang di browser Anda. Tidak ada server yang menerima file Anda.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "hapus-metadata-pdf-dan-foto",
    topic: "metadata",
    tool: "dossier",
    title: "Cara menghapus metadata dan data tersembunyi dari PDF atau foto sebelum dikirim",
    metaTitle: "Hapus Metadata dari PDF atau Foto, Tanpa Upload",
    description:
      "PDF atau foto membawa lebih dari yang terlihat: pembuat, tanggal, teks tersembunyi, lokasi GPS. Hapus semuanya sebelum dikirim, di browser, tanpa upload.",
    intro:
      "File yang Anda kirim mengungkap lebih banyak daripada yang tampak di halamannya. PDF bisa menyebut nama pembuatnya dan aplikasi yang membuatnya, dan masih menyimpan teks yang Anda kira sudah hilang. Foto bisa menunjukkan persis di mana foto itu diambil. Inilah yang tersembunyi di dalam file, dan cara mengirim salinan yang bersih.",
    example: "Hanya untuk klaim asuransi, Asuransi Tirta Cemerlang, 18/11/2026",
    body: [
      { type: "h2", text: "Apa yang dibawa file tanpa memberi tahu Anda" },
      {
        type: "list",
        items: [
          "Di dalam PDF: nama pembuat, judul, aplikasi yang dipakai, tanggal dibuat dan tanggal diubah.",
          "Juga di dalam PDF: lapisan teks yang bisa diseleksi, komentar, tautan, file lampiran, isian formulir, dan kadang teks yang masih ada di bawah kotak hitam.",
          "Di dalam foto: tanggal, merek HP, dan sangat sering lokasi GPS tempat foto itu diambil.",
        ],
      },
      {
        type: "p",
        text: "Semua ini tidak terlihat saat Anda memandang halamannya. Semuanya bisa dibaca dalam beberapa klik oleh penerima file, atau oleh siapa pun yang menerima terusannya.",
      },
      { type: "h2", text: "Buat salinan yang bersih dengan Cachety" },
      {
        type: "steps",
        items: [
          `Buka ${TOOL} di browser. Tidak perlu akun.`,
          "Masukkan PDF atau foto Anda.",
          "Lanjut ke bagian halaman dan pastikan urutannya benar. Buang halaman yang tidak ingin Anda kirim.",
          "Pilih satu file PDF dan unduh.",
          "Kirim file yang baru, bukan file aslinya.",
        ],
      },
      { type: "h2", text: "Cara kerja pembersihannya" },
      {
        type: "p",
        text: "Cachety tidak mencoba mencari dan menghapus data tersembunyi satu per satu. Cachety membuat ulang setiap halaman sebagai gambar dari apa yang Anda lihat, lalu membuat PDF baru dari gambar-gambar itu. Apa pun yang tidak tampak di halaman tidak ada di file baru: tanpa nama pembuat, tanpa teks tersembunyi, tanpa lampiran, tanpa skrip, tanpa tautan, tanpa lokasi GPS.",
      },
      {
        type: "tip",
        text: "Untuk memeriksa sebuah file, buka propertinya di aplikasi pembaca PDF dan coba seleksi teks di salah satu halaman. Pada salinan buatan Cachety, propertinya kosong dan tidak ada yang bisa diseleksi.",
      },
      { type: "h2", text: "Harga yang harus dibayar" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Pembersihan menghapus apa yang tersembunyi, bukan apa yang tercetak di halaman. Nama, nomor rekening, atau barcode yang terlihat tetap ada. Sensor dulu sebelum mengunduh: area yang disensor benar-benar dihapus.",
      },
      { type: "h2", text: "File Anda tidak di-upload untuk dibersihkan" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Apakah lokasi GPS di foto saya ikut dihapus?",
        a: "Ya. Halaman dibuat ulang sebagai gambar baru di dalam PDF, dan informasi tersembunyi di foto, termasuk lokasi, tidak ikut terbawa.",
      },
      {
        q: "Apakah nama pembuat PDF ikut dihapus?",
        a: "Ya. PDF baru dibuat dari gambar halaman-halamannya dan tidak membawa properti file asli.",
      },
      {
        q: "Bisakah teksnya tetap bisa diseleksi dan hanya metadatanya yang dihapus?",
        a: "Tidak dengan Cachety. Cachety menghapus semua data tersembunyi dengan membuat ulang halaman sebagai gambar. Untuk mempertahankan teks yang bisa diseleksi, pakai fitur penghapus informasi tersembunyi di aplikasi editor PDF di komputer Anda.",
      },
      {
        q: "Hasilnya PDF atau foto?",
        a: "PDF. Satu foto menjadi satu halaman PDF.",
      },
    ],
    updated: UPDATED,
  },
];
