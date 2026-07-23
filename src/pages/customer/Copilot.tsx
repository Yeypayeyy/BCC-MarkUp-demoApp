import { useState } from "react";
import { Sparkles, Send, FileSearch, Plus, BadgeCheck, Loader2 } from "lucide-react";
import { Button, Card, Pill, cx } from "@/components/ui";
import { Notice } from "@/components/widgets";
import { ProjectShell } from "./ProjectShell";
import { useDemo } from "@/store/DemoContext";

const PROMPTS = [
  "Bantu bedakan symptom dan root cause",
  "Apakah solusi kami menjawab masalah utama?",
  "Buatkan simulasi pertanyaan juri",
  "Ringkas guidebook menjadi checklist",
];

// deterministic mock replies
const REPLY: Record<string, string> = {
  default:
    "Berdasarkan proposal kamu, poin ini bisa dipertajam dengan menautkan bukti langsung ke root cause. Coba mulai dari data yang paling relevan, lalu jelaskan mengapa solusi menutup akar masalah itu.",
  "Bantu bedakan symptom dan root cause":
    "Symptom adalah gejala yang terlihat (mis. penjualan turun). Root cause adalah penyebab mendasar (mis. retensi pelanggan rendah karena onboarding lemah). Tulis symptom di kolom kiri, tanyakan 'kenapa' 3–5 kali sampai menemukan akar yang bisa ditindaklanjuti.",
  "Apakah solusi kami menjawab masalah utama?":
    "Sebagian. Solusi kamu menjawab symptom, tapi keterkaitannya ke root cause belum eksplisit. Tambahkan tabel problem–solution yang memetakan tiap akar masalah ke intervensi spesifik.",
  "Buatkan simulasi pertanyaan juri":
    "Contoh: 'Apa bukti bahwa akar masalah yang kamu pilih benar-benar penyebab utama, bukan sekadar korelasi?' Siapkan jawaban berbasis data dan asumsi yang bisa dipertanggungjawabkan.",
  "Ringkas guidebook menjadi checklist":
    "Checklist: (1) Identifikasi masalah inti, (2) Pilih framework fit-to-case, (3) Validasi root cause dengan data, (4) Rancang solusi + implementasi, (5) Definisikan metrik dampak, (6) Siapkan pitch & Q&A.",
};

const QA_QUESTIONS = [
  "Apa root cause utama yang kamu identifikasi, dan apa buktinya?",
  "Mengapa solusi ini paling tepat dibanding alternatif lain?",
  "Bagaimana kamu mengukur keberhasilan solusi ini?",
];

export default function Copilot() {
  const { chat, pushChat, addTask, toast } = useDemo();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [qaMode, setQaMode] = useState(false);
  const [qaIdx, setQaIdx] = useState(0);
  const [qaAnswer, setQaAnswer] = useState("");
  const [qaFeedback, setQaFeedback] = useState<null | Record<string, number>>(null);

  const ask = (text: string) => {
    if (!text.trim()) return;
    pushChat({ role: "user", text });
    setInput("");
    setTyping(true);
    setTimeout(() => {
      pushChat({ role: "copilot", text: REPLY[text] ?? REPLY.default });
      setTyping(false);
    }, 1100);
  };

  const submitQa = () => {
    setQaFeedback({ Clarity: 78, Evidence: 64, "Strategic depth": 70, Delivery: 82 });
  };

  return (
    <ProjectShell>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* conversation */}
        <Card className="flex h-[560px] flex-col">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <Sparkles className="h-4 w-4 text-electric" />
            <span className="text-sm font-bold">Competition Copilot</span>
            <Pill tone="purple" className="ml-auto">Demo</Pill>
            <button onClick={() => { setQaMode((m) => !m); setQaFeedback(null); }} className="rounded-lg bg-lightblue px-2.5 py-1 text-xs font-semibold text-electric">
              {qaMode ? "Keluar Q&A" : "Mock Q&A Mode"}
            </button>
          </div>

          {qaMode ? (
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-xs font-bold uppercase text-purple">Simulasi Q&A Juri · {qaIdx + 1}/{QA_QUESTIONS.length}</p>
              <div className="mt-2 rounded-2xl rounded-tl-sm bg-appbg px-4 py-3 text-sm">{QA_QUESTIONS[qaIdx]}</div>
              <textarea
                value={qaAnswer}
                onChange={(e) => setQaAnswer(e.target.value)}
                placeholder="Ketik jawabanmu…"
                className="mt-3 h-24 w-full rounded-xl border border-line p-3 text-sm"
              />
              {!qaFeedback ? (
                <Button className="mt-2" onClick={submitQa}>Kirim jawaban</Button>
              ) : (
                <Card className="mt-3 p-4">
                  <p className="text-sm font-bold">Feedback terstruktur</p>
                  <div className="mt-2 space-y-2">
                    {Object.entries(qaFeedback).map(([k, v]) => (
                      <div key={k}>
                        <div className="flex justify-between text-xs"><span>{k}</span><span className="font-semibold">{v}%</span></div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-line"><div className="h-1.5 rounded-full bg-electric" style={{ width: `${v}%` }} /></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setQaFeedback(null); setQaAnswer(""); setQaIdx((i) => (i + 1) % QA_QUESTIONS.length); }}>Pertanyaan berikutnya</Button>
                    <Button size="sm" onClick={() => toast("Hasil Q&A dikirim ke mentor")}> <BadgeCheck className="h-4 w-4" /> Kirim hasil ke mentor</Button>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {chat.map((m, i) => (
                  <div key={i} className={cx("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm", m.role === "user" ? "ml-auto rounded-tr-sm bg-electric text-white" : "rounded-tl-sm bg-appbg")}>
                    {m.text}
                    {m.role === "copilot" && i === 1 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" variant="outline"><FileSearch className="h-4 w-4" /> Lihat evidence</Button>
                        <Button size="sm" variant="outline" onClick={() => { addTask("Perjelas alur pembuktian root cause → solusi"); toast("Ditambahkan ke action plan"); }}><Plus className="h-4 w-4" /> Tambahkan ke action plan</Button>
                        <Button size="sm" variant="outline" onClick={() => toast("Permintaan validasi dikirim ke mentor")}><BadgeCheck className="h-4 w-4" /> Minta validasi mentor</Button>
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex items-center gap-2 text-sm text-muted"><Loader2 className="h-4 w-4 animate-spin" /> Copilot mengetik…</div>
                )}
              </div>
              <div className="border-t border-line p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  {PROMPTS.map((p) => (
                    <button key={p} onClick={() => ask(p)} className="rounded-full border border-line px-3 py-1 text-xs font-medium hover:border-electric hover:bg-lightblue">{p}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(input)} placeholder="Tanya Copilot…" className="h-11 flex-1 rounded-xl border border-line px-3 text-sm" />
                  <Button onClick={() => ask(input)} aria-label="Kirim"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* context */}
        <div className="space-y-5">
          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Konteks proyek</p>
            <dl className="space-y-1.5 text-sm">
              {[["Kompetisi", "ISAC Mini Case 2026"], ["Paket", "Essential Sprint"], ["Dokumen", "Proposal v2 (Analyzed)"], ["Readiness", "64%"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </Card>
          <Card className="p-5">
            <p className="mb-2 text-sm font-bold">Action plan singkat</p>
            <ul className="space-y-2 text-sm">
              {["Bangun tabel problem–solution", "Definisikan 3 metrik dampak"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2"><span className="h-2 w-2 rounded-full bg-electric" />{t}</li>
              ))}
            </ul>
          </Card>
          <Notice>Ini demo frontend. Respons Copilot bersifat mock/deterministik dan divalidasi mentor.</Notice>
        </div>
      </div>
    </ProjectShell>
  );
}
