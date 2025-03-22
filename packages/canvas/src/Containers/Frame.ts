import { ICNodeProps } from "../Core/CNode";
import { Bounds, IPoint, ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

export interface IFrameProps extends ICNodeProps {
  overflowClip?: boolean;
  rotate?: number;
}

export class Frame extends Container {
  readonly type: TModelType = ModelTypeMap.FRAME;
  overflowClip: boolean;
  rotate: number;
  _x: number;
  _y: number;
  _width: number;
  _height: number;
  _rotate: number;

  constructor(props?: IFrameProps) {
    super({ debug: props?.debug ?? false });
    this.overflowClip = props?.overflowClip ?? true;
    this.rotate = 0;
    this._x = props?.x ?? 0;
    this._y = props?.y ?? 0;
    this._width = props?.width ?? 0;
    this._height = props?.height ?? 0;
    this._rotate = props?.rotate ?? 0;
  }

  override get x(): number {
    return this._x;
  }

  override get y(): number {
    return this._y;
  }

  override get width(): number {
    return this._width;
  }

  override get height(): number {
    return this._height;
  }

  override set x(x: number) {
    this._x = x;
  }

  override set y(y: number) {
    this._y = y;
  }

  override set width(width: number) {
    this._width = width;
  }

  override set height(height: number) {
    this._height = height;
  }

  override getBounds(): Bounds {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
    };
  }

  // TODO: implement render bound and clipping
  render(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.render(ctx);
    });
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.hitMapRender(ctx);
    });
  }

  protected debugRender(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this._x, this._y);
    ctx.rotate(this._rotate);
    ctx.fillRect(0, 0, this._width, this._height);
    ctx.restore();
  }
}
