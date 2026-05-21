import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { PDFViewer } from "@/components/PDFViewer";
import { SectorBadge } from "@/components/SectorBadge";
import { Button } from "@/components/ui/button";
import { getPitchBySlug, pitches } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return pitches.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const pitch = getPitchBySlug(params.slug);
  return { title: pitch ? `${pitch.company} Pitch` : "Pitch Deck" };
}

export default function PitchDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pitch = getPitchBySlug(params.slug);
  if (!pitch) notFound();

  // Use W3C dummy PDF for demo when local file missing
  const pdfUrl =
    pitch.pdfUrl.startsWith("/")
      ? "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      : pitch.pdfUrl;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/research/pitches"
            className="text-sm text-accent-blue"
          >
            ← Pitch Decks
          </Link>
          <h1 className="mt-2 font-serif text-3xl text-navy-dark">
            {pitch.company}
          </h1>
          <p className="text-sm text-text-muted">
            {pitch.ticker} · {pitch.analyst} · {formatDate(pitch.date)}
          </p>
          <div className="mt-2">
            <SectorBadge sector={pitch.sector} />
          </div>
        </div>
        <Button asChild>
          <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <PDFViewer url={pdfUrl} title={`${pitch.company} Pitch Deck`} />
        <aside className="space-y-4">
          <div className="border border-border bg-white p-5">
            <h2 className="font-serif text-lg text-navy-dark">Thesis Summary</h2>
            <p className="mt-2 text-sm text-text-muted">{pitch.thesis}</p>
          </div>
          <div className="border border-border bg-white p-5">
            <h3 className="text-sm font-semibold uppercase text-text-muted">
              Key Assumptions
            </h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-text-muted">
              <li>Revenue CAGR above sector median</li>
              <li>Margin expansion from scale efficiencies</li>
              <li>Stable competitive positioning</li>
            </ul>
          </div>
          <div className="border border-border bg-white p-5">
            <h3 className="text-sm font-semibold uppercase text-text-muted">
              Risk Factors
            </h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-text-muted">
              <li>Regulatory and policy changes</li>
              <li>Competitive entry and pricing pressure</li>
              <li>Macro demand volatility</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
