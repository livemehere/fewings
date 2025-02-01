export function map(
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number,
) {
  if (value < min) return newMin;
  if (value > max) return newMax;
  return ((value - min) * (newMax - newMin)) / (max - min) + newMin;
}
