import { App } from "../App";
import { CNode } from "../CNode";
import { Container } from "../Containers/Container";
import { Group } from "../Containers/Group";
import { Shape } from "../Shapes/Shape";

export class TransformHelper {
  static isDraggable = (node: CNode) => {
    return (
      !node.isStatic && (node instanceof Shape || node instanceof Container)
    );
  };
  static draggable(app: App, node: CNode, axis: "x" | "y" | "xy") {
    if (!TransformHelper.isDraggable(node)) {
      throw new Error(`node ${node} is not draggable`);
    }
    let startY: number | null = null;
    let startX: number | null = null;
    let startBoundsX: number | null = null;
    let startBoundsY: number | null = null;

    let isDown = false;

    const offDown = node.on("pointerdown", (e) => {
      e.stopPropagation(); // prevent concurrently dragging Shape and Container
      isDown = true;
      startX = e.pointerState.downX;
      startY = e.pointerState.downY;
      if (node instanceof Shape) {
        startBoundsX = node.bounds.x;
        startBoundsY = node.bounds.y;
      } else if (node instanceof Container) {
        // Group, Frame
        startBoundsX = node.x;
        startBoundsY = node.y;
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

      if (axis.includes("x")) {
        if (node instanceof Shape) {
          node.bounds.x = startBoundsX! + dx;
        } else if (node instanceof Group) {
          node.x = startBoundsX! + dx;
        }
      }
      if (axis.includes("y")) {
        if (node instanceof Shape) {
          node.bounds.y = startBoundsY! + dy;
        } else if (node instanceof Group) {
          node.y = startBoundsY! + dy;
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
