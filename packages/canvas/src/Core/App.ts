import { InteractionManager, IPointerEvent } from "./InteractionManager";
import { Group } from "../Containers/Group";
import { Emitter } from "@fewings/core/classes/Emitter";

type Loop = (deltaTime: number) => void;

type IAppEvents = {
  pointermove: (e: Omit<IPointerEvent, "target" | "currentTarget">) => void;
  pointerup: (e: Omit<IPointerEvent, "target" | "currentTarget">) => void;
  pointerdown: (e: Omit<IPointerEvent, "target" | "currentTarget">) => void;
};

interface IAppProps {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  fps?: number;
  debug?: boolean;
}

export class App extends Emitter<IAppEvents> {
  readonly stage: Group;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly dpr: number;

  private _width: number;
  private _height: number;

  private _scale: number;
  panX: number;
  panY: number;

  debug: boolean;

  private readonly interactionManager: InteractionManager;

  /**
   * @description if this not set, it follows the monitor's refresh rate.
   * Use this to limit the fps or use deltaTime to make it independent of the monitor's refresh rate.
   * @example 60 -> 60fps, 30 -> 30fps, 12 -> 12fps, 1 -> 1fps
   */
  fps?: number;
  private lastTime: number;
  private rafId: number | null;
  private readonly loops: Set<Loop>;

  constructor(props: IAppProps) {
    super();
    this.canvas = props.canvas;
    this.ctx = this.canvas.getContext("2d", {
      desynchronized: true,
    }) as CanvasRenderingContext2D;

    this.debug = props.debug ?? false;
    this.dpr = window.devicePixelRatio;

    this.stage = new Group();

    this.fps = props.fps;
    this.loops = new Set();
    this.rafId = null;
    this.lastTime = Date.now();

    this._width = props.width;
    this._height = props.height;
    this._scale = 1;
    this.panX = 0;
    this.panY = 0;
    this.interactionManager = new InteractionManager(this, {
      debug: this.debug,
    });
    this.resize();
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

  get scale() {
    return this._scale;
  }

  set scale(scale: number) {
    this._scale = Math.max(0.1, scale);
  }

  private resize() {
    this.canvas.width = this._width * this.dpr;
    this.canvas.height = this._height * this.dpr;
    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
    this.interactionManager.resize();
  }

  private appRenderRoutine(
    ctx: CanvasRenderingContext2D,
    callback: () => void
  ) {
    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.scale(this.scale * this.dpr, this.scale * this.dpr);
    ctx.translate(this.panX, this.panY);
    callback();
    ctx.restore();
  }
  render() {
    this.appRenderRoutine(this.ctx, () => {
      this.stage.render(this.ctx);
    });
    this.appRenderRoutine(this.interactionManager.hitCtx, () => {
      this.stage.hitMapRender(this.interactionManager.hitCtx);
    });
  }

  addLoop(cb: Loop) {
    this.loops.add(cb);
    if (!this.isLooping()) {
      this.startLoop();
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

  startLoop() {
    this.rafId = requestAnimationFrame(() => {
      const now = Date.now();
      const { shouldUpdate, deltaTime } = this.shouldUpdate(now);

      if (shouldUpdate) {
        this.lastTime = now;
        this.executeLoops(deltaTime);
      }

      this.startLoop();
    });
  }

  stopLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
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

  isLooping() {
    return this.rafId !== null;
  }

  resolveScaleV(v: number) {
    return v / this.dpr / this.scale;
  }

  toAbsX(x: number) {
    return this.resolveScaleV(x) + this.panX;
  }

  toAbsY(y: number) {
    return this.resolveScaleV(y) + this.panY;
  }
}
