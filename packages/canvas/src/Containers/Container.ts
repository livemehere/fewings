import { CNode } from "../CNode";
import { Point } from "../types";

export abstract class Container extends CNode {
  children: CNode[] = [];
  constructor() {
    super();
  }

  addChild(child: CNode): void {
    this.children.push(child);
    child.parent = this;
  }

  removeChild(child: CNode): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChildById(id: string): CNode | undefined {
    return this.children.find((shape) => shape.id === id);
  }

  getChildrenByTag(tag: string): CNode[] {
    return this.children.filter((node) => node.tags.has(tag));
  }

  getChildByTag(tag: string): CNode | undefined {
    return this.children.find((node) => node.tags.has(tag));
  }

  traverse(callback: (node: CNode) => void): void {
    callback(this);
    for (const child of this.children) {
      if (child instanceof Container) {
        child.traverse(callback);
      } else {
        callback(child);
      }
    }
  }

  findAll(predicate: (node: CNode) => boolean): CNode[] {
    const result: CNode[] = [];

    this.traverse((node) => {
      if (predicate(node)) {
        result.push(node);
      }
    });

    return result;
  }

  findNodeById(id: string): CNode | undefined {
    if (this.id === id) {
      return this;
    }

    for (const child of this.children) {
      if (child instanceof Container) {
        const found = child.findNodeById(id);
        if (found) {
          return found;
        }
      } else if (child.id === id) {
        return child;
      }
    }

    return undefined;
  }

  findAllByTag(tag: string): CNode[] {
    return this.findAll((node) => node.tags.has(tag));
  }

  traverseBFS(callback: (node: CNode) => void): void {
    const queue: CNode[] = [this];

    while (queue.length > 0) {
      const current = queue.shift()!;
      callback(current);

      if (current instanceof Container) {
        queue.push(...current.children);
      }
    }
  }
}
