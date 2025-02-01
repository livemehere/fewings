import { ReactNode, RefObject, useEffect, useRef } from "react";
import { safeValue } from "../util";
import { TOnUpdateData, TPointerState } from "../types";
import { getTranslateXY } from "@fewings/core/dom";
import { map } from "@fewings/core/math";

type Props = {
  value: number;
  min: number;
  max: number;
  trackWidth: number;
  children: ReactNode;
  onUpdateData: TOnUpdateData;
  pointerRef: RefObject<TPointerState>;
  reverse?: boolean;
};

export const Thumb = ({
  value,
  min,
  max,
  trackWidth,
  children,
  onUpdateData,
  pointerRef,
  reverse,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumbEl = ref.current;
    const handleEl = handleRef.current;
    if (!thumbEl || !handleEl) return;

    const handlePointerDown = (e: PointerEvent) => {
      pointerRef.current.isDown = true;
      const { translateX } = getTranslateXY(thumbEl);
      pointerRef.current.startX = e.clientX;
      pointerRef.current.startTx = translateX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerRef.current.isDown) return;
      const thumbEl = ref.current;
      if (!thumbEl) return;
      const dx = e.clientX - pointerRef.current.startX;
      const nextTx = Math.max(
        0,
        Math.min(trackWidth, pointerRef.current.startTx + dx),
      );
      const ratio = nextTx / trackWidth;
      onUpdateData(ratio, true, false, reverse);
    };

    const handlePointerUp = () => {
      pointerRef.current.isDown = false;
    };

    handleEl.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      handleEl.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [min, max, trackWidth, onUpdateData, reverse]);

  return (
    <div
      ref={ref}
      className={"slider-thumb"}
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: `translateY(-50%) translateX(${safeValue(map(value, min, max, 0, trackWidth))}px)`,
      }}
    >
      <div
        className={"slider-handle"}
        ref={handleRef}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
