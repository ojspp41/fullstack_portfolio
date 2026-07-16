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

    </div>
  );
}
