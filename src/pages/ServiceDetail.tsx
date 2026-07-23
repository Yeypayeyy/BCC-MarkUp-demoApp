import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, Gift, MessageCircle, Star } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Modal, Pill } from "@/components/ui";
import { getPackage, rupiah } from "@/data/packages";
import { MENTORS } from "@/data/seed";

export default function ServiceDetail() {
  const { slug = "" } = useParams();
  const nav = useNavigate();
  const pkg = getPackage(slug);
  const [waOpen, setWaOpen] = useState(false);

  if (!pkg)
    return (
      <div className="min-h-screen">
        <PublicNavbar />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-lg font-bold">Program tidak ditemukan.</p>
          <Button className="mt-4" onClick={() => nav("/services")}>Kembali ke katalog</Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted">
          <Link to="/services" className="hover:text-ink">Program</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/services" className="hover:text-ink">{pkg.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-ink">{pkg.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="blue">{pkg.category}</Pill>
              <Pill tone="gray">Tahap: {pkg.stage}</Pill>
              <Pill tone="purple">{pkg.format}</Pill>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold">{pkg.name}</h1>
            <p className="mt-2 text-lg text-muted">{pkg.valueProp}</p>

            <Section title="Benefit utama">
              <ul className="grid gap-2 sm:grid-cols-2">
                {pkg.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{b}</li>
                ))}
              </ul>
            </Section>

            <Section title="Kurikulum & rincian sesi">
              <div className="space-y-3">
                {pkg.curriculum.map((c, i) => (
                  <Card key={c.title} className="p-4">
                    <div className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">{i + 1}</span>
                      <div>
                        <p className="font-bold">{c.title}</p>
                        <p className="text-sm text-muted">{c.detail}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <p className="text-sm font-bold">Cocok untuk</p>
                <p className="mt-1 text-sm text-muted">{pkg.bestFor}</p>
              </Card>
              <Card className="p-5">
                <p className="text-sm font-bold">Yang kamu terima</p>
                <ul className="mt-1 space-y-1 text-sm text-muted">
                  {pkg.receives.map((r) => <li key={r} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{r}</li>)}
                </ul>
              </Card>
            </div>

            {pkg.finalBonus && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-yellow/20 px-5 py-4">
                <Gift className="h-5 w-5 text-[#8a6d00]" />
                <p className="text-sm font-semibold text-[#8a6d00]">Bonus 1 sesi tambahan jika tim lolos ke final.</p>
              </div>
            )}

            <Section title="Contoh mentor">
              <div className="grid gap-3 sm:grid-cols-3">
                {MENTORS.slice(0, 3).map((m) => (
                  <Card key={m.id} className="p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white">{m.name.split(" ").map((x) => x[0]).join("")}</div>
                    <p className="mt-2 text-sm font-bold">{m.name}</p>
                    <p className="text-xs text-muted">{m.expertise}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Star className="h-3 w-3 fill-yellow text-yellow" />{m.rating}</p>
                  </Card>
                ))}
              </div>
            </Section>

            <Section title="FAQ">
              <div className="space-y-2 text-sm">
                {[
                  ["Apakah sesi dilakukan online?", "Ya, seluruh sesi dilakukan online sesuai jadwal yang disepakati."],
                  ["Bagaimana jika jadwal bentrok?", "Kamu bisa mengajukan reschedule melalui workspace tanpa biaya tambahan."],
                ].map(([q, a]) => (
                  <Card key={q} className="p-4"><p className="font-semibold">{q}</p><p className="mt-1 text-muted">{a}</p></Card>
                ))}
              </div>
            </Section>
          </div>

          {/* Sticky purchase card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-3xl font-extrabold text-navy">{rupiah(pkg.price)}<span className="text-base font-medium text-muted">/{pkg.priceUnit}</span></p>
              <p className="mt-1 text-sm text-muted">{pkg.sessions}</p>
              <div className="mt-4 space-y-2">
                <Button className="w-full" size="lg" onClick={() => nav(`/checkout/${pkg.slug}`)}>Pilih Program</Button>
                <Button className="w-full" variant="outline" onClick={() => setWaOpen(true)}>
                  <MessageCircle className="h-4 w-4" /> Tanya Admin
                </Button>
              </div>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                {pkg.benefits.map((b) => <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" /><span className="text-muted">{b}</span></li>)}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <Modal open={waOpen} onClose={() => setWaOpen(false)} title="Chat dengan Admin">
        <div className="space-y-3">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-appbg px-3 py-2 text-sm">
            Halo! Ada yang bisa kami bantu soal program <b>{pkg.name}</b>?
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-lightblue px-3 py-2 text-sm text-electric">
            Apakah paket ini cocok untuk tim yang sedang revisi proposal?
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-appbg px-3 py-2 text-sm">
            Sangat cocok. Fokusnya pada validasi problem–solution sebelum submission. 🙌
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input className="h-11 flex-1 rounded-xl border border-line px-3 text-sm" placeholder="Tulis pesan… (demo)" />
          <Button>Kirim</Button>
        </div>
      </Modal>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-extrabold">{title}</h2>
      {children}
    </div>
  );
}
