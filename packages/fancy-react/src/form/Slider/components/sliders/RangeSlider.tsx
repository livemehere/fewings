import { useEffect, useRef, useState } from "react";
import { calcDataFromValue } from "../../util";
import { Thumb } from "../Thumb";
import { usePointerRef } from "../../usePointerRef";
import { SnapValues } from "../SnapValues";
import { map } from "@fewings/core/math";

type Props = {
  min: number;
  max: number;
  step: number;
  height: number;
  snap?: boolean;
  track: {
    size: number;
    style?: React.CSSProperties;
    fillColor?: string;
  };
  renderMinThumb: (value: number) => React.ReactNode;
  renderMaxThumb: (value: number) => React.ReactNode;
  renderSnapValue?: (value: number) => React.ReactNode;
  minValue: number;
  maxValue: number;
  onChangeMin?: (value: number) => void;
  onChangeMax?: (value: number) => void;
  maxDisabled?: boolean;
  minDisabled?: boolean;
  snapYOffset?: number;
};

export function RangeSlider({
  height,
  track,
  min,
  max,
  step,
  snap = true,
  renderSnapValue,
  minValue,
  maxValue,
  onChangeMax,
  onChangeMin,
  renderMaxThumb,
  renderMinThumb,
  maxDisabled,
  minDisabled,
  snapYOffset,
}: Props) {
  const [minData, setMinData] = useState({
    ratio: map(minValue, min, max, 0, 1),
    value: minValue,
  });

  const [maxData, setMaxData] = useState({
    ratio: map(maxValue, min, max, 0, 1),
    value: maxValue,
  });

  useEffect(() => {
    updateMaxData(maxValue, false, true);
    updateMinData(minValue, false, true);
  }, [maxValue, minValue, min, max]);

  const trackRef = useRef<HTMLDivElement>(null);
  const trackStyle = track.style || {};

  const maxThumbPointerRef = usePointerRef();
  const minThumbPointerRef = usePointerRef();

  const getTrackWidth = () => {
    const trackEl = trackRef.current;
    if (!trackEl) return 0;
    return trackEl.clientWidth;
  };
  const [width, setWidth] = useState(getTrackWidth());

  /** update total width state for rendering labels. */
  useEffect(() => {
    const resize = () => {
      setWidth(getTrackWidth());
    };

    setTimeout(() => {
      setWidth(getTrackWidth());
    }, 100);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const calcNewData = (v: number, isRatio?: boolean) => {
    return calcDataFromValue(v, min, max, step, snap!, isRatio);
  };

  const updateMaxData = (v: number, ratio?: boolean, isExternal?: boolean) => {
    if (maxDisabled) return;
    const newData = calcNewData(v, ratio);
    setMaxData(newData);
    if (!isExternal) {
      onChangeMax?.(newData.value);
    }
  };

  const updateMinData = (v: number, ratio?: boolean, isExternal?: boolean) => {
    if (minDisabled) return;
    const newData = calcNewData(v, ratio);
    // prevent duplicated event
    setMinData(newData);
    if (!isExternal) {
      onChangeMin?.(newData.value);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
      }}
      onPointerDown={(e) => {
        const tx = e.clientX - e.currentTarget.getBoundingClientRect().left;
        const ratio = tx / getTrackWidth();
        if (ratio - minData.ratio < maxData.ratio - ratio) {
          updateMinData(ratio, true);
          minThumbPointerRef.current.isDown = true;
          minThumbPointerRef.current.startX = e.clientX;
          minThumbPointerRef.current.startTx = tx;
          return;
        } else {
          updateMaxData(ratio, true);
          maxThumbPointerRef.current.isDown = true;
          maxThumbPointerRef.current.startX = e.clientX;
          maxThumbPointerRef.current.startTx = tx;
          return;
        }
      }}
    >
      <div
        ref={trackRef}
        className={"slider-track"}
        style={{
          ...trackStyle,
          position: "absolute",
          width: "100%",
          height: `${track.size}px`,
          top: `${height / 2 - track.size / 2}px`,
        }}
      />
      <div
        className={"slider-fill"}
        style={{
          position: "absolute",
          left: `${minData.ratio * 100}%`,
          width: `${maxData.ratio * 100 - minData.ratio * 100}%`,
          height: `${track.size}px`,
          background: track.fillColor,
          top: `${height / 2 - track.size / 2}px`,
          pointerEvents: "none",
          borderRadius: trackStyle.borderRadius,
        }}
      ></div>
      <Thumb
        pointerRef={minThumbPointerRef}
        min={min}
        max={max}
        trackWidth={width}
        value={minData.value}
        onUpdateData={(ratio, isRatio, isExternal) => {
          updateMinData(Math.min(ratio, maxData.ratio), isRatio, isExternal);
        }}
      >
        {renderMinThumb(minData.value)}
      </Thumb>
      <Thumb
        pointerRef={maxThumbPointerRef}
        min={min}
        max={max}
        trackWidth={width}
        value={maxData.value}
        onUpdateData={(ratio, isRatio, isExternal) => {
          updateMaxData(Math.max(ratio, minData.ratio), isRatio, isExternal);
        }}
      >
        {renderMaxThumb(maxData.value)}
      </Thumb>
      <div
        style={{
          position: "absolute",
          top: "100%",
          width: "100%",
          transform: `translateY(${snapYOffset ?? 0}px)`,
        }}
      >
        {renderSnapValue && (
          <SnapValues
            min={min}
            max={max}
            step={step}
            renderSnapValue={renderSnapValue}
          />
        )}
      </div>
    </div>
  );
}
