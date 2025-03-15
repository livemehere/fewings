import { IShape, IStage } from "./types";

export class Stage implements IStage {
  private _shapes: IShape[] = [];

  constructor() {}

  get shapes(): IShape[] {
    return this._shapes;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this._shapes.forEach((shape) => {
      shape.render(ctx);
    });
  }

  addShape(shape: IShape): void {
    this._shapes.push(shape);
  }

  removeShape(shape: IShape): void {
    const index = this._shapes.indexOf(shape);
    if (index !== -1) {
      this._shapes.splice(index, 1);
    }
  }

  getShape(id: string): IShape | undefined {
    return this._shapes.find((shape) => shape.id === id);
  }

  updateShape(shape: IShape): void {
    const index = this._shapes.indexOf(shape);
    if (index !== -1) {
      this._shapes[index] = shape;
    }
  }
}
