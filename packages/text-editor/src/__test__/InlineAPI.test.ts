import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { InlineAPI } from "../core/InlineAPI";

describe("InlineAPI", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  describe("isInlineElement", () => {
    it("should return true for known inline tags", () => {
      InlineAPI.INLINE_TAGS.forEach((tag) => {
        const el = document.createElement(tag);
        expect(InlineAPI.isInlineElement(el)).toBe(true);
      });
    });

    it("should return false for non-inline or unknown tags", () => {
      const tags = ["div", "p", "section", "ul"];
      tags.forEach((tag) => {
        const el = document.createElement(tag);
        expect(InlineAPI.isInlineElement(el)).toBe(false);
      });
    });
  });

  describe("wrap", () => {
    it("should wrap a text node with the given tag", () => {
      const parent = document.createElement("div");
      const textNode = document.createTextNode("hello");
      parent.appendChild(textNode);
      container.appendChild(parent);

      InlineAPI.wrap(textNode, "B");

      const wrapped = parent.querySelector("B");
      expect(wrapped).not.toBeNull();
      expect(wrapped?.textContent).toBe("hello");
    });
  });
});
