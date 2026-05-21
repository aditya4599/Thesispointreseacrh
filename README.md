# Thesis Point Research

Professional financial research platform built with Next.js 14, Tailwind CSS, shadcn-style UI components, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — custom navy/gold design system
- **shadcn/ui** patterns (Button, Input, Badge)
- **Framer Motion** — subtle animations
- **react-pdf** — pitch deck viewer (falls back to iframe)
- **recharts** — placeholder charts on stock reports
- **Local JSON + Markdown** — easy CMS migration later

## Project Structure

- `app/` — all routes (home, research hub, articles, reports, pitches, about, contact, disclaimer)
- `components/` — Navbar, Footer, ContentCard, FilterSidebar, PDFViewer, etc.
- `data/` — mock JSON for articles, stock reports, pitches, sector notes, team
- `content/articles/` — markdown bodies for article detail pages

## Adding Content

1. Add entries to `data/articles.json`, `data/stockReports.json`, or `data/pitches.json`
2. For articles, optionally add `content/articles/[slug].md`
3. Place PDFs in `public/pdfs/` for local PDF viewing

## Design

Inspired by S&P Global: deep navy (`#0A1628`), accent blue/gold, serif headings (Playfair Display), sans body (Inter).
