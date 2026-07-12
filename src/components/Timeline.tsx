import type { ExperienceContent } from "@/lib/content";
import Markdown from "./Markdown";
import Reveal from "./Reveal";

export default function Timeline({ experience }: { experience: ExperienceContent }) {
  return (
    <div>
      <ol className="relative ml-1 border-l border-line pl-6 sm:pl-8">
        {experience.jobs.map((job, i) => (
          <li key={i} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg sm:-left-[39px] ${
                i === 0 ? "bg-amber" : "bg-steel"
              }`}
              aria-hidden
            />
            <Reveal>
              <div className="rounded-lg border border-line bg-panel p-5 sm:p-6">
                <Markdown>{job}</Markdown>
                {/* AI Atlas 서비스 개요 — 첫 번째(현재) 직장에만, md 파일이 있을 때만 */}
                {i === 0 && experience.aiAtlasOverview && (
                  <details open className="mt-5 rounded-md border border-line bg-panel2 px-4 py-3">
                    <summary className="cursor-pointer font-mono text-xs tracking-[0.15em] text-amber">
                      AI ATLAS <span className="text-mute">//</span> 서비스 개요 · 백오피스 어드민 기능
                    </summary>
                    <div className="mt-3">
                      <Markdown>{experience.aiAtlasOverview}</Markdown>
                    </div>
                  </details>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {experience.extra && (
        <Reveal>
          <div className="mt-6 rounded-lg border border-line bg-panel2 p-5 sm:p-6">
            <Markdown>{experience.extra}</Markdown>
          </div>
        </Reveal>
      )}
    </div>
  );
}
