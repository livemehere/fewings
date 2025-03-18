import { ICNodeProps } from "../CNode";
import { Bounds, ModelTypeMap, Point, TModelType } from "../types";
import { Container } from "./Container";

interface IGroupProps extends ICNodeProps {
  renderBounds?: boolean;
  rotate?: number;
}

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  renderBounds: boolean;
  private _rotate: number;
  constructor(props: IGroupProps = { debug: false }) {
    super(props);
    this.renderBounds = props?.renderBounds ?? false;
    this._rotate = props?.rotate ?? 0;
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
    throw new Error("Group does not support set x");
  }

  override set y(y: number) {
    throw new Error("Group does not support set y");
  }

  override set width(width: number) {
    //TODO: increase each of children's width 현재 비율을 유지하면서
  }

  override set height(height: number) {
    //TODO: increase each of children's height 현재 비율을 유지하면서
  }

  override get rotate(): number {
    return this._rotate;
  }

  override set rotate(angle: number) {
    this._rotate = angle;
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

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  override drawDebug(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    // fill text each position
    const gap = bounds.height / 15;
    const fontSize = bounds.height / 15;
    const baseX = bounds.x + bounds.width;
    const baseY = bounds.y;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "black";
    ctx.fillText(this.id, baseX, baseY);
    ctx.fillText(`x: ${bounds.x.toFixed(2)}`, baseX, baseY + gap);
    ctx.fillText(`y: ${bounds.y.toFixed(2)}`, baseX, baseY + gap * 2);
    ctx.fillText(`w: ${bounds.width.toFixed(2)}`, baseX, baseY + gap * 3);
    ctx.fillText(`h: ${bounds.height.toFixed(2)}`, baseX, baseY + gap * 4);
    ctx.fillText(`rotate: ${this._rotate.toFixed(2)}`, baseX, baseY + gap * 5);
    ctx.restore();
  }

  renderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void
  ): void {
    ctx.save();
    const bounds = this.getBounds();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(this._rotate);
    ctx.translate(-centerX, -centerY);
    renderCallback();
    ctx.restore();
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

    if (this.debug) {
      this.drawDebug(ctx);
    }
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.renderRoutine(ctx, () => {
      this.hitMapDrawBounds(ctx);
      this.children.forEach((shape) => {
        shape.hitMapRender(ctx);
      });
    });
  }

  protected drawBounds(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  protected hitMapDrawBounds(ctx: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    ctx.beginPath();
    ctx.fillStyle = this.id;
    ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  addX(x: number): void {
    this.children.forEach((child) => {
      child.x += x;
    });
  }

  addY(y: number): void {
    this.children.forEach((child) => {
      child.y += y;
    });
  }
}
