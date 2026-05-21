import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface AuthorCardProps {
  name: string;
  bio?: string;
  designation?: string;
  sectorFocus?: string;
  avatarInitials?: string;
}

export function AuthorCard({
  name,
  bio,
  designation,
  sectorFocus,
  avatarInitials,
}: AuthorCardProps) {
  const initials =
    avatarInitials ??
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="flex gap-4 border border-border bg-surface-light p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-navy-mid font-serif text-lg text-white">
        {initials}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg text-navy-dark">{name}</h3>
          {designation && (
            <span className="text-xs font-medium text-accent-gold">
              {designation}
            </span>
          )}
          <Link
            href="https://linkedin.com"
            className="ml-auto text-text-muted hover:text-accent-blue"
            aria-label={`${name} on LinkedIn`}
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        {sectorFocus && (
          <p className="mt-1 text-sm text-accent-blue">{sectorFocus}</p>
        )}
        {bio && <p className="mt-2 text-sm text-text-muted">{bio}</p>}
      </div>
    </div>
  );
}
