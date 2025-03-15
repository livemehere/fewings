export const ModelTypeMap = {
  CUSTOM: "custom",
  RECT: "rect",
  ELLIPSE: "ellipse",
} as const;
export type TModelType = (typeof ModelTypeMap)[keyof typeof ModelTypeMap];
export type TFillStyle = string | CanvasGradient | CanvasPattern;
export type TStrokeStyle = string | CanvasGradient | CanvasPattern;
export interface IDrawOptions {
  fillStyle?: TFillStyle;
  strokeStyle?: TStrokeStyle;
  strokeWidth?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  /**
   * @description match to order of edges
   * @example RectShape [topLeft, topRight, bottomRight, bottomLeft]
   * @example PolygonShape [first edge, second edge, third edge, fourth edge...]
   */
  round?: number[];
}

export interface IBoxModel extends IDrawOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IRenderer {
  render(ctx: CanvasRenderingContext2D, model: IBoxModel): void;
  renderRoutine(
    ctx: CanvasRenderingContext2D,
    model: IBoxModel,
    renderCallback: () => void
  ): void;
}

export interface IShape {
  id: string;
  type: TModelType;
  model: IBoxModel;
  renderer: IRenderer;
  tags: Set<string>;
  render(context: CanvasRenderingContext2D): void;
}
