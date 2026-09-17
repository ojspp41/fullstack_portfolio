import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { getExperience, getProfile, getProjects, getSideProjects } from "../src/lib/content.ts";

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
      ? ["1만 명", "99.6%↓", "장관상", "2,000명"]
      : ["10,000", "99.6%↓", "Ministerial Prize", "2,000 users"]);
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
  });
}

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
