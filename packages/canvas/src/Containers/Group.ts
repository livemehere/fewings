import { CNode } from "../Core/CNode";
import { Bounds, ModelTypeMap, TModelType } from "../types";
import { Container, TContainerProps } from "./Container";

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  constructor(props?: TContainerProps) {
    super(props);
  }

  override get x(): number {
    return this.getBounds().left;
  }

  override get y(): number {
    return this.getBounds().top;
  }

  override get width(): number {
    const bounds = this.getBounds();
    return bounds.right - bounds.left;
  }

  override get height(): number {
    const bounds = this.getBounds();
    return bounds.bottom - bounds.top;
  }

  override set x(x: number) {
    const deltaX = x - this.x;
    this.children.forEach((child) => {
      child.x += deltaX;
    });
  }

  override set y(y: number) {
    const deltaY = y - this.y;
    this.children.forEach((child) => {
      child.y += deltaY;
    });
  }

  override set width(width: number) {
    const currentWidth = this.width;
    const deltaWidth = width - currentWidth;

    if (currentWidth === 0 || deltaWidth === 0) return;

    const scale = width / currentWidth;
    const bounds = this.getBounds();
    const centerX = bounds.left + bounds.right / 2;

    this.children.forEach((child) => {
      // 중심으로부터의 거리를 비율에 맞게 조정
      const childDistanceFromCenter = child.x - centerX;
      const scaledDistance = childDistanceFromCenter * scale;

      // 너비 조정
      child.width *= scale;

      // 위치 조정 (중심점 기준으로 비율에 맞게)
      child.x = centerX + scaledDistance;
    });
  }

  override set height(height: number) {
    const currentHeight = this.height;
    const deltaHeight = height - currentHeight;

    if (currentHeight === 0 || deltaHeight === 0) return;

    const scale = height / currentHeight;
    const bounds = this.getBounds();
    const centerY = bounds.top + bounds.bottom / 2;

    this.children.forEach((child) => {
      const childDistanceFromCenter = child.y - centerY;
      const scaledDistance = childDistanceFromCenter * scale;

      // 높이 조정
      child.height *= scale;

      // 위치 조정 (중심점 기준으로 비율에 맞게)
      child.y = centerY + scaledDistance;
    });
  }

  override getBounds(): Bounds {
    if (this.children.length === 0)
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.children.forEach((node) => {
      const bounds = node.getBounds();
      if (bounds.left < minX) minX = bounds.left;
      if (bounds.top < minY) minY = bounds.top;
      if (bounds.right > maxX) maxX = bounds.right;
      if (bounds.bottom > maxY) maxY = bounds.bottom;
    });

    return {
      left: minX,
      top: minY,
      right: maxX,
      bottom: maxY,
    };
  }

  override _render(ctx: CanvasRenderingContext2D): void {
    this.renderChildren(ctx);
  }

  override _hitMapRender(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    const bounds = this.getBounds();
    this.setupHitRender(ctx);
    ctx.moveTo(bounds.left, bounds.top);
    ctx.lineTo(bounds.right, bounds.top);
    ctx.lineTo(bounds.right, bounds.bottom);
    ctx.lineTo(bounds.left, bounds.bottom);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    this.hitMapRenderChildren(ctx);
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

  override clone(): Group {
    throw new Error("Method not implemented.");
  }

  override getGlobalBounds(): Bounds {
    throw new Error("Method not implemented.");
  }

  override toJSON(): string {
    throw new Error("Method not implemented.");
  }

  override fromJSON(json: string): CNode {
    throw new Error("Method not implemented.");
  }
}
