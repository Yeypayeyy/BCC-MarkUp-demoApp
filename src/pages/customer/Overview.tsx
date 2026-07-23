import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Clock, ArrowRight, Upload, MessageSquare, ListChecks, BookOpen, Check } from "lucide-react";
import { Button, Card, Pill } from "@/components/ui";
import { ReadinessRing, ProgressStepper, AIInsightCard, type Step } from "@/components/widgets";
import { useDemo } from "@/store/DemoContext";

export default function Overview() {
  const nav = useNavigate();
  const { order } = useDemo();

  const steps: Step[] = [
    { label: "Assessment", state: "complete" },
    { label: "Booking", state: "complete" },
    { label: "Preparation", state: "active" },
    { label: "Mentoring", state: order.scheduleConfirmed ? "upcoming" : "upcoming" },
    { label: "Final review", state: "locked" },
  ];

  return (
    <div className="space-y-6">
      {/* top row */}
      <div className="grid gap-5 lg:grid-cols-3">
        <AIInsightCard title="Ringkasan Asesmen AI">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Essential Sprint</p>
              <Pill tone="teal" className="mt-1">92% match</Pill>
            </div>
            <Sparkles className="h-8 w-8 text-electric/40" />
          </div>
          <Link to="/discover/result" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric">
            Lihat rekomendasi <ArrowRight className="h-4 w-4" />
          </Link>
        </AIInsightCard>

        <Card className="p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-navy">
            <Calendar className="h-4 w-4 text-purple" /> Sesi berikutnya
          </div>
          <p className="font-bold">Nadia Putri</p>
          <p className="text-sm text-muted">Sabtu, 25 Juli 2026 · 13.00–14.00 WIB</p>
          <Button size="sm" variant="secondary" className="mt-3" onClick={() => nav("/app/sessions")}>Lihat detail</Button>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <ReadinessRing value={64} label="Readiness" />
          <div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-amber-600">
              <Clock className="h-4 w-4" /> 12 hari lagi
            </div>
            <p className="text-xs text-muted">menuju deadline submission</p>
          </div>
        </Card>
      </div>

      {/* journey */}
      <Card className="p-5">
        <p className="mb-4 text-sm font-bold">Progress journey</p>
        <ProgressStepper steps={steps} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* priority actions */}
        <Card className="p-5 lg:col-span-2">
          <p className="mb-3 text-sm font-bold">Prioritas kamu</p>
          <div className="space-y-2">
            {[
              { t: "Upload proposal terbaru", to: "/app/project/semleketep/documents" },
              { t: "Review feedback root cause", to: "/app/project/semleketep/copilot" },
              { t: "Konfirmasi jadwal sesi", to: "/app/sessions" },
            ].map((a) => (
              <button key={a.t} onClick={() => nav(a.to)} className="flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-left text-sm font-medium hover:border-electric">
                {a.t}
                <ArrowRight className="h-4 w-4 text-muted" />
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-lightteal p-4">
            <p className="text-xs font-bold uppercase text-teal">Catatan mentor terbaru</p>
            <p className="mt-1 text-sm">Fokus berikutnya: perkuat hubungan antara root cause dan solusi utama.</p>
          </div>
        </Card>

        {/* quick access */}
        <Card className="p-5">
          <p className="mb-3 text-sm font-bold">Akses cepat</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Upload className="h-5 w-5" />, t: "Analyze Doc", to: "/app/project/semleketep/documents" },
              { icon: <MessageSquare className="h-5 w-5" />, t: "Ask Copilot", to: "/app/project/semleketep/copilot" },
              { icon: <ListChecks className="h-5 w-5" />, t: "Action Plan", to: "/app/project/semleketep/action-plan" },
              { icon: <BookOpen className="h-5 w-5" />, t: "Resources", to: "/app/resources" },
            ].map((q) => (
              <button key={q.t} onClick={() => nav(q.to)} className="flex flex-col items-start gap-2 rounded-xl border border-line p-3 text-left hover:border-electric hover:bg-lightblue">
                <span className="text-electric">{q.icon}</span>
                <span className="text-sm font-semibold">{q.t}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {order.mentorApproved && (
        <div className="flex items-center gap-2 rounded-xl bg-lightteal px-4 py-3 text-sm font-semibold text-teal">
          <Check className="h-4 w-4" /> Mentor Nadia Putri telah dikonfirmasi admin untuk tim kamu.
        </div>
      )}
    </div>
  );
}
