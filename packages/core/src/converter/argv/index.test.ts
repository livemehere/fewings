import { parseArgv } from ".";

describe("core/converter/argv", () => {
  it("parse", () => {
    const argv = ["node", "index.js", "--name", "fekit", "--age", "18"];
    const result = parseArgv(argv);
    expect(result).toEqual({ name: "fekit", age: "18" });
  });

  it("parse boolean", () => {
    const argv = ["node", "index.js", "--name", "--age", "18"];
    const result = parseArgv(argv);
    expect(result).toEqual({ name: true, age: "18" });
  });
});
