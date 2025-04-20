import { describe, it, expect } from 'vitest';
import { snap } from '.';

describe('snap function', () => {
  it('should snap positive values to the nearest multiple of snap size', () => {
    expect(snap(7, 5)).toBe(5); // 7 → 5
    expect(snap(8, 5)).toBe(10); // 8 → 10
    expect(snap(12, 10)).toBe(10);
    expect(snap(17, 10)).toBe(20);
  });

  it('should snap negative values correctly', () => {
    expect(snap(-7, 5)).toBe(-5);
    expect(snap(-8, 5)).toBe(-10);
    expect(snap(-12, 10)).toBe(-10);
    expect(snap(-17, 10)).toBe(-20);
  });

  it('should snap decimal values correctly', () => {
    expect(snap(2.3, 1)).toBe(2);
    expect(snap(2.7, 1)).toBe(3);
    expect(snap(2.5, 0.5)).toBe(2.5);
    expect(snap(2.75, 0.5)).toBe(3);
  });

  it('should snap to 0 when value is near zero', () => {
    expect(snap(0.1, 1)).toBe(0);
    expect(snap(-0.1, 1)).toBe(0);
  });

  it('should return 0 when value is 0', () => {
    expect(snap(0, 1)).toBe(0);
    expect(snap(0, 10)).toBe(0);
  });

  it('should handle snapSize of 1 as rounding', () => {
    expect(snap(1.4, 1)).toBe(1);
    expect(snap(1.5, 1)).toBe(2);
    expect(snap(-1.5, 1)).toBe(-1); // ⚠️ Math.round(negative) works
  });

  it('should return NaN when snapSize is 0', () => {
    expect(snap(5, 0)).toBeNaN(); // division by zero
  });
});
