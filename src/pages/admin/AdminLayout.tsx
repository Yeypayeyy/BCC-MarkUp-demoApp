import { Outlet } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, CalendarDays, FolderOpen } from "lucide-react";
import { AppShell, type NavItem } from "@/components/AppShell";

const NAV: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Orders", to: "/admin/orders", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Mentors", to: "/admin/mentors", icon: <Users className="h-5 w-5" /> },
  { label: "Schedule", to: "/admin/schedule", icon: <CalendarDays className="h-5 w-5" /> },
  { label: "Resources", to: "/admin/resources", icon: <FolderOpen className="h-5 w-5" /> },
];

export function AdminLayout() {
  return (
    <AppShell nav={NAV} greeting="Admin Control Tower">
      <Outlet />
    </AppShell>
  );
}
