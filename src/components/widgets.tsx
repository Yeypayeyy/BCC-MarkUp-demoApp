import { Check, Lock, Sparkles, BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Card, Pill, cx } from "./ui";

/* ---------- ReadinessRing ---------- */
export function ReadinessRing({ value, size = 96, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EAF0FF" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ring)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3157D5" />
            <stop offset="100%" stopColor="#7B3FF2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-extrabold">{value}%</div>
        {label && <div className="text-[10px] font-medium text-muted">{label}</div>}
      </div>
    </div>
  );
}

/* ---------- ProgressStepper ---------- */
export type Step = { label: string; state: "complete" | "active" | "upcoming" | "locked" };
export function ProgressStepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center">
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                s.state === "complete" && "bg-teal text-white",
                s.state === "active" && "bg-electric text-white ring-4 ring-lightblue",
                s.state === "upcoming" && "bg-white text-muted border border-line",
                s.state === "locked" && "bg-black/5 text-muted"
              )}
            >
              {s.state === "complete" ? <Check className="h-4 w-4" /> : s.state === "locked" ? <Lock className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={cx("text-sm font-medium", s.state === "active" ? "text-ink" : "text-muted")}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && <span className="mx-3 hidden h-px w-8 bg-line sm:block" />}
        </li>
      ))}
    </ol>
  );
}

/* ---------- AIInsightCard ---------- */
export function AIInsightCard({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "purple";
}) {
  return (
    <Card className={cx("overflow-hidden", tone === "purple" ? "border-purple/30" : "border-electric/30")}>
      <div className="flex items-center gap-2 border-b border-line bg-gradient-to-r from-lightblue to-pink/40 px-4 py-2.5">
        <Sparkles className={cx("h-4 w-4", tone === "purple" ? "text-purple" : "text-electric")} />
        <span className="text-xs font-bold uppercase tracking-wide text-navy">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}

/* ---------- MentorValidationBadge ---------- */
export function MentorValidationBadge({ name = "Nadia", at }: { name?: string; at?: string }) {
  return (
    <Pill tone="teal" className="gap-1">
      <BadgeCheck className="h-3.5 w-3.5" />
      Validated by {name}
      {at && <span className="font-normal opacity-70">· {at}</span>}
    </Pill>
  );
}

/* ---------- Notice ---------- */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-lightteal px-3 py-2 text-xs font-medium text-teal">
      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
