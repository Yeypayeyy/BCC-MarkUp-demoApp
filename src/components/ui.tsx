import { X } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useDemo } from "@/store/DemoContext";

export function cx(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}
const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white hover:bg-[#274bc0] shadow-sm disabled:opacity-50",
  secondary: "bg-lightblue text-electric hover:bg-[#dbe5ff]",
  ghost: "text-ink hover:bg-black/5",
  outline: "border border-line bg-white text-ink hover:bg-appbg",
  danger: "bg-red-500 text-white hover:bg-red-600",
};
export function Button({ variant = "primary", size = "md", className, ...p }: BtnProps) {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm min-h-[44px]",
    lg: "h-12 px-6 text-base",
  };
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...p}
    />
  );
}

/* ---------- Card ---------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("rounded-2xl border border-line bg-white shadow-card", className)}>
      {children}
    </div>
  );
}

/* ---------- Pill ---------- */
const tones: Record<string, string> = {
  blue: "bg-lightblue text-electric",
  navy: "bg-navy/10 text-navy",
  magenta: "bg-pink text-magenta",
  purple: "bg-purple/10 text-purple",
  teal: "bg-lightteal text-teal",
  yellow: "bg-yellow/25 text-[#8a6d00]",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-500",
  gray: "bg-black/5 text-muted",
};
export function Pill({
  children,
  tone = "gray",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- StatusPill ---------- */
const statusMap: Record<string, { tone: keyof typeof tones; label: string }> = {
  complete: { tone: "green", label: "Selesai" },
  active: { tone: "blue", label: "Berlangsung" },
  upcoming: { tone: "purple", label: "Akan datang" },
  locked: { tone: "gray", label: "Terkunci" },
  "needs-action": { tone: "amber", label: "Perlu tindakan" },
  validated: { tone: "teal", label: "Tervalidasi" },
  paid: { tone: "green", label: "Terverifikasi" },
  pending: { tone: "amber", label: "Menunggu" },
};
export function StatusPill({ status }: { status: keyof typeof statusMap }) {
  const s = statusMap[status] ?? { tone: "gray" as const, label: status };
  return <Pill tone={s.tone}>{s.label}</Pill>;
}

/* ---------- Modal ---------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cx(
          "w-full rounded-t-2xl sm:rounded-2xl bg-white shadow-soft animate-fade",
          wide ? "sm:max-w-2xl" : "sm:max-w-md"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="text-base font-bold">{title}</h3>
            <button aria-label="Tutup" onClick={onClose} className="rounded-lg p-1 hover:bg-black/5">
              <X className="h-5 w-5 text-muted" />
            </button>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-line px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("skeleton rounded-lg", className)} />;
}

/* ---------- EmptyState ---------- */
export function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon?: ReactNode;
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white/60 px-6 py-12 text-center">
      {icon && <div className="mb-3 text-muted">{icon}</div>}
      <p className="font-semibold">{title}</p>
      {desc && <p className="mt-1 max-w-sm text-sm text-muted">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ---------- Toast host ---------- */
export function ToastHost() {
  const { toasts, dismissToast } = useDemo();
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cx(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-soft animate-fade",
            t.kind === "error" ? "bg-red-500" : t.kind === "info" ? "bg-navy" : "bg-teal"
          )}
        >
          <span>{t.msg}</span>
          <button aria-label="Tutup" onClick={() => dismissToast(t.id)}>
            <X className="h-4 w-4 opacity-80" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionTitle({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-electric">{eyebrow}</p>}
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-muted">{desc}</p>}
    </div>
  );
}
