import type {
  Assessment,
  Finding,
  Mentor,
  Order,
  Session,
  Task,
} from "./types";

export const MENTORS: Mentor[] = [
  {
    id: "nadia",
    name: "Nadia Putri",
    expertise: "BCC Strategy — FMCG, sustainability",
    competitions: "BCC",
    rating: 4.9,
    activeMentees: 3,
    availability: "Sabtu",
    capacity: "Tersedia",
  },
  {
    id: "raka",
    name: "Raka Mahendra",
    expertise: "Problem Solving & Finance",
    competitions: "BCC, BPC",
    rating: 4.8,
    activeMentees: 4,
    availability: "Rabu",
    capacity: "Hampir penuh",
  },
  {
    id: "alya",
    name: "Alya Ramadhani",
    expertise: "Pitching & Storytelling",
    competitions: "BCC, Career",
    rating: 4.9,
    activeMentees: 2,
    availability: "Minggu",
    capacity: "Tersedia",
  },
  {
    id: "dimas",
    name: "Dimas Akbar",
    expertise: "BPC Ideation",
    competitions: "BPC",
    rating: 4.7,
    activeMentees: 5,
    availability: "Kamis",
    capacity: "Penuh",
  },
];

export const SEED_ASSESSMENT: Assessment = {
  competition: "Business Case Competition (BCC)",
  stage: "Sudah punya draft proposal",
  needs: ["Menentukan root cause", "Mematangkan solusi", "Review proposal"],
  deadline: "12 hari lagi",
  format: "Tim",
  budget: "Rp150.000–Rp250.000",
};

export const SEED_TASKS: Task[] = [
  {
    id: "t1",
    title: "Pisahkan symptom dari root cause",
    status: "done",
    priority: "Tinggi",
    due: "20 Jul 2026",
    source: "AI",
    assignee: "Faaid",
    relatedDoc: "Proposal_Semleketep_v2.pdf",
    comments: 2,
  },
  {
    id: "t2",
    title: "Tulis ulang problem statement",
    status: "done",
    priority: "Tinggi",
    due: "22 Jul 2026",
    source: "Mentor",
    assignee: "Faaid",
    relatedDoc: "Proposal_Semleketep_v2.pdf",
    comments: 1,
  },
  {
    id: "t3",
    title: "Bangun tabel keterkaitan problem–solution",
    status: "inprogress",
    priority: "Tinggi",
    due: "26 Jul 2026",
    source: "AI",
    assignee: "Tim Semleketep",
    relatedDoc: "Proposal_Semleketep_v2.pdf",
    comments: 3,
  },
  {
    id: "t4",
    title: "Definisikan indikator dampak yang terukur",
    status: "review",
    priority: "Sedang",
    due: "28 Jul 2026",
    source: "AI",
    assignee: "Faaid",
    relatedDoc: "Proposal_Semleketep_v2.pdf",
    comments: 0,
  },
];

export const SEED_FINDINGS: Finding[] = [
  { id: "f1", text: "Root cause masih bercampur dengan symptom", severity: "high", page: "Hal. 3" },
  { id: "f2", text: "Keterkaitan root cause dan solusi belum eksplisit", severity: "high", page: "Hal. 5" },
  { id: "f3", text: "Asumsi finansial perlu justifikasi lebih jelas", severity: "medium", page: "Hal. 8" },
  { id: "f4", text: "Metrik dampak belum terukur", severity: "medium", page: "Hal. 9" },
];

export const SEED_SESSIONS: Session[] = [
  {
    id: "s1",
    title: "Problem & Analysis Review",
    mentor: "Nadia Putri",
    date: "Sabtu, 25 Juli 2026",
    time: "13.00–14.00 WIB",
    status: "upcoming",
    agenda: ["Review breakdown masalah", "Validasi root cause", "Pilih framework analisis"],
  },
  {
    id: "s2",
    title: "Solution Refinement",
    mentor: "Nadia Putri",
    date: "Sabtu, 1 Agustus 2026",
    time: "13.00–14.00 WIB",
    status: "scheduled",
    agenda: ["Penajaman solusi", "Keterkaitan problem–solution", "Rencana implementasi"],
  },
  {
    id: "s3",
    title: "Final Pitching Bonus",
    mentor: "Nadia Putri",
    date: "Terkunci hingga status finalis",
    time: "—",
    status: "locked",
    agenda: ["Review pitch deck", "Latihan presentasi", "Simulasi Q&A juri"],
  },
];

export const SEED_ORDER: Order = {
  id: "MU-260723-021",
  customer: "Faaid",
  team: "Tim Semleketep",
  pkg: "Essential Sprint",
  payment: "Terverifikasi",
  mentor: "Nadia Putri",
  mentorApproved: false,
  schedule: "Preferensi diterima",
  scheduleConfirmed: false,
  materials: "Menunggu",
  status: "needs-approval",
};

// Additional admin orders for a believable control tower.
export const SEED_ORDERS_EXTRA: Order[] = [
  {
    id: "MU-260722-019",
    customer: "Bagas",
    team: "Tim Nusantara",
    pkg: "Full-Throttle Coaching",
    payment: "Terverifikasi",
    mentor: "Raka Mahendra",
    mentorApproved: true,
    schedule: "Terkonfirmasi",
    scheduleConfirmed: true,
    materials: "Terkirim",
    status: "active",
  },
  {
    id: "MU-260722-018",
    customer: "Salsabila",
    team: "Individu",
    pkg: "101 Career Mentoring",
    payment: "Terverifikasi",
    mentor: "Alya Ramadhani",
    mentorApproved: true,
    schedule: "Terkonfirmasi",
    scheduleConfirmed: true,
    materials: "Terkirim",
    status: "completed",
  },
  {
    id: "MU-260721-015",
    customer: "Rizky",
    team: "Tim Garuda",
    pkg: "Level-Up",
    payment: "Menunggu",
    mentor: "—",
    mentorApproved: false,
    schedule: "—",
    scheduleConfirmed: false,
    materials: "Menunggu",
    status: "needs-approval",
  },
];

export const SEED_CHAT = [
  {
    role: "user" as const,
    text: "Apa kelemahan utama proposal kami saat ini?",
  },
  {
    role: "copilot" as const,
    text: "Kelemahan utamanya bukan pada ide, tetapi pada alur pembuktiannya. Proposal sudah menunjukkan masalah dan solusi, namun belum menjelaskan secara eksplisit mengapa solusi tersebut paling tepat untuk root cause yang dipilih.",
  },
];
