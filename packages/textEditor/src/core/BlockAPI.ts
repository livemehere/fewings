import { CursorAPI } from "./CursorAPI";
import { DomAPI } from "./DomAPI";

export class BlockAPI {
  static BLOCK_ID_ATTR_NAME = "data-block-id"; // ⚠️ if change, also change in `TextEditorStyle.css`
  static SELECTED_BLOCK_CLASS_NAME = "block-selected"; // ⚠️ if change, also change in `TextEditorStyle.css`
  static BLOCK_ELEMENT_SELECTOR = `[${BlockAPI.BLOCK_ID_ATTR_NAME}]`;
  static EMPTY_MARKER_ATTR_NAME = "data-empty";

  static isBlockHtmlString(str: string) {
    return str.startsWith("<div data-block-id");
  }

  static isBlock(element: Node): element is HTMLElement {
    return (
      element instanceof HTMLElement &&
      element.hasAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)
    );
  }

  static hasBlockAttr(element: Element) {
    return element.hasAttribute(BlockAPI.BLOCK_ID_ATTR_NAME);
  }

  private static genId() {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }

  static setId(element: HTMLElement, forceId?: string) {
    const id = forceId ?? this.genId();
    element.setAttribute(BlockAPI.BLOCK_ID_ATTR_NAME, id);
  }

  static setEmptyMarker(element: HTMLElement) {
    element.setAttribute(BlockAPI.EMPTY_MARKER_ATTR_NAME, "true");
  }

  static removeEmptyMarker(element: HTMLElement) {
    element.removeAttribute(BlockAPI.EMPTY_MARKER_ATTR_NAME);
  }

  static create(forceId?: string): HTMLElement {
    const div = document.createElement("div");
    this.setId(div, forceId);
    return div;
  }

  static wrapWithBlock(element: HTMLElement, forceId?: string) {
    const block = BlockAPI.create(forceId);
    block.appendChild(element.cloneNode(true));
    element.replaceWith(block);
  }

  static getCurrentCursorBlock(): HTMLElement | null {
    const range = CursorAPI.getRange();
    let parent: Node | null = DomAPI.unwrapTextNode(range.startContainer);

    while (parent && !BlockAPI.isBlock(parent)) {
      parent = parent.parentElement;
    }
    return parent as HTMLElement | null;
  }

  static getAll(element: HTMLElement): NodeListOf<HTMLElement> {
    return element.querySelectorAll(BlockAPI.BLOCK_ELEMENT_SELECTOR);
  }

  static getAllEmptyMarkedBlocks(element: HTMLElement): HTMLElement[] {
    return Array.from(
      element.querySelectorAll(`[${BlockAPI.EMPTY_MARKER_ATTR_NAME}="true"]`)
    );
  }

  static getByIndex(element: HTMLElement, index: number): HTMLElement | null {
    const blocks = this.getAll(element);
    if (index < 0 || index >= blocks.length) {
      return null;
    }
    return blocks[index];
  }

  static getByIndexRange(
    element: HTMLElement,
    start: number,
    end: number
  ): HTMLElement[] {
    const blocks = this.getAll(element);
    return Array.from(blocks).slice(start, end);
  }

  static getSelectedBlocks(element: HTMLElement): HTMLElement[] {
    const range = CursorAPI.getRange();
    const all = this.getAll(element);
    const selected: HTMLElement[] = [];
    all.forEach((element) => {
      const blockElement = element as HTMLElement;
      if (range.intersectsNode(blockElement)) {
        selected.push(blockElement);
      }
    });
    return selected;
  }

  static merge(blockElements: HTMLElement[] | HTMLElement, type: "ul" | "ol") {
    const blocks = Array.isArray(blockElements)
      ? blockElements
      : [blockElements];

    if (blocks.length === 0) {
      throw new Error("No block elements provided");
    }

    const newBlock = BlockAPI.create();
    switch (type) {
      case "ul":
      case "ol":
        const listEl = document.createElement(type);
        blocks.forEach((blockElement) => {
          const li = document.createElement("li");
          li.innerHTML = blockElement.innerHTML;
          listEl.appendChild(li);
        });
        newBlock.appendChild(listEl);
        const firstBlockElement = blocks[0];
        firstBlockElement.before(newBlock);
        blocks.forEach((blockElement) => {
          blockElement.remove();
        });
        break;
      default:
        throw new Error("unsupported block type");
    }

    return newBlock;
  }

  static getAncestorElements(textNode: Node): HTMLElement[] {
    const elements: HTMLElement[] = [];
    let cur: HTMLElement =
      textNode instanceof HTMLElement
        ? textNode
        : (textNode.parentElement as HTMLElement);
    while (!BlockAPI.isBlock(cur)) {
      elements.push(cur);
      const parent = (cur as HTMLElement).parentElement;
      if (parent) {
        cur = parent;
      } else {
        break;
      }
    }
    return elements;
  }

  static getDescendantElements(blockElement: HTMLElement): HTMLElement[] {
    if (!BlockAPI.isBlock(blockElement)) {
      throw new Error("Element is not a block element");
    }

    const elements: HTMLElement[] = [];
    const walker = document.createTreeWalker(
      blockElement,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
      if (currentNode instanceof HTMLElement) {
        elements.push(currentNode as HTMLElement);
      }
      currentNode = walker.nextNode();
    }

    return elements;
  }

  static stringify(blocks: HTMLElement[]) {
    const template = document.createElement("template");
    blocks.forEach((block) => {
      template.content.appendChild(block.cloneNode(true));
    });
    return template.innerHTML;
  }

  static parse(html: string) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
}
