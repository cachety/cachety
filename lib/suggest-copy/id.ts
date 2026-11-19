import type { SuggestCopy } from "./types";

// Draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
const COPY: SuggestCopy = {
  banner: (n) =>
    n > 1 ? `Kami menemukan ${n} nomor yang mungkin ingin Anda sensor.` : "Kami menemukan satu nomor yang mungkin ingin Anda sensor.",
  review: "Tinjau",
  title: "Saran",
  hideAll: "Sensor semua",
  hideAllDocs: "Sensor semua di semua dokumen",
  hide: "Sensor",
  hidden: "Disensor",
  undo: "Urungkan",
  dismiss: "Bukan yang ini",
  onPage: (p) => `Halaman ${p}`,
  notShown: "Halaman yang tidak tampil di pratinjau",
  coverAll: "Saran mencakup semua halaman.",
  doneAll: (n, pages) => `${n} area disensor (halaman ${pages}).`,
  none: "Tidak ada yang bisa disarankan di dokumen ini.",
  noText: "Tidak ada teks yang bisa dibaca di dokumen ini: gambar sendiri areanya.",
  incomplete: "Saran berhenti sebelum akhir dokumen ini.",
  footer:
    "Saran bisa melewatkan sesuatu. Periksa sendiri seluruh halaman. Barcode dan kode QR bisa memuat informasi yang sama.",
  note: {
    frTax: "Penerima bisa memakainya untuk memeriksa keaslian surat pajak Anda. Sensor hanya jika mereka tidak memerlukannya.",
    iban: "Jika mereka meminta data rekening Anda, mereka memerlukannya.",
  },
  kinds: {
    iban: "Nomor rekening (IBAN)",
    card: "Nomor kartu",
    "fr-nir": "Nomor jaminan sosial (Prancis)",
    "fr-tax": "Nomor pajak (Prancis)",
    "fr-tax-ref": "Nomor referensi surat pajak (Prancis)",
    "de-taxid": "Nomor pajak (Jerman, Steuer-ID)",
    "es-dni": "Nomor identitas (Spanyol, DNI/NIE)",
    "nl-bsn": "Nomor layanan warga (Belanda, BSN)",
    "be-nn": "Nomor nasional (Belgia)",
    "pt-nif": "Nomor pajak (Portugal, NIF)",
    "br-cpf": "CPF (Brasil)",
    "it-cf": "Kode pajak (Italia, codice fiscale)",
    "cn-id": "Nomor identitas penduduk (Tiongkok)",
    "jp-mynumber": "My Number (Jepang)",
    "ir-melli": "Kode nasional (Iran)",
    "id-nik": "NIK",
  },
  announce: (label, page, hidden) => `${label}, halaman ${page}: ${hidden ? "disensor" : "terlihat lagi"}.`,
};

export default COPY;
