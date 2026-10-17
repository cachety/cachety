import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Kata sandi berbeda untuk setiap penerima",
    body: "Salinan setiap penerima dikunci dengan kata sandinya sendiri, dicantumkan bersama kodenya setelah diunduh. Jadi, satu kata sandi yang bocor hanya membuka satu salinan.",
  },
  "suggested-areas": {
    title: "Saran area yang perlu disensor",
    body: "Cachety menemukan nomor rekening, NIK, dan data serupa di halaman, lalu menawarkan untuk menyensornya. Deteksi berjalan di perangkat Anda, seperti semua proses lainnya.",
  },
  "more-languages": {
    title: "Lebih banyak bahasa",
    body: "Bahasa Italia, Korea, dan Turki.",
  },
  "purpose-from-recipient": {
    title: "Saran keperluan berdasarkan penerima",
    body: "Saat Anda mengetik penerima, misalnya pemilik kos, keperluan yang sesuai bisa langsung disarankan.",
  },
  "local-word-lists": {
    title: "Kata sandi mudah dibaca dalam bahasa Anda",
    body: "Kata-kata kata sandi dalam bahasa Anda sendiri, hanya memakai huruf biasa agar diketik sama di keyboard mana pun.",
  },
  "remember-signature": {
    title: "Ingat tanda tangan saya di perangkat ini",
    body: "Pilihan opsional untuk menyimpan tanda tangan Anda di perangkat ini, dengan penjelasan singkat tentang apa yang disimpan dan satu ketukan untuk menghapusnya. Saat ini tanda tangan tidak pernah disimpan.",
  },
  "keep-vector-pages": {
    title: "Pertahankan teks PDF yang ditandatangani",
    body: "Pilihan untuk menandatangani tanpa membuat ulang halaman dari piksel, sehingga teksnya tetap bisa dicari. Pilihan ini akan punya pembersihan data tersembunyi sendiri.",
  },
  "sign-embed": {
    title: "Tanda tangan di situs mitra",
    body: "Situs yang disetujui bisa menampilkan alat tanda tangan di halaman mereka sendiri, dengan tempat dan catatan yang sudah terisi. Dokumen tetap berada di perangkat pengunjung.",
  },
  "sign": {
    title: "Tanda tangani dokumen",
    body: "Gambar, ketik, atau unggah tanda tangan Anda, tempatkan di PDF atau foto, lalu unduh PDF yang sudah ditandatangani. Seperti alat watermark, tidak ada yang diunggah.",
  },
  "simpler-tool": {
    title: "Alat yang lebih sederhana",
    body: "Tiga langkah dengan kata-kata sederhana: dokumen Anda, untuk apa dan siapa penerimanya, lalu pratinjau dan unduh. Semua opsi lanjutan tetap bisa dibuka dengan satu ketukan.",
  },
  "easy-passwords": {
    title: "Kata sandi yang mudah dibaca",
    body: "Saat mengunci file, kini dibuatkan kata sandi dari 12 kata acak, sekuat frasa pemulihan dompet kripto.",
  },
  "partner-embed": {
    title: "Cachety di situs mitra",
    body: "Situs yang disetujui bisa menampilkan alat ini di halaman mereka sendiri. Alat ini tetap berjalan di cachety.com, jadi dokumen tetap di perangkat pengunjung, di luar jangkauan situs tersebut.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Rencana",
  title: "Yang akan datang",
  lead: "Apa yang sedang kami kerjakan berikutnya, dan ide yang sedang kami pertimbangkan. Cachety tetap gratis dan open source, dan semuanya tetap di perangkat Anda.",
  next: "Berikutnya",
  idea: "Ide yang sedang dipertimbangkan",
  shipped: "Baru ditambahkan",
  suggest: "Usulkan ide",
  suggestBody: "Ada yang kurang? Buka issue di GitHub. Ide dalam bahasa apa pun kami terima.",
  meta: {
    title: "Rencana: yang akan datang di Cachety",
    description: "Fitur Cachety yang akan datang, alat watermark gratis yang menjaga dokumen tetap di perangkat Anda: rencana berikutnya, ide, dan fitur baru.",
  },
};

export default { items: ITEMS, copy: COPY };
