import { IPoint } from '../types';

export class MathHelper {
  static degToRad(deg: number) {
    return (deg * Math.PI) / 180;
  }

  static radToDeg(rad: number) {
    return (rad * 180) / Math.PI;
  }

  static rotateMatrix(points: IPoint[], angle: number, pivot: IPoint) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotatedPoints = points.map((point) => {
      const x = point.x - pivot.x;
      const y = point.y - pivot.y;
      const newX = x * cos - y * sin;
      const newY = x * sin + y * cos;
      return {
        x: newX + pivot.x,
        y: newY + pivot.y,
      };
    });
    return rotatedPoints;
  }

  static addMatrix(points: IPoint[], delta: IPoint) {
    return points.map((point) => {
      return {
        x: point.x + delta.x,
        y: point.y + delta.y,
      };
    });
  }
}
