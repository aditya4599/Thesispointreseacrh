import articlesData from "@/data/articles.json";
import stockReportsData from "@/data/stockReports.json";
import pitchesData from "@/data/pitches.json";
import sectorNotesData from "@/data/sectorNotes.json";
import teamData from "@/data/team.json";
import type {
  Article,
  Pitch,
  ResearchItem,
  SectorNote,
  StockReport,
  TeamMember,
} from "./types";

export const articles = articlesData as Article[];
export const stockReports = stockReportsData as StockReport[];
export const pitches = pitchesData as Pitch[];
export const sectorNotes = sectorNotesData as SectorNote[];
export const team = teamData as TeamMember[];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getStockReportBySlug(slug: string) {
  return stockReports.find((r) => r.slug === slug);
}

export function getPitchBySlug(slug: string) {
  return pitches.find((p) => p.slug === slug);
}

export function getAllResearchItems(): ResearchItem[] {
  const items: ResearchItem[] = [
    ...articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      type: "article" as const,
      title: a.title,
      date: a.date,
      author: a.author,
      summary: a.excerpt,
      sector: a.sector,
      href: `/research/articles/${a.slug}`,
    })),
    ...stockReports.map((r) => ({
      id: r.id,
      slug: r.slug,
      type: "stock-report" as const,
      title: `${r.company} (${r.ticker})`,
      date: r.date,
      author: r.analyst,
      summary: r.summary,
      sector: r.sector,
      href: `/research/stock-reports/${r.slug}`,
      ticker: r.ticker,
      rating: r.rating,
    })),
    ...pitches.map((p) => ({
      id: p.id,
      slug: p.slug,
      type: "pitch" as const,
      title: `${p.company} Pitch Deck`,
      date: p.date,
      author: p.analyst,
      summary: p.thesis,
      sector: p.sector,
      href: `/research/pitches/${p.slug}`,
      ticker: p.ticker,
    })),
    ...sectorNotes.map((n) => ({
      id: n.id,
      slug: n.slug,
      type: "sector-note" as const,
      title: n.title,
      date: n.date,
      author: n.analyst,
      summary: n.preview,
      sector: n.sector,
      href: `/research/sector-notes#${n.slug}`,
    })),
  ];

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedContent() {
  return {
    articles: articles.filter((a) => a.featured).slice(0, 2),
    reports: stockReports.filter((r) => r.featured).slice(0, 2),
    pitches: pitches.filter((p) => p.featured).slice(0, 2),
  };
}

export function getCategoryCounts() {
  return {
    articles: articles.length,
    reports: stockReports.length,
    pitches: pitches.length,
    sectorNotes: sectorNotes.length,
  };
}
