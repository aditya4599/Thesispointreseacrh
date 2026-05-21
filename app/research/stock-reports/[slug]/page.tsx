import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { RatingBadge } from "@/components/RatingBadge";
import { SectorBadge } from "@/components/SectorBadge";
import { StockReportChart } from "@/components/StockReportChart";
import { Button } from "@/components/ui/button";
import { getStockReportBySlug, stockReports } from "@/lib/data";
import { calcUpside, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return stockReports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const report = getStockReportBySlug(params.slug);
  return { title: report ? `${report.company} (${report.ticker})` : "Report" };
}

export default function StockReportDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const report = getStockReportBySlug(params.slug);
  if (!report) notFound();

  const upside = calcUpside(report.targetPrice, report.currentPrice);

  return (
    <>
      <section className="border-b border-border bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-mono text-2xl font-bold text-navy-dark">
              {report.ticker}
            </span>
            <RatingBadge rating={report.rating} />
            <SectorBadge sector={report.sector} />
          </div>
          <h1 className="mt-2 font-serif text-3xl text-navy-dark">
            {report.company}
          </h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ["Current Price", report.currentPrice.toLocaleString()],
              ["Target Price", report.targetPrice.toLocaleString()],
              ["Upside", `${Number(upside) >= 0 ? "+" : ""}${upside}%`],
              ["Analyst", report.analyst],
              ["Published", formatDate(report.date)],
              ["Sector", report.sector],
            ].map(([label, value]) => (
              <div key={label} className="border border-border bg-white p-3">
                <p className="text-xs text-text-muted">{label}</p>
                <p className="mt-1 font-semibold text-navy-dark">{value}</p>
              </div>
            ))}
          </div>
          <Button className="mt-6" asChild>
            <a href={report.pdfUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="prose-research space-y-8">
            <section>
              <h2>Investment Thesis</h2>
              <p>{report.summary}</p>
              <p>
                We initiate/update coverage with a {report.rating} rating and a
                price target of {report.targetPrice.toLocaleString()}, implying{" "}
                {upside}% upside from the current price of{" "}
                {report.currentPrice.toLocaleString()}.
              </p>
            </section>
            <StockReportChart />
            <section>
              <h2>Valuation</h2>
              <p>
                Our valuation framework blends DCF analysis with peer-relative
                multiples. We assume a terminal growth rate consistent with
                long-term GDP and sector maturity considerations.
              </p>
            </section>
            <section>
              <h2>Catalysts</h2>
              <ul>
                <li>Earnings beats vs. consensus estimates</li>
                <li>Margin expansion from operating leverage</li>
                <li>Strategic initiatives and capital allocation updates</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-white p-5">
              <h3 className="text-sm font-semibold uppercase text-text-muted">
                Key Financials
              </h3>
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {[
                    ["Revenue (FY25E)", "—"],
                    ["EBITDA Margin", "—"],
                    ["P/E (FY25E)", "—"],
                    ["ROE", "—"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-border">
                      <td className="py-2 text-text-muted">{k}</td>
                      <td className="py-2 text-right font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border border-border bg-white p-5">
              <h3 className="text-sm font-semibold uppercase text-text-muted">
                Risk Summary
              </h3>
              <ul className="mt-3 list-disc pl-4 text-sm text-text-muted">
                <li>Macro and rate sensitivity</li>
                <li>Competitive pressure on pricing</li>
                <li>Execution risk on strategic initiatives</li>
              </ul>
            </div>
            <div className="border border-border bg-white p-5">
              <h3 className="text-sm font-semibold uppercase text-text-muted">
                Peer Comparison
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                See full report for detailed peer multiples and relative
                valuation vs. sector median.
              </p>
              <Link
                href="/research/stock-reports"
                className="mt-3 inline-block text-sm text-accent-blue"
              >
                ← All stock reports
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
