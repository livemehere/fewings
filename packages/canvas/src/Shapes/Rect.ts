import { Shape, TShapeProps } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";
import { VerticesHelper } from "../Helpers/VerticesHelper";

export class Rect extends Shape {
  readonly type: TModelType = ModelTypeMap.RECT;

  constructor(props: TShapeProps) {
    super(props);
  }

  override createVertices(
    x: number,
    y: number,
    width: number,
    height: number
  ): IPoint[] {
    return VerticesHelper.createBoxVertices(x, y, width, height);
  }

  private drawPath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // FIXME: implement round
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  _render(ctx: CanvasRenderingContext2D) {
    this.setupRender(ctx);
    this.drawPath(ctx);
  }

  _hitMapRender(ctx: CanvasRenderingContext2D) {
    this.setupHitRender(ctx);
    this.drawPath(ctx);
  }
}
