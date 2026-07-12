import type { Profile } from "@/lib/content";
import MetricCounter from "./MetricCounter";
import Reveal from "./Reveal";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 sm:pt-36">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-[0.25em] text-amber">
            SEC.01 <span className="text-mute">//</span> FULL-STACK ENGINEER · AI / LLM
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {profile.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute">
            {profile.name} — {profile.role}
          </p>
        </Reveal>

        {/* headline instruments */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
          {profile.heroStats.map((stat, i) => (
            <div key={stat.label} className="bg-panel p-5">
              <Reveal delay={i * 90}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-mute">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-amber sm:text-3xl">
                  <MetricCounter value={stat.value} />
                </p>
                <p className="mt-2 text-xs leading-relaxed text-mute">{stat.note}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-md border border-amber bg-amber/10 px-5 py-2.5 font-mono text-sm text-amber transition-colors hover:bg-amber hover:text-bg"
            >
              Deep Dives ↓
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line px-5 py-2.5 font-mono text-sm text-mute transition-colors hover:border-mute hover:text-ink"
            >
              GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
