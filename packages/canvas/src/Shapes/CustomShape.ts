import { TShapeProps, Shape } from "./Shape";
import { IPoint, ModelTypeMap, TModelType } from "../types";

export type TCustomShapeProps = TShapeProps & {
  drawPath: (ctx: CanvasRenderingContext2D) => void;
  createVertices: (
    x: number,
    y: number,
    width: number,
    height: number
  ) => IPoint[];
};

export class CustomShape extends Shape {
  readonly type: TModelType = ModelTypeMap.CUSTOM;
  drawPath: (ctx: CanvasRenderingContext2D) => void;
  createVertices: (
    x: number,
    y: number,
    width: number,
    height: number
  ) => IPoint[];
  constructor(props: TCustomShapeProps) {
    super(props);
    this.drawPath = props.drawPath;
    this.createVertices = props.createVertices;
  }
}
