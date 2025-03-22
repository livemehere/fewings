import { ICNodeProps } from "../Core/CNode";
import { MathHelper } from "../Helpers/MathHelper";
import { Shape } from "../Shapes/Shape";
import { Bounds, ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

interface IGroupProps extends ICNodeProps {
  showBounds?: boolean;
}

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  renderBounds: boolean;
  constructor(props: IGroupProps = { debug: false, showBounds: false }) {
    super(props);
    this.renderBounds = props?.showBounds ?? false;
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
    const deltaX = x - this.x;
    this.children.forEach((child) => {
      child.x += deltaX;
    });
    this.pivot.x += deltaX;
  }

  override set y(y: number) {
    const deltaY = y - this.y;
    this.children.forEach((child) => {
      child.y += deltaY;
    });
    this.pivot.y += deltaY;
  }

  override set width(width: number) {
    const currentWidth = this.width;
    const deltaWidth = width - currentWidth;

    if (currentWidth === 0 || deltaWidth === 0) return;

    const scale = width / currentWidth;
    const bounds = this.getBounds();
    const centerX = bounds.x + bounds.width / 2;

    this.children.forEach((child) => {
      // 중심으로부터의 거리를 비율에 맞게 조정
      const childDistanceFromCenter = child.x - centerX;
      const scaledDistance = childDistanceFromCenter * scale;

      // 너비 조정
      child.width *= scale;

      // 위치 조정 (중심점 기준으로 비율에 맞게)
      child.x = centerX + scaledDistance;
    });
    this.pivot.x += deltaWidth / 2;
  }

  override set height(height: number) {
    //TODO: increase each of children's height 현재 비율을 유지하면서
  }

  override get rotate(): number {
    return this._rotate;
  }

  override set rotate(angle: number) {
    const prevRotate = this._rotate;
    this._rotate = angle;
    const deltaRotate = angle - prevRotate;

    this.children.forEach((child) => {
      if (child instanceof Shape) {
        child.vertices = MathHelper.rotateMatrix(
          child.vertices,
          deltaRotate,
          this.pivot
        );
      } else {
        child.rotate += deltaRotate;
      }
    });
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

  override debugRender(ctx: CanvasRenderingContext2D): void {
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

  render(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((shape) => {
      shape.render(ctx);
    });
    if (this.renderBounds) {
      this.drawBounds(ctx);
    }

    if (this.debug) {
      this.debugRender(ctx);
    }
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.hitMapDrawBounds(ctx);
    this.children.forEach((shape) => {
      shape.hitMapRender(ctx);
    });
  }

  private drawBoundsVerticesPath(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
  }

  protected drawBounds(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.drawBoundsVerticesPath(ctx);
    ctx.stroke();
    ctx.restore();
  }

  protected hitMapDrawBounds(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.drawBoundsVerticesPath(ctx);
    ctx.fillStyle = this.id;
    ctx.fill();
    ctx.restore();
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
