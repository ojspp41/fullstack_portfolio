import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { getExperience, getExperienceFeatures, getProfile, getProjects, getSideProjects } from "../src/lib/content.ts";

const EXPECTED = ["slp-reporting", "metering", "cross-org-sharing", "file-preview", "generative-ui", "websocket", "dockerfile", "session-list", "voc"];

for (const locale of ["ko", "en"]) {
  test(`${locale}: published cases in portfolio order`, () => {
    const projects = getProjects(locale);
    assert.deepEqual(projects.map((p) => p.id), EXPECTED);
    assert.deepEqual(projects.map((p) => p.order), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepEqual(projects.map((p) => p.category), ["fullstack", "fullstack", "fullstack", "fullstack", "frontend", "frontend", "infra", "fullstack", "fullstack"]);
    for (const p of projects) {
      assert.ok(p.body.length > 500, p.id);
      assert.ok(p.measurement?.length > 30, p.id);
      assert.equal(p.published, true);
      assert.equal(p.badge, p.id === "slp-reporting" ? (locale === "ko" ? "SLP 제조 AX" : "SLP Manufacturing AX") : "AI Atlas");
      assert.match(p.body, locale === "ko" ? /전체적인 아키텍처[\s\S]*문제 원인 · 해결 목표[\s\S]*해결 과정[\s\S]*결과/ : /Architecture[\s\S]*Problem · goal[\s\S]*Solution[\s\S]*Results/);
      const asset = /!\[[^\]]+\]\((\/diagrams\/[^)]+)\)/.exec(p.body)?.[1];
      assert.ok(asset && fs.existsSync(path.join("public", asset)), p.id + " diagram");
      assert.doesNotMatch(p.body, /\/Users\/|file:\/\/|1,871MB|47건|24s → 13s/);
    }
  });

  test(`${locale}: explicit translations exist for every published case`, () => {
    const dir = path.join("content", locale === "en" ? "en" : "", "projects");
    const ids = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
      .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data)
      .filter((p) => p.published).sort((a, b) => a.order - b.order).map((p) => p.id);
    assert.deepEqual(ids, EXPECTED);
  });

  test(`${locale}: hero matches source metrics and old PDF link stays hidden`, () => {
    const profile = getProfile(locale);
    assert.equal(profile.heroStats.length, 4);
    assert.deepEqual(profile.heroStats.map((s) => s.value), locale === "ko"
      ? ["1만 명", "597×", "장관상", "2,000명"]
      : ["10,000", "597×", "Ministerial Prize", "2,000 users"]);
    assert.equal(profile.role, locale === "ko" ? "풀스택 개발자" : "Full-Stack Developer");
    assert.equal(profile.resumePdf, undefined);
    const data = profile.coverage.find((row) => /데이터|Data/.test(row.layer));
    assert.ok(data.integrated.some((s) => /Kafka/.test(s)));
    assert.ok(data.integrated.some((s) => /환율|FX/.test(s)));
  });

  test(`${locale}: career, side projects, and five corrected awards load`, () => {
    const career = getExperience(locale);
    assert.equal(career.summary.length, 2);
    assert.equal(career.jobs.length, 2);
    assert.ok(career.extra.length > 100);
    assert.ok(career.aiAtlasOverview?.backoffice);
    assert.doesNotMatch(JSON.stringify(career), /단독|5년차|sole|five-year|5-year/i);
    const side = getSideProjects(locale);
    assert.equal(side.cards.length, 4);
    assert.equal(side.awards.split("\n").filter((l) => /^\d+\./.test(l)).length, 5);
    assert.match(side.aiExperience, /Outbox/);
    assert.match(side.cards[0], /COMAtching/);
    assert.match(side.cards[0], /601 → 2/);
    assert.match(side.cards[0], /261\.1ms → 18\.8ms/);
  });

  test(`${locale}: representative experiences and workflow have explicit translations`, () => {
    const expected = {
      representative: ["ai-atlas", "signal-agent", "slp-manufacturing"],
      workflow: ["development-loop", "operation-report", "content-automation", "screen-design", "excel-processing"],
    };
    for (const [section, ids] of Object.entries(expected)) {
      const items = getExperienceFeatures(section, locale);
      assert.deepEqual(items.map((item) => item.id), ids);
      const dir = path.join("content", locale === "en" ? "en" : "", section);
      assert.equal(fs.readdirSync(dir).filter((file) => file.endsWith(".md")).length, ids.length);
      for (const item of items) {
        assert.ok(item.summary.length > 40, item.id);
        assert.ok(item.body.length > (item.id === "slp-manufacturing" ? 40 : 100), item.id);
        assert.doesNotMatch(JSON.stringify(item), /\/Users\/|file:\/\//);
      }
    }
    const representative = getExperienceFeatures("representative", locale);
    const workflow = getExperienceFeatures("workflow", locale);
    assert.match(representative[1].title, /신호등 에이전트/);
    assert.match(representative[1].decision, /결정론적|Deterministic/i);
    assert.equal(representative[2].steps.length, 0);
    assert.match(representative[2].summary, /조회 도구|read-only tools/);
    assert.match(representative[0].summary, /Go/);
    assert.match(representative[1].summary, /Node\.js/);
    assert.ok(representative[1].stack.includes("Human-in-the-loop"));
    assert.match(representative[1].body, /결과\/이력 API|results\/history APIs/);
    const slpCase = getProjects(locale).find((project) => project.id === "slp-reporting");
    assert.match(slpCase.body, /인프라 장애|infrastructure/i);
    assert.equal(workflow[0].steps.length, 9);
    assert.match(workflow[1].metrics[0].value, /10/);
    assert.match(workflow[0].body, /하네스|Harness/i);
    assert.match(JSON.stringify(workflow[2]), /93/);
    assert.match(JSON.stringify(workflow[2]), locale === "ko" ? /약 3일 → 4시간/ : /~3 days → 4 hours/);
    assert.match(workflow[1].decision, /AI가 숫자를 계산하지|AI does not calculate/);
  });
}

test("public copy is company-neutral and corrected claims cannot regress", () => {
  const forbidden = /Full-Stack\s*\(단독\)|입사 2개월|2개월 만에|2개월 내|런칭 리더|Traffic Light Agent|AX 우수상|Text-to-SQL|Text to SQL|within two months|Led the launch of a 10,000-user service|NICE평가정보|삼성SDS|LG CNS|현대자동차|금융권에 기여|36개|36 reusable|교내 ICPC|PwC/i;
  for (const locale of ["ko", "en"]) {
    const profile = getProfile(locale);
    const content = {
      profile, career: getExperience(locale), side: getSideProjects(locale),
      projects: getProjects(locale),
      representative: getExperienceFeatures("representative", locale),
      workflow: getExperienceFeatures("workflow", locale),
    };
    assert.doesNotMatch(JSON.stringify(content), forbidden);
    assert.doesNotMatch(JSON.stringify(profile.heroStats), /p95/i);
    for (const project of content.projects) {
      assert.doesNotMatch(JSON.stringify({ metrics: project.metrics, summary: project.summary, measurement: project.measurement }), /p95/i);
    }
    assert.match(JSON.stringify(content.career), /6개월|six months/);
    assert.equal(content.projects.find((p) => p.id === "metering").metrics[0].value, "228.665ms → 0.383ms");
    assert.doesNotMatch(JSON.stringify(content.representative[1]), /우수상|수상작|award/i);
  }
  for (const file of ["src/lib/i18n.ts", "src/app/(ko)/layout.tsx", "src/app/(en)/layout.tsx", "src/app/opengraph-image.tsx"]) {
    assert.doesNotMatch(fs.readFileSync(file, "utf8"), forbidden, file);
  }
});

test("both languages expose equivalent evidence and process topology", () => {
  for (const section of ["representative", "workflow"]) {
    const ko = getExperienceFeatures(section, "ko");
    const en = getExperienceFeatures(section, "en");
    for (let i = 0; i < ko.length; i++) {
      assert.equal(ko[i].id, en[i].id);
      assert.equal(ko[i].order, en[i].order);
      assert.equal(ko[i].steps.length, en[i].steps.length);
      assert.equal(ko[i].metrics.length, en[i].metrics.length);
      assert.equal(ko[i].link?.href, en[i].link?.href);
    }
  }
});

test("corrected benchmark values and honest limitations are present", () => {
  for (const locale of ["ko", "en"]) {
    const projects = Object.fromEntries(getProjects(locale).map((p) => [p.id, p]));
    assert.match(projects.metering.body, /228\.665ms/);
    assert.match(projects.metering.body, /0\.383ms/);
    assert.match(projects.metering.body, /26\.924/);
    assert.match(projects.metering.body, /60\.052/);
    assert.match(projects["cross-org-sharing"].body, /5개 실행|five execution/);
    assert.match(projects["file-preview"].body, /740\.4/);
    assert.match(projects["file-preview"].body, /53\.2/);
    assert.match(projects["file-preview"].body, /오래된|stale/i);
    assert.match(projects["file-preview"].body, /처리 중|pending generation/i);
    assert.match(projects["generative-ui"].body, /16/);
    assert.match(projects["generative-ui"].body, /97\.5%/);
    assert.match(projects.websocket.body, /5분|five-minute/);
    assert.match(projects.websocket.metrics[0].value, /60\/60/);
    assert.match(projects.websocket.measurement, /로컬|Gateway 두 개|local/i);
    const atlas = getExperienceFeatures("representative", locale).find((item) => item.id === "ai-atlas");
    assert.notEqual(atlas.link?.href, "?p=voc");
    assert.match(atlas.body, /VOC/);
    assert.doesNotMatch(atlas.body, /MinIO|Jira/);
    assert.match(projects.voc.body, /비공개 MinIO|private MinIO/);
    assert.match(projects.voc.body, /기존 티켓을 연결|links the existing issue/);
    assert.match(projects.voc.body, /사진 2장|two image attachments/);
    assert.match(projects.dockerfile.body, /8\.13s/);
    assert.match(projects.dockerfile.body, /3\.93s/);
  }
});

test("the localized metering case explains the three stages of the billing flow", () => {
  for (const locale of ["ko", "en"]) {
    const metering = getProjects(locale).find((project) => project.id === "metering");
    const stages = metering.body.match(/^\d\. \*\*.+?\*\*/gm);
    assert.equal(stages.length, 3);
    assert.match(stages[0], /한도|limit/);
    assert.match(stages[1], /비용|cost/);
    assert.match(stages[2], /계열사|affiliates/);
  }
});
