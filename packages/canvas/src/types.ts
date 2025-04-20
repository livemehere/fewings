import { Container } from './Containers/Container';

export const ModelTypeMap = {
  PRIMITIVE: 'primitive',
  CONTAINER: 'container',
  FRAME: 'frame',
  GROUP: 'group',
  CUSTOM: 'custom',
  RECT: 'rect',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  TEXT: 'text',
  IMAGE: 'image',
  LINE: 'line',
} as const;

export type TModelType = (typeof ModelTypeMap)[keyof typeof ModelTypeMap];
// FIXME: change to pure object interface
export type TFillStyle = string | CanvasGradient | CanvasPattern;
export type TStrokeStyle = string | CanvasGradient | CanvasPattern;

export interface IPoint {
  x: number;
  y: number;
}

export interface IBox {
  width: number;
  height: number;
}

export type Bounds = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export interface IDrawAttrs {
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
   * @description match to length of vertices
   * @example RectShape [topLeft, topRight, bottomRight, bottomLeft]
   * @example PolygonShape [first edge, second edge, third edge, fourth edge...]
   */
  round?: number[];
}

export interface IShape extends ICNode {
  vertices: IPoint[];
}

export interface IContainer extends ICNode {
  children: ICNode[];
}

export interface ICNode extends IDrawAttrs, IPoint, IBox {
  id: string;
  type: TModelType;
  parent: Container | null;
  visible: boolean;
  isStatic: boolean;
  debug: boolean;
  tags: Set<string>;
  rotate: number;
}
