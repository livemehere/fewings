import { useEffect, useRef } from "react";
import {
  App,
  Rect,
  Group,
  TransformHelper,
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

    const n = 5;
    for (let i = 0; i < n; i++) {
      const rect = new Rect({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        width: 100,
        height: 200,
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
        // debug: true,
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

    // app.render();
    app.startLoop();

    // const grid = new CustomShape({
    //   x: 0,
    //   y: 0,
    //   width: app.canvas.width,
    //   height: app.canvas.height,
    //   strokeStyle: "red",
    //   strokeWidth: 0.5,
    //   opacity: 0.5,
    //   drawPath: function (ctx) {
    //     const rows = app.canvas.width / 50;
    //     const cols = app.canvas.height / 50;
    //     ctx.beginPath();
    //     for (let i = 0; i < rows; i++) {
    //       ctx.beginPath();
    //       ctx.moveTo(0, i * 50);
    //       ctx.lineTo(app.canvas.width, i * 50);
    //       ctx.stroke();
    //     }
    //     for (let j = 0; j < cols; j++) {
    //       ctx.beginPath();
    //       ctx.moveTo(j * 50, 0);
    //       ctx.lineTo(j * 50, app.canvas.height);
    //       ctx.stroke();
    //     }
    //   },
    // });
    // app.stage.addChild(grid);

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

    return () => {
      listeners.forEach((l) => l());
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
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
