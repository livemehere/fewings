import { IShapeProps, Shape } from "./Shape";
import { ModelTypeMap, TModelType } from "../types";
import { DrawAttrs } from "../DrawAttrs";
import { Bounds } from "../Bounds";

export interface ICustomShapeProps extends IShapeProps {
  drawPath: (
    ctx: CanvasRenderingContext2D,
    bounds: Bounds,
    attrs: DrawAttrs
  ) => void;
}

export class CustomShape<T extends Record<any, any>> extends Shape {
  readonly type: TModelType = ModelTypeMap.CUSTOM;
  drawPath: (
    ctx: CanvasRenderingContext2D,
    bounds: Bounds,
    attrs: DrawAttrs
  ) => void;

  constructor(props: ICustomShapeProps) {
    super(props);
    this.drawPath = props.drawPath;
  }
}
