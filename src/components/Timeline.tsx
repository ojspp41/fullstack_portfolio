import type { ExperienceContent, Locale } from "@/lib/content";
import { UI } from "@/lib/i18n";
import Markdown from "./Markdown";
import Reveal from "./Reveal";

export default function Timeline({
  experience,
  locale = "ko",
}: {
  experience: ExperienceContent;
  locale?: Locale;
}) {
  const t = UI[locale].timeline;
  return (
    <div>
      <ol>
        {experience.jobs.map((job, i) => (
          <li key={i} className="pb-8 last:pb-0">
            <Reveal>
              <div className="rounded-2xl border-l-4 border-accent/60 bg-gradient-to-br from-indigo-50/90 to-purple-50/70 p-5 shadow-sm backdrop-blur dark:from-indigo-500/10 dark:to-purple-500/5 sm:p-6">
                <Markdown>{job}</Markdown>
                {/* AI Atlas 서비스 개요 — 첫 번째(현재) 직장에만, md 파일이 있을 때만 */}
                {i === 0 && experience.aiAtlasOverview && (
                  <>
                    {/* 백오피스 어드민 기능은 아코디언 밖에 항상 노출 (지원 직무 핵심) */}
                    {experience.aiAtlasOverview.backoffice && (
                      <div className="mt-5 rounded-xl border border-accent/30 bg-panel/70 px-4 py-3">
                        <p className="mb-2 text-xs font-bold text-accent">{t.backoffice}</p>
                        <Markdown>{experience.aiAtlasOverview.backoffice}</Markdown>
                      </div>
                    )}
                    {experience.aiAtlasOverview.main && (
                      <details className="mt-3 rounded-xl border border-line bg-panel/70 px-4 py-3">
                        <summary className="cursor-pointer text-xs font-bold text-accent">
                          {t.expandOverview}
                        </summary>
                        <div className="mt-3">
                          <Markdown>{experience.aiAtlasOverview.main}</Markdown>
                        </div>
                      </details>
                    )}
                  </>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {experience.extra && (
        <Reveal>
          <div className="mt-6 rounded-2xl border border-line bg-panel/80 p-5 shadow-sm backdrop-blur sm:p-6">
            <Markdown>{experience.extra}</Markdown>
          </div>
        </Reveal>
      )}
    </div>
  );
}
