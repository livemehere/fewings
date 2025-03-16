import { ModelTypeMap, TModelType } from "../types";
import { Container } from "./Container";

export class Group extends Container {
  readonly type: TModelType = ModelTypeMap.GROUP;

  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((shape) => {
      shape.render(ctx);
    });
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((shape) => {
      shape.hitMapRender(ctx);
    });
  }
}
