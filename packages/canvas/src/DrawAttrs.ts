import { TStrokeStyle } from "./types";

import { TFillStyle } from "./types";

export interface IDrawAttrsProps {
  fillStyle?: TFillStyle;
  strokeStyle?: TStrokeStyle;
  strokeWidth?: number;
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

export class DrawAttrs {
  fillStyle: TFillStyle;
  strokeStyle: TStrokeStyle;
  strokeWidth: number;
  opacity: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  lineDash: number[];
  lineDashOffset: number;
  round: number[];

  constructor(props?: IDrawAttrsProps) {
    this.fillStyle = props?.fillStyle ?? "black";
    this.strokeStyle = props?.strokeStyle ?? "black";
    this.strokeWidth = props?.strokeWidth ?? 1;
    this.opacity = props?.opacity ?? 1;
    this.shadowColor = props?.shadowColor ?? "black";
    this.shadowBlur = props?.shadowBlur ?? 0;
    this.shadowOffsetX = props?.shadowOffsetX ?? 0;
    this.shadowOffsetY = props?.shadowOffsetY ?? 0;
    this.lineDash = props?.lineDash ?? [];
    this.lineDashOffset = props?.lineDashOffset ?? 0;
    this.round = props?.round ?? [];
  }
}
