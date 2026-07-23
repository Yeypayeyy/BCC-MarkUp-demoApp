import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Sparkles, Plus, MessageSquare, Check } from "lucide-react";
import { Button, Card, Pill, Skeleton, cx } from "@/components/ui";
import { ReadinessRing, Notice } from "@/components/widgets";
import { ProjectShell } from "./ProjectShell";
import { useDemo } from "@/store/DemoContext";
import type { Severity } from "@/data/types";

const sevTone: Record<Severity, "red" | "amber" | "blue"> = { high: "red", medium: "amber", low: "blue" };
const sevLabel: Record<Severity, string> = { high: "Kritis", medium: "Sedang", low: "Ringan" };

export default function Documents() {
  const nav = useNavigate();
  const { findings, docAnalyzed, setDocAnalyzed, addTaskFromFinding, tasks, toast } = useDemo();
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const analyze = () => {
    setUploaded(true);
    setLoading(true);
    setDocAnalyzed(false);
    setTimeout(() => {
      setLoading(false);
      setDocAnalyzed(true);
      toast("Analisis dokumen selesai");
    }, 1300);
  };

  return (
    <ProjectShell>
      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: upload + versions */}
        <div className="space-y-5">
          <Card className="p-5">
            <p className="mb-3 text-sm font-bold">Upload dokumen</p>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-appbg px-4 py-8 text-center">
              <Upload className="h-6 w-6 text-muted" />
              <p className="mt-2 text-sm font-semibold">Tarik & letakkan file di sini</p>
              <p className="text-xs text-muted">PDF, DOCX, PPTX</p>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-line p-3">
              <FileText className="h-8 w-8 text-electric" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Proposal_Semleketep_v2.pdf</p>
                <p className="text-xs text-muted">Diperbarui 22 Jul 2026</p>
              </div>
              <Pill tone={docAnalyzed && !loading ? "green" : "amber"}>{loading ? "Analyzing" : docAnalyzed ? "Analyzed" : "Ready"}</Pill>
            </div>
            <Button className="mt-3 w-full" onClick={analyze} disabled={loading}>
              <Sparkles className="h-4 w-4" /> {loading ? "Menganalisis…" : "Analisis Dokumen"}
            </Button>
            {uploaded && !loading && (
              <p className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-teal"><Check className="h-3.5 w-3.5" /> Upload berhasil</p>
            )}
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Version history</p>
            <ul className="space-y-2 text-sm">
              {[["v2", "22 Jul 2026", "Analyzed"], ["v1", "18 Jul 2026", "Archived"]].map(([v, d, s]) => (
                <li key={v} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <span className="font-semibold">{v}</span>
                  <span className="text-xs text-muted">{d}</span>
                  <Pill tone={s === "Analyzed" ? "green" : "gray"}>{s}</Pill>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* right: analysis */}
        <div className="space-y-5 lg:col-span-2">
          {loading ? (
            <Card className="space-y-3 p-5">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <p className="text-center text-sm text-muted">AI sedang menganalisis dokumen…</p>
            </Card>
          ) : (
            <>
              <Card className="p-5">
                <div className="flex items-center gap-4">
                  <ReadinessRing value={64} label="Readiness" />
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy">
                      <Sparkles className="h-4 w-4 text-electric" /> Hasil Analisis AI
                    </div>
                    <p className="mt-1 text-sm text-muted">Proposal_Semleketep_v2.pdf</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-bold text-teal">Sudah kuat</p>
                    <ul className="space-y-1.5 text-sm">
                      {["Konteks masalah didukung fakta relevan", "Solusi sejalan dengan tema kompetisi", "Tahap implementasi awal sudah terlihat"].map((s) => (
                        <li key={s} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold text-amber-600">Perlu diperbaiki</p>
                    <ul className="space-y-1.5 text-sm text-muted">
                      {["Root cause masih bercampur symptom", "Keterkaitan root cause–solusi belum eksplisit", "Asumsi finansial perlu justifikasi", "Metrik dampak belum terukur"].map((s) => (
                        <li key={s} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <p className="mb-3 text-sm font-bold">Temuan & tindakan yang disarankan</p>
                <div className="space-y-3">
                  {findings.map((f) => {
                    const added = tasks.some((t) => t.id === "task-" + f.id);
                    return (
                      <div key={f.id} className={cx("rounded-xl border p-4", f.validatedBy ? "border-teal/40 bg-lightteal/40" : "border-line")}>
                        <div className="flex flex-wrap items-center gap-2">
                          <Pill tone={sevTone[f.severity]}>{sevLabel[f.severity]}</Pill>
                          <Pill tone="gray">{f.page}</Pill>
                          {f.validatedBy && <Pill tone="teal">Validated by {f.validatedBy}</Pill>}
                        </div>
                        <p className="mt-2 text-sm font-medium">{f.text}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button size="sm" variant={added ? "secondary" : "outline"} disabled={added} onClick={() => { addTaskFromFinding(f.id); toast("Ditambahkan ke action plan"); }}>
                            {added ? <><Check className="h-4 w-4" /> Di action plan</> : <><Plus className="h-4 w-4" /> Add to Action Plan</>}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => nav("/app/project/semleketep/copilot")}>
                            <MessageSquare className="h-4 w-4" /> Ask Copilot
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Notice>Analisis AI adalah tinjauan awal. Validasi akhir dilakukan bersama mentor.</Notice>
            </>
          )}
        </div>
      </div>
    </ProjectShell>
  );
}
