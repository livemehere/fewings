import { TShapeProps, Shape } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";

export class Ellipse extends Shape {
  readonly type: TModelType = ModelTypeMap.ELLIPSE;
  constructor(props: TShapeProps) {
    super(props);
    this.vertices = this.createVertices();
  }
  override createVertices(): IPoint[] {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const radiusX = this.width / 2;
    const radiusY = this.height / 2;

    return [
      {
        x: centerX + radiusX * Math.cos(0),
        y: centerY + radiusY * Math.sin(0),
      },
      {
        x: centerX + radiusX * Math.cos(Math.PI / 2),
        y: centerY + radiusY * Math.sin(Math.PI / 2),
      },
      {
        x: centerX + radiusX * Math.cos(Math.PI),
        y: centerY + radiusY * Math.sin(Math.PI),
      },
      {
        x: centerX + radiusX * Math.cos((3 * Math.PI) / 2),
        y: centerY + radiusY * Math.sin((3 * Math.PI) / 2),
      },
    ];
  }

  // FIXME: implement drawPath with vertices with bezier curve
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
    ctx.closePath();
  }
}
