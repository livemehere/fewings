import { IShape } from "../types";
import { CNode } from "../CNode";
import { DrawAttrs, IDrawAttrsProps } from "../DrawAttrs";
import { Bounds, IBoundsProps } from "../Bounds";
import { Container } from "../Containers/Container";

export interface IShapeProps {
  bounds?: IBoundsProps;
  attrs?: IDrawAttrsProps;
  visible?: boolean;
  parent?: Container | null;
}

export abstract class Shape extends CNode implements IShape {
  readonly attrs: DrawAttrs;
  readonly bounds: Bounds;
  rotate: number;

  constructor({ visible, parent, bounds, attrs }: IShapeProps) {
    super();
    this.bounds = new Bounds(bounds);
    this.attrs = new DrawAttrs(attrs);
    this.visible = visible ?? true;
    this.parent = parent ?? null;
    this.rotate = 0;
  }

  override get x(): number {
    return this.bounds.x;
  }

  override get y(): number {
    return this.bounds.y;
  }

  override set x(x: number) {
    this.bounds.x = x;
  }

  override set y(y: number) {
    this.bounds.y = y;
  }

  override get width(): number {
    return this.bounds.width;
  }

  override get height(): number {
    return this.bounds.height;
  }

  override getBounds(): Bounds {
    return this.bounds;
  }

  abstract drawPath(
    ctx: CanvasRenderingContext2D,
    bounds: Bounds,
    attrs: DrawAttrs
  ): void;

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderRoutine(
      ctx,
      () => {
        this.drawPath(ctx, this.bounds, this.attrs);
      },
      this.bounds,
      this.attrs
    );
  }

  override hitMapRender(ctx: CanvasRenderingContext2D): void {
    const hitMapAttrs = {
      ...this.attrs,
      fillStyle: this.id,
      strokeStyle: this.id,
      opacity: 1,
    };
    this.renderRoutine(
      ctx,
      () => {
        this.drawPath(ctx, this.bounds, hitMapAttrs);
      },
      this.bounds,
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
