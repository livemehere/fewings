export class VerticesHelper {
  static createBoxVertices(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    return [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height },
    ];
  }
}
