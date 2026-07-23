import { Outlet } from "react-router-dom";
import { LayoutDashboard, Users, FileCheck, CalendarDays } from "lucide-react";
import { AppShell, type NavItem } from "@/components/AppShell";

const NAV: NavItem[] = [
  { label: "Overview", to: "/mentor/overview", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Mentees", to: "/mentor/mentees/semleketep", icon: <Users className="h-5 w-5" /> },
  { label: "Reviews", to: "/mentor/reviews", icon: <FileCheck className="h-5 w-5" /> },
  { label: "Schedule", to: "/mentor/schedule", icon: <CalendarDays className="h-5 w-5" /> },
];

export function MentorLayout() {
  return (
    <AppShell nav={NAV} greeting="Halo, Nadia 👋">
      <Outlet />
    </AppShell>
  );
}
