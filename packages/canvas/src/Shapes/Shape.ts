import { Bounds, IBox, IPoint, IShape } from "../types";
import { CNode, ICNodeProps } from "../Core/CNode";
import { MathHelper } from "../Helpers/MathHelper";

export type IShapeProps = ICNodeProps & IPoint & IBox;

export abstract class Shape extends CNode implements IShape {
  vertices: IPoint[];

  constructor(props: IShapeProps) {
    super(props);
    this.vertices = this.createVertices(
      props.x,
      props.y,
      props.width,
      props.height
    );
  }

  abstract createVertices(
    x: number,
    y: number,
    width: number,
    height: number
  ): IPoint[];

  override get x(): number {
    return Math.min(...this.vertices.map((v) => v.x));
  }

  override get y(): number {
    return Math.min(...this.vertices.map((v) => v.y));
  }

  override set x(x: number) {
    const dx = x - this.x;
    this.vertices.forEach((v) => {
      v.x = v.x + dx;
    });
  }

  override set y(y: number) {
    const dy = y - this.y;
    this.vertices.forEach((v) => {
      v.y = v.y + dy;
    });
  }

  override get width(): number {
    return Math.max(...this.vertices.map((v) => v.x)) - this.x;
  }

  override get height(): number {
    return Math.max(...this.vertices.map((v) => v.y)) - this.y;
  }

  override set width(width: number) {
    const dw = width - this.width;
    const center = this.getCenter();

    this.vertices.forEach((v) => {
      if (v.x >= center.x) {
        v.x = v.x + dw;
      }
    });
  }

  override set height(height: number) {
    const dh = height - this.height;
    const center = this.getCenter();
    this.vertices.forEach((v) => {
      if (v.y >= center.y) {
        v.y = v.y + dh;
      }
    });
  }

  override getBounds(): Bounds {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
    };
  }

  abstract drawPath(ctx: CanvasRenderingContext2D): void;

  protected debugRender(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    const gap = this.width / 2;
    const yGap = this.height / 3;
    const fontSize = this.height / 3;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(this.id, this.x + this.width + gap, this.y);
    ctx.fillText(
      `x: ${this.x.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap
    );
    ctx.fillText(
      `y: ${this.y.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 2
    );
    ctx.fillText(
      `w: ${this.width.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 3
    );
    ctx.fillText(
      `h: ${this.height.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 4
    );
    ctx.fillText(
      `rotate: ${this.rotate.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 5
    );
    ctx.restore();
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderRoutine(ctx, () => {
      this.drawPath(ctx);
    });
    if (this.debug) {
      this.debugRender(ctx);
    }
  }

  override hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.hitRenderRoutine(ctx, () => {
      this.drawPath(ctx);
    });
  }

  protected renderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void
  ): void {
    ctx.save();
    // Apply opacity
    if (this.opacity !== undefined) {
      ctx.globalAlpha = this.opacity;
    }

    // Apply shadows
    if (this.shadowColor) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur || 0;
      ctx.shadowOffsetX = this.shadowOffsetX || 0;
      ctx.shadowOffsetY = this.shadowOffsetY || 0;
    }

    ctx.lineDashOffset = this.lineDashOffset || 0;
    ctx.setLineDash(this.lineDash);

    // Handle fill
    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
    }

    // Handle stroke
    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
      if (this.strokeWidth !== undefined) {
        ctx.lineWidth = this.strokeWidth;
      }
    }

    renderCallback();

    ctx.restore();
  }

  protected hitRenderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void
  ): void {
    ctx.save();
    ctx.fillStyle = this.id;
    ctx.strokeStyle = this.id;
    renderCallback();
    ctx.restore();
  }
}
