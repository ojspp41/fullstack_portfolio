import type { ExperienceFeature, Locale } from "@/lib/content";
import { UI } from "@/lib/i18n";
import Markdown from "./Markdown";
import Reveal from "./Reveal";

function FeatureSteps({ steps, label }: { steps: string[]; label: string }) {
  if (!steps.length) return null;
  return (
    <ol aria-label={label} className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, stepIndex) => (
        <li key={step} className="flex min-w-0 items-center gap-2 text-xs">
          {stepIndex > 0 && <span aria-hidden="true" className="text-accent/60">→</span>}
          <span className="rounded-lg border border-line bg-bg/60 px-2.5 py-1.5 leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Summary → evidence → optional implementation details, using the existing card language. */
export default function ExperienceFeatures({
  items,
  locale,
  featured = false,
}: {
  items: ExperienceFeature[];
  locale: Locale;
  featured?: boolean;
}) {
  const t = UI[locale].features;
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${featured ? "items-stretch xl:grid-cols-3" : "items-start"}`}>
      {items.map((item, i) => (
        <Reveal key={item.id} delay={(i % 2) * 80} className={featured ? "grid min-w-0" : "min-w-0"}>
          <article
            id={item.id}
            className={`scroll-mt-20 rounded-2xl border border-line bg-panel/85 p-5 shadow-sm backdrop-blur sm:p-6 ${featured ? "flex flex-col" : ""}`}
          >
            <p className="text-xs font-semibold tracking-wide text-accent">{item.eyebrow}</p>
            <h3 className="mt-2 text-lg font-bold leading-snug">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{item.summary}</p>

            {item.metrics.length > 0 && (
              <dl className="mt-5 grid grid-cols-2 gap-2">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 rounded-xl bg-panel2 p-3">
                    <dt className="text-[11px] text-mute">{metric.label}</dt>
                    <dd className="mt-1 break-words font-mono text-sm font-semibold text-accent">{metric.value}</dd>
                    {metric.note && <dd className="mt-1 text-[11px] leading-relaxed text-mute">{metric.note}</dd>}
                  </div>
                ))}
              </dl>
            )}

            {item.decision && (
              <p className="mt-5 border-l-2 border-accent/50 pl-3 text-sm font-medium leading-relaxed text-ink">
                {item.decision}
              </p>
            )}

            {!featured && <FeatureSteps steps={item.steps} label={t.flow} />}

            {featured && <div aria-hidden="true" className="grow" />}

            {item.stack.length > 0 && (
              <ul aria-label={t.stack} className="mt-5 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li key={tech} className="rounded-md bg-bg/70 px-2 py-1 font-mono text-[11px] text-mute">{tech}</li>
                ))}
              </ul>
            )}

            {(item.body || (featured && item.steps.length > 0)) && (
              <details className="mt-5 border-t border-line pt-4">
                <summary className="cursor-pointer text-sm font-medium text-accent">{t.details}</summary>
                {featured && <FeatureSteps steps={item.steps} label={t.flow} />}
                {item.body && <Markdown className="mt-4">{item.body}</Markdown>}
              </details>
            )}
            {item.link && (
              <a href={item.link.href} className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
                {item.link.label} <span aria-hidden="true" className="ml-1">→</span>
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
