export function resolveCssValue(v: string | number) {
  return typeof v === "number" ? `${v}px` : v;
}
