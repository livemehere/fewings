export function snap(value: number, snapSize: number): number {
  if (snapSize === 0) return NaN;
  const snapped = Math.round(value / snapSize) * snapSize;
  return snapped === 0 ? 0 : snapped; // -0 방지
}
