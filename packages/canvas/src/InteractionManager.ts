import { App } from "./App";
import { CNode } from "./CNode";
import { rgbToHex } from "./utils";

export type IPointerEvent = {
  type: "pointerdown" | "pointermove" | "pointerup";
  pointerState: IPointerState;
  /** node that triggered the event */
  target: CNode;
  /** node that is currently being processed */
  currentTarget: CNode;
  originalEvent: PointerEvent;
  stopPropagation: () => void;
  /** @internal */
  _propagationStopped: boolean;
};

export type IPointerState = {
  downX: number | null;
  downY: number | null;
  downTime: number | null;
};

export class InteractionManager {
  private app: App;

  hitCanvas: HTMLCanvasElement;
  hitCtx: CanvasRenderingContext2D;
  debug?: boolean;

  pointerState: IPointerState;

  constructor(app: App, options?: { debug?: boolean }) {
    this.app = app;
    this.hitCanvas = document.createElement("canvas");
    this.hitCanvas.id = "interaction-manager";
    this.hitCtx = this.hitCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.hitCtx.imageSmoothingEnabled = false;
    this.hitCanvas.style.position = "absolute";
    this.hitCanvas.style.right = "0";
    this.hitCanvas.style.bottom = "0";
    this.hitCanvas.style.pointerEvents = "none";
    this.hitCanvas.style.zIndex = "1";
    this.debug = options?.debug ?? false;
    if (this.debug) {
      if (document.querySelector("#hitmap-canvas")) {
        document.body.removeChild(document.querySelector("#hitmap-canvas")!);
      } else {
        document.body.appendChild(this.hitCanvas);
      }
    }
    this.resize();
    this.pointerState = {
      downX: null,
      downY: null,
      downTime: null,
    };
    this.app.canvas.addEventListener("pointerdown", this.handlePointerDown);
    this.app.canvas.addEventListener("pointermove", this.handlePointerMove);
    this.app.canvas.addEventListener("pointerup", this.handlePointerUp);
  }

  resize() {
    this.hitCanvas.width = this.app.width * this.app.dpr;
    this.hitCanvas.height = this.app.height * this.app.dpr;
    this.hitCanvas.style.width = `${this.app.width}px`;
    this.hitCanvas.style.height = `${this.app.height}px`;
  }

  hitMapRender() {
    this.hitCtx.save();
    this.hitCtx.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
    this.app.root.hitMapRender(this.hitCtx);
    if (this.debug) {
      // this.renderPointer();
    }
    this.hitCtx.restore();
  }

  renderPointer() {
    this.hitCtx.save();
    this.hitCtx.fillStyle = "red";
    if (this.pointerState.downX && this.pointerState.downY) {
      this.hitCtx.fillRect(
        this.pointerState.downX,
        this.pointerState.downY,
        10,
        10
      );
    }
    this.hitCtx.restore();
  }

  handlePointerDown = (event: PointerEvent) => {
    this.pointerState.downTime = Date.now();
    if (this.pointerState.downX && this.pointerState.downY) {
      const pixel = this.hitCtx.getImageData(
        this.pointerState.downX,
        this.pointerState.downY,
        1,
        1
      );
      const hex = rgbToHex(pixel.data[0], pixel.data[1], pixel.data[2]);
      const node = CNode.idMap.get(hex);
      if (node) {
        node.dispatch("pointerdown", {
          type: "pointerdown",
          pointerState: this.pointerState,
          target: node,
          currentTarget: node,
          originalEvent: event,
          stopPropagation() {
            this._propagationStopped = true;
          },
          _propagationStopped: false,
        });
      }
    }
  };

  handlePointerMove = (event: PointerEvent) => {
    const rect = this.app.canvas.getBoundingClientRect();
    this.pointerState.downX = (event.clientX - rect.left) * this.app.dpr;
    this.pointerState.downY = (event.clientY - rect.top) * this.app.dpr;
  };

  handlePointerUp = (event: PointerEvent) => {
    this.pointerState.downX = null;
    this.pointerState.downY = null;
    this.pointerState.downTime = null;
  };
}
