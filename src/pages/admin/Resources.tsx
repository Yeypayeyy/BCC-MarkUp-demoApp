import { FolderOpen, Lock, Upload } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";
import { useDemo } from "@/store/DemoContext";

const ITEMS = [
  { t: "10 Deck Finalis Nasional", cat: "Finalist Decks", access: "PowerPack", assigned: 8 },
  { t: "10 Framework Business Case", cat: "Frameworks", access: "PowerPack", assigned: 8 },
  { t: "Template Proposal BPC", cat: "Proposal", access: "BPC", assigned: 5 },
  { t: "Template CV ATS", cat: "Career", access: "Career", assigned: 12 },
  { t: "Bank Pertanyaan Juri", cat: "Q&A", access: "Semua", assigned: 24 },
];

export default function Resources() {
  const { toast } = useDemo();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Resource Library</h2>
        <Button size="sm" onClick={() => toast("Upload resource (demo)")}><Upload className="h-4 w-4" /> Tambah resource</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="border-b border-line bg-appbg text-left text-xs uppercase text-muted">
                {["Resource", "Kategori", "Akses", "Terdistribusi", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((r) => (
                <tr key={r.t} className="border-b border-line">
                  <td className="px-4 py-3 font-semibold"><FolderOpen className="mr-2 inline h-4 w-4 text-electric" />{r.t}</td>
                  <td className="px-4 py-3 text-muted">{r.cat}</td>
                  <td className="px-4 py-3">
                    {r.access === "Semua" ? <Pill tone="green">Semua</Pill> : <Pill tone="amber"><Lock className="h-3 w-3" /> {r.access}</Pill>}
                  </td>
                  <td className="px-4 py-3">{r.assigned} order</td>
                  <td className="px-4 py-3"><Button size="sm" variant="ghost" onClick={() => toast("Kelola distribusi (demo)")}>Kelola</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
