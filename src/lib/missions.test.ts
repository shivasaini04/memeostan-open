import { describe, expect, it } from "vitest";
import { dailyMission } from "./missions";

describe("shared daily mission", () => {
  it("uses the same prompt and tag throughout a UTC day", () => {
    const a = dailyMission(Date.parse("2026-10-31T00:00:00Z"));
    const b = dailyMission(Date.parse("2026-10-31T23:59:59.999Z"));
    expect(a).toEqual(b);
    expect(a.tag).toBe("#Memeostan20261031");
    expect(a.endsAt).toBe(Date.parse("2026-11-01T00:00:00Z"));
  });
  it("rotates at midnight and never reuses an old entry tag", () => {
    const a = dailyMission(Date.parse("2026-10-31T23:59:59.999Z"));
    const b = dailyMission(a.endsAt);
    const nextWeek = dailyMission(a.endsAt + 6 * 86400000);
    expect(b.title).not.toBe(a.title);
    expect(b.tag).not.toBe(a.tag);
    expect(nextWeek.title).toBe(a.title);
    expect(nextWeek.tag).not.toBe(a.tag);
  });
});
