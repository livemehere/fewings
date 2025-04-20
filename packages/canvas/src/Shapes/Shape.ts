import { Bounds, IBox, IPoint, IShape } from '../types';
import { CNode, TNodeProps } from '../Core/CNode';

export type TShapeProps = TNodeProps & IPoint & IBox;

export abstract class Shape extends CNode implements IShape {
  vertices: IPoint[];

  constructor({ x, y, width, height, ...props }: TShapeProps) {
    super(props);
    this.vertices = this.createVertices(x, y, width, height);
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

  abstract _render(ctx: CanvasRenderingContext2D): void;
  abstract _hitMapRender(ctx: CanvasRenderingContext2D): void;

  override toJSON(): string {
    throw new Error('Method not implemented.');
  }
  override fromJSON(json: string): CNode {
    throw new Error('Method not implemented.');
  }
  override clone(): CNode {
    throw new Error('Method not implemented.');
  }
  override getGlobalBounds(): Bounds {
    throw new Error('Method not implemented.');
  }
}
