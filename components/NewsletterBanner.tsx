"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterBannerProps {
  compact?: boolean;
}

export function NewsletterBanner({ compact = false }: NewsletterBannerProps) {
  return (
    <section
      className={
        compact
          ? "rounded-sm border border-navy-mid/30 bg-navy-dark p-6"
          : "bg-navy-dark py-16"
      }
    >
      <div
        className={
          compact
            ? ""
            : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        }
      >
        <h2
          className={`font-serif text-white ${compact ? "text-xl" : "text-3xl"}`}
        >
          Get our research in your inbox
        </h2>
        <p
          className={`mt-2 text-slate-300 ${compact ? "text-sm" : "text-base"}`}
        >
          Join 2,000+ investors receiving weekly insights and report alerts.
        </p>
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="you@company.com"
            className="max-w-md border-slate-600 bg-white/10 text-white placeholder:text-slate-400"
            aria-label="Email address"
          />
          <Button type="submit" className="shrink-0">
            Subscribe for Free
          </Button>
        </form>
      </div>
    </section>
  );
}
