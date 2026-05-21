import { ContentCard } from "@/components/ContentCard";
import { articles } from "@/lib/data";

export const metadata = {
  title: "Articles",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-navy-dark">Market Articles</h1>
      <p className="mt-2 text-text-muted">
        Thematic commentary, macro perspectives, and sector insights.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ContentCard key={article.id} type="article" data={article} />
        ))}
      </div>
    </div>
  );
}
