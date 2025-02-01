import {
  cloneElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createContext,
  useContextSelector,
} from "@fewings/react/contextSelector";
import { map, snap } from "@fewings/core/math";
import {
  DragStyle,
  useDragPosition,
} from "@fewings/react/hooks/useDragPosition";
import { percentToRatio, ratioToPercent } from "@fewings/core/converter";

interface SliderContextValue {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  dir: "horizontal" | "vertical";
  //
  thumbRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  ratio: number;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

const SliderContext = createContext<SliderContextValue>(
  null as unknown as SliderContextValue,
);

const SliderRoot = ({
  children,
  dir,
  ...props
}: { children: ReactNode } & Omit<
  SliderContextValue,
  | "ratio"
  | "thumbRef"
  | "trackRef"
  | "isDragging"
  | "setIsDragging"
  | "setRatio"
>) => {
  const ratio = useMemo(
    () => map(props.value, props.min, props.max, 0, 1),
    [props.value, props.min, props.max],
  );
  const trackRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <SliderContext.Provider
      value={{
        ...props,
        ratio,
        dir,
        thumbRef,
        trackRef,
        isDragging,
        setIsDragging,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
};

const SliderThumb = ({
  children,
}: {
  children: (props: {
    value: number;
    ratio: number;
    isDragging: boolean;
  }) => ReactElement<any>;
}) => {
  const value = useContextSelector(SliderContext, (v) => v.value);
  const setValue = useContextSelector(SliderContext, (v) => v.setValue);

  const min = useContextSelector(SliderContext, (v) => v.min);
  const max = useContextSelector(SliderContext, (v) => v.max);
  const step = useContextSelector(SliderContext, (v) => v.step);
  const ratio = useContextSelector(SliderContext, (v) => v.ratio);

  const trackRef = useContextSelector(SliderContext, (v) => v.trackRef);
  const thumbRef = useContextSelector(SliderContext, (v) => v.thumbRef);
  const dir = useContextSelector(SliderContext, (v) => v.dir);
  const isDragging = useContextSelector(SliderContext, (v) => v.isDragging);
  const setIsDragging = useContextSelector(
    SliderContext,
    (v) => v.setIsDragging,
  );

  const style = useMemo<DragStyle>(
    () => ({
      position: "absolute",
      top: dir === "horizontal" ? 0 : ratioToPercent(ratio),
      left: dir === "horizontal" ? ratioToPercent(ratio) : 0,
    }),
    [dir, ratio],
  );

  const setLeft = (left: number | string) => {
    const xRatio =
      typeof left === "string"
        ? percentToRatio(left)
        : map(left, bounds.minLeft, bounds.maxLeft, 0, 1);
    setValue(snap(map(xRatio, 0, 1, min, max), step));
  };

  const setTop = (top: number | string) => {
    const yRatio =
      typeof top === "string"
        ? percentToRatio(top)
        : map(top, bounds.minTop, bounds.maxTop, 0, 1);
    setValue(snap(map(yRatio, 0, 1, min, max), step));
  };

  const { handleRef, boundRef, bounds } = useDragPosition({
    dir: dir === "horizontal" ? "x" : "y",
    onChangeDragging: setIsDragging,
    style,
    onChangeStyle: (style) => {
      if (dir === "horizontal") {
        setLeft(style.left);
      } else {
        setTop(style.top);
      }
    },
  });

  useEffect(() => {
    boundRef.current = trackRef.current;
    thumbRef.current = handleRef.current;
  });

  const child = children({ value, ratio, isDragging });
  return cloneElement(child, {
    ref: (el: HTMLElement | null) => {
      if (el) {
        handleRef.current = el;
      }
      child.props.ref?.(el);
    },
    style: {
      ...child.props.style,
      ...style,
    },
  });
};

const SliderTrack = ({
  children,
}: {
  children: (props: {
    value: number;
    ratio: number;
    isDragging: boolean;
  }) => ReactElement<any>;
}) => {
  const value = useContextSelector(SliderContext, (v) => v.value);
  const ratio = useContextSelector(SliderContext, (v) => v.ratio);
  const trackRef = useContextSelector(SliderContext, (v) => v.trackRef);
  const isDragging = useContextSelector(SliderContext, (v) => v.isDragging);
  const child = children({ value, ratio, isDragging });
  return cloneElement(child, {
    ref: (el: HTMLElement | null) => {
      if (el) {
        trackRef.current = el;
      }
      child.props.ref?.(el);
    },
  });
};

export const Slider = {
  Root: SliderRoot,
  Thumb: SliderThumb,
  Track: SliderTrack,
};
