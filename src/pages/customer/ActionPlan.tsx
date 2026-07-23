import { useState } from "react";
import { Plus, MessageCircle, FileText, ChevronRight } from "lucide-react";
import { Button, Card, Modal, Pill, cx } from "@/components/ui";
import { MentorValidationBadge } from "@/components/widgets";
import { ProjectShell } from "./ProjectShell";
import { useDemo } from "@/store/DemoContext";
import type { Task, TaskStatus } from "@/data/types";

const COLS: { id: TaskStatus; label: string; tone: string }[] = [
  { id: "todo", label: "To Do", tone: "bg-black/5" },
  { id: "inprogress", label: "In Progress", tone: "bg-lightblue" },
  { id: "review", label: "Need Mentor Review", tone: "bg-yellow/20" },
  { id: "done", label: "Done", tone: "bg-lightteal" },
];

const NEXT: Record<TaskStatus, TaskStatus | null> = { todo: "inprogress", inprogress: "review", review: "done", done: null };

export default function ActionPlan() {
  const { tasks, moveTask, addTask, toast } = useDemo();
  const [open, setOpen] = useState<Task | null>(null);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <ProjectShell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold">{done} dari {tasks.length} selesai</p>
          <Pill tone="teal">On track</Pill>
        </div>
        <Button size="sm" onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Tambah tugas</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLS.map((col) => {
          const items = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="rounded-2xl bg-white/60 p-2">
              <div className={cx("mb-2 flex items-center justify-between rounded-xl px-3 py-2", col.tone)}>
                <span className="text-sm font-bold">{col.label}</span>
                <span className="text-xs font-semibold text-muted">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((t) => (
                  <Card key={t.id} className="p-3">
                    <button onClick={() => setOpen(t)} className="block w-full text-left">
                      <p className="text-sm font-semibold">{t.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <Pill tone={t.priority === "Tinggi" ? "red" : t.priority === "Sedang" ? "amber" : "gray"}>{t.priority}</Pill>
                        <Pill tone={t.source === "AI" ? "blue" : t.source === "Mentor" ? "teal" : "gray"}>{t.source}</Pill>
                      </div>
                      {t.validatedBy && <div className="mt-2"><MentorValidationBadge name={t.validatedBy} at={t.validatedAt} /></div>}
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                        <span>{t.due}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{t.comments}</span>
                      </div>
                    </button>
                    {NEXT[t.status] && (
                      <Button size="sm" variant="ghost" className="mt-2 h-8 w-full justify-between px-2 text-xs" onClick={() => { moveTask(t.id, NEXT[t.status]!); toast("Tugas dipindahkan"); }}>
                        Pindah ke {COLS.find((c) => c.id === NEXT[t.status])?.label}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </Card>
                ))}
                {items.length === 0 && <p className="px-2 py-4 text-center text-xs text-muted">Kosong</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* task detail */}
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title} wide>
        {open && (
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <Pill tone="blue">{open.source}</Pill>
              <Pill tone={open.priority === "Tinggi" ? "red" : "amber"}>{open.priority}</Pill>
              {open.validatedBy && <MentorValidationBadge name={open.validatedBy} at={open.validatedAt} />}
            </div>
            <dl className="divide-y divide-line rounded-xl border border-line">
              {[["Due date", open.due], ["Assignee", open.assignee], ["Related doc", open.relatedDoc], ["Komentar", String(open.comments)]].map(([k, v]) => (
                <div key={k} className="flex justify-between px-3 py-2"><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
            {open.relatedDoc !== "—" && (
              <div className="flex items-center gap-2 rounded-lg bg-appbg px-3 py-2 text-muted"><FileText className="h-4 w-4" />{open.relatedDoc}</div>
            )}
            <div className="flex gap-2 pt-2">
              {open.status !== "review" && open.status !== "done" && (
                <Button variant="outline" onClick={() => { moveTask(open.id, "review"); toast("Diminta validasi mentor"); setOpen(null); }}>Minta validasi mentor</Button>
              )}
              {NEXT[open.status] && (
                <Button onClick={() => { moveTask(open.id, NEXT[open.status]!); setOpen(null); toast("Tugas diperbarui"); }}>Pindahkan</Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* add */}
      <Modal open={adding} onClose={() => setAdding(false)} title="Tambah tugas" footer={
        <>
          <Button variant="outline" onClick={() => setAdding(false)}>Batal</Button>
          <Button onClick={() => { if (title.trim()) { addTask(title); setTitle(""); setAdding(false); toast("Tugas ditambahkan"); } }}>Tambah</Button>
        </>
      }>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold text-muted">Judul tugas</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 w-full rounded-xl border border-line px-3" placeholder="Mis. Perkuat asumsi finansial" />
        </label>
      </Modal>
    </ProjectShell>
  );
}
