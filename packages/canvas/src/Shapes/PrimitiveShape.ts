import { IPoint } from "../types";

import { IShapeProps } from "./Shape";

import { TModelType } from "../types";

import { ModelTypeMap } from "../types";
import { Shape } from "./Shape";

export class PrimitiveShape extends Shape {
  readonly type: TModelType = ModelTypeMap.PRIMITIVE;
  constructor(props: IShapeProps) {
    super(props);
  }

  override createVertices(
    x: number,
    y: number,
    width: number,
    height: number
  ): IPoint[] {
    return [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height },
    ];
  }

  override drawPath(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }
}
