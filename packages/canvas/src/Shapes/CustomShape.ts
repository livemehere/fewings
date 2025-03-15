import { Shape, TPrimitiveShapeProps } from ".";
import { BoxModel } from "../Models/BoxModel";
import { Renderer } from "../Renderers";
import { ModelTypeMap, TModelType } from "../types";

export interface ICustomShapeProps<T extends Record<any, any>>
  extends TPrimitiveShapeProps {
  state?: T;
  drawPath: (
    this: CustomShape<T>,
    ctx: CanvasRenderingContext2D,
    model: BoxModel
  ) => void;
}

export class CustomShape<T extends Record<any, any>> extends Shape {
  readonly type: TModelType = ModelTypeMap.CUSTOM;
  state: T = {} as T;
  constructor(props: ICustomShapeProps<T>) {
    const renderer = new CustomRenderer<T>();

    super({ ...props, renderer });

    this.state = props.state || ({} as T);
    renderer.drawPath = props.drawPath.bind(this);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.renderer.render(ctx, this.model);
  }
}

/**
 * Specially `drawPath` is bind to `this` of `CustomShape` because it has custom state.
 */
class CustomRenderer<T extends Record<any, any>> extends Renderer {
  drawPath!: (
    this: CustomShape<T>,
    ctx: CanvasRenderingContext2D,
    model: BoxModel
  ) => void;
  constructor() {
    super();
  }
}
