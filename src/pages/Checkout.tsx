import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Loader2, Check } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Modal, Pill, cx } from "@/components/ui";
import { getPackage, rupiah } from "@/data/packages";
import { useDemo } from "@/store/DemoContext";

export default function Checkout() {
  const { slug = "" } = useParams();
  const nav = useNavigate();
  const { setPaymentDone, toast } = useDemo();
  const pkg = getPackage(slug) ?? getPackage("essential-sprint")!;
  const [pay, setPay] = useState("QRIS");
  const [mentorPref, setMentorPref] = useState("recommended");
  const [confirm, setConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);

  const doPay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirm(false);
      setPaymentDone(true);
      toast("Pembayaran terverifikasi");
      nav("/payment-success");
    }, 1400);
  };

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-extrabold">Checkout — {pkg.name}</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Block title="Kontak">
              <Grid>
                <Input label="Nama lengkap" defaultValue="Faaid" />
                <Input label="Email" defaultValue="faaid@student.ac.id" />
                <Input label="Nomor WhatsApp" defaultValue="0812-3456-7890" />
                <Input label="Nama tim" defaultValue="Semleketep" />
                <Input label="Jumlah anggota" defaultValue="3" />
              </Grid>
            </Block>

            <Block title="Detail kompetisi">
              <Grid>
                <Input label="Nama kompetisi" defaultValue="ISAC Mini Case Competition 2026" />
                <Input label="Penyelenggara" defaultValue="ISAC" />
                <Input label="Deadline submission" type="date" defaultValue="2026-08-04" />
              </Grid>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <FileDrop label="Upload guidebook" />
                <FileDrop label="Upload dokumen saat ini" />
              </div>
            </Block>

            <Block title="Preferensi jadwal">
              <Grid>
                <Select label="Preferensi hari" opts={["Weekend", "Weekday", "Fleksibel"]} />
                <Select label="Preferensi waktu" opts={["Siang (13.00–15.00)", "Sore (16.00–18.00)", "Malam (19.00–21.00)"]} />
                <Input label="Zona waktu" defaultValue="WIB" readOnly />
              </Grid>
            </Block>

            <Block title="Preferensi mentor">
              <div className="space-y-2">
                {[
                  ["recommended", "Gunakan mentor rekomendasi (Nadia Putri)"],
                  ["choose", "Pilih mentor lain"],
                  ["admin", "Biarkan admin yang menentukan"],
                ].map(([v, l]) => (
                  <label key={v} className={cx("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium", mentorPref === v ? "border-electric bg-lightblue" : "border-line")}>
                    <input type="radio" name="mentor" checked={mentorPref === v} onChange={() => setMentorPref(v)} className="accent-electric" />
                    {l}
                  </label>
                ))}
              </div>
            </Block>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-sm font-bold">Ringkasan pesanan</p>
              <div className="mt-3 space-y-2 text-sm">
                <Line l={pkg.name} r={rupiah(pkg.price)} />
                <Line l="Platform fee" r={rupiah(0)} />
                <div className="my-2 border-t border-line" />
                <Line l={<b>Total</b>} r={<b className="text-lg text-navy">{rupiah(pkg.price)}</b>} />
              </div>

              <p className="mt-4 text-sm font-bold">Metode pembayaran</p>
              <div className="mt-2 space-y-2">
                {["Bank Transfer", "QRIS", "E-wallet"].map((m) => (
                  <label key={m} className={cx("flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium", pay === m ? "border-electric bg-lightblue" : "border-line")}>
                    <input type="radio" name="pay" checked={pay === m} onChange={() => setPay(m)} className="accent-electric" />
                    {m}
                  </label>
                ))}
              </div>

              <Button className="mt-4 w-full" size="lg" onClick={() => setConfirm(true)}>
                Bayar {rupiah(pkg.price)}
              </Button>
              <p className="mt-2 text-center text-xs text-muted">Pembayaran ini adalah simulasi (mock).</p>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        open={confirm}
        onClose={() => !processing && setConfirm(false)}
        title="Konfirmasi pembayaran"
        footer={
          !processing && (
            <>
              <Button variant="outline" onClick={() => setConfirm(false)}>Batal</Button>
              <Button onClick={doPay}>Konfirmasi & Bayar</Button>
            </>
          )
        }
      >
        {processing ? (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-electric" />
            <p className="mt-3 font-semibold">Memproses pembayaran…</p>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Pill tone="blue">{pkg.category}</Pill><span className="font-bold">{pkg.name}</span></div>
            <Line l="Metode" r={pay} />
            <Line l="Total" r={<b>{rupiah(pkg.price)}</b>} />
            <p className="pt-2 text-muted">Lanjutkan untuk menyelesaikan pembayaran simulasi.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm font-bold">{title}</p>
      {children}
    </Card>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
function Input({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <input className="h-11 w-full rounded-xl border border-line px-3" {...p} />
    </label>
  );
}
function Select({ label, opts }: { label: string; opts: string[] }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <select className="h-11 w-full rounded-xl border border-line bg-white px-3">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}
function FileDrop({ label }: { label: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <button
      type="button"
      onClick={() => setName("dokumen_terpilih.pdf")}
      className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-appbg px-4 py-5 text-sm hover:border-electric"
    >
      {name ? <Check className="h-5 w-5 text-teal" /> : <Upload className="h-5 w-5 text-muted" />}
      <span className="font-medium">{name ?? label}</span>
      <span className="text-xs text-muted">{name ? "Terpilih (demo)" : "PDF / DOCX · klik untuk pilih"}</span>
    </button>
  );
}
function Line({ l, r }: { l: React.ReactNode; r: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{l}</span>
      <span>{r}</span>
    </div>
  );
}
