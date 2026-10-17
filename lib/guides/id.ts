import type { Guide } from "./types";

// Panduan dalam bahasa Indonesia, ditulis untuk pembaca di Indonesia (KTP, KK,
// NPWP, kos, pinjol, e-KYC). Bukan terjemahan: padanan lokal dari panduan
// bahasa lain. Hanya teks biasa: tanpa tautan, HTML, atau markdown.
// Nama orang, usaha, dan perusahaan dalam contoh adalah fiktif.

const UPDATED = "2026-10-12";

export const GUIDES_ID: Guide[] = [
  // ------------------------------------------------------------------ id-card
  {
    slug: "cara-watermark-ktp",
    topic: "id-card",
    title: "Cara memberi watermark pada foto KTP agar tidak disalahgunakan",
    metaTitle: "Cara Watermark Foto KTP agar Tidak Disalahgunakan",
    description:
      "Cara memberi watermark pada foto atau scan KTP sebelum dikirim: apa yang ditulis, cara memasangnya dari HP, gratis dan tanpa upload ke server mana pun.",
    intro:
      "Foto KTP diminta di mana-mana: buka rekening, daftar kerja, sewa kos, beli kartu SIM. Watermark yang menyebut untuk apa, untuk siapa, dan kapan salinan itu dibuat membuatnya jauh lebih sulit dipakai untuk hal lain.",
    example: "Hanya untuk pembukaan rekening, Bank Nusantara Jaya, 12/10/2026",
    body: [
      { type: "h2", text: "Mengapa foto KTP polos berisiko" },
      {
        type: "p",
        text: "KTP elektronik memuat hampir semua yang dibutuhkan untuk menyamar menjadi Anda: NIK 16 digit, nama lengkap, tempat dan tanggal lahir, alamat, dan foto wajah. Foto KTP tanpa tanda apa pun bisa dipakai ulang di mana saja, misalnya untuk mendaftar pinjol atas nama Anda atau membuka akun yang tidak pernah Anda buat. Begitu foto itu terkirim lewat WhatsApp atau formulir online, Anda tidak lagi tahu di mana foto itu disimpan dan siapa saja yang melihatnya.",
      },
      {
        type: "p",
        text: "Karena itu, imbauan untuk memberi watermark pada foto KTP sudah sering disampaikan, termasuk oleh Kominfo (kini Komdigi) dan media nasional: tuliskan tanggal dan keperluannya, lalu atur transparansinya agar data tetap terbaca.",
      },
      { type: "h2", text: "Apa yang ditulis di watermark" },
      {
        type: "list",
        items: [
          "Keperluan: misalnya \"Hanya untuk pembukaan rekening\" atau \"Hanya untuk sewa kos\".",
          "Penerima: nama bank, perusahaan, pemilik kos, atau toko.",
          "Tanggal: hari Anda mengirimnya, supaya salinan lama tidak bisa diaku sebagai salinan baru.",
        ],
      },
      {
        type: "p",
        text: "Hindari tulisan umum seperti \"COPY\" atau \"Rahasia\" saja: tulisan itu tidak menjelaskan ke mana salinan tersebut seharusnya pergi. Teks watermark bisa sampai 120 karakter, tetapi sepuluh sampai lima belas kata sudah cukup.",
      },
      { type: "h2", text: "Langkah-langkah dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser HP atau komputer. Tidak perlu instal aplikasi, tidak perlu daftar.",
          "Ketuk area dokumen dan pilih foto atau scan KTP dari galeri. PDF juga bisa.",
          "Di \"Salinan ini untuk apa?\", ketik keperluannya atau pilih contoh di \"Atau pilih salah satu:\", misalnya Bank. Lalu isi nama penerima di \"Siapa yang akan menerimanya?\". Tanggal ditambahkan otomatis.",
          "Lihat pratinjau. Pastikan NIK, nama, dan foto Anda masih terbaca di balik watermark. Jika perlu, tekan \"Atur watermark\" dan pilih Tipis, Normal, atau Tebal; ukuran, warna, dan opasitas ada di \"Pengaturan lainnya\".",
          "Unduh hasilnya dan kirim file ber-watermark itu, bukan foto aslinya.",
        ],
      },
      {
        type: "tip",
        text: "Watermark diulang miring di seluruh halaman dan menyatu dengan gambar, jadi tidak bisa dipotong dari satu sudut saja. Polanya juga sedikit berbeda di setiap salinan.",
      },
      { type: "h2", text: "File Anda tidak di-upload ke mana pun" },
      {
        type: "p",
        text: "Banyak situs watermark meng-upload foto KTP Anda ke server mereka. Cachety bekerja di dalam browser Anda: tidak ada server yang menerima file. Setelah halaman terbuka, Anda bahkan bisa menyalakan mode pesawat dan alat ini tetap berjalan. Cachety juga menghapus data tersembunyi seperti lokasi GPS yang sering tersimpan di foto HP.",
      },
      {
        type: "warning",
        text: "Watermark membuat salinan sulit dipakai ulang dan membantu melacak kebocoran, tetapi tidak membuatnya mustahil. Tetap kirim KTP hanya kepada pihak yang jelas, dan hanya jika memang diperlukan.",
      },
    ],
    faq: [
      {
        q: "Apakah KTP ber-watermark tetap diterima bank atau kantor?",
        a: "Biasanya ya, selama data terbaca jelas. Watermark dibuat transparan, dan Anda bisa memeriksa hasilnya di pratinjau sebelum mengunduh. Jika suatu layanan punya aturan foto sendiri, misalnya harus difoto langsung di aplikasi, ikuti aturan mereka.",
      },
      {
        q: "Bagaimana kalau saya diminta fotokopi KTP, bukan file?",
        a: "Untuk fotokopi kertas, Anda bisa menulis keperluan, penerima, dan tanggal dengan pulpen di atas fotokopi, sebagian mengenai gambar KTP. Untuk file yang dikirim lewat WhatsApp atau email, pakai watermark digital.",
      },
      {
        q: "Apakah Cachety menyimpan foto KTP saya?",
        a: "Tidak. File diproses di browser Anda, di perangkat Anda sendiri, dan tidak pernah dikirim ke Cachety atau pihak lain.",
      },
      {
        q: "Apakah Cachety berbayar?",
        a: "Tidak. Cachety gratis, tanpa akun, tanpa pelacakan, dan kodenya terbuka (open source).",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------- online-verification
  {
    slug: "selfie-ktp-verifikasi-online-aman",
    topic: "online-verification",
    title: "Selfie dengan KTP dan verifikasi online: cara mengirimnya dengan aman",
    metaTitle: "Selfie KTP untuk Verifikasi Online: Cara Aman",
    description:
      "Diminta selfie dengan KTP untuk e-wallet, pinjaman, atau marketplace? Kenali tanda bahaya pinjol ilegal dan cara memberi watermark sebelum mengirim.",
    intro:
      "Banyak layanan meminta foto KTP dan selfie sambil memegang KTP untuk verifikasi akun (e-KYC). Di aplikasi resmi, ini prosedur biasa. Masalahnya, foto yang sama juga diincar penipu dan pinjol ilegal.",
    example: "Hanya untuk verifikasi akun, Toko Online Sentosa, 12/10/2026",
    body: [
      { type: "h2", text: "Kapan selfie KTP itu wajar, kapan mencurigakan" },
      {
        type: "p",
        text: "Bank, e-wallet, marketplace, dan penyedia pinjaman yang berizin memang wajib mengenali nasabahnya. Biasanya mereka meminta Anda memotret KTP dan wajah langsung lewat kamera di dalam aplikasi resmi. Yang patut dicurigai adalah permintaan selfie KTP lewat jalur lain: dikirim ke nomor WhatsApp pribadi, lewat tautan dari SMS, atau sebagai syarat hadiah, undian, lowongan kerja, atau barang murah.",
      },
      {
        type: "warning",
        text: "OJK berulang kali mengimbau masyarakat agar ekstra hati-hati memberikan data pribadi seperti NIK, foto KTP, rekaman wajah, dan kode OTP. Modusnya beragam: hadiah, menang undian, komisi, harga khusus, sampai tawaran kerja. Jangan pernah memberikan kode OTP kepada siapa pun.",
      },
      { type: "h2", text: "Cek dulu sebelum mengirim" },
      {
        type: "list",
        items: [
          "Apakah aplikasinya resmi? Unduh dari toko aplikasi resmi, dan untuk layanan pinjaman, pastikan perusahaannya terdaftar dan berizin di OJK.",
          "Apakah memang perlu? Tanyakan untuk apa data itu dipakai jika tidak dijelaskan.",
          "Apakah jalurnya aman? Jangan kirim selfie KTP ke akun media sosial atau nomor pribadi yang tidak jelas.",
          "Apakah izin aplikasinya wajar? Aplikasi pinjaman yang meminta akses ke seluruh kontak dan galeri adalah tanda bahaya.",
        ],
      },
      { type: "h2", text: "Kamera di dalam aplikasi atau kirim file sendiri?" },
      {
        type: "p",
        text: "Jika verifikasi dilakukan dengan kamera langsung di dalam aplikasi, Anda tidak bisa menambahkan watermark, dan memang sebaiknya ikuti petunjuk aplikasi. Sistem verifikasi otomatis bisa menolak foto yang sudah diberi tulisan. Tetapi jika Anda diminta meng-upload file atau mengirimnya lewat email atau chat, Anda bisa memberi watermark terlebih dahulu.",
      },
      { type: "h2", text: "Cara memberi watermark dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser HP Anda.",
          "Pilih foto KTP dan foto selfie dari galeri. Keduanya bisa dimasukkan sekaligus.",
          "Ketik keperluannya, misalnya \"Hanya untuk verifikasi akun\", lalu isi penerimanya, misalnya Toko Online Sentosa. Tanggal ditambahkan otomatis.",
          "Periksa pratinjau: wajah dan data KTP harus tetap terlihat jelas. Jika watermark terlalu tebal, tekan \"Atur watermark\" lalu pilih Tipis.",
          "Ukuran file terlihat sebelum mengunduh. Jika formulirnya membatasi ukuran, tekan \"Perkecil ukuran\" dan pilih 10, 5, 2, atau 1 MB.",
          "Unduh hasilnya, lalu upload file itu ke formulir resmi.",
        ],
      },
      {
        type: "tip",
        text: "Tulisan tangan di kertas kecil juga bisa membantu: tulis tanggal dan keperluan, lalu letakkan di area kosong saat memotret selfie dengan KTP. Dengan begitu foto selfie pun punya keterangan, bahkan saat difoto lewat aplikasi.",
      },
      { type: "h2", text: "Foto tidak keluar dari HP Anda" },
      {
        type: "p",
        text: "Cachety tidak punya server yang menerima file. Foto KTP dan selfie Anda diproses di browser, di HP Anda sendiri. Lokasi GPS dan data tersembunyi lain di foto juga dihapus dari hasilnya. Ingat, watermark mempersulit penyalahgunaan, tetapi tidak menghentikan orang yang memotret layar. Kirim hanya ke pihak yang sudah Anda pastikan resmi.",
      },
    ],
    faq: [
      {
        q: "Apakah selfie KTP ber-watermark akan ditolak?",
        a: "Bisa saja, terutama jika verifikasinya otomatis. Untuk verifikasi lewat kamera aplikasi, ikuti petunjuk aplikasi. Watermark paling berguna saat Anda mengirim file sendiri lewat upload, email, atau chat.",
      },
      {
        q: "Bagaimana tahu pinjaman online itu legal?",
        a: "Periksa apakah perusahaannya terdaftar dan berizin di OJK, lewat situs resmi OJK atau Kontak OJK 157. Pinjol yang meminta akses ke semua kontak, menagih dengan ancaman, atau mentransfer dana yang tidak pernah Anda ajukan adalah tanda bahaya.",
      },
      {
        q: "Saya sudah terlanjur mengirim selfie KTP ke pihak yang mencurigakan. Apa yang harus dilakukan?",
        a: "Simpan bukti percakapan, ganti kata sandi akun penting, dan pantau rekening Anda. Anda bisa memeriksa pinjaman atas nama Anda lewat layanan iDebku dari OJK, dan melapor ke OJK di 157 atau ke polisi jika data Anda disalahgunakan.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------- rental
  {
    slug: "watermark-ktp-sewa-kos-kontrakan",
    topic: "rental",
    title: "Watermark KTP untuk sewa kos atau kontrakan",
    metaTitle: "Watermark KTP untuk Sewa Kos atau Kontrakan",
    description:
      "Mau sewa kos atau kontrakan? Beri watermark pada foto KTP dan KK sebelum dikirim ke pemilik, dan kenali modus penipuan kos online yang minta DP duluan.",
    intro:
      "Pemilik kos dan kontrakan hampir selalu meminta foto KTP, kadang juga KK atau kartu mahasiswa. Wajar, tetapi foto itu bisa beredar jauh lebih luas dari yang Anda kira. Watermark membuatnya terikat pada satu keperluan.",
    example: "Hanya untuk sewa kos, Kos Melati Jl. Kenanga, 12/10/2026",
    body: [
      { type: "h2", text: "Mengapa pemilik kos meminta KTP" },
      {
        type: "p",
        text: "Pemilik kos atau kontrakan perlu tahu siapa penghuninya, dan di banyak lingkungan data penghuni baru juga dilaporkan ke RT atau RW. Jadi permintaan foto KTP itu biasa. Hanya saja, foto itu biasanya dikirim lewat WhatsApp, tersimpan di galeri HP pemilik atau penjaga kos, dan kadang diteruskan ke orang lain. Setiap salinan tambahan adalah satu peluang lagi untuk bocor.",
      },
      { type: "h2", text: "Waspada iklan kos palsu" },
      {
        type: "p",
        text: "Modus yang sering terjadi: ada iklan kos atau kontrakan bagus dengan harga miring. \"Pemilik\" bilang peminatnya banyak, lalu meminta foto KTP dan transfer DP sebagai tanda jadi sebelum Anda sempat melihat lokasinya. Setelah uang terkirim, ia menghilang, dan foto KTP Anda tetap di tangannya. Watermark yang menyebut nama kos dan keperluannya membuat foto itu jauh lebih sulit dipakai ulang.",
      },
      {
        type: "warning",
        text: "Sebisa mungkin, lihat lokasinya dan temui pemiliknya langsung sebelum membayar DP. Jika Anda menjadi korban penipuan transfer, segera hubungi bank Anda dan laporkan lewat layanan pengaduan penipuan OJK atau ke polisi.",
      },
      { type: "h2", text: "Cara memberi watermark dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser HP. Tidak perlu aplikasi atau akun.",
          "Masukkan foto KTP, dan KK atau kartu mahasiswa jika diminta. Bisa sekaligus.",
          "Pilih contoh Sewa kos, lalu isi nama kosnya sebagai penerima. Tanggal ditambahkan otomatis.",
          "Periksa pratinjau: tulisan diulang miring di seluruh halaman, data tetap terbaca.",
          "Unduh hasilnya dan kirim file itu ke pemilik kos.",
        ],
      },
      {
        type: "tip",
        text: "Sedang survei beberapa kos sekaligus? Tambahkan tiap kos dengan \"+ Tambah penerima lain\". Setiap pemilik mendapat salinan sendiri dengan namanya, sehingga jika ada yang bocor, Anda tahu asalnya.",
      },
      { type: "h2", text: "Kartu Keluarga: kirim hanya jika benar-benar perlu" },
      {
        type: "p",
        text: "KK memuat data seluruh anggota keluarga: NIK orang tua, adik, kakak, dan nama ibu kandung yang sering dipakai sebagai pertanyaan keamanan bank. Untuk sewa kos, KTP biasanya sudah cukup. Jika pemilik tetap meminta KK, tanyakan bagian mana yang perlu, lalu sensor data yang tidak diperlukan dengan tombol \"Sensor sesuatu\" di bawah pratinjau. Bagian yang disensor benar-benar dihapus dari file.",
      },
      {
        type: "p",
        text: "Semua proses terjadi di HP Anda: Cachety tidak punya server yang menerima file, jadi KTP dan KK Anda tidak di-upload ke mana pun.",
      },
    ],
    faq: [
      {
        q: "Apakah pemilik kos mau menerima KTP ber-watermark?",
        a: "Umumnya mau, karena data tetap terbaca. Jika pemilik perlu melihat KTP asli, Anda bisa menunjukkannya langsung saat bertemu tanpa menyerahkannya.",
      },
      {
        q: "Apa yang ditulis di watermark untuk kos?",
        a: "Keperluan, nama kos, dan tanggal. Contoh: Hanya untuk sewa kos, Kos Melati Jl. Kenanga, 12/10/2026.",
      },
      {
        q: "Bolehkah pemilik kos menahan KTP asli saya?",
        a: "Sebaiknya jangan serahkan KTP asli untuk ditahan, karena Anda membutuhkannya sehari-hari. Tawarkan salinan ber-watermark sebagai gantinya.",
      },
    ],
    updated: UPDATED,
  },

  // ---------------------------------------------------------- job-application
  {
    slug: "watermark-dokumen-lamaran-kerja",
    topic: "job-application",
    title: "Watermark dokumen lamaran kerja: KTP, ijazah, dan NPWP",
    metaTitle: "Watermark KTP dan Dokumen untuk Lamaran Kerja",
    description:
      "Melamar kerja online? Beri watermark pada KTP, ijazah, NPWP, dan KK sebelum dikirim, dan kenali ciri lowongan kerja palsu yang mengincar data pribadi.",
    intro:
      "Lamaran kerja online sering meminta setumpuk dokumen sekaligus: CV, KTP, ijazah, transkrip, NPWP, SKCK, bahkan KK. Sebagian besar perusahaan menanganinya dengan baik, tetapi lowongan palsu juga memakai cara yang sama untuk mengumpulkan data.",
    example: "Hanya untuk lamaran kerja, PT Sinar Abadi, Staf Admin, 12/10/2026",
    body: [
      { type: "h2", text: "Lowongan palsu yang mengincar data" },
      {
        type: "p",
        text: "Tawaran kerja termasuk modus yang disebut OJK dalam imbauannya soal permintaan data pribadi. Ciri-cirinya mudah dikenali jika Anda tahu: gaji tidak masuk akal untuk pekerjaan ringan, proses sangat cepat tanpa wawancara, komunikasi hanya lewat WhatsApp atau Telegram, alamat email gratisan, dan permintaan foto KTP, selfie, atau data rekening di awal. Perusahaan yang serius tidak meminta uang dan tidak meminta kode OTP.",
      },
      {
        type: "warning",
        text: "Jangan pernah membayar biaya pelatihan, seragam, atau tes untuk sebuah lowongan, dan jangan berikan kode OTP. Jika ragu, cari nomor telepon resmi perusahaan dan tanyakan langsung apakah lowongan itu benar.",
      },
      { type: "h2", text: "Dokumen apa yang dikirim, dan kapan" },
      {
        type: "list",
        items: [
          "Tahap melamar: CV dan surat lamaran biasanya cukup. Ijazah dan transkrip jika diminta.",
          "Setelah lolos seleksi: KTP, NPWP, SKCK, dan rekening untuk gaji.",
          "KK: hanya jika benar-benar diminta, misalnya untuk pendaftaran BPJS setelah diterima.",
        ],
      },
      { type: "h2", text: "Cara memberi watermark dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di HP atau komputer.",
          "Masukkan semua dokumen yang diminta: PDF dan foto bisa dicampur.",
          "Pilih contoh Lamaran kerja dan tambahkan posisinya, lalu isi nama perusahaan sebagai penerima. Tanggal ditambahkan otomatis.",
          "Jika portal lamaran meminta satu file, pilih \"Satu file PDF\" di bagian \"Sebelum mengunduh\" dan atur urutannya: KTP dulu, lalu ijazah, lalu NPWP.",
          "Jika ada batas ukuran, misalnya 2 MB, tekan \"Perkecil ukuran\" dan pilih 2 MB.",
          "Unduh dan lampirkan hasilnya di lamaran Anda.",
        ],
      },
      {
        type: "tip",
        text: "Melamar ke banyak perusahaan? Tambahkan tiap perusahaan dengan \"+ Tambah penerima lain\": masing-masing mendapat salinan sendiri dengan nama perusahaannya. Tekan juga \"Ubah teks\" dan sisipkan {kode} untuk menambahkan kode singkat yang berbeda di setiap salinan.",
      },
      { type: "h2", text: "Dokumen Anda tetap di perangkat Anda" },
      {
        type: "p",
        text: "Cachety bekerja di browser Anda dan tidak punya server yang menerima file. Ijazah, KTP, dan NPWP Anda tidak di-upload ke Cachety. Perlu diketahui: setiap halaman diubah menjadi gambar, sehingga teks di file hasil tidak bisa diseleksi lagi. Itu disengaja agar watermark sulit dihapus. Untuk CV yang harus dibaca sistem rekrutmen otomatis, kirim CV tanpa watermark dan beri watermark hanya pada dokumen identitas.",
      },
    ],
    faq: [
      {
        q: "Apakah HRD keberatan dengan dokumen ber-watermark?",
        a: "Umumnya tidak, selama data terbaca. Watermark yang menyebut nama perusahaan malah menunjukkan Anda berhati-hati dengan data pribadi.",
      },
      {
        q: "Perlukah CV diberi watermark?",
        a: "Tidak harus. CV jarang memuat data seperti NIK. Lagi pula, banyak perusahaan memakai sistem yang membaca teks CV secara otomatis, dan file hasil Cachety tidak lagi berisi teks yang bisa dibaca mesin.",
      },
      {
        q: "Bagaimana cara mengenali lowongan kerja palsu?",
        a: "Waspadai gaji yang terlalu tinggi, proses tanpa wawancara, kontak hanya lewat chat, permintaan biaya, dan permintaan foto KTP, selfie, atau OTP di awal. Pastikan lewat situs atau nomor resmi perusahaan.",
      },
    ],
    updated: UPDATED,
  },

  // ----------------------------------------------------------- identity-theft
  {
    slug: "ktp-disalahgunakan-pinjol-cara-mencegah",
    topic: "identity-theft",
    title: "KTP disalahgunakan untuk pinjol: cara mencegah dan apa yang harus dilakukan",
    metaTitle: "KTP Disalahgunakan untuk Pinjol: Cegah dan Atasi",
    description:
      "Data KTP bisa dipakai orang lain untuk pinjol atau akun palsu. Cara mencegahnya dengan watermark, cara mengecek NIK Anda, dan ke mana harus melapor.",
    intro:
      "Kisah orang yang tiba-tiba ditagih pinjol yang tidak pernah diajukannya sudah sering terdengar. Sering kali awalnya sepele: foto KTP yang pernah dikirim ke suatu tempat, lalu bocor atau dijual.",
    example: "Hanya untuk registrasi kartu SIM, Konter Pulsa Berkah, 12/10/2026",
    body: [
      { type: "h2", text: "Bagaimana data KTP bisa disalahgunakan" },
      {
        type: "list",
        items: [
          "Mendaftar pinjaman online atas nama Anda dengan foto KTP yang bocor.",
          "Membuka rekening, akun e-wallet, atau kartu SIM yang dipakai untuk penipuan.",
          "Menyebarkan foto KTP Anda saat terjadi penagihan oleh pinjol ilegal.",
          "Membuat cerita penipuan lebih meyakinkan, misalnya mengaku sebagai Anda kepada keluarga.",
        ],
      },
      { type: "h2", text: "Pencegahan: kirim lebih sedikit, beri tanda pada semuanya" },
      {
        type: "p",
        text: "Langkah paling ampuh adalah membatasi siapa yang memegang salinan KTP Anda. Kirim hanya jika benar-benar diminta oleh pihak yang jelas. Lalu beri watermark pada setiap salinan: keperluan, penerima, dan tanggal. Salinan bertuliskan \"Hanya untuk registrasi kartu SIM, Konter Pulsa Berkah\" akan terlihat janggal jika dipakai untuk mengajukan pinjaman. Undang-Undang Pelindungan Data Pribadi (UU No. 27 Tahun 2022) juga mewajibkan pihak yang mengumpulkan data untuk menjaganya, tetapi tetap lebih aman jika salinan yang beredar sejak awal sudah terikat pada satu keperluan.",
      },
      { type: "h2", text: "Cara memberi watermark dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser.",
          "Masukkan foto atau scan KTP Anda.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Tekan \"Ubah teks\" dan sisipkan {kode}, misalnya \"ref. {kode}\", agar setiap salinan memiliki kode singkat sendiri. Setelah mengunduh, tekan \"Simpan daftar\" dan simpan daftarnya sendiri.",
          "Unduh dan kirim file ber-watermark.",
        ],
      },
      {
        type: "tip",
        text: "Daftar ini menunjukkan kode dan penerima setiap salinan. Daftar ini tidak disimpan di mana pun, jadi simpan baik-baik, misalnya di aplikasi catatan. Jika suatu hari salinan KTP Anda muncul di tempat yang aneh, kodenya memberi tahu ke mana dulu Anda mengirimnya.",
      },
      { type: "h2", text: "Jika Anda curiga KTP sudah disalahgunakan" },
      {
        type: "steps",
        items: [
          "Periksa pinjaman atas nama Anda lewat layanan iDebku dari OJK (SLIK), yang memperlihatkan riwayat kredit Anda di lembaga keuangan.",
          "Jika ada pinjaman yang tidak pernah Anda ajukan, hubungi lembaga keuangan tersebut dan laporkan ke OJK lewat Kontak OJK 157.",
          "Jika Anda menjadi korban penipuan yang melibatkan transfer uang, segera hubungi bank Anda dan laporkan ke layanan pengaduan penipuan OJK (Indonesia Anti-Scam Centre).",
          "Buat laporan polisi untuk penyalahgunaan identitas, dan simpan semua bukti: tangkapan layar, nomor, dan tanggal.",
        ],
      },
      {
        type: "p",
        text: "Terus terang: watermark tidak bisa menarik kembali salinan yang sudah bocor, dan tidak membuat penyalahgunaan mustahil. Watermark mengurangi nilai salinan bagi penjahat dan membantu menelusuri asal kebocoran. Cachety sendiri tidak menerima file Anda: semuanya diproses di perangkat Anda.",
      },
    ],
    faq: [
      {
        q: "Bagaimana cara mengecek apakah NIK saya dipakai untuk pinjaman?",
        a: "Anda bisa meminta informasi debitur (iDeb) secara gratis lewat layanan iDebku dari OJK. Laporan itu memperlihatkan pinjaman atas nama Anda di lembaga keuangan yang melapor ke OJK.",
      },
      {
        q: "Apakah watermark bisa mencegah KTP saya dipakai pinjol?",
        a: "Watermark membuat salinan jauh lebih sulit dipakai, karena keperluan dan penerimanya tertulis jelas di atasnya. Tetapi tidak ada cara yang menjamin 100%. Gabungkan dengan kebiasaan mengirim KTP hanya jika perlu.",
      },
      {
        q: "Saya ditagih pinjol yang tidak pernah saya ajukan. Apa langkah pertama?",
        a: "Jangan membayar dulu. Kumpulkan bukti, periksa riwayat kredit Anda lewat iDebku, lalu laporkan ke OJK di 157 dan ke polisi.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------- redact
  {
    slug: "sensor-nik-nomor-rekening-pdf",
    topic: "redact",
    title: "Cara menyensor NIK dan nomor rekening di PDF atau foto",
    metaTitle: "Cara Sensor NIK dan Nomor Rekening di PDF, Gratis",
    description:
      "Sembunyikan NIK, nomor rekening, atau data di slip gaji dan rekening koran sebelum dikirim. Data benar-benar dihapus, bukan cuma ditutup. Gratis.",
    intro:
      "Rekening koran, slip gaji, dan KK sering berisi lebih banyak data daripada yang dibutuhkan penerima. Menyensor bagian yang tidak perlu adalah cara sederhana untuk mengurangi risiko.",
    example: "Hanya untuk bukti penghasilan, Kos Melati, 12/10/2026",
    body: [
      { type: "h2", text: "Kotak hitam biasa belum tentu aman" },
      {
        type: "p",
        text: "Menutup nomor dengan kotak hitam di aplikasi edit PDF sering hanya menambahkan lapisan di atasnya. Teks aslinya masih ada di dalam file dan bisa disalin, dicari, atau dimunculkan lagi dengan menghapus kotaknya. Di Cachety, setiap halaman dibuat ulang dari gambar, dan area yang Anda sensor benar-benar dihapus dari file. Teks tersembunyi dan metadata juga ikut dibuang.",
      },
      { type: "h2", text: "Apa saja yang biasanya bisa disensor" },
      {
        type: "list",
        items: [
          "Nomor rekening di rekening koran: sering kali beberapa digit terakhir sudah cukup.",
          "Transaksi yang tidak berhubungan, jika penerima hanya perlu melihat gaji masuk.",
          "NPWP atau nomor BPJS di slip gaji, jika tidak diminta.",
          "Data anggota keluarga lain di KK yang tidak berkaitan dengan keperluan.",
          "Foto, tanda tangan, atau nomor kartu yang tidak dibutuhkan.",
        ],
      },
      {
        type: "warning",
        text: "Tanyakan dulu kepada penerima. Bank, notaris, atau instansi resmi sering membutuhkan dokumen lengkap, termasuk NIK utuh untuk verifikasi. Mengubah dokumen tanpa izin bisa membuat pengajuan Anda ditolak.",
      },
      { type: "h2", text: "Langkah-langkah dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com dan masukkan PDF atau foto dokumen Anda.",
          "Ketik keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Tekan \"Sensor sesuatu\" di bawah pratinjau, lalu gambar kotak pada bagian yang ingin disembunyikan. Kotak bisa digeser, diubah ukurannya, atau dihapus.",
          "Tekan \"Selesai\". Ulangi di halaman lain jika perlu.",
          "Periksa pratinjau, lalu unduh hasilnya. Centang \"Kunci dengan kata sandi\" jika dokumen akan dikirim lewat email.",
        ],
      },
      {
        type: "tip",
        text: "Sensor tersedia di halaman-halaman awal setiap dokumen. Untuk rekening koran yang sangat panjang, kirim hanya bulan yang diminta.",
      },
      { type: "h2", text: "Tanpa upload" },
      {
        type: "p",
        text: "Dokumen keuangan termasuk data paling sensitif. Dengan Cachety, rekening koran dan slip gaji Anda tidak dikirim ke server mana pun: semuanya diproses di browser Anda. Karena setiap halaman menjadi gambar, teks di file hasil tidak bisa diseleksi atau dicari lagi, dan ukuran file bisa lebih besar dari aslinya.",
      },
    ],
    faq: [
      {
        q: "Apakah bagian yang disensor bisa dikembalikan?",
        a: "Tidak dari file hasil Cachety. Halaman dibuat ulang dari gambar, dan area yang disensor diisi hitam pekat sebelum file disimpan. Simpan file asli Anda di tempat aman jika masih diperlukan.",
      },
      {
        q: "Bolehkah saya menyensor NIK di KTP?",
        a: "Tergantung penerimanya. Untuk verifikasi identitas, NIK biasanya wajib terlihat. Untuk keperluan lain, misalnya bukti domisili, tanyakan dulu apakah sebagian NIK boleh ditutup.",
      },
      {
        q: "Apakah fitur sensor ini gratis?",
        a: "Ya. Sensor, watermark, dan kata sandi semuanya gratis, tanpa akun.",
      },
    ],
    updated: UPDATED,
  },

  // -------------------------------------------------------------------- phone
  {
    slug: "cara-watermark-foto-ktp-di-hp",
    topic: "phone",
    title: "Cara memberi watermark pada foto KTP langsung dari HP Android atau iPhone",
    metaTitle: "Cara Watermark Foto KTP di HP Android dan iPhone",
    description:
      "Beri watermark pada foto KTP atau dokumen langsung dari HP, tanpa instal aplikasi. Bisa untuk foto galeri, HEIC dari iPhone, dan PDF. Gratis.",
    intro:
      "Kebanyakan orang memotret dan mengirim KTP langsung dari HP. Anda tidak perlu aplikasi edit foto atau komputer untuk memberinya watermark: browser di HP sudah cukup.",
    example: "Hanya untuk pendaftaran BPJS, Klinik Sehat Sentosa, 12/10/2026",
    body: [
      { type: "h2", text: "Memotret KTP dengan baik" },
      {
        type: "list",
        items: [
          "Letakkan KTP di permukaan polos yang gelap, dengan cahaya cukup tapi tidak memantul.",
          "Foto dari atas, lurus, dan pastikan keempat sudut KTP terlihat.",
          "Periksa apakah NIK dan nama terbaca jelas sebelum lanjut.",
        ],
      },
      { type: "h2", text: "Langkah-langkah di HP" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di Chrome, Safari, atau browser lain di HP Anda.",
          "Ketuk area dokumen, lalu pilih foto KTP dari galeri atau ambil foto baru.",
          "Ketik keperluannya atau ketuk salah satu contoh, lalu isi nama penerima. Tanggal ditambahkan otomatis.",
          "Geser ke bawah untuk melihat pratinjau. Ketuk gambar untuk memperbesar dan memeriksa detailnya.",
          "Ketuk tombol unduh. File tersimpan di folder Download atau di aplikasi File.",
          "Kirim file itu lewat WhatsApp, email, atau formulir online.",
        ],
      },
      {
        type: "tip",
        text: "Saat mengirim lewat WhatsApp, pilih kirim sebagai dokumen, bukan sebagai foto, agar file tidak dikompresi dan tulisan tetap tajam.",
      },
      { type: "h2", text: "Foto iPhone dan batas ukuran file" },
      {
        type: "p",
        text: "Foto iPhone dalam format HEIC bisa langsung dipakai. Banyak formulir online di Indonesia membatasi ukuran upload, misalnya 1 atau 2 MB. Ukuran file terlihat sebelum mengunduh; ketuk \"Perkecil ukuran\", pilih batasnya, dan Cachety akan mengecilkan file sampai batas itu tanpa membuat dokumen sulit dibaca.",
      },
      { type: "h2", text: "Pasang seperti aplikasi" },
      {
        type: "p",
        text: "Dari menu browser, pilih Tambahkan ke layar utama. Cachety akan muncul seperti aplikasi biasa, tanpa perlu diunduh dari toko aplikasi. Di Android, setelah dipasang, Anda bahkan bisa membagikan foto langsung dari galeri ke Cachety.",
      },
      {
        type: "p",
        text: "Foto Anda tidak keluar dari HP: Cachety tidak punya server yang menerima file. Coba sendiri dengan tes mode pesawat: buka halamannya, nyalakan mode pesawat, lalu beri watermark pada foto. Tetap berjalan. Lokasi GPS yang tersimpan di foto juga dihapus dari file hasil.",
      },
    ],
    faq: [
      {
        q: "Apakah harus instal aplikasi?",
        a: "Tidak. Cachety berjalan di browser HP. Jika sering memakainya, Anda bisa menambahkannya ke layar utama.",
      },
      {
        q: "Apakah bisa dipakai tanpa kuota internet?",
        a: "Setelah halaman terbuka sekali, Cachety tetap bisa dipakai tanpa internet. Itu juga bukti bahwa foto Anda tidak dikirim ke mana pun.",
      },
      {
        q: "Kenapa tulisan watermark jadi buram setelah dikirim lewat WhatsApp?",
        a: "WhatsApp mengompresi foto yang dikirim sebagai gambar. Kirim sebagai dokumen agar kualitasnya tetap terjaga.",
      },
      {
        q: "Apakah hasilnya berupa foto atau PDF?",
        a: "Foto tetap menjadi gambar, kecuali Anda menggabungkannya menjadi satu PDF atau menambahkan kata sandi, yang membuat hasilnya menjadi PDF terenkripsi.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------ sign
  // Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
  {
    slug: "tanda-tangan-perjanjian-sewa-online",
    topic: "sign",
    tool: "sign",
    title: "Cara menandatangani perjanjian sewa rumah, kos, atau kontrakan secara online tanpa upload",
    metaTitle: "Tanda Tangan Perjanjian Sewa Online, Gratis Tanpa Upload",
    description:
      "Tanda tangani perjanjian sewa rumah, kos, atau kontrakan di browser: gambar atau ketik tanda tangan, tempatkan, lalu unduh PDF. Gratis, tanpa upload.",
    intro:
      "Pemilik kos, pemilik rumah, atau agen properti sering mengirim perjanjian sewa dalam bentuk PDF dan meminta Anda mengirimnya kembali dalam keadaan sudah ditandatangani. Anda tidak perlu mencetak, memindai, atau membuat akun: dokumen bisa ditandatangani di browser dalam sekitar satu menit, dan tidak pernah keluar dari perangkat Anda.",
    example: "Perjanjian sewa sudah ditandatangani, hanya untuk Kos Melati Asri, 17/10/2026",
    body: [
      { type: "h2", text: "Dokumen yang mungkin perlu Anda tanda tangani" },
      {
        type: "p",
        text: "Menyewa tempat tinggal biasanya disertai beberapa dokumen: perjanjian sewa itu sendiri, berita acara serah terima atau daftar inventaris, kadang surat pernyataan untuk pemilik. Sebagian besar dikirim sebagai PDF dengan kolom bertuliskan \"Tanda tangan\". Pilihan yang biasa adalah situs tanda tangan yang meminta Anda meng-upload file dan membuat akun, atau mencetak, menandatangani, memindai, lalu mengirim ulang. Cachety melakukannya langsung di browser.",
      },
      { type: "h2", text: "Cara menandatangani dokumen sewa dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com/id/sign di browser, di komputer atau HP. Tidak perlu instal apa pun, tidak perlu daftar.",
          "Dokumen Anda: letakkan PDF di halaman, atau ketuk untuk memilihnya. Anda bisa menambahkan beberapa file sekaligus, misalnya perjanjian sewa dan berita acara serah terima. Foto dokumen kertas juga bisa: hasilnya menjadi PDF satu halaman.",
          "Tanda tangan Anda: gambar dengan jari, stylus, atau mouse, ketik nama Anda, atau impor foto tanda tangan Anda di atas kertas putih. Di bawah tanda tangan, jika mau, biarkan tanggal hari ini dan tambahkan tempat serta catatan singkat seperti \"Telah dibaca dan disetujui\".",
          "Tempatkan, periksa, unduh: tanda tangan muncul di kanan bawah halaman terakhir. Geser ke garis tanda tangan dan pakai sudutnya untuk mengubah ukuran. Jika pemilik meminta paraf di setiap halaman, aktifkan pilihan \"Paraf juga setiap halaman\".",
          "Periksa pratinjau, lalu unduh. Salinan yang sudah ditandatangani memakai nama file asli dengan tambahan -signed di akhir. Salinan inilah yang Anda kirim kembali.",
        ],
      },
      {
        type: "p",
        text: "Jika ada beberapa dokumen, setiap dokumen punya posisi tanda tangannya sendiri. Dokumen baru siap setelah tanda tangan Anda ditempatkan di atasnya: daftar menunjukkan mana yang masih menunggu.",
      },
      {
        type: "tip",
        text: "Setelah mengunduh, Cachety menampilkan sidik jari setiap file: kode 64 karakter yang dihitung dari file persis yang Anda unduh. Salin, simpan bersama arsip Anda, dan kirimkan bersama dokumennya (misalnya dalam email yang sama). Jika suatu hari muncul versi lain dari perjanjian itu, sidik jarinya tidak akan cocok: Anda bisa tahu bahwa itu bukan file yang Anda kirim.",
      },
      { type: "h2", text: "Pilihan yang perlu Anda ketahui" },
      {
        type: "list",
        items: [
          "Pilihan \"Paraf juga setiap halaman\" menempatkan salinan kecil tanda tangan Anda di kanan bawah semua halaman lain, sehingga halaman yang ditukar lebih mudah ketahuan.",
          "\"Kunci dengan kata sandi\" mati secara bawaan, karena penerima harus bisa membuka file. Nyalakan hanya jika Anda memberikan kata sandinya lewat jalur lain, misalnya lewat telepon.",
          "\"Perkecil ukuran\" membantu jika email atau formulir penerima membatasi ukuran file.",
          "Menambahkan watermark sekaligus akan menuliskan keperluan, penerima, dan tanggal di atas salinan yang ditandatangani.",
        ],
      },
      { type: "h2", text: "Dokumen Anda tidak keluar dari perangkat" },
      {
        type: "p",
        text: "Cachety bekerja di dalam browser. Tidak ada server yang menerima dokumen Anda, dan halaman ini secara teknis dilarang menghubungi situs lain. Coba sendiri: setelah halaman terbuka, nyalakan mode pesawat, lalu tanda tangani dokumen Anda. Semuanya tetap berjalan. Tanda tangan Anda juga tidak disimpan: tanda tangan itu hanya ada di memori tab dan hilang saat tab ditutup.",
      },
      {
        type: "p",
        text: "Setiap halaman salinan yang ditandatangani dibuat ulang dari pikselnya. Cara ini menghapus teks tersembunyi dan metadata, dan teksnya tidak bisa lagi diseleksi di salinan itu. Dokumen asli tetap ada pada Anda, tidak berubah.",
      },
      { type: "h2", text: "Apakah tanda tangan ini sah untuk perjanjian sewa?" },
      {
        type: "p",
        text: "Tanda tangan yang digambar atau diketik lalu ditempatkan di dokumen adalah tanda tangan elektronik tidak tersertifikasi. Aturannya berbeda di setiap negara dan untuk setiap jenis dokumen, tetapi tanda tangan elektronik diakui di banyak tempat. Untuk dokumen sewa sehari-hari, seperti perjanjian sewa kos atau kontrakan dan berita acara serah terima, biasanya ini diterima.",
      },
      {
        type: "p",
        text: "Jika terjadi sengketa, pihak yang mengandalkan dokumen itulah yang harus membuktikan siapa yang menandatanganinya; simpan email atau pesan yang dipakai untuk mengirimnya. Tanda tangan elektronik tersertifikasi, yang dibuat dengan sertifikat dari penyelenggara resmi, punya kekuatan pembuktian yang lebih kuat daripada tanda tangan tidak tersertifikasi.",
      },
      {
        type: "warning",
        text: "Ini bukan alat yang tepat jika diwajibkan tanda tangan elektronik tersertifikasi, jika hukum mewajibkan bentuk khusus, seperti surat wasiat atau akta notaris, jika pihak lain meminta platform tanda tangan tertentu, atau jika dokumen harus melalui platform resmi (sebagian perjanjian kredit dan asuransi, beberapa urusan resmi). Dalam hal itu, gunakan yang diminta. Ini bukan nasihat hukum.",
      },
      { type: "h2", text: "Bisakah tanda tangan saya dipakai ulang orang lain?" },
      {
        type: "p",
        text: "Tanda tangan Anda menjadi bagian dari gambar setiap halaman, jadi tidak bisa dipindahkan atau dihapus sebagai elemen PDF. Namun, seperti tanda tangan di kertas yang dipindai, seseorang bisa memotongnya dari gambar dan menempelkannya di tempat lain. Tidak ada gambar tanda tangan yang bisa mencegah hal itu, dan file ini tidak membuktikan siapa yang menempatkannya atau bahwa dokumen tidak diubah sesudahnya: simpan salinan Anda. Untuk mengurangi risikonya, tambahkan watermark yang mengikat salinan itu pada keperluan dan penerimanya, lalu paraf setiap halaman.",
      },
    ],
    faq: [
      {
        q: "Apakah pemilik kos atau agen mau menerima dokumen yang ditandatangani seperti ini?",
        a: "Umumnya ya: mengirim kembali PDF yang sudah ditandatangani lewat email atau WhatsApp sudah biasa untuk urusan sewa. Jika mereka memakai platform tanda tangan sendiri dan mewajibkannya, gunakan platform mereka.",
      },
      {
        q: "Apakah saya perlu mencetak sesuatu?",
        a: "Tidak. Anda menandatangani di layar dan mengirim kembali PDF yang sudah ditandatangani. Jika hanya ada versi kertas, foto dokumen itu dengan jelas di tempat terang, lalu tanda tangani fotonya.",
      },
      {
        q: "Apakah tanda tangan saya disimpan?",
        a: "Tidak. Tanda tangan itu hanya ada di memori tab. Tutup tab dan tanda tangan itu hilang. Lain kali, Anda menggambar atau mengetiknya lagi.",
      },
      {
        q: "Apakah teks di PDF yang sudah ditandatangani masih bisa disalin?",
        a: "Tidak. Setiap halaman dibuat ulang dari pikselnya, yang juga menghapus teks tersembunyi dan metadata. Simpan dokumen asli jika Anda memerlukan teksnya.",
      },
      {
        q: "Apakah Cachety benar-benar gratis?",
        a: "Ya. Gratis, tanpa akun, dan tanpa pelacakan. Cachety adalah perangkat lunak sumber terbuka buatan Prancis oleh Amir Moradi.",
      },
    ],
    updated: "2026-10-17",
  },

  // ------------------------------------------------------------------ sign-phone
  // Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
  {
    slug: "tanda-tangan-pdf-di-hp",
    topic: "sign-phone",
    tool: "sign",
    title: "Cara tanda tangan PDF langsung dari HP Android atau iPhone",
    metaTitle: "Cara Tanda Tangan PDF di HP Android dan iPhone, Gratis",
    description:
      "Tanda tangani PDF dengan jari di HP Android atau iPhone. Tanpa instal aplikasi, tanpa akun, dan dokumen tidak pernah di-upload. Gratis dan open source.",
    intro:
      "Ada yang mengirim PDF untuk ditandatangani dan dikirim kembali, sementara Anda jauh dari komputer. Anda bisa menandatanganinya dengan jari di HP, langsung di browser, dalam sekitar satu menit.",
    example: "Surat izin sudah ditandatangani, hanya untuk SD Tunas Harapan, 17/10/2026",
    body: [
      { type: "h2", text: "Tanpa aplikasi, tanpa akun, tanpa upload" },
      {
        type: "p",
        text: "Cachety berjalan di browser HP, seperti Chrome atau Safari. Tidak ada yang perlu diunduh dari toko aplikasi dan tidak perlu membuat akun. Dokumen diproses di HP itu sendiri dan tidak pernah di-upload: halaman ini secara teknis dilarang menghubungi situs lain.",
      },
      { type: "h2", text: "Langkah-langkah di HP" },
      {
        type: "steps",
        items: [
          "Simpan PDF yang Anda terima ke HP. Di sebagian besar aplikasi email atau WhatsApp, ketuk lampirannya, lalu simpan ke folder Download di Android atau ke aplikasi File di iPhone.",
          "Buka cachety.com/id/sign di browser, ketuk area dokumen, lalu pilih PDF tersebut. Foto dokumen kertas juga bisa.",
          "Gambar tanda tangan Anda di kotak dengan jari. Kurang pas? Batalkan goresan terakhir atau hapus semuanya, lalu coba lagi. Anda juga bisa mengetik nama, atau mengimpor foto tanda tangan Anda.",
          "Pilih apa yang muncul di bawah tanda tangan, jika perlu. Tanggal hari ini sudah aktif secara bawaan, dan Anda bisa menambahkan tempat serta catatan seperti \"Telah dibaca dan disetujui\".",
          "Lanjut ke langkah tempatkan, periksa, unduh. Tanda tangan muncul di kanan bawah halaman terakhir. Geser dengan jari dan pakai sudutnya untuk mengubah ukuran.",
          "Periksa pratinjau, unduh PDF yang sudah ditandatangani, lalu kirim kembali lewat email atau WhatsApp.",
        ],
      },
      {
        type: "tip",
        text: "Tanda tangani sedikit lebih besar daripada di kertas, dan pelan-pelan saja. Ruang kosong di sekitar tanda tangan dipotong otomatis, sehingga tetap tajam saat ditempatkan di halaman.",
      },
      { type: "h2", text: "Lebih suka memakai foto tanda tangan?" },
      {
        type: "p",
        text: "Jika tanda tangan dengan jari terasa canggung, tanda tangani selembar kertas putih dengan pulpen gelap, foto di bawah cahaya siang, lalu pilih tab \"Impor\". Latar putihnya dihapus otomatis. Jika masih ada bagian kertas yang terlihat, geser pengatur \"Sensitivitas\". Foto iPhone (HEIC) juga bisa.",
      },
      { type: "h2", text: "Pastikan semuanya tetap di HP" },
      {
        type: "p",
        text: "Setelah halaman terbuka, nyalakan mode pesawat, lalu pilih PDF dan tanda tangani. Semuanya tetap berjalan, dan itu bukti bahwa tidak ada yang dikirim ke mana pun. Tanda tangan Anda tidak disimpan: tutup tab dan tanda tangan itu hilang.",
      },
      { type: "h2", text: "Pilihan sebelum mengunduh" },
      {
        type: "list",
        items: [
          "Pilihan \"Paraf juga setiap halaman\" menambahkan salinan kecil tanda tangan Anda di halaman-halaman lain.",
          "\"Perkecil ukuran\" menjaga file tetap di bawah batas ukuran email atau formulir online.",
          "\"Kunci dengan kata sandi\" mati secara bawaan, supaya penerima bisa langsung membuka file.",
          "Setelah mengunduh, sidik jari file ditampilkan. Simpan, dan kirimkan bersama dokumennya: jika suatu hari muncul versi lain, sidik jarinya tidak akan cocok, dan Anda bisa tahu bahwa itu bukan file yang Anda kirim.",
        ],
      },
      { type: "h2", text: "Seberapa kuat tanda tangan ini?" },
      {
        type: "p",
        text: "Tanda tangan yang digambar di HP lalu ditempatkan di dokumen adalah tanda tangan elektronik tidak tersertifikasi. Umumnya ini diterima untuk dokumen sehari-hari, seperti surat izin sekolah, formulir organisasi, penawaran harga, dan dokumen sewa. Aturannya berbeda di setiap negara. Jika terjadi sengketa, pihak yang mengandalkan dokumen itulah yang harus membuktikan siapa yang menandatanganinya; simpan email atau pesan yang dipakai untuk mengirimnya.",
      },
      {
        type: "warning",
        text: "Ini bukan alat yang tepat jika diwajibkan tanda tangan elektronik tersertifikasi, jika hukum mewajibkan bentuk khusus, seperti surat wasiat atau akta notaris, atau jika pihak lain meminta platform tanda tangan mereka sendiri (sebagian perjanjian kredit dan asuransi, beberapa urusan resmi). Seperti tanda tangan di kertas yang dipindai, seseorang juga bisa memotong tanda tangan Anda dari salinan dan memakainya lagi. Watermark yang berisi keperluan dan penerima, ditambah paraf di setiap halaman, mengurangi risiko itu. Ini bukan nasihat hukum.",
      },
    ],
    faq: [
      {
        q: "Apakah harus instal aplikasi?",
        a: "Tidak. Cachety berjalan di browser HP. Jika sering memakainya, Anda bisa menambahkannya ke layar utama, tetapi tidak wajib.",
      },
      {
        q: "Apakah bisa tanda tangan dengan stylus?",
        a: "Bisa. Kotak tanda tangan bisa dipakai dengan jari, stylus, atau mouse di komputer.",
      },
      {
        q: "Apakah PDF-nya di-upload ke suatu tempat?",
        a: "Tidak. Semuanya terjadi di HP Anda. Nyalakan mode pesawat setelah halaman terbuka, dan semuanya tetap berjalan.",
      },
      {
        q: "Kenapa teks di PDF yang sudah ditandatangani tidak bisa diseleksi lagi?",
        a: "Setiap halaman dibuat ulang dari pikselnya, sehingga tanda tangan tidak bisa dilepas dan data tersembunyi dihapus. Dokumen asli tetap ada di HP Anda, tidak berubah.",
      },
    ],
    updated: "2026-10-17",
  },
];
