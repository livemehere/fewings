import { describe, it, expect } from "vitest";
import { secondToTime } from ".";

describe("core/converter/secondToTime", () => {
  it("should split seconds into hours, minutes, and seconds when 'to' is 'h'", () => {
    expect(secondToTime(3661, "h")).toEqual({ h: 1, m: 1, s: 1 });
    expect(secondToTime(7200, "h")).toEqual({ h: 2, m: 0, s: 0 });
    expect(secondToTime(59, "h")).toEqual({ h: 0, m: 0, s: 59 });
    expect(secondToTime(3605, "h")).toEqual({ h: 1, m: 0, s: 5 });
  });

  it("should split seconds into minutes and seconds when 'to' is 'm'", () => {
    expect(secondToTime(3661, "m")).toEqual({ h: 0, m: 61, s: 1 });
    expect(secondToTime(7200, "m")).toEqual({ h: 0, m: 120, s: 0 });
    expect(secondToTime(59, "m")).toEqual({ h: 0, m: 0, s: 59 });
    expect(secondToTime(3605, "m")).toEqual({ h: 0, m: 60, s: 5 });
  });

  it("should return all zeros for 0 seconds", () => {
    expect(secondToTime(0, "h")).toEqual({ h: 0, m: 0, s: 0 });
    expect(secondToTime(0, "m")).toEqual({ h: 0, m: 0, s: 0 });
  });
});
