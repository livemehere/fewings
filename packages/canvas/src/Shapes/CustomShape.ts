import { IShapeProps, Shape } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";

export interface ICustomShapeProps extends IShapeProps {
  drawPath: (ctx: CanvasRenderingContext2D) => void;
}

export class CustomShape extends Shape {
  readonly type: TModelType = ModelTypeMap.CUSTOM;
  drawPath: (ctx: CanvasRenderingContext2D) => void;

  constructor(props: ICustomShapeProps) {
    super(props);
    this.drawPath = props.drawPath;
  }

  override createVertices(): IPoint[] {
    return [];
  }
}
