import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Search,
  ShoppingCart,
  BookOpen,
  Users2,
  LineChart,
  ChevronDown,
  Briefcase,
  Lightbulb,
  Trophy,
  ShieldCheck,
} from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Logo } from "@/components/Logo";
import { Button, Card, Pill, SectionTitle } from "@/components/ui";
import { ReadinessRing } from "@/components/widgets";
import { PACKAGES, rupiah } from "@/data/packages";

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -left-16 top-40 h-64 w-64 rounded-full bg-lightblue blur-3xl opacity-70" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <Pill tone="magenta" className="uppercase tracking-wide">
              Mentoring for Competition & Career
            </Pill>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Dari bingung mulai di mana sampai{" "}
              <span className="bg-gradient-to-r from-electric to-magenta bg-clip-text text-transparent">
                siap menghadapi juri.
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted">
              Mark-Up membantu tim dan individu menemukan program yang tepat, belajar bersama mentor
              berpengalaman, dan menjaga progres tetap berjalan di antara sesi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => nav("/discover")}>
                Temukan Programmu <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => nav("/services")}>
                Lihat Semua Program
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-teal" />
              AI menganalisis → Admin mengawasi → Mentor memvalidasi → Pelanggan memutuskan
            </div>
          </div>

          {/* Hero product preview */}
          <div className="relative">
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-electric" />
                  <span className="text-xs font-bold uppercase tracking-wide text-navy">
                    AI Recommendation
                  </span>
                  <Pill tone="teal" className="ml-auto">92% cocok</Pill>
                </div>
                <p className="font-bold">Essential Sprint</p>
                <p className="text-sm text-muted">
                  Cocok untuk tim dengan draft proposal & deadline ketat.
                </p>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-navy">
                    <Calendar className="h-4 w-4 text-purple" /> Upcoming
                  </div>
                  <p className="text-sm font-semibold">Nadia Putri</p>
                  <p className="text-xs text-muted">Sab, 25 Jul · 13.00 WIB</p>
                </Card>
                <Card className="flex flex-col items-center justify-center p-4">
                  <ReadinessRing value={64} size={80} label="Readiness" />
                </Card>
              </div>
              <Card className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-navy">Action Plan</span>
                  <Pill tone="teal">Mentor-validated</Pill>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {["Pisahkan symptom & root cause", "Tulis ulang problem statement", "Bangun tabel problem–solution"].map(
                    (t, i) => (
                      <li key={t} className="flex items-center gap-2">
                        <CheckCircle2 className={i < 2 ? "h-4 w-4 text-teal" : "h-4 w-4 text-line"} />
                        <span className={i < 2 ? "text-muted line-through" : ""}>{t}</span>
                      </li>
                    )
                  )}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-medium text-muted sm:px-6">
          {["BCC & BPC mentoring", "Mentor berpengalaman", "Resource finalis", "Dukungan antarsesi"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="cara-kerja" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Tiga kapabilitas terhubung"
          title="Satu pengalaman, dari pencarian hingga final"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: <Search />, tone: "blue", t: "Guided Discovery", d: "Asesmen berbantuan AI memetakan kebutuhan dan merekomendasikan program serta mentor yang tepat." },
            { icon: <ShoppingCart />, tone: "purple", t: "Integrated Operations", d: "Booking, pembayaran, onboarding, penjadwalan, dan materi dalam satu sistem — admin tetap mengendalikan." },
            { icon: <Sparkles />, tone: "teal", t: "Continuous Copilot", d: "Di antara sesi: analisis dokumen, action plan, dan simulasi Q&A. Umpan balik strategis divalidasi mentor." },
          ].map((c) => (
            <Card key={c.t} className="p-6">
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${c.tone === "blue" ? "bg-lightblue text-electric" : c.tone === "purple" ? "bg-purple/10 text-purple" : "bg-lightteal text-teal"}`}>
                {c.icon}
              </div>
              <h3 className="text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted">{c.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Alur lima langkah" title="Perjalanan mentoring kamu" />
          <div className="grid gap-4 sm:grid-cols-5">
            {[
              { icon: <Search />, t: "Temukan" },
              { icon: <ShoppingCart />, t: "Pesan" },
              { icon: <BookOpen />, t: "Persiapkan" },
              { icon: <Users2 />, t: "Mentoring" },
              { icon: <LineChart />, t: "Pantau Progres" },
            ].map((s, i) => (
              <div key={s.t} className="relative rounded-2xl border border-line bg-appbg p-5 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-electric text-white">
                  {s.icon}
                </div>
                <p className="text-xs font-bold text-muted">Langkah {i + 1}</p>
                <p className="font-bold">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="mentor" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Kategori program" title="Pilih jalur persiapanmu" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: <Trophy />, t: "Business Case Competition", d: "Analisis masalah, framework, solusi, dan pitching.", tone: "bg-lightblue" },
            { icon: <Lightbulb />, t: "Business Plan Competition", d: "Ideation, proposal, dan persiapan pitching.", tone: "bg-pink" },
            { icon: <Briefcase />, t: "Career Mentoring", d: "Personal branding, CV ATS, dan LinkedIn.", tone: "bg-lightteal" },
          ].map((c) => (
            <Card key={c.t} className="overflow-hidden">
              <div className={`${c.tone} px-6 py-8`}>
                <div className="mb-3 text-navy">{c.icon}</div>
                <h3 className="text-lg font-bold">{c.t}</h3>
                <p className="mt-1 text-sm text-muted">{c.d}</p>
              </div>
              <div className="px-6 py-4">
                <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-electric">
                  Lihat program <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section id="resource" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Paket unggulan" title="Program yang paling banyak dipilih" />
          <div className="grid gap-5 md:grid-cols-3">
            {PACKAGES.slice(0, 3).map((p) => (
              <Card key={p.slug} className="flex flex-col p-6">
                <Pill tone="blue">{p.category}</Pill>
                <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{p.valueProp}</p>
                <p className="mt-4 text-2xl font-extrabold text-navy">
                  {rupiah(p.price)}
                  <span className="text-sm font-medium text-muted">/{p.priceUnit}</span>
                </p>
                <Button className="mt-4" variant="outline" onClick={() => nav(`/services/${p.slug}`)}>
                  Lihat Detail
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How AI helps */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Bagaimana AI membantu" title="Tiga output konkret dari AI" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { t: "Rekomendasi program", d: "Mencocokkan kebutuhan dan tahap persiapan dengan paket paling relevan." },
            { t: "Analisis awal dokumen", d: "Menandai root cause, keterkaitan solusi, dan metrik dampak yang perlu diperkuat." },
            { t: "Action plan & simulasi Q&A", d: "Mengubah temuan menjadi tugas terprioritas dan latihan menghadapi juri." },
          ].map((c) => (
            <Card key={c.t} className="border-electric/30 p-6">
              <Sparkles className="mb-3 h-5 w-5 text-electric" />
              <h3 className="font-bold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted">{c.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lightteal px-4 py-2 text-sm font-semibold text-teal">
          <ShieldCheck className="h-4 w-4" /> Keputusan strategis tetap divalidasi mentor.
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Cerita peserta" title="Apa kata mereka" />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { n: "Faaid & Tim Semleketep", c: "Finalis BCC ISAC 2026", q: "Analisis awal AI bikin kami cepat tahu bagian mana yang lemah, lalu mentor bantu memperkuatnya." },
              { n: "Salsabila", c: "Peserta Career Mentoring", q: "CV saya jadi lebih ATS-friendly dan profil LinkedIn lebih rapi setelah satu sesi." },
              { n: "Rizky & Tim Garuda", c: "Peserta BPC", q: "Sesi proposal deep dive-nya tajam. Feedback-nya langsung bisa dieksekusi." },
            ].map((t) => (
              <Card key={t.n} className="p-6">
                <p className="text-sm text-ink">“{t.q}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white">
                    {t.n[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.n}</p>
                    <p className="text-xs text-muted">{t.c}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
        <div className="space-y-3">
          {[
            { q: "Apakah mentoring dilakukan secara online?", a: "Ya. Seluruh sesi mentoring dilakukan online melalui video call sesuai jadwal yang disepakati." },
            { q: "Apakah saya harus sudah punya ide?", a: "Tidak harus. Ada paket untuk pemula yang belum punya ide hingga tim yang sudah masuk tahap revisi." },
            { q: "Bagaimana mentor dipilih?", a: "AI menyusun shortlist mentor berdasarkan kebutuhanmu, lalu admin mengonfirmasi penugasan mentor." },
            { q: "Apakah AI menggantikan mentor?", a: "Tidak. AI membantu analisis dan efisiensi. Keputusan strategis tetap divalidasi mentor." },
            { q: "Apa yang terjadi jika tim lolos ke final?", a: "Beberapa paket memberikan bonus 1 sesi tambahan khusus persiapan final dan latihan pitching." },
          ].map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-navy px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Belum yakin harus memilih program yang mana?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Jawab lima pertanyaan singkat dan biarkan AI menyusun rekomendasi program serta mentor untukmu.
          </p>
          <Button
            size="lg"
            className="mt-6 bg-yellow text-navy hover:bg-[#ffd21a]"
            onClick={() => nav("/discover")}
          >
            Mulai Asesmen Gratis <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <footer className="border-t border-line bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Logo />
          <p className="text-sm text-muted">© 2026 Mark-Up. Mentoring for competition & career.</p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {q}
        <ChevronDown className={`h-5 w-5 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-4 text-sm text-muted">{a}</p>}
    </Card>
  );
}
