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

  constructor(props: IFrameProps) {
    super();
    this.bounds = props.bounds;
    this.overflowClip = props.overflowClip ?? true;
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
