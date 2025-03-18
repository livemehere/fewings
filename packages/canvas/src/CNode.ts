import { djb2 } from "packages/core/dist/hash";
import { Bounds } from "./Bounds";
import { IHitMapRenderer, IRenderer, TModelType } from "./types";
import { Container } from "./Containers/Container";
import { Emitter } from "packages/core/dist/classes";
import { IPointerEvent } from "./InteractionManager";

export type ICNodeEvents = {
  pointerdown: (e: IPointerEvent) => void;
  pointermove: (e: IPointerEvent) => void;
  pointerup: (e: IPointerEvent) => void;
  pointerenter: (e: IPointerEvent) => void;
  pointerleave: (e: IPointerEvent) => void;
};

export abstract class CNode
  extends Emitter<ICNodeEvents>
  implements IRenderer, IHitMapRenderer
{
  static idSeq = 0;
  static idMap = new Map<string, CNode>();
  static totalNodes = 0;
  static totalListeners = 0;

  readonly id: string;
  readonly tags: Set<string>;
  abstract readonly type: TModelType;

  visible: boolean;
  parent: Container | null;
  isStatic: boolean;
  constructor() {
    super();
    CNode.totalNodes++;
    CNode.idSeq += 2;
    this.id = (0x1000000 + djb2(`${CNode.idSeq}`))
      .toString(16)
      .replace(/^1/, "#");
    CNode.idMap.set(this.id, this);
    this.visible = true;
    this.parent = null;
    this.tags = new Set();
    this.isStatic = false;
  }
  abstract getBounds(): Bounds;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract hitMapRender(ctx: CanvasRenderingContext2D): void;

  abstract get x(): number;
  abstract get y(): number;
  abstract set x(x: number);
  abstract set y(y: number);
  abstract get width(): number;
  abstract get height(): number;
  abstract set width(width: number);
  abstract set height(height: number);
  abstract get rotate(): number;
  abstract set rotate(rotate: number);

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
