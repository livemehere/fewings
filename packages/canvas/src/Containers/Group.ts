import { Bounds } from "../Bounds";
import { ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

interface IGroupProps {
  renderBounds?: boolean;
}

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  renderBounds: boolean;

  constructor(props?: IGroupProps) {
    super();
    this.renderBounds = props?.renderBounds ?? false;
  }

  override get x(): number {
    return this.getBounds().x;
  }

  override get y(): number {
    return this.getBounds().y;
  }

  override get width(): number {
    return this.getBounds().width;
  }

  override get height(): number {
    return this.getBounds().height;
  }

  override set x(x: number) {
    this.children.forEach((child) => {
      child.x = x;
    });
  }

  override set y(y: number) {
    this.children.forEach((child) => {
      child.y = y;
    });
  }

  override set width(width: number) {
    this.children.forEach((child) => {
      child.width = width;
    });
  }

  override set height(height: number) {
    this.children.forEach((child) => {
      child.height = height;
    });
  }

  override get rotate(): number {
    throw new Error("Group does not support rotate");
  }

  override set rotate(rotate: number) {
    //TODO: rotate all children from the center of the group (it need to rotate and repositioning)
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
    // const bounds = this.getBounds();
    // const centerX = bounds.width / 2;
    // const centerY = bounds.height / 2;
    // ctx.save();
    // ctx.translate(centerX, centerY);
    // ctx.rotate(this.rotate);
    // ctx.scale(this.scaleX, this.scaleY);
    // ctx.translate(-centerX + this.x, -centerY + this.y);
    renderCallback();
    // ctx.restore();
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
