import { Star } from "lucide-react";
import { Card, Pill } from "@/components/ui";
import { MENTORS } from "@/data/seed";

export default function Mentors() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold">Mentor Directory</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MENTORS.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-bold text-white">
                {m.name.split(" ").map((x) => x[0]).join("")}
              </div>
              <div>
                <p className="font-bold">{m.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted"><Star className="h-3 w-3 fill-yellow text-yellow" /> {m.rating} · {m.competitions}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{m.expertise}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-appbg px-3 py-2">
                <p className="text-xs text-muted">Mentee aktif</p>
                <p className="font-bold">{m.activeMentees}</p>
              </div>
              <div className="rounded-lg bg-appbg px-3 py-2">
                <p className="text-xs text-muted">Tersedia</p>
                <p className="font-bold">{m.availability}</p>
              </div>
            </div>
            <div className="mt-3">
              <Pill tone={m.capacity === "Tersedia" ? "green" : m.capacity === "Hampir penuh" ? "amber" : "red"}>{m.capacity}</Pill>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
