---
id: generative-ui
order: 5
title: Generative UI 파이프라인 — 깨진 JSON 복구
category: frontend
badge: AI / LLM
stack: [TypeScript, JSON sanitize, Error Boundary, EventBus(pub/sub), bench fixture]
metrics:
  - { label: "JSON 회복률", value: "60% → 97.5%", note: "40개 fixture 벤치 실측" }
  - { label: "위젯 장애", value: "약 95%↓", note: "렌더 실패 payload 47건 → 1건" }
  - { label: "장애 영향 범위", value: "세션 전체 → 위젯 1개", note: "Error Boundary 격리" }
layers: ["FE 직접", "모델 출력 계약 설계"]
summary: 모델 출력을 믿지 않는다는 전제로, 깨진 JSON을 받아도 위젯이 뜨도록 6단계 정제 + 2겹 파싱으로 복구. 회복률을 코드로 측정해 회귀를 자동 검출한다.
---

# Generative UI 파이프라인 — 모델 출력을 믿지 않는다

## 다단계 복구 흐름

정상이면 통과, 깨지면 ①~⑥ 복구 → 그래도 실패 시 거부.

| # | 규칙 | 깨진 것 → 고친 것 |
|---|---|---|
| ① | fence 제거 | ` ```json{…}``` ` → `{…}` |
| ② | 참거짓 보정 | `true"` → `true` |
| ③ | 꼬리쉼표 | `["a",]` → `["a"]` |
| ④ | 쉼표 보강 | `}{` → `},{` |
| ⑤ | 특수문자 | `"줄 ⏎ 바꿈"` → `"줄 \n 바꿈"` |
| ⑥ | 균형검사 | `{"a":[1,2}` → ✗ 거부 |

**2겹 파싱**: 1차 `JSON.parse` 실패 시 sanitize 후 2차 시도.

### 왜 이 순서인가 — 정제 먼저, 검사 나중

- **문제**: ⑥(괄호 균형검사)을 정제 앞에 두니, 따옴표가 깨진 JSON(`true"`)을 복구도 못 해보고 버렸다.
- **원인**: 깨진 따옴표가 "문자열 안/밖" 판단을 어긋나게 해 괄호 개수가 틀어진다.
- **해결**: ②~⑤로 문자를 먼저 정상화한 뒤 ⑥에서 검사. 회귀 방지용 fixture 테스트로 고정.

## 위젯 격리 — 깨져도 채팅은 살리기

**문제정의** 잘못된 데이터로 차트 위젯이 뜨자, 채팅 화면 전체가 언마운트되고 누적 대화까지 사라졌다.
**가설** Error Boundary가 없으면 React가 트리 전체를 언마운트한다.
**검증** 일부러 깨뜨린 fixture(괄호 불균형)를 주입해 재현 — Boundary 없는 버전은 세션 전체 소실, 위젯 단위 Boundary는 위젯만 fallback.

```tsx
<GenUIErrorBoundary>
  <CardSelectionWidget … />
</GenUIErrorBoundary>
```

**해결 2 — Context 대신 이벤트 버스(pub/sub)**: Context는 value가 바뀔 때마다 채팅 메시지 N개가 전부 리렌더. 전역 이벤트 버스로 바꿔 상호작용이 React 트리를 거치지 않게 했다 (무관한 메시지 리렌더 0). 이벤트명 오타·구독 해제 누락은 `EventMap` 타입과 `useBusEvent`(cleanup) 훅으로 차단.

**회고**: Error Boundary가 비동기·핸들러 예외는 못 잡는 한계를 발견해 try/catch 수렴 로직 추가. 같은 깨짐 패턴은 회귀 벤치가 자동으로 잡는다.

## 스트리밍 중 깜빡임 제거 — skeleton / dots

토큰 단위로 흘러드는 위젯 JSON은 계속 미완성 상태. 도착 즉시 그리면 반쪽 위젯이 마운트·언마운트를 반복한다. **스트리밍 중 → skeleton·typing-dots / 깨짐 → fallback / 완성 → 실제 위젯** 세 상태를 분리해 첫 화면을 안정화했다.

## 측정 결과 (genui-parse.bench 실측)

| 지표 | Before | After |
|---|---|---|
| 파싱 성공률 | 60% | **97.5%** |
| 렌더 실패 payload | 47건 | **1건** |
| 위젯 장애 | — | **약 95%↓** |

위젯 카탈로그: 폼 위젯(필드 8종) · 카드 선택(단일/다중) · 차트 위젯(데이터 시각화)
