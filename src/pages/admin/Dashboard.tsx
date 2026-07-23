import { useNavigate } from "react-router-dom";
import { ClipboardList, UserCheck, CalendarClock, FileWarning, ArrowRight } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const FLOW = ["Order masuk", "Pembayaran", "Admin approval", "Mentor", "Jadwal", "Materi"];

export default function Dashboard() {
  const nav = useNavigate();
  const { order } = useDemo();

  const metrics = [
    { icon: <ClipboardList />, v: "12", l: "Order aktif", tone: "bg-lightblue text-electric" },
    { icon: <UserCheck />, v: order.mentorApproved ? "3" : "4", l: "Menunggu konfirmasi mentor", tone: "bg-yellow/25 text-[#8a6d00]" },
    { icon: <CalendarClock />, v: "3", l: "Sesi hari ini", tone: "bg-purple/10 text-purple" },
    { icon: <FileWarning />, v: "2", l: "Dokumen menunggu review", tone: "bg-pink text-magenta" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.l} className="p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${m.tone}`}>{m.icon}</div>
            <p className="mt-3 text-3xl font-extrabold">{m.v}</p>
            <p className="text-sm text-muted">{m.l}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <p className="mb-3 text-sm font-bold">Alur order terintegrasi</p>
        <div className="flex flex-wrap items-center gap-2">
          {FLOW.map((f, i) => (
            <div key={f} className="flex items-center gap-2">
              <span className="rounded-full bg-appbg px-3 py-1.5 text-sm font-semibold">{f}</span>
              {i < FLOW.length - 1 && <ArrowRight className="h-4 w-4 text-muted" />}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold">Order yang perlu perhatian</p>
          <Button size="sm" variant="secondary" onClick={() => nav("/admin/orders")}>Lihat semua</Button>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold">{order.id} · {order.team}</p>
              <p className="text-sm text-muted">{order.pkg} · Pembayaran {order.payment}</p>
            </div>
            <div className="flex items-center gap-2">
              <Pill tone={order.mentorApproved ? "teal" : "amber"}>{order.mentorApproved ? "Mentor disetujui" : "Perlu approval admin"}</Pill>
              <Button size="sm" onClick={() => nav(`/admin/orders/${order.id}`)}>Buka</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
