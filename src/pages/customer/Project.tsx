import { FileText, AlertTriangle } from "lucide-react";
import { Card, Pill } from "@/components/ui";
import { ProjectShell } from "./ProjectShell";
import { MentorValidationBadge } from "@/components/widgets";
import { useDemo } from "@/store/DemoContext";

export default function Project() {
  const { findings } = useDemo();
  const validated = findings.filter((f) => f.validatedBy);

  return (
    <ProjectShell>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="p-5">
            <p className="mb-3 text-sm font-bold">Milestone</p>
            <ol className="space-y-3">
              {[
                ["Registrasi & pembayaran", "done"],
                ["Onboarding & upload dokumen", "done"],
                ["Sesi 1: Problem & Analysis", "active"],
                ["Sesi 2: Solution Refinement", "upcoming"],
                ["Submission proposal", "upcoming"],
              ].map(([t, s]) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${s === "done" ? "bg-teal" : s === "active" ? "bg-electric" : "bg-line"}`} />
                  <span className={s === "upcoming" ? "text-muted" : "font-medium"}>{t}</span>
                  {s === "active" && <Pill tone="blue" className="ml-auto">Berlangsung</Pill>}
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Latest document</p>
            <div className="flex items-center gap-3 rounded-xl border border-line p-3">
              <FileText className="h-8 w-8 text-electric" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Proposal_Semleketep_v2.pdf</p>
                <p className="text-xs text-muted">Diperbarui 22 Jul 2026 · Analyzed</p>
              </div>
              <Pill tone="green">Analyzed</Pill>
            </div>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Aktivitas terbaru</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>• AI menyelesaikan analisis Proposal v2 — 64% readiness</li>
              <li>• 2 temuan ditambahkan ke action plan</li>
              <li>• Mentor Nadia menambahkan catatan strategis</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="mb-3 text-sm font-bold">Anggota tim</p>
            <div className="space-y-2">
              {["Faaid (Lead)", "Bening", "Rafi"].map((m) => (
                <div key={m} className="flex items-center gap-2 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{m[0]}</span>
                  {m}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-600">
              <AlertTriangle className="h-4 w-4" /> Blocker saat ini
            </div>
            <p className="text-sm text-muted">Keterkaitan root cause dan solusi belum eksplisit di proposal.</p>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Mentor brief</p>
            <p className="text-sm text-muted">Perkuat alur pembuktian: mengapa solusi ini paling tepat untuk root cause yang dipilih.</p>
            {validated.length > 0 && (
              <div className="mt-3">
                <MentorValidationBadge at={validated[0].validatedAt} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </ProjectShell>
  );
}
