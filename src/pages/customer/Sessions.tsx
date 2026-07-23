import { useState } from "react";
import { Calendar, Video, Lock, Star, Clock, CheckCircle2, List } from "lucide-react";
import { Button, Card, Modal, Pill, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";
import type { Session } from "@/data/types";

export default function Sessions() {
  const { sessions, toast } = useDemo();
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [reschedule, setReschedule] = useState<Session | null>(null);
  const [rating, setRating] = useState<Session | null>(null);
  const [stars, setStars] = useState(5);

  const upcoming = sessions.filter((s) => s.status !== "completed");
  const completed = sessions.filter((s) => s.status === "completed");
  const list = tab === "upcoming" ? upcoming : completed;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["upcoming", "completed"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cx("rounded-full px-4 py-2 text-sm font-semibold", tab === t ? "bg-navy text-white" : "border border-line bg-white")}>
              {t === "upcoming" ? "Akan datang" : "Selesai"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-xl border border-line bg-white p-1">
          <button onClick={() => setView("list")} className={cx("rounded-lg p-2", view === "list" && "bg-lightblue text-electric")} aria-label="List"><List className="h-4 w-4" /></button>
          <button onClick={() => setView("calendar")} className={cx("rounded-lg p-2", view === "calendar" && "bg-lightblue text-electric")} aria-label="Kalender"><Calendar className="h-4 w-4" /></button>
        </div>
      </div>

      {list.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted">Belum ada sesi di tab ini.</Card>
      ) : view === "calendar" ? (
        <Card className="p-5">
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => <div key={d} className="font-bold text-muted">{d}</div>)}
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const has = day === 25 || day === 1;
              return (
                <div key={i} className={cx("aspect-square rounded-lg border p-1 text-left", has ? "border-electric bg-lightblue" : "border-line")}>
                  <span className="text-[10px]">{day}</span>
                  {has && <p className="mt-1 truncate text-[9px] font-semibold text-electric">Sesi</p>}
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((s) => (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold">{s.title}</p>
                  <p className="text-sm text-muted">{s.mentor}</p>
                </div>
                <Pill tone={s.status === "upcoming" ? "purple" : s.status === "locked" ? "gray" : "blue"}>
                  {s.status === "upcoming" ? "Akan datang" : s.status === "locked" ? "Terkunci" : s.status === "scheduled" ? "Terjadwal" : "Selesai"}
                </Pill>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                <Clock className="h-4 w-4" /> {s.date} · {s.time}
              </div>
              <div className="mt-3 rounded-xl bg-appbg p-3">
                <p className="text-xs font-bold text-muted">Persiapan sesi</p>
                <ul className="mt-1 space-y-1 text-sm">
                  {s.agenda.map((a) => (
                    <li key={a} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal" />{a}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.status === "locked" ? (
                  <Button size="sm" variant="outline" disabled><Lock className="h-4 w-4" /> Terkunci hingga finalis</Button>
                ) : (
                  <>
                    <Button size="sm" onClick={() => toast("Membuka ruang sesi (demo)")}><Video className="h-4 w-4" /> Join sesi</Button>
                    <Button size="sm" variant="outline" onClick={() => setReschedule(s)}>Reschedule</Button>
                    <Button size="sm" variant="ghost" onClick={() => setRating(s)}><Star className="h-4 w-4" /> Beri catatan</Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!reschedule} onClose={() => setReschedule(null)} title="Reschedule sesi" footer={
        <>
          <Button variant="outline" onClick={() => setReschedule(null)}>Batal</Button>
          <Button onClick={() => { setReschedule(null); toast("Permintaan reschedule terkirim"); }}>Kirim permintaan</Button>
        </>
      }>
        <p className="text-sm text-muted">Pilih preferensi jadwal baru untuk {reschedule?.title}.</p>
        <input type="date" defaultValue="2026-07-26" className="mt-3 h-11 w-full rounded-xl border border-line px-3" />
        <select className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3">
          <option>13.00–14.00 WIB</option><option>16.00–17.00 WIB</option><option>19.00–20.00 WIB</option>
        </select>
      </Modal>

      <Modal open={!!rating} onClose={() => setRating(null)} title="Catatan & rating sesi" footer={
        <>
          <Button variant="outline" onClick={() => setRating(null)}>Batal</Button>
          <Button onClick={() => { setRating(null); toast("Catatan sesi tersimpan"); }}>Simpan</Button>
        </>
      }>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)} aria-label={`${n} bintang`}>
              <Star className={cx("h-7 w-7", n <= stars ? "fill-yellow text-yellow" : "text-line")} />
            </button>
          ))}
        </div>
        <textarea className="mt-3 h-24 w-full rounded-xl border border-line p-3 text-sm" placeholder="Catatan setelah sesi…" />
      </Modal>
    </div>
  );
}
