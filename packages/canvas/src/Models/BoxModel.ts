import { IDrawOptions, TStrokeStyle, TFillStyle, IBoxModel } from "../types";

export class BoxModel implements IBoxModel {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle?: TFillStyle;
  strokeStyle?: TStrokeStyle;
  strokeWidth?: number;

  // transform
  rotate?: number;
  scaleX?: number;
  scaleY?: number;

  // opacity
  opacity?: number;

  // shadow
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;

  // line dash
  lineDash?: number[];
  lineDashOffset?: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    drawOptions?: Partial<IDrawOptions>
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillStyle = drawOptions?.fillStyle;
    this.strokeStyle = drawOptions?.strokeStyle;
    this.strokeWidth = drawOptions?.strokeWidth;
    this.rotate = drawOptions?.rotate;
    this.scaleX = drawOptions?.scaleX;
    this.scaleY = drawOptions?.scaleY;
    this.opacity = drawOptions?.opacity;
    this.shadowColor = drawOptions?.shadowColor;
    this.shadowBlur = drawOptions?.shadowBlur;
    this.shadowOffsetX = drawOptions?.shadowOffsetX;
    this.shadowOffsetY = drawOptions?.shadowOffsetY;
    this.lineDash = drawOptions?.lineDash;
    this.lineDashOffset = drawOptions?.lineDashOffset;
  }
}
