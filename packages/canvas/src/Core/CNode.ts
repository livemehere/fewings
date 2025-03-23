import { djb2 } from "packages/core/dist/hash";
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
import { IPointerEvent } from "./InteractionManager";
import { Emitter } from "@fewings/core/classes/Emitter";

export type ICNodeEvents = {
  pointerdown: (e: IPointerEvent) => void;
  pointermove: (e: IPointerEvent) => void;
  pointerup: (e: IPointerEvent) => void;
  pointerenter: (e: IPointerEvent) => void;
  pointerleave: (e: IPointerEvent) => void;
  redraw: () => void;
};

export type ICNodeProps = IDrawAttrs &
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

  pivot: IPoint;
  _rotate: number;

  visible: boolean;
  parent: Container | null;
  isStatic: boolean;
  debug: boolean;

  fillStyle: TFillStyle;
  strokeStyle: TStrokeStyle;
  strokeWidth: number;
  opacity: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  lineDash: number[];
  lineDashOffset: number;
  round: number[];

  constructor(props: ICNodeProps = {}) {
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
    this.opacity = props.opacity ?? 1;
    this.shadowColor = props.shadowColor ?? "black";
    this.shadowBlur = props.shadowBlur ?? 0;
    this.shadowOffsetX = props.shadowOffsetX ?? 0;
    this.shadowOffsetY = props.shadowOffsetY ?? 0;
    this.lineDash = props.lineDash ?? [];
    this.lineDashOffset = props.lineDashOffset ?? 0;
    this.round = props.round ?? [];
    this.pivot = props.pivot ?? { x: 0, y: 0 };
    this._rotate = props.rotate ?? 0;
  }

  /** properties */
  abstract get x(): number;
  abstract get y(): number;
  abstract set x(v: number);
  abstract set y(v: number);
  abstract get width(): number;
  abstract get height(): number;
  abstract set width(v: number);
  abstract set height(v: number);

  /** @description radian */
  abstract get rotate(): number;
  abstract set rotate(v: number);

  /** methods */
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract hitMapRender(ctx: CanvasRenderingContext2D): void;
  protected abstract debugRender(ctx: CanvasRenderingContext2D): void;
  /**
   * Shape : calculate bounds with vertices
   * Container : calculate bounds with children
   */
  abstract getBounds(): Bounds;

  getCenterPoint(): IPoint {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  updatePivot(
    direction:
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "center",
  ) {
    switch (direction) {
      case "center":
        this.pivot = this.getCenterPoint();
        break;
      case "top-left":
        this.pivot = { x: this.x, y: this.y };
        break;
      case "top-right":
        this.pivot = { x: this.x + this.width, y: this.y };
        break;
      case "bottom-left":
        this.pivot = { x: this.x, y: this.y + this.height };
        break;
      case "bottom-right":
        this.pivot = { x: this.x + this.width, y: this.y + this.height };
        break;
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
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
        const pointerEvent = payload[0] as IPointerEvent;
        const bubbledEvent: IPointerEvent = {
          ...pointerEvent,
          currentTarget: this.parent,
          target: this,
        };
        if (!pointerEvent._propagationStopped) {
          this.parent.dispatch(
            event,
            ...([bubbledEvent] as Parameters<ICNodeEvents[E]>),
          );
        }
      }
    }
  }

  override on<E extends keyof ICNodeEvents>(
    event: E,
    listener: ICNodeEvents[E],
  ): () => void {
    super.on(event, listener);
    CNode.totalListeners++;
    return () => {
      this.listener[event] = this.listener[event]?.filter(
        (l) => l !== listener,
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
