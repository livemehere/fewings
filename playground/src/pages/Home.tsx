import { useEffect, useRef } from "react";
import {
  App,
  Rect,
  Group,
  TransformHelper,
  CustomShape,
} from "../../../packages/canvas/src";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const app = new App({
      canvas: canvasRef.current,
      width: 1000,
      height: 1000,
      debug: true,
    });

    appRef.current = app;

    const listeners: (() => void)[] = [];

    const group = new Group({
      showBounds: true,
    });
    app.stage.addChild(group);
    listeners.push(TransformHelper.draggable(app, group, "xy"));

    const n = 3;
    for (let i = 0; i < n; i++) {
      const rect = new Rect({
        x: 100 + i * 100,
        y: 100 + i * 100,
        width: 100,
        height: 100,
        fillStyle: "red",
        strokeStyle: "blue",
        strokeWidth: 10,
        // opacity: 0.5,
        // shadowColor: "black",
        // shadowBlur: 10,
        // shadowOffsetX: 10,
        // shadowOffsetY: 10,
        // lineDash: [10, 5],
        // lineDashOffset: 10,
        // round: [30, 10, 10, 30],
        debug: true,
        // rotate: MathHelper.degToRad(45),
      });
      group.addChild(rect);
      listeners.push(
        rect.on("pointerenter", (e) => {
          e.target.fillStyle = "green";
        })
      );
      listeners.push(
        rect.on("pointerleave", (e) => {
          e.target.fillStyle = "red";
        })
      );

      listeners.push(TransformHelper.draggable(app, rect, "xy"));
    }

    group.updatePivot("center");

    let panOff: (() => void) | null = null;
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === "r") {
        group.rotate += 0.1;
      }
      if (e.key === "e") {
        group.renderBounds = !group.renderBounds;
      }

      if (e.key === " " && !panOff) {
        document.body.style.cursor = "grab";
        panOff = TransformHelper.enablePanning(app, { axis: "xy" });
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (panOff) {
          panOff();
          panOff = null;
          document.body.style.cursor = "default";
        }
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    app.on("pointerdown", (e) => {
      const downX = e.pointerState.downX;
      console.log(downX, app.toAbsX(downX));
    });

    // app.render();
    app.startLoop();

    const grid = new CustomShape({
      x: 0,
      y: 0,
      width: app.canvas.width,
      height: app.canvas.height,
      strokeStyle: "rgba(0, 0, 0, 0.3)",
      drawPath: function (ctx) {
        const baseGridSize = 100;

        const scaledPanX = app.resolveScaleV(app.panX);
        const scaledPanY = app.resolveScaleV(app.panY);

        const gridSize = app.resolveScaleV(baseGridSize);

        const offsetX = ((scaledPanX % gridSize) + gridSize) % gridSize;
        const offsetY = ((scaledPanY % gridSize) + gridSize) % gridSize;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.lineWidth = 1;

        for (let x = offsetX; x <= app.canvas.width + gridSize; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, app.canvas.height);
        }

        for (
          let y = offsetY;
          y <= app.canvas.height + gridSize;
          y += gridSize
        ) {
          ctx.moveTo(0, y);
          ctx.lineTo(app.canvas.width, y);
        }

        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const startCol = Math.floor(-app.panX / baseGridSize);
        const startRow = Math.floor(-app.panY / baseGridSize);

        const step = 1;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#3d3d3d";
        ctx.rect(0, 0, app.canvas.width, 50);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#7C7C7C";
        ctx.font = "25px Arial";
        for (let x = offsetX; x <= app.canvas.width; x += gridSize * step) {
          const colIndex = Math.round((x - offsetX) / gridSize);
          const col = startCol + colIndex;

          ctx.fillText(`${col * baseGridSize}`, x, 24);
        }
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#3d3d3d";
        ctx.rect(0, 50, 50, app.canvas.height - 50);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#7C7C7C";
        ctx.font = "25px Arial";
        for (let y = offsetY; y <= app.canvas.height; y += gridSize * step) {
          const rowIndex = Math.round((y - offsetY) / gridSize);
          const row = startRow + rowIndex;
          ctx.save();
          ctx.translate(30, y);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(`${row * baseGridSize}`, 0, 0);
          ctx.restore();
        }
        ctx.closePath();
        ctx.restore();

        ctx.restore();
      },
    });
    app.stage.addChild(grid);
    // const rect2 = new Rect({
    //   x: 600,
    //   y: 300,
    //   width: 100,
    //   height: 100,
    //   fillStyle: "blue",
    //   strokeStyle: "red",
    //   strokeWidth: 10,
    //   lineDash: [10, 5],
    //   lineDashOffset: 10,
    //   opacity: 0.5,
    //   shadowColor: "black",
    //   shadowBlur: 10,
    //   shadowOffsetX: 10,
    //   shadowOffsetY: 10,
    //   debug: true,
    //   round: [30, 10, 10, 30],
    // });

    // const offEnter = rect2.on("pointerenter", (e) => {
    //   if (e.target instanceof Rect) {
    //     e.target.fillStyle = "green";
    //   }
    // });

    // const offLeave = rect2.on("pointerleave", (e) => {
    //   if (e.target instanceof Rect) {
    //     e.target.fillStyle = "blue";
    //   }
    // });

    // app.render();

    // const group = new Group({
    //   renderBounds: true,
    //   debug: true,
    // });
    // group.addChild(rect);
    // group.addChild(rect2);
    // const b = group.getBounds();
    // const center = {
    //   x: b.x + b.width / 2,
    //   y: b.y + b.height / 2,
    // };

    // group.setRotate(center, MathHelper.degToRad(15));

    // app.stage.addChild(group);

    // const offRectDrag = TransformHelper.draggable(app, rect, "xy");
    // const offRect2Drag = TransformHelper.draggable(app, rect2, "xy");
    // const offGroupDrag = TransformHelper.draggable(app, group, "xy");

    // let angle = 0;
    // const off = app.addLoop((deltaTime) => {
    //   angle += 0.01;
    //   // group.setRotate(center, MathHelper.degToRad(angle));
    // });

    const wheelHandler = (e: WheelEvent) => {
      app.scale += -e.deltaY / 1000;
    };
    app.canvas.addEventListener("wheel", wheelHandler);

    return () => {
      listeners.forEach((l) => l());
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      app.canvas.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Home;
