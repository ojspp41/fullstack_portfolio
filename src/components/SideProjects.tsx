import type { Locale, SideProjectsContent } from "@/lib/content";
import { UI } from "@/lib/i18n";
import Markdown from "./Markdown";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function SideProjects({
  content,
  locale = "ko",
}: {
  content: SideProjectsContent;
  locale?: Locale;
}) {
  const t = UI[locale].sideProjects;
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {content.cards.map((card, i) => (
          <Reveal key={i} delay={(i % 2) * 80} className="h-full">
            <TiltCard max={5}>
              <div className="h-full rounded-2xl border border-line bg-panel/85 p-5 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                <Markdown>{card}</Markdown>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {content.awards && (
        <Reveal>
          <div className="mt-6 rounded-2xl border border-line bg-gradient-to-br from-indigo-50/90 to-pink-50/60 p-5 shadow-sm dark:from-indigo-500/10 dark:to-pink-500/5 sm:p-6">
            <p className="mb-3 text-sm font-bold text-accent">{t.awards}</p>
            <Markdown>{content.awards}</Markdown>
          </div>
        </Reveal>
      )}

      {content.aiExperience && (
        <Reveal>
          <div className="mt-4 rounded-2xl border border-line bg-panel/85 p-5 shadow-sm backdrop-blur sm:p-6">
            <p className="mb-3 text-sm font-bold text-accent">{t.ai}</p>
            <Markdown>{content.aiExperience}</Markdown>
          </div>
        </Reveal>
      )}
    </div>
  );
}
