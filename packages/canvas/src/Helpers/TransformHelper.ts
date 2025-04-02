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
      const { x, y } = node.resolveTransform(dx, dy, app.dpr);
      if (axis.includes("x")) {
        node.x = startX! + x;
      }
      if (axis.includes("y")) {
        node.y = startY! + y;
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
    let startX: number;
    let startY: number;
    const offDown = app.on("pointerdown", (e) => {
      startX = app.stage.x;
      startY = app.stage.y;
      document.body.style.cursor = "grabbing";
    });
    const offMove = app.on("pointermove", (e) => {
      const {
        pointerState: { downX, downY, x, y, downTime },
      } = e;
      if (downTime && TransformHelper.draggingNode.size === 0) {
        const dx = x - downX!;
        const dy = y - downY!;
        const { x: _x, y: _y } = app.stage.resolveTransform(dx, dy, app.dpr);
        if (axis.includes("x")) {
          app.stage.x = startX + _x;
        }
        if (axis.includes("y")) {
          app.stage.y = startY + _y;
        }
      }
    });
    const offUp = app.on("pointerup", () => {
      startX = app.stage.x;
      startY = app.stage.y;
      document.body.style.cursor = "grab";
    });

    return () => {
      offDown();
      offMove();
      offUp();
    };
  }
}
