import type { SiteCopy } from "@/lib/site-copy";

// Teks situs dalam bahasa Indonesia, sapaan "Anda". Janji yang sama dengan
// versi Inggris, tidak lebih dan tidak kurang (lihat docs/security.md).

export const SITE_ID: SiteCopy = {
  nav: {
    tool: "Watermark",
    sign: "Tanda tangan",
    about: "Mengapa perlu watermark?",
    guides: "Panduan",
    privacy: "Privasi",
    menu: "Menu",
    close: "Tutup menu",
    donate: "Donasi",
    compare: "Perbandingan",
    nameShort: "cachet (cap) + cacher (menyembunyikan)",
  },
  hero: {
    title: "Beri watermark pada dokumen Anda tanpa mengirimnya ke mana pun",
    lead: "KTP, paspor, slip gaji, rekening koran: tambahkan watermark dalam hitungan detik. File Anda tetap di perangkat Anda dari awal sampai akhir.",
    pills: ["Gratis", "Tanpa akun", "Tidak ada yang di-upload", "Buatan Prancis"],
  },
  landing: {
    howTitle: "Cara kerjanya",
    how: [
      {
        title: "Masukkan dokumen Anda",
        body: "PDF atau foto, termasuk foto dari HP Android atau iPhone. Bisa beberapa sekaligus.",
      },
      {
        title: "Tulis untuk apa",
        body: "Misalnya \"Hanya untuk pengajuan sewa kos, Kos Melati, 11/10/2026\". Ada templat siap pakai.",
      },
      {
        title: "Periksa dan unduh",
        body: "Pratinjau menunjukkan hasil yang akan Anda dapat. File ber-watermark langsung tersimpan di perangkat Anda.",
      },
    ],
    trustTitle: "Dokumen Anda tidak pernah keluar dari perangkat Anda",
    trustLead:
      "Kebanyakan situs watermark meng-upload foto KTP Anda ke server mereka. Cachety tidak: semua pekerjaan dilakukan oleh browser Anda, di HP atau komputer Anda sendiri.",
    trust: [
      {
        title: "Diproses di perangkat Anda",
        body: "File Anda tetap di memori perangkat Anda. Tutup tab, dan semuanya hilang.",
      },
      {
        title: "Perlindungan bawaan",
        body: "Halaman ini melarang browser Anda mengirim data ke situs lain. Seandainya ada yang salah pun, file Anda tidak bisa keluar.",
      },
      {
        title: "Tanpa akun, tanpa pelacakan",
        body: "Tanpa pendaftaran, tanpa cookie pelacak, tanpa statistik pengunjung, tanpa jaringan iklan.",
      },
      {
        title: "Open source dan bisa diperiksa",
        body: "Kodenya terbuka untuk umum. Siapa pun bisa membaca, memeriksa, atau memasang salinan situs ini sendiri.",
      },
    ],
    airplaneTitle: "Buktikan sendiri: tes mode pesawat",
    airplaneBody:
      "Buka halaman ini, lalu matikan internet (mode pesawat). Masukkan dokumen: Cachety tetap berjalan. Itu bukti bahwa tidak ada yang lewat internet.",
    featuresTitle: "Semua yang Anda perlukan untuk melindungi salinan",
    features: [
      {
        title: "Watermark di seluruh halaman",
        body: "Diulang miring di seluruh halaman dan menyatu dengan gambar: tidak bisa dihapus hanya dengan mengedit PDF.",
      },
      {
        title: "Sensor data",
        body: "Sembunyikan nomor rekening, NIK, atau foto. Isinya benar-benar dihapus, bukan sekadar ditutupi.",
      },
      {
        title: "Kode unik di setiap salinan",
        body: "Saat mengubah teks, tambahkan kode pendek yang berbeda di setiap salinan: jika salinan muncul di suatu tempat, Anda tahu asalnya.",
      },
      {
        title: "Satu salinan per penerima",
        body: "Tambahkan setiap penerima: masing-masing mendapat salinannya sendiri, dengan namanya, dalam satu kali unduh.",
      },
      {
        title: "Kata sandi yang dibuatkan untuk Anda",
        body: "Kunci file dengan 12 kata acak yang mudah dibacakan lewat telepon, plus enkripsi AES-256.",
      },
      {
        title: "Data tersembunyi dihapus",
        body: "Teks yang bisa diseleksi, metadata, dan lokasi GPS foto dihapus dari file akhir.",
      },
      {
        title: "Cukup kecil untuk situs mana pun",
        body: "Jika situs web atau email menolak file Anda, perkecil menjadi 10, 5, 2, atau 1 MB.",
      },
      {
        title: "Bisa di HP",
        body: "Android dan iPhone, termasuk foto HEIC. Tambahkan Cachety ke layar utama seperti aplikasi.",
      },
    ],
    originTitle: "Gratis, open source, buatan Prancis",
    originBody:
      "Cachety adalah perangkat lunak bebas dan gratis (lisensi AGPL). Kodenya terbuka untuk semua orang dan akan tetap begitu. Cachety dikembangkan dari Filigrane Local dan Filigraneur, dua proyek open source dari Prancis.",
    originBy: "Dibuat dan dikelola oleh",
    supportTitle: "Dukung Cachety",
    supportBody:
      "Cachety gratis dan akan tetap gratis. Tapi pembuatannya butuh waktu, dan domain serta alat pengembangan ada biayanya. Jika Cachety bermanfaat bagi Anda, donasi kecil membantu menjaganya tetap berjalan.",
    supportCta: "Berdonasi",
    supportNote: "Tidak wajib. Pembayaran dilakukan di GitHub Sponsors, di luar situs ini.",
    faqTitle: "Pertanyaan umum",
    faq: [
      {
        q: "Apakah file saya di-upload ke server?",
        a: "Tidak, tidak pernah. Situs ini bahkan tidak punya server yang bisa menerima file. Browser Anda yang mengerjakan semuanya, dan halaman ini secara teknis mencegahnya terhubung ke situs lain. Tes mode pesawat membuktikannya dalam sepuluh detik.",
      },
      {
        q: "Benar-benar gratis? Apa jebakannya?",
        a: "Tidak ada jebakan: tanpa akun, tanpa versi berbayar, tanpa pengumpulan data. Karena tidak ada yang diproses di server, biaya hosting situs ini hampir nol, dan kode yang terbuka menjamin situs ini tetap gratis. Untuk membiayai pengembangannya, Cachety mengandalkan donasi sukarela, dan suatu hari mungkin menampilkan beberapa tautan bersponsor pilihan (alat enkripsi, perangkat lunak bebas…). Tidak akan pernah ada iklan yang melacak Anda, dan tidak akan pernah ada apa pun yang didasarkan pada dokumen Anda.",
      },
      {
        q: "File apa saja yang bisa diberi watermark?",
        a: "PDF dan gambar: JPG, PNG, foto iPhone (HEIC), WebP, GIF, BMP, dan AVIF. Maksimal 200 MB per file dan 500 halaman per PDF, bisa beberapa file sekaligus.",
      },
      {
        q: "Apakah watermark-nya bisa dihapus?",
        a: "Tidak dengan aplikasi edit PDF: watermark menjadi bagian dari gambar setiap halaman. Terus terang, tidak ada yang bisa mencegah orang memotret atau mengedit dokumen. Watermark membuat orang berpikir dua kali sebelum memakai ulang salinan Anda, dan membantu Anda tahu dari mana kebocoran berasal.",
      },
      {
        q: "Apa yang sebaiknya ditulis di watermark?",
        a: "Tiga hal: untuk keperluan apa salinan itu, kepada siapa Anda mengirimnya, dan tanggalnya. Misalnya \"Hanya untuk pengajuan sewa kos, Kos Melati, 11/10/2026\".",
      },
      {
        q: "Bisa dipakai di HP?",
        a: "Bisa, di Android dan iPhone. Buka cachety.com di browser, ketuk area untuk memasukkan file, lalu pilih foto atau PDF. Anda juga bisa menambahkan Cachety ke layar utama.",
      },
    ],
    signLink: {
      title: "Ada dokumen yang perlu ditandatangani?",
      body: "Kontrak sewa, surat keterangan, penawaran harga: gambar, ketik, atau impor tanda tangan Anda dan tempatkan di PDF. Di sini pun tidak ada yang di-upload.",
      cta: "Tanda tangani dokumen",
    },
    guidesTitle: "Panduan praktis",
    guidesLead: "Bantuan langkah demi langkah untuk situasi sehari-hari.",
    guidesAll: "Semua panduan",
    backToTop: "Beri watermark pada dokumen",
  },
  // Legal section and FAQ: draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
  sign: {
    hero: {
      title: "Tanda tangani dokumen tanpa mengirimnya ke mana pun",
      lead: "Kontrak sewa, surat keterangan, penawaran harga, surat izin: tanda tangani dalam hitungan detik. Dokumen tetap ada di perangkat Anda dari awal sampai akhir.",
      pills: ["Gratis", "Tanpa akun", "Tidak ada yang di-upload", "Buatan Prancis"],
    },
    howTitle: "Cara kerjanya",
    how: [
      { title: "Masukkan dokumen Anda", body: "PDF atau foto dokumen, termasuk yang difoto dengan ponsel. Bisa beberapa sekaligus." },
      { title: "Buat tanda tangan", body: "Gambar dengan jari atau mouse, ketik nama Anda, atau impor foto tanda tangan Anda." },
      {
        title: "Tempatkan, lalu unduh",
        body: "Geser ke tempat yang tepat. Pratinjau menunjukkan persis PDF yang sudah ditandatangani, yang disimpan di perangkat Anda.",
      },
    ],
    airplaneTitle: "Buktikan sendiri: tes mode pesawat",
    airplaneBody:
      "Buka halaman ini, lalu matikan internet (mode pesawat). Masukkan dokumen dan tanda tangani: Cachety tetap berjalan. Itu bukti bahwa tidak ada yang lewat internet.",
    legal: {
      title: "Seberapa kuat tanda tangan ini?",
      p1: "Tanda tangan yang digambar atau diketik lalu ditempatkan di dokumen disebut tanda tangan elektronik “sederhana” menurut hukum. Di Uni Eropa, tanda tangan tidak boleh ditolak hanya karena berbentuk elektronik (Regulasi eIDAS, pasal 25). Di Prancis, tanda tangan mengidentifikasi penandatangannya dan menunjukkan persetujuannya; dalam bentuk elektronik, tanda tangan harus menggunakan cara yang andal yang mengaitkannya dengan dokumen (Kode Sipil, pasal 1367).",
      p2: "Untuk dokumen sehari-hari, ini biasanya sudah cukup: berkas sewa, surat keterangan, penawaran harga, formulir sekolah atau perkumpulan. Jika dipersoalkan, Anda yang harus menunjukkan bahwa Anda penandatangannya; tanda tangan “terkualifikasi” (dengan sertifikat dari penyedia yang diakui) mendapat praduga keandalan yang tidak dimiliki tanda tangan sederhana.",
      p3: "Alat ini tidak tepat jika tanda tangan terkualifikasi diwajibkan, atau jika pihak lain mengharuskan platform tertentu: sebagian kontrak pinjaman atau asuransi, akta notaris, prosedur resmi tertentu. Dalam hal ini, gunakan alat yang mereka minta.",
      note: "Ini bukan nasihat hukum. Aturan untuk sebagian dokumen berbeda di tiap negara. Terjemahan ini masih menunggu ditinjau oleh penutur asli.",
    },
    faqTitle: "Pertanyaan umum",
    faq: [
      {
        q: "Apakah dokumen saya di-upload ke server?",
        a: "Tidak, tidak pernah. Situs ini bahkan tidak punya server yang bisa menerima file. Browser Anda yang mengerjakan semuanya, dan halaman ini secara teknis mencegahnya terhubung ke situs lain. Tes mode pesawat membuktikannya dalam sepuluh detik.",
      },
      {
        q: "Apakah tanda tangan saya disimpan?",
        a: "Tidak. Tanda tangan hanya ada di memori tab. Tutup tab, dan tanda tangan itu hilang.",
      },
      {
        q: "Bisakah tanda tangan saya dihapus atau dipakai ulang?",
        a: "Tanda tangan menjadi bagian dari gambar setiap halaman: tidak bisa dipindahkan atau dihapus dengan mengedit PDF. Sama seperti tanda tangan di kertas yang dipindai, seseorang bisa memotongnya dan menempelkannya di tempat lain. Untuk mengurangi risiko itu, tambahkan watermark yang mengikat salinan pada keperluannya, dan paraf setiap halaman.",
      },
      {
        q: "Apakah teks di PDF yang sudah ditandatangani masih bisa dipilih?",
        a: "Tidak. Setiap halaman dibuat ulang dari pikselnya, sehingga teks tersembunyi, metadata, dan lokasi GPS foto juga ikut terhapus. Dokumen asli Anda tetap utuh di tangan Anda.",
      },
      {
        q: "Apakah bisa dipakai di ponsel?",
        a: "Ya, di iPhone dan Android. Tanda tangani dengan jari, atau impor foto jika lebih suka.",
      },
    ],
    watermarkLink: {
      title: "Mengirim fotokopi KTP juga?",
      body: "KTP, bukti pajak, slip gaji: beri watermark yang membatasi salinan untuk satu keperluan saja. Situs yang sama, janji yang sama: tidak ada yang di-upload.",
      cta: "Beri watermark pada dokumen",
    },
    backToTop: "Tanda tangani dokumen",
  },
  privacy: {
    title: "Privasi dan keamanan",
    lead: "Dokumen Anda bersifat pribadi. Berikut penjelasan sederhana tentang apa yang dilakukan dan tidak dilakukan Cachety, serta cara memeriksanya sendiri.",
    updated: "Diperbarui 12 Oktober 2026",
    sections: [
      {
        title: "Ringkasnya",
        items: [
          "File Anda tidak pernah di-upload: semuanya diproses oleh browser Anda, di perangkat Anda.",
          "Tanpa akun, tanpa cookie pelacak, tanpa statistik pengunjung, tanpa jaringan iklan.",
          "Tidak ada yang disimpan: tutup tab, dan dokumen Anda hilang dari memori.",
          "Kodenya terbuka untuk umum dan bisa diperiksa siapa saja.",
        ],
      },
      {
        title: "Apa yang terjadi saat Anda memasukkan file",
        paras: [
          "Browser Anda membaca file di memori perangkat Anda. Setiap halaman diubah menjadi gambar, watermark digambar di atasnya, lalu dibuat file yang benar-benar baru. Saat Anda mengklik Unduh, file itu langsung tersimpan di perangkat Anda.",
          "File, teks watermark, nama penerima, dan kata sandi tidak pernah dikirim lewat internet.",
        ],
      },
      {
        title: "Yang tidak kami kumpulkan",
        items: [
          "Dokumen Anda dan pratinjaunya.",
          "Teks watermark dan nama-nama penerima Anda.",
          "Kata sandi Anda.",
          "Identitas Anda: tidak ada akun maupun formulir.",
          "Kebiasaan Anda: tidak ada Google Analytics, piksel iklan, atau cookie pelacak.",
        ],
      },
      {
        title: "Yang disimpan di perangkat Anda",
        paras: [
          "Hanya pengaturan Anda: bahasa, tampilan watermark, dan ukuran file maksimal yang Anda pilih. Pengaturan ini disimpan di browser agar Anda tidak perlu mengaturnya lagi. Tidak ada file, teks, atau kata sandi yang disimpan di sana. Anda bisa menghapusnya kapan saja dengan menghapus data situs ini di browser.",
          "Agar bisa dipakai tanpa internet, browser Anda juga menyimpan salinan halaman-halaman situs ini (bukan dokumen Anda).",
        ],
      },
      {
        title: "Hosting dan pendanaan",
        paras: [
          "Halaman situs ini disajikan oleh Cloudflare. Seperti penyedia hosting mana pun, Cloudflare secara teknis melihat alamat IP pengunjung dan halaman yang diminta, agar bisa menyajikannya. Cloudflare tidak pernah melihat dokumen Anda, karena dokumen itu tidak pernah dikirim.",
          "Donasi diproses melalui GitHub Sponsors, di situs GitHub sendiri dan di bawah kebijakan privasi GitHub. Cachety tidak pernah melihat data pembayaran Anda, dan halaman Cachety tidak berisi formulir atau skrip pembayaran apa pun.",
          "Saat ini tidak ada iklan di Cachety. Agar proyek ini terus berjalan, di masa depan mungkin akan muncul beberapa tautan bersponsor yang dipilih langsung dan sejalan dengan semangat proyek: alat enkripsi, perangkat lunak bebas, pengiriman dokumen yang aman. Tautan itu akan diberi tanda jelas, disajikan oleh Cachety sendiri tanpa jaringan iklan atau skrip pihak ketiga, dan tidak akan pernah bergantung pada dokumen Anda. Kebijakan keamanan halaman tetap akan melarang koneksi ke situs lain.",
        ],
      },
      {
        title: "Cara memeriksanya sendiri",
        items: [
          "Tes mode pesawat: buka situs ini, matikan internet, lalu beri watermark pada dokumen. Semuanya tetap berjalan.",
          "Kode sumbernya terbuka: siapa pun bisa membacanya, dan pengujian otomatis memeriksa di setiap perubahan bahwa tidak ada data yang bisa keluar.",
          "Untuk yang penasaran: kebijakan keamanan halaman (CSP) melarang browser terhubung ke situs lain.",
          "Tidak mau percaya siapa pun? Anda bisa menjalankan situs ini di komputer atau server Anda sendiri.",
        ],
      },
      {
        title: "Salinan Anda, terlindungi dengan baik",
        items: [
          "Area yang disensor benar-benar dihapus dari file, bukan sekadar ditutup kotak.",
          "Teks tersembunyi, metadata, dan lokasi GPS foto dihapus.",
          "Kata sandi memakai enkripsi AES-256; setelah disalin, kata sandi dihapus dari clipboard dalam satu menit.",
          "Menemukan celah keamanan? Laporkan secara pribadi lewat halaman keamanan repositori GitHub.",
        ],
      },
      {
        title: "Yang tidak bisa dilakukan watermark",
        paras: [
          "Watermark membuat orang enggan memakai ulang salinan Anda dan membantu Anda tahu dari mana kebocoran berasal. Watermark tidak bisa mencegah orang memotret atau mengedit salinan. Kirim hanya dokumen yang benar-benar diminta, dan sensor semua yang tidak diperlukan.",
        ],
      },
    ],
  },
  guidesUi: {
    title: "Panduan praktis",
    lead: "KTP, sewa kos, lamaran kerja, verifikasi online: cara melindungi dokumen Anda langkah demi langkah, tanpa perlu paham teknologi.",
    read: "Baca panduan",
    example: "Contoh watermark",
    faqTitle: "Pertanyaan umum",
    related: "Baca juga",
    cta: "Beri watermark pada dokumen saya",
    ctaSign: "Tanda tangani dokumen saya",
    ctaNote: "Gratis, tanpa akun. Dokumen tidak pernah keluar dari perangkat Anda.",
    updated: (d) => `Diperbarui ${d}`,
    allGuides: "Semua panduan",
  },
  compareUi: {
    title: "Cachety dibandingkan alat watermark lain",
    lead: "Perbandingan yang jelas dan sudah dicek dengan alat-alat yang paling banyak dipakai: ke mana file Anda dikirim, berapa biayanya, dan kapan alat lain justru lebih cocok.",
    read: "Baca perbandingan",
    verdictTitle: "Ringkasnya",
    tableTitle: "Berdampingan",
    criterion: "Kriteria",
    edgeCachety: "Unggul: Cachety",
    edgeOther: (n: string) => `Unggul: ${n}`,
    chooseOther: (n: string) => `Kapan ${n} lebih cocok`,
    chooseCachety: "Kapan Cachety lebih cocok",
    sourcesTitle: "Sumber",
    checked: (d: string) =>
      `Fakta dicek pada ${d} di halaman publik masing-masing layanan. Layanan bisa berubah: jika ada yang sudah tidak tepat, beri tahu kami di GitHub dan kami akan memperbaikinya.`,
    disclosure:
      "Ditulis oleh pembuat Cachety. Kami berusaha objektif dan adil: setiap pernyataan tentang alat lain disertai sumbernya.",
    allComparisons: "Semua perbandingan",
    related: "Perbandingan lain",
  },
  footer: {
    tagline: "Beri watermark pada dokumen Anda, tanpa dokumen itu pernah keluar dari perangkat Anda.",
    name: {
      pron: "/ka.ʃə.ti/",
      pos: "kata benda",
      def: "Dari bahasa Prancis cachet, cap yang mengesahkan dokumen, dan cacher, menyembunyikan. Cap untuk yang Anda bagikan, tirai untuk sisanya.",
    },
    support: "Dukung proyek ini",
    madeIn: "Buatan Prancis",
    by: "oleh",
    basedOn: "Berdasarkan",
    inspiredBy: "yang terinspirasi dari",
    license: "Lisensi AGPL-3.0",
    source: "Kode sumber",
    free: "Layanan gratis, tanpa pelacakan",
  },
};
