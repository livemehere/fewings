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
}
export type TPrimitiveShapeProps = Omit<IShapeProps, "renderer">;

export abstract class Shape implements IShape {
  id: string;
  model: BoxModel;
  renderer: IRenderer;
  abstract type: TModelType;
  constructor({ x, y, width, height, drawOptions, renderer }: IShapeProps) {
    this.id = getRandomId();
    this.model = new BoxModel(x, y, width, height, drawOptions);
    this.renderer = renderer;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.renderer.render(ctx, this.model);
  }
}
