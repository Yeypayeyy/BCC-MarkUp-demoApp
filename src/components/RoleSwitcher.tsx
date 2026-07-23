import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Users, ChevronUp } from "lucide-react";
import { useDemo } from "@/store/DemoContext";
import { Button, cx } from "./ui";
import type { Role } from "@/data/types";

const ROLES: { id: Role; label: string; home: string }[] = [
  { id: "customer", label: "Customer", home: "/app/overview" },
  { id: "admin", label: "Admin", home: "/admin/dashboard" },
  { id: "mentor", label: "Mentor", home: "/mentor/overview" },
];

export function RoleSwitcher() {
  const { role, setRole, reset, toast } = useDemo();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <div className="fixed bottom-4 left-4 z-[55]">
      {open && (
        <div className="mb-2 w-60 rounded-2xl border border-line bg-white p-3 shadow-soft animate-fade">
          <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted">Demo Role Switcher</p>
          <div className="flex flex-col gap-1">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  nav(r.home);
                  setOpen(false);
                }}
                className={cx(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                  role === r.id ? "bg-electric text-white" : "hover:bg-appbg"
                )}
              >
                {r.label}
                {role === r.id && <span className="text-[10px] font-bold uppercase opacity-80">aktif</span>}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              reset();
              toast("Data demo direset ke kondisi awal", "info");
              nav("/");
              setOpen(false);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Reset Demo Data
          </Button>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold shadow-soft hover:shadow-md"
      >
        <Users className="h-4 w-4 text-electric" />
        <span className="capitalize">{role}</span>
        <ChevronUp className={cx("h-4 w-4 text-muted transition-transform", open && "rotate-180")} />
      </button>
    </div>
  );
}
