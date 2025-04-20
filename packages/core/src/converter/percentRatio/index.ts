export const percentToRatio = (percent: number | string): number => {
  if (typeof percent === 'number') {
    return percent / 100;
  } else {
    return parseFloat(percent) / 100;
  }
};

export const ratioToPercent = (ratio: number, fixed?: number): string => {
  const p = ratio * 100;
  return `${fixed ? p.toFixed(fixed) : p}%`;
};
