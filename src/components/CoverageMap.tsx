import type { CoverageRow, Locale } from "@/lib/content";
import { UI } from "@/lib/i18n";

/**
 * Full-Stack Coverage Map — one-glance matrix of what was built directly
 * vs. integrated with, per layer. Data comes from the table in
 * content/sections/profile.md.
 */
export default function CoverageMap({
  coverage,
  locale = "ko",
}: {
  coverage: CoverageRow[];
  locale?: Locale;
}) {
  const t = UI[locale].coverageMap;
  if (coverage.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
      {/* header */}
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)] gap-px bg-line sm:grid-cols-[9rem_minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="bg-panel2 px-3 py-2.5 text-[11px] font-bold text-mute sm:px-4">
          {t.layer}
        </div>
        <div className="flex items-center gap-2 bg-panel2 px-3 py-2.5 text-[11px] font-bold text-accent sm:px-4">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {t.direct}
        </div>
        <div className="flex items-center gap-2 bg-panel2 px-3 py-2.5 text-[11px] font-bold text-sub sm:px-4">
          <span className="h-2 w-2 rounded-full bg-sub" />
          {t.integrated}
        </div>

        {/* rows */}
        {coverage.map((row) => (
          <div key={row.layer} className="contents">
            <div className="flex items-center bg-panel px-3 py-3 text-xs font-bold text-ink sm:px-4">
              {row.layer}
            </div>
            <div className="flex flex-wrap content-start gap-1.5 bg-panel px-3 py-3 sm:px-4">
              {row.direct.length > 0 ? (
                row.direct.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium leading-snug text-accent"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-mute/50">—</span>
              )}
            </div>
            <div className="flex flex-wrap content-start gap-1.5 bg-panel px-3 py-3 sm:px-4">
              {row.integrated.length > 0 ? (
                row.integrated.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sub/10 px-2.5 py-1 text-[11px] font-medium leading-snug text-sub"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-mute/50">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
