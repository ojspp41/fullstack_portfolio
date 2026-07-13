import type { Profile } from "@/lib/content";
import MetricCounter from "./MetricCounter";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import TypeWriter from "./TypeWriter";

// pastel pill palette cycled over profile.badges (old-portfolio style)
const PILL_COLORS = [
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200",
  "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200",
  "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200",
  "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200",
];

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-28 sm:pt-32">
        <Reveal>
          <p className="mb-3 text-lg font-medium text-accent">안녕하세요, 저는</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            오준석<span className="text-mute/70 text-2xl sm:text-4xl"> 입니다</span>
          </h1>
          <p className="mt-4 h-9 text-2xl sm:text-3xl">
            <TypeWriter />
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            {profile.tagline}. {profile.subtagline}.
          </p>
        </Reveal>

        {/* award / cert pills */}
        {profile.badges.length > 0 && (
          <Reveal delay={120}>
            <div className="mt-7 flex flex-wrap gap-2">
              {profile.badges.map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium shadow-sm ${PILL_COLORS[i % PILL_COLORS.length]}`}
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {/* CTA buttons */}
        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <a
                href="#projects"
                className="grad-bg inline-flex items-center rounded-xl px-7 py-3 text-base font-medium text-white shadow-lg shadow-indigo-500/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                프로젝트 보기
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#coverage"
                className="inline-flex items-center rounded-xl border-2 border-line bg-panel px-7 py-3 text-base font-medium text-ink shadow-md transition-colors duration-300 hover:border-accent/50"
              >
                Coverage Map
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border-2 border-line bg-panel px-7 py-3 text-base font-medium text-ink shadow-md transition-colors duration-300 hover:border-accent/50"
              >
                GitHub ↗
              </a>
            </MagneticButton>
          </div>
        </Reveal>

        {/* headline metrics */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profile.heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="h-full">
              <TiltCard>
                <div className="h-full rounded-2xl border border-line bg-panel/80 p-5 shadow-sm backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                  {stat.label}
                </p>
                <p className="grad-text mt-2 text-2xl font-bold sm:text-3xl">
                  <MetricCounter value={stat.value} />
                </p>
                  <p className="mt-2 text-xs leading-relaxed text-mute">{stat.note}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
