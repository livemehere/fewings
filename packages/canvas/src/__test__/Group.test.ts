import { Group } from "../Containers/Group";
import { Rect } from "../Shapes/Rect";
import { Shape } from "../Shapes/Shape";

describe("Group", () => {
  let group: Group;
  let r1: Shape;
  let r2: Shape;
  beforeEach(() => {
    group = new Group();
    r1 = new Rect({ x: 0, y: 0, width: 100, height: 100 });
    r2 = new Rect({ x: 100, y: 100, width: 100, height: 100 });
  });

  it("should have default values", () => {
    expect(group.x).toBe(0);
    expect(group.y).toBe(0);
    expect(group.width).toBe(0);
    expect(group.height).toBe(0);
    expect(group.scale).toBe(1);
    expect(group.children.length).toBe(0);
    expect(group.getBounds()).toEqual({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    });
  });

  it("should have correct x, y, width, height", () => {
    group.addChild(r1);
    group.addChild(r2);
    expect(group.x).toBe(0);
    expect(group.y).toBe(0);
    expect(group.width).toBe(200);
    expect(group.height).toBe(200);
  });

  it("getBounds()", () => {
    group.addChild(r1);
    group.addChild(r2);
    expect(group.getBounds()).toEqual({
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
    });
    r1.x -= 50;
    r2.x += 50;
    expect(group.getBounds()).toEqual({
      left: -50,
      top: 0,
      right: 250,
      bottom: 200,
    });
  });
  it.todo("getGlobalBounds()", () => {});
});
