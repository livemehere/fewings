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
    let startBoundsX: number | null = null;
    let startBoundsY: number | null = null;

    let isDown = false;
    const childStartPositions = new Map<CNode, { x: number; y: number }>();

    const offDown = node.on("pointerdown", (e) => {
      e.stopPropagation(); // prevent concurrently dragging Shape and Container
      isDown = true;

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
      childStartPositions.clear(); // Clear positions on mouse up
    });

    const offMove = app.on("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.pointerState.x! - e.pointerState.downX!;
      const dy = e.pointerState.y! - e.pointerState.downY!;
      const { dx: absoluteDx, dy: absoluteDy } =
        TransformHelper.resolveAbsoluteDirection(node, dx, dy);

      console.log(e.pointerState.downY, dy);

      if (axis.includes("x")) {
        if (node instanceof Shape) {
          node.x = startBoundsX! + absoluteDx;
        } else if (node instanceof Group) {
          childStartPositions.forEach((pos, child) => {
            child.x = pos.x + absoluteDx;
          });
        }
      }
      if (axis.includes("y")) {
        if (node instanceof Shape) {
          node.y = startBoundsY! + absoluteDy;
        } else if (node instanceof Group) {
          childStartPositions.forEach((pos, child) => {
            child.y = pos.y + absoluteDy;
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

  static resolveAbsoluteDirection(node: CNode, dx: number, dy: number) {
    // node 본인을 제외하고 부모를 찾아가면서 rotate 값을 풀면서 회전되어있는 상태에서도 절대 방향으로 움직이기 위한 값을 변환해서 반환
    let parent = node.parent;
    let _dx = dx;
    let _dy = dy;
    while (parent) {
      const radian = parent.rotate;
      const cos = Math.cos(-radian);
      const sin = Math.sin(-radian);

      const tempDx = _dx * cos - _dy * sin;
      const tempDy = _dx * sin + _dy * cos;
      _dx = tempDx;
      _dy = tempDy;
      parent = parent.parent;
    }
    return { dx: _dx, dy: _dy };
  }
}
