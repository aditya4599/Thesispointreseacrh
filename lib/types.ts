export type Sector =
  | "Technology"
  | "Healthcare"
  | "Financials"
  | "Energy"
  | "Consumer"
  | "Industrials"
  | "Macro";

export type Rating = "BUY" | "HOLD" | "SELL";

export type ContentType =
  | "article"
  | "stock-report"
  | "pitch"
  | "sector-note";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  sector: Sector;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface StockReport {
  id: string;
  slug: string;
  ticker: string;
  company: string;
  rating: Rating;
  targetPrice: number;
  currentPrice: number;
  sector: Sector;
  analyst: string;
  date: string;
  summary: string;
  pdfUrl: string;
  featured?: boolean;
}

export interface Pitch {
  id: string;
  slug: string;
  company: string;
  ticker: string;
  sector: Sector;
  thesis: string;
  analyst: string;
  date: string;
  pdfUrl: string;
  coverImage?: string;
  featured?: boolean;
}

export interface SectorNote {
  id: string;
  slug: string;
  title: string;
  sector: Sector;
  analyst: string;
  date: string;
  preview: string;
}

export interface TeamMember {
  name: string;
  title: string;
  designation?: string;
  sectorFocus: string;
  bio: string;
  linkedin?: string;
}

export interface ResearchItem {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  date: string;
  author: string;
  summary: string;
  sector: Sector;
  href: string;
  ticker?: string;
  rating?: Rating;
}
