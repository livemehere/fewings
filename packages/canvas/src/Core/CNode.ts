import { djb2 } from '@fewings/core/hash';
import { Emitter, TListener } from '@fewings/core/classes/Emitter';

import {
  IPoint,
  Bounds,
  ICNode,
  IDrawAttrs,
  TFillStyle,
  TModelType,
  TStrokeStyle,
} from '../types';
import { Container } from '../Containers/Container';
import { TPointerEvent } from './InteractionManager';

export type ICNodeEvents = {
  pointerdown: (e: TPointerEvent) => void;
  pointermove: (e: TPointerEvent) => void;
  pointerup: (e: TPointerEvent) => void;
  pointerenter: (e: TPointerEvent) => void;
  pointerleave: (e: TPointerEvent) => void;
  redraw: () => void;
};

export type TNodeProps = IDrawAttrs &
  Partial<Omit<ICNode, 'id' | 'type' | 'tags'>> & {
    tags?: string[];
  };

export abstract class CNode extends Emitter<ICNodeEvents> implements ICNode {
  static idSeq = 0;
  static idMap = new Map<string, CNode>();
  static totalNodes = 0;
  static totalListeners = 0;

  readonly id: string;
  readonly tags: Set<string>;
  abstract readonly type: TModelType;

  parent: Container | null;
  visible: boolean;
  isStatic: boolean;
  debug: boolean;
  /** @description radian */
  rotate: number;

  fillStyle: TFillStyle;
  strokeStyle: TStrokeStyle;
  strokeWidth: number;
  opacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  round?: number[];

  constructor(props: TNodeProps = {}) {
    super();
    CNode.totalNodes++;
    CNode.idSeq += 10;
    this.id = (0x1000000 + djb2(`${CNode.idSeq}`))
      .toString(16)
      .replace(/^1/, '#');
    CNode.idMap.set(this.id, this);

    this.visible = props.visible ?? true;
    this.parent = props.parent ?? null;
    this.tags = new Set(props.tags ?? []);
    this.isStatic = props.isStatic ?? false;
    this.debug = props.debug ?? false;
    /** draw attrs */
    this.fillStyle = props.fillStyle ?? 'black';
    this.strokeStyle = props.strokeStyle ?? 'black';
    this.strokeWidth = props.strokeWidth ?? 1;
    this.rotate = props.rotate ?? 0;

    this.opacity = props.opacity;
    this.shadowColor = props.shadowColor;
    this.shadowBlur = props.shadowBlur;
    this.shadowOffsetX = props.shadowOffsetX;
    this.shadowOffsetY = props.shadowOffsetY;
    this.lineDash = props.lineDash;
    this.lineDashOffset = props.lineDashOffset;
    this.round = props.round;
  }

  abstract get x(): number;
  abstract get y(): number;
  abstract set x(v: number);
  abstract set y(v: number);
  abstract get width(): number;
  abstract get height(): number;
  abstract set width(v: number);
  abstract set height(v: number);

  resolveTransform(dx: number, dy: number, appScale: number) {
    let parent: Container | null = this.parent;
    let _dx = dx / appScale;
    let _dy = dy / appScale;
    while (parent) {
      _dx /= parent.scale;
      _dy /= parent.scale;

      const r = parent.rotate;
      const cos = Math.cos(-r);
      const sin = Math.sin(-r);
      const rx = _dx * cos - _dy * sin;
      const ry = _dx * sin + _dy * cos;
      _dx = rx;
      _dy = ry;
      parent = parent.parent;
    }
    return { x: _dx, y: _dy };
  }

  /** methods */
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;
    this.renderRoutine(ctx, () => {
      this._render(ctx);
      if (this.debug) {
        this.debugRender(ctx);
      }
    });
  }

  hitMapRender(ctx: CanvasRenderingContext2D): void {
    if (!this.visible || this.isStatic) return;
    this.renderRoutine(ctx, () => {
      this._hitMapRender(ctx);
    });
  }

  protected renderRoutine(
    ctx: CanvasRenderingContext2D,
    renderCallback: () => void
  ): void {
    ctx.save();
    const bounds = this.getBounds();
    const centerX = (bounds.left + bounds.right) / 2;
    const centerY = (bounds.top + bounds.bottom) / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotate);
    if ('scale' in this) {
      ctx.scale(this.scale as number, this.scale as number);
    }
    ctx.translate(-centerX, -centerY);
    renderCallback();
    ctx.restore();
  }

  protected setupRender(ctx: CanvasRenderingContext2D): void {
    if (this.opacity !== undefined && this.opacity > 0) {
      ctx.globalAlpha = this.opacity;
    }
    if (this.shadowColor !== undefined) {
      ctx.shadowColor = this.shadowColor;
    }
    if (this.shadowBlur !== undefined) {
      ctx.shadowBlur = this.shadowBlur;
    }
    if (this.shadowOffsetX !== undefined) {
      ctx.shadowOffsetX = this.shadowOffsetX;
    }
    if (this.shadowOffsetY !== undefined) {
      ctx.shadowOffsetY = this.shadowOffsetY;
    }
    if (this.lineDash !== undefined) {
      ctx.setLineDash(this.lineDash);
    }
    if (this.lineDashOffset !== undefined) {
      ctx.lineDashOffset = this.lineDashOffset;
    }
    if (this.fillStyle !== undefined) {
      ctx.fillStyle = this.fillStyle;
    }
    if (this.strokeStyle !== undefined) {
      ctx.strokeStyle = this.strokeStyle;
    }
    if (this.strokeWidth !== undefined) {
      ctx.lineWidth = this.strokeWidth;
    }
  }

  protected setupHitRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.id;
    ctx.strokeStyle = this.id;
  }

  protected debugRender(ctx: CanvasRenderingContext2D): void {
    // fill text each position
    ctx.save();
    const bounds = this.getBounds();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'red';
    ctx.shadowColor = 'none';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.rect(
      bounds.left,
      bounds.top,
      bounds.right - bounds.left,
      bounds.bottom - bounds.top
    );
    ctx.stroke();
    ctx.closePath();
    const gap = 20;
    const fontSize = 20;
    const baseX = bounds.right + 10;
    const baseY = bounds.top;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(this.id, baseX, baseY);
    ctx.fillText(`x: ${bounds.left.toFixed(2)}`, baseX, baseY + gap);
    ctx.fillText(`y: ${bounds.top.toFixed(2)}`, baseX, baseY + gap * 2);
    ctx.fillText(
      `w: ${(bounds.right - bounds.left).toFixed(2)}`,
      baseX,
      baseY + gap * 3
    );
    ctx.fillText(
      `h: ${(bounds.bottom - bounds.top).toFixed(2)}`,
      baseX,
      baseY + gap * 4
    );
    ctx.restore();
  }

  abstract _render(ctx: CanvasRenderingContext2D): void;
  abstract _hitMapRender(ctx: CanvasRenderingContext2D): void;

  abstract toJSON(): string;
  abstract fromJSON(json: string): CNode;
  abstract clone(): CNode;
  // TODO: implement
  // abstract toPNG(): string;
  // abstract toJPEG(quality?: number): string;
  // abstract toSVG(): string;
  // abstract toBlob(): Blob;

  /**
   * Shape : calculate bounds with vertices
   * Container : calculate bounds with children
   */
  abstract getBounds(): Bounds;
  abstract getGlobalBounds(): Bounds;
  getCenter(): IPoint {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  /**
   * @description dispatch event to parent node
   * @description this override made to bubble pointerdown event. you can use the way `event delegation`
   * @param event - event name
   * @param payload - event payload
   */
  override dispatch<E extends keyof ICNodeEvents>(
    event: E,
    ...payload: Parameters<ICNodeEvents[E]>
  ): void {
    super.dispatch(event, ...payload);
    if (this.parent) {
      if (event === 'pointerdown') {
        const pointerEvent = payload[0] as TPointerEvent;
        const bubbledEvent: TPointerEvent = {
          ...pointerEvent,
          currentTarget: this.parent,
          target: this,
        };
        if (!pointerEvent._propagationStopped) {
          this.parent.dispatch(
            event,
            ...([bubbledEvent] as Parameters<ICNodeEvents[E]>)
          );
        }
      }
    }
  }

  override on<E extends keyof ICNodeEvents>(
    event: E,
    listener: TListener<ICNodeEvents, E>
  ): () => void {
    const off = super.on(event, listener as any);
    CNode.totalListeners++;
    return () => {
      off();
      CNode.totalListeners--;
    };
  }

  addTag(tag: string | string[]) {
    if (Array.isArray(tag)) {
      tag.forEach((t) => this.tags.add(t));
    } else {
      this.tags.add(tag);
    }
  }

  removeTag(tag: string | string[]) {
    if (Array.isArray(tag)) {
      tag.forEach((t) => this.tags.delete(t));
    } else {
      this.tags.delete(tag);
    }
  }

  hasTag(tag: string) {
    return this.tags.has(tag);
  }

  clearTags() {
    this.tags.clear();
  }

  toString() {
    return `CNode(${this.id})`;
  }
}
