import { CNode, TNodeProps } from "../Core/CNode";
import { Bounds, ModelTypeMap, TModelType } from "../types";

class SampleNode extends CNode {
  readonly type: TModelType = ModelTypeMap.PRIMITIVE;
  constructor(props?: TNodeProps) {
    super(props);
  }
  toJSON(): string {
    throw new Error("Method not implemented.");
  }
  fromJSON(json: string): CNode {
    throw new Error("Method not implemented.");
  }
  clone(): CNode {
    throw new Error("Method not implemented.");
  }
  get x(): number {
    throw new Error("Method not implemented.");
  }
  set x(v: number) {
    throw new Error("Method not implemented.");
  }
  get y(): number {
    throw new Error("Method not implemented.");
  }
  set y(v: number) {
    throw new Error("Method not implemented.");
  }
  get width(): number {
    throw new Error("Method not implemented.");
  }
  set width(v: number) {
    throw new Error("Method not implemented.");
  }
  get height(): number {
    throw new Error("Method not implemented.");
  }
  set height(v: number) {
    throw new Error("Method not implemented.");
  }

  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  hitMapRender(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  protected debugRender(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  getBounds(): Bounds {
    throw new Error("Method not implemented.");
  }
  getGlobalBounds(): Bounds {
    throw new Error("Method not implemented.");
  }
}

describe("CNode", () => {
  let cNode: SampleNode;
  beforeEach(() => {
    cNode = new SampleNode();
  });

  it("should create a CNode", () => {
    expect(cNode).toBeDefined();
    expect(CNode.idMap.get(cNode.id)).toBe(cNode);
  });

  it("should have hex id", () => {
    expect(cNode.id).toMatch(/^#\w+$/);
  });

  it("should have default non-empty attributes", () => {
    expect(cNode.visible).toBe(true);
    expect(cNode.parent).toBeNull();
    expect(cNode.tags.size).toBe(0);
    expect(cNode.debug).toBe(false);
    expect(cNode.isStatic).toBe(false);
    expect(cNode.type).toBe(ModelTypeMap.PRIMITIVE);
    expect(cNode.fillStyle).toBe("black");
    expect(cNode.strokeStyle).toBe("black");
    expect(cNode.strokeWidth).toBe(1);
    expect(cNode.rotate).toBe(0);
  });

  it("should have default empty value", () => {
    expect(cNode.opacity).toBeUndefined();
    expect(cNode.shadowColor).toBeUndefined();
    expect(cNode.shadowBlur).toBeUndefined();
    expect(cNode.shadowOffsetX).toBeUndefined();
    expect(cNode.shadowOffsetY).toBeUndefined();
    expect(cNode.lineDash).toBeUndefined();
    expect(cNode.lineDashOffset).toBeUndefined();
    expect(cNode.round).toBeUndefined();
  });

  it("can dispatch any event", () => {
    const listener = vi.fn();
    cNode.on("redraw", listener);
    cNode.dispatch("redraw");
    expect(listener).toHaveBeenCalled();
  });

  it("work well with tags", () => {
    const tag1 = "tag1";
    const tag2 = "tag2";

    cNode.addTag(tag1);
    cNode.addTag(tag2);
    expect(cNode.hasTag(tag1)).toBe(true);
    expect(cNode.hasTag(tag2)).toBe(true);

    cNode.removeTag(tag1);
    expect(cNode.hasTag(tag1)).toBe(false);
    expect(cNode.hasTag(tag2)).toBe(true);

    cNode.clearTags();
    expect(cNode.hasTag(tag1)).toBe(false);
    expect(cNode.hasTag(tag2)).toBe(false);

    cNode.addTag([tag1, tag2]);
    expect(cNode.hasTag(tag1)).toBe(true);
    expect(cNode.hasTag(tag2)).toBe(true);

    cNode.removeTag([tag1, tag2]);
    expect(cNode.hasTag(tag1)).toBe(false);
    expect(cNode.hasTag(tag2)).toBe(false);
  });

  it("toString", () => {
    expect(cNode.toString()).toBe(`CNode(${cNode.id})`);
  });

  it.todo("toJSON");
  it.todo("fromJSON");
  it.todo("clone");
});
