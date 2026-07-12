import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import CoverageMap from "@/components/CoverageMap";
import Hero from "@/components/Hero";
import Markdown from "@/components/Markdown";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectionNav from "@/components/SectionNav";
import SideProjects from "@/components/SideProjects";
import Timeline from "@/components/Timeline";
import { getExperience, getProfile, getProjects, getSideProjects } from "@/lib/content";

const NAV_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "range", label: "Range" },
  { id: "projects", label: "Deep Dives" },
  { id: "experience", label: "Experience" },
  { id: "side-projects", label: "Open Source" },
  { id: "contact", label: "Contact" },
];

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

      {/* SEC.02 — Full-Stack Range */}
      <section id="range" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index="02"
              code="FULL-STACK RANGE"
              title="화면부터 파이프라인까지, 담당 범위를 그대로"
              sub="직접 구현한 것과 설계를 이해하고 연동한 것을 구분해서 보여드립니다. 노드를 선택하면 관련 심층분석으로 연결됩니다."
            />
          </Reveal>
          <Reveal delay={100}>
            <ArchitectureDiagram projectTitles={projectTitles} />
          </Reveal>

          {/* Coverage Map — per-layer direct vs. integrated matrix */}
          <Reveal>
            <div className="mt-12">
              <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">
                COVERAGE MAP <span className="text-mute">//</span> 레이어별 담당 범위
              </p>
              <CoverageMap coverage={profile.coverage} />
            </div>
          </Reveal>

          {/* About — intro / stack / strengths from profile.md */}
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div className="h-full rounded-lg border border-line bg-panel p-5">
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">ABOUT</p>
                <Markdown>{profile.intro}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-1">
              <div className="h-full rounded-lg border border-line bg-panel p-5">
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">TECH STACK</p>
                <Markdown>{profile.stack}</Markdown>
              </div>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-1">
              <div className="h-full rounded-lg border border-line bg-panel p-5">
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">STRENGTHS</p>
                <Markdown>{profile.strengths}</Markdown>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEC.03 — Deep Dives */}
      <section id="projects" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index="03"
              code="DEEP DIVES"
              title={`심층분석 ${projects.length}건 — 모든 결정을 수치로`}
              sub="카드를 클릭하면 상황 → 과제 → 행동 → 결과(STAR) 전체와 측정 데이터를 볼 수 있습니다."
            />
          </Reveal>
          <ProjectsSection projects={projects} />
        </div>
      </section>

      {/* SEC.04 — Experience */}
      <section id="experience" className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <SectionHeading index="04" code="EXPERIENCE" title="경력" />
          </Reveal>
          <Timeline experience={experience} />
        </div>
      </section>

      {/* SEC.05 — Open Source & Side Projects */}
      <section id="side-projects" className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <SectionHeading
              index="05"
              code="OPEN SOURCE"
              title="오픈소스 & 사이드 프로젝트"
            />
          </Reveal>
          <SideProjects content={sideProjects} />
        </div>
      </section>

      {/* SEC.06 — Contact / Footer */}
      <footer id="contact">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <SectionHeading index="06" code="CONTACT" title="연락처" />
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md border border-amber bg-amber/10 px-5 py-2.5 text-amber transition-colors hover:bg-amber hover:text-bg"
              >
                {profile.email}
              </a>
              {profile.resumePdf && (
                <a
                  href={profile.resumePdf}
                  download
                  className="rounded-md border border-line px-5 py-2.5 text-mute transition-colors hover:border-amber hover:text-amber"
                >
                  풀스택 포트폴리오 PDF ↓
                </a>
              )}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line px-5 py-2.5 text-mute transition-colors hover:border-mute hover:text-ink"
              >
                GitHub ↗
              </a>
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line px-5 py-2.5 text-mute transition-colors hover:border-mute hover:text-ink"
                >
                  기존 포트폴리오 ↗
                </a>
              )}
            </div>
            <p className="mt-12 font-mono text-[11px] text-mute/60">
              © {new Date().getFullYear()} {profile.name} — measured, not claimed.
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
