import { useState } from "react";
import { BadgeCheck, Sparkles, Check, Clock, StickyNote, RotateCcw, ClipboardCheck } from "lucide-react";
import { Button, Card, Pill, cx } from "@/components/ui";
import { ReadinessRing, MentorValidationBadge } from "@/components/widgets";
import { useDemo } from "@/store/DemoContext";

const sevTone = { high: "red", medium: "amber", low: "blue" } as const;

export default function MenteeDetail() {
  const { findings, tasks, validateFinding, toast } = useDemo();
  const [note, setNote] = useState("");

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">Tim Semleketep</h2>
            <p className="text-sm text-muted">ISAC Mini Case Competition 2026 · Essential Sprint</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill tone="amber"><Clock className="h-3 w-3" /> Deadline 4 Agu 2026</Pill>
              <Pill tone="blue">2 sesi</Pill>
            </div>
          </div>
          <ReadinessRing value={64} label="Readiness" />
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="overflow-hidden border-electric/30">
            <div className="flex items-center gap-2 bg-lightblue px-4 py-2.5">
              <Sparkles className="h-4 w-4 text-electric" />
              <span className="text-xs font-bold uppercase text-navy">Analisis AI terbaru — validasi temuan</span>
            </div>
            <div className="space-y-3 p-4">
              {findings.map((f) => (
                <div key={f.id} className={cx("rounded-xl border p-4", f.validatedBy ? "border-teal/40 bg-lightteal/40" : "border-line")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={sevTone[f.severity]}>{f.severity === "high" ? "Kritis" : f.severity === "medium" ? "Sedang" : "Ringan"}</Pill>
                    <Pill tone="gray">{f.page}</Pill>
                    {f.validatedBy && <MentorValidationBadge name={f.validatedBy} at={f.validatedAt} />}
                  </div>
                  <p className="mt-2 text-sm font-medium">{f.text}</p>
                  {!f.validatedBy ? (
                    <Button size="sm" className="mt-3" onClick={() => { validateFinding(f.id); toast("Temuan divalidasi — tercermin di workspace pelanggan"); }}>
                      <BadgeCheck className="h-4 w-4" /> Validasi temuan
                    </Button>
                  ) : (
                    <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal"><Check className="h-3.5 w-3.5" /> Mentor Validated · {f.validatedBy}, {f.validatedAt}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="mb-3 text-sm font-bold">Action plan mentee</p>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-xl border border-line px-4 py-2.5 text-sm">
                  <span className={cx("h-2 w-2 rounded-full", t.status === "done" ? "bg-teal" : t.status === "review" ? "bg-amber-400" : "bg-electric")} />
                  <span className="flex-1">{t.title}</span>
                  {t.validatedBy ? <MentorValidationBadge name={t.validatedBy} /> : <Pill tone="gray">{t.status === "review" ? "Perlu review" : t.status === "done" ? "Selesai" : "Aktif"}</Pill>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Brief pelanggan</p>
            <p className="text-sm text-muted">Draft proposal tersedia. Fokus: pisahkan root cause dari symptom, validasi solusi, selesaikan revisi dalam 12 hari.</p>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Aksi mentor</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => toast("Revisi diminta")}> <RotateCcw className="h-4 w-4" /> Minta revisi</Button>
              <Button variant="outline" className="w-full" onClick={() => toast("Tugas ditandai sudah direview")}> <ClipboardCheck className="h-4 w-4" /> Tandai tugas direview</Button>
              <Button variant="outline" className="w-full" onClick={() => toast("Agenda sesi disiapkan")}> <Clock className="h-4 w-4" /> Siapkan agenda sesi</Button>
            </div>
            <div className="mt-3">
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-muted"><StickyNote className="h-3.5 w-3.5" /> Catatan strategis</p>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} className="h-20 w-full rounded-xl border border-line p-2 text-sm" placeholder="Tulis catatan untuk mentee…" />
              <Button size="sm" className="mt-1 w-full" onClick={() => { if (note.trim()) { toast("Catatan strategis terkirim"); setNote(""); } }}>Kirim catatan</Button>
            </div>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Riwayat sesi</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>• 25 Jul — Problem & Analysis (akan datang)</li>
              <li>• 1 Agu — Solution Refinement (terjadwal)</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
