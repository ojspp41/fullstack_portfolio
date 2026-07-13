import { ImageResponse } from "next/og";

export const alt = "오준석 — Full-Stack Engineer · AI / LLM Application";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// design tokens (light pastel — the canonical look)
const PANEL = "#ffffff";
const LINE = "#e2e8f0";
const INK = "#1e293b";
const MUTE = "#64748b";
const ACCENT = "#4f46e5";

const METRICS = [
  { label: "조회 속도", value: "750배↑" },
  { label: "서비스 규모", value: "1만 명" },
  { label: "리렌더", value: "99.6%↓" },
  { label: "도커 이미지", value: "50%↓" },
];

async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  // old UA → Google serves TTF (satori cannot read woff2)
  const css = await (
    await fetch(cssUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" } })
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error(`font url not found for ${family}`);
  return await (await fetch(url)).arrayBuffer();
}

export default async function OgImage() {
  const text =
    "오준석 — Full-Stack Engineer · AI / LLM Application " +
    "화면부터 서버 계약, 파이프라인 연동, 인프라까지 백오피스 어드민 풀스택 " +
    "SEC.01 // FULL-STACK ENGINEER measured, not claimed. " +
    METRICS.map((m) => `${m.label} ${m.value}`).join(" ");

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] = [];
  try {
    fonts.push(
      { name: "NotoSansKR", data: await loadGoogleFont("Noto Sans KR", 700, text), weight: 700 },
      { name: "NotoSansKR", data: await loadGoogleFont("Noto Sans KR", 400, text), weight: 400 },
      { name: "JBMono", data: await loadGoogleFont("JetBrains Mono", 700, text), weight: 700 }
    );
  } catch {
    // network-less build: fall back to satori defaults rather than failing the build
  }
  const mono = fonts.length === 3 ? "JBMono" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: "linear-gradient(120deg, #dbeafe 0%, #ede9fe 45%, #fce7f3 100%)",
          padding: "64px 72px",
          fontFamily: "NotoSansKR",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: mono,
              fontSize: 22,
              letterSpacing: 6,
              color: ACCENT,
            }}
          >
            FULL-STACK ENGINEER · AI / LLM APPLICATION
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 64,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.25,
            }}
          >
            오준석 — Full-Stack Engineer
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: MUTE }}>
            화면부터 서버 계약, 파이프라인 연동, 인프라까지 — 백오피스 어드민 풀스택
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                background: PANEL,
                padding: "28px 32px",
                border: `1px solid ${LINE}`,
                borderRadius: 20,
                boxShadow: "0 8px 24px rgba(79,70,229,0.10)",
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: 3, color: MUTE }}>
                {m.label}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: mono,
                  fontSize: 44,
                  fontWeight: 700,
                  color: ACCENT,
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length === 3 ? fonts : undefined }
  );
}
