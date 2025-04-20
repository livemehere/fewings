import { describe, it, expect } from 'vitest';
import { percentToRatio, ratioToPercent } from '.';

describe('core/converter/percentRatio', () => {
  describe('percentToRatio', () => {
    it('should convert number percent to ratio', () => {
      expect(percentToRatio(50)).toBe(0.5);
      expect(percentToRatio(100)).toBe(1);
      expect(percentToRatio(0)).toBe(0);
    });

    it('should convert string percent to ratio', () => {
      expect(percentToRatio('50')).toBe(0.5);
      expect(percentToRatio('100')).toBe(1);
      expect(percentToRatio('0')).toBe(0);
    });

    it('should handle string with decimal percent', () => {
      expect(percentToRatio('12.5')).toBe(0.125);
      expect(percentToRatio('0.1')).toBe(0.001);
    });

    it('should handle string with percentage sign', () => {
      expect(percentToRatio('50%')).toBe(0.5);
    });

    it('should return NaN for invalid string input', () => {
      expect(percentToRatio('abc')).toBeNaN();
    });
  });

  describe('ratioToPercent', () => {
    it('should convert ratio to percent string', () => {
      expect(ratioToPercent(0.5)).toBe('50%');
      expect(ratioToPercent(1)).toBe('100%');
      expect(ratioToPercent(0)).toBe('0%');
    });

    it('should support fixed decimal places', () => {
      expect(ratioToPercent(0.12345, 2)).toBe('12.35%');
      expect(ratioToPercent(0.1, 1)).toBe('10.0%');
      expect(ratioToPercent(0.5, 0)).toBe('50%');
    });

    it('should round correctly with fixed decimals', () => {
      expect(ratioToPercent(1 / 3, 2)).toBe('33.33%');
      expect(ratioToPercent(2 / 3, 1)).toBe('66.7%');
    });
  });
});
