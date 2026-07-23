import { useMemo, useState } from "react";
import { Search, Lock, Bookmark, FileText, X } from "lucide-react";
import { Button, Card, Pill, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const CATS = ["Semua", "Guidebook Breakdown", "Business Frameworks", "Finalist Decks", "Pitching", "Q&A"];

interface Res { id: string; title: string; cat: string; locked: boolean; badge?: string; desc: string; }
const RESOURCES: Res[] = [
  { id: "r1", title: "Cara Membaca Guidebook BCC", cat: "Guidebook Breakdown", locked: false, desc: "Panduan memecah guidebook menjadi checklist yang bisa ditindaklanjuti." },
  { id: "r2", title: "Root Cause Analysis 101", cat: "Business Frameworks", locked: false, desc: "Teknik membedakan symptom dan root cause dengan 5 Why." },
  { id: "r3", title: "10 Framework Analisis Business Case", cat: "Business Frameworks", locked: true, badge: "PowerPack", desc: "Kumpulan framework fit-to-case untuk berbagai tipe kasus." },
  { id: "r4", title: "10 Deck Finalis Nasional", cat: "Finalist Decks", locked: true, badge: "PowerPack", desc: "Contoh deck finalis untuk referensi struktur & storytelling." },
  { id: "r5", title: "Struktur Pitch 5 Menit", cat: "Pitching", locked: false, desc: "Kerangka pitch yang efektif untuk presentasi juri." },
  { id: "r6", title: "Bank Pertanyaan Juri", cat: "Q&A", locked: false, desc: "Kumpulan pertanyaan umum juri beserta strategi menjawab." },
];

export default function Resources() {
  const { toast } = useDemo();
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");
  const [saved, setSaved] = useState<string[]>(["r2"]);
  const [drawer, setDrawer] = useState<Res | null>(null);

  const list = useMemo(
    () => RESOURCES.filter((r) => (cat === "Semua" || r.cat === cat) && r.title.toLowerCase().includes(q.toLowerCase())),
    [cat, q]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari resource…" className="h-11 w-full rounded-xl border border-line pl-9 pr-3 text-sm" />
        </div>
        <Pill tone="teal">{saved.length} tersimpan</Pill>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cx("rounded-full px-3 py-1.5 text-sm font-medium", cat === c ? "bg-navy text-white" : "border border-line bg-white")}>{c}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <Card key={r.id} className={cx("flex flex-col p-5", r.locked && "opacity-90")}>
            <div className="flex items-start justify-between">
              <FileText className="h-8 w-8 text-electric" />
              <button onClick={() => setSaved((s) => (s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id]))} aria-label="Simpan">
                <Bookmark className={cx("h-5 w-5", saved.includes(r.id) ? "fill-electric text-electric" : "text-muted")} />
              </button>
            </div>
            <p className="mt-3 font-bold">{r.title}</p>
            <p className="mt-1 flex-1 text-sm text-muted">{r.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <Pill tone="gray">{r.cat}</Pill>
              {r.locked ? (
                <Button size="sm" variant="outline" onClick={() => toast("Butuh paket PowerPack untuk membuka", "info")}><Lock className="h-4 w-4" /> {r.badge}</Button>
              ) : (
                <Button size="sm" variant="secondary" onClick={() => setDrawer(r)}>Buka</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setDrawer(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-soft animate-fade" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Pill tone="blue">{drawer.cat}</Pill>
              <button onClick={() => setDrawer(null)} aria-label="Tutup"><X className="h-5 w-5 text-muted" /></button>
            </div>
            <h2 className="mt-4 text-xl font-extrabold">{drawer.title}</h2>
            <p className="mt-2 text-sm text-muted">{drawer.desc}</p>
            <div className="mt-4 space-y-2 rounded-xl bg-appbg p-4 text-sm text-muted">
              <p>Konten resource ini ditampilkan sebagai demo. Pada versi penuh berisi materi lengkap, template, dan contoh.</p>
            </div>
            <Button className="mt-4 w-full">Tandai selesai dibaca</Button>
          </div>
        </div>
      )}
    </div>
  );
}
