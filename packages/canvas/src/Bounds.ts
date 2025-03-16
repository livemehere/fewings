export interface IBoundsProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
}

export class Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scaleX: number;
  scaleY: number;

  constructor(props?: IBoundsProps) {
    this.x = props?.x ?? 0;
    this.y = props?.y ?? 0;
    this.width = props?.width ?? 100;
    this.height = props?.height ?? 100;
    this.rotate = props?.rotate ?? 0;
    this.scaleX = props?.scaleX ?? 1;
    this.scaleY = props?.scaleY ?? 1;
  }
}
