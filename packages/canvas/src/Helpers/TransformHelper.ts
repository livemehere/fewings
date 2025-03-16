import { App } from "../App";
import { CNode } from "../CNode";
import { Shape } from "../Shapes/Shape";

export class TransformHelper {
  static isDraggable = (node: CNode) => {
    return node instanceof Shape && node.isStatic;
  };
  static draggable(app: App, node: CNode, axis: "x" | "y" | "xy") {
    let startY: number | null = null;
    let startX: number | null = null;
    let startBoundsX: number | null = null;
    let startBoundsY: number | null = null;

    let isDown = false;

    const offDown = node.on("pointerdown", (e) => {
      isDown = true;
      startX = e.pointerState.downX;
      startY = e.pointerState.downY;
      if (node instanceof Shape) {
        startBoundsX = node.bounds.x;
        startBoundsY = node.bounds.y;
      }
    });

    const offUp = app.on("pointerup", () => {
      isDown = false;
      startX = null;
      startY = null;
    });

    const offMove = app.on("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.pointerState.downX! - startX!;
      const dy = e.pointerState.downY! - startY!;

      if (node instanceof Shape) {
        if (axis.includes("x")) {
          node.bounds.x = startBoundsX! + dx;
        }
        if (axis.includes("y")) {
          node.bounds.y = startBoundsY! + dy;
        }
      }
    });

    return () => {
      offDown();
      offUp();
      offMove();
    };
  }
}
