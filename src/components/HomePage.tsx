import CareerSummary from "@/components/CareerSummary";
import ExperienceFeatures from "@/components/ExperienceFeatures";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MagneticButton from "@/components/MagneticButton";
import Markdown from "@/components/Markdown";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SideProjects from "@/components/SideProjects";
import Timeline from "@/components/Timeline";
import {
  getExperience,
  getExperienceFeatures,
  getProfile,
  getProjects,
  getSideProjects,
  type Locale,
} from "@/lib/content";
import { UI } from "@/lib/i18n";

const NAV_SECTIONS = [
  { id: "experience", ko: "경력", en: "Career" },
  { id: "representative", ko: "대표 프로젝트", en: "Selected projects" },
  { id: "projects", ko: "기술 사례", en: "Deep Dives" },
  { id: "ai-workflow", ko: "AI 업무 활용", en: "AI Workflow" },
  { id: "side-projects", ko: "제품·오픈소스", en: "Product & Open Source" },
  { id: "contact", ko: "연락", en: "Contact" },
];

export default function HomePage({ locale }: { locale: Locale }) {
  const t = UI[locale];
  const profile = getProfile(locale);
  const projects = getProjects(locale);
  const experience = getExperience(locale);
  const sideProjects = getSideProjects(locale);
  const representative = getExperienceFeatures("representative", locale);
  const workflow = getExperienceFeatures("workflow", locale);

  return (
    <main className="relative">
      <Header
        items={NAV_SECTIONS.map(({ id, ...label }) => ({ id, label: label[locale] }))}
        email={profile.email}
        resumePdf={profile.resumePdf}
        locale={locale}
      />

      <Hero profile={profile} locale={locale}>
        <h2 className="mb-4 text-2xl font-bold tracking-tight">{t.sections.career.title}</h2>
        <CareerSummary items={experience.summary} />
        <details className="mb-5 rounded-xl border border-line bg-panel/80 px-5">
          <summary className="cursor-pointer py-3 text-sm font-semibold text-accent">
            {t.sections.career.details}
          </summary>
          <div className="border-t border-line py-5">
            <Timeline experience={experience} locale={locale} />
            {sideProjects.awards && (
              <div className="mt-5">
                <h3 className="mb-2 text-base font-bold">{t.sideProjects.awards}</h3>
                <Markdown>{sideProjects.awards}</Markdown>
              </div>
            )}
          </div>
        </details>
      </Hero>

      <section id="representative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading {...t.sections.representative} />
            <div className="mb-8 max-w-4xl border-l-2 border-accent/30 pl-5">
              <p className="mb-3 text-sm font-bold text-accent">{t.sections.about}</p>
              <Markdown>{profile.intro}</Markdown>
            </div>
          </Reveal>
          <ExperienceFeatures items={representative} locale={locale} featured />
        </div>
      </section>

      {/* Deep Dives */}
      <section id="projects" className="relative">
        {/* Bookmarks to the former overview now land on the case studies. */}
        <span id="architecture" aria-hidden="true" className="absolute top-0" />
        <span id="coverage" aria-hidden="true" className="absolute top-0" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index={t.sections.deepDives.index}
              label={t.sections.deepDives.label}
              title={t.sections.deepDives.title(projects.length)}
              sub={t.sections.deepDives.sub}
            />
          </Reveal>
          <ProjectsSection projects={projects} locale={locale} />
          <p className="mt-6 text-xs leading-relaxed text-mute">{t.sections.disclosure}</p>
        </div>
      </section>

      <section id="ai-workflow" className="relative">
        <span id="ai-development" aria-hidden="true" className="absolute top-0" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading {...t.sections.workflow} />
            <p className="mb-8 max-w-3xl border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-ink">
              {t.sections.workflowPrinciple}
            </p>
          </Reveal>
          <ExperienceFeatures items={workflow} locale={locale} />
        </div>
      </section>

      {/* Open Source & Side Projects */}
      <section id="side-projects">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index={t.sections.openSource.index}
              label={t.sections.openSource.label}
              title={t.sections.openSource.title}
            />
          </Reveal>
          <SideProjects content={sideProjects} locale={locale} />
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="border-t border-line/60 bg-panel/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index={t.sections.contact.index}
              label={t.sections.contact.label}
              title={t.sections.contact.title}
            />
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <MagneticButton>
                <a
                  href={`mailto:${profile.email}`}
                  className="grad-bg block rounded-xl px-6 py-3 text-white shadow-lg shadow-indigo-500/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/40"
                >
                  {profile.email}
                </a>
              </MagneticButton>
              {profile.resumePdf && (
                <a
                  href={profile.resumePdf}
                  download
                  className="rounded-xl border-2 border-line bg-panel px-6 py-3 text-ink shadow-md transition-all duration-300 hover:scale-105 hover:border-accent/50"
                >
                  {t.footer.pdf}
                </a>
              )}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-line bg-panel px-6 py-3 text-ink shadow-md transition-all duration-300 hover:scale-105 hover:border-accent/50"
              >
                GitHub ↗
              </a>
            </div>
            <p className="mt-12 text-xs text-mute/70">
              © {new Date().getFullYear()} {profile.name} — {t.footer.note}
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
