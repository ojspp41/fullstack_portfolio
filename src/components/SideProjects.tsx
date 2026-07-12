import type { SideProjectsContent } from "@/lib/content";
import Markdown from "./Markdown";
import Reveal from "./Reveal";

export default function SideProjects({ content }: { content: SideProjectsContent }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {content.cards.map((card, i) => (
          <Reveal key={i} delay={(i % 2) * 80}>
            <div className="h-full rounded-lg border border-line bg-panel p-5 transition-colors hover:border-amber/40">
              <Markdown>{card}</Markdown>
            </div>
          </Reveal>
        ))}
      </div>

      {content.awards && (
        <Reveal>
          <div className="mt-6 rounded-lg border border-line bg-panel2 p-5 sm:p-6">
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">
              AWARDS <span className="text-mute">//</span> 수상 내역
            </p>
            <Markdown>{content.awards}</Markdown>
          </div>
        </Reveal>
      )}

      {content.aiExperience && (
        <Reveal>
          <div className="mt-4 rounded-lg border border-line bg-panel p-5 sm:p-6">
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">
              AI <span className="text-mute">//</span> AI 활용 경험
            </p>
            <Markdown>{content.aiExperience}</Markdown>
          </div>
        </Reveal>
      )}
    </div>
  );
}
