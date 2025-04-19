import { rand } from ".";
import { describe, it, expect } from "vitest";

describe("core/math", () => {
  describe("rand", () => {
    it("should return a number between 1 and 2", () => {
      for (let i = 0; i < 100; i++) {
        const result = rand(1, 2);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(2);
      }
    });

    it("should return an integer between 1 and 2", () => {
      for (let i = 0; i < 100; i++) {
        const result = rand(1, 2, true);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(2);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it("should return an integer between -100 and 100", () => {
      for (let i = 0; i < 100; i++) {
        const result = rand(-100, 100, true);
        expect(result).toBeGreaterThanOrEqual(-100);
        expect(result).toBeLessThanOrEqual(100);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it("should handle min greater than max by swapping values", () => {
      const result = rand(10, 5);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    });

    it("should return the same value when min equals max", () => {
      const result = rand(7, 7);
      expect(result).toBe(7);
    });
  });
});
