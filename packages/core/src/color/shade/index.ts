/**
 * Adjusts a HEX color's brightness, supporting 3-character (#RGB), 6-character (#RRGGBB),
 * and 8-character (#RRGGBBAA) formats.
 * @param color - The HEX color to adjust (e.g., "#RGB", "#RRGGBB", "#RRGGBBAA").
 * @param weight - The amount to adjust the brightness (-100 to 100).
 *                 Positive values make the color brighter, negative values make it darker.
 * @returns The adjusted HEX color.
 */
export function shade(color: string, weight: number): string {
  // Ensure the color starts with '#' and remove it
  if (color.startsWith("#")) {
    color = color.slice(1);
  }

  // Convert 3-character HEX to 6-character HEX
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Validate HEX format
  if (
    (color.length !== 6 && color.length !== 8) ||
    !/^[0-9a-fA-F]{6,8}$/.test(color)
  ) {
    throw new Error("Invalid HEX color format");
  }

  // Clamp weight between -100 and 100
  weight = Math.max(-100, Math.min(100, weight));

  // Extract RGBA channels
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  const a = color.length === 8 ? color.slice(6, 8) : null;

  // Adjust brightness
  const adjust = (channel: number) => {
    const newChannel = Math.round(
      channel + (weight / 100) * (weight > 0 ? 255 - channel : channel),
    );
    return Math.max(0, Math.min(255, newChannel)); // Clamp between 0 and 255
  };

  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);

  // Convert RGB back to HEX
  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}${a ?? ""}`;
}
