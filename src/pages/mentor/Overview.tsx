import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileCheck, Users, ArrowRight } from "lucide-react";
import { Card, Pill, Button, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

export default function Overview() {
  const nav = useNavigate();
  const { findings, toast } = useDemo();
  const [available, setAvailable] = useState(true);
  const pendingReviews = findings.filter((f) => !f.validatedBy).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Calendar />, v: "2", l: "Sesi hari ini", tone: "bg-purple/10 text-purple" },
          { icon: <FileCheck />, v: String(pendingReviews), l: "Dokumen perlu review", tone: "bg-yellow/25 text-[#8a6d00]" },
          { icon: <Users />, v: "3", l: "Mentee butuh feedback", tone: "bg-lightblue text-electric" },
        ].map((m) => (
          <Card key={m.l} className="p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${m.tone}`}>{m.icon}</div>
            <p className="mt-3 text-3xl font-extrabold">{m.v}</p>
            <p className="text-sm text-muted">{m.l}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <p className="mb-3 text-sm font-bold">Sesi hari ini</p>
          <div className="space-y-2">
            {[["13.00–14.00", "Tim Semleketep", "Problem & Analysis Review"], ["16.00–17.00", "Tim Nusantara", "Solution Refinement"]].map(([time, team, title]) => (
              <div key={team} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted">{team} · {time} WIB</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => nav("/mentor/mentees/semleketep")}>Buka</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="mb-3 text-sm font-bold">Ketersediaan</p>
          <button onClick={() => { setAvailable((a) => !a); toast(available ? "Status: tidak tersedia" : "Status: tersedia", "info"); }} className={cx("flex w-full items-center justify-between rounded-xl border px-4 py-3", available ? "border-teal/40 bg-lightteal" : "border-line")}>
            <span className="text-sm font-semibold">{available ? "Tersedia menerima mentee" : "Tidak tersedia"}</span>
            <span className={cx("relative h-6 w-11 rounded-full transition-colors", available ? "bg-teal" : "bg-line")}>
              <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all", available ? "left-[22px]" : "left-0.5")} />
            </span>
          </button>
          <div className="mt-4 rounded-xl bg-appbg p-3">
            <p className="text-xs font-bold text-muted">Mentee perlu perhatian</p>
            <button onClick={() => nav("/mentor/mentees/semleketep")} className="mt-2 flex w-full items-center justify-between text-sm font-semibold text-electric">
              Tim Semleketep <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {pendingReviews === 0 && <Pill tone="teal" className="mt-3">Semua temuan tervalidasi</Pill>}
        </Card>
      </div>
    </div>
  );
}
