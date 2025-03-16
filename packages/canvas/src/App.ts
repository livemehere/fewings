import { InteractionManager } from "./InteractionManager";
import { Group } from "./Containers/Group";

type Loop = (deltaTime: number) => void;

interface IAppProps {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  /**
   * @description enable pointer events, panning, zooming
   * @default false
   */
  interactive?: boolean;
  fps?: number;
}

export class App {
  readonly root: Group;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  readonly dpr: number;
  interactive: boolean;
  globalScale: number;
  readonly globalPan: {
    x: number;
    y: number;
  };
  readonly interactionManager?: InteractionManager;
  /**
   * @description if this not set, it follows the monitor's refresh rate.
   * Use this to limit the fps or use deltaTime to make it independent of the monitor's refresh rate.
   * @example 60 -> 60fps, 30 -> 30fps, 12 -> 12fps, 1 -> 1fps
   */
  fps?: number;
  private lastTime: number;
  readonly loops: Set<Loop>;
  private rafId: number | null;

  constructor(props: IAppProps) {
    this.canvas = props.canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.root = new Group();
    this.loops = new Set();
    this.rafId = null;
    this.fps = props.fps;
    this.lastTime = Date.now();
    this.dpr = window.devicePixelRatio;
    this._width = props.width;
    this._height = props.height;
    this.resize();
    this.globalScale = 1;
    this.globalPan = {
      x: 0,
      y: 0,
    };
    this.interactive = props.interactive ?? false;
    if (this.interactive) {
      this.interactionManager = new InteractionManager(this, { debug: true });
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set width(width: number) {
    this._width = width;
    this.resize();
  }

  set height(height: number) {
    this._height = height;
    this.resize();
  }

  resize() {
    this.canvas.width = this._width * this.dpr;
    this.canvas.height = this._height * this.dpr;
    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
  }

  render() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.root.render(this.ctx);
    this.ctx.restore();
  }

  addLoop(cb: Loop) {
    this.loops.add(cb);
    if (!this.isLooping()) {
      this.start();
    }

    return () => {
      this.removeLoop(cb);
    };
  }

  removeLoop(cb: Loop) {
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
      const now = Date.now();
      const { shouldUpdate, deltaTime } = this.shouldUpdate(now);

      if (shouldUpdate) {
        this.lastTime = now;
        this.executeLoops(deltaTime);
      }

      this.start();
    });
  }

  private shouldUpdate(now: number): {
    shouldUpdate: boolean;
    deltaTime: number;
  } {
    const deltaTime = now - this.lastTime;
    if (this.fps === undefined) {
      return {
        shouldUpdate: true,
        deltaTime,
      };
    }

    return {
      shouldUpdate: deltaTime >= 1000 / this.fps,
      deltaTime,
    };
  }

  private executeLoops(deltaTime: number): void {
    this.loops.forEach((loop) => loop(deltaTime));
    this.render();
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
