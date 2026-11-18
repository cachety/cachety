// Panduan tentang area yang diusulkan untuk disensor (id): menemukan dan
// menyensor nomor kartu dan IBAN, memberikan nomor rekening, mengirim foto
// kartu debit atau kartu kredit. Ditulis untuk pembaca di Indonesia.
// Hanya teks biasa: tanpa tautan, HTML, atau markdown.
// Nama orang, usaha, dan perusahaan dalam contoh adalah fiktif.
//
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// These guides describe the `suggested-areas` feature (docs/prd-suggested-areas.md).
// Publish them with it, not before. The labels of the new feature are not
// quoted here (they do not exist yet in lib/locales/id/strings.ts): the steps
// describe the action instead. Re-check them against the interface at that time.

import type { Guide } from "../types";

const UPDATED = "2026-11-18";

export const HIDE_GUIDES_ID: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "sensor-nomor-kartu-dan-iban-di-pdf",
    topic: "auto-redact",
    title: "Cara menemukan dan menyensor nomor kartu dan IBAN di PDF sebelum dikirim",
    metaTitle: "Cari dan Sensor Nomor Kartu atau IBAN di PDF, Gratis",
    description:
      "Cachety menemukan nomor kartu dan IBAN di PDF Anda dan menawarkan untuk menyensornya, di perangkat Anda. Tanpa upload, dan tidak ada yang disensor tanpa Anda.",
    intro:
      "Slip gaji, tagihan, atau rekening koran sering memuat lebih dari yang dibutuhkan pihak yang memintanya, misalnya nomor rekening atau nomor kartu. Cachety menandai di halaman nomor yang formatnya dikenalinya, dan Anda bisa menyensornya dengan satu ketukan, tanpa file keluar dari perangkat Anda.",
    example: "Hanya untuk bukti penghasilan, Kontrakan Griya Kenanga, 18/11/2026",
    body: [
      { type: "h2", text: "Nomor yang ikut terkirim tanpa Anda sadari" },
      {
        type: "p",
        text: "Ketika pemilik kontrakan meminta slip gaji tiga bulan terakhir, ia ingin melihat siapa yang menggaji Anda dan berapa besarnya. Ia tidak perlu tahu rekening tempat gaji itu masuk. Ketika tagihan dipakai sebagai bukti alamat, tidak ada yang perlu melihat data pembayaran yang tercetak di bagian bawahnya. Tetapi nomor-nomor ini tercetak kecil, di halaman dua atau tiga, dan kebanyakan orang mengirim seluruh file apa adanya.",
      },
      {
        type: "p",
        text: "Menyensornya sendiri memang bisa, tetapi Anda harus tahu di mana mencarinya. Sekarang Cachety yang mencarikannya untuk Anda.",
      },
      { type: "h2", text: "Apa yang dicari Cachety" },
      {
        type: "p",
        text: "Saat Anda memasukkan PDF, Cachety membaca teksnya di browser Anda dan mencari nomor yang formatnya bisa diperiksa:",
      },
      {
        type: "list",
        items: [
          "Nomor rekening yang ditulis sebagai IBAN, format yang dipakai untuk transfer internasional, dari negara mana pun.",
          "Nomor kartu pembayaran dari jaringan kartu utama.",
          "Nomor jaminan sosial Prancis, nomor pajak Prancis, dan nomor referensi surat pajak Prancis.",
        ],
      },
      {
        type: "p",
        text: "Sebuah nomor hanya diusulkan jika lolos pemeriksaan yang ada di dalam formatnya, misalnya digit kontrol pada IBAN, atau jika label di sebelahnya menyebut nomor apa itu. Nomor telepon, tanggal, atau total tagihan tidak ditandai hanya karena berupa deretan angka.",
      },
      { type: "h2", text: "Cara menyensornya, langkah demi langkah" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser, di komputer atau HP. Tidak perlu membuat akun.",
          "Masukkan PDF Anda. Tulis untuk apa salinan ini, lalu siapa penerimanya.",
          "Jika Cachety menemukan sesuatu, pesan di atas pratinjau menyebut berapa nomor yang ditemukan. Buka daftar usulan dari pesan itu.",
          "Setiap usulan diberi garis tepi di halaman dan tercantum dengan namanya, misalnya nomor rekening (IBAN). Ketuk yang ingin Anda sensor, atau pilih untuk menyensor semuanya. Setiap sensor bisa dibatalkan.",
          "Periksa sendiri setiap halaman. Gambar kotak di atas bagian lain yang ingin Anda sensor, lalu unduh salinan Anda.",
        ],
      },
      {
        type: "tip",
        text: "Tidak ada yang disensor sebelum Anda memutuskannya. Jika penerima memang meminta data rekening Anda, biarkan nomornya terlihat: justru itulah yang mereka butuhkan.",
      },
      { type: "h2", text: "Apa yang tidak bisa ditemukan" },
      {
        type: "list",
        items: [
          "Apa pun yang ada di foto atau hasil scan. Gambar tidak berisi teks yang bisa dibaca, jadi tidak ada usulan: gambar sendiri kotaknya.",
          "Barcode dan kode QR. Isinya bisa sama dengan teks yang tercetak di sebelahnya.",
          "Nomor dalam format yang tidak diperiksa Cachety, misalnya nomor pelanggan atau nomor kontrak, nomor rekening dalam negeri, nomor paspor atau nomor SIM.",
          "Nama, alamat, tanggal lahir, dan nomor telepon. Biasanya itulah yang dibutuhkan penerima, jadi tidak diusulkan.",
        ],
      },
      {
        type: "warning",
        text: "Usulan ini adalah bantuan, bukan jaminan. Bisa saja ada yang terlewat. Selalu periksa sendiri seluruh halaman sebelum mengirimnya.",
      },
      { type: "h2", text: "Benar-benar dihapus, dan tidak pernah di-upload" },
      {
        type: "p",
        text: "Area yang disensor bukan sekadar bentuk hitam yang ditaruh di atas teks. Cachety membuat ulang setiap halaman sebagai gambar, sehingga nomornya hilang dari file dan tidak bisa disalin dari baliknya. Pencarian nomor terjadi di browser Anda, dengan aturan sederhana. Dokumen Anda tidak dikirim ke server atau ke layanan AI, dan halaman ini tetap berjalan dalam mode pesawat setelah terbuka.",
      },
    ],
    faq: [
      {
        q: "Apakah Cachety menyensor nomor secara otomatis?",
        a: "Tidak. Cachety menandai apa yang ditemukannya dan Anda yang memutuskan, satu per satu atau semuanya sekaligus. Sebagian nomor ada di sana karena penerima membutuhkannya, dan hanya Anda yang tahu itu.",
      },
      {
        q: "Apakah bisa dipakai untuk foto atau dokumen hasil scan?",
        a: "Tidak. Usulan memerlukan PDF yang berisi teks sungguhan, seperti slip gaji, tagihan, dan rekening koran yang Anda unduh dari situs web. Pada foto atau hasil scan, gambar sendiri kotaknya dengan \"Sensor sesuatu\".",
      },
      {
        q: "Apakah dokumen saya dikirim ke suatu tempat untuk dianalisis?",
        a: "Tidak. Pemeriksaan berjalan di browser Anda, di perangkat Anda. Tidak ada yang di-upload, dan tidak ada layanan AI yang membaca file Anda.",
      },
      {
        q: "Apakah ada nomor yang bisa terlewat?",
        a: "Ya. Nomor di dalam gambar, di dalam barcode, atau dalam format yang tidak diperiksa Cachety tidak akan diusulkan. Karena itulah halaman ini selalu meminta Anda memeriksa sendiri.",
      },
      {
        q: "Apakah semua halaman PDF yang panjang ikut diperiksa?",
        a: "Ya. Usulan mencakup semua halaman, termasuk halaman yang tidak ditampilkan di pratinjau. Untuk halaman itu, daftar menampilkan karakter pertama dan terakhir setiap nomor supaya Anda tahu apa yang Anda sensor.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "amankah-memberikan-nomor-rekening-ke-orang-lain",
    topic: "iban",
    title: "Amankah memberikan nomor rekening ke orang lain? Nomor rekening, nama bank, dan IBAN",
    metaTitle: "Amankah Memberikan Nomor Rekening ke Orang Lain?",
    description:
      "Apa yang bisa dan tidak bisa dilakukan orang dengan nomor rekening Anda, kapan memberikannya, dan cara menyensornya di dokumen yang tidak memerlukannya.",
    intro:
      "Anda memberikan nomor rekening supaya bisa dibayar, dan nomor itu tercetak di banyak dokumen yang Anda kirim untuk keperluan lain. Nomor itu sendiri risikonya kecil. Masalah muncul ketika nomor itu beredar bersama dokumen Anda yang lain.",
    example: "Nomor rekening untuk gaji, HRD PT Ladang Hijau Pangan, 18/11/2026",
    body: [
      { type: "h2", text: "Apa yang bisa dilakukan orang dengan nomor rekening Anda" },
      {
        type: "p",
        text: "Dengan nomor rekening dan nama bank Anda, atau dengan IBAN (format nomor rekening untuk transfer internasional), orang bisa mengirim uang ke rekening Anda. Memang itu gunanya. Nomor itu saja tidak cukup untuk menarik uang atau melakukan transfer: untuk itu diperlukan kartu Anda, akses mobile banking atau internet banking Anda, atau persetujuan Anda.",
      },
      {
        type: "p",
        text: "Risiko yang nyata adalah pendebetan otomatis (autodebet) yang didaftarkan atas nama Anda tanpa persetujuan Anda. Karena itu, periksa mutasi rekening Anda. Jika ada pendebetan yang tidak Anda kenali, segera laporkan ke bank Anda. Cara penanganannya bergantung pada aturan bank masing-masing.",
      },
      { type: "h2", text: "Bahaya sebenarnya: data yang terkumpul jadi satu" },
      {
        type: "p",
        text: "Nomor rekening jauh lebih berguna bagi penipu jika datang bersama salinan KTP, alamat, tanda tangan, dan slip gaji Anda. Digabung, semua itu cukup untuk mencoba membuka rekening atau mengajukan pinjaman atas nama Anda. Berkas sewa tempat tinggal atau berkas lamaran kerja berisi persis kumpulan itu. Jadi pertanyaannya bukan \"apakah nomor rekening saya rahasia?\", melainkan \"apakah orang ini memang membutuhkannya?\".",
      },
      { type: "h2", text: "Kapan diberikan, kapan disensor" },
      {
        type: "list",
        items: [
          "Berikan jika seseorang harus membayar Anda atau menagih pembayaran yang Anda setujui: kantor yang membayar gaji, pemilik kontrakan yang mengembalikan uang jaminan, tagihan yang Anda bayar lewat autodebet.",
          "Sensor jika dokumen dikirim untuk keperluan lain: slip gaji sebagai bukti penghasilan, tagihan sebagai bukti alamat, rekening koran yang hanya perlu menunjukkan nama dan alamat Anda.",
          "Jika bisa, kirim nomor rekening secara terpisah, jangan dalam file yang sama dengan KTP Anda.",
        ],
      },
      { type: "h2", text: "Menyensor nomor rekening dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser. Tidak ada yang perlu diinstal dan tidak perlu akun.",
          "Masukkan PDF atau foto Anda. Tulis untuk apa salinan ini, lalu siapa penerimanya.",
          "Pada PDF, Cachety mencari nomor rekening yang ditulis sebagai IBAN, format yang dipakai untuk transfer internasional, dan memberi tahu jika menemukannya. Buka daftar usulan, lalu ketuk usulan itu untuk menyensornya.",
          "Nomor rekening bank di Indonesia tidak diusulkan, begitu juga apa pun yang ada di foto: tekan \"Sensor sesuatu\" dan gambar kotak di atasnya.",
          "Periksa setiap halaman, lalu unduh salinan Anda.",
        ],
      },
      {
        type: "tip",
        text: "Jika memang harus mengirim nomor rekening, tambahkan watermark yang menyebut untuk siapa dan untuk apa, misalnya \"Nomor rekening untuk gaji, HRD PT Ladang Hijau Pangan\". Salinan bertanda seperti ini sulit dipakai ulang di tempat lain.",
      },
      { type: "h2", text: "File Anda tetap di tangan Anda" },
      {
        type: "p",
        text: "Cachety bekerja di browser Anda. Rekening koran atau slip gaji Anda tidak pernah di-upload, dan nomor yang disensor dihapus dari file itu sendiri, bukan sekadar ditutupi. Ingat bahwa usulan bisa melewatkan sesuatu: periksa setiap halaman sebelum mengirimnya.",
      },
    ],
    faq: [
      {
        q: "Bisakah orang mengambil uang saya hanya dengan nomor rekening?",
        a: "Tidak secara langsung. Nomor rekening dipakai orang untuk mengirim uang ke Anda. Risikonya adalah autodebet yang didaftarkan tanpa persetujuan Anda. Periksa mutasi rekening dan laporkan ke bank apa pun yang tidak Anda kenali.",
      },
      {
        q: "Perlukah nomor rekening di slip gaji disensor?",
        a: "Jika slip gaji dikirim sebagai bukti penghasilan, ya: penerima perlu nama Anda, tempat Anda bekerja, dan gaji Anda, bukan rekening Anda. Jika kantor Anda meminta nomor rekening, kirim secara terpisah.",
      },
      {
        q: "Pemilik kontrakan meminta nomor rekening saya. Apakah itu wajar?",
        a: "Bisa saja, misalnya untuk mengatur pembayaran sewa atau mengembalikan uang jaminan. Kalau begitu ia memang perlu nomornya, jadi jangan disensor. Tambahkan watermark berisi namanya dan keperluannya.",
      },
      {
        q: "Apa yang harus saya lakukan jika ada autodebet yang tidak pernah saya setujui?",
        a: "Segera hubungi bank Anda dan laporkan pendebetan itu. Cara penanganannya bergantung pada aturan bank masing-masing, jadi jangan menunda.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "amankah-kirim-foto-kartu-debit-kredit",
    topic: "bank-card",
    title: "Diminta foto kartu debit atau kartu kredit? Apa yang harus disensor sebelum mengirimnya",
    metaTitle: "Kirim Foto Kartu Debit atau Kredit: Apa yang Disensor",
    description:
      "Hotel atau penjual meminta foto kartu debit atau kartu kredit Anda? Lihat digit mana yang disensor dan mengapa kode keamanan (CVV) tidak boleh dikirim.",
    intro:
      "Hotel, rental mobil, dan sebagian penjual online masih meminta foto kartu Anda \"untuk konfirmasi pemesanan\". Sebelum mengirim apa pun, sensor bagian yang tidak diperlukan siapa pun. Lebih baik lagi, minta cara pembayaran yang lebih aman.",
    example: "Hanya untuk konfirmasi pemesanan, Hotel Pesona Samudra Bali, 18/11/2026",
    body: [
      { type: "h2", text: "Mengapa foto kartu berisiko" },
      {
        type: "p",
        text: "Bagian depan kartu memuat nomor kartu yang panjang, tanggal kedaluwarsa, dan nama Anda. Bagian belakang memuat kode keamanan (CVV) tiga digit. Digabung, itu sudah cukup bagi seseorang untuk membayar secara online dengan kartu Anda. Email atau pesan chat bisa tersimpan bertahun-tahun di beberapa kotak masuk, jauh di luar kendali Anda.",
      },
      {
        type: "warning",
        text: "Jangan pernah mengirim kode keamanan (CVV), yaitu tiga digit di belakang kartu, atau empat digit di depan kartu American Express. Tidak ada usaha yang jujur membutuhkannya dalam bentuk foto. Aturan keamanan industri kartu sendiri melarang pelaku usaha menyimpannya setelah pembayaran selesai.",
      },
      { type: "h2", text: "Minta cara lain dulu" },
      {
        type: "p",
        text: "Usaha yang menerima kartu seharusnya bisa mengirimkan tautan pembayaran yang aman, memproses pembayaran lewat sistem pemesanannya, atau memeriksa kartu saat Anda datang. Tanyakan. Jika mereka tetap meminta salinan, biasanya tujuannya memastikan kartu itu ada dan atas nama Anda, dan salinan yang sebagian disensor sudah cukup untuk itu.",
      },
      { type: "h2", text: "Apa yang disensor dan apa yang dibiarkan" },
      {
        type: "list",
        items: [
          "Sensor digit tengah nomor kartu. Biarkan paling banyak empat digit terakhir, seperti yang tercetak di struk.",
          "Sensor kode keamanan (CVV). Di belakang kartu, sensor seluruh strip tempat kode itu tercetak.",
          "Sensor tanggal kedaluwarsa, kecuali diminta dengan alasan yang jelas.",
          "Biarkan nama Anda dan logo bank, supaya salinan itu tetap membuktikan bahwa kartu itu milik Anda.",
        ],
      },
      { type: "h2", text: "Menyensor digit dengan Cachety" },
      {
        type: "steps",
        items: [
          "Foto bagian depan kartu. Foto bagian belakang hanya jika diminta.",
          "Buka cachety.com di HP atau komputer, lalu masukkan fotonya.",
          "Tulis untuk apa salinan ini, lalu siapa penerimanya, misalnya \"Konfirmasi pemesanan\" dan nama hotelnya.",
          "Di bawah pratinjau, tekan \"Sensor sesuatu\" dan gambar kotak di atas digit tengah, tanggal kedaluwarsa, dan kode keamanan.",
          "Periksa pratinjau, lalu unduh salinannya dan kirim.",
        ],
      },
      {
        type: "tip",
        text: "Pada PDF, misalnya lembar tagihan yang memuat nomor kartu lengkap, Cachety bisa menemukan nomor itu dan menawarkan untuk menyensornya. Pada foto kartu tidak ada teks yang bisa dibaca, jadi Anda menggambar sendiri kotaknya.",
      },
      { type: "h2", text: "Apa yang terjadi dengan fotonya" },
      {
        type: "p",
        text: "Tidak ada yang keluar dari perangkat Anda. Cachety bekerja di browser Anda dan tidak ada server yang menerima foto Anda. Digit yang disensor dihapus dari gambar, bukan sekadar ditutupi, dan lokasi tempat foto diambil dibuang dari file. Watermark menyebut untuk siapa salinan itu dibuat, sehingga lebih sulit dipakai ulang.",
      },
      {
        type: "p",
        text: "Terus terang, salinan yang disensor dan diberi watermark mengurangi risiko, tetapi tidak menghilangkannya. Jika sebuah permintaan terasa janggal, jangan kirim kartu sama sekali, dan telepon usaha tersebut di nomor yang Anda cari sendiri.",
      },
    ],
    faq: [
      {
        q: "Digit nomor kartu mana yang boleh terlihat?",
        a: "Empat digit terakhir cukup untuk sebagian besar pemeriksaan, dan itulah yang dicetak toko di struk. Aturan keamanan kartu mengizinkan pelaku usaha menampilkan paling banyak digit-digit pertama, yang menunjukkan banknya, dan empat digit terakhir. Sensor sisanya.",
      },
      {
        q: "Amankah mengirim foto kartu lewat email atau WhatsApp?",
        a: "Tidak jika nomor lengkap dan kode keamanannya terlihat. Pesan disalin, diteruskan, dan disimpan, dan saran Visa sendiri adalah jangan pernah mengirim informasi pembayaran lewat email. Jika terpaksa mengirim salinan, sensor dulu digit tengah dan kode keamanannya.",
      },
      {
        q: "Hotel meminta bagian depan dan belakang. Apa yang harus saya lakukan?",
        a: "Tanyakan alasannya, dan tawarkan tautan pembayaran yang aman sebagai gantinya. Jika Anda tetap mengirim bagian belakang, sensor kode keamanan dan strip di sekitarnya. Aturan industri kartu tidak mengizinkan pelaku usaha menyimpan kode itu setelah pembayaran selesai.",
      },
      {
        q: "Saya sudah telanjur mengirim foto kartu yang lengkap. Sekarang bagaimana?",
        a: "Hubungi bank Anda. Bank bisa memblokir kartu dan mengirim kartu baru, dan akan menjelaskan cara menyanggah pembayaran yang tidak Anda lakukan. Pantau mutasi rekening atau tagihan Anda dalam minggu-minggu berikutnya.",
      },
    ],
    updated: UPDATED,
  },
];
