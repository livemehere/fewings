/**
 * split seconds into hours, minutes, and seconds
 */
export function secondToTime(
  second: number,
  to: "h" | "m",
): {
  h: number;
  m: number;
  s: number;
} {
  if (to === "h") {
    return {
      h: Math.floor(second / 3600),
      m: Math.floor((second % 3600) / 60),
      s: Math.floor(second % 60),
    };
  }

  return {
    h: 0,
    m: Math.floor(second / 60),
    s: Math.floor(second % 60),
  };
}
