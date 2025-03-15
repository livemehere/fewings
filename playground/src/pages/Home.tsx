import { useEffect, useRef } from "react";
import {
  App,
  RectShape,
  CustomShape,
  EllipseShape,
  MathHelper,
} from "../../../packages/canvas/src";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<App | null>(null);

  const run = () => {
    if (!canvasRef.current) return;
    const app = new App(canvasRef.current);
    appRef.current = app;
    const rect = new RectShape({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      drawOptions: {
        fillStyle: "red",
        strokeStyle: "blue",
        strokeWidth: 2,
        opacity: 0.5,
        scaleX: 2,
        scaleY: 2,
        rotate: MathHelper.degToRad(45),
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        lineDash: [10, 5],
        lineDashOffset: 10,
      },
    });
    app.stage.addShape(rect);

    const grid = new CustomShape({
      x: 0,
      y: 0,
      width: app.canvas.width,
      height: app.canvas.height,
      drawOptions: {
        strokeStyle: "red",
        strokeWidth: 0.5,
        opacity: 0.5,
      },
      state: {
        rows: app.canvas.width / 50,
        cols: app.canvas.height / 50,
      },
      drawPath: function (ctx) {
        ctx.beginPath();
        for (let i = 0; i < this.state.rows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 50);
          ctx.lineTo(app.canvas.width, i * 50);
          ctx.stroke();
        }
        for (let j = 0; j < this.state.cols; j++) {
          ctx.beginPath();
          ctx.moveTo(j * 50, 0);
          ctx.lineTo(j * 50, app.canvas.height);
          ctx.stroke();
        }
      },
    });
    app.stage.addShape(grid);

    const ellipse = new EllipseShape({
      x: 300,
      y: 300,
      width: 100,
      height: 100,
      drawOptions: {
        fillStyle: "blue",
        strokeStyle: "red",
        strokeWidth: 10,
        lineDash: [10, 5],
        lineDashOffset: 10,
        opacity: 0.5,
        scaleX: 2,
        scaleY: 2,
        rotate: MathHelper.degToRad(45),
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
      },
    });
    app.stage.addShape(ellipse);
    app.render();
  };

  useEffect(() => {
    run();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <canvas ref={canvasRef} width={1000} height={1000} />
    </div>
  );
};

export default Home;
