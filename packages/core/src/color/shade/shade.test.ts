import { describe, it, expect } from "vitest";
import { shade } from ".";

describe("core/color/shade", () => {
  it("should brighten a 6-digit hex color", () => {
    expect(shade("#000000", 100)).toBe("#ffffff");
    expect(shade("#123456", 50)).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("should darken a 6-digit hex color", () => {
    expect(shade("#ffffff", -100)).toBe("#000000");
    expect(shade("#abcdef", -50)).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("should handle 3-digit short hex color", () => {
    expect(shade("#000", 100)).toBe("#ffffff");
    expect(shade("#f0f", -50)).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("should handle 8-digit hex color with alpha channel", () => {
    expect(shade("#123456ff", 30)).toMatch(/^#[0-9a-fA-F]{6}ff$/);
    expect(shade("#abcdefcc", -30)).toMatch(/^#[0-9a-fA-F]{6}cc$/);
  });

  it("should clamp weight to valid range", () => {
    expect(shade("#123456", 200)).toBe(shade("#123456", 100));
    expect(shade("#123456", -200)).toBe(shade("#123456", -100));
  });

  it("should preserve alpha channel in 8-digit format", () => {
    const result = shade("#112233cc", 20);
    expect(result.endsWith("cc")).toBe(true);
  });

  it("should handle invalid alpha channel", () => {
    expect(() => shade("#112233gg", 20)).toThrow("Invalid HEX color format");
  });

  it("should be case insensitive", () => {
    expect(shade("#abcdef", 30)).toEqual(shade("#ABCDEF", 30));
    expect(shade("#f0f", -30)).toEqual(shade("#F0F", -30));
  });
});
