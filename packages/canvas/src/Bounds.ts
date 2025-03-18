import { Box, Point } from "./types";

export interface IBoundsProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class Bounds implements Point, Box {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(props?: IBoundsProps) {
    this.x = props?.x ?? 0;
    this.y = props?.y ?? 0;
    this.width = props?.width ?? 100;
    this.height = props?.height ?? 100;
  }
}
