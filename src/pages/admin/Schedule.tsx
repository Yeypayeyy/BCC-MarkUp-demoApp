import { AlertTriangle } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const EVENTS: Record<string, { t: string; mentor: string; tone: string; conflict?: boolean }[]> = {
  Rab: [{ t: "13.00 Raka · Tim Nusantara", mentor: "Raka", tone: "bg-lightblue text-electric" }],
  Sab: [
    { t: "13.00 Nadia · Semleketep", mentor: "Nadia", tone: "bg-lightteal text-teal" },
    { t: "13.00 Nadia · Tim Garuda", mentor: "Nadia", tone: "bg-red-50 text-red-500", conflict: true },
  ],
  Min: [{ t: "10.00 Alya · Career", mentor: "Alya", tone: "bg-purple/10 text-purple" }],
};

export default function Schedule() {
  const { toast } = useDemo();
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold">Jadwal Mingguan</h2>

      <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
        <AlertTriangle className="h-4 w-4" /> Konflik: Nadia memiliki 2 sesi bertumpuk Sabtu 13.00.
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => toast("Reschedule diajukan")}>Reschedule</Button>
      </div>

      <Card className="overflow-x-auto p-5">
        <div className="grid min-w-[720px] grid-cols-7 gap-3">
          {DAYS.map((d) => (
            <div key={d}>
              <p className="mb-2 text-center text-sm font-bold text-muted">{d}</p>
              <div className="min-h-[120px] space-y-2 rounded-xl bg-appbg p-2">
                {(EVENTS[d] ?? []).map((e, i) => (
                  <div key={i} className={`rounded-lg px-2 py-1.5 text-xs font-semibold ${e.tone}`}>
                    {e.t}
                    {e.conflict && <span className="ml-1">⚠</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-sm font-bold">Kapasitas mentor</p>
        <div className="space-y-3">
          {[["Nadia Putri", 3, 4], ["Raka Mahendra", 4, 5], ["Alya Ramadhani", 2, 5], ["Dimas Akbar", 5, 5]].map(([n, a, c]) => (
            <div key={n as string}>
              <div className="flex justify-between text-sm"><span>{n}</span><span className="text-muted">{a}/{c}</span></div>
              <div className="mt-1 h-2 w-full rounded-full bg-line">
                <div className={`h-2 rounded-full ${(a as number) >= (c as number) ? "bg-red-400" : "bg-electric"}`} style={{ width: `${((a as number) / (c as number)) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3"><Pill tone="red">Dimas Akbar penuh</Pill></div>
      </Card>
    </div>
  );
}
