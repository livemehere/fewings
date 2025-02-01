import { useEffect, useRef, useState } from "react";
import { useControlledState } from "@fewings/react/hooks/useControlledState";

export interface DragStyle {
  position: "absolute";
  top: number | string;
  left: number | string;
}

interface UseDragPositionProps {
  dir?: "x" | "y" | "xy";
  style?: DragStyle;
  defaultStyle?: DragStyle;
  onChangeStyle?: (style: DragStyle) => void;
  isDragging?: boolean;
  onChangeDragging?: (isDragging: boolean) => void;
}

const defaultStyle: DragStyle = {
  position: "absolute",
  top: 0,
  left: 0,
};

export const useDragPosition = (opt?: UseDragPositionProps) => {
  const dir = opt?.dir || "xy";
  const startRef = useRef<{
    x: number | null;
    y: number | null;
    left: number | null;
    top: number | null;
  }>({
    x: null,
    y: null,
    left: null,
    top: null,
  });
  const handleRef = useRef<HTMLElement>(null);
  const boundRef = useRef<HTMLElement>(null);
  const [style = defaultStyle, setStyle] = useControlledState<DragStyle>({
    value: opt?.style,
    defaultValue: opt?.defaultStyle,
    onChange: opt?.onChangeStyle,
  });

  const [bounds, _setBounds] = useState({
    minLeft: -Infinity,
    maxLeft: Infinity,
    maxTop: Infinity,
    minTop: -Infinity,
  });
  const setBounds = () => {
    const boundRect = boundRef.current?.getBoundingClientRect();
    const minLeft = boundRect ? 0 : -Infinity;
    const maxLeft = boundRect ? boundRect.width : Infinity;
    const minTop = boundRect ? 0 : -Infinity;
    const maxTop = boundRect ? boundRect.height : Infinity;
    _setBounds({ minLeft, maxLeft, minTop, maxTop });

    return {
      minLeft,
      maxLeft,
      minTop,
      maxTop,
    };
  };

  const [isDragging = false, setIsDragging] = useControlledState({
    value: opt?.isDragging,
    onChange: opt?.onChangeDragging,
  });

  useEffect(() => {
    requestAnimationFrame(setBounds);
  }, []);

  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    const onPointerDown = (e: MouseEvent) => {
      setIsDragging(true);
      const style = getComputedStyle(el);
      startRef.current = {
        x: e.clientX,
        y: e.clientY,
        left: parseFloat(style.left),
        top: parseFloat(style.top),
      };
    };
    const onPointerUp = () => {
      setIsDragging(false);
      startRef.current = {
        x: null,
        y: null,
        left: null,
        top: null,
      };
    };
    const onPointerMove = (e: MouseEvent) => {
      const {
        x: startX,
        y: startY,
        left: startLeft,
        top: startTop,
      } = startRef.current;
      if (startX == null) return;
      const { minLeft, maxLeft, minTop, maxTop } = setBounds();

      const xChange = dir.includes("x");
      const yChange = dir.includes("y");
      const dx = xChange ? e.clientX - startX : 0;
      const dy = yChange ? e.clientY - startY! : 0;

      const left = Math.max(minLeft, Math.min(maxLeft, startLeft! + dx));
      const top = Math.max(minTop, Math.min(maxTop, startTop! + dy));

      setStyle((prev) => ({
        ...prev,
        top,
        left,
      }));
    };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [dir]);

  return {
    handleRef,
    boundRef,
    style,
    isDragging,
    bounds,
  };
};
