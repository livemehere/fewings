import { App } from './App';
import { CNode, ICNodeEvents } from './CNode';
import { rgbToHex } from '../utils';

export type TPointerEvent = {
  type: keyof ICNodeEvents;
  pointerState: TPointerState;
  /** node that triggered the event */
  target: CNode;
  /** node that is currently being processed */
  currentTarget: CNode;
  originalEvent: PointerEvent;
  stopPropagation: () => void;
  /** @internal */
  _propagationStopped: boolean;
};

export type TPointerState = {
  downX: number | null;
  downY: number | null;
  downTime: number | null;
  x: number;
  y: number;
};

export class InteractionManager {
  private app: App;

  readonly hitCanvas: HTMLCanvasElement;
  readonly hitCtx: CanvasRenderingContext2D;
  debug?: boolean;

  private pointerState: TPointerState;
  private currentHoverNode: CNode | null;

  constructor(app: App, options?: { debug?: boolean }) {
    this.app = app;
    this.hitCanvas = document.createElement('canvas');
    this.hitCanvas.id = 'interaction-manager';
    this.hitCtx = this.hitCanvas.getContext('2d', {
      willReadFrequently: true,
      alpha: false,
      desynchronized: true,
    }) as CanvasRenderingContext2D;
    this.hitCtx.imageSmoothingEnabled = false;
    this.hitCanvas.style.position = 'absolute';
    this.hitCanvas.style.right = '0';
    this.hitCanvas.style.bottom = '0';
    this.hitCanvas.style.pointerEvents = 'none';
    this.hitCanvas.style.zIndex = '1';
    this.debug = options?.debug ?? false;
    if (this.debug) {
      if (document.querySelector('#hitmap-canvas')) {
        document.body.removeChild(document.querySelector('#hitmap-canvas')!);
      } else {
        document.body.appendChild(this.hitCanvas);
      }
    }
    this.pointerState = {
      downX: null,
      downY: null,
      downTime: null,
      x: 0,
      y: 0,
    };
    this.currentHoverNode = null;
    this.app.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.app.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.app.canvas.addEventListener('pointerup', this.handlePointerUp);
  }

  debugLog(...args: any[]) {
    if (!this.debug) return;
    console.debug(...args);
  }

  resize() {
    this.hitCanvas.width = this.app.width * this.app.dpr;
    this.hitCanvas.height = this.app.height * this.app.dpr;
    this.hitCanvas.style.width = `${this.app.width / 2}px`;
    this.hitCanvas.style.height = `${this.app.height / 2}px`;
    this.debugLog(
      '[InteractionManager] resize',
      this.hitCanvas.width,
      this.hitCanvas.height
    );
  }

  renderPointer() {
    this.hitCtx.save();
    this.hitCtx.fillStyle = 'red';
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
    const rect = this.app.canvas.getBoundingClientRect();
    this.pointerState.downX = (event.clientX - rect.left) * this.app.dpr;
    this.pointerState.downY = (event.clientY - rect.top) * this.app.dpr;
    this.pointerState.downTime = Date.now();

    this.app.dispatch('pointerdown', {
      type: 'pointerdown',
      pointerState: { ...this.pointerState },
      originalEvent: event,
      stopPropagation() {
        this._propagationStopped = true;
      },
      _propagationStopped: false,
    });
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
        node.dispatch('pointerdown', {
          type: 'pointerdown',
          pointerState: {
            ...this.pointerState,
          },
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

  /**
   * update pointer position
   * FIXME: need to improve performance (cache system, ...etc)
   * TODO: detach hover system to each CNode
   */
  handlePointerMove = (event: PointerEvent) => {
    const rect = this.app.canvas.getBoundingClientRect();
    this.pointerState.x = (event.clientX - rect.left) * this.app.dpr;
    this.pointerState.y = (event.clientY - rect.top) * this.app.dpr;
    this.app.dispatch('pointermove', {
      type: 'pointermove',
      pointerState: { ...this.pointerState },
      originalEvent: event,
      stopPropagation() {
        this._propagationStopped = true;
      },
      _propagationStopped: false,
    });

    const pixel = this.hitCtx.getImageData(
      this.pointerState.x,
      this.pointerState.y,
      1,
      1
    );
    const hex = rgbToHex(pixel.data[0], pixel.data[1], pixel.data[2]);
    const node = CNode.idMap.get(hex);

    if (node && !node.isStatic) {
      node.dispatch('pointermove', {
        type: 'pointermove',
        pointerState: { ...this.pointerState },
        target: node,
        currentTarget: node,
        originalEvent: event,
        stopPropagation() {
          this._propagationStopped = true;
        },
        _propagationStopped: false,
      });
      if (this.currentHoverNode !== node) {
        // new node dispatch pointerenter
        node.dispatch('pointerenter', {
          type: 'pointerenter',
          pointerState: { ...this.pointerState },
          target: node,
          currentTarget: node,
          originalEvent: event,
          stopPropagation() {
            this._propagationStopped = true;
          },
          _propagationStopped: false,
        });

        if (this.currentHoverNode) {
          // old node dispatch pointerleave if exist
          this.currentHoverNode.dispatch('pointerleave', {
            type: 'pointerleave',
            pointerState: { ...this.pointerState },
            target: this.currentHoverNode,
            currentTarget: this.currentHoverNode,
            originalEvent: event,
            stopPropagation() {
              this._propagationStopped = true;
            },
            _propagationStopped: false,
          });
        }
        this.currentHoverNode = node;
      }
    }
  };

  handlePointerUp = (event: PointerEvent) => {
    this.app.dispatch('pointerup', {
      type: 'pointerup',
      pointerState: { ...this.pointerState },
      originalEvent: event,
      stopPropagation() {
        this._propagationStopped = true;
      },
      _propagationStopped: false,
    });
    this.pointerState.downX = null;
    this.pointerState.downY = null;
    this.pointerState.downTime = null;
  };
}
