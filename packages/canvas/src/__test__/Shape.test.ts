import { describe, it, expect } from "vitest";
import { ModelTypeMap } from "../types";
import { PrimitiveShape } from "../Shapes/PrimitiveShape";

describe("Shape", () => {
  describe("common", () => {
    let primitive: PrimitiveShape;
    beforeEach(() => {
      primitive = new PrimitiveShape({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      });
    });

    it("Initialize default values", () => {
      expect(primitive.x).toBe(0);
      expect(primitive.y).toBe(0);
      expect(primitive.width).toBe(100);
      expect(primitive.height).toBe(100);
      expect(primitive.fillStyle).toBe("black");
      expect(primitive.strokeStyle).toBe("black");
      expect(primitive.strokeWidth).toBe(1);
      expect(primitive.opacity).toBe(1);
      expect(primitive.shadowColor).toBe("black");
      expect(primitive.shadowBlur).toBe(0);
      expect(primitive.shadowOffsetX).toBe(0);
      expect(primitive.shadowOffsetY).toBe(0);
      expect(primitive.lineDash).toEqual([]);
      expect(primitive.lineDashOffset).toBe(0);
      expect(primitive.rotate).toBe(0);
      expect(primitive.pivot).toEqual({ x: 50, y: 50 }); // center of shape
      expect(primitive.round).toEqual([]);
      expect(primitive.visible).toBe(true);
      expect(primitive.parent).toBeNull();
      expect(primitive.tags).toEqual(new Set());
      expect(primitive.debug).toBe(false);
      expect(primitive.isStatic).toBe(false);
      expect(primitive.type).toBe(ModelTypeMap.PRIMITIVE);
      expect(primitive.id).toBeDefined();
      expect(primitive.id).toMatch(/^#\w+$/);
    });

    it("change properties", () => {
      primitive.fillStyle = "blue";
      expect(primitive.fillStyle).toBe("blue");
      primitive.strokeStyle = "red";
      expect(primitive.strokeStyle).toBe("red");
      primitive.strokeWidth = 2;
      expect(primitive.strokeWidth).toBe(2);
      primitive.rotate = Math.PI / 2;
      expect(primitive.rotate).toBe(Math.PI / 2);
      primitive.opacity = 0.5;
      expect(primitive.opacity).toBe(0.5);
      primitive.shadowColor = "black";
      expect(primitive.shadowColor).toBe("black");
      primitive.shadowBlur = 10;
      expect(primitive.shadowBlur).toBe(10);
      primitive.shadowOffsetX = 10;
      expect(primitive.shadowOffsetX).toBe(10);
      primitive.shadowOffsetY = 10;
      expect(primitive.shadowOffsetY).toBe(10);
      primitive.lineDash = [10, 5];
      expect(primitive.lineDash).toEqual([10, 5]);
      primitive.lineDashOffset = 10;
      expect(primitive.lineDashOffset).toBe(10);
      primitive.round = [10, 10, 10, 10];
      expect(primitive.round).toEqual([10, 10, 10, 10]);
      primitive.pivot = { x: 10, y: 10 };
      expect(primitive.pivot).toEqual({ x: 10, y: 10 });
      primitive.visible = false;
      expect(primitive.visible).toBe(false);
      primitive.debug = true;
      expect(primitive.debug).toBe(true);
      primitive.isStatic = true;
      expect(primitive.isStatic).toBe(true);
    });

    it("vertices and bounds", () => {
      expect(primitive.vertices).toEqual([
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ]);
      expect(primitive.getBounds()).toEqual({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
      });
    });

    it("change vertices and bounds when resize", () => {
      primitive.x = 200;
      primitive.y = 500;
      expect(primitive.vertices).toEqual([
        { x: 200, y: 500 },
        { x: 300, y: 500 },
        { x: 300, y: 600 },
        { x: 200, y: 600 },
      ]);

      expect(primitive.getBounds()).toEqual({
        left: 200,
        top: 500,
        right: 300,
        bottom: 600,
      });

      primitive.width = 200;
      primitive.height = 300;
      expect(primitive.vertices).toEqual([
        { x: 200, y: 500 },
        { x: 400, y: 500 },
        { x: 400, y: 800 },
        { x: 200, y: 800 },
      ]);

      expect(primitive.getBounds()).toEqual({
        left: 200,
        top: 500,
        right: 400,
        bottom: 800,
      });
    });

    it.skip("rotate vertices from center pivot", () => {
      primitive.rotate = Math.PI / 4;
      expect(primitive.rotate).toBe(Math.PI / 4);
      // Check vertices with 3 decimal places precision
      expect(
        primitive.vertices.map((v) => ({
          x: parseFloat(v.x.toFixed(3)),
          y: parseFloat(v.y.toFixed(3)),
        }))
      ).toEqual([
        { x: 50.0, y: -20.711 },
        { x: 120.711, y: 50.0 },
        { x: 50.0, y: 120.711 },
        { x: -20.711, y: 50.0 },
      ]);
    });

    it("pivot ratio persist when position, size changed", () => {
      expect(primitive.pivot).toEqual({ x: 50, y: 50 });
      primitive.x += 50;
      primitive.y += 50;
      expect(primitive.pivot).toEqual({ x: 100, y: 100 });

      primitive.width = 200;
      primitive.height = 200;
      expect(primitive.pivot).toEqual({ x: 150, y: 150 });
    });

    it("getCenterPoint() always return center of shape", () => {
      expect(primitive.getCenter()).toEqual({ x: 50, y: 50 });

      primitive.x += 50;
      primitive.y += 50;
      expect(primitive.getCenter()).toEqual({ x: 100, y: 100 });

      primitive.width = 200;
      primitive.height = 200;
      expect(primitive.getCenter()).toEqual({ x: 150, y: 150 });
    });

    //TODO: only dispatch event when mutate with `TransformHelper`
    // it("dispatch `redraw` event to parent when resize, rotate, move", () => {
    //   const parent = new Group();
    //   parent.addChild(primitive);
    //   const redrawListener = vi.fn();
    //   parent.on("redraw", redrawListener);
    //   primitive.x = 100;
    //   primitive.y = 100;
    //   primitive.width = 200;
    //   primitive.height = 200;
    //   primitive.rotate = Math.PI / 4;
    //   expect(redrawListener).toHaveBeenCalledTimes(5);
    // });
  });
});
