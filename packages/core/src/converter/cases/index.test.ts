import { toPascalCase, toCamelCase, toKebabCase } from ".";

describe("core/converter/cases", () => {
  const str = "to my case";
  const str2 = "to-my-case";
  const str3 = "toMyCase";
  const str4 = "to_my_case";
  const str5 = "ToMyCase";

  it("to pascal case", () => {
    expect(toPascalCase(str)).toBe("ToMyCase");
    expect(toPascalCase(str2)).toBe("ToMyCase");
    expect(toPascalCase(str3)).toBe("ToMyCase");
    expect(toPascalCase(str4)).toBe("ToMyCase");
    expect(toPascalCase(str5)).toBe("ToMyCase");
  });

  it("to camel case", () => {
    expect(toCamelCase(str)).toBe("toMyCase");
    expect(toCamelCase(str2)).toBe("toMyCase");
    expect(toCamelCase(str3)).toBe("toMyCase");
    expect(toCamelCase(str4)).toBe("toMyCase");
    expect(toCamelCase(str5)).toBe("toMyCase");
  });

  it("to kebab case", () => {
    expect(toKebabCase(str)).toBe("to-my-case");
    expect(toKebabCase(str2)).toBe("to-my-case");
    expect(toKebabCase(str3)).toBe("to-my-case");
    expect(toKebabCase(str4)).toBe("to-my-case");
    expect(toKebabCase(str5)).toBe("to-my-case");
  });
});
