import { CNode } from "../CNode";

export abstract class Container extends CNode {
  children: CNode[] = [];
  constructor() {
    super();
  }
  addChild(child: CNode): void {
    this.children.push(child);
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
}
