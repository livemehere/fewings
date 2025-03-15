import { Shape, TPrimitiveShapeProps } from ".";
import { Renderer } from "../Renderers";
import { IBoxModel, ModelTypeMap, TModelType } from "../types";

export class EllipseShape extends Shape {
  type: TModelType = ModelTypeMap.ELLIPSE;
  constructor(props: TPrimitiveShapeProps) {
    const renderer = new EllipseRenderer();
    super({ ...props, renderer });
  }
}

class EllipseRenderer extends Renderer {
  drawPath(ctx: CanvasRenderingContext2D, model: IBoxModel): void {
    ctx.beginPath();
    ctx.ellipse(model.x, model.y, model.width, model.height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
