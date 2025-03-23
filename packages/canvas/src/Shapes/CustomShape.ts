import { TShapeProps, Shape } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";
import { VerticesHelper } from "../Helpers/VerticesHelper";

export type TCustomShapeProps = TShapeProps & {
  render: (ctx: CanvasRenderingContext2D) => void;
  hitMapRender: (ctx: CanvasRenderingContext2D) => void;
};

export class CustomShape extends Shape {
  render: (ctx: CanvasRenderingContext2D) => void;
  hitMapRender: (ctx: CanvasRenderingContext2D) => void;

  _render(ctx: CanvasRenderingContext2D) {
    this.render(ctx);
  }
  _hitMapRender(ctx: CanvasRenderingContext2D) {
    this.hitMapRender(ctx);
  }

  readonly type: TModelType = ModelTypeMap.CUSTOM;

  constructor(props: TCustomShapeProps) {
    super(props);
    this.render = props.render;
    this.hitMapRender = props.hitMapRender;
  }

  override createVertices(
    x: number,
    y: number,
    width: number,
    height: number
  ): IPoint[] {
    return VerticesHelper.createBoxVertices(x, y, width, height);
  }
}
