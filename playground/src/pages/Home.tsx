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
        }),
      );
      listeners.push(
        rect.on("pointerleave", (e) => {
          e.target.fillStyle = "red";
        }),
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
        const gap = 100;
        const rulerSize = 30;

        const startX = app.panX % gap;
        const startY = app.panY % gap;
        const totalW = app.canvas.width;
        const totalH = app.canvas.height;

        const offsetX = Math.floor(app.panX / gap);
        const offsetY = Math.floor(app.panY / gap);

        ctx.save();
        app.resetTransform(ctx);

        /** ruler indicator */
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, totalW, rulerSize);
        ctx.rect(0, 0, rulerSize, totalH);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "20px Arial";
        ctx.fillStyle = "red";
        for (let i = 0; i < totalW; i += 1) {
          const x = startX + i * gap;
          const y = rulerSize / 1.5;
          const v = (i - offsetX) * gap;
          ctx.fillText(v.toString(), x, y);
        }
        for (let i = 0; i < totalH; i += 1) {
          const x = rulerSize / 1.5;
          const y = startY + i * gap;
          const v = i - offsetY;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(v.toString(), 0, 0);
          ctx.restore();
        }
        ctx.restore();

        ctx.scale(app.scale, app.scale);
        for (let i = 0; i < totalW; i += gap) {
          ctx.moveTo(i + startX, 0);
          ctx.lineTo(i + startX, totalH);
        }
        for (let i = 0; i < totalH; i += gap) {
          ctx.moveTo(0, i + startY);
          ctx.lineTo(totalW, i + startY);
        }
        ctx.stroke();

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
