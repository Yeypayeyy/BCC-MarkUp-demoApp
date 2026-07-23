import { Card, Button, Pill } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

export default function Profile() {
  const { toast } = useDemo();
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">F</div>
          <div>
            <h2 className="text-xl font-extrabold">Faaid</h2>
            <p className="text-sm text-muted">Tim Semleketep · Mahasiswa</p>
            <Pill tone="blue" className="mt-1">Essential Sprint</Pill>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <p className="mb-3 text-sm font-bold">Informasi kontak</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[["Nama", "Faaid"], ["Email", "faaid@student.ac.id"], ["WhatsApp", "0812-3456-7890"], ["Tim", "Semleketep"]].map(([k, v]) => (
            <label key={k} className="block text-sm">
              <span className="mb-1 block text-xs font-semibold text-muted">{k}</span>
              <input defaultValue={v} className="h-11 w-full rounded-xl border border-line px-3" />
            </label>
          ))}
        </div>
        <Button className="mt-4" onClick={() => toast("Profil tersimpan")}>Simpan perubahan</Button>
      </Card>

      <Card className="p-6">
        <p className="mb-3 text-sm font-bold">Preferensi</p>
        <div className="space-y-2 text-sm">
          {["Notifikasi email sesi", "Pengingat WhatsApp", "Ringkasan progres mingguan"].map((p, i) => (
            <label key={p} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
              {p}
              <input type="checkbox" defaultChecked={i < 2} className="h-5 w-5 accent-electric" />
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
