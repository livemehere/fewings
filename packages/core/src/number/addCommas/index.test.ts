import { addCommas } from ".";

describe("core/number", () => {
  describe("addCommas", () => {
    it("should add commas to a number", () => {
      expect(addCommas(123456789)).toBe("123,456,789");
      expect(addCommas(123456789.123)).toBe("123,456,789.123");
    });

    it("should be fail (limitation of the implementation)", () => {
      expect(addCommas(123456789.123456789)).not.toBe("123,456,789.123456789");
      expect(addCommas(123456789.123456789)).toBe("123,456,789.12345679");
    });
  });
});
