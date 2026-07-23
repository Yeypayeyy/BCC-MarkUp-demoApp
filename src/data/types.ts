export type Role = "customer" | "admin" | "mentor";

export type Category = "BCC" | "BPC" | "Career";

export interface Pkg {
  slug: string;
  category: Category;
  name: string;
  price: number;
  priceUnit: string; // "tim" | "personal" | "session"
  format: "Individu" | "Tim";
  stage: string;
  sessions: string;
  finalBonus: boolean;
  valueProp: string;
  bestFor: string;
  benefits: string[];
  coverage: string[];
  curriculum: { title: string; detail: string }[];
  receives: string[];
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string;
  competitions: string;
  rating: number;
  activeMentees: number;
  availability: string;
  capacity: "Tersedia" | "Hampir penuh" | "Penuh";
}

export type TaskStatus = "todo" | "inprogress" | "review" | "done";
export type TaskSource = "AI" | "Mentor" | "Self";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: "Tinggi" | "Sedang" | "Rendah";
  due: string;
  source: TaskSource;
  assignee: string;
  relatedDoc: string;
  comments: number;
  validatedBy?: string;
  validatedAt?: string;
}

export interface Session {
  id: string;
  title: string;
  mentor: string;
  date: string;
  time: string;
  status: "upcoming" | "scheduled" | "completed" | "locked";
  agenda: string[];
}

export type Severity = "high" | "medium" | "low";
export interface Finding {
  id: string;
  text: string;
  severity: Severity;
  page: string;
  validatedBy?: string;
  validatedAt?: string;
}

export interface Assessment {
  competition: string;
  stage: string;
  needs: string[];
  deadline: string;
  format: string;
  budget: string;
}

export type OrderStatus =
  | "needs-approval"
  | "mentor-approved"
  | "scheduled"
  | "active"
  | "completed";

export interface Order {
  id: string;
  customer: string;
  team: string;
  pkg: string;
  payment: "Terverifikasi" | "Menunggu";
  mentor: string;
  mentorApproved: boolean;
  schedule: string;
  scheduleConfirmed: boolean;
  materials: "Terkirim" | "Menunggu";
  status: OrderStatus;
}
