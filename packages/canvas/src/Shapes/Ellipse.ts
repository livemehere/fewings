import { IShapeProps, Shape } from "./Shape";
import { Bounds, ModelTypeMap, TModelType } from "../types";
import { DrawAttrs } from "../DrawAttrs";

export class Ellipse extends Shape {
  readonly type: TModelType = ModelTypeMap.ELLIPSE;
  constructor(props: IShapeProps) {
    super(props);
  }
  drawPath(ctx: CanvasRenderingContext2D, bounds: Bounds, attrs: DrawAttrs) {
    ctx.beginPath();
    ctx.ellipse(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
      bounds.width / 2,
      bounds.height / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
