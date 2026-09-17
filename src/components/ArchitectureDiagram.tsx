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
    "key": "client",
    "title": "CLIENT",
    "subtitle": {
      "ko": "React 19 · Next.js 15 · TypeScript",
      "en": "React 19 · Next.js 15 · TypeScript"
    },
    "nodes": [
      {
        "id": "fe-chat",
        "label": {
          "ko": "채팅 · 스트리밍 UI",
          "en": "Chat & streaming UI"
        },
        "detail": {
          "ko": "세션 ID 검증 · 3ms debounce · 숨김 탭 5분 유예",
          "en": "Session ID checks · 3ms debounce · hidden-tab five-minute grace"
        },
        "ownership": "direct",
        "projects": [
          "websocket"
        ]
      },
      {
        "id": "fe-genui",
        "label": {
          "ko": "Generative UI",
          "en": "Generative UI"
        },
        "detail": {
          "ko": "6단계 정제 · 2겹 파싱 · 위젯별 예외 격리",
          "en": "Six cleanup stages · two-pass parsing · widget isolation"
        },
        "ownership": "direct",
        "projects": [
          "generative-ui"
        ]
      },
      {
        "id": "fe-file",
        "label": {
          "ko": "파일 렌더 3층",
          "en": "Three-layer file renderer"
        },
        "detail": {
          "ko": "판단→가공→표현 · DOMPurify·iframe sandbox · 자원 정리",
          "en": "Decide→transform→present · DOMPurify·iframe sandbox · cleanup"
        },
        "ownership": "direct",
        "projects": [
          "file-preview"
        ]
      },
      {
        "id": "fe-share",
        "label": {
          "ko": "조직별 Agent 공유 화면",
          "en": "Organization-aware sharing UI"
        },
        "detail": {
          "ko": "다중 소속 선택 · 즉시 공유/승인 대기 분리 · 오래된 응답 폐기",
          "en": "Membership selection · immediate/pending states · stale-response discard"
        },
        "ownership": "direct",
        "projects": [
          "cross-org-sharing"
        ]
      }
    ]
  },
  {
    "key": "contract",
    "title": "API CONTRACTS",
    "subtitle": {
      "ko": "화면 요구에서 역설계한 API",
      "en": "APIs derived from UI requirements"
    },
    "nodes": [
      {
        "id": "api-metering",
        "label": {
          "ko": "미터링 조회 · 비교",
          "en": "Metering query & comparison"
        },
        "detail": {
          "ko": "필터 6종 · 계열사 비교 약 34회→1회 · source_usages 계약",
          "en": "Six filters · ~34→1 comparison requests · source_usages contract"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "api-quota",
        "label": {
          "ko": "사용 한도 제어",
          "en": "Usage limit control"
        },
        "detail": {
          "ko": "Redis 누적 청구액 확인 · 조직/개인 한도 · 호출 전 차단",
          "en": "Redis charge counters · organization/user limits · pre-call blocking"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "api-preview",
        "label": {
          "ko": "파일 미리보기 엔드포인트",
          "en": "File preview endpoint"
        },
        "detail": {
          "ko": "원본 다운로드/DRM 미리보기 분리 · 읽기 권한 재검증",
          "en": "Original download/DRM preview separation · read authorization"
        },
        "ownership": "direct",
        "projects": [
          "file-preview"
        ]
      }
    ]
  },
  {
    "key": "gateway",
    "title": "GO GATEWAY",
    "subtitle": {
      "ko": "직접 구현한 기능과 공통 기반 분리",
      "en": "Feature ownership vs. shared infrastructure"
    },
    "nodes": [
      {
        "id": "gw-grpc",
        "label": {
          "ko": "공통 gRPC · Protobuf 기반",
          "en": "Shared gRPC & Protobuf"
        },
        "detail": {
          "ko": "중앙 Gateway 전체 구현이 아니라 공통 기반에 일부 기능 직접 구현",
          "en": "Built selected features, not the entire central Gateway infrastructure"
        },
        "ownership": "integrated",
        "projects": [
          "metering",
          "file-preview"
        ]
      },
      {
        "id": "gw-share",
        "label": {
          "ko": "조직별 승인 · 실행 재인가",
          "en": "Org approval & execution authorization"
        },
        "detail": {
          "ko": "사용자×대상 조직×공유자 · 승인 재검증 · 5개 실행 경로",
          "en": "User×target organization×sharer · approval rechecks · five execution paths"
        },
        "ownership": "direct",
        "projects": [
          "cross-org-sharing"
        ]
      },
      {
        "id": "gw-outbox",
        "label": {
          "ko": "공유 Outbox 수렴",
          "en": "Sharing Outbox convergence"
        },
        "detail": {
          "ko": "기존 세션 100개씩 반영 · 오래된 작업 무효화 · 최신 버전 보호",
          "en": "100-session batches · obsolete-job invalidation · latest-version protection"
        },
        "ownership": "direct",
        "projects": [
          "cross-org-sharing"
        ]
      }
    ]
  },
  {
    "key": "pipeline",
    "title": "METERING PIPELINE",
    "subtitle": {
      "ko": "미터링 이벤트부터 정산까지 직접 구현",
      "en": "Metering events through settlement built directly"
    },
    "nodes": [
      {
        "id": "pipe-kafka",
        "label": {
          "ko": "미터링 Kafka 인입",
          "en": "Metering Kafka ingestion"
        },
        "detail": {
          "ko": "미터링 이벤트 생산·소비·실패 처리 범위 직접 구현 · 소비 정책 확인 필요",
          "en": "Metering production/consumption/failure handling · wiring policy needs verification"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "pipe-agg",
        "label": {
          "ko": "일배치 · 복합 키 upsert",
          "en": "Daily batches & composite-key upsert"
        },
        "detail": {
          "ko": "원본→요약 사전 계산 · 반복 실행 시 건수·비용 수렴",
          "en": "Raw→summary precomputation · stable counts/costs on rerun"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "pipe-scd2",
        "label": {
          "ko": "가격 · 환율 이력",
          "en": "Price & FX history"
        },
        "detail": {
          "ko": "valid_from/valid_to 버전 관리 · 사용 시점 청구 재현",
          "en": "valid_from/valid_to versioning · reproduce usage-time charges"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      }
    ]
  },
  {
    "key": "storage",
    "title": "DATA & OBJECTS",
    "subtitle": {
      "ko": "구현한 데이터 흐름과 저장소 연동",
      "en": "Implemented data paths & storage integration"
    },
    "nodes": [
      {
        "id": "st-redis",
        "label": {
          "ko": "Redis 한도 카운터 로직",
          "en": "Redis quota-counter logic"
        },
        "detail": {
          "ko": "이벤트별 누적액 반영 · Mongo 60초 반영 · 일별 원본 대조",
          "en": "Event-level charge updates · 60s Mongo flush · daily reconciliation"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "st-mongo",
        "label": {
          "ko": "MongoDB 요약 · 카운터",
          "en": "MongoDB summaries & counters"
        },
        "detail": {
          "ko": "상세 원본·일별 요약 분리 · 미터링 집계·조회 직접 구현",
          "en": "Raw/daily separation · metering aggregation and queries built directly"
        },
        "ownership": "direct",
        "projects": [
          "metering"
        ]
      },
      {
        "id": "st-minio",
        "label": {
          "ko": "MinIO · 파생 PDF",
          "en": "MinIO & derived PDFs"
        },
        "detail": {
          "ko": "파싱엔진 PDF 선생성 연동 · Gateway 유효성 검증·스트리밍",
          "en": "Parsing-engine PDF generation integration · Gateway validation/streaming"
        },
        "ownership": "integrated",
        "projects": [
          "file-preview"
        ]
      }
    ]
  }
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
        <span className="flex items-center gap-2 text-mute">
          <span className={`h-2 w-2 rounded-full ${OWNERSHIP_META.integrated.dot}`} />
          {t.integrated}
        </span>
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
                {activeNode.projects.filter((pid) => pid in projectTitles).map((pid) => (
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
