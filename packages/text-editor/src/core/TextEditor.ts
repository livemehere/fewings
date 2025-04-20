import { Emitter } from "@fewings/core/classes";
import { BlockAPI } from "./BlockAPI";
import { CursorAPI } from "./CursorAPI";
import { InlineAPI } from "./InlineAPI";
import { DomAPI } from "./DomAPI";
import { rgbaToHex } from "../Helper/color";

export type TEditorMode = "edit" | "view";

export type TCursorStatus = {
  isH1: boolean;
  isH2: boolean;
  isH3: boolean;
  isH4: boolean;
  isH5: boolean;
  isH6: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isUnorderedList: boolean;
  isOrderedList: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  blockFontSize: string;
  color?: string;
  bgColor?: string;
  link?: string;
  curElements: HTMLElement[];
  curBlock: HTMLElement | null;
};

export type TActionValueMap = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  bold: undefined;
  italic: undefined;
  underline: undefined;
  strikethrough: undefined;
  removeStyle: undefined;
  unorderedList: undefined;
  orderedList: undefined;
  alignLeft: undefined;
  alignCenter: undefined;
  alignRight: undefined;
  color: string;
  bgColor: string;
  link: string;
  fontSize: string;
};

export type TEditorActionKeys = keyof TActionValueMap;

export interface TextEditorConfig {
  element: HTMLElement;
  initialHtml?: string;
  mode?: TEditorMode;
  spellcheck?: boolean;
}

export type TextEditorEvent = {
  blockAdded: (blockElement: HTMLElement) => void;
  cursorChanged: (cursorStatus: TCursorStatus) => void;
  //
  onChange: (html: string) => void;
  // TODO:
  // onKeyUp: (e: KeyboardEvent) => void;
  // onClick: (e: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onPaste: (e: ClipboardEvent) => void;
  onCopy: (e: ClipboardEvent) => void;
  onCut: (e: ClipboardEvent) => void;
  // onDrop: (e: DragEvent) => void;
  // onDragOver: (e: DragEvent) => void;
  // onDragLeave: (e: DragEvent) => void;
  // onDragEnter: (e: DragEvent) => void;
};

export class TextEditor extends Emitter<TextEditorEvent> {
  static TARGET_ELEMENT_ATTR_NAME = "data-editor-body";
  static TARGET_ELEMENT_SELECTOR = `[${TextEditor.TARGET_ELEMENT_ATTR_NAME}='true']`;

  readonly element: HTMLElement;
  private observer!: MutationObserver;
  private _mode: TEditorMode;
  private _spellcheck: boolean;
  private _initialHtml?: string;

  curBlock: HTMLElement | null = null;
  curElements: HTMLElement[] = [];

  constructor(config: TextEditorConfig) {
    super();
    this._mode = config.mode ?? "edit";
    this._spellcheck = config.spellcheck ?? true;
    this.element = config.element;
    this._initialHtml = config.initialHtml;
    this._initElement(this.element, this._mode, this._spellcheck);
    this._initListeners();
  }

  get mode() {
    return this._mode;
  }

  setMode(mode: TEditorMode) {
    this._mode = mode;
    this.element.contentEditable = mode === "edit" ? "true" : "false";
  }

  get spellcheck() {
    return this._spellcheck;
  }

  setSpellcheck(spellcheck: boolean) {
    this._spellcheck = spellcheck;
    this.element.spellcheck = spellcheck;
  }

  setHtml(html: string) {
    this.element.innerHTML = html;
    this._dispatchHtmlChange();
  }

  private _initListeners() {
    this.element.addEventListener("keyup", this._onKeyUp);
    this.element.addEventListener("click", this._onClick);
    document.addEventListener("selectionchange", this._onSelectionChange);

    this.element.addEventListener("keydown", this._onKeyDown);
    this.element.addEventListener("paste", this._onPaste);
    this.element.addEventListener("copy", this._onCopy);
    this.element.addEventListener("cut", this._onCut);
  }

  private _removeListeners() {
    this.element.removeEventListener("keyup", this._onKeyUp);
    this.element.removeEventListener("click", this._onClick);
    document.removeEventListener("selectionchange", this._onSelectionChange);

    this.element.removeEventListener("keydown", this._onKeyDown);
    this.element.removeEventListener("paste", this._onPaste);
    this.element.removeEventListener("copy", this._onCopy);
    this.element.removeEventListener("cut", this._onCut);
  }

  destroy() {
    this._removeListeners();
    this.observer.disconnect();
    super.removeAllListeners(); // Emitter
  }

  private _initElement(
    target: HTMLElement,
    mode: TEditorMode,
    spellcheck: boolean
  ) {
    this.setMode(mode);
    target.draggable = false;
    target.setAttribute(TextEditor.TARGET_ELEMENT_ATTR_NAME, "true");
    target.spellcheck = spellcheck;
    if (this._initialHtml) {
      target.innerHTML = this._initialHtml;
    }
    this._watchBlockAvailable();
  }

  /** Ensures that the first depth element is always defined as a block HTMLElement */
  private _watchBlockAvailable() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((newNode) => {
            if (BlockAPI.isBlock(newNode)) {
              BlockAPI.setId(newNode);
              if (newNode.firstChild instanceof HTMLDivElement) {
                newNode.innerHTML = "<br/>";
              }
              this.dispatch("blockAdded", newNode);
            } else {
              if (newNode instanceof HTMLElement) {
                BlockAPI.wrapWithBlock(newNode);
              }
            }
          });
        }
      });
    });

    this.observer.observe(this.element, {
      childList: true,
      subtree: false,
    });
  }

  private _dispatchCursorChanged() {
    if (!CursorAPI.isRangeInElement(this.element, CursorAPI.getRange())) return;
    const curElements = BlockAPI.getAncestorElements(
      CursorAPI.getRange().startContainer
    );
    const curBlock = BlockAPI.getCurrentCursorBlock();

    const cursorStatus: TCursorStatus = {
      isH1: false,
      isH2: false,
      isH3: false,
      isH4: false,
      isH5: false,
      isH6: false,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      isStrikethrough: false,
      isUnorderedList: false,
      isOrderedList: false,
      isAlignLeft: false,
      isAlignCenter: false,
      isAlignRight: false,
      blockFontSize: "16px",
      color: undefined,
      bgColor: undefined,
      link: undefined,
      curElements,
      curBlock,
    };
    curElements.forEach((el) => {
      if (el.tagName === "H1") cursorStatus.isH1 = true;
      if (el.tagName === "H2") cursorStatus.isH2 = true;
      if (el.tagName === "H3") cursorStatus.isH3 = true;
      if (el.tagName === "H4") cursorStatus.isH4 = true;
      if (el.tagName === "H5") cursorStatus.isH5 = true;
      if (el.tagName === "H6") cursorStatus.isH6 = true;
      if (el.tagName === "B") cursorStatus.isBold = true;
      if (el.tagName === "I") cursorStatus.isItalic = true;
      if (el.tagName === "U") cursorStatus.isUnderline = true;
      if (el.tagName === "STRIKE") cursorStatus.isStrikethrough = true;
      if (el.tagName === "UL") cursorStatus.isUnorderedList = true;
      if (el.tagName === "OL") cursorStatus.isOrderedList = true;

      if (el.tagName === "FONT" && cursorStatus.color === undefined) {
        cursorStatus.color = el.getAttribute("color") ?? undefined;
      }
      if (el.tagName === "SPAN" && cursorStatus.bgColor === undefined) {
        cursorStatus.bgColor = rgbaToHex(el.style.backgroundColor) ?? undefined;
      }

      if (el.tagName === "A") {
        cursorStatus.link = el.getAttribute("href") ?? undefined;
      }
    });

    if (curBlock) {
      const style = getComputedStyle(curBlock);
      if (style.textAlign === "left") cursorStatus.isAlignLeft = true;
      if (style.textAlign === "center") cursorStatus.isAlignCenter = true;
      if (style.textAlign === "right") cursorStatus.isAlignRight = true;
      cursorStatus.blockFontSize = style.fontSize;

      if (cursorStatus.color === undefined) {
        cursorStatus.color = rgbaToHex(style.color);
      }
      if (cursorStatus.bgColor === undefined) {
        cursorStatus.bgColor = rgbaToHex(style.backgroundColor);
      }
    }

    this.curElements = curElements;
    this.curBlock = curBlock;
    this.dispatch("cursorChanged", cursorStatus);
  }

  private _onSelectionChange = (_e: Event) => {
    this._updateSelectedBlock();
    this._dispatchCursorChanged();
  };

  private _dispatchHtmlChange() {
    const html = this.element.innerHTML;
    this.dispatch("onChange", html);
  }

  private _onPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData("text/plain");
    if (text && BlockAPI.isBlockHtmlString(text)) {
      e.preventDefault();
      const curBlock = BlockAPI.getCurrentCursorBlock();
      const blockFragment = BlockAPI.parse(text);
      if (curBlock) {
        curBlock.after(blockFragment);
      } else {
        this.element.appendChild(blockFragment);
      }
      this._dispatchHtmlChange();
    }

    this.dispatch("onPaste", e);
  };

  private _onCopy = (e: ClipboardEvent) => {
    const blocks = BlockAPI.getSelectedBlocks(this.element);
    if (blocks.length >= 2) {
      e.preventDefault();
      navigator.clipboard.writeText(BlockAPI.stringify(blocks)); // block html strings
    }
    this.dispatch("onCopy", e);
  };

  private _onCut = (e: ClipboardEvent) => {
    const blocks = BlockAPI.getSelectedBlocks(this.element);
    if (blocks.length >= 2) {
      e.preventDefault();
      navigator.clipboard.writeText(BlockAPI.stringify(blocks));
      blocks.forEach((block) => block.remove());
    }
    this._ensureEditorHasBlock();
    this._dispatchHtmlChange();
    this.dispatch("onCut", e);
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    this._ensureEditorHasBlock();
    this._dispatchHtmlChange();
    this._shortcutHandler(e);

    this.dispatch("onKeyDown", e);
  };

  private _onKeyUp = (_e: KeyboardEvent) => {
    this._ensureDisableBlockInBlock();
  };

  private _onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      e.preventDefault();
      const href = target.getAttribute("href");
      if (href) {
        // open in new tab
        window.open(href, "_blank");
      }
    }
  };

  private _ensureEditorHasBlock() {
    if (this.element.childNodes.length === 0) {
      const div = BlockAPI.create();
      // FIXME: unexpected work on actions (paste .. )
      // BlockAPI.setEmptyMarker(div);
      div.innerHTML = "<br/>";
      this.element.appendChild(div);
    }
  }

  private _updateSelectedBlock() {
    const allBlocks = BlockAPI.getAll(this.element);
    const range = CursorAPI.getRange();
    if (!range) return;
    allBlocks.forEach((block) => {
      if (range.intersectsNode(block)) {
        block.classList.add(BlockAPI.SELECTED_BLOCK_CLASS_NAME);
      } else {
        block.classList.remove(BlockAPI.SELECTED_BLOCK_CLASS_NAME);
      }
    });
  }

  private _ensureDisableBlockInBlock() {
    const curBlock = BlockAPI.getCurrentCursorBlock();
    if (!curBlock) return;
    if (curBlock.childNodes.length >= 2) {
      const lastChild = curBlock.lastChild!;
      if (
        (lastChild instanceof HTMLElement &&
          InlineAPI.isInlineElement(lastChild)) ||
        lastChild.nodeType === Node.TEXT_NODE
      )
        return;
      const clone = lastChild.cloneNode(true);
      curBlock.after(clone);
      lastChild.remove();
      CursorAPI.setCursor(clone);
    }
  }

  private async _shortcutHandler(e: KeyboardEvent) {
    //TODO: care about mac os actions. normally ctrlKey is cmdKey on mac os.
    if (e.key === "Tab") {
      e.preventDefault();
      const cur = CursorAPI.getRange();
      const ancestors = BlockAPI.getAncestorElements(cur.startContainer);
      const canTabAction = ancestors.some(
        (e) => e.tagName === "UL" || e.tagName === "OL"
      );
      if (canTabAction) {
        if (e.shiftKey) {
          InlineAPI.outdent();
        } else {
          InlineAPI.indent();
        }
        CursorAPI.setCursor(cur);
      }
    }
  }

  /**
   * FIXME: unexpected work on actions (paste .. )
   */
  // private _checkEmptyBlock() {
  //   requestAnimationFrame(() => {
  //     const curBlock = BlockAPI.getCurrentCursorBlock();
  //     const emptyMarkedBlocks = BlockAPI.getAllEmptyMarkedBlocks(this.element);
  //     emptyMarkedBlocks.forEach((block) => {
  //       if (block === curBlock) {
  //         if (curBlock.textContent === "") {
  //           BlockAPI.setEmptyMarker(block);
  //         } else {
  //           BlockAPI.removeEmptyMarker(block);
  //         }
  //       } else {
  //         BlockAPI.removeEmptyMarker(block);
  //       }
  //     });
  //   });
  // }

  action<T extends TEditorActionKeys>(action: T, value?: TActionValueMap[T]) {
    switch (action) {
      case "heading":
        if (
          typeof value !== "string" ||
          !["h1", "h2", "h3", "h4", "h5", "h6"].includes(value)
        ) {
          throw new Error(
            "TextEditor.apply: heading value must be a string and one of h1, h2, h3, h4, h5, h6"
          );
        }
        InlineAPI.heading(value as TActionValueMap["heading"]);
        break;
      case "bold":
        InlineAPI.bold();
        break;
      case "italic":
        InlineAPI.italic();
        break;
      case "underline":
        InlineAPI.underline();
        break;
      case "strikethrough":
        InlineAPI.strikethrough();
        break;
      case "removeStyle":
        InlineAPI.removeFormat();
        break;
      case "unorderedList":
        this._merge("ul");
        break;
      case "orderedList":
        this._merge("ol");
        break;
      case "alignLeft":
        InlineAPI.align("justifyLeft");
        break;
      case "alignCenter":
        InlineAPI.align("justifyCenter");
        break;
      case "alignRight":
        InlineAPI.align("justifyRight");
        break;
      case "color":
        InlineAPI.color(value as TActionValueMap["color"]);
        break;
      case "bgColor":
        InlineAPI.bgColor(value as TActionValueMap["bgColor"]);
        break;
      case "link":
        InlineAPI.link(value as TActionValueMap["link"]);
        break;
      case "fontSize":
        const block = BlockAPI.getCurrentCursorBlock();
        if (block) {
          block.style.fontSize = value as TActionValueMap["fontSize"];
        }
        break;
      default:
        throw new Error(`TextEditor.apply: unknown action ${action}`);
    }

    this._dispatchCursorChanged();
    // this._checkEmptyBlock();
  }

  private _merge(tagName: "ul" | "ol") {
    const range = CursorAPI.getRange();
    CursorAPI.preventApplyToEditor(this.element, range);

    const selectedElements = [];
    const start = DomAPI.unwrapInlineElement(range.startContainer);
    const end = DomAPI.unwrapInlineElement(range.endContainer);

    if (start === end) {
      selectedElements.push(start);
      if (BlockAPI.isBlock(start)) {
        const newEl = BlockAPI.merge(selectedElements, tagName);
        CursorAPI.setCursor(newEl);
      } else {
        const newEl = DomAPI.merge(selectedElements, tagName);
        CursorAPI.setCursor(newEl);
      }
      return;
    }

    let cur: HTMLElement | null = start;
    let hasBlock = false;
    let hasNormal = false;

    while (cur) {
      if (BlockAPI.isBlock(cur)) {
        hasBlock = true;
      } else {
        hasNormal = true;
      }
      selectedElements.push(cur);

      if (cur === end) break;
      cur = cur.nextElementSibling as HTMLElement;
    }

    if (hasBlock && !hasNormal) {
      BlockAPI.merge(selectedElements, tagName);
    } else if (!hasBlock && hasNormal) {
      DomAPI.merge(selectedElements, tagName);
    } else {
      throw new Error(
        "CursorAPI.merge: selected elements must be block or normal element"
      );
    }
  }

  toHtml() {
    return this.element.innerHTML;
  }
}
