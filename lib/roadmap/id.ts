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
  "simpler-tool": {
    title: "Alat yang lebih sederhana",
    body: "Tiga langkah dengan kata-kata sederhana: dokumen Anda, untuk apa dan siapa penerimanya, lalu pratinjau dan unduh. Semua opsi lanjutan tetap bisa dibuka dengan satu ketukan.",
  },
  "easy-passwords": {
    title: "Kata sandi yang mudah dibaca",
    body: "Saat mengunci file, kini dibuatkan kata sandi dari 12 kata acak, sekuat frasa pemulihan dompet kripto.",
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
