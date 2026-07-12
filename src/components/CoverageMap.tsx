import type { CoverageRow } from "@/lib/content";

/**
 * Full-Stack Coverage Map — one-glance matrix of what was built directly
 * vs. integrated with, per layer. Data comes from the table in
 * content/sections/profile.md.
 */
export default function CoverageMap({ coverage }: { coverage: CoverageRow[] }) {
  if (coverage.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      {/* header */}
      <div className="grid grid-cols-[6.5rem_1fr_1fr] gap-px bg-line sm:grid-cols-[9rem_1.4fr_1fr]">
        <div className="bg-panel2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-mute sm:px-4">
          Layer
        </div>
        <div className="flex items-center gap-2 bg-panel2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-amber sm:px-4">
          <span className="h-2 w-2 rounded-full bg-amber" />
          직접 구현
        </div>
        <div className="flex items-center gap-2 bg-panel2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-steel sm:px-4">
          <span className="h-2 w-2 rounded-full bg-steel" />
          설계 이해 · 연동
        </div>

        {/* rows */}
        {coverage.map((row) => (
          <div key={row.layer} className="contents">
            <div className="flex items-center bg-panel px-3 py-3 font-mono text-xs font-semibold text-ink sm:px-4">
              {row.layer}
            </div>
            <div className="flex flex-wrap content-start gap-1.5 bg-panel px-3 py-3 sm:px-4">
              {row.direct.length > 0 ? (
                row.direct.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-amber/40 bg-amber/10 px-2 py-1 text-[11px] leading-snug text-amber"
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
                    className="rounded border border-steel/40 bg-steel/10 px-2 py-1 text-[11px] leading-snug text-steel"
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
