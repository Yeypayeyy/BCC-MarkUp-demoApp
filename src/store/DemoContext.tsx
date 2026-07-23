import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Assessment,
  Finding,
  Order,
  Role,
  Session,
  Task,
  TaskStatus,
} from "@/data/types";
import {
  SEED_ASSESSMENT,
  SEED_CHAT,
  SEED_FINDINGS,
  SEED_ORDER,
  SEED_ORDERS_EXTRA,
  SEED_SESSIONS,
  SEED_TASKS,
} from "@/data/seed";

interface ChatMsg {
  role: "user" | "copilot";
  text: string;
}

interface DemoState {
  role: Role;
  assessment: Assessment;
  order: Order;
  extraOrders: Order[];
  tasks: Task[];
  findings: Finding[];
  sessions: Session[];
  chat: ChatMsg[];
  paymentDone: boolean;
  docAnalyzed: boolean;
}

interface DemoContextValue extends DemoState {
  setRole: (r: Role) => void;
  setPaymentDone: (b: boolean) => void;
  setDocAnalyzed: (b: boolean) => void;
  addTaskFromFinding: (findingId: string) => void;
  addTask: (title: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  approveMentor: () => void;
  confirmSchedule: () => void;
  releaseResources: () => void;
  validateFinding: (findingId: string) => void;
  validateTask: (taskId: string) => void;
  pushChat: (msg: ChatMsg) => void;
  reset: () => void;
  toast: (msg: string, kind?: "success" | "info" | "error") => void;
  toasts: { id: number; msg: string; kind: string }[];
  dismissToast: (id: number) => void;
}

const KEY = "markup-demo-v1";

function seedState(): DemoState {
  return {
    role: "customer",
    assessment: SEED_ASSESSMENT,
    order: { ...SEED_ORDER },
    extraOrders: SEED_ORDERS_EXTRA.map((o) => ({ ...o })),
    tasks: SEED_TASKS.map((t) => ({ ...t })),
    findings: SEED_FINDINGS.map((f) => ({ ...f })),
    sessions: SEED_SESSIONS.map((s) => ({ ...s })),
    chat: SEED_CHAT.map((c) => ({ ...c })),
    paymentDone: false,
    docAnalyzed: true,
  };
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...seedState(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return seedState();
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(load);
  const [toasts, setToasts] = useState<{ id: number; msg: string; kind: string }[]>([]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const patch = useCallback((p: Partial<DemoState>) => setState((s) => ({ ...s, ...p })), []);

  const toast = useCallback((msg: string, kind: "success" | "info" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const value: DemoContextValue = useMemo(
    () => ({
      ...state,
      toasts,
      toast,
      dismissToast,
      setRole: (role) => patch({ role }),
      setPaymentDone: (paymentDone) => patch({ paymentDone }),
      setDocAnalyzed: (docAnalyzed) => patch({ docAnalyzed }),
      pushChat: (msg) => setState((s) => ({ ...s, chat: [...s.chat, msg] })),
      addTaskFromFinding: (findingId) =>
        setState((s) => {
          const f = s.findings.find((x) => x.id === findingId);
          if (!f || s.tasks.some((t) => t.id === "task-" + findingId)) return s;
          const newTask: Task = {
            id: "task-" + findingId,
            title: f.text,
            status: "todo",
            priority: f.severity === "high" ? "Tinggi" : "Sedang",
            due: "30 Jul 2026",
            source: "AI",
            assignee: "Faaid",
            relatedDoc: "Proposal_Semleketep_v2.pdf",
            comments: 0,
          };
          return { ...s, tasks: [newTask, ...s.tasks] };
        }),
      addTask: (title) =>
        setState((s) => ({
          ...s,
          tasks: [
            {
              id: "task-" + Date.now(),
              title,
              status: "todo",
              priority: "Sedang",
              due: "31 Jul 2026",
              source: "Self",
              assignee: "Faaid",
              relatedDoc: "—",
              comments: 0,
            },
            ...s.tasks,
          ],
        })),
      moveTask: (id, status) =>
        setState((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
      approveMentor: () =>
        setState((s) => ({
          ...s,
          order: { ...s.order, mentorApproved: true, mentor: "Nadia Putri", status: "mentor-approved" },
        })),
      confirmSchedule: () =>
        setState((s) => ({
          ...s,
          order: {
            ...s.order,
            scheduleConfirmed: true,
            schedule: "Terkonfirmasi",
            status: "scheduled",
          },
        })),
      releaseResources: () =>
        setState((s) => ({
          ...s,
          order: { ...s.order, materials: "Terkirim", status: "active" },
        })),
      validateFinding: (findingId) =>
        setState((s) => ({
          ...s,
          findings: s.findings.map((f) =>
            f.id === findingId
              ? { ...f, validatedBy: "Nadia Putri", validatedAt: "23 Jul 2026, 10:24" }
              : f
          ),
          // also validate a matching action-plan task if present
          tasks: s.tasks.map((t) =>
            t.id === "task-" + findingId || (findingId === "f1" && t.id === "t4")
              ? { ...t, validatedBy: "Nadia", validatedAt: "23 Jul 2026" }
              : t
          ),
        })),
      validateTask: (taskId) =>
        setState((s) => ({
          ...s,
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: "done", validatedBy: "Nadia", validatedAt: "23 Jul 2026" }
              : t
          ),
        })),
      reset: () => {
        const fresh = seedState();
        setState(fresh);
        localStorage.setItem(KEY, JSON.stringify(fresh));
      },
    }),
    [state, toasts, patch, toast, dismissToast]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
