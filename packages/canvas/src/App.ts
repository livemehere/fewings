import { Stage } from "./Stage";

export class App {
  readonly stage: Stage;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly loops: Set<() => void>;
  private rafId: number | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.stage = new Stage();
    this.loops = new Set();
    this.rafId = null;
  }

  render() {
    this.stage.render(this.ctx);
  }

  addLoop(cb: () => void) {
    this.loops.add(cb);
    if (!this.isLooping()) {
      this.start();
    }

    return () => {
      this.removeLoop(cb);
    };
  }

  removeLoop(cb: () => void) {
    this.loops.delete(cb);
    if (this.loops.size === 0) {
      this.stopLoop();
    }
  }

  clearLoops() {
    this.loops.clear();
    if (this.isLooping()) {
      this.stopLoop();
    }
  }

  start() {
    this.rafId = requestAnimationFrame(() => {
      this.loops.forEach((loop) => {
        loop();
      });
      this.start();
    });
  }

  stopLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  isLooping() {
    return this.rafId !== null;
  }
}
