import { describe, it, expect } from "vitest";
import { clamp } from ".";

describe("core/clamp", () => {
  it("should return the value when it's between min and max", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(3.5, 1, 10)).toBe(3.5);
    expect(clamp(7, 0, 100)).toBe(7);
  });

  it("should restrict values below the minimum to the minimum value", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(0.5, 1, 10)).toBe(1);
    expect(clamp(-100, -50, 50)).toBe(-50);
  });

  it("should restrict values above the maximum to the maximum value", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, 0, 50)).toBe(50);
    expect(clamp(75, -25, 25)).toBe(25);
  });

  it("should return the value when min and max are the same", () => {
    expect(clamp(0, 5, 5)).toBe(5);
    expect(clamp(10, 5, 5)).toBe(5);
  });

  it("should handle decimal values correctly", () => {
    expect(clamp(1.5, 1.2, 2.5)).toBe(1.5);
    expect(clamp(0.5, 1.0, 2.0)).toBe(1.0);
    expect(clamp(3.5, 1.0, 3.0)).toBe(3.0);
  });

  it("should handle negative ranges correctly", () => {
    expect(clamp(-15, -20, -10)).toBe(-15);
    expect(clamp(-25, -20, -10)).toBe(-20);
    expect(clamp(-5, -20, -10)).toBe(-10);
  });
});
