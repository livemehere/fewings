import { useEffect, useRef } from "react";
import {
  App,
  Rect,
  CustomShape,
  Ellipse,
  Group,
  TransformHelper,
  MathHelper,
} from "../../../packages/canvas/src";
import { Shape } from "../../../packages/canvas/src/Shapes/Shape";

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

    const rect = new Rect({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      attrs: {
        fillStyle: "red",
        strokeStyle: "blue",
        strokeWidth: 10,
        opacity: 0.5,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        lineDash: [10, 5],
        lineDashOffset: 10,
        round: [30, 10, 10, 30],
      },
      debug: true,
    });
    rect.addTag("my");

    const grid = new CustomShape({
      x: 0,
      y: 0,
      width: app.canvas.width,
      height: app.canvas.height,
      attrs: {
        strokeStyle: "red",
        strokeWidth: 0.5,
        opacity: 0.5,
      },

      drawPath: function (ctx) {
        const rows = app.canvas.width / 50;
        const cols = app.canvas.height / 50;
        ctx.beginPath();
        for (let i = 0; i < rows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 50);
          ctx.lineTo(app.canvas.width, i * 50);
          ctx.stroke();
        }
        for (let j = 0; j < cols; j++) {
          ctx.beginPath();
          ctx.moveTo(j * 50, 0);
          ctx.lineTo(j * 50, app.canvas.height);
          ctx.stroke();
        }
      },
    });
    app.stage.addChild(grid);

    const ellipse = new Ellipse({
      x: 600,
      y: 600,
      width: 100,
      height: 100,
      attrs: {
        fillStyle: "blue",
        strokeStyle: "red",
        strokeWidth: 10,
        lineDash: [10, 5],
        lineDashOffset: 10,
        opacity: 0.5,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
      },
      debug: true,
    });

    const offEnter = ellipse.on("pointerenter", (e) => {
      if (e.target instanceof Ellipse) {
        e.target.attrs.fillStyle = "green";
      }
    });

    const offLeave = ellipse.on("pointerleave", (e) => {
      if (e.target instanceof Ellipse) {
        e.target.attrs.fillStyle = "blue";
      }
    });

    app.render();

    const group = new Group({ renderBounds: true, debug: true });
    group.rotate = MathHelper.degToRad(45);
    group.addChild(rect);
    group.addChild(ellipse);
    app.stage.addChild(group);

    const offRectDrag = TransformHelper.draggable(app, rect, "xy");
    const offEllipseDrag = TransformHelper.draggable(app, ellipse, "xy");
    const offGroupDrag = TransformHelper.draggable(app, group, "xy");

    const off = app.addLoop((deltaTime) => {
      const target = app.stage.findAllByTag("my");
      const speed = deltaTime / 1000;
      for (const t of target) {
        if (t instanceof Shape) {
          t.rotate += speed;
        }
      }
    });

    return () => {
      off();
      offEnter();
      offLeave();
      offRectDrag();
      offEllipseDrag();
      offGroupDrag();
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
