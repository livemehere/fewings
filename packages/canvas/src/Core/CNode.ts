import { djb2 } from "@fewings/core/hash";
import { Emitter } from "@fewings/core/classes/Emitter";

import {
  IPoint,
  Bounds,
  ICNode,
  IDrawAttrs,
  TFillStyle,
  TModelType,
  TStrokeStyle,
} from "../types";
import { Container } from "../Containers/Container";
import { TPointerEvent } from "./InteractionManager";

export type ICNodeEvents = {
  pointerdown: (e: TPointerEvent) => void;
  pointermove: (e: TPointerEvent) => void;
  pointerup: (e: TPointerEvent) => void;
  pointerenter: (e: TPointerEvent) => void;
  pointerleave: (e: TPointerEvent) => void;
  redraw: () => void;
};

export type TNodeProps = IDrawAttrs &
  Partial<Omit<ICNode, "id" | "type" | "tags">> & {
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
      .replace(/^1/, "#");
    CNode.idMap.set(this.id, this);

    this.visible = props.visible ?? true;
    this.parent = props.parent ?? null;
    this.tags = new Set(props.tags ?? []);
    this.isStatic = props.isStatic ?? false;
    this.debug = props.debug ?? false;
    /** draw attrs */
    this.fillStyle = props.fillStyle ?? "black";
    this.strokeStyle = props.strokeStyle ?? "black";
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

  /** methods */
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract hitMapRender(ctx: CanvasRenderingContext2D): void;
  abstract toJSON(): string;
  abstract fromJSON(json: string): CNode;
  abstract clone(): CNode;
  // TODO: implement
  // abstract toPNG(): string;
  // abstract toJPEG(quality?: number): string;
  // abstract toSVG(): string;
  // abstract toBlob(): Blob;
  protected debugRender(ctx: CanvasRenderingContext2D): void {
    if (!this.debug) return;
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    const gap = this.width / 2;
    const yGap = this.height / 3;
    const fontSize = 16;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(this.id, this.x + this.width + gap, this.y);
    ctx.fillText(
      `x: ${this.x.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap
    );
    ctx.fillText(
      `y: ${this.y.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 2
    );
    ctx.fillText(
      `w: ${this.width.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 3
    );
    ctx.fillText(
      `h: ${this.height.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 4
    );
    ctx.fillText(
      `rotate: ${this.rotate.toFixed(2)}`,
      this.x + this.width + gap,
      this.y + yGap * 5
    );
    ctx.restore();
  }

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
      if (event === "pointerdown") {
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
    listener: ICNodeEvents[E]
  ): () => void {
    super.on(event, listener);
    CNode.totalListeners++;
    return () => {
      this.listener[event] = this.listener[event]?.filter(
        (l) => l !== listener
      );
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
