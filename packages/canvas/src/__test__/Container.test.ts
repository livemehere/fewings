import { Container } from "../Containers/Container";
import { CNode, ICNodeProps } from "../Core/CNode";
import { Rect } from "../Shapes/Rect";
import { TModelType, Bounds, ModelTypeMap } from "../types";

class SampleContainer extends Container {
  readonly type: TModelType = ModelTypeMap.CONTAINER;
  constructor(props?: ICNodeProps) {
    super(props);
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
  toJSON(): string {
    throw new Error("Method not implemented.");
  }
  fromJSON(json: string): CNode {
    throw new Error("Method not implemented.");
  }
  clone(): CNode {
    throw new Error("Method not implemented.");
  }
  getBounds(): Bounds {
    throw new Error("Method not implemented.");
  }
  getGlobalBounds(): Bounds {
    throw new Error("Method not implemented.");
  }
}

describe("Container", () => {
  let container: Container;
  let shape: Rect;
  let innerContainer: Container;
  let innerShape: Rect;
  beforeEach(() => {
    container = new SampleContainer();
    shape = new Rect({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    shape.addTag("test-shape");
    innerContainer = new SampleContainer();
    innerShape = new Rect({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    innerShape.addTag(["test-shape", "inner-shape"]);
    innerContainer.addChild(innerShape);
  });

  it("should have empty children by default", () => {
    expect(container.children.length).toEqual(0);
  });

  it("addChild", () => {
    container.addChild(shape);
    container.addChild(innerContainer);

    expect(container.children[0]).toEqual(shape);
    expect(container.children[1]).toEqual(innerContainer);
    expect(container.children.length).toEqual(2);

    expect(shape.parent).toEqual(container);
    expect(innerContainer.parent).toEqual(container);

    container.addChild(shape);
    expect(container.children.length).toEqual(2);
    expect(shape.parent).toEqual(container);
    expect(container.children[1]).toEqual(shape);
  });

  it("bringToFront when child is already included", () => {
    container.addChild(shape);
    container.addChild(shape);
    expect(container.children.length).toEqual(1);
    expect(container.children[0]).toEqual(shape);
  });

  it("move child from container to other container", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    expect(innerShape.parent).toEqual(innerContainer);
    expect(container.children.length).toEqual(2);
    expect(innerContainer.children.length).toEqual(1);

    // move
    container.addChild(innerShape);
    expect(container.children.length).toEqual(3);
    expect(innerContainer.children.length).toEqual(0);
    expect(innerShape.parent).toEqual(container);
  });

  it("removeChild", () => {
    container.addChild(shape);
    container.removeChild(shape);
    expect(container.children.length).toEqual(0);
  });

  it("bringToFront", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    expect(container.children[0]).toEqual(shape);
    expect(container.children[1]).toEqual(innerContainer);
    container.bringToFront(shape);
    expect(container.children[0]).toEqual(innerContainer);
    expect(container.children[1]).toEqual(shape);
  });

  it("sendToBack", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    expect(container.children[0]).toEqual(shape);
    expect(container.children[1]).toEqual(innerContainer);
    container.sendToBack(innerContainer);
    expect(container.children[0]).toEqual(innerContainer);
    expect(container.children[1]).toEqual(shape);
  });

  it("traverse", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    let i = 0;
    container.traverse((node) => {
      if (i === 0) {
        expect(node.id).toEqual(shape.id);
      } else {
        expect(node.id).toEqual(innerShape.id);
      }
      i++;
    });
  });

  it("findById", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    expect(container.findById(shape.id)).toEqual(shape);
    expect(container.findById(innerShape.id)).toEqual(innerShape);
    expect(container.findById("not found")).toEqual(null);
  });

  it.skip("findByTag", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    innerContainer.addChild(innerShape);
    expect(container.findByTag("test-shape")).toEqual([shape, innerShape]);
    expect(container.findByTag("not found")).toEqual([]);
  });

  it.skip("findAll", () => {
    container.addChild(shape);
    container.addChild(innerContainer);
    innerContainer.addChild(innerShape);
    expect(container.findAll((node) => node.id === shape.id)).toEqual([shape]);
    expect(container.findAll((node) => node.id === innerShape.id)).toEqual([
      innerShape,
    ]);
    expect(container.findAll((node) => node.id === "not found")).toEqual([]);
  });

  it.todo("toJSON");
  it.todo("fromJSON");
  it.todo("clone");
});
