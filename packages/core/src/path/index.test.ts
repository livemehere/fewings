import {
  resolveRelativeImportPath,
  getPathDepthDiff,
  getSharedPathPrefix,
} from '.';

describe('core/path', () => {
  describe('resolveRelativeImportPath', () => {
    it('returns a relative path from source to target when both are in different base directories', () => {
      expect(
        resolveRelativeImportPath(
          '/Users/repo/fekit/playground/src/Icon',
          '/Users/repo/fekit/playground/public/assets/svg'
        )
      ).toBe('../../public/assets/svg');
    });

    it('returns a relative path when both are within the same subdirectory', () => {
      expect(
        resolveRelativeImportPath(
          '/Users/repo/fekit/playground/src/Icon',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe('../assets');
    });

    it("returns './' when source and target paths are the same", () => {
      expect(
        resolveRelativeImportPath(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src'
        )
      ).toBe('./');
    });

    it("returns './<subpath>' when target is a subdirectory of source", () => {
      expect(
        resolveRelativeImportPath(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe('./assets');
    });
  });

  describe('getPathDepthDiff', () => {
    it('returns depth difference when target is nested multiple levels under source', () => {
      expect(
        getPathDepthDiff(
          '/Users/repo/fekit/playground',
          '/Users/repo/fekit/playground/public/assets/svg'
        )
      ).toBe(3);
    });

    it('returns depth difference of 1 when target is one level deeper', () => {
      expect(
        getPathDepthDiff(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe(1);
    });

    it('returns 0 when both paths are the same', () => {
      expect(
        getPathDepthDiff(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src'
        )
      ).toBe(0);
    });

    it('returns consistent result for repeated depth checks', () => {
      expect(
        getPathDepthDiff(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe(1);
    });
  });

  describe('getSharedPathPrefix', () => {
    it('returns common base path when source and target diverge early', () => {
      expect(
        getSharedPathPrefix(
          '/Users/repo/fekit/playground/src/Icon',
          '/Users/repo/fekit/playground/public/assets/svg'
        )
      ).toBe('/Users/repo/fekit/playground');
    });

    it('returns nested common path when source and target share deeper directories', () => {
      expect(
        getSharedPathPrefix(
          '/Users/repo/fekit/playground/src/Icon',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe('/Users/repo/fekit/playground/src');
    });

    it('returns full path when both paths are identical', () => {
      expect(
        getSharedPathPrefix(
          '/Users/repo/fekit/playground/src',
          '/Users/repo/fekit/playground/src'
        )
      ).toBe('/Users/repo/fekit/playground/src');
    });

    it('returns top-level common path when paths have different branches', () => {
      expect(
        getSharedPathPrefix(
          '/Users/repo/fekit/playground/src2',
          '/Users/repo/fekit/playground/src/assets'
        )
      ).toBe('/Users/repo/fekit/playground');
    });
  });
});
