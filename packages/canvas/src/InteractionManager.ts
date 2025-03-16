import { App } from "./App";

export class InteractionManager {
  private app: App;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  debug?: boolean;

  constructor(app: App, options?: { debug?: boolean }) {
    this.app = app;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "interaction-manager";
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.debug = options?.debug ?? false;
    this.initCanvas();
  }

  initCanvas() {
    this.canvas.width = this.app.width;
    this.canvas.height = this.app.height;
    this.ctx.imageSmoothingEnabled = false;

    if (this.debug) {
      this.canvas.style.position = "absolute";
      this.canvas.style.right = "0";
      this.canvas.style.bottom = "0";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "1";
      if (document.querySelector("#interaction-manager")) {
        document.body.removeChild(
          document.querySelector("#interaction-manager")!
        );
      } else {
        document.body.appendChild(this.canvas);
      }
    }
  }

  render() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.app.root.render(this.ctx);
    this.ctx.restore();
  }
}
