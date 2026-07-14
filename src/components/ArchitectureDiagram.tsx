"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";
import { UI } from "@/lib/i18n";

type Ownership = "direct" | "integrated";

/** bilingual string */
type L = { ko: string; en: string };

interface DiagramNode {
  id: string;
  label: L;
  detail: L;
  ownership: Ownership;
  projects: string[]; // project ids
}

interface DiagramColumn {
  key: string;
  title: string;
  subtitle: L;
  nodes: DiagramNode[];
}

const COLUMNS: DiagramColumn[] = [
  {
    key: "client",
    title: "CLIENT",
    subtitle: { ko: "React 19 · Next.js 15 · TS strict", en: "React 19 · Next.js 15 · TS strict" },
    nodes: [
      {
        id: "fe-chat",
        label: { ko: "채팅 · 스트리밍 UI", en: "Chat · streaming UI" },
        detail: { ko: "WebSocket 6단계 방어 · 스트리밍 마크다운 파서", en: "6-stage WebSocket defense · streaming markdown parser" },
        ownership: "direct",
        projects: ["websocket", "markdown-parser"],
      },
      {
        id: "fe-genui",
        label: { ko: "Generative UI 파이프라인", en: "Generative UI pipeline" },
        detail: { ko: "깨진 JSON 6단계 복구 · Error Boundary 격리", en: "6-stage broken-JSON recovery · Error Boundary isolation" },
        ownership: "direct",
        projects: ["generative-ui"],
      },
      {
        id: "fe-file",
        label: { ko: "파일 업로드 · 미리보기 렌더", en: "File upload · preview rendering" },
        detail: { ko: "상태 머신 6단계 · 렌더 3층(판단→가공→표현)", en: "6-state machine · 3-layer rendering (decide→transform→present)" },
        ownership: "direct",
        projects: ["file-upload", "file-preview"],
      },
      {
        id: "fe-rbac",
        label: { ko: "RBAC can() 추상화", en: "RBAC can() abstraction" },
        detail: { ko: "3-상태 렌더링 · 미확정 역할 스펙과 FE 격리", en: "3-state rendering · isolates FE from unsettled role specs" },
        ownership: "direct",
        projects: ["rbac"],
      },
    ],
  },
  {
    key: "contract",
    title: "API CONTRACTS",
    subtitle: { ko: "REST · 서버 계약 직접 설계", en: "REST · server contracts I designed" },
    nodes: [
      {
        id: "api-metering",
        label: { ko: "미터링 조회 API", en: "Metering query API" },
        detail: { ko: "필터 6종 · 페이지네이션 · ExcelJS 서버 스트리밍", en: "6 filters · pagination · ExcelJS server streaming" },
        ownership: "direct",
        projects: ["metering"],
      },
      {
        id: "api-quota",
        label: { ko: "사용 한도 제어 API", en: "Usage quota API" },
        detail: { ko: "요금제별 쿼터 · Redis 카운터 429 즉시 차단", en: "Per-plan quotas · Redis counter with instant 429 blocking" },
        ownership: "direct",
        projects: ["metering"],
      },
      {
        id: "api-preview",
        label: { ko: "파일 미리보기 엔드포인트", en: "File preview endpoint" },
        detail: { ko: "다운로드/미리보기 통로 분리 · DRM 사본 격리 서빙", en: "Separate download/preview paths · serves isolated DRM copies" },
        ownership: "direct",
        projects: ["file-preview"],
      },
      {
        id: "api-pdf",
        label: { ko: "서버사이드 PDF 캡처", en: "Server-side PDF capture" },
        detail: { ko: "헤드리스 Chromium · DOM 1:1 캡처", en: "Headless Chromium · 1:1 DOM capture" },
        ownership: "direct",
        projects: ["pdf-invoice"],
      },
    ],
  },
  {
    key: "gateway",
    title: "GO GATEWAY",
    subtitle: { ko: "Go 1.24 · Gin · gRPC · Protobuf", en: "Go 1.24 · Gin · gRPC · Protobuf" },
    nodes: [
      {
        id: "gw-grpc",
        label: { ko: "gRPC · Protobuf 게이트웨이", en: "gRPC · Protobuf gateway" },
        detail: { ko: "중앙 API Gateway — 설계 의도를 이해하고 연동", en: "Central API gateway — integrated with full design understanding" },
        ownership: "integrated",
        projects: ["metering", "file-preview"],
      },
      {
        id: "gw-perm",
        label: { ko: "permission.go", en: "permission.go" },
        detail: { ko: "멀티소스 SSOT · cascade — ownership-first 소비가 접점", en: "Multi-source SSOT · cascade — consumed ownership-first on the FE" },
        ownership: "integrated",
        projects: ["rbac"],
      },
    ],
  },
  {
    key: "pipeline",
    title: "DATA PIPELINE",
    subtitle: { ko: "Kafka → 사전집계 → SCD-2", en: "Kafka → pre-aggregation → SCD-2" },
    nodes: [
      {
        id: "pipe-kafka",
        label: { ko: "Kafka 인입", en: "Kafka ingestion" },
        detail: { ko: "at-least-once → 집계키 유니크 인덱스 upsert 멱등", en: "at-least-once → idempotent upserts on a unique aggregation key" },
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "pipe-agg",
        label: { ko: "일배치 사전집계", en: "Daily pre-aggregation" },
        detail: { ko: "300만 건 → 1,440건 · 조회 비용 상수화", en: "3M rows → 1,440 · query cost made constant" },
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "pipe-scd2",
        label: { ko: "SCD-2 가격 · 환율 이력", en: "SCD-2 price/FX history" },
        detail: { ko: "과거 청구를 그 시점 기준으로 재현 · 정산 감사 대응", en: "Reproduces past invoices as-of date · settlement audits" },
        ownership: "integrated",
        projects: ["metering"],
      },
    ],
  },
  {
    key: "storage",
    title: "STORAGE",
    subtitle: { ko: "Redis · MinIO · MongoDB · MySQL", en: "Redis · MinIO · MongoDB · MySQL" },
    nodes: [
      {
        id: "st-redis",
        label: { ko: "Redis 한도 카운터", en: "Redis quota counter" },
        detail: { ko: "분당 100회 · 호출이 나가기 전 429 차단", en: "100 req/min · blocks with 429 before the call leaves" },
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "st-minio",
        label: { ko: "MinIO 오브젝트 스토리지", en: "MinIO object storage" },
        detail: { ko: "원본/DRM 사본 분리 저장 · gRPC 게이트웨이 경유", en: "Separate original/DRM copies · via the gRPC gateway" },
        ownership: "integrated",
        projects: ["file-preview"],
      },
      {
        id: "st-mongo",
        label: { ko: "MongoDB 집계 저장소", en: "MongoDB aggregation store" },
        detail: { ko: "미터링 요약 1,440건 · 멱등 upsert 대상", en: "1,440 metering summaries · idempotent upsert target" },
        ownership: "integrated",
        projects: ["metering"],
      },
      {
        id: "st-mysql",
        label: { ko: "MySQL", en: "MySQL" },
        detail: { ko: "운영 데이터 — COMAtching에서는 스키마·조인·인덱스 직접 설계", en: "Operational data — designed schema/joins/indexes myself on COMAtching" },
        ownership: "integrated",
        projects: [],
      },
    ],
  },
];

// full-width runtime strip under the 5 columns
const INFRA_NODES: DiagramNode[] = [
  {
    id: "infra-docker",
    label: { ko: "Docker Multi-stage · 스모크 테스트", en: "Docker multi-stage · smoke tests" },
    detail: { ko: "이미지 50%↓ (3.63GB → 1.82GB) · 숨은 회귀 1.56GB 적발", en: "Image 50%↓ (3.63GB → 1.82GB) · caught a hidden 1.56GB regression" },
    ownership: "direct",
    projects: ["dockerfile"],
  },
  {
    id: "infra-k8s",
    label: { ko: "K8s · 폐쇄망 운영", en: "K8s · air-gapped operations" },
    detail: { ko: "non-root 정책 · APM 권한 충돌 해결 · 운영팀 협업", en: "non-root policy · fixed APM permission conflicts · with the ops team" },
    ownership: "integrated",
    projects: ["dockerfile"],
  },
];

const ALL_NODES = [...COLUMNS.flatMap((c) => c.nodes), ...INFRA_NODES];

const OWNERSHIP_META: Record<Ownership, { chip: string; dot: string }> = {
  direct: { chip: "bg-accent/10 text-accent", dot: "bg-accent" },
  integrated: { chip: "bg-sub/10 text-sub", dot: "bg-sub" },
};

function NodeButton({
  node,
  locale,
  isActive,
  onActivate,
}: {
  node: DiagramNode;
  locale: Locale;
  isActive: boolean;
  onActivate: (id: string) => void;
}) {
  const meta = OWNERSHIP_META[node.ownership];
  return (
    <button
      type="button"
      onMouseEnter={() => onActivate(node.id)}
      onFocus={() => onActivate(node.id)}
      onClick={() => onActivate(node.id)}
      className={`group rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
        isActive
          ? "border-accent/60 bg-panel2 shadow-md shadow-indigo-500/10"
          : "border-line bg-bg/50 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
        <span className="text-[13px] font-medium leading-snug">{node.label[locale]}</span>
      </span>
    </button>
  );
}

export default function ArchitectureDiagram({
  projectTitles,
  locale = "ko",
}: {
  projectTitles: Record<string, string>;
  locale?: Locale;
}) {
  const t = UI[locale].diagram;
  // default-selected node: the interaction demos itself on first view
  const [activeId, setActiveId] = useState<string | null>("api-metering");
  const activeNode = ALL_NODES.find((n) => n.id === activeId) ?? null;

  const openProject = (projectId: string) => {
    document.dispatchEvent(new CustomEvent("open-project", { detail: projectId }));
  };

  return (
    <div>
      {/* legend */}
      <div className="mb-5 flex flex-wrap items-center gap-4 text-xs font-medium">
        <span className="flex items-center gap-2 text-mute">
          <span className={`h-2 w-2 rounded-full ${OWNERSHIP_META.direct.dot}`} />
          {t.direct}
        </span>
        <span className="hidden text-mute/60 sm:inline">{t.legendHint}</span>
      </div>

      {/* 5-tier diagram */}
      <div className="grid grid-cols-1 gap-0 xl:grid-cols-[1fr_1.5rem_1fr_1.5rem_1fr_1.5rem_1fr_1.5rem_1fr]">
        {COLUMNS.map((col, ci) => (
          <div key={col.key} className="contents">
            <div className="h-full rounded-2xl border border-line bg-panel/85 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-bold tracking-wide text-accent">{col.title}</p>
              <p className="mt-1 text-[11px] text-mute">{col.subtitle[locale]}</p>
              <div className="mt-4 flex flex-col gap-2">
                {col.nodes.map((node) => (
                  <NodeButton
                    key={node.id}
                    node={node}
                    locale={locale}
                    isActive={activeId === node.id}
                    onActivate={setActiveId}
                  />
                ))}
              </div>
            </div>

            {/* signal connector */}
            {ci < COLUMNS.length - 1 && (
              <div className="flex items-center justify-center py-2 xl:py-0" aria-hidden>
                <div className="signal-flow-v h-8 w-0.5 opacity-70 xl:hidden" />
                <div className="signal-flow hidden h-0.5 w-full opacity-70 xl:block" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* runtime / infra strip */}
      <div className="mt-4 rounded-2xl border border-line bg-panel/85 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="shrink-0 sm:w-40">
            <p className="text-sm font-bold tracking-wide text-accent">RUNTIME / INFRA</p>
            <p className="mt-1 text-[11px] text-mute">Docker · K8s · On-Premise</p>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
            {INFRA_NODES.map((node) => (
              <NodeButton
                key={node.id}
                node={node}
                locale={locale}
                isActive={activeId === node.id}
                onActivate={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* readout panel */}
      <div className="mt-4 min-h-24 rounded-2xl border border-line bg-panel2/80 p-4 backdrop-blur">
        {activeNode ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{activeNode.label[locale]}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${OWNERSHIP_META[activeNode.ownership].chip}`}
                >
                  {t[activeNode.ownership]}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-mute">{activeNode.detail[locale]}</p>
            </div>
            {activeNode.projects.length > 0 && (
              <div className="flex shrink-0 flex-wrap gap-2">
                {activeNode.projects.map((pid) => (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => openProject(pid)}
                    className="rounded-xl border border-line bg-panel px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-all hover:scale-105 hover:border-accent/50 hover:text-accent"
                  >
                    {projectTitles[pid] ?? pid} →
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-mute">
            <span className="font-semibold text-accent">{t.readout}</span> {t.readoutHint}
          </p>
        )}
      </div>
    </div>
  );
}
