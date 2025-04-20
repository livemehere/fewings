import { DomAPI } from "./DomAPI";
import { TextEditor } from "./TextEditor";

export class CursorAPI {
  static getEditorElement() {
    return document.querySelector(TextEditor.TARGET_ELEMENT_SELECTOR);
  }

  static preventApplyToEditor(range: Range) {
    const editorEl = this.getEditorElement();
    if (!editorEl) {
      throw new Error("TextEditor Element not found");
    }

    if (
      range.startContainer === editorEl ||
      range.endContainer === editorEl ||
      !editorEl.contains(range.startContainer) ||
      !editorEl.contains(range.endContainer)
    ) {
      throw new Error("CursorAPI.validateMutate: range is a editor or outside");
    }
  }

  static getRange(): Range {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      throw new Error("[getRange] selection is null");
    }
    return selection.getRangeAt(0);
  }

  static createRangeFromElementTextNode(element: HTMLElement) {
    const range = document.createRange();
    const textNode = element.childNodes[0] as Text;
    if (!textNode) {
      throw new Error("[createRangeFromElementTextNode] textNode is null");
    }
    range.selectNodeContents(textNode);
    range.setEnd(textNode, textNode.textContent!.length);
    return range;
  }

  static setRange(range: Range) {
    const selection = window.getSelection();
    if (!selection) {
      throw new Error("[setRange] selection is null");
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }

  static setCursor(target: Node | Range) {
    if (target instanceof Node) {
      const range = document.createRange();
      range.selectNodeContents(target);
      this.setRange(range);
    } else {
      this.setRange(target);
    }
  }

  /**
   * @description should be `div.[data-id]` Node or `li` Node or (`div` Node)
   */
  static getCurrentHtmlElement(): HTMLElement | null {
    const range = this.getRange();
    let p: Node | null = range.commonAncestorContainer;
    while (p && p.nodeType === Node.TEXT_NODE) {
      p = p.parentNode;
    }
    if (p instanceof HTMLElement) {
      return p;
    }
    return null;
  }

  static getTextNodesInRange(range?: Range): Text[] {
    if (!range) {
      range = this.getRange();
    }
    const textNodes: Text[] = [];
    const startElement = DomAPI.unwrapTextNode(range.commonAncestorContainer);
    const walker = document.createTreeWalker(
      startElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as Text);
    }

    return textNodes;
  }

  static getTextNodesInRangeWithOffsets(range?: Range): Text[] {
    if (!range) {
      range = this.getRange();
    }
    const textNodes: Text[] = [];
    const startElement = DomAPI.unwrapTextNode(range.commonAncestorContainer);
    const walker = document.createTreeWalker(
      startElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );

    let i = 0;
    while (walker.nextNode()) {
      const cur = walker.currentNode as Text;
      if (i === 0) {
        const after = cur.splitText(range.startOffset);
        textNodes.push(after);
        walker.nextNode();
      } else {
        textNodes.push(cur);
      }
      i++;
    }

    const lastNode = textNodes[textNodes.length - 1];
    lastNode.splitText(range.endOffset);
    textNodes[textNodes.length - 1] = lastNode;

    return textNodes;
  }
}
