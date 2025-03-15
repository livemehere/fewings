import { Shape, TPrimitiveShapeProps } from ".";
import { Renderer } from "../Renderers";
import { IBoxModel, ModelTypeMap, TModelType } from "../types";

export class RectShape extends Shape {
  type: TModelType = ModelTypeMap.RECT;
  constructor(props: TPrimitiveShapeProps) {
    const renderer = new RectRenderer();
    super({ ...props, renderer });
  }
}

class RectRenderer extends Renderer {
  drawPath(ctx: CanvasRenderingContext2D, model: IBoxModel): void {
    ctx.beginPath();
    ctx.rect(model.x, model.y, model.width, model.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
