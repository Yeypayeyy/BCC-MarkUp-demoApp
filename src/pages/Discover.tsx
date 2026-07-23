import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Pill, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const NEEDS = [
  "Memahami guidebook",
  "Menentukan root cause",
  "Memilih framework",
  "Mematangkan solusi",
  "Review proposal",
  "Membuat pitch deck",
  "Latihan pitching",
  "Simulasi Q&A",
];

const ANALYZING = [
  "Memetakan tahap persiapan…",
  "Mencocokkan kebutuhan dengan cakupan program…",
  "Menyusun shortlist mentor…",
];

export default function Discover() {
  const nav = useNavigate();
  const { toast } = useDemo();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Business Case Competition (BCC)");
  const [stage, setStage] = useState("Sudah punya draft proposal");
  const [needs, setNeeds] = useState<string[]>(["Menentukan root cause", "Mematangkan solusi", "Review proposal"]);
  const [ctx, setCtx] = useState({ status: "Mahasiswa", format: "Tim", deadline: "2026-08-04", time: "weekend", budget: "Rp150.000–Rp250.000" });
  const [analyzing, setAnalyzing] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!analyzing) return;
    const iv = setInterval(() => setPhase((p) => (p + 1) % ANALYZING.length), 430);
    const to = setTimeout(() => nav("/discover/result"), 1300);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, [analyzing, nav]);

  const toggleNeed = (n: string) =>
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : cur.length < 3 ? [...cur, n] : cur));

  const back = () => (step > 1 ? setStep(step - 1) : nav("/"));
  const next = () => setStep((s) => Math.min(5, s + 1));

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[320px_1fr]">
        {/* Left context */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Pill tone="magenta" className="uppercase">Guided Discovery</Pill>
          <h1 className="mt-3 text-2xl font-extrabold">Kenali kebutuhanmu dalam 5 langkah</h1>
          <p className="mt-2 text-sm text-muted">
            Jawaban kamu membantu AI menyusun rekomendasi program dan shortlist mentor. Semuanya bisa
            disesuaikan nanti.
          </p>
          <Card className="mt-4 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal">
              <ShieldCheck className="h-4 w-4" /> Rekomendasi divalidasi mentor
            </div>
            <p className="mt-1 text-xs text-muted">
              AI menganalisis, admin mengawasi, mentor memvalidasi — pilihan tetap di tanganmu.
            </p>
          </Card>
        </aside>

        {/* Right card */}
        <div>
          {/* progress */}
          <div className="mb-5 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={cx("h-1.5 flex-1 rounded-full", i <= step ? "bg-electric" : "bg-line")} />
            ))}
          </div>

          <Card className="p-6">
            {analyzing ? (
              <div className="flex flex-col items-center py-14 text-center">
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-electric/20" />
                  <Sparkles className="h-8 w-8 text-electric" />
                </div>
                <p className="font-semibold">{ANALYZING[phase]}</p>
                <p className="mt-1 text-sm text-muted">Menyusun rekomendasi terbaik untukmu</p>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-electric">Langkah {step} dari 5</p>

                {step === 1 && (
                  <StepBlock title="Tujuanmu" q="Apa yang sedang kamu persiapkan?">
                    {["Business Case Competition (BCC)", "Business Plan Competition (BPC)", "Career preparation", "Belum yakin"].map((o) => (
                      <Choice key={o} active={goal === o} onClick={() => setGoal(o)}>{o}</Choice>
                    ))}
                  </StepBlock>
                )}

                {step === 2 && (
                  <StepBlock title="Tahap persiapan" q="Sejauh mana progresmu saat ini?">
                    {["Baru mulai dan belum punya ide", "Sudah punya ide awal", "Sudah punya draft proposal", "Sedang revisi untuk submission", "Sudah lolos final dan perlu latihan pitching"].map((o) => (
                      <Choice key={o} active={stage === o} onClick={() => setStage(o)}>{o}</Choice>
                    ))}
                  </StepBlock>
                )}

                {step === 3 && (
                  <StepBlock title="Kebutuhan utama" q="Pilih maksimal tiga kebutuhan">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {NEEDS.map((o) => (
                        <Choice key={o} active={needs.includes(o)} onClick={() => toggleNeed(o)} compact>
                          {o}
                        </Choice>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted">{needs.length}/3 dipilih</p>
                  </StepBlock>
                )}

                {step === 4 && (
                  <StepBlock title="Konteks & preferensi" q="Sedikit detail untuk mempertajam rekomendasi">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Status">
                        <Select value={ctx.status} onChange={(v) => setCtx({ ...ctx, status: v })} opts={["SMA", "Mahasiswa", "Lainnya"]} />
                      </Field>
                      <Field label="Format">
                        <Select value={ctx.format} onChange={(v) => setCtx({ ...ctx, format: v })} opts={["Individu", "Tim"]} />
                      </Field>
                      <Field label="Deadline">
                        <input type="date" value={ctx.deadline} onChange={(e) => setCtx({ ...ctx, deadline: e.target.value })} className="input" />
                      </Field>
                      <Field label="Preferensi waktu">
                        <Select value={ctx.time} onChange={(v) => setCtx({ ...ctx, time: v })} opts={["weekday", "weekend", "flexible"]} />
                      </Field>
                      <Field label="Budget" full>
                        <Select value={ctx.budget} onChange={(v) => setCtx({ ...ctx, budget: v })} opts={["Di bawah Rp150.000", "Rp150.000–Rp250.000", "Rp250.000–Rp350.000", "Fleksibel"]} />
                      </Field>
                    </div>
                    <p className="mt-3 text-xs text-muted">Status pendidikan hanya konteks rekomendasi, bukan lini produk terpisah.</p>
                  </StepBlock>
                )}

                {step === 5 && (
                  <StepBlock title="Ringkasan" q="Periksa sebelum analisis">
                    <dl className="divide-y divide-line rounded-xl border border-line">
                      {[
                        ["Competition", goal],
                        ["Current stage", stage],
                        ["Top needs", needs.join(", ") || "—"],
                        ["Deadline", ctx.deadline],
                        ["Format", ctx.format],
                        ["Budget", ctx.budget],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                          <dt className="text-muted">{k}</dt>
                          <dd className="text-right font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </StepBlock>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeft className="h-4 w-4" /> Kembali
                  </Button>
                  <div className="flex items-center gap-3">
                    <button
                      className="hidden text-sm font-medium text-muted hover:text-ink sm:block"
                      onClick={() => toast("Progres asesmen disimpan", "info")}
                    >
                      Simpan dan lanjutkan nanti
                    </button>
                    {step < 5 ? (
                      <Button onClick={next}>
                        Lanjut <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => setAnalyzing(true)}>
                        <Sparkles className="h-4 w-4" /> Analisis Kebutuhanku
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
      <style>{`.input{height:44px;width:100%;border:1px solid #E4E7EC;border-radius:12px;padding:0 12px;background:#fff;font-size:14px}`}</style>
    </div>
  );
}

function StepBlock({ title, q, children }: { title: string; q: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="mb-4 mt-1 text-sm text-muted">{q}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Choice({ children, active, onClick, compact }: { children: React.ReactNode; active: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3 rounded-xl border px-4 text-left text-sm font-medium transition-colors min-h-[44px]",
        compact ? "py-2.5" : "py-3",
        active ? "border-electric bg-lightblue text-electric" : "border-line bg-white hover:border-electric/40"
      )}
    >
      <span className={cx("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border", active ? "border-electric bg-electric" : "border-line")}>
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {children}
    </button>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={cx("block", full && "sm:col-span-2")}>
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, opts }: { value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
      {opts.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
