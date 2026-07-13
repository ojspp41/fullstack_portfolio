// prebuild guard: warn loudly when a frontmatter-declared public asset is missing.
// The site also hides the download button when the file is absent (src/lib/content.ts),
// so this warning is about intent — you probably meant to ship the PDF.
import fs from "node:fs";
import path from "node:path";

const profile = fs.readFileSync(
  path.join(process.cwd(), "content", "sections", "profile.md"),
  "utf8"
);
const match = profile.match(/^resumePdf:\s*(\S+)/m);

if (match) {
  const rel = match[1];
  const target = path.join(process.cwd(), "public", rel);
  if (!fs.existsSync(target)) {
    console.warn(
      `\n⚠️  [check-public-assets] public${rel} 이 없습니다.\n` +
        `   profile.md의 resumePdf가 이 경로를 가리키지만 파일이 없어서\n` +
        `   푸터의 PDF 다운로드 버튼은 렌더되지 않습니다.\n` +
        `   → PDF를 public${rel} 에 넣고 다시 빌드하면 버튼이 나타납니다.\n`
    );
  } else {
    console.log(`✓ [check-public-assets] public${rel} 확인`);
  }
}
