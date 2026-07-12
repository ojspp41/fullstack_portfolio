"use client";

import { useState } from "react";

type Ownership = "direct" | "integrated";

interface DiagramNode {
  id: string;
  label: string;
  detail: string;
  ownership: Ownership;
  projects: string[]; // project ids
}

interface DiagramColumn {
  key: string;
  title: string;
  subtitle: string;
  nodes: DiagramNode[];
}

const COLUMNS: DiagramColumn[] = [
  {
    key: "fe",
    title: "FRONTEND",
    subtitle: "React 19 · Next.js 15 · TS strict",
    nodes: [
      {
        id: "fe-chat",
        label: "채팅 · 스트리밍 UI",
        detail: "WebSocket 6단계 방어 · 스트리밍 마크다운 파서",
        ownership: "direct",
        projects: ["websocket", "markdown-parser"],
      },
      {
        id: "fe-genui",
        label: "Generative UI 파이프라인",
        detail: "깨진 JSON 6단계 복구 · Error Boundary 격리",
        ownership: "direct",
        projects: ["generative-ui"],
      },
      {
        id: "fe-file",
        label: "파일 업로드 · 미리보기 렌더",
        detail: "상태 머신 6단계 · 렌더 3층(판단→가공→표현)",
        ownership: "direct",
        projects: ["file-upload", "file-preview"],
      },
      {
        id: "fe-rbac",
        label: "RBAC can() 추상화",
        detail: "3-상태 렌더링 · 미확정 역할 스펙과 FE 격리",
        ownership: "direct",
        projects: ["rbac"],
      },
    ],
  },
  {
    key: "gw",
    title: "API GATEWAY",
    subtitle: "Go 1.24 · Gin · gRPC · Protobuf",
    nodes: [
      {
        id: "gw-metering",
        label: "미터링 조회 API",
        detail: "필터 6종 · 페이지네이션 · ExcelJS 서버 스트리밍",
        ownership: "direct",
        projects: ["metering"],
      },
      {
        id: "gw-quota",
        label: "사용 한도 제어 API",
        detail: "요금제별 쿼터 · Redis 카운터 429 즉시 차단",
        ownership: "direct",
        projects: ["metering"],
      },
      {
        id: "gw-preview",
        label: "미리보기 엔드포인트 · 통로 분리",
        detail: "다운로드/미리보기 분리 · DRM 사본 격리 서빙",
        ownership: "direct",
        projects: ["file-preview"],
      },
      {
        id: "gw-pdf",
        label: "서버사이드 PDF 캡처",
        detail: "헤드리스 Chromium · DOM 1:1 캡처",
        ownership: "direct",
        projects: ["pdf-invoice"],
      },
      {
        id: "gw-perm",
        label: "permission.go",
        detail: "멀티소스 SSOT · cascade — ownership-first 소비가 접점",
        ownership: "integrated",
        projects: ["rbac"],
      },
    ],
  },
  {
    key: "pipe",
    title: "DATA PIPELINE",
    subtitle: "Kafka · Redis · MinIO · MongoDB",
    nodes: [
      {
        id: "pipe-kafka",
        label: "Kafka 인입",
        detail: "at-least-once → 집계키 유니크 인덱스 upsert 멱등",
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "pipe-agg",
        label: "일배치 사전집계 · SCD-2",
        detail: "300만 건 → 1,440건 · 가격/환율 이력 보존",
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "pipe-minio",
        label: "MinIO 오브젝트 스토리지",
        detail: "원본/DRM 사본 분리 저장 · gRPC 게이트웨이 경유",
        ownership: "integrated",
        projects: ["file-preview"],
      },
      {
        id: "pipe-docker",
        label: "Docker Multi-stage · K8s",
        detail: "이미지 50%↓ · 숨은 회귀 1.56GB 적발",
        ownership: "direct",
        projects: ["dockerfile"],
      },
    ],
  },
];

const OWNERSHIP_META: Record<Ownership, { label: string; chip: string; dot: string }> = {
  direct: {
    label: "직접 구현",
    chip: "border-amber/60 bg-amber/10 text-amber",
    dot: "bg-amber",
  },
  integrated: {
    label: "설계 이해 · 연동",
    chip: "border-steel/60 bg-steel/10 text-steel",
    dot: "bg-steel",
  },
};

export default function ArchitectureDiagram({
  projectTitles,
}: {
  projectTitles: Record<string, string>;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = COLUMNS.flatMap((c) => c.nodes).find((n) => n.id === activeId) ?? null;

  const openProject = (projectId: string) => {
    document.dispatchEvent(new CustomEvent("open-project", { detail: projectId }));
  };

  return (
    <div>
      {/* legend */}
      <div className="mb-5 flex flex-wrap items-center gap-4 font-mono text-xs">
        {(Object.keys(OWNERSHIP_META) as Ownership[]).map((k) => (
          <span key={k} className="flex items-center gap-2 text-mute">
            <span className={`h-2 w-2 rounded-full ${OWNERSHIP_META[k].dot}`} />
            {OWNERSHIP_META[k].label}
          </span>
        ))}
        <span className="hidden text-mute/60 sm:inline">— 노드에 올리면 관련 프로젝트로 연결됩니다</span>
      </div>

      {/* diagram */}
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr]">
        {COLUMNS.map((col, ci) => (
          <div key={col.key} className="contents">
            <div className="rounded-lg border border-line bg-panel p-4">
              <p className="font-mono text-xs tracking-[0.2em] text-amber">{col.title}</p>
              <p className="mt-1 font-mono text-[11px] text-mute">{col.subtitle}</p>
              <div className="mt-4 flex flex-col gap-2">
                {col.nodes.map((node) => {
                  const isActive = activeId === node.id;
                  const meta = OWNERSHIP_META[node.ownership];
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveId(node.id)}
                      onFocus={() => setActiveId(node.id)}
                      onClick={() => setActiveId(node.id)}
                      className={`group rounded-md border px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "border-amber/70 bg-panel2"
                          : "border-line bg-bg/60 hover:border-mute/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
                        <span className="text-sm font-medium leading-snug">{node.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* signal connector */}
            {ci < COLUMNS.length - 1 && (
              <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden>
                <div className="signal-flow-v h-8 w-0.5 opacity-70 lg:hidden" />
                <div className="signal-flow hidden h-0.5 w-full opacity-70 lg:block" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* readout panel */}
      <div className="mt-4 min-h-24 rounded-lg border border-line bg-panel2 p-4">
        {activeNode ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{activeNode.label}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider ${OWNERSHIP_META[activeNode.ownership].chip}`}
                >
                  {OWNERSHIP_META[activeNode.ownership].label}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-mute">{activeNode.detail}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {activeNode.projects.map((pid) => (
                <button
                  key={pid}
                  type="button"
                  onClick={() => openProject(pid)}
                  className="rounded-md border border-line bg-bg px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-amber hover:text-amber"
                >
                  {projectTitles[pid] ?? pid} →
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="font-mono text-xs text-mute">
            <span className="text-amber">READOUT</span> — 노드를 선택하면 담당 범위와 관련 심층분석이
            표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
}
