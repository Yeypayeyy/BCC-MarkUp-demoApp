import { Outlet } from "react-router-dom";
import { LayoutDashboard, FolderKanban, CalendarDays, BookOpen, UserCircle } from "lucide-react";
import { AppShell, type NavItem } from "@/components/AppShell";

const NAV: NavItem[] = [
  { label: "Overview", to: "/app/overview", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Project", to: "/app/project/semleketep", icon: <FolderKanban className="h-5 w-5" /> },
  { label: "Sessions", to: "/app/sessions", icon: <CalendarDays className="h-5 w-5" /> },
  { label: "Resources", to: "/app/resources", icon: <BookOpen className="h-5 w-5" /> },
  { label: "Profile", to: "/app/profile", icon: <UserCircle className="h-5 w-5" /> },
];

export function CustomerLayout() {
  return (
    <AppShell nav={NAV} greeting="Selamat datang, Faaid 👋">
      <Outlet />
    </AppShell>
  );
}
