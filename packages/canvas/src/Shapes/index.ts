import { BoxModel } from "../Models/BoxModel";
import { IDrawOptions, IRenderer, IShape, TModelType } from "../types";
import { getRandomId } from "../utils";

export interface IShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  drawOptions?: Partial<IDrawOptions>;
  renderer: IRenderer;
  tags?: string[];
}
export type TPrimitiveShapeProps = Omit<IShapeProps, "renderer">;

export abstract class Shape implements IShape {
  readonly id: string;
  readonly model: BoxModel;
  readonly renderer: IRenderer;
  readonly tags: Set<string>;
  abstract type: TModelType;
  constructor({
    x,
    y,
    width,
    height,
    drawOptions,
    renderer,
    tags,
  }: IShapeProps) {
    this.id = getRandomId();
    this.model = new BoxModel(x, y, width, height, drawOptions);
    this.renderer = renderer;
    this.tags = new Set(tags);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.renderer.render(ctx, this.model);
  }
}
