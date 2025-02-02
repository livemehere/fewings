export function resolveCssValue(v: string | number) {
  if (typeof v === "string") {
    const hasSuffix = /[^0-9.]/.test(v);
    return hasSuffix ? v : `${v}px`;
  }
  return `${v}px`;
}
