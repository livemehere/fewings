import { rand } from ".";
import { describe } from "vitest";

describe("core/math", () => {
  describe("rand", () => {
    it("should return a number between 1 and 2", () => {
      const result = rand(1, 2);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(2);
    });

    it("should return an integer between 1 and 2", () => {
      const result = rand(1, 2, true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(2);
      expect(result).toBe(Math.floor(result));
    });

    it("should return a integer between -100 and 100", () => {
      const result = rand(-100, 100, true);
      expect(result).toBeGreaterThanOrEqual(-100);
      expect(result).toBeLessThanOrEqual(100);
      expect(result).toBe(Math.floor(result));
    });
  });
});
