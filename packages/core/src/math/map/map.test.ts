import { describe, it, expect } from "vitest";
import { map } from ".";

describe("map function", () => {
  it("should accurately map a value to a new range", () => {
    // Basic mapping tests
    expect(map(5, 0, 10, 0, 100)).toBe(50);
    expect(map(2.5, 0, 10, 0, 100)).toBe(25);
    expect(map(7.5, 0, 10, 0, 100)).toBe(75);

    // Negative range tests
    expect(map(0, -10, 10, 0, 100)).toBe(50);
    expect(map(-5, -10, 10, 0, 100)).toBe(25);

    // Reverse mapping tests
    expect(map(75, 0, 100, 10, 0)).toBe(2.5);

    // Decimal precision tests
    expect(map(0.5, 0, 1, 0, 100)).toBe(50);
  });

  it("should return constrained values when input is out of range", () => {
    // Minimum value constraint test
    expect(map(-5, 0, 10, 0, 100)).toBe(0);

    // Maximum value constraint test
    expect(map(15, 0, 10, 0, 100)).toBe(100);
  });

  it("should return the original value when input and output ranges are the same", () => {
    expect(map(5, 0, 10, 0, 10)).toBe(5);
    expect(map(-3, -10, 10, -10, 10)).toBe(-3);
  });

  it("should return NaN for invalid ranges", () => {
    expect(map(5, 5, 5, 0, 10)).toBe(NaN);
    expect(map(10, 10, 10, 0, 10)).toBe(NaN);
    expect(map(-5, -5, -5, 0, 10)).toBe(NaN);
  });
});
