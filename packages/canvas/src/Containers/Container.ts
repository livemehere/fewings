import { CNode, TNodeProps } from '../Core/CNode';

export type TContainerProps = TNodeProps & {
  scale?: number;
};

export abstract class Container extends CNode {
  /**
   * @description order of array is the order of drawing. last element is on top.
   */
  children: CNode[] = [];
  scale: number;

  constructor(props?: TContainerProps) {
    super(props);
    this.scale = props?.scale ?? 1;
  }

  protected renderChildren(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.render(ctx);
    });
  }

  protected hitMapRenderChildren(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      child.hitMapRender(ctx);
    });
  }

  addChild(child: CNode): void {
    if (!(child instanceof CNode)) {
      throw new Error('Child must be an instance of CNode');
    }

    if (child.parent) {
      child.parent.removeChild(child);
    }

    this.children.push(child);
    child.parent = this;
  }

  removeChild(child: CNode): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    child.parent = null;
  }

  findById(id: string): CNode | null {
    let result: CNode | null = null;

    this.traverse((node) => {
      if (node.id === id) {
        result = node;
      }
    });

    return result;
  }

  findByTag(tag: string): CNode[] {
    const result: CNode[] = [];

    this.traverse((node) => {
      if (node.tags.has(tag)) {
        result.push(node);
      }
    });

    return result;
  }

  traverse(callback: (node: CNode) => void): void {
    for (const child of this.children) {
      if (child instanceof Container) {
        child.traverse(callback);
      } else {
        callback(child);
      }
    }
  }

  findAll(predicate: (node: CNode) => boolean = () => true): CNode[] {
    const result: CNode[] = [];
    this.traverse((node) => {
      if (predicate(node)) {
        result.push(node);
      }
    });
    return result;
  }

  /**
   * @description bring the child to the front of the container. last index of the array.
   */
  bringToFront(child: CNode): void {
    this.removeChild(child);
    this.children.push(child);
  }

  /**
   * @description send the child to the back of the container. first index of the array.
   */
  sendToBack(child: CNode): void {
    this.removeChild(child);
    this.children.unshift(child);
  }
}
