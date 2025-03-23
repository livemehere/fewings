import { ICNodeProps } from "../Core/CNode";
import { Bounds, ModelTypeMap } from "../types";
import { TModelType } from "../types";
import { Container } from "./Container";

export class PrimitiveContainer extends Container {
  readonly type: TModelType = ModelTypeMap.CONTAINER;
  constructor(props: ICNodeProps) {
    super(props);
  }

  get x(): number {
    return 0;
  }

  get y(): number {
    return 0;
  }

  get width(): number {
    return 0;
  }

  get height(): number {
    return 0;
  }

  get rotate(): number {
    return 0;
  }

  set rotate(value: number) {
    this.rotate = value;
  }

  render(ctx: CanvasRenderingContext2D): void {}
  hitMapRender(ctx: CanvasRenderingContext2D): void {}
  debugRender(ctx: CanvasRenderingContext2D): void {}
  getBounds(): Bounds {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
  }
}
