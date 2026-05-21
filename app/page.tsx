"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Layers,
  Newspaper,
  Presentation,
} from "lucide-react";
import { ContentCard } from "@/components/ContentCard";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { TickerMarquee } from "@/components/TickerMarquee";
import { Button } from "@/components/ui/button";
import {
  articles,
  stockReports,
  pitches,
  getCategoryCounts,
} from "@/lib/data";

const categories = [
  {
    icon: FileText,
    name: "Stock Reports",
    href: "/research/stock-reports",
    key: "reports" as const,
    desc: "Initiations, updates, and ratings with price targets.",
  },
  {
    icon: Presentation,
    name: "Pitch Decks",
    href: "/research/pitches",
    key: "pitches" as const,
    desc: "Investment theses in presentation format.",
  },
  {
    icon: Newspaper,
    name: "Market Articles",
    href: "/research/articles",
    key: "articles" as const,
    desc: "Thematic commentary and macro perspectives.",
  },
  {
    icon: Layers,
    name: "Sector Deep Dives",
    href: "/research/sector-notes",
    key: "sectorNotes" as const,
    desc: "Industry-level analysis and monitoring notes.",
  },
];

export default function HomePage() {
  const counts = getCategoryCounts();
  const featuredReports = stockReports.filter((r) => r.featured).slice(0, 2);
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 2);
  const featured = [
    ...featuredReports.map((r) => ({ type: "report" as const, data: r })),
    ...featuredArticles.map((a) => ({ type: "article" as const, data: a })),
  ].slice(0, 4);

  const latest = [
    ...articles.slice(0, 2).map((a) => ({ type: "article" as const, data: a })),
    ...stockReports.slice(0, 2).map((r) => ({ type: "report" as const, data: r })),
    ...pitches.slice(0, 2).map((p) => ({ type: "pitch" as const, data: p })),
  ].slice(0, 6);

  return (
    <>
      <section className="hero-grid relative overflow-hidden bg-navy-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-widest text-accent-gold">
              Thesis Point Research
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Conviction-Driven Investment Research
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Deep-dive stock reports, sector pitches, and market intelligence —
              built for serious investors.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/research">Explore Reports</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href="#newsletter">Subscribe for Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <TickerMarquee />
      </section>

      <section className="border-b border-border bg-surface-light py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-serif text-2xl text-navy-dark">
              Featured Research
            </h2>
            <Link
              href="/research"
              className="flex items-center gap-1 text-sm font-medium text-accent-blue"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {featured.map((item) =>
              item.type === "report" ? (
                <div key={item.data.id} className="min-w-[300px] max-w-[320px] shrink-0">
                  <ContentCard type="report" data={item.data} featured />
                </div>
              ) : (
                <div key={item.data.id} className="min-w-[300px] max-w-[320px] shrink-0">
                  <ContentCard type="article" data={item.data} featured />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-navy-dark">
            Research Categories
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const count = counts[cat.key];
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group border border-border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <cat.icon className="h-8 w-8 text-accent-blue" />
                  <h3 className="mt-4 font-serif text-lg text-navy-dark">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent-gold">
                    {count} reports
                  </p>
                  <p className="mt-2 text-sm text-text-muted">{cat.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue opacity-0 transition group-hover:opacity-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-navy-mid" />
            <h2 className="font-serif text-2xl text-navy-dark">
              Latest Research
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => {
              if (item.type === "article")
                return (
                  <ContentCard key={item.data.id} type="article" data={item.data} />
                );
              if (item.type === "report")
                return (
                  <ContentCard key={item.data.id} type="report" data={item.data} />
                );
              return (
                <ContentCard key={item.data.id} type="pitch" data={item.data} />
              );
            })}
          </div>
        </div>
      </section>

      <div id="newsletter">
        <NewsletterBanner />
      </div>
    </>
  );
}
