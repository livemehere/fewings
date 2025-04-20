import { describe, it, expect } from 'vitest';
import { DomAPI } from '../core/DomAPI';

describe('DomAPI', () => {
  describe('unwrapTextNode', () => {
    it('should return the parent element if given a text node', () => {
      const div = document.createElement('div');
      div.textContent = 'Hello';
      const textNode = div.firstChild!;

      const result = DomAPI.unwrapTextNode(textNode);
      expect(result).toBe(div);
    });

    it('should return the element itself if given an element node', () => {
      const span = document.createElement('span');
      const result = DomAPI.unwrapTextNode(span);
      expect(result).toBe(span);
    });
  });

  describe('unwrapInlineElement', () => {
    it('should unwrap until it finds a block element', () => {
      const div = document.createElement('div');
      const span = document.createElement('span');
      const b = document.createElement('b');
      const text = document.createTextNode('inline text');

      b.appendChild(text);
      span.appendChild(b);
      div.appendChild(span);

      const result = DomAPI.unwrapInlineElement(text);
      expect(result).toBe(div);
    });

    it('should return the same block element if node is not wrapped in inline elements', () => {
      const div = document.createElement('div');
      const text = document.createTextNode('block level');
      div.appendChild(text);

      const result = DomAPI.unwrapInlineElement(text);
      expect(result).toBe(div);
    });
  });

  describe('merge', () => {
    it('should wrap multiple elements with the given tag', () => {
      const el1 = document.createElement('li');
      el1.textContent = 'Item 1';

      const el2 = document.createElement('li');
      el2.textContent = 'Item 2';

      const container = document.createElement('div');
      container.append(el1, el2);
      document.body.appendChild(container);

      DomAPI.merge([el1, el2], 'ul');

      const merged = container.querySelector('ul');
      expect(merged).not.toBeNull();
      expect(merged?.children.length).toBe(2);
      expect(merged?.tagName).toBe('UL');
    });
  });
});
