import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2 } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { ContentCard } from "@/components/ContentCard";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { SectorBadge } from "@/components/SectorBadge";
import { articles, getArticleBySlug } from "@/lib/data";
import { getArticleMarkdown } from "@/lib/markdown";
import { getDefaultArticleBody } from "@/lib/article-body";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  return { title: article?.title ?? "Article" };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const md = await getArticleMarkdown(params.slug);
  const bodyHtml =
    md?.html ??
    getDefaultArticleBody(article.title, article.excerpt);

  const related = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const toc = [
    "Executive Summary",
    "Key Themes",
    "Investment Implications",
    "Conclusion",
  ];

  return (
    <>
      <section className="bg-navy-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400">
            <Link href="/research" className="hover:text-white">
              Research
            </Link>
            {" / "}
            <Link href="/research/articles" className="hover:text-white">
              Articles
            </Link>
            {" / "}
            <span className="text-slate-300">{article.sector}</span>
          </nav>
          <SectorBadge sector={article.sector} />
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-slate-300">
            {article.author} · {formatDate(article.date)} · {article.readTime}
          </p>
          <div className="mt-4 flex gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/20 px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <article>
            <div
              className="prose-research"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
            <div className="mt-8 flex gap-3 border-t border-border pt-6">
              <span className="text-sm text-text-muted">Share</span>
              <button type="button" className="text-text-muted hover:text-accent-blue">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-10">
              <AuthorCard
                name={article.author}
                sectorFocus={article.sector}
                bio="Senior analyst at Thesis Point Research covering thematic and sector research."
                designation="CFA"
              />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-white p-5">
              <h3 className="text-sm font-semibold uppercase text-text-muted">
                Table of Contents
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-accent-blue hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterBanner compact />
          </aside>
        </div>

        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-serif text-2xl text-navy-dark">
            You may also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((a) => (
              <ContentCard key={a.id} type="article" data={a} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
