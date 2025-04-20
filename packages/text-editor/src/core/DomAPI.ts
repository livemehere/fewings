import { BlockAPI } from "./BlockAPI";
import { InlineAPI } from "./InlineAPI";

export class DomAPI {
  // return inline tag or div tag
  static unwrapTextNode(node: Node): HTMLElement {
    return node.nodeType === Node.TEXT_NODE
      ? node.parentElement!
      : (node as HTMLElement);
  }

  // return div tag
  static unwrapInlineElement(node: Node) {
    let cur = this.unwrapTextNode(node) as HTMLElement;
    while (InlineAPI.isInlineElement(cur)) {
      cur = cur.parentElement!;
    }
    return cur;
  }

  static merge(elements: HTMLElement[] | HTMLElement, tagName: "ul" | "ol") {
    const _elements = Array.isArray(elements) ? elements : [elements];
    if (_elements.length === 0) {
      throw new Error("DomAPI.merge: no elements provided");
    }

    const wrapEl = document.createElement(tagName);
    _elements.forEach((element) => {
      const ancestors = BlockAPI.getAncestorElements(element);
      const hasLi = ancestors.some((e) => e.tagName === "LI");
      if (!hasLi) {
        const li = document.createElement("li");
        li.appendChild(element.cloneNode(true));
        wrapEl.appendChild(li);
      } else {
        wrapEl.appendChild(element.cloneNode(true));
      }
    });

    const firstElement = _elements[0];
    firstElement.before(wrapEl);
    _elements.forEach((element) => {
      element.remove();
    });

    return wrapEl;
  }
}
