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
