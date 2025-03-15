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
  render(context: CanvasRenderingContext2D): void;
}

export interface IStage {
  shapes: IShape[];
  render(context: CanvasRenderingContext2D): void;
  addShape(shape: IShape): void;
  removeShape(shape: IShape): void;
  getShape(id: string): IShape | undefined;
  updateShape(shape: IShape): void;
  removeShape(shape: IShape): void;
}

export interface ICanvasApp {
  stage: IStage;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  render(): void;
}
