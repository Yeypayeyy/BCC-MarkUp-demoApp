import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Pill } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

export default function PaymentSuccess() {
  const nav = useNavigate();
  const { setRole } = useDemo();
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lightteal">
          <CheckCircle2 className="h-11 w-11 text-teal" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold">Pembayaran berhasil 🎉</h1>
        <p className="mt-1 text-muted">Order kamu sudah kami terima dan sedang diproses.</p>

        <Card className="mt-6 p-5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Order ID</span>
            <span className="font-bold">MU-260723-021</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted">Status</span>
            <Pill tone="green">Pembayaran terverifikasi</Pill>
          </div>

          <p className="mt-5 text-sm font-bold">Langkah selanjutnya</p>
          <ol className="mt-2 space-y-2">
            {["Lengkapi dokumen", "Admin mengonfirmasi mentor", "Pilih jadwal final", "Mulai persiapan"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </Card>

        <Button
          size="lg"
          className="mt-6 w-full"
          onClick={() => {
            setRole("customer");
            nav("/app/overview");
          }}
        >
          Masuk ke Workspace <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
