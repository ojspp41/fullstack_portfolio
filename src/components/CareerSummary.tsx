import type { CareerSummaryItem } from "@/lib/content";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/** Career at a glance — compact company cards above the detailed timeline. */
export default function CareerSummary({ items }: { items: CareerSummaryItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.company} delay={i * 90} className="h-full">
          <TiltCard max={5}>
            <div className="h-full rounded-2xl border-l-4 border-accent/60 bg-panel/85 p-5 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-base font-bold">{item.company}</p>
                <p className="font-mono text-xs text-mute">{item.period}</p>
              </div>
              <p className="mt-1 text-sm font-semibold text-accent">{item.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-mute">{item.highlight}</p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
