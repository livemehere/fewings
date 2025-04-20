export function rgbaToHex(rgb: string): string {
  const match = rgb.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/,
  );

  if (!match) {
    throw new Error("Invalid RGBA color");
  }

  const [_, r, g, b, a] = match;
  const toHex = (n: string) => {
    const hex = parseInt(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);

  let aHex = "";
  if (a !== undefined) {
    const alpha = Math.round(parseFloat(a) * 255);
    aHex = toHex(alpha.toString());
  }

  return `#${rHex}${gHex}${bHex}${aHex}`;
}
