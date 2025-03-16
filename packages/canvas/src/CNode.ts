import { djb2 } from "packages/core/dist/hash";
import { IHitMapRenderer, IRenderer, TModelType } from "./types";
import { Container } from "./Containers/Container";

export abstract class CNode implements IRenderer, IHitMapRenderer {
  static idSeq = 0;
  static idMap = new Map<string, CNode>();

  readonly id: string;
  readonly tags: Set<string>;
  abstract readonly type: TModelType;

  visible: boolean;
  parent: Container | null;
  constructor() {
    this.id = (0x1000000 + djb2(`${CNode.idSeq++}`))
      .toString(16)
      .replace(/^1/, "#");
    CNode.idMap.set(this.id, this);
    this.visible = true;
    this.parent = null;
    this.tags = new Set();
  }
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract hitMapRender(ctx: CanvasRenderingContext2D): void;

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
}
