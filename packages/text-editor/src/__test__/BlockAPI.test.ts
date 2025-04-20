import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BlockAPI } from "../core/BlockAPI";
import { CursorAPI } from "../core/CursorAPI";

describe("BlockAPI", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  describe("isBlock", () => {
    it("should return true for div with data-block-id", () => {
      const div = document.createElement("div");
      div.setAttribute(BlockAPI.BLOCK_ID_ATTR_NAME, "abc");
      expect(BlockAPI.isBlock(div)).toBe(true);
    });

    it("should return false for div without data-block-id", () => {
      const div = document.createElement("div");
      expect(BlockAPI.isBlock(div)).toBe(false);
    });
  });

  describe("setId & create", () => {
    it("should set generated id to element", () => {
      const el = document.createElement("div");
      BlockAPI.setId(el);
      expect(el.hasAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)).toBe(true);
    });

    it("should set provided id to element", () => {
      const el = document.createElement("div");
      BlockAPI.setId(el, "custom-id");
      expect(el.getAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)).toBe("custom-id");
    });

    it("should create a block div with id", () => {
      const block = BlockAPI.create();
      expect(block.tagName).toBe("DIV");
      expect(block.hasAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)).toBe(true);
    });
  });

  describe("wrapWithBlock", () => {
    it("should wrap an element in a block div", () => {
      const span = document.createElement("span");
      span.textContent = "text";
      container.appendChild(span);

      BlockAPI.wrapWithBlock(span, "wrapped");

      const wrappedBlock = container.querySelector("div");
      expect(wrappedBlock).not.toBeNull();
      expect(wrappedBlock?.getAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)).toBe(
        "wrapped"
      );
      expect(wrappedBlock?.querySelector("span")?.textContent).toBe("text");
    });
  });

  describe("getCurrentCursorBlock", () => {
    it("should return parent block of current selection", () => {
      const block = BlockAPI.create();
      const span = document.createElement("span");
      span.textContent = "text";
      block.appendChild(span);
      container.appendChild(block);

      const range = document.createRange();
      range.selectNodeContents(span);

      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const result = BlockAPI.getCurrentCursorBlock();
      expect(result).toBe(block);
    });

    it("should return null if no block found", () => {
      const p = document.createElement("p");
      p.textContent = "text";
      container.appendChild(p);

      const range = document.createRange();
      range.selectNodeContents(p);

      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const result = BlockAPI.getCurrentCursorBlock();
      expect(result).toBeNull();
    });
  });

  describe("getAll / getByIndex / getByIndexRange", () => {
    it("should return all block elements in container", () => {
      const b1 = BlockAPI.create("1");
      const b2 = BlockAPI.create("2");
      container.append(b1, b2);

      const blocks = BlockAPI.getAll(container);
      expect(blocks.length).toBe(2);
    });

    it("should return block by index", () => {
      const b1 = BlockAPI.create("1");
      const b2 = BlockAPI.create("2");
      container.append(b1, b2);

      expect(BlockAPI.getByIndex(container, 0)).toBe(b1);
      expect(BlockAPI.getByIndex(container, 1)).toBe(b2);
      expect(BlockAPI.getByIndex(container, 2)).toBeNull();
    });

    it("should return getByIndexRange of blocks", () => {
      const b1 = BlockAPI.create("1");
      const b2 = BlockAPI.create("2");
      const b3 = BlockAPI.create("3");
      container.append(b1, b2, b3);

      const blocks = BlockAPI.getByIndexRange(container, 0, 2);
      expect(blocks.length).toBe(2);
      expect(blocks[0]).toBe(b1);
      expect(blocks[1]).toBe(b2);
    });
  });

  describe("getSelectedBlocks", () => {
    it("should return blocks that intersect with range", () => {
      const block1 = BlockAPI.create("b1");
      block1.textContent = "Block One";
      const block2 = BlockAPI.create("b2");
      block2.textContent = "Block Two";

      container.append(block1, block2);

      const range = document.createRange();
      range.selectNodeContents(block2);

      vi.spyOn(CursorAPI, "getRange").mockReturnValue(range);

      const selected = BlockAPI.getSelectedBlocks(container);
      expect(selected).toContain(block2);
      expect(selected).not.toContain(block1);
    });
  });

  describe("merge", () => {
    it("should merge block elements into ul or ol", () => {
      const b1 = BlockAPI.create();
      const b2 = BlockAPI.create();
      b1.innerHTML = "Item 1";
      b2.innerHTML = "Item 2";
      container.append(b1, b2);

      BlockAPI.merge([b1, b2], "ul");

      const ul = container.querySelector("ul");
      expect(ul?.children.length).toBe(2);
      expect(ul?.children[0].tagName).toBe("LI");
      expect(ul?.children[0].innerHTML).toBe("Item 1");

      const block = ul?.parentElement;
      expect(block?.tagName).toBe("DIV");
      expect(block?.getAttribute(BlockAPI.BLOCK_ID_ATTR_NAME)).toBeDefined();
    });

    it("should throw error on empty block list", () => {
      expect(() => BlockAPI.merge([], "ul")).toThrow(
        "No block elements provided"
      );
    });

    it("should throw error on unsupported type", () => {
      const block = BlockAPI.create();
      container.append(block);
      expect(() => BlockAPI.merge(block, "div" as any)).toThrow(
        "unsupported block type"
      );
    });
  });

  describe("getAncestorElements", () => {
    it("return all compositions of a node", () => {
      const b1 = BlockAPI.create();
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      const b = document.createElement("b");
      const textNode = document.createTextNode("Hello");
      b.appendChild(textNode);
      li.appendChild(b);
      ul.appendChild(li);
      b1.appendChild(ul);
      const compositions = BlockAPI.getAncestorElements(textNode);
      expect(compositions.length).toBe(3);
      expect(compositions[0].tagName).toBe("B");
      expect(compositions[1].tagName).toBe("LI");
      expect(compositions[2].tagName).toBe("UL");
    });
  });
});
