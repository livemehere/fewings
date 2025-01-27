import { getRelativePath } from ".";

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
});
