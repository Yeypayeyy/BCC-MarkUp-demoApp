import { Video, Clock } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const SESSIONS = [
  { day: "Sab", time: "13.00–14.00", team: "Tim Semleketep", title: "Problem & Analysis" },
  { day: "Sab", time: "16.00–17.00", team: "Tim Nusantara", title: "Solution Refinement" },
  { day: "Min", time: "10.00–11.00", team: "Career (Salsabila)", title: "Career Foundations" },
];

export default function Schedule() {
  const { toast } = useDemo();
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold">Jadwal Saya</h2>

      <Card className="overflow-x-auto p-5">
        <div className="grid min-w-[700px] grid-cols-7 gap-3">
          {DAYS.map((d) => (
            <div key={d}>
              <p className="mb-2 text-center text-sm font-bold text-muted">{d}</p>
              <div className="min-h-[100px] space-y-2 rounded-xl bg-appbg p-2">
                {SESSIONS.filter((s) => s.day === d).map((s) => (
                  <div key={s.title} className="rounded-lg bg-lightteal px-2 py-1.5 text-xs font-semibold text-teal">{s.time.split("–")[0]} {s.team}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-sm font-bold">Sesi mendatang</p>
        <div className="space-y-2">
          {SESSIONS.map((s) => (
            <div key={s.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="flex items-center gap-1 text-xs text-muted"><Clock className="h-3 w-3" /> {s.day} · {s.time} WIB · {s.team}</p>
              </div>
              <div className="flex gap-2">
                <Pill tone="purple">Terjadwal</Pill>
                <Button size="sm" onClick={() => toast("Membuka ruang sesi (demo)")}><Video className="h-4 w-4" /> Mulai</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
