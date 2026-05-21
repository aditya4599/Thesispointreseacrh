import { ContentCard } from "@/components/ContentCard";
import { pitches } from "@/lib/data";

export const metadata = {
  title: "Pitch Decks",
};

export default function PitchesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-navy-dark">Pitch Decks</h1>
      <p className="mt-2 text-text-muted">
        Investment theses in presentation format with full PDF viewer.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pitches.map((pitch) => (
          <ContentCard key={pitch.id} type="pitch" data={pitch} />
        ))}
      </div>
    </div>
  );
}
