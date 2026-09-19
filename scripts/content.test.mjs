import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { getExperience, getExperienceFeatures, getProfile, getProjects, getSideProjects } from "../src/lib/content.ts";

const EXPECTED = ["metering", "cross-org-sharing", "file-preview", "generative-ui", "websocket", "dockerfile"];

for (const locale of ["ko", "en"]) {
  test(`${locale}: exactly the six canonical cases, in MD order`, () => {
    const projects = getProjects(locale);
    assert.deepEqual(projects.map((p) => p.id), EXPECTED);
    assert.deepEqual(projects.map((p) => p.order), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(projects.map((p) => p.category), ["fullstack", "fullstack", "fullstack", "frontend", "frontend", "infra"]);
    for (const p of projects) {
      assert.ok(p.body.length > 500, p.id);
      assert.ok(p.measurement?.length > 30, p.id);
      assert.equal(p.published, true);
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
      ? ["1만 명", "750×", "장관상", "2,000명"]
      : ["10,000", "750×", "Ministerial Prize", "2,000 users"]);
    assert.equal(profile.role, "AI Product / Full-Stack Engineer");
    assert.equal(profile.resumePdf, undefined);
    const data = profile.coverage.find((row) => /데이터|Data/.test(row.layer));
    assert.ok(data.direct.some((s) => /Kafka/.test(s)));
    assert.ok(data.direct.some((s) => /환율|FX/.test(s)));
  });

  test(`${locale}: career, side projects, and source's four awards load`, () => {
    const career = getExperience(locale);
    assert.equal(career.summary.length, 2);
    assert.equal(career.jobs.length, 2);
    assert.ok(career.extra.length > 100);
    assert.ok(career.aiAtlasOverview?.backoffice);
    assert.doesNotMatch(JSON.stringify(career), /단독|5년차|sole|five-year|5-year/i);
    const side = getSideProjects(locale);
    assert.equal(side.cards.length, 4);
    assert.equal(side.awards.split("\n").filter((l) => /^\d+\./.test(l)).length, 4);
    assert.match(side.aiExperience, /Outbox/);
    assert.match(side.cards[0], /COMAtching/);
    assert.match(side.cards[0], /601 → 2/);
    assert.match(side.cards[0], /261\.1ms → 18\.8ms/);
  });

  test(`${locale}: representative experiences and workflow have explicit translations`, () => {
    const expected = {
      representative: ["ai-atlas", "signal-agent", "slp-manufacturing", "ai-development"],
      workflow: ["development-loop", "reusable-skills", "content-automation", "operation-report"],
    };
    for (const [section, ids] of Object.entries(expected)) {
      const items = getExperienceFeatures(section, locale);
      assert.deepEqual(items.map((item) => item.id), ids);
      const dir = path.join("content", locale === "en" ? "en" : "", section);
      assert.equal(fs.readdirSync(dir).filter((file) => file.endsWith(".md")).length, 4);
      for (const item of items) {
        assert.ok(item.summary.length > 40, item.id);
        assert.ok(item.body.length > 100, item.id);
        assert.doesNotMatch(JSON.stringify(item), /\/Users\/|file:\/\//);
      }
    }
    const representative = getExperienceFeatures("representative", locale);
    const workflow = getExperienceFeatures("workflow", locale);
    assert.match(representative[1].title, /신호등 에이전트/);
    assert.match(representative[1].decision, /결정론적|Deterministic/i);
    assert.match(representative[2].title, /On-Prem sLLM × MES MCP/);
    assert.match(representative[2].decision, /읽기 전용|read-only/);
    assert.equal(representative[2].steps.length, 8);
    assert.match(representative[0].summary, /테스트|testing/i);
    assert.ok(representative[1].stack.includes("Human-in-the-loop"));
    assert.match(representative[1].body, /결과\/이력 API|results\/history APIs/);
    assert.match(representative[2].body, /인프라 장애|infrastructure failures/i);
    assert.equal(workflow[0].steps.length, 9);
    assert.equal(workflow[1].metrics[0].value, locale === "ko" ? "36개" : "36");
    assert.match(JSON.stringify(workflow[2]), /93/);
    assert.match(JSON.stringify(workflow[2]), locale === "ko" ? /약 3일 → 4시간/ : /~3 days → 4 hours/);
    assert.match(workflow[3].decision, /AI가 숫자를 계산하지|AI does not calculate/);
  });
}

test("public copy is company-neutral and corrected claims cannot regress", () => {
  const forbidden = /Full-Stack\s*\(단독\)|입사 2개월|2개월 만에|2개월 내|런칭 리더|Traffic Light Agent|AX 우수상|Text-to-SQL|Text to SQL|within two months|Led the launch of a 10,000-user service|NICE평가정보|삼성SDS|LG CNS|현대자동차|금융권에 기여/i;
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
    assert.equal(content.projects[0].metrics[0].value, "1,970ms → 2.6ms");
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
    assert.match(projects["cross-org-sharing"].body, /50\/50/);
    assert.match(projects["file-preview"].body, /740\.4/);
    assert.match(projects["file-preview"].body, /53\.2/);
    assert.match(projects["file-preview"].body, /오래된|stale/i);
    assert.match(projects["file-preview"].body, /후속 보강 설계|not shipped/i);
    assert.match(projects["generative-ui"].body, /16/);
    assert.match(projects["generative-ui"].body, /97\.5%/);
    assert.match(projects.websocket.body, /5분|five-minute/);
    assert.match(projects.dockerfile.body, /8\.13s/);
    assert.match(projects.dockerfile.body, /3\.93s/);
  }
});

test("architecture links target only the six published cases", () => {
  const diagram = fs.readFileSync("src/components/ArchitectureDiagram.tsx", "utf8");
  const arrays = [...diagram.matchAll(/["']?projects["']?:\s*\[([^\]]*)\]/g)];
  assert.ok(arrays.length > 10);
  for (const array of arrays) {
    for (const [, id] of array[1].matchAll(/["']([^"']+)["']/g)) {
      assert.ok(EXPECTED.includes(id), id);
    }
  }
});
