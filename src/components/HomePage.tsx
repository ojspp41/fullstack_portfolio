import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import CareerSummary from "@/components/CareerSummary";
import CoverageMap from "@/components/CoverageMap";
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
  getProfile,
  getProjects,
  getSideProjects,
  type Locale,
} from "@/lib/content";
import { UI } from "@/lib/i18n";

const NAV_SECTIONS = [
  { id: "experience", label: "Career" },
  { id: "architecture", label: "Architecture" },
  { id: "projects", label: "Projects" },
  { id: "side-projects", label: "Open Source" },
  { id: "contact", label: "Contact" },
];

const CARD = "h-full rounded-2xl border border-line bg-panel/80 p-5 shadow-sm backdrop-blur";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = UI[locale];
  const profile = getProfile(locale);
  const projects = getProjects(locale);
  const experience = getExperience(locale);
  const sideProjects = getSideProjects(locale);

  const projectTitles = Object.fromEntries(projects.map((p) => [p.id, p.title]));

  return (
    <main className="relative">
      <Header
        items={NAV_SECTIONS}
        email={profile.email}
        resumePdf={profile.resumePdf}
        locale={locale}
      />

      <Hero profile={profile} locale={locale} />

      {/* Experience */}
      <section id="experience">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index={t.sections.career.index}
              label={t.sections.career.label}
              title={t.sections.career.title}
            />
          </Reveal>
          <CareerSummary items={experience.summary} />
          <Timeline experience={experience} locale={locale} />
        </div>
      </section>

      {/* Architecture — full-stack scope */}
      <section id="architecture">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index={t.sections.architecture.index}
              label={t.sections.architecture.label}
              title={t.sections.architecture.title}
              sub={t.sections.architecture.sub}
            />
          </Reveal>
          <Reveal delay={100}>
            <ArchitectureDiagram projectTitles={projectTitles} locale={locale} />
          </Reveal>

          {/* Coverage Map — per-layer direct vs. integrated matrix */}
          <Reveal>
            <div id="coverage" className="mt-14 scroll-mt-16">
              <h3 className="mb-4 text-lg font-bold">{t.sections.coverage}</h3>
              <CoverageMap coverage={profile.coverage} locale={locale} />
            </div>
          </Reveal>

          {/* About — intro / stack / strengths from profile.md */}
          <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">{t.sections.about}</p>
                <Markdown>{profile.intro}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">{t.sections.stack}</p>
                <Markdown>{profile.stack}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">{t.sections.strengths}</p>
                <Markdown>{profile.strengths}</Markdown>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deep Dives */}
      <section id="projects">
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
        </div>
      </section>

      {/* Open Source & Side Projects */}
      <section id="side-projects">
        <div className="mx-auto max-w-5xl px-6 py-20">
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
        <div className="mx-auto max-w-5xl px-6 py-20">
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
