import { NavLink } from "react-router-dom";
import { Clock, Calendar, Layers, Activity } from "lucide-react";
import { Card, Pill, cx } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const TABS = [
  { label: "Overview", to: "/app/project/semleketep", end: true },
  { label: "Documents", to: "/app/project/semleketep/documents" },
  { label: "Copilot", to: "/app/project/semleketep/copilot" },
  { label: "Action Plan", to: "/app/project/semleketep/action-plan" },
];

export function ProjectShell({ children }: { children: React.ReactNode }) {
  const { order } = useDemo();
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold">Tim Semleketep</h2>
              <Pill tone="blue">Essential Sprint</Pill>
              {order.mentorApproved && <Pill tone="teal">Mentor: Nadia Putri</Pill>}
            </div>
            <p className="mt-1 text-sm text-muted">ISAC Mini Case Competition 2026</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Stat icon={<Activity className="h-4 w-4 text-electric" />} label="Readiness" value="64%" />
            <Stat icon={<Clock className="h-4 w-4 text-amber-500" />} label="Sisa waktu" value="12 hari" />
            <Stat icon={<Layers className="h-4 w-4 text-purple" />} label="Sesi" value="2" />
            <Stat icon={<Calendar className="h-4 w-4 text-teal" />} label="Fase" value="Preparation" />
          </div>
        </div>

        <div className="mt-4 flex gap-1 overflow-x-auto border-t border-line pt-3">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                cx(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold",
                  isActive ? "bg-lightblue text-electric" : "text-muted hover:bg-appbg"
                )
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </Card>
      {children}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-muted">{icon}{label}</div>
      <p className="font-bold">{value}</p>
    </div>
  );
}
