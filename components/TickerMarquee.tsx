import { TICKER_SYMBOLS } from "@/lib/constants";

export function TickerMarquee() {
  const items = [...TICKER_SYMBOLS, ...TICKER_SYMBOLS];

  return (
    <div className="overflow-hidden border-t border-white/10 bg-navy-dark/80 py-2">
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {items.map((t, i) => (
          <span
            key={`${t.symbol}-${i}`}
            className="inline-flex items-center gap-3 text-sm text-slate-300"
          >
            <span className="font-semibold text-white">{t.symbol}</span>
            <span>{t.price.toLocaleString()}</span>
            <span
              className={
                t.change.startsWith("+") ? "text-emerald-400" : "text-red-400"
              }
            >
              {t.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
