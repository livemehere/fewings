import { Bounds, IShape } from "../types";
import { CNode, ICNodeProps } from "../CNode";
import { DrawAttrs, IDrawAttrsProps } from "../DrawAttrs";
import { Container } from "../Containers/Container";

export interface IShapeProps extends ICNodeProps, Bounds {
  attrs?: IDrawAttrsProps;
  visible?: boolean;
  parent?: Container | null;
  rotate?: number;
}

export abstract class Shape extends CNode implements IShape {
  readonly attrs: DrawAttrs;
  protected _x: number;
  protected _y: number;
  protected _width: number;
  protected _height: number;
  protected _rotate: number;

  constructor({
    visible,
    parent,
    x,
    y,
    width,
    height,
    attrs,
    debug,
    rotate,
  }: IShapeProps) {
    super({ debug });
    this._x = x ?? 0;
    this._y = y ?? 0;
    this._width = width ?? 100;
    this._height = height ?? 100;
    this.attrs = new DrawAttrs(attrs);
    this.visible = visible ?? true;
    this.parent = parent ?? null;
    this._rotate = rotate ?? 0;
  }

  override get x(): number {
    return this._x;
  }

  override get y(): number {
    return this._y;
  }

  override set x(x: number) {
    this._x = x;
  }

  override set y(y: number) {
    this._y = y;
  }

  override get width(): number {
    return this._width;
  }

  override get height(): number {
    return this._height;
  }

  override set width(width: number) {
    this._width = width;
  }

  override set height(height: number) {
    this._height = height;
  }

  override get rotate(): number {
    return this._rotate;
  }

  override set rotate(rotate: number) {
    this._rotate = rotate;
  }

  override getBounds(): Bounds {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
    };
  }

  abstract drawPath(
    ctx: CanvasRenderingContext2D,
    bounds: Bounds,
    attrs: DrawAttrs
  ): void;

  protected override drawDebug(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.strokeRect(this._x, this._y, this._width, this._height);

    const gap = this._width / 2;
    const yGap = this._height / 3;
    const fontSize = this._height / 3;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(this.id, this._x + this._width + gap, this._y);
    ctx.fillText(
      `x: ${this._x.toFixed(2)}`,
      this._x + this._width + gap,
      this._y + yGap
    );
    ctx.fillText(
      `y: ${this._y.toFixed(2)}`,
      this._x + this._width + gap,
      this._y + yGap * 2
    );
    ctx.fillText(
      `w: ${this._width.toFixed(2)}`,
      this._x + this._width + gap,
      this._y + yGap * 3
    );
    ctx.fillText(
      `h: ${this._height.toFixed(2)}`,
      this._x + this._width + gap,
      this._y + yGap * 4
    );
    ctx.fillText(
      `rotate: ${this.rotate.toFixed(2)}`,
      this._x + this._width + gap,
      this._y + yGap * 5
    );
    ctx.restore();
  }

  override render(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    this.renderRoutine(
      ctx,
      () => {
        this.drawPath(ctx, bounds, this.attrs);
      },
      bounds,
      this.attrs
    );
    if (this.debug) {
      this.drawDebug(ctx);
    }
  }

  override hitMapRender(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    const hitMapAttrs = {
      ...this.attrs,
      fillStyle: this.id,
      strokeStyle: this.id,
      opacity: 1,
    };
    this.renderRoutine(
      ctx,
      () => {
        this.drawPath(ctx, bounds, hitMapAttrs);
      },
      bounds,
      hitMapAttrs
    );
  }

  protected renderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void,
    bounds: Bounds,
    attrs: DrawAttrs
  ): void {
    ctx.save();
    // Apply opacity
    if (attrs.opacity !== undefined) {
      ctx.globalAlpha = attrs.opacity;
    }

    // Apply shadows
    if (attrs.shadowColor) {
      ctx.shadowColor = attrs.shadowColor;
      ctx.shadowBlur = attrs.shadowBlur || 0;
      ctx.shadowOffsetX = attrs.shadowOffsetX || 0;
      ctx.shadowOffsetY = attrs.shadowOffsetY || 0;
    }

    // Apply transforms
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;

    // Handle rotation
    if (this.rotate !== undefined) {
      ctx.translate(centerX, centerY);
      ctx.rotate(this.rotate % (Math.PI * 2)); // for performance restrict to 2pi
      ctx.translate(-centerX, -centerY);
    }

    ctx.lineDashOffset = attrs.lineDashOffset || 0;
    ctx.setLineDash(attrs.lineDash || []);

    // Handle fill
    if (attrs.fillStyle) {
      ctx.fillStyle = attrs.fillStyle;
    }

    // Handle stroke
    if (attrs.strokeStyle) {
      ctx.strokeStyle = attrs.strokeStyle;
      if (attrs.strokeWidth !== undefined) {
        ctx.lineWidth = attrs.strokeWidth;
      }
    }

    renderCallback();

    ctx.restore();
  }
}
