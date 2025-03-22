import { App } from "../Core/App";
import { CNode } from "../Core/CNode";

type TAxis = "x" | "y" | "xy";

export class TransformHelper {
  static draggingNode = new Set<CNode>();
  static draggable(app: App, node: CNode, axis: TAxis) {
    let startX: number | null = null;
    let startY: number | null = null;
    let isDown = false;

    const offDown = node.on("pointerdown", (e) => {
      e.stopPropagation(); // prevent concurrently dragging Shape and Container
      TransformHelper.draggingNode.add(node);
      isDown = true;

      startX = node.x;
      startY = node.y;
    });

    const offUp = app.on("pointerup", () => {
      isDown = false;
      TransformHelper.draggingNode.delete(node);
    });

    const offMove = app.on("pointermove", (e) => {
      if (!isDown) return;
      const dx = e.pointerState.x! - e.pointerState.downX!;
      const dy = e.pointerState.y! - e.pointerState.downY!;

      if (axis.includes("x")) {
        node.x = startX! + dx;
      }
      if (axis.includes("y")) {
        node.y = startY! + dy;
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

  static enablePanning(
    app: App,
    {
      axis,
    }: {
      axis: TAxis;
    }
  ) {
    let prevPanX = app.panX;
    let prevPanY = app.panY;
    const offDown = app.on("pointerdown", (e) => {
      prevPanX = app.panX;
      prevPanY = app.panY;
      document.body.style.cursor = "grabbing";
    });
    const offMove = app.on("pointermove", (e) => {
      const {
        pointerState: { downX, downY, x, y, downTime },
      } = e;
      if (downTime && TransformHelper.draggingNode.size === 0) {
        if (axis.includes("x")) {
          const dx = x - downX!;
          app.panX = prevPanX + dx;
        }
        if (axis.includes("y")) {
          const dy = y - downY!;
          app.panY = prevPanY + dy;
        }
      }
    });
    const offUp = app.on("pointerup", () => {
      prevPanX = app.panX;
      prevPanY = app.panY;
      document.body.style.cursor = "grab";
    });

    return () => {
      offDown();
      offMove();
      offUp();
    };
  }
}
