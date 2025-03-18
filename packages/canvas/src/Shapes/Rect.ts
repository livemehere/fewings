import { Shape, IShapeProps } from "./Shape";
import { Bounds, ModelTypeMap, TModelType } from "../types";
import { DrawAttrs } from "../DrawAttrs";

export class Rect extends Shape {
  readonly type: TModelType = ModelTypeMap.RECT;
  constructor(props: IShapeProps) {
    super(props);
  }
  drawPath(ctx: CanvasRenderingContext2D, bounds: Bounds, attrs: DrawAttrs) {
    ctx.beginPath();
    if (attrs.round !== undefined) {
      ctx.roundRect(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height,
        attrs.round
      );
    } else {
      ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    }
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
