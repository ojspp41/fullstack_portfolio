---
{
  "id": "dockerfile",
  "order": 7,
  "published": true,
  "title": "실행 기능을 유지하며 Docker 이미지 축소",
  "category": "infra",
  "badge": "구현 · 검증",
  "layers": [
    "Docker·부팅 검증 직접",
    "K8s 운영 협업"
  ],
  "stack": [
    "Docker Multi-stage",
    "Next.js standalone",
    "WhaTap",
    "Non-root"
  ],
  "metrics": [
    {
      "label": "비압축 이미지",
      "value": "3.63GB → 1.82GB"
    },
    {
      "label": "로컬 cold pull",
      "value": "8.13s → 3.93s"
    }
  ],
  "summary": "레이어 분석으로 APM 설치가 되살린 개발 의존성을 찾아냈습니다. Chromium·한글 폰트·APM·Non-root 실행을 유지하며 실제 부팅까지 검증했습니다.",
  "measurement": "비압축 빌드 크기와 로컬 cold pull 중앙값입니다. Docker 29.7.0·Colima/Linux arm64, old/new 각 3회이며 운영 배포시간과 구분합니다."
}
---

## 전체적인 아키텍처

![실행 기능을 유지하며 Docker 이미지 축소 — 전체 구조](/diagrams/docker.png)

*구조 그림을 선택하면 원본 크기로 볼 수 있습니다.*

> **담당 범위:** Dockerfile·실행 경로·APM 로그 권한·빌드 및 부팅 스모크 검증을 담당했습니다. Kubernetes 공통 운영 기반은 운영팀과 협업한 범위입니다.

## 문제 원인 · 해결 목표 (S·T)

- **상황(S):** PDF 기능 추가 후 이미지가 3.63GB로 커졌습니다. 멀티스테이지 적용 뒤에도 APM 설치가 개발 의존성을 다시 끌어와 용량이 줄지 않았습니다.
- **목표(T):** PDF·APM·Non-root 실행을 유지하면서 이미지 용량을 줄이고 실제 런타임 회귀까지 확인해야 했습니다.

## 해결 과정 (A)

1. standalone·멀티스테이지 구조를 적용하고 레이어별 크기를 측정했습니다. APM 설치 과정에서 재생성된 개발 의존성 **1.56GB**를 찾아냈습니다.
2. WhaTap 설치 공간을 분리해 필요한 결과만 복사했습니다. PDF 생성에 필요한 Chromium·한글 폰트는 유지했습니다.
3. Next.js 표준 서버로 실행 경로를 정리했습니다. Non-root 로그 권한·설정 검사·실제 부팅 후 HTTP·PDF·APM 스모크와 로컬 cold pull을 확인했습니다.

## 결과 (R)

- **비압축 이미지:** 3.63GB → 1.82GB, 약 50% 감소. 압축 크기는 901MB → 540MB.
- **로컬 cold pull 중앙값:** 8.13s → 3.93s, 약 51.7% 단축.

### 검증 조건 · 현재 한계

용량은 직접 빌드한 이미지 기준입니다. cold pull은 Docker 29.7.0·Colima/Linux arm64에서 캐시 제거 후 old/new 각 3회 교차 측정했습니다. 레지스트리 상태·네트워크가 달라지는 사내 운영 배포시간과 구분합니다. 빌드 성공만으로 완료하지 않고 실제 부팅과 기능을 함께 확인했습니다.
