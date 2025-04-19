import { describe, expect, it } from "vitest";
import { parse, stringify } from ".";

describe("core/qs", () => {
  it("parse string to object", () => {
    const searchStr =
      "?name=kong&idx=3%2C4&serviceId=430011481&serverId=5&placementId=1";
    const result = parse(searchStr);
    expect(result).toEqual({
      name: "kong",
      idx: ["3", "4"],
      serviceId: "430011481",
      serverId: "5",
      placementId: "1",
    });
  });

  it("parse string to object with no escaped string", () => {
    const searchStr =
      "?name=kong&idx=3,4&serviceId=430011481&serverId=5&placementId=1";
    const result = parse(searchStr);
    expect(result).toEqual({
      name: "kong",
      idx: ["3", "4"],
      serviceId: "430011481",
      serverId: "5",
      placementId: "1",
    });
  });

  it("parse empty string to empty object", () => {
    const searchStr = "";
    const result = parse(searchStr);
    expect(result).toEqual({});
  });

  it("object stringify", () => {
    const obj = {
      name: "kong",
      idx: ["3", "4"],
      serviceId: "430011481",
      serverId: "5",
      placementId: "1",
    };
    const result = stringify(obj);
    expect(result).toBe(
      "?name=kong&idx=3%2C4&serviceId=430011481&serverId=5&placementId=1"
    );
  });

  it("object stringify without falsy value", () => {
    const obj = {
      name: "kong",
      idx: ["3", "4"],
      serviceId: "430011481",
      serverId: "5",
      placementId: null,
      empty: undefined,
    };
    const result = stringify(obj);
    expect(result).toBe("?name=kong&idx=3%2C4&serviceId=430011481&serverId=5");
  });
});
