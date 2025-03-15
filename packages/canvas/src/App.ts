import { Stage } from "./Stage";
import { ICanvasApp, IStage } from "./types";

export class App implements ICanvasApp {
  stage: IStage;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.stage = new Stage();
  }

  render() {
    this.stage.render(this.ctx);
  }
}
