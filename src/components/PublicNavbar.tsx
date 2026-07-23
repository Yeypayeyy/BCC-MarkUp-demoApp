import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui";

const LINKS = [
  { label: "Cari Program", to: "/services" },
  { label: "Cara Kerja", to: "/#cara-kerja" },
  { label: "Mentor", to: "/#mentor" },
  { label: "Resource", to: "/#resource" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Beranda Mark-Up">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-medium text-muted hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" onClick={() => nav("/login")}>
            Masuk
          </Button>
          <Button size="sm" onClick={() => nav("/discover")}>
            Temukan Programmu
          </Button>
        </div>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-appbg"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => nav("/login")}>
                Masuk
              </Button>
              <Button size="sm" className="flex-1" onClick={() => nav("/discover")}>
                Temukan Programmu
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
