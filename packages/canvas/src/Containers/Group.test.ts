import { Group } from "./Group";

describe("Group", () => {
  let group: Group;
  beforeEach(() => {
    group = new Group();
  });

  it("should have correct x, y, width, height", () => {
    expect(group.x).toBe(0);
    expect(group.y).toBe(0);
    expect(group.width).toBe(0);
    expect(group.height).toBe(0);
  });
});
