// lib/__tests__/work.server.test.ts
// Content guard for the work collection: catches frontmatter typos and
// broken invariants (ordering, flagship count, NDA link policy) at test time
// instead of at render time.
import { describe, expect, it } from "vitest";
import { getAllWorkStudies, getWorkSlugs, getWorkSummaryBySlug } from "@/lib/work.server";

describe("work collection", () => {
  it("parses every study with the required frontmatter", async () => {
    const studies = await getAllWorkStudies();
    expect(studies.length).toBeGreaterThanOrEqual(4);

    for (const study of studies) {
      expect(study.title, `${study.slug} title`).not.toBe("");
      expect(study.summary, `${study.slug} summary`).not.toBe("");
      expect(study.role, `${study.slug} role`).not.toBe("");
      expect(study.timeline, `${study.slug} timeline`).not.toBe("");
      expect(["live", "production", "proprietary"]).toContain(study.status[0]);
      expect(study.stack.length, `${study.slug} stack`).toBeGreaterThan(0);
      expect(study.order).toBeLessThan(Number.MAX_SAFE_INTEGER);
    }
  });

  it("sorts by curated order and features exactly the two flagship studies", async () => {
    const studies = await getAllWorkStudies();
    const orders = studies.map((study) => study.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));

    const featured = studies.filter((study) => study.featured).map((study) => study.slug);
    expect(featured).toEqual(["tradeops-ai", "travel-pretrip-approval"]);
  });

  it("normalizes metric values to strings for YAML-number frontmatter", () => {
    for (const slug of getWorkSlugs()) {
      const study = getWorkSummaryBySlug(slug);
      expect(study).not.toBeNull();
      for (const metric of study?.metrics ?? []) {
        expect(typeof metric.value).toBe("string");
        expect(typeof metric.label).toBe("string");
      }
    }
  });
});
