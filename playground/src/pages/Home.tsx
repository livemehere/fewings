import { useEffect, useRef } from 'react';
import {
  App,
  Rect,
  Group,
  TransformHelper,
  CustomShape,
  MathHelper,
} from '../../../packages/canvas/src';

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const app = new App({
      canvas: canvasRef.current,
      width: 1000,
      height: 1000,
    });

    appRef.current = app;

    const listeners: (() => void)[] = [];

    const group = new Group({ debug: true, rotate: MathHelper.degToRad(45) });

    app.stage.addChild(group);
    listeners.push(TransformHelper.draggable(app, group, 'xy'));

    const n = 5;
    for (let i = 0; i < n; i++) {
      const rect = new Rect({
        x: 100 + i * 100,
        y: 100 + i * 100,
        width: 100,
        height: 100,
        fillStyle: 'red',
        strokeStyle: 'blue',
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
        rotate: MathHelper.degToRad(45),
      });
      group.addChild(rect);
      listeners.push(
        rect.on('pointerenter', (e) => {
          e.target.fillStyle = 'green';
        })
      );
      listeners.push(
        rect.on('pointerleave', (e) => {
          e.target.fillStyle = 'black';
        })
      );

      listeners.push(TransformHelper.draggable(app, rect, 'xy'));
    }

    let panOff: (() => void) | null = null;
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === 'r') {
        group.rotate += 0.1;
      }

      if (e.key === ' ' && !panOff) {
        document.body.style.cursor = 'grab';
        panOff = TransformHelper.enablePanning(app, { axis: 'xy' });
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        if (panOff) {
          panOff();
          panOff = null;
          document.body.style.cursor = 'default';
        }
      }
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    app.startLoop();

    const grid = new CustomShape({
      x: 0,
      y: 0,
      width: app.canvas.width,
      height: app.canvas.height,
      strokeStyle: 'rgba(0, 0, 0, 0.3)',
      render: function (ctx) {
        const gap = app.stage.scale * 100;
        const rulerSize = 30;

        const startX = Math.floor(app.stage.x / gap) * gap;
        const startY = Math.floor(app.stage.y / gap) * gap;
        const totalW = app.canvas.width;
        const totalH = app.canvas.height;

        const offsetX = Math.floor(app.stage.x / gap);
        const offsetY = Math.floor(app.stage.y / gap);

        ctx.save();
        /** ruler indicator */
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, totalW, rulerSize);
        ctx.rect(0, 0, rulerSize, totalH);
        ctx.fillStyle = 'black';
        ctx.fill();

        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        const skipStep = Math.max(1, Math.floor(0.5 / app.stage.scale));

        const baseY = rulerSize / 2;
        const originOffset = {
          x: Math.floor(app.stage.x / gap),
          y: Math.floor(app.stage.y / gap),
        };
        const visibleLinesH = Math.ceil(totalW / gap) + 2;
        const visibleLinesV = Math.ceil(totalH / gap) + 2;
        for (let i = 0; i < visibleLinesH; i += skipStep) {
          const val = ((i + originOffset.x) * gap) / app.stage.scale;
          const x = i * gap - (app.stage.x % gap);

          if (x >= rulerSize && x <= totalW) {
            ctx.fillText(Math.round(val).toString(), x, baseY);
          }
        }

        const baseX = rulerSize / 2;
        for (let i = 0; i < visibleLinesV; i += skipStep) {
          const val = ((i + originOffset.y) * gap) / app.stage.scale;
          const y = i * gap - (app.stage.y % gap);

          if (y >= rulerSize && y <= totalH) {
            ctx.save();
            ctx.translate(baseX, y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(Math.round(val).toString(), 0, 0);
            ctx.restore();
          }
        }
        ctx.restore();

        ctx.beginPath();

        for (let i = 0; i < visibleLinesH; i++) {
          const x = i * gap - (app.stage.x % gap);
          if (x >= 0 && x <= totalW) {
            ctx.moveTo(x, rulerSize);
            ctx.lineTo(x, totalH);
          }
        }

        for (let i = 0; i < visibleLinesV; i++) {
          const y = i * gap - (app.stage.y % gap);
          if (y >= 0 && y <= totalH) {
            ctx.moveTo(rulerSize, y);
            ctx.lineTo(totalW, y);
          }
        }

        ctx.stroke();

        ctx.restore();
      },
      hitMapRender(ctx) {},
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
    const off = app.addLoop((app, deltaTime) => {
      // group.rotate += 0.01;
      // group.traverse((n) => {
      //   n.rotate -= 0.01;
      // });
      // group.setRotate(center, MathHelper.degToRad(angle));
    });

    const wheelHandler = (e: WheelEvent) => {
      app.stage.scale += -e.deltaY / 1000;
    };
    app.canvas.addEventListener('wheel', wheelHandler);

    return () => {
      listeners.forEach((l) => l());
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      app.canvas.removeEventListener('wheel', wheelHandler);
      app.clearLoops();
      off();
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
