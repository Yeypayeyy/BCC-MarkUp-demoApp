import { useNavigate } from "react-router-dom";
import { FileCheck, Sparkles } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

export default function Reviews() {
  const nav = useNavigate();
  const { findings } = useDemo();
  const pending = findings.filter((f) => !f.validatedBy);
  const validated = findings.filter((f) => f.validatedBy);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold">Antrian Review</h2>

      <Card className="p-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-electric" /> Menunggu validasi ({pending.length})</p>
        {pending.length === 0 ? (
          <p className="text-sm text-muted">Semua temuan sudah tervalidasi. 🎉</p>
        ) : (
          <div className="space-y-2">
            {pending.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm">
                <FileCheck className="h-4 w-4 text-amber-500" />
                <span className="flex-1">{f.text}</span>
                <Pill tone="gray">Semleketep · {f.page}</Pill>
                <Button size="sm" onClick={() => nav("/mentor/mentees/semleketep")}>Review</Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-sm font-bold">Sudah divalidasi ({validated.length})</p>
        {validated.length === 0 ? (
          <p className="text-sm text-muted">Belum ada.</p>
        ) : (
          <div className="space-y-2">
            {validated.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-xl border border-teal/40 bg-lightteal/40 px-4 py-3 text-sm">
                <span className="flex-1">{f.text}</span>
                <Pill tone="teal">Validated · {f.validatedAt}</Pill>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
