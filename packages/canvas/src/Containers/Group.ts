import { Bounds } from "../Bounds";
import { ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

interface IGroupProps {
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
  x?: number;
  y?: number;
  renderBounds?: boolean;
}

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  rotate: number;
  scaleX: number;
  scaleY: number;
  renderBounds: boolean;

  constructor(props?: IGroupProps) {
    super(props?.x, props?.y);
    this.rotate = props?.rotate ?? 0;
    this.scaleX = props?.scaleX ?? 1;
    this.scaleY = props?.scaleY ?? 1;
    this.renderBounds = props?.renderBounds ?? false;
  }

  // TODO: need to optimize
  override getBounds(): Bounds {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.children.forEach((node) => {
      const bounds = node.getBounds();
      if (bounds.x < minX) minX = bounds.x;
      if (bounds.y < minY) minY = bounds.y;
      if (bounds.x + bounds.width > maxX) maxX = bounds.x + bounds.width;
      if (bounds.y + bounds.height > maxY) maxY = bounds.y + bounds.height;
    });

    return new Bounds({
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.renderRoutine(ctx, () => {
      this.children.forEach((shape) => {
        shape.render(ctx);
      });
      if (this.renderBounds) {
        this.drawBounds(ctx);
      }
    });
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.renderRoutine(ctx, () => {
      this.hitMapDrawBounds(ctx);
      this.children.forEach((shape) => {
        shape.hitMapRender(ctx);
      });
    });
  }

  protected renderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void
  ): void {
    const bounds = this.getBounds();
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotate);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.translate(-centerX + this.x, -centerY + this.y);
    renderCallback();
    ctx.restore();
  }

  protected drawBounds(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    ctx.strokeStyle = "red";
    ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  protected hitMapDrawBounds(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    ctx.beginPath();
    ctx.fillStyle = this.id;
    ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }
}
