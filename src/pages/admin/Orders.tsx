import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Pill, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";
import type { Order } from "@/data/types";

const FILTERS = ["Semua", "Perlu tindakan", "Payment", "Mentor", "Scheduling", "Active", "Completed"];

const statusPill = (o: Order) => {
  switch (o.status) {
    case "needs-approval": return <Pill tone="amber">Perlu approval admin</Pill>;
    case "mentor-approved": return <Pill tone="blue">Mentor disetujui</Pill>;
    case "scheduled": return <Pill tone="purple">Terjadwal</Pill>;
    case "active": return <Pill tone="teal">Aktif</Pill>;
    case "completed": return <Pill tone="green">Selesai</Pill>;
  }
};

export default function Orders() {
  const nav = useNavigate();
  const { order, extraOrders } = useDemo();
  const [filter, setFilter] = useState("Semua");
  const all = [order, ...extraOrders];

  const list = useMemo(() => {
    switch (filter) {
      case "Perlu tindakan": return all.filter((o) => o.status === "needs-approval");
      case "Payment": return all.filter((o) => o.payment === "Menunggu");
      case "Mentor": return all.filter((o) => !o.mentorApproved);
      case "Scheduling": return all.filter((o) => !o.scheduleConfirmed && o.mentorApproved);
      case "Active": return all.filter((o) => o.status === "active");
      case "Completed": return all.filter((o) => o.status === "completed");
      default: return all;
    }
  }, [filter, all]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold">Orders</h2>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cx("rounded-full px-3 py-1.5 text-sm font-medium", filter === f ? "bg-navy text-white" : "border border-line bg-white")}>{f}</button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line bg-appbg text-left text-xs uppercase text-muted">
                {["Order ID", "Customer", "Paket", "Payment", "Mentor", "Jadwal", "Materi", "Status"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} onClick={() => nav(`/admin/orders/${o.id}`)} className="cursor-pointer border-b border-line hover:bg-appbg">
                  <td className="px-4 py-3 font-semibold text-electric">{o.id}</td>
                  <td className="px-4 py-3">{o.customer}<span className="block text-xs text-muted">{o.team}</span></td>
                  <td className="px-4 py-3">{o.pkg}</td>
                  <td className="px-4 py-3"><Pill tone={o.payment === "Terverifikasi" ? "green" : "amber"}>{o.payment}</Pill></td>
                  <td className="px-4 py-3">{o.mentorApproved ? o.mentor : <span className="text-muted">{o.mentor === "—" ? "—" : `${o.mentor} (rekomendasi)`}</span>}</td>
                  <td className="px-4 py-3 text-muted">{o.schedule}</td>
                  <td className="px-4 py-3"><Pill tone={o.materials === "Terkirim" ? "green" : "amber"}>{o.materials}</Pill></td>
                  <td className="px-4 py-3">{statusPill(o)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {list.length === 0 && <Card className="p-8 text-center text-sm text-muted">Tidak ada order pada filter ini.</Card>}
    </div>
  );
}
