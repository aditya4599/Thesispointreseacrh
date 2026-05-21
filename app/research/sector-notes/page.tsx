import Link from "next/link";
import { SectorBadge } from "@/components/SectorBadge";
import { sectorNotes } from "@/lib/data";
import { SECTORS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Sector } from "@/lib/types";

export const metadata = {
  title: "Sector Deep Dives",
};

export default function SectorNotesPage() {
  const grouped = SECTORS.reduce(
    (acc, sector) => {
      acc[sector] = sectorNotes.filter((n) => n.sector === sector);
      return acc;
    },
    {} as Record<Sector, typeof sectorNotes>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-navy-dark">Sector Deep Dives</h1>
      <p className="mt-2 text-text-muted">
        Industry-level monitoring notes grouped by sector.
      </p>

      <div className="mt-12 space-y-12">
        {SECTORS.map((sector) => {
          const notes = grouped[sector];
          if (!notes.length) return null;
          return (
            <section key={sector} id={sector.toLowerCase()}>
              <div className="mb-6 flex items-center gap-3">
                <SectorBadge sector={sector} />
                <span className="text-sm text-text-muted">
                  {notes.length} notes
                </span>
              </div>
              <div className="divide-y divide-border border border-border bg-white">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    id={note.slug}
                    className="p-6 transition hover:bg-surface-light"
                  >
                    <h2 className="font-serif text-xl text-navy-dark">
                      {note.title}
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                      {note.analyst} · {formatDate(note.date)}
                    </p>
                    <p className="mt-3 text-text-muted">{note.preview}</p>
                    <Link
                      href={`/research/articles`}
                      className="mt-3 inline-block text-sm font-medium text-accent-blue"
                    >
                      Read full note →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
