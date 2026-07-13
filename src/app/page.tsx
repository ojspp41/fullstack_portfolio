import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import CoverageMap from "@/components/CoverageMap";
import Hero from "@/components/Hero";
import MagneticButton from "@/components/MagneticButton";
import Markdown from "@/components/Markdown";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectionNav from "@/components/SectionNav";
import SideProjects from "@/components/SideProjects";
import Timeline from "@/components/Timeline";
import { getExperience, getProfile, getProjects, getSideProjects } from "@/lib/content";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "range", label: "Range" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Career" },
  { id: "side-projects", label: "Open Source" },
  { id: "contact", label: "Contact" },
];

const CARD = "h-full rounded-2xl border border-line bg-panel/80 p-5 shadow-sm backdrop-blur";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const experience = getExperience();
  const sideProjects = getSideProjects();

  const projectTitles = Object.fromEntries(projects.map((p) => [p.id, p.title]));

  return (
    <main className="relative">
      <SectionNav sections={NAV_SECTIONS} />

      <Hero profile={profile} />

      {/* Full-Stack Range */}
      <section id="range">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              icon="🛰️"
              title="화면부터 파이프라인까지, 담당 범위를 그대로"
              sub="직접 구현한 것과 설계를 이해하고 연동한 것을 구분해서 보여드립니다. 노드를 선택하면 관련 심층분석으로 연결됩니다."
            />
          </Reveal>
          <Reveal delay={100}>
            <ArchitectureDiagram projectTitles={projectTitles} />
          </Reveal>

          {/* Coverage Map — per-layer direct vs. integrated matrix */}
          <Reveal>
            <div id="coverage" className="mt-14 scroll-mt-16">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span aria-hidden>🗺️</span> Coverage Map — 레이어별 담당 범위
              </h3>
              <CoverageMap coverage={profile.coverage} />
            </div>
          </Reveal>

          {/* About — intro / stack / strengths from profile.md */}
          <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">🙋 About</p>
                <Markdown>{profile.intro}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">🧰 Tech Stack</p>
                <Markdown>{profile.stack}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-1">
              <div className={CARD}>
                <p className="mb-3 text-sm font-bold text-accent">💪 Strengths</p>
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
              icon="💻"
              title={`심층분석 ${projects.length}건 — 모든 결정을 수치로`}
              sub="카드를 클릭하면 상황 → 과제 → 행동 → 결과(STAR) 전체와 측정 데이터를 볼 수 있습니다."
            />
          </Reveal>
          <ProjectsSection projects={projects} />
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <SectionHeading icon="🎒" title="경력" />
          </Reveal>
          <Timeline experience={experience} />
        </div>
      </section>

      {/* Open Source & Side Projects */}
      <section id="side-projects">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <SectionHeading icon="🌱" title="오픈소스 & 사이드 프로젝트" />
          </Reveal>
          <SideProjects content={sideProjects} />
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="border-t border-line/60 bg-panel/40 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <SectionHeading icon="📨" title="연락하기" />
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
                  풀스택 포트폴리오 PDF ↓
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
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-line bg-panel px-6 py-3 text-ink shadow-md transition-all duration-300 hover:scale-105 hover:border-accent/50"
                >
                  기존 포트폴리오 ↗
                </a>
              )}
            </div>
            <p className="mt-12 text-xs text-mute/70">
              © {new Date().getFullYear()} {profile.name} — measured, not claimed.
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
