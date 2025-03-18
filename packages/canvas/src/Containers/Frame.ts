import { Bounds } from "../Bounds";
import { ModelTypeMap } from "../types";
import { TModelType } from "../types";
import { Container } from "./Container";

export interface IFrameProps {
  bounds: Bounds;
  overflowClip?: boolean;
}

export class Frame extends Container {
  readonly type: TModelType = ModelTypeMap.FRAME;
  bounds: Bounds;
  overflowClip: boolean;
  rotate: number;

  constructor(props: IFrameProps) {
    super();
    this.bounds = props.bounds;
    this.overflowClip = props.overflowClip ?? true;
    this.rotate = 0;
  }

  override get x(): number {
    return this.bounds.x;
  }

  override get y(): number {
    return this.bounds.y;
  }

  override get width(): number {
    return this.bounds.width;
  }

  override get height(): number {
    return this.bounds.height;
  }

  override set x(x: number) {
    this.bounds.x = x;
  }

  override set y(y: number) {
    this.bounds.y = y;
  }

  override set width(width: number) {
    this.bounds.width = width;
  }

  override set height(height: number) {
    this.bounds.height = height;
  }

  override getBounds(): Bounds {
    return this.bounds;
  }

  // TODO: implement render bound and clipping
  render(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.render(ctx);
    });
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.hitMapRender(ctx);
    });
  }
}
