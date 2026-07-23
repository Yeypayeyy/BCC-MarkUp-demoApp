import { useNavigate } from "react-router-dom";
import { User, Shield, GraduationCap } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button, Card } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";
import type { Role } from "@/data/types";

const ROLES: { id: Role; label: string; desc: string; home: string; icon: React.ReactNode }[] = [
  { id: "customer", label: "Customer", desc: "Peserta / tim kompetisi", home: "/app/overview", icon: <User /> },
  { id: "admin", label: "Admin", desc: "Operasional & penugasan mentor", home: "/admin/dashboard", icon: <Shield /> },
  { id: "mentor", label: "Mentor", desc: "Validasi & pendampingan", home: "/mentor/overview", icon: <GraduationCap /> },
];

export default function Login() {
  const nav = useNavigate();
  const { setRole } = useDemo();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lightblue via-appbg to-pink px-4">
      <Card className="w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-6 text-2xl font-extrabold">Masuk demo</h1>
        <p className="mt-1 text-sm text-muted">Pilih peran untuk masuk. Tanpa autentikasi asli — ini mode presentasi.</p>
        <div className="mt-6 space-y-2">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRole(r.id);
                nav(r.home);
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left transition-colors hover:border-electric hover:bg-lightblue"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-lightblue text-electric">{r.icon}</span>
              <div>
                <p className="font-bold">{r.label}</p>
                <p className="text-xs text-muted">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <Button variant="ghost" className="mt-4 w-full" onClick={() => nav("/")}>Kembali ke beranda</Button>
      </Card>
    </div>
  );
}
