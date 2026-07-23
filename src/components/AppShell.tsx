import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { cx } from "./ui";

export interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

export function AppShell({
  nav,
  greeting,
  children,
}: {
  nav: NavItem[];
  greeting: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarInner = (
    <>
      <Link to="/" className="mb-6 block px-2" aria-label="Beranda">
        <Logo />
      </Link>
      <nav className="flex flex-col gap-1">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px]",
                isActive ? "bg-electric text-white shadow-sm" : "text-muted hover:bg-appbg hover:text-ink"
              )
            }
          >
            {n.icon}
            {n.label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-appbg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white p-4 lg:block">
        {SidebarInner}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white p-4 shadow-soft animate-fade">
            <button className="absolute right-3 top-3" aria-label="Tutup" onClick={() => setOpen(false)}>
              <X className="h-5 w-5 text-muted" />
            </button>
            {SidebarInner}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" aria-label="Buka menu" onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <h1 className="text-sm font-bold sm:text-base">{greeting}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                aria-label="Cari"
                placeholder="Cari…"
                className="h-10 w-44 rounded-xl border border-line bg-appbg pl-9 pr-3 text-sm focus:bg-white"
              />
            </div>
            <button aria-label="Notifikasi" className="relative rounded-xl p-2.5 hover:bg-appbg">
              <Bell className="h-5 w-5 text-muted" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-magenta" />
            </button>
            <button
              onClick={() => navigate("/app/profile")}
              aria-label="Profil"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
            >
              F
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
