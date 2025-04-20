import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TextEditor } from "../core/TextEditor";
import { CursorAPI } from "../core/CursorAPI";

describe("CursorAPI", () => {
  let container: HTMLElement;
  function getEditorElement() {
    return document.querySelector(
      TextEditor.TARGET_ELEMENT_SELECTOR,
    ) as HTMLElement;
  }

  beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute(TextEditor.TARGET_ELEMENT_ATTR_NAME, "true");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  describe("preventApplyToEditor", () => {
    it("should throw if range is directly inside editor", () => {
      const range = document.createRange();
      const editor = getEditorElement();
      range.setStart(editor, 0);
      range.setEnd(editor, 0);

      expect(() => CursorAPI.preventApplyToEditor(editor, range)).toThrow();
    });

    it("should do nothing if range is not inside editor element", () => {
      const child = document.createElement("div");
      const editor = getEditorElement();
      container.appendChild(child);
      const range = document.createRange();
      range.setStart(child, 0);
      range.setEnd(child, 0);

      expect(() => CursorAPI.preventApplyToEditor(editor, range)).not.toThrow();
    });
  });

  describe("getRange / setRange", () => {
    it("should return current range", () => {
      const span = document.createElement("span");
      span.textContent = "text";
      container.appendChild(span);
      const range = document.createRange();
      range.selectNodeContents(span);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      const result = CursorAPI.getRange();
      expect(result).toEqual(range);
    });

    it("should set current range", () => {
      const span = document.createElement("span");
      span.textContent = "test";
      container.appendChild(span);

      const range = document.createRange();
      range.selectNodeContents(span);

      CursorAPI.setRange(range);

      const selection = window.getSelection();
      expect(selection?.rangeCount).toBe(1);
      expect(selection?.getRangeAt(0)).toEqual(range);
    });
  });

  describe("setCursor", () => {
    it("should set range on given node", () => {
      const span = document.createElement("span");
      span.textContent = "hi";
      container.appendChild(span);

      CursorAPI.setCursor(span);

      const selection = window.getSelection();
      expect(selection?.getRangeAt(0).startContainer).toBe(span);
      expect(selection?.getRangeAt(0).endContainer).toBe(span);
    });
  });

  describe("getCurrentHtmlElement", () => {
    it("should return htmlElement node for text selection", () => {
      const div = document.createElement("div");
      div.textContent = "Hello";
      container.appendChild(div);

      const range = document.createRange();
      range.selectNodeContents(div.firstChild!);
      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const el = CursorAPI.getCurrentHtmlElement();
      expect(el).toBe(div);
    });
  });

  describe("getTextNodesInRange", () => {
    it("should return all text nodes within the range", () => {
      const div = document.createElement("div");
      div.innerHTML = `<p>Hello</p><p>World</p>`;
      container.appendChild(div);

      const range = document.createRange();
      range.selectNodeContents(div);
      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const textNodes = CursorAPI.getTextNodesInRange();
      const texts = textNodes.map((n) => n.textContent);
      expect(texts).toEqual(["Hello", "World"]);
    });
  });

  describe("getTextNodesInRangeWithOffsets", () => {
    it("should split and return only the selected parts of text nodes", () => {
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const text1 = document.createTextNode("Hello");
      const text2 = document.createTextNode("World");
      p1.appendChild(text1);
      p2.appendChild(text2);
      container.append(p1, p2);

      // Create a range from "llo" (offset 2 in 'Hello') to "Wo" (offset 2 in 'World')
      const range = document.createRange();
      range.setStart(text1, 2); // 'llo'
      range.setEnd(text2, 2); // 'Wo'
      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const result = CursorAPI.getTextNodesInRangeWithOffsets();
      const texts = result.map((n) => n.textContent);
      expect(texts).toEqual(["llo", "Wo"]);

      const allText = Array.from(container.querySelectorAll("p")).flatMap((p) =>
        Array.from(p.childNodes).map((n) => n.textContent),
      );
      expect(allText).toEqual(["He", "llo", "Wo", "rld"]);
    });

    it("should handle single text node with partial selection", () => {
      const p = document.createElement("p");
      const text = document.createTextNode("HelloWorld");
      p.appendChild(text);
      container.appendChild(p);

      const range = document.createRange();
      range.setStart(text, 2); // 'lloWor'
      range.setEnd(text, 8);
      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const result = CursorAPI.getTextNodesInRangeWithOffsets();
      const texts = result.map((n) => n.textContent);
      expect(texts).toEqual(["lloWor"]);

      const domTexts = Array.from(p.childNodes).map((n) => n.textContent);
      expect(domTexts).toEqual(["He", "lloWor", "ld"]);
    });
  });

  describe.skip("CursorAPI.merge (real DOM)", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement("div");
      container.setAttribute(TextEditor.TARGET_ELEMENT_ATTR_NAME, "true");
      document.body.appendChild(container);

      vi.spyOn(CursorAPI, "getEditorElement").mockReturnValue(container);
    });

    afterEach(() => {
      document.body.innerHTML = "";
      vi.restoreAllMocks();
    });
  });
});
