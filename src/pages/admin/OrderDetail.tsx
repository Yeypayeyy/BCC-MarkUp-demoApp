import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, Sparkles, AlertTriangle, UserCheck, CalendarCheck, Send, Package, StickyNote } from "lucide-react";
import { Button, Card, Modal, Pill } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

export default function OrderDetail() {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const { order, extraOrders, approveMentor, confirmSchedule, releaseResources, toast } = useDemo();
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [note, setNote] = useState("");

  const o = id === order.id ? order : extraOrders.find((x) => x.id === id);
  if (!o) {
    return <Card className="p-8 text-center text-sm text-muted">Order tidak ditemukan. <Link to="/admin/orders" className="text-electric">Kembali</Link></Card>;
  }
  const isMain = o.id === order.id;

  const checklist = [
    { t: "Pembayaran terverifikasi", done: o.payment === "Terverifikasi" },
    { t: "Brief pelanggan diringkas", done: true },
    { t: "Rekomendasi mentor disetujui admin", done: o.mentorApproved },
    { t: "Konfirmasi jadwal", done: o.scheduleConfirmed },
    { t: "Distribusi resource", done: o.materials === "Terkirim" },
  ];

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link to="/admin/orders" className="hover:text-ink">Orders</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-ink">{o.id}</span>
      </nav>

      {/* header */}
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">{o.customer} · {o.team}</h2>
            <p className="mt-1 text-sm text-muted">{o.pkg}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill tone={o.payment === "Terverifikasi" ? "green" : "amber"}>Payment: {o.payment}</Pill>
              <Pill tone="gray">Deadline: 4 Agu 2026</Pill>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-600">
            <AlertTriangle className="h-4 w-4" /> {o.status === "needs-approval" ? "Butuh tindakan admin" : "Risiko rendah"}
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* checklist */}
          <Card className="p-5">
            <p className="mb-3 text-sm font-bold">Checklist operasional</p>
            <ol className="space-y-2">
              {checklist.map((c, i) => (
                <li key={c.t} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${c.done ? "bg-teal text-white" : "bg-black/5 text-muted"}`}>
                    {c.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className={c.done ? "" : "text-muted"}>{c.t}</span>
                  {c.done && <Pill tone="green" className="ml-auto">Selesai</Pill>}
                </li>
              ))}
            </ol>
          </Card>

          {/* AI brief */}
          <Card className="overflow-hidden border-electric/30">
            <div className="flex items-center gap-2 bg-lightblue px-4 py-2.5">
              <Sparkles className="h-4 w-4 text-electric" />
              <span className="text-xs font-bold uppercase text-navy">Brief pelanggan (AI)</span>
            </div>
            <p className="p-4 text-sm text-muted">
              Tim Semleketep mengikuti BCC dengan draft proposal yang sudah tersedia. Fokus utama mereka
              adalah memisahkan root cause dari symptoms, memvalidasi solusi, dan menyelesaikan revisi
              dalam 12 hari.
            </p>
          </Card>
        </div>

        {/* admin controls */}
        <Card className="p-5">
          <p className="mb-3 text-sm font-bold">Kontrol admin</p>
          <div className="space-y-2">
            {isMain && !o.mentorApproved ? (
              <Button className="w-full" onClick={() => setConfirmApprove(true)}>
                <UserCheck className="h-4 w-4" /> Approve Nadia Putri
              </Button>
            ) : (
              <Button className="w-full" variant="secondary" disabled>
                <Check className="h-4 w-4" /> Mentor disetujui
              </Button>
            )}
            <Button className="w-full" variant="outline" onClick={() => toast("Pilih mentor lain (demo)", "info")}>Pilih mentor berbeda</Button>
            <Button className="w-full" variant="outline" disabled={!o.mentorApproved || o.scheduleConfirmed} onClick={() => { confirmSchedule(); toast("Jadwal dikonfirmasi"); }}>
              <CalendarCheck className="h-4 w-4" /> Konfirmasi jadwal
            </Button>
            <Button className="w-full" variant="outline" onClick={() => toast("Pesan onboarding terkirim")}> <Send className="h-4 w-4" /> Kirim pesan onboarding</Button>
            <Button className="w-full" variant="outline" disabled={o.materials === "Terkirim"} onClick={() => { releaseResources(); toast("Resource paket dirilis"); }}>
              <Package className="h-4 w-4" /> Rilis resource paket
            </Button>
          </div>

          <div className="mt-4">
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-muted"><StickyNote className="h-3.5 w-3.5" /> Catatan internal</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="h-20 w-full rounded-xl border border-line p-2 text-sm" placeholder="Catatan admin…" />
            <Button size="sm" variant="ghost" className="mt-1 w-full" onClick={() => { if (note.trim()) { toast("Catatan tersimpan"); setNote(""); } }}>Simpan catatan</Button>
          </div>
        </Card>
      </div>

      <Modal
        open={confirmApprove}
        onClose={() => setConfirmApprove(false)}
        title="Setujui mentor"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmApprove(false)}>Batal</Button>
            <Button onClick={() => { approveMentor(); setConfirmApprove(false); toast("Nadia Putri disetujui sebagai mentor"); }}>Approve</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Setujui <b>Nadia Putri</b> (rekomendasi AI) sebagai mentor untuk {o.team}? Ini akan membuka
          langkah konfirmasi jadwal dan tercermin di workspace pelanggan.
        </p>
      </Modal>
    </div>
  );
}
