import { Bounds } from "./Bounds";
import { DrawAttrs } from "./DrawAttrs";

export const ModelTypeMap = {
  FRAME: "frame",
  GROUP: "group",
  CUSTOM: "custom",
  RECT: "rect",
  ELLIPSE: "ellipse",
} as const;
export type TModelType = (typeof ModelTypeMap)[keyof typeof ModelTypeMap];
export type TFillStyle = string | CanvasGradient | CanvasPattern;
export type TStrokeStyle = string | CanvasGradient | CanvasPattern;

export interface Point {
  x: number;
  y: number;
}

export interface Box {
  width: number;
  height: number;
}

export interface IRenderer {
  render(ctx: CanvasRenderingContext2D, bounds: Bounds): void;
}

export interface IHitMapRenderer {
  hitMapRender(ctx: CanvasRenderingContext2D, bounds: Bounds): void;
}

export interface IShape {
  drawPath(
    ctx: CanvasRenderingContext2D,
    bounds: Bounds,
    attrs: DrawAttrs
  ): void;
}
