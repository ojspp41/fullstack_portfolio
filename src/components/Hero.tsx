import type { ReactNode } from "react";
import type { Locale, Profile } from "@/lib/content";
import { UI } from "@/lib/i18n";
import HeroLottie from "./HeroLottie";
import MetricCounter from "./MetricCounter";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

// pastel pill palette cycled over profile.badges (old-portfolio style)
const PILL_COLORS = [
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200",
  "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200",
  "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200",
  "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200",
];

export default function Hero({ profile, locale, children }: { profile: Profile; locale: Locale; children: ReactNode }) {
  const t = UI[locale].hero;
  return (
    <section id="experience" className="relative">
      <span id="hero" aria-hidden="true" className="absolute top-0" />
      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-24 sm:pt-28">
        <div className="mb-7 flex items-center justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.name}</h1>
            <p className="mt-2 text-lg font-semibold text-accent">{profile.role}</p>
          </div>
          <div className="pointer-events-none hidden h-24 w-32 lg:block" aria-hidden>
            <HeroLottie />
          </div>
        </div>

        {children}

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
                href="#representative"
                className="grad-bg inline-flex items-center rounded-xl px-7 py-3 text-base font-medium text-white shadow-lg shadow-indigo-500/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                {t.ctaProjects}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center rounded-xl border-2 border-line bg-panel px-7 py-3 text-base font-medium text-ink shadow-md transition-colors duration-300 hover:border-accent/50"
              >
                {t.ctaCases}
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
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
