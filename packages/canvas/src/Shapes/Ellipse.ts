import { IShapeProps, Shape } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";

export class Ellipse extends Shape {
  readonly type: TModelType = ModelTypeMap.ELLIPSE;
  constructor(props: IShapeProps) {
    super(props);
  }
  override createVertices(): IPoint[] {
    console.warn("Ellipse does not support createVertices");
    return [];
  }
  drawPath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 2,
      this.height / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
