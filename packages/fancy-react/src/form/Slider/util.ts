import { Data } from "./types";
import { map } from "@fewings/core/math";

export function safeValue(v: number | undefined) {
  return v === undefined || isNaN(v) ? 0 : v;
}

export function calcDataFromValue(
  v: number,
  min: number,
  max: number,
  step: number,
  isSnap: boolean,
  isRatio?: boolean,
  isReverse?: boolean,
): Data {
  const _restrictedV = isRatio
    ? Math.max(0, Math.min(1, v))
    : Math.max(min, Math.min(max, v));
  const newValue = isRatio ? map(_restrictedV, 0, 1, min, max) : _restrictedV;
  const newRatio = isRatio ? _restrictedV : map(_restrictedV, min, max, 0, 1);

  const decimalPlaces = step.toString().split(".")[1]?.length || 0;
  const newSnappedValue = +(Math.round(newValue / step) * step).toFixed(
    decimalPlaces,
  );
  const newSnappedRatio = map(newSnappedValue, min, max, 0, 1);
  const finalValue = isSnap ? newSnappedValue : newValue;
  const finalRatio = isSnap ? newSnappedRatio : newRatio;

  const reverseValue = min + max - finalValue;
  const reverseRatio = map(reverseValue, min, max, 0, 1);

  return {
    value: isReverse ? reverseValue : finalValue,
    ratio: isReverse ? reverseRatio : finalRatio,
    reverseValue: isReverse ? finalValue : reverseValue,
    reverseRatio: isReverse ? finalRatio : reverseRatio,
  };
}

export function createSnapIndexArray(min: number, max: number, step: number) {
  return Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => min + i * step,
  );
}
