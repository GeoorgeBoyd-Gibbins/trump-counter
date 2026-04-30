import { describe, it, expect } from "vitest";
import { diffToParts } from "./time";

const TARGET = Date.UTC(2029, 0, 20, 17, 0, 0); // 2029-01-20T17:00:00Z

describe("diffToParts", () => {
  it("returns done when now equals target", () => {
    expect(diffToParts(TARGET, TARGET)).toEqual({
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });

  it("returns done when now is past target", () => {
    expect(diffToParts(TARGET, TARGET + 60_000).done).toBe(true);
  });

  it("returns 1 second remaining when 1s before target", () => {
    expect(diffToParts(TARGET, TARGET - 1000)).toEqual({
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      done: false,
    });
  });

  it("returns 1 minute remaining when exactly 60s before target", () => {
    expect(diffToParts(TARGET, TARGET - 60_000)).toMatchObject({
      years: 0,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0,
      done: false,
    });
  });

  it("returns 1 hour remaining when exactly 3600s before target", () => {
    expect(diffToParts(TARGET, TARGET - 3_600_000)).toMatchObject({
      hours: 1,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns whole years when on the same calendar day in a prior year", () => {
    // Two years before target (same instant) should be exactly 2 years, 0 days.
    const twoYearsBefore = Date.UTC(2027, 0, 20, 17, 0, 0);
    expect(diffToParts(TARGET, twoYearsBefore)).toMatchObject({
      years: 2,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("handles a leap year span correctly (2028 is a leap year)", () => {
    // 2028-01-20T17:00:00Z is exactly 1 year before target.
    const oneYearBefore = Date.UTC(2028, 0, 20, 17, 0, 0);
    expect(diffToParts(TARGET, oneYearBefore)).toMatchObject({
      years: 1,
      days: 0,
    });
    // 2027-01-20T17:00:00Z + 1 day later: should be 1 year, 365 days... wait,
    // from 2027-01-21 to 2029-01-20 spans the leap year 2028, so it's
    // 1 full calendar year (to 2028-01-21) + 365 days (2028 is leap → 366 days
    // from 2028-01-21 to 2029-01-21, minus 1 day = 365 days).
    const probe = Date.UTC(2027, 0, 21, 17, 0, 0);
    const r = diffToParts(TARGET, probe);
    expect(r.years).toBe(1);
    expect(r.days).toBe(365);
  });

  it("decomposes a mixed remainder cleanly", () => {
    // 1 day, 2 hours, 3 minutes, 4 seconds before target.
    const offset = 1 * 86_400_000 + 2 * 3_600_000 + 3 * 60_000 + 4 * 1000;
    expect(diffToParts(TARGET, TARGET - offset)).toMatchObject({
      years: 0,
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      done: false,
    });
  });
});
