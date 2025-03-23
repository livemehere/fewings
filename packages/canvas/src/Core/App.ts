import { InteractionManager, TPointerEvent } from "./InteractionManager";
import { Group } from "../Containers/Group";
import { Emitter } from "@fewings/core/classes/Emitter";

type Loop = (app: App, deltaTime: number) => void;

type TAppEvents = {
  pointermove: (e: Omit<TPointerEvent, "target" | "currentTarget">) => void;
  pointerup: (e: Omit<TPointerEvent, "target" | "currentTarget">) => void;
  pointerdown: (e: Omit<TPointerEvent, "target" | "currentTarget">) => void;
};

export type TAppProps = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  fps?: number;
  debug?: boolean;
  dpr?: number;
};

export class App extends Emitter<TAppEvents> {
  readonly stage: Group;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly dpr: number;

  private _width: number;
  private _height: number;

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

  constructor(props: TAppProps) {
    super();
    this.canvas = props.canvas;
    this.ctx = this.canvas.getContext("2d", {
      desynchronized: true,
    }) as CanvasRenderingContext2D;

    this.debug = props.debug ?? false;
    this.dpr = props.dpr ?? window.devicePixelRatio;

    this.stage = new Group();

    this.fps = props.fps;
    this.loops = new Set();
    this.rafId = null;
    this.lastTime = Date.now();

    this._width = props.width;
    this._height = props.height;

    this.interactionManager = new InteractionManager(this, {
      debug: this.debug,
    });
    this.resize();
    this.debugLog("[App constructor] dpr", this.dpr);
    this.debugLog("[App constructor] fps", this.fps);
  }

  debugLog(...args: any[]) {
    if (!this.debug) return;
    console.debug(...args);
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

  private resize() {
    this.canvas.width = this._width * this.dpr;
    this.canvas.height = this._height * this.dpr;
    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
    this.debugLog("[App resize]", this.canvas.width, this.canvas.height);
    this.interactionManager.resize();
  }

  private appRenderRoutine(
    ctx: CanvasRenderingContext2D,
    callback: () => void
  ) {
    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.scale(this.dpr, this.dpr);
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
    this.debugLog("[App Loop] addLoop", this.loops.size);
    if (!this.isLooping()) {
      this.debugLog("[App Loop] loop started...");
      this.startLoop();
    }

    return () => {
      this.removeLoop(cb);
    };
  }

  removeLoop(cb: Loop) {
    this.loops.delete(cb);
    this.debugLog("[App Loop] removeLoop", this.loops.size);

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
      this.debugLog("[App Loop] stopLoop", this.loops.size);
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
    this.loops.forEach((loop) => loop(this, deltaTime));
    this.render();
  }

  isLooping() {
    return this.rafId !== null;
  }
}
