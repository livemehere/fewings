import { CNode, TNodeProps } from "../Core/CNode";
import { Bounds, IPoint, ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

export type TFrameProps = TNodeProps & {
  overflowClip?: boolean;
};

export class Frame extends Container {
  readonly type: TModelType = ModelTypeMap.FRAME;
  overflowClip: boolean;
  rotate: number;
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(props?: TFrameProps) {
    super({ debug: props?.debug ?? false });
    this.overflowClip = props?.overflowClip ?? true;
    this.rotate = 0;
    this._x = props?.x ?? 0;
    this._y = props?.y ?? 0;
    this._width = props?.width ?? 0;
    this._height = props?.height ?? 0;
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
      left: this._x,
      top: this._y,
      right: this._x + this._width,
      bottom: this._y + this._height,
    };
  }

  // TODO: implement render bound and clipping
  _render(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;
    ctx.beginPath();
    this.setupRender(ctx);
    const bounds = this.getBounds();
    ctx.rect(
      bounds.left,
      bounds.top,
      bounds.right - bounds.left,
      bounds.bottom - bounds.top,
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    this.renderChildren(ctx);
  }

  _hitMapRender(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    const bounds = this.getBounds();
    ctx.rect(
      bounds.left,
      bounds.top,
      bounds.right - bounds.left,
      bounds.bottom - bounds.top,
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    this.hitMapRenderChildren(ctx);
  }

  toJSON(): string {
    throw new Error("Method not implemented.");
  }
  fromJSON(json: string): CNode {
    throw new Error("Method not implemented.");
  }
  clone(): CNode {
    throw new Error("Method not implemented.");
  }
  getGlobalBounds(): Bounds {
    throw new Error("Method not implemented.");
  }
}
