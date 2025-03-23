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
        node.x = startX! + app.resolveScaleV(dx);
      }
      if (axis.includes("y")) {
        node.y = startY! + app.resolveScaleV(dy);
      }
    });

    return () => {
      offDown();
      offUp();
      offMove();
    };
  }

  static enablePanning(
    app: App,
    {
      axis,
    }: {
      axis: TAxis;
    },
  ) {
    let startPanX: number;
    let startPanY: number;
    const offDown = app.on("pointerdown", (e) => {
      startPanX = app.panX;
      startPanY = app.panY;
      document.body.style.cursor = "grabbing";
    });
    const offMove = app.on("pointermove", (e) => {
      const {
        pointerState: { downX, downY, x, y, downTime },
      } = e;
      if (downTime && TransformHelper.draggingNode.size === 0) {
        if (axis.includes("x")) {
          const dx = x - downX!;
          app.panX = startPanX + app.resolveScaleV(dx);
        }
        if (axis.includes("y")) {
          const dy = y - downY!;
          app.panY = startPanY + app.resolveScaleV(dy);
        }
      }
    });
    const offUp = app.on("pointerup", () => {
      startPanX = app.panX;
      startPanY = app.panY;
      document.body.style.cursor = "grab";
    });

    return () => {
      offDown();
      offMove();
      offUp();
    };
  }
}
