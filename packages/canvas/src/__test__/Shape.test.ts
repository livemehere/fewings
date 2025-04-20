import { describe, it, expect } from 'vitest';
import { Shape } from '../Shapes/Shape';
import { Rect } from '../Shapes/Rect';

describe('Shape', () => {
  let shape: Shape;
  beforeEach(() => {
    shape = new Rect({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  });

  it('should have correct initial position and dimensions', () => {
    expect(shape.x).toBe(0);
    expect(shape.y).toBe(0);
    expect(shape.width).toBe(100);
    expect(shape.height).toBe(100);
  });

  it('should have defined vertices and correct bounds', () => {
    expect(shape.vertices).toBeDefined();
    expect(shape.getBounds()).toEqual({
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
    });
  });

  it('should resize correctly and update vertices', () => {
    shape.width = 200;
    shape.height = 200;
    expect(shape.vertices).toEqual([
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 200, y: 200 },
      { x: 0, y: 200 },
    ]);
    expect(shape.getBounds()).toEqual({
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
    });
  });

  it('should move correctly and update vertices', () => {
    shape.x = 100;
    shape.y = 100;
    expect(shape.vertices).toEqual([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ]);
    expect(shape.getBounds()).toEqual({
      left: 100,
      top: 100,
      right: 200,
      bottom: 200,
    });
  });

  it('should calculate and return the center point correctly', () => {
    expect(shape.getCenter()).toEqual({ x: 50, y: 50 });
  });

  it.todo('toJSON');
  it.todo('fromJSON');
  it.todo('clone');
});
