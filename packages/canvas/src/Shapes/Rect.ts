import { Shape, IShapeProps } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";

export class Rect extends Shape {
  readonly type: TModelType = ModelTypeMap.RECT;

  constructor(props: IShapeProps) {
    super(props);
  }

  override createVertices(
    x: number,
    y: number,
    width: number,
    height: number,
  ): IPoint[] {
    return [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height },
    ];
  }

  drawPath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // FIXME: implement round
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
