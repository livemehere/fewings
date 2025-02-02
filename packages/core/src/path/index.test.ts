import { getRelativePath, getDepthFrom, getCommonPath } from ".";

describe("core/path", () => {
  it("getRelativePath", () => {
    expect(
      getRelativePath(
        "/Users/repo/fekit/playground/src/Icon",
        "/Users/repo/fekit/playground/public/assets/svg",
      ),
    ).toBe("../../public/assets/svg");

    expect(
      getRelativePath(
        "/Users/repo/fekit/playground/src/Icon",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe("../assets");

    expect(
      getRelativePath(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src",
      ),
    ).toBe("./");

    expect(
      getRelativePath(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe("./assets");
  });

  it("getDepthFrom", () => {
    expect(
      getDepthFrom(
        "/Users/repo/fekit/playground",
        "/Users/repo/fekit/playground/public/assets/svg",
      ),
    ).toBe(3);

    expect(
      getDepthFrom(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe(1);

    expect(
      getDepthFrom(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src",
      ),
    ).toBe(0);

    expect(
      getDepthFrom(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe(1);
  });

  it("getCommonPath", () => {
    expect(
      getCommonPath(
        "/Users/repo/fekit/playground/src/Icon",
        "/Users/repo/fekit/playground/public/assets/svg",
      ),
    ).toBe("/Users/repo/fekit/playground");

    expect(
      getCommonPath(
        "/Users/repo/fekit/playground/src/Icon",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe("/Users/repo/fekit/playground/src");

    expect(
      getCommonPath(
        "/Users/repo/fekit/playground/src",
        "/Users/repo/fekit/playground/src",
      ),
    ).toBe("/Users/repo/fekit/playground/src");

    expect(
      getCommonPath(
        "/Users/repo/fekit/playground/src2",
        "/Users/repo/fekit/playground/src/assets",
      ),
    ).toBe("/Users/repo/fekit/playground");
  });
});
