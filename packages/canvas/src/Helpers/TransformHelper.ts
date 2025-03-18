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
    const childStartPositions = new Map<CNode, { x: number; y: number }>();

    const offDown = node.on("pointerdown", (e) => {
      e.stopPropagation(); // prevent concurrently dragging Shape and Container
      isDown = true;
      startX = e.pointerState.downX;
      startY = e.pointerState.downY;

      if (node instanceof Shape) {
        startBoundsX = node.x;
        startBoundsY = node.y;
      } else if (node instanceof Container) {
        // Group, Frame
        startBoundsX = node.x;
        startBoundsY = node.y;

        // Store initial positions of children
        node.children.forEach((child) => {
          childStartPositions.set(child, { x: child.x, y: child.y });
        });
      }
    });

    const offUp = app.on("pointerup", () => {
      isDown = false;
      startX = null;
      startY = null;
      childStartPositions.clear(); // Clear positions on mouse up
    });

    const offMove = app.on("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.pointerState.downX! - startX!;
      const dy = e.pointerState.downY! - startY!;

      if (axis.includes("x")) {
        if (node instanceof Shape) {
          node.x = startBoundsX! + dx;
        } else if (node instanceof Group) {
          childStartPositions.forEach((pos, child) => {
            child.x = pos.x + dx;
          });
        }
      }
      if (axis.includes("y")) {
        if (node instanceof Shape) {
          node.y = startBoundsY! + dy;
        } else if (node instanceof Group) {
          childStartPositions.forEach((pos, child) => {
            child.y = pos.y + dy;
          });
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
