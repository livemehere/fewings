import { BoxModel } from "../Models/BoxModel";
import { IRenderer } from "../types";

export abstract class Renderer implements IRenderer {
  abstract drawPath(ctx: CanvasRenderingContext2D, model: BoxModel): void;
  render(ctx: CanvasRenderingContext2D, model: BoxModel): void {
    this.renderRoutine(ctx, model, () => {
      this.drawPath(ctx, model);
    });
  }

  renderRoutine(
    ctx: CanvasRenderingContext2D,
    model: BoxModel,
    renderCallback: () => void
  ): void {
    ctx.save();
    // Apply opacity
    if (model.opacity !== undefined) {
      ctx.globalAlpha = model.opacity;
    }

    // Apply shadows
    if (model.shadowColor) {
      ctx.shadowColor = model.shadowColor;
      ctx.shadowBlur = model.shadowBlur || 0;
      ctx.shadowOffsetX = model.shadowOffsetX || 0;
      ctx.shadowOffsetY = model.shadowOffsetY || 0;
    }

    // Apply transforms
    const centerX = model.x + model.width / 2;
    const centerY = model.y + model.height / 2;

    // Handle rotation
    if (model.rotate !== undefined) {
      ctx.translate(centerX, centerY);
      ctx.rotate(model.rotate);
      ctx.translate(-centerX, -centerY);
    }

    // Handle scaling
    if (model.scaleX !== undefined || model.scaleY !== undefined) {
      ctx.translate(centerX, centerY);
      ctx.scale(model.scaleX || 1, model.scaleY || 1);
      ctx.translate(-centerX, -centerY);
    }

    ctx.lineDashOffset = model.lineDashOffset || 0;
    ctx.setLineDash(model.lineDash || []);

    // Handle fill
    if (model.fillStyle) {
      ctx.fillStyle = model.fillStyle;
    }

    // Handle stroke
    if (model.strokeStyle) {
      ctx.strokeStyle = model.strokeStyle;
      if (model.strokeWidth !== undefined) {
        ctx.lineWidth = model.strokeWidth;
      }
    }

    renderCallback();

    ctx.restore();
  }
}
