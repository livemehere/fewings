import { PrimitiveContainer } from "../Containers/PrimitiveContainer";
import { PrimitiveShape } from "../Shapes/PrimitiveShape";

describe("Container", () => {
  describe("Primitive", () => {
    const primitiveShape = new PrimitiveShape({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    primitiveShape.addTag("test");

    const primitiveShape2 = new PrimitiveShape({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    primitiveShape2.addTag(["test", "deep child"]);
    const innerContainer = new PrimitiveContainer({ debug: false });
    innerContainer.addChild(primitiveShape2);

    let container: PrimitiveContainer;
    beforeEach(() => {
      container = new PrimitiveContainer({ debug: false });
      container.addChild(primitiveShape);
      container.addChild(innerContainer);
    });

    it("initialize default properties", () => {
      expect(container.children.length).toEqual(2);
    });

    it("remove child", () => {
      expect(container.children.length).toEqual(2);
      expect(container.children[0]).toEqual(primitiveShape);
      container.removeChild(primitiveShape);
      expect(container.children.length).toEqual(1);
      expect(container.children[0]).toEqual(innerContainer);
      container.removeChild(innerContainer);
      expect(container.children.length).toEqual(0);
    });

    it("traverse", () => {
      let i = 0;
      container.traverse((node) => {
        if (i === 0) {
          expect(node.id).toEqual(primitiveShape.id);
        } else {
          expect(node.id).toEqual(primitiveShape2.id);
        }
        i++;
      });
    });

    it("findById", () => {
      expect(container.findById(primitiveShape.id)).toEqual(primitiveShape);
      expect(container.findById(primitiveShape2.id)).toEqual(primitiveShape2);
      expect(container.findById("not found")).toEqual(null);
    });

    it("findByTag", () => {
      expect(container.findByTag("test")).toEqual([
        primitiveShape,
        primitiveShape2,
      ]);
      expect(container.findByTag("not found")).toEqual([]);
    });

    it("findAll", () => {
      expect(
        container.findAll((node) => node.id === primitiveShape.id),
      ).toEqual([primitiveShape]);
      expect(
        container.findAll((node) => node.id === primitiveShape2.id),
      ).toEqual([primitiveShape2]);
      expect(container.findAll((node) => node.id === "not found")).toEqual([]);
    });
  });
});
