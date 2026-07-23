import type { Pkg } from "./types";

export const PACKAGES: Pkg[] = [
  {
    slug: "essential-sprint",
    category: "BCC",
    name: "Essential Sprint",
    price: 150000,
    priceUnit: "tim",
    format: "Tim",
    stage: "Draft proposal",
    sessions: "2 sesi × 60 menit",
    finalBonus: true,
    valueProp:
      "Dua sesi fokus untuk menajamkan analisis dan menyempurnakan solusi sebelum submission.",
    bestFor:
      "Tim yang sudah terdaftar dan butuh pendampingan strategis dengan timeline ketat.",
    benefits: [
      "2 sesi mentoring 60 menit",
      "Bonus 1 sesi jika lolos final",
      "Tanya-jawab via WhatsApp",
    ],
    coverage: [
      "Problem breakdown & analisis berbasis framework",
      "Review & penyempurnaan solusi",
    ],
    curriculum: [
      { title: "Sesi 1 — Problem & Analysis", detail: "Breakdown masalah dan pemilihan framework analisis." },
      { title: "Sesi 2 — Solution Refinement", detail: "Review dan penajaman solusi menjelang submission." },
    ],
    receives: ["Catatan mentor tiap sesi", "Rekomendasi framework", "Akses WhatsApp Q&A"],
  },
  {
    slug: "full-throttle-coaching",
    category: "BCC",
    name: "Full-Throttle Coaching",
    price: 195000,
    priceUnit: "tim",
    format: "Tim",
    stage: "Aktif berkompetisi",
    sessions: "3 sesi × 60 menit",
    finalBonus: true,
    valueProp:
      "Pendampingan menyeluruh untuk mematangkan solusi dan kesiapan presentasi.",
    bestFor:
      "Tim aktif yang ingin solusi matang dan siap presentasi di depan juri.",
    benefits: [
      "3 sesi mentoring 60 menit",
      "Bonus 1 sesi jika lolos final",
      "Tanya-jawab via WhatsApp",
    ],
    coverage: [
      "Problem breakdown & analisis berbasis framework",
      "Review & penyempurnaan solusi",
      "Review & latihan pitching",
    ],
    curriculum: [
      { title: "Sesi 1 — Problem & Analysis", detail: "Breakdown masalah dan framework." },
      { title: "Sesi 2 — Solution Refinement", detail: "Penajaman solusi & implementasi." },
      { title: "Sesi 3 — Pitching", detail: "Review deck dan latihan presentasi." },
    ],
    receives: ["Catatan mentor tiap sesi", "Review pitch deck", "Akses WhatsApp Q&A"],
  },
  {
    slug: "bundling-powerpack",
    category: "BCC",
    name: "Bundling PowerPack",
    price: 300000,
    priceUnit: "personal",
    format: "Individu",
    stage: "Pemula",
    sessions: "3 sesi individu × 60 menit",
    finalBonus: false,
    valueProp:
      "Belajar BCC dari nol dengan panduan lengkap plus tools finalis nasional.",
    bestFor:
      "Pemula yang ingin belajar BCC dari nol dengan panduan dan tools lengkap.",
    benefits: [
      "3 sesi mentoring individu 60 menit",
      "Akses 10 deck finalis nasional",
      "Akses 10 framework analisis business case",
    ],
    coverage: [
      "Identifikasi masalah, symptom, dan root cause",
      "Pemilihan framework yang fit-to-case",
      "Pengembangan solusi strategis dan realistis",
      "Penyusunan rencana implementasi",
    ],
    curriculum: [
      { title: "Sesi 1 — Fundamentals", detail: "Masalah, symptom, dan root cause." },
      { title: "Sesi 2 — Framework & Solusi", detail: "Framework fit-to-case dan solusi." },
      { title: "Sesi 3 — Implementation Plan", detail: "Rencana implementasi realistis." },
    ],
    receives: ["10 deck finalis nasional", "10 framework analisis", "Catatan mentor tiap sesi"],
  },
  {
    slug: "bpc-kickstart",
    category: "BPC",
    name: "Kickstart",
    price: 200000,
    priceUnit: "personal",
    format: "Individu",
    stage: "Belum punya ide",
    sessions: "2 sesi individu × 60 menit",
    finalBonus: false,
    valueProp: "Bantu pemula menemukan ide dan menyiapkan proposal serta pitching.",
    bestFor: "Pemula yang belum punya ide kompetisi.",
    benefits: ["2 sesi mentoring individu 60 menit", "Tanya-jawab via WhatsApp"],
    coverage: ["Ideation & proposal mapping", "Persiapan pitching & Q&A"],
    curriculum: [
      { title: "Sesi 1 — Ideation & Proposal Mapping", detail: "Menemukan ide dan memetakan proposal." },
      { title: "Sesi 2 — Pitching & Q&A Preparation", detail: "Menyiapkan pitching dan menghadapi Q&A." },
    ],
    receives: ["Catatan mentor tiap sesi", "Template proposal", "Akses WhatsApp Q&A"],
  },
  {
    slug: "bpc-level-up",
    category: "BPC",
    name: "Level-Up",
    price: 250000,
    priceUnit: "tim",
    format: "Tim",
    stage: "Sudah punya ide awal",
    sessions: "2 sesi tim × 60 menit",
    finalBonus: true,
    valueProp: "Penajaman proposal dan persiapan pitching untuk tim yang sudah punya ide.",
    bestFor: "Tim dengan ide awal yang butuh penyempurnaan proposal dan pitching.",
    benefits: [
      "2 sesi mentoring tim 60 menit",
      "Bonus 1 sesi jika lolos final",
      "Tanya-jawab via WhatsApp",
    ],
    coverage: ["Proposal deep dive & strategic input", "Customized mentoring: pitching/proposal/Q&A"],
    curriculum: [
      { title: "Sesi 1 — Proposal Deep Dive", detail: "Analisis mendalam dan masukan strategis." },
      { title: "Sesi 2 — Customized Mentoring", detail: "Pitching / proposal / Q&A sesuai kebutuhan." },
    ],
    receives: ["Catatan mentor tiap sesi", "Strategic input tertulis", "Akses WhatsApp Q&A"],
  },
  {
    slug: "career-101",
    category: "Career",
    name: "101 Career Mentoring",
    price: 110000,
    priceUnit: "session",
    format: "Individu",
    stage: "Persiapan karier",
    sessions: "1 sesi × 60 menit",
    finalBonus: false,
    valueProp:
      "Bangun karier di bidang marketing dari personal branding hingga CV dan LinkedIn.",
    bestFor:
      "Pengguna yang ingin membangun karier marketing: personal branding, CV, LinkedIn.",
    benefits: [
      "1 sesi mentoring 60 menit",
      "Template CV ATS gratis + review CV",
      "Modul eksklusif, akses komunitas & LinkedIn network",
    ],
    coverage: [
      "Personal branding & positioning",
      "Optimasi CV berbasis ATS",
      "Optimasi profil LinkedIn",
    ],
    curriculum: [
      { title: "Sesi 1 — Career Foundations", detail: "Personal branding, CV, dan LinkedIn." },
    ],
    receives: [
      "Template CV ATS",
      "Modul & template portfolio eksklusif",
      "Free CV review",
      "Akses komunitas & LinkedIn mutual network",
    ],
  },
];

export const getPackage = (slug: string) => PACKAGES.find((p) => p.slug === slug);
export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
