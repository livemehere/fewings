export function snap(value: number, snapSize: number): number {
  return Math.round(value / snapSize) * snapSize;
}
