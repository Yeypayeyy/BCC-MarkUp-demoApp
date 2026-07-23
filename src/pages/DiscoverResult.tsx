import { useNavigate } from "react-router-dom";
import { Sparkles, Check, ArrowRight, Star } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Pill } from "@/components/ui";
import { Notice } from "@/components/widgets";
import { getPackage, rupiah } from "@/data/packages";
import { MENTORS } from "@/data/seed";

export default function DiscoverResult() {
  const nav = useNavigate();
  const pkg = getPackage("essential-sprint")!;
  const alt = getPackage("full-throttle-coaching")!;

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Primary result */}
          <Card className="overflow-hidden border-electric/40">
            <div className="flex items-center gap-2 bg-gradient-to-r from-lightblue to-pink/50 px-6 py-3">
              <Sparkles className="h-4 w-4 text-electric" />
              <span className="text-xs font-bold uppercase tracking-wide text-navy">✦ Rekomendasi Utama</span>
              <Pill tone="teal" className="ml-auto">92% cocok</Pill>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="blue">{pkg.category}</Pill>
                <Pill tone="gray">Tahap: draft proposal</Pill>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold">{pkg.name}</h1>
              <p className="mt-2 text-muted">
                Tim kamu sudah memiliki draft dan membutuhkan validasi problem–solution dalam waktu
                terbatas. Dua sesi fokus cukup untuk menajamkan analisis dan menyempurnakan solusi
                sebelum submission.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "Sesuai tahap: draft proposal",
                  "Mencakup root cause & solution review",
                  "Masuk rentang budget",
                  "Selesai sebelum deadline",
                ].map((w) => (
                  <div key={w} className="flex items-center gap-2 rounded-xl bg-appbg px-3 py-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-teal" /> {w}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-2xl font-extrabold text-navy">{rupiah(pkg.price)}<span className="text-sm font-medium text-muted">/tim</span></span>
                <span className="text-muted">2 sesi × 60 menit</span>
                <span className="text-muted">Bonus 1 sesi jika lolos final</span>
                <span className="text-muted">Tanya-jawab via WhatsApp</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => nav("/checkout/essential-sprint")}>
                  Pilih Essential Sprint <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => nav("/services")}>
                  Bandingkan Program
                </Button>
              </div>
            </div>
          </Card>

          {/* Alternative + journey */}
          <div className="space-y-6">
            <Card className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Alternatif</p>
              <h3 className="mt-1 text-lg font-bold">{alt.name}</h3>
              <p className="mt-1 text-sm text-muted">{alt.valueProp}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-extrabold text-navy">{rupiah(alt.price)}/tim</span>
                <Button size="sm" variant="secondary" onClick={() => nav(`/services/${alt.slug}`)}>
                  Lihat Detail
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">Your mentoring journey</p>
              <ol className="space-y-3">
                {["Pesan Essential Sprint", "Onboarding & upload dokumen", "Sesi 1: Problem & Analysis", "Sesi 2: Solution Refinement", "Submission & pantau progres"].map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">{i + 1}</span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>

        {/* Mentor shortlist */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold">Shortlist mentor untukmu</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {MENTORS.slice(0, 3).map((m) => (
              <Card key={m.id} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-bold text-white">
                    {m.name.split(" ").map((x) => x[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold">{m.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <Star className="h-3 w-3 fill-yellow text-yellow" /> {m.rating}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted">{m.expertise}</p>
                <Pill tone="teal" className="mt-3">Tersedia {m.availability}</Pill>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Notice>Rekomendasi AI dapat disesuaikan. Pilihan program tetap berada di tanganmu.</Notice>
        </div>
      </div>
    </div>
  );
}
