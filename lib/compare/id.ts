import type { Comparison } from "./types";

// Halaman perbandingan dalam bahasa Indonesia, untuk pembaca di Indonesia.
// Hanya teks biasa: tanpa tautan, HTML, atau markdown.
// Setiap pernyataan tentang alat lain didukung halaman di `sources`, yang dibaca
// pada tanggal `checked`. Harga sering berubah, jadi tidak dikutip di sini.

const CHECKED = "2026-10-12";
const UPDATED = "2026-10-12";

export const COMPARISONS_ID: Comparison[] = [
  // ─────────────────────────── Watermark KTP ───────────────────────────
  {
    slug: "cachety-vs-watermark-ktp",
    competitor: "watermark-ktp",
    competitorName: "Watermark KTP",
    competitorUrl: "https://watermarkktp.com/",
    title: "Cachety atau Watermark KTP: mana yang cocok untuk dokumen Anda?",
    metaTitle: "Watermark KTP atau Cachety: Perbandingan Jujur",
    description:
      "Watermark KTP dan Cachety sama-sama memproses file di browser tanpa upload. Bedanya ada di PDF, sensor, kata sandi, dan pola watermark. Bandingkan di sini.",
    intro:
      "Watermark KTP adalah alat buatan anak Indonesia yang sudah dikenal luas dan banyak diliput media nasional. Seperti Cachety, alat ini memproses gambar di browser Anda tanpa mengirimnya ke server. Perbedaannya ada pada fitur dan jenis dokumen yang bisa diproses.",
    verdict:
      "Untuk memberi satu watermark pada satu foto KTP dengan cepat, Watermark KTP sederhana dan sudah terbukti. Cachety lebih cocok jika Anda juga perlu memproses PDF seperti slip gaji atau rekening koran, menyensor data, menambahkan kata sandi, atau membuat salinan berbeda untuk setiap penerima.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda. Tidak ada yang di-upload.",
        other: "Di browser, di perangkat Anda, menurut halaman privasinya.",
      },
      {
        criterion: "Jenis file",
        cachety: "PDF dan gambar (JPG, PNG, HEIC, WebP, dan lainnya).",
        other: "Gambar. PDF tidak disebutkan di halamannya maupun di dokumentasi GitHub-nya.",
        edge: "cachety",
      },
      {
        criterion: "Bentuk watermark",
        cachety: "Teks diulang miring di seluruh halaman, menyatu dengan gambar.",
        other: "Satu teks di posisi pilihan (atas, tengah, bawah, sudut), bisa diputar dan digeser.",
      },
      {
        criterion: "Sensor data",
        cachety: "Ada: area yang disensor benar-benar dihapus dari file.",
        other: "Tidak ditemukan di halamannya.",
        edge: "cachety",
      },
      {
        criterion: "Kata sandi dan data tersembunyi",
        cachety: "Kata sandi AES-256 opsional; metadata dan lokasi GPS dihapus.",
        other: "Tidak ditemukan di halamannya.",
        edge: "cachety",
      },
      {
        criterion: "Satu salinan per penerima",
        cachety: "Ya, sampai 20 penerima sekaligus, masing-masing dengan kode unik.",
        other: "Tidak ditemukan di halamannya.",
        edge: "cachety",
      },
      {
        criterion: "Iklan",
        cachety: "Saat ini tanpa iklan dan tanpa pelacak.",
        other: "Situsnya menampilkan iklan dan kini menerima pemasangan iklan.",
        edge: "cachety",
      },
      {
        criterion: "Open source",
        cachety: "Ya, lisensi AGPL-3.0.",
        other: "Ya, lisensi MIT, kodenya di GitHub.",
      },
      {
        criterion: "Fitur lain",
        cachety: "Gabung PDF, batas ukuran file, pratinjau per halaman.",
        other: "Alat tanda tangan online terpisah.",
      },
    ],
    body: [
      { type: "h2", text: "Sama-sama tidak meng-upload file" },
      {
        type: "p",
        text: "Patut diakui: Watermark KTP sejak awal memproses gambar di sisi pengguna. Halaman privasinya menyatakan bahwa gambar tidak pernah dikirim keluar dari browser. Prinsip ini sama dengan Cachety, dan jauh lebih aman untuk foto KTP dibandingkan situs yang meng-upload file ke server.",
      },
      {
        type: "tip",
        text: "Tes mode pesawat berlaku untuk kedua alat: buka halamannya, matikan internet, lalu coba beri watermark. Jika tetap berjalan, file Anda tidak dikirim ke mana pun.",
      },
      { type: "h2", text: "Kapan Watermark KTP lebih praktis" },
      {
        type: "p",
        text: "Watermark KTP dibuat khusus untuk satu tugas: menaruh keterangan di foto KTP. Anda bisa menggeser teks ke posisi tertentu, memutarnya, dan mengatur transparansi dengan cepat. Untuk satu foto KTP saja, kesederhanaan itu bisa jadi kelebihan.",
      },
      { type: "h2", text: "Kapan Cachety lebih lengkap" },
      {
        type: "list",
        items: [
          "Dokumen PDF, seperti slip gaji, rekening koran, ijazah, atau KK hasil scan, bisa langsung diproses.",
          "Watermark diulang di seluruh halaman, sehingga tidak bisa dipotong dari satu sudut.",
          "NIK, nomor rekening, atau foto bisa disensor dan benar-benar dihapus.",
          "Satu salinan per pemilik kos, perusahaan, atau bank, dengan kode unik yang bisa dilacak.",
          "Kata sandi PDF dan penghapusan lokasi GPS dari foto.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di HP atau komputer.",
          "Masukkan foto KTP atau dokumen PDF Anda.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Unduh salinan ber-watermark.",
        ],
      },
    ],
    chooseOther: [
      "Anda hanya perlu satu watermark pada satu foto KTP, secepat mungkin.",
      "Anda ingin menaruh teks di posisi tertentu dan memutarnya, bukan diulang di seluruh halaman.",
      "Anda juga butuh alat tanda tangan online di situs yang sama.",
    ],
    chooseCachety: [
      "Anda perlu memberi watermark pada PDF, seperti slip gaji, rekening koran, atau KK.",
      "Anda ingin menyensor NIK atau nomor rekening sekaligus.",
      "Anda mengirim ke beberapa pihak dan ingin setiap salinan punya nama dan kode sendiri.",
      "Anda lebih suka situs tanpa iklan.",
    ],
    faq: [
      {
        q: "Apakah Watermark KTP aman?",
        a: "Menurut halaman privasinya, semua proses dilakukan di browser dan gambar tidak dikirim ke server. Itu prinsip yang sama dengan Cachety.",
      },
      {
        q: "Bisakah Watermark KTP memproses PDF?",
        a: "Halaman utama dan dokumentasinya hanya menyebut gambar. Untuk PDF, Cachety bisa memprosesnya langsung.",
      },
      {
        q: "Mana yang lebih baik untuk foto KTP?",
        a: "Keduanya tidak meng-upload file. Watermark KTP lebih sederhana untuk satu foto. Cachety menambahkan sensor, kata sandi, dan salinan per penerima, serta mengulang watermark di seluruh halaman.",
      },
    ],
    sources: [
      { label: "Watermark KTP: halaman utama dan FAQ", url: "https://watermarkktp.com/" },
      { label: "Watermark KTP: kebijakan privasi", url: "https://watermarkktp.com/privasi/" },
      { label: "Watermark KTP: kode sumber di GitHub", url: "https://github.com/sirilius/watermarkktp" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/id",
    title: "Cachety atau iLovePDF: mana yang lebih aman untuk watermark KTP?",
    metaTitle: "Alternatif iLovePDF untuk Watermark KTP dan Dokumen",
    description:
      "iLovePDF meng-upload PDF Anda ke servernya dan menghapusnya dalam dua jam. Cachety memberi watermark di perangkat Anda sendiri. Perbandingan jujur.",
    intro:
      "iLovePDF adalah salah satu situs PDF paling populer di Indonesia, dan alat tanda airnya cepat dan lengkap. Tetapi untuk memberi watermark pada KTP atau slip gaji, iLovePDF perlu menerima salinan file di servernya. Cachety melakukan hal yang sama tanpa file keluar dari HP atau komputer Anda.",
    verdict:
      "Untuk watermark berupa logo, atau untuk urusan PDF sehari-hari seperti menggabung, mengonversi, atau menandatangani, iLovePDF lebih lengkap. Untuk KTP, slip gaji, atau rekening koran, Cachety tidak mengirim file ke mana pun. Jika Anda tidak ingin menitipkan foto KTP di server siapa pun, di situlah bedanya.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda. Tidak ada yang di-upload.",
        other: "Di server iLovePDF. File di-upload lewat koneksi terenkripsi.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: "Tidak disimpan di mana pun selain di perangkat Anda.",
        other: "Dihapus dalam dua jam setelah diproses, menurut kebijakan privasinya.",
        edge: "cachety",
      },
      {
        criterion: "Harga",
        cachety: "Gratis, tanpa versi berbayar.",
        other: "Versi gratis dengan batasan. Paket Premium berbayar menghapus batasan itu.",
      },
      {
        criterion: "Iklan",
        cachety: "Saat ini tanpa iklan dan tanpa pelacak.",
        other: "Layanan bebas iklan tercantum sebagai fitur Premium.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Hanya teks, diulang miring di seluruh halaman.",
        other: "Teks atau gambar, dengan pilihan tipografi, transparansi, dan posisi.",
        edge: "other",
      },
      {
        criterion: "Sensor data",
        cachety: "Ada di layar yang sama: isi yang disensor benar-benar dihapus.",
        other: "Tersedia sebagai alat terpisah, Samarkan PDF.",
      },
      {
        criterion: "Satu salinan per penerima",
        cachety: "Ya, sampai 20 penerima sekaligus, masing-masing dengan namanya.",
        other: "Tidak ada di alat tanda air.",
        edge: "cachety",
      },
      {
        criterion: "Alat PDF lain",
        cachety: "Hanya watermark, sensor, gabung PDF, kata sandi, dan ukuran file.",
        other: "Sangat banyak: gabung, pisah, kompres, konversi, tanda tangan, dan lainnya.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Perbedaan utamanya: ke mana foto KTP Anda pergi" },
      {
        type: "p",
        text: "Saat Anda memakai situs iLovePDF, file dikirim ke servernya, diproses di sana, lalu dikembalikan kepada Anda. iLovePDF menyatakan file dihapus dalam dua jam setelah diproses. Itu kebijakan yang wajar. Tetapi selama waktu itu, salinan KTP Anda ada di komputer yang tidak Anda kendalikan. Cachety bekerja berbeda: semuanya berjalan di dalam browser Anda, dan tidak ada server yang menunggu untuk menerima file. Ini bukan janji menghapus file dengan cepat: file Anda memang tidak pernah dikirim.",
      },
      {
        type: "tip",
        text: "Buktikan sendiri: buka cachety.com, nyalakan mode pesawat, lalu beri watermark pada dokumen. Tetap berjalan, karena tidak ada yang perlu lewat internet.",
      },
      { type: "h2", text: "Kelebihan iLovePDF" },
      {
        type: "p",
        text: "iLovePDF adalah kotak perkakas PDF yang lengkap. Jika Anda perlu menggabung, mengompres, mengubah ke Word, atau menandatangani dokumen, semuanya ada, dan Cachety tidak bisa melakukan itu. Alat tanda airnya juga menerima gambar, jadi usaha bisa memasang logo. Cachety hanya memasang teks.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "File tidak keluar dari perangkat Anda, jadi tidak ada upload dan tidak ada masa simpan yang perlu dipikirkan.",
          "Watermark menyatu dengan setiap halaman, sehingga tidak bisa dihapus hanya dengan mengedit PDF.",
          "NIK, nomor rekening, atau foto bisa disensor di langkah yang sama.",
          "Satu salinan untuk setiap pemilik kos, perusahaan, atau bank, sekali proses.",
          "Data tersembunyi seperti metadata dan lokasi GPS foto dihapus dari hasil.",
        ],
      },
      { type: "h2", text: "Cara memberi watermark KTP dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com. Tidak perlu instal atau membuat akun.",
          "Masukkan foto KTP, slip gaji, atau PDF lain.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Periksa pratinjau dan unduh salinan ber-watermark.",
        ],
      },
      {
        type: "p",
        text: "Supaya adil: Cachety mengubah setiap halaman menjadi gambar, jadi teks di hasil tidak bisa diseleksi atau dicari lagi. Itu disengaja agar watermark sulit dihapus, tetapi ukuran file bisa lebih besar dari aslinya.",
      },
    ],
    chooseOther: [
      "Anda ingin memasang logo atau gambar sebagai watermark.",
      "Anda juga perlu menggabung, mengompres, mengonversi, atau menandatangani PDF di tempat yang sama.",
      "Anda ingin teks PDF tetap bisa diseleksi setelah diberi watermark.",
    ],
    chooseCachety: [
      "Anda memberi watermark pada KTP, slip gaji, atau rekening koran dan tidak ingin file itu keluar dari perangkat.",
      "Anda ingin mengirim salinan berbeda, dengan nama berbeda, ke setiap pemilik kos atau perusahaan.",
      "Anda ingin menyensor data dan menambahkan kata sandi di langkah yang sama.",
      "Anda ingin alat gratis tanpa jaringan iklan, tanpa akun, dan tanpa instalasi.",
    ],
    faq: [
      {
        q: "Apakah iLovePDF aman untuk KTP?",
        a: "iLovePDF menyatakan file dihapus dalam dua jam setelah diproses. Pertanyaannya: apakah Anda nyaman salinan KTP ada di servernya selama itu? Jika tidak, pakai alat yang bekerja di perangkat Anda, seperti Cachety.",
      },
      {
        q: "Apakah iLovePDF meng-upload file saya?",
        a: "Ya. Situsnya memproses file di server iLovePDF.",
      },
      {
        q: "Bisakah Cachety memasang logo seperti iLovePDF?",
        a: "Tidak. Cachety hanya memasang watermark teks. Untuk logo, alat tanda air iLovePDF menerima gambar.",
      },
    ],
    sources: [
      { label: "iLovePDF: kebijakan privasi", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF: harga dan paket", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: alat tanda air (Indonesia)", url: "https://www.ilovepdf.com/id/tambahkan-gambar-teks-ke-pdf" },
      { label: "iLovePDF: Samarkan PDF (Indonesia)", url: "https://www.ilovepdf.com/id/samarkan-pdf" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLoveIMG ─────────────────────────────
  {
    slug: "cachety-vs-iloveimg",
    competitor: "iloveimg",
    competitorName: "iLoveIMG",
    competitorUrl: "https://www.iloveimg.com/id",
    title: "Cachety atau iLoveIMG untuk watermark foto KTP",
    metaTitle: "Alternatif iLoveIMG untuk Watermark Foto KTP",
    description:
      "iLoveIMG meng-upload foto ke servernya untuk diberi tanda air. Cachety memberi watermark foto KTP di HP Anda sendiri, gratis. Lihat perbandingannya.",
    intro:
      "iLoveIMG, saudara iLovePDF untuk gambar, sering dipakai untuk memberi tanda air pada foto. Sama seperti iLovePDF, foto Anda di-upload ke servernya untuk diproses. Cachety memberi watermark tanpa foto keluar dari perangkat Anda.",
    verdict:
      "Untuk foto produk atau foto yang diberi logo, iLoveIMG praktis dan punya banyak pilihan font. Untuk foto KTP, KK, atau selfie verifikasi, Cachety menghindari upload sama sekali dan menambahkan sensor, kata sandi, serta salinan per penerima.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda. Tidak ada yang di-upload.",
        other: "Di server. Foto di-upload untuk diproses.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: "Tidak disimpan di mana pun selain di perangkat Anda.",
        other: "Dihapus dalam dua jam setelah diproses, menurut kebijakan privasinya.",
        edge: "cachety",
      },
      {
        criterion: "Versi gratis",
        cachety: "Gratis penuh, tanpa versi berbayar.",
        other: "Paket gratis dengan batas jumlah per tugas dan ukuran file. Premium menambah batasnya.",
        edge: "cachety",
      },
      {
        criterion: "Iklan",
        cachety: "Saat ini tanpa iklan dan tanpa pelacak.",
        other: "Layanan bebas iklan tercantum sebagai fitur paket berbayar.",
        edge: "cachety",
      },
      {
        criterion: "Jenis file",
        cachety: "PDF dan gambar, termasuk HEIC dari iPhone.",
        other: "Gambar JPG, PNG, atau GIF.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Teks diulang miring di seluruh halaman.",
        other: "Teks atau gambar, dengan banyak pilihan font, transparansi, dan posisi.",
        edge: "other",
      },
      {
        criterion: "Sensor, kata sandi, salinan per penerima",
        cachety: "Semua ada di layar yang sama.",
        other: "Tidak ada di alat tanda airnya.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Foto KTP Anda dikirim ke server" },
      {
        type: "p",
        text: "iLoveIMG dikelola oleh perusahaan yang sama dengan iLovePDF, dengan kebijakan privasi yang sama: file yang Anda kirim diproses di servernya dan dihapus dalam dua jam. Untuk foto liburan, itu tidak masalah. Untuk foto KTP atau selfie dengan KTP, artinya ada salinan identitas Anda di komputer orang lain, meskipun hanya sementara.",
      },
      {
        type: "p",
        text: "Cachety tidak punya server yang menerima file. Foto KTP Anda dibaca, diberi watermark, dan disimpan di HP Anda sendiri.",
      },
      {
        type: "tip",
        text: "Coba tes mode pesawat: buka cachety.com, matikan internet, lalu beri watermark pada foto. Jika tetap jalan, foto Anda tidak dikirim ke mana pun.",
      },
      { type: "h2", text: "Kelebihan iLoveIMG" },
      {
        type: "p",
        text: "iLoveIMG cocok untuk memasang logo di foto produk jualan online, dengan banyak pilihan font dan posisi. Situsnya juga punya alat gambar lain seperti kompres, ubah ukuran, dan potong. Cachety hanya memasang teks dan bukan editor foto.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Tanpa upload, jadi tidak ada salinan KTP di server mana pun.",
          "Watermark diulang di seluruh foto, sehingga sulit dipotong.",
          "Sensor, kata sandi, dan satu salinan per penerima di layar yang sama.",
          "Foto HEIC dari iPhone dan PDF juga bisa.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser HP.",
          "Pilih foto KTP dari galeri.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Unduh hasilnya dan kirim sebagai dokumen.",
        ],
      },
    ],
    chooseOther: [
      "Anda ingin memasang logo toko di foto produk.",
      "Anda butuh banyak pilihan font dan posisi untuk foto biasa.",
      "Anda juga perlu mengompres, memotong, atau mengubah ukuran gambar di situs yang sama.",
    ],
    chooseCachety: [
      "Anda memberi watermark pada foto KTP, KK, atau selfie verifikasi dan tidak ingin di-upload.",
      "Anda perlu menyensor data atau membuat salinan per penerima.",
      "Anda ingin alat yang sepenuhnya gratis tanpa batas jumlah tugas.",
    ],
    faq: [
      {
        q: "Apakah iLoveIMG meng-upload foto saya?",
        a: "Ya. Foto diproses di server, dan menurut kebijakan privasinya dihapus dalam dua jam setelah diproses.",
      },
      {
        q: "Apakah iLoveIMG gratis?",
        a: "Ada paket gratis dengan batas jumlah per tugas dan ukuran file. Paket berbayar menambah batas dan menghilangkan iklan.",
      },
      {
        q: "Bisakah Cachety memasang logo di foto?",
        a: "Tidak. Cachety hanya memasang watermark teks. Untuk logo, iLoveIMG lebih cocok.",
      },
    ],
    sources: [
      { label: "iLoveIMG: alat tanda air (Indonesia)", url: "https://www.iloveimg.com/id/tanda-air-untuk-gambar" },
      { label: "iLoveIMG: kebijakan privasi", url: "https://www.iloveimg.com/help/privacy" },
      { label: "iLoveIMG: harga dan paket", url: "https://www.iloveimg.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/id",
    title: "Cachety atau Smallpdf untuk memberi watermark dokumen",
    metaTitle: "Alternatif Tanda Air PDF Smallpdf: Cachety",
    description:
      "Smallpdf meng-upload PDF Anda ke servernya untuk diberi tanda air. Cachety melakukannya di perangkat Anda, gratis dan tanpa akun. Bandingkan keduanya.",
    intro:
      "Smallpdf adalah situs PDF yang rapi dan populer, dengan alat Tanda Air PDF yang mudah dipakai. FAQ-nya sendiri menjelaskan bahwa file di-upload dan dihapus dari servernya setelah satu jam. Cachety menyimpan file di perangkat Anda dari awal sampai akhir.",
    verdict:
      "Smallpdf adalah layanan PDF serba bisa yang bagus untuk dokumen sehari-hari. Untuk KTP, paspor, atau slip gaji, Cachety menghindari upload sama sekali dan menambahkan fitur yang dibuat untuk dokumen identitas, seperti sensor dan satu salinan per penerima.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda. Tidak ada yang di-upload.",
        other: "Di server Smallpdf, memakai penyedia hosting di Uni Eropa.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: "Tidak disimpan di mana pun selain di perangkat Anda.",
        other: "Dihapus otomatis setelah satu jam, kecuali Anda menyimpannya di akun.",
        edge: "cachety",
      },
      {
        criterion: "Pemakaian gratis",
        cachety: "Gratis, tanpa versi berbayar.",
        other: "Gratis dengan beberapa batasan. Paket Pro menghapusnya.",
        edge: "cachety",
      },
      {
        criterion: "Pelacak analitik dan iklan",
        cachety: "Tidak ada.",
        other: "Kebijakan privasinya menyebut alat seperti Hotjar dan Google Ads, dengan persetujuan.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Teks, diulang miring di seluruh halaman.",
        other: "Teks, dengan pilihan font, ukuran, warna, dan opasitas.",
      },
      {
        criterion: "Sensor dan kata sandi",
        cachety: "Sensor dan kata sandi opsional ada di layar yang sama.",
        other: "Kata sandi tersedia sebagai alat terpisah, Lindungi PDF.",
      },
      {
        criterion: "Satu salinan per penerima",
        cachety: "Ya, sampai 20 salinan bernama sekaligus.",
        other: "Tidak ada di alat tanda air.",
        edge: "cachety",
      },
      {
        criterion: "Aplikasi dan alat lain",
        cachety: "Hanya web, bisa di HP. Hanya watermark dan fitur terkait.",
        other: "Lebih dari 30 alat PDF di paket Pro.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Ada proses upload, meski terasa seperti di browser" },
      {
        type: "p",
        text: "Halaman Tanda Air PDF Smallpdf memang dipakai lewat browser. Tetapi FAQ di halaman yang sama menjelaskan bahwa semua upload dan unduhan dilindungi enkripsi TLS, dan file dihapus otomatis setelah satu jam. Kebijakan privasinya menambahkan bahwa file yang di-upload disimpan sementara di server penyedia hosting di Uni Eropa.",
      },
      {
        type: "p",
        text: "Dengan Cachety, tampilan dan prosesnya sama-sama terjadi di perangkat Anda. Dokumen Anda tidak dikirim ke server mana pun, termasuk server kami, karena memang tidak ada server yang menerima file.",
      },
      {
        type: "tip",
        text: "Coba tes mode pesawat: buka cachety.com, matikan internet di HP atau laptop, lalu beri watermark pada dokumen. Jika bisa tanpa internet, file Anda tidak mungkin terkirim.",
      },
      { type: "h2", text: "Kelebihan Smallpdf" },
      {
        type: "p",
        text: "Smallpdf punya banyak alat, dari kompres dan konversi sampai tanda tangan elektronik. Jika Anda bekerja dengan PDF setiap hari, pilihan selengkap itu praktis. Cachety hanya melakukan satu hal: melindungi dokumen yang Anda bagikan. Cachety tidak bisa mengedit teks, menandatangani, atau mengonversi file.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Tanpa upload, jadi tidak ada masa simpan dan tidak ada pihak hosting yang terlibat.",
          "Tidak ada pelacak analitik atau iklan di halamannya.",
          "Watermark digambar di setiap halaman dan diulang, sehingga sulit dipotong.",
          "Sensor, kata sandi, dan satu salinan per penerima di layar yang sama.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com di browser mana pun, di HP atau komputer.",
          "Masukkan dokumen Anda. Bisa beberapa sekaligus.",
          "Ketik keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Jika perlu, tekan \"Sensor sesuatu\" di bawah pratinjau atau centang \"Kunci dengan kata sandi\".",
          "Unduh salinan ber-watermark dan kirim itu, bukan aslinya.",
        ],
      },
    ],
    chooseOther: [
      "Anda butuh banyak alat PDF di satu tempat, seperti kompres, konversi, dan tanda tangan elektronik.",
      "Anda ingin teks PDF tetap bisa diseleksi setelah diberi watermark.",
    ],
    chooseCachety: [
      "Anda membagikan KTP, slip gaji, atau rekening koran dan tidak ingin di-upload ke mana pun.",
      "Anda lebih suka halaman tanpa pelacak analitik atau iklan.",
      "Anda perlu satu salinan bernama per penerima, atau ingin menyensor data sekaligus.",
    ],
    faq: [
      {
        q: "Apakah Smallpdf meng-upload file saya?",
        a: "Ya. FAQ Smallpdf menyebut file dienkripsi saat di-upload dan dihapus otomatis setelah satu jam, kecuali Anda menyimpannya di akun.",
      },
      {
        q: "Apakah alat tanda air Smallpdf gratis?",
        a: "Bisa dipakai gratis, tetapi Smallpdf menyebut ada batasan untuk pengguna gratis. Cachety gratis tanpa akun dan tanpa versi berbayar.",
      },
      {
        q: "Apakah teks di hasil Cachety masih bisa diseleksi?",
        a: "Tidak. Setiap halaman menjadi gambar dengan watermark di dalamnya, sehingga watermark jauh lebih sulit dihapus. Jika Anda butuh teks yang bisa dicari, itu alasan untuk memakai alat lain.",
      },
    ],
    sources: [
      { label: "Smallpdf: Tanda Air PDF dan FAQ (Indonesia)", url: "https://smallpdf.com/id/tanda-air-pdf" },
      { label: "Smallpdf: kebijakan privasi", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: harga", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/id/",
    title: "Cachety atau PDF24: memberi tanda air pada dokumen secara online",
    metaTitle: "Alternatif Tanda Air PDF24 Tanpa Upload",
    description:
      "PDF24 memasang tanda air di servernya di Jerman dan menghapus file setelah satu jam. Cachety melakukannya di perangkat Anda. Bandingkan keduanya.",
    intro:
      "PDF24 adalah kumpulan alat PDF gratis tanpa batas dan tanpa pendaftaran dari perusahaan Jerman. Alat tanda air online-nya berjalan di server PDF24 di Jerman. Cachety juga gratis, tetapi file Anda tidak pernah keluar dari perangkat.",
    verdict:
      "PDF24 adalah kotak perkakas gratis yang murah hati, dan aplikasi Windows-nya, PDF24 Creator, memproses file di PC Anda. Untuk watermark cepat pada KTP dari HP, Cachety menghindari upload dan tidak memakai jaringan iklan atau pelacak iklan.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda.",
        other: "Di server PDF24 di Jerman untuk alat online. PDF24 Creator untuk Windows bekerja di PC Anda.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: "Tidak disimpan di mana pun selain di perangkat Anda.",
        other: "Dihapus otomatis dari server setelah satu jam.",
        edge: "cachety",
      },
      {
        criterion: "Harga dan batasan",
        cachety: "Gratis, tanpa akun.",
        other: "Gratis, tanpa batasan, tanpa pendaftaran.",
      },
      {
        criterion: "Iklan dan pelacak",
        cachety: "Saat ini tanpa iklan dan tanpa pelacak.",
        other: "Gratis berkat iklan. Kebijakan privasinya menyebut Google AdSense, Google Analytics, dan remarketing Google.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Teks diulang miring di seluruh halaman, dengan efek gelombang opsional.",
        other: "Teks, dengan sepuluh posisi atau memenuhi halaman, plus sudut dan jarak.",
      },
      {
        criterion: "Kata sandi",
        cachety: "Ada di layar yang sama dengan watermark.",
        other: "Tersedia sebagai alat terpisah, Lindungi PDF.",
      },
      {
        criterion: "Satu salinan per penerima",
        cachety: "Ya, sampai 20 salinan bernama sekaligus.",
        other: "Tidak ada di alat tanda air.",
        edge: "cachety",
      },
      {
        criterion: "Alat PDF lain",
        cachety: "Hanya watermark, sensor, gabung PDF, kata sandi, dan ukuran file.",
        other: "Puluhan alat gratis, plus aplikasi desktop gratis untuk Windows.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Apa yang terjadi pada file Anda di PDF24 online" },
      {
        type: "p",
        text: "PDF24 terbuka soal ini: file ditransfer dengan aman lewat SSL, server berlokasi di Jerman, dan file dihapus otomatis setelah satu jam. Itu kebijakan yang jelas dan wajar. Tetapi tetap saja, salinan KTP atau slip gaji Anda dikirim lewat internet dan disimpan sampai satu jam di komputer yang tidak Anda kendalikan.",
      },
      {
        type: "p",
        text: "Cachety memakai cara lain. Halaman dimuat sekali, lalu semuanya terjadi di dalam browser Anda. Dokumen tidak pernah dikirim ke mana pun, jadi tidak ada yang perlu dihapus sesudahnya.",
      },
      {
        type: "tip",
        text: "Mau bukti? Buka cachety.com, nyalakan mode pesawat, lalu beri watermark pada file. Tetap berjalan karena tidak butuh internet.",
      },
      { type: "h2", text: "Kelebihan PDF24" },
      {
        type: "p",
        text: "PDF24 punya puluhan alat gratis tanpa batas, dari kompres sampai konversi. Di Windows, PDF24 Creator mengerjakan semuanya di PC Anda sendiri, yang juga pilihan bagus untuk privasi. Cachety tidak bisa mengonversi atau mengedit PDF, dan tidak punya aplikasi desktop.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Bekerja di perangkat Anda di sistem apa pun, termasuk Android dan iPhone, tanpa instalasi.",
          "Tanpa jaringan iklan dan tanpa pelacak iklan di halamannya.",
          "Watermark, sensor, kata sandi, dan penghapusan data tersembunyi dalam satu langkah.",
          "Satu salinan bernama per penerima, praktis saat survei beberapa kos sekaligus.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com.",
          "Masukkan PDF atau foto Anda.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Unduh salinan ber-watermark.",
        ],
      },
    ],
    chooseOther: [
      "Anda memakai Windows dan ingin aplikasi desktop gratis yang memproses file di PC.",
      "Anda butuh banyak alat PDF gratis lainnya, seperti konversi atau kompres.",
      "Anda ingin teks PDF tetap bisa diseleksi setelah diberi tanda air.",
    ],
    chooseCachety: [
      "Anda ingin memberi watermark pada KTP dari HP tanpa meng-upload-nya.",
      "Anda lebih suka halaman tanpa jaringan iklan atau pelacak iklan.",
      "Anda perlu sensor, kata sandi, dan satu salinan per penerima dalam satu alat.",
    ],
    faq: [
      {
        q: "Apakah PDF24 meng-upload file saya?",
        a: "Ya, untuk alat online-nya. PDF24 menyebut servernya berlokasi di Jerman dan file dihapus otomatis setelah satu jam. Aplikasi Windows-nya, PDF24 Creator, memproses file di PC Anda.",
      },
      {
        q: "Apakah PDF24 benar-benar gratis?",
        a: "Ya. PDF24 menyebut alatnya gratis tanpa batasan, dibiayai iklan. Cachety juga gratis, dan saat ini tanpa iklan maupun pelacak.",
      },
      {
        q: "Amankah memakai PDF24 untuk KTP?",
        a: "PDF24 adalah perusahaan Eropa dengan kebijakan penghapusan yang jelas. Cukup atau tidak, itu keputusan Anda. Jika ingin KTP tidak pernah keluar dari perangkat, alat yang bekerja di browser seperti Cachety menghindari pertanyaan itu.",
      },
    ],
    sources: [
      { label: "PDF24: tambahkan tanda air (Indonesia)", url: "https://tools.pdf24.org/id/tambahkan-watermark" },
      { label: "PDF24: semua alat (Indonesia)", url: "https://tools.pdf24.org/id/" },
      { label: "PDF24: kebijakan privasi", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Canva ─────────────────────────────
  {
    slug: "cachety-vs-canva",
    competitor: "canva",
    competitorName: "Canva",
    competitorUrl: "https://www.canva.com/",
    title: "Cachety atau Canva untuk watermark KTP",
    metaTitle: "Watermark KTP di Canva atau Cachety?",
    description:
      "Canva bisa memberi watermark, tetapi file Anda di-upload ke akun Canva. Cachety memberi watermark KTP di perangkat Anda, gratis. Mana yang cocok?",
    intro:
      "Canva sangat populer di Indonesia untuk desain, dan dengan aplikasi Watermark Maker Anda bisa menambahkan watermark teks atau logo ke PDF. Untuk itu, dokumen Anda di-upload ke Canva. Cachety dibuat untuk satu hal: melindungi dokumen yang Anda bagikan, tanpa meng-upload-nya.",
    verdict:
      "Untuk konten bermerek, seperti foto produk, materi promosi, atau apa pun yang memakai logo, Canva jauh lebih kreatif. Untuk KTP, slip gaji, atau rekening koran, Cachety tidak menaruh salinan identitas Anda di akun desain online, dan menambahkan sensor serta salinan per penerima.",
    table: [
      {
        criterion: "Ke mana file pergi",
        cachety: "Tidak ke mana-mana. Diproses di browser, di perangkat Anda.",
        other: "Di-upload ke Canva, platform desain berbasis cloud.",
        edge: "cachety",
      },
      {
        criterion: "Berapa lama file disimpan",
        cachety: "Tidak disimpan di mana pun selain di perangkat Anda.",
        other: "Kebijakan privasinya menyebut konten disimpan selama waktu yang wajar secara komersial dan selama ada tujuan yang sah.",
        edge: "cachety",
      },
      {
        criterion: "Akun",
        cachety: "Tidak perlu.",
        other: "Perlu mendaftar akun Canva.",
        edge: "cachety",
      },
      {
        criterion: "Pemakaian konten untuk AI",
        cachety: "Tidak ada: file Anda tidak pernah diterima.",
        other: "Pemakaian data untuk melatih AI bisa diatur di pengaturan privasi.",
        edge: "cachety",
      },
      {
        criterion: "Iklan",
        cachety: "Saat ini tanpa iklan dan tanpa pelacak.",
        other: "Kebijakan privasinya menyebut mitra iklan seperti Facebook, Google, LiveRamp, Outbrain, dan Taboola.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Hanya teks, diulang miring di seluruh halaman.",
        other: "Teks atau logo, dengan pilihan opasitas dan tata letak, lewat aplikasi Watermark Maker.",
        edge: "other",
      },
      {
        criterion: "Sensor data",
        cachety: "Ada: isi yang disensor benar-benar dihapus.",
        other: "Tidak ditemukan alat sensor khusus.",
        edge: "cachety",
      },
      {
        criterion: "Fitur desain",
        cachety: "Tidak ada selain watermark.",
        other: "Platform desain lengkap dengan templat, gambar, dan font.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "KTP Anda di dalam akun desain" },
      {
        type: "p",
        text: "Untuk memberi watermark di Canva, Anda meng-upload dokumen, membuka aplikasi Watermark Maker, menambahkan teks atau logo, lalu mengunduh hasilnya. Hasilnya bagus. Tetapi KTP Anda kemudian tersimpan di akun Canva, di bawah kebijakan privasi Canva, yang menyebut konten disimpan selama ada tujuan yang sah, dan memungkinkan data dipakai untuk melatih AI kecuali Anda mengaturnya di pengaturan privasi.",
      },
      {
        type: "p",
        text: "Cachety tidak pernah menerima dokumen Anda. Watermark dipasang di dalam browser, dan hasilnya langsung tersimpan di perangkat Anda.",
      },
      {
        type: "tip",
        text: "Coba di mode pesawat: buka cachety.com, matikan internet, lalu beri watermark pada dokumen. Tetap berjalan, tanda bahwa tidak ada yang dikirim.",
      },
      { type: "h2", text: "Kelebihan Canva" },
      {
        type: "p",
        text: "Canva dibuat untuk desain. Jika Anda ingin logo di foto produk, tata letak bermerek, atau konten media sosial yang seragam, Canva jauh lebih mampu. Cachety hanya memasang teks dan bukan alat desain.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Tanpa upload dan tanpa akun, jadi tidak ada salinan KTP yang tersimpan online.",
          "Sensor, kata sandi, dan penghapusan data tersembunyi sudah tersedia.",
          "Watermark menyatu dengan gambar halaman, sehingga tidak bisa dihapus hanya dengan mengedit PDF.",
          "Satu salinan bernama per penerima, sampai 20 sekaligus.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com.",
          "Masukkan foto KTP, slip gaji, atau rekening koran.",
          "Tulis keperluannya atau pilih salah satu contoh, lalu isi penerimanya. Tanggal ditambahkan otomatis.",
          "Unduh salinan ber-watermark.",
        ],
      },
    ],
    chooseOther: [
      "Anda ingin watermark berupa logo atau gambar, misalnya di foto produk jualan.",
      "Anda sedang mendesain materi bermerek dan watermark hanya salah satu bagiannya.",
      "Anda sudah menyimpan semua pekerjaan di Canva dan ingin semuanya di satu tempat.",
    ],
    chooseCachety: [
      "Anda memberi watermark pada KTP, slip gaji, atau rekening koran dan tidak ingin tersimpan online.",
      "Anda tidak ingin membuat akun hanya untuk memasang watermark.",
      "Anda perlu menyensor data atau menambahkan kata sandi.",
    ],
    faq: [
      {
        q: "Bisakah memberi watermark PDF di Canva?",
        a: "Bisa. Upload PDF ke Canva, pakai aplikasi Watermark Maker untuk menambahkan teks atau logo, lalu unduh lagi.",
      },
      {
        q: "Amankah meng-upload KTP ke Canva?",
        a: "Canva menyatakan punya sertifikasi keamanan. Tetap saja, KTP Anda akan tersimpan di akun, di bawah kebijakan privasi Canva. Alat yang bekerja di perangkat Anda, seperti Cachety, sama sekali tidak menyimpannya online.",
      },
      {
        q: "Apakah Canva memakai file saya untuk melatih AI?",
        a: "Kebijakan privasi Canva menyebut Anda bisa mengatur pemakaian data untuk melatih AI di halaman pengaturan privasi.",
      },
    ],
    sources: [
      { label: "Canva: kebijakan privasi", url: "https://www.canva.com/policies/privacy-policy/" },
      { label: "Canva: menambahkan watermark ke PDF", url: "https://www.canva.com/features/add-watermark-to-pdf/" },
      { label: "Canva: aplikasi Watermark Maker", url: "https://www.canva.com/apps/AAGa702Tp2E/watermark-maker" },
      { label: "Canva Trust Center", url: "https://trust.canva.com/" },
    ],
    checked: "2026-10-11",
    updated: UPDATED,
  },

  // ─────────────────────────── Watermarkly ───────────────────────────
  {
    slug: "cachety-vs-watermarkly",
    competitor: "watermarkly",
    competitorName: "Watermarkly",
    competitorUrl: "https://watermarkly.com/",
    title: "Cachety atau Watermarkly: dua alat watermark yang tidak meng-upload file",
    metaTitle: "Watermarkly atau Cachety: Pilih Alat Watermark",
    description:
      "Watermarkly dan Cachety sama-sama memproses file di browser. Watermarkly punya logo dan aplikasi; Cachety menambah sensor dan kata sandi. Bandingkan.",
    intro:
      "Watermarkly dan Cachety punya satu kesamaan penting: keduanya menyatakan file diproses di perangkat Anda dan tidak dikirim ke server. Perbedaannya ada pada fitur, harga, dan untuk apa masing-masing dibuat.",
    verdict:
      "Watermarkly lebih cocok untuk fotografer dan usaha yang butuh watermark logo, banyak pilihan gaya, atau aplikasi. Cachety ditujukan untuk KTP dan dokumen pribadi: gratis tanpa logo tambahan, open source, dan menambahkan sensor, kata sandi, serta satu salinan per penerima.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda.",
        other: "Di browser, di perangkat Anda, menurut kebijakan privasinya.",
      },
      {
        criterion: "Versi gratis",
        cachety: "Gratis tanpa versi berbayar dan tanpa logo tambahan.",
        other: "Versi gratis menambahkan logo kecil Watermarkly di bawah halaman PDF.",
        edge: "cachety",
      },
      {
        criterion: "Analitik",
        cachety: "Tanpa statistik pengunjung.",
        other: "Memakai Google Analytics untuk mengukur pengunjung, menurut kebijakan privasinya.",
        edge: "cachety",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Teks diulang miring, dengan 3 font dan efek gelombang.",
        other: "Teks atau logo, dengan banyak font dan efek.",
        edge: "other",
      },
      {
        criterion: "Sensor data",
        cachety: "Ada: isi yang disensor benar-benar dihapus.",
        other: "Tidak ditemukan di halaman alat PDF-nya.",
        edge: "cachety",
      },
      {
        criterion: "Satu salinan per penerima",
        cachety: "Ya, sampai 20 salinan bernama, masing-masing dengan kode unik.",
        other: "Tidak dijelaskan.",
        edge: "cachety",
      },
      {
        criterion: "Aplikasi",
        cachety: "Hanya web; bisa ditambahkan ke layar utama.",
        other: "Web, plus aplikasi iOS dan Android.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Keduanya menyimpan file di perangkat Anda" },
      {
        type: "p",
        text: "Berbeda dengan kebanyakan alat PDF online, Watermarkly menyatakan memproses file langsung di browser dan tidak mengirimnya ke servernya. Prinsipnya sama dengan Cachety, dan itu keunggulan privasi yang nyata dibanding situs yang meng-upload file.",
      },
      {
        type: "p",
        text: "Satu perbedaan adalah seberapa mudah Anda memeriksanya. Kode Cachety terbuka, dan halamannya diatur agar browser tidak boleh mengirim data ke situs lain. Siapa pun bisa membaca kodenya, dan siapa pun bisa mencoba tes mode pesawat.",
      },
      {
        type: "tip",
        text: "Tes mode pesawat berlaku untuk alat apa pun yang mengaku bekerja lokal: buka halamannya, matikan internet, lalu coba. Jika tetap berjalan, file Anda tidak di-upload.",
      },
      { type: "h2", text: "Kelebihan Watermarkly" },
      {
        type: "p",
        text: "Watermarkly dibuat untuk fotografer dan usaha. Alat ini mendukung logo, punya banyak font dan efek, dan tersedia sebagai aplikasi HP. Jika watermark Anda soal merek, Watermarkly lebih kuat.",
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Gratis tanpa logo tambahan di halaman Anda.",
          "Sensor untuk menyembunyikan NIK atau nomor rekening, dengan isi yang benar-benar dihapus.",
          "Kata sandi opsional, dan penghapusan metadata serta lokasi GPS.",
          "Satu salinan bernama per penerima, masing-masing dengan kode unik yang bisa dilacak.",
          "Tanpa statistik pengunjung, dan kodenya terbuka.",
        ],
      },
      { type: "h2", text: "Cara melakukannya dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com.",
          "Masukkan foto KTP atau slip gaji.",
          "Tulis keperluan dan penerimanya. Tanggal ditambahkan otomatis.",
          "Jika perlu, tekan \"Sensor sesuatu\" atau centang \"Kunci dengan kata sandi\", lalu unduh.",
        ],
      },
    ],
    chooseOther: [
      "Anda ingin watermark berupa logo atau gambar, misalnya di foto.",
      "Anda butuh banyak pilihan gaya, seperti efek dan font.",
      "Anda lebih suka aplikasi HP daripada situs web.",
    ],
    chooseCachety: [
      "Anda ingin watermark gratis tanpa logo tambahan di dokumen.",
      "Anda perlu sensor, kata sandi, atau satu salinan per penerima untuk dokumen identitas.",
      "Anda lebih suka perangkat lunak open source dan halaman tanpa statistik pengunjung.",
    ],
    faq: [
      {
        q: "Apakah Watermarkly meng-upload file saya?",
        a: "Menurut kebijakan privasi dan halaman PDF-nya, tidak: Watermarkly memproses file di perangkat Anda dan tidak mengirimnya ke servernya.",
      },
      {
        q: "Apakah Watermarkly gratis?",
        a: "Ada versi gratis. Untuk PDF, Watermarkly menyebut versi gratis menambahkan logo kecil Watermarkly di bawah halaman.",
      },
      {
        q: "Mana yang lebih baik untuk KTP, Watermarkly atau Cachety?",
        a: "Keduanya menyimpan file di perangkat Anda. Cachety menambahkan sensor, kata sandi, dan salinan per penerima, tanpa logo tambahan. Watermarkly lebih baik jika Anda butuh logo.",
      },
    ],
    sources: [
      { label: "Watermarkly: kebijakan privasi", url: "https://watermarkly.com/privacy/" },
      { label: "Watermarkly: alat watermark PDF", url: "https://watermarkly.com/watermark-pdf/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Proton ─────────────────────────────
  {
    slug: "cachety-vs-proton-watermark",
    competitor: "proton",
    competitorName: "Proton",
    competitorUrl: "https://proton.me/drive/watermark-pdf",
    title: "Cachety atau alat watermark Proton: dua pilihan yang menjaga privasi, dibandingkan",
    metaTitle: "Cachety atau Watermark Proton: Perbandingan Adil",
    description:
      "Proton dan Cachety sama-sama memberi watermark di browser, tanpa meng-upload file. Bedanya: data tersembunyi, penghapusan watermark, sensor, dan salinan.",
    intro:
      "Proton, perusahaan Swiss di balik Proton Mail dan Proton Drive, menyediakan alat watermark gratis untuk PDF dan gambar. Seperti Cachety, alat ini berjalan di browser Anda dan file Anda tidak di-upload. Jadi pertanyaannya bukan kepada siapa Anda memercayakan file: keduanya menyimpannya di perangkat Anda. Perbedaannya ada pada apa yang dilakukan masing-masing alat terhadap dokumen.",
    verdict:
      "Keduanya pilihan yang baik dan menjaga privasi, dan mana pun jauh lebih baik daripada mengirim salinan KTP tanpa watermark. Proton lebih baik untuk watermark berupa logo, untuk menjaga teks PDF tetap bisa diseleksi, dan untuk memberi watermark pada banyak foto sekaligus dalam format aslinya. Cachety dibuat untuk dokumen identitas: menghapus data tersembunyi, menyatukan watermark dengan setiap halaman sehingga tidak bisa dihapus hanya dengan mengedit, memungkinkan sensor data, dan membuat satu salinan bernama per penerima.",
    table: [
      {
        criterion: "Di mana file diproses",
        cachety: "Di browser, di perangkat Anda sendiri. Tidak ada yang di-upload.",
        other: "Di browser, di perangkat Anda sendiri. Proton menyatakan file tidak di-upload, tidak disimpan, dan tidak dipertahankan.",
      },
      {
        criterion: "Harga dan akun",
        cachety: "Gratis, tanpa akun.",
        other: "Gratis, tanpa akun.",
      },
      {
        criterion: "Jenis watermark",
        cachety: "Hanya teks, diulang miring di seluruh halaman.",
        other: "Teks atau gambar (logo), dalam pola berulang, dengan pilihan font, warna, ukuran, transparansi, jarak, dan sudut.",
        edge: "other",
      },
      {
        criterion: "Cara watermark ditambahkan ke PDF",
        cachety: "Menyatu dengan gambar setiap halaman, yang dibangun ulang dari piksel.",
        other: "Dalam pengujian kami, ditambahkan sebagai teks terpisah yang digambar di atas halaman asli, yang dibiarkan seperti semula.",
      },
      {
        criterion: "Bisakah watermark dihapus dengan mengedit PDF?",
        cachety: "Tidak dengan cara sederhana: watermark menjadi bagian dari gambar halaman.",
        other: "Karena berupa teks terpisah, pada prinsipnya bisa dihapus dengan editor PDF.",
        edge: "cachety",
      },
      {
        criterion: "Data tersembunyi (metadata, lapisan teks, lokasi foto)",
        cachety: "Dihapus dari hasil.",
        other: "Tetap ada. Proton menyebut pemberian watermark tidak menghapus metadata dan menyarankan membersihkan file secara terpisah.",
        edge: "cachety",
      },
      {
        criterion: "Teks yang bisa diseleksi dan dicari",
        cachety: "Tidak: halaman sengaja diubah menjadi gambar.",
        other: "Ya: teks asli tetap bisa diseleksi.",
        edge: "other",
      },
      {
        criterion: "Sensor data (nomor rekening, foto…)",
        cachety: "Tersedia: gambar kotak, dan isi yang disensor benar-benar dihapus.",
        other: "Tidak tersedia di alat watermark-nya.",
        edge: "cachety",
      },
      {
        criterion: "Satu salinan per penerima, kode unik per salinan",
        cachety: "Ya: sampai 20 penerima, setiap salinan dengan nama penerimanya, dan kode opsional.",
        other: "Tidak tersedia.",
        edge: "cachety",
      },
      {
        criterion: "Kata sandi pada file yang diunduh",
        cachety: "Ya, enkripsi AES-256.",
        other: "Tidak ada di alat watermark-nya. Proton Drive menyediakan tautan berbagi yang dilindungi kata sandi.",
        edge: "cachety",
      },
      {
        criterion: "Foto",
        cachety: "JPG, PNG, WebP, HEIC (iPhone), dan lainnya.",
        other: "Menyebut JPG, PNG, dan WebP, pemrosesan banyak foto sekaligus, disimpan dalam format aslinya.",
      },
      {
        criterion: "Analitik di halaman",
        cachety: "Tidak ada.",
        other: "Statistik penggunaan (tampilan halaman, klik) dalam pengujian kami, tanpa isi dokumen. Proton menyebut analitiknya di-host sendiri dan dianonimkan.",
        edge: "cachety",
      },
      {
        criterion: "Kode sumber",
        cachety: "Terbuka (AGPL), siapa pun bisa memeriksanya.",
        other: "Kami tidak menemukan kode sumber publik untuk alat ini.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Yang sudah tepat dari kedua alat" },
      {
        type: "p",
        text: "Kebanyakan situs watermark online meng-upload dokumen Anda ke server mereka. Alat Proton dan Cachety tidak: prosesnya terjadi di browser Anda, dan file tetap di HP atau komputer Anda. Dalam pengujian kami terhadap alat PDF Proton, dokumen tidak pernah dikirim ke mana pun. Proton juga menyatakan tidak mencatat, melacak, atau menganalisis konten Anda. Untuk paspor atau slip gaji, kedua alat ini pilihan yang aman.",
      },
      { type: "h2", text: "Cara kami membandingkan" },
      {
        type: "p",
        text: "Pada 12 Oktober 2026, kami membaca halaman publik Proton dan menjalankan alat watermark PDF-nya di Chrome dengan file uji yang berisi teks yang bisa diseleksi serta judul dan nama penulis di metadatanya. Lalu kami memeriksa PDF yang diunduh. Semua yang dikatakan di sini tentang Proton berasal dari halaman tersebut atau dari pengujian itu.",
      },
      { type: "h2", text: "Perbedaannya: apa yang terjadi pada dokumen" },
      {
        type: "p",
        text: "Dalam pengujian kami, alat Proton membiarkan halaman asli utuh dan menggambar watermark di atasnya sebagai teks. Hasilnya ringan dan teksnya tetap bisa diseleksi, yang berguna untuk kontrak atau laporan. Tetapi judul dan nama penulis asli masih ada di file, seperti yang diperingatkan Proton sendiri, dan watermark yang berupa teks terpisah pada prinsipnya bisa dihapus dengan editor PDF. Cachety memakai pendekatan sebaliknya, yang dirancang untuk dokumen identitas: setiap halaman dibangun ulang dari piksel dengan watermark yang menyatu, dan lapisan teks, metadata, serta lokasi foto dibuang. File menjadi lebih besar dan teksnya tidak bisa diseleksi, tetapi tidak ada lagi yang tersembunyi di dalamnya dan watermark tidak bisa dihapus begitu saja.",
      },
      { type: "h2", text: "Kelebihan Proton" },
      {
        type: "list",
        items: [
          "Logo atau gambar sebagai watermark, dengan pengaturan sudut dan jarak yang detail.",
          "PDF yang teksnya harus tetap bisa diseleksi dan dicari.",
          "Banyak foto sekaligus yang disimpan dalam format aslinya.",
          "Jika Anda sudah memakai Proton Drive, berbagi hasilnya lewat tautan yang dilindungi kata sandi.",
        ],
      },
      { type: "h2", text: "Kelebihan Cachety untuk dokumen identitas" },
      {
        type: "list",
        items: [
          "Data tersembunyi (metadata, lapisan teks, lokasi GPS foto) dihapus.",
          "Watermark menyatu dengan halaman, sehingga tidak bisa dihapus hanya dengan mengedit.",
          "Anda bisa menyensor data seperti nomor rekening sebelum mengirim.",
          "Satu salinan per penerima, masing-masing dengan namanya, dan kode unik opsional untuk melacak kebocoran.",
          "Kata sandi pada file yang diunduh, berupa 12 kata yang mudah dibaca.",
          "Foto iPhone (HEIC), 11 bahasa, dan kode yang bisa diperiksa siapa pun.",
        ],
      },
      { type: "h2", text: "Cara memberi watermark KTP dengan Cachety" },
      {
        type: "steps",
        items: [
          "Buka cachety.com. Tidak perlu instal apa pun atau membuat akun.",
          "Masukkan KTP, SIM, paspor, atau slip gaji Anda. PDF dan foto, termasuk foto iPhone, sama-sama bisa.",
          "Tulis keperluan salinan (ketik sendiri atau pilih contoh), lalu siapa penerimanya. Tanggal ditambahkan otomatis.",
          "Periksa pratinjau dan unduh salinan ber-watermark.",
        ],
      },
    ],
    chooseOther: [
      "Anda ingin watermark berupa logo atau gambar.",
      "Teks PDF harus tetap bisa diseleksi dan dicari.",
      "Anda memberi watermark pada banyak foto sekaligus dan ingin tetap dalam format aslinya.",
      "Anda sudah memakai Proton Drive dan ingin berbagi hasilnya lewat layanan itu.",
    ],
    chooseCachety: [
      "Anda mengirim KTP, slip gaji, atau rekening koran dan tidak ingin ada data tersembunyi tersisa di file.",
      "Anda ingin watermark yang tidak bisa dihapus hanya dengan mengedit PDF.",
      "Anda perlu menyensor data, atau mengirim salinan bernama ke setiap penerima.",
      "Anda ingin kata sandi pada file, atau kode yang bisa Anda periksa sendiri.",
    ],
    faq: [
      {
        q: "Apakah alat watermark Proton meng-upload file saya?",
        a: "Tidak. Proton menyatakan alatnya memproses file secara lokal di browser Anda, dan dalam pengujian kami terhadap alat PDF-nya, dokumen tidak dikirim ke mana pun. Halamannya memang mengirim statistik penggunaan seperti tampilan halaman dan klik, yang dalam pengujian kami tidak berisi isi dokumen.",
      },
      {
        q: "Mana yang lebih menjaga privasi, Proton atau Cachety?",
        a: "Keduanya menyimpan file di perangkat Anda. Perbedaannya ada pada hasilnya: Cachety menghapus data tersembunyi seperti metadata dan lokasi foto, sedangkan alat Proton tetap menyimpannya, seperti yang disebutkan Proton.",
      },
      {
        q: "Bisakah watermark Proton dihapus?",
        a: "Dalam pengujian kami, watermark ditambahkan ke PDF sebagai teks terpisah di atas halaman asli. Watermark seperti itu pada prinsipnya bisa dihapus dengan editor PDF. Cachety justru menyatukannya dengan gambar setiap halaman.",
      },
      {
        q: "Bisakah Cachety menambahkan watermark berupa logo?",
        a: "Tidak. Cachety hanya menambahkan watermark teks. Untuk logo, alat Proton menerima gambar.",
      },
    ],
    sources: [
      { label: "Proton: watermark file PDF gratis", url: "https://proton.me/drive/watermark-pdf" },
      { label: "Proton: pembuat watermark gambar gratis", url: "https://proton.me/drive/image-watermark" },
      { label: "Proton: kebijakan privasi (analitik situs web)", url: "https://proton.me/legal/privacy" },
    ],
    checked: "2026-10-12",
    updated: "2026-10-12",
  },
];
