import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, GitCompareArrows, X } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Button, Card, Pill, cx } from "@/components/ui";
import { PACKAGES, rupiah } from "@/data/packages";
import type { Pkg } from "@/data/types";

const TABS = ["Semua", "BCC", "BPC", "Career"] as const;

export default function Services() {
  const nav = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Semua");
  const [format, setFormat] = useState("Semua");
  const [sort, setSort] = useState("Relevan");
  const [compare, setCompare] = useState<Pkg[]>([]);
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(() => {
    let l = PACKAGES.filter((p) => (tab === "Semua" ? true : p.category === tab));
    if (format !== "Semua") l = l.filter((p) => p.format === format);
    if (sort === "Harga termurah") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "Harga termahal") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [tab, format, sort]);

  const toggleCompare = (p: Pkg) =>
    setCompare((c) =>
      c.find((x) => x.slug === p.slug) ? c.filter((x) => x.slug !== p.slug) : c.length < 3 ? [...c, p] : c
    );

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold">Katalog Program</h1>
        <p className="mt-1 text-muted">Bandingkan hingga 3 paket dan pilih yang paling sesuai kebutuhanmu.</p>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                tab === t ? "bg-navy text-white" : "border border-line bg-white hover:bg-appbg"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="h-10 rounded-xl border border-line bg-white px-3 text-sm">
            {["Semua", "Individu", "Tim"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border border-line bg-white px-3 text-sm">
            {["Relevan", "Harga termurah", "Harga termahal"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <span className="text-sm text-muted">{list.length} program</span>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const checked = !!compare.find((x) => x.slug === p.slug);
            return (
              <Card key={p.slug} className="flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <Pill tone={p.category === "BCC" ? "blue" : p.category === "BPC" ? "magenta" : "teal"}>{p.category}</Pill>
                  <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted">
                    <input type="checkbox" checked={checked} onChange={() => toggleCompare(p)} className="h-4 w-4 accent-electric" />
                    Bandingkan
                  </label>
                </div>
                <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted">
                  <span>Tahap: {p.stage}</span>·<span>{p.format}</span>
                </div>
                <ul className="mt-3 flex-1 space-y-1.5 text-sm">
                  {p.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> <span className="text-muted">{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-2xl font-extrabold text-navy">
                  {rupiah(p.price)}<span className="text-sm font-medium text-muted">/{p.priceUnit}</span>
                </p>
                <Button className="mt-3" onClick={() => nav(`/services/${p.slug}`)}>Lihat Detail</Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Compare bar */}
      {compare.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2.5 shadow-soft">
            <GitCompareArrows className="h-4 w-4 text-electric" />
            <span className="text-sm font-semibold">{compare.length} dipilih</span>
            <Button size="sm" onClick={() => setDrawer(true)}>Bandingkan</Button>
            <button onClick={() => setCompare([])} aria-label="Bersihkan"><X className="h-4 w-4 text-muted" /></button>
          </div>
        </div>
      )}

      {/* Compare drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setDrawer(false)}>
          <div className="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-soft animate-fade" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Perbandingan Program</h2>
              <button onClick={() => setDrawer(false)} aria-label="Tutup"><X className="h-5 w-5 text-muted" /></button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <Row label="Program" cells={compare.map((p) => <span className="font-bold">{p.name}</span>)} />
                  <Row label="Kategori" cells={compare.map((p) => p.category)} />
                  <Row label="Format" cells={compare.map((p) => p.format)} />
                  <Row label="Tahap ideal" cells={compare.map((p) => p.stage)} />
                  <Row label="Sesi" cells={compare.map((p) => p.sessions)} />
                  <Row label="Harga" cells={compare.map((p) => `${rupiah(p.price)}/${p.priceUnit}`)} />
                  <Row label="Bonus final" cells={compare.map((p) => (p.finalBonus ? "Ya" : "—"))} />
                  <Row label="" cells={compare.map((p) => <Button size="sm" onClick={() => nav(`/services/${p.slug}`)}>Detail</Button>)} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, cells }: { label: string; cells: React.ReactNode[] }) {
  return (
    <tr className="border-b border-line">
      <td className="py-3 pr-4 align-top font-semibold text-muted">{label}</td>
      {cells.map((c, i) => (
        <td key={i} className="py-3 pr-4 align-top">{c}</td>
      ))}
    </tr>
  );
}
