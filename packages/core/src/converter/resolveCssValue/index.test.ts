import { resolveCssValue } from ".";

describe("core/converter/resolveCssValue", () => {
  it("should append 'px' if the input is a number", () => {
    expect(resolveCssValue(10)).toBe("10px");
    expect(resolveCssValue(0)).toBe("0px");
    expect(resolveCssValue(3.5)).toBe("3.5px");
  });

  it("should append 'px' if the input is a numeric string", () => {
    expect(resolveCssValue("10")).toBe("10px");
    expect(resolveCssValue("0")).toBe("0px");
    expect(resolveCssValue("3.5")).toBe("3.5px");
  });

  it("should return the input as is if it already has a valid CSS unit", () => {
    expect(resolveCssValue("10px")).toBe("10px");
    expect(resolveCssValue("50%")).toBe("50%");
    expect(resolveCssValue("1.5em")).toBe("1.5em");
    expect(resolveCssValue("auto")).toBe("auto");
    expect(resolveCssValue("inherit")).toBe("inherit");
    expect(resolveCssValue("var(--custom-var)")).toBe("var(--custom-var)");
  });
});
