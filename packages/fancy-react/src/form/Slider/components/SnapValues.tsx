import { Fragment, memo, useMemo } from "react";
import { createSnapIndexArray } from "../util";

type Props = {
  min: number;
  max: number;
  step: number;
  renderSnapValue: (value: number) => React.ReactNode;
  reverse?: boolean;
};

export const SnapValues = memo(
  ({ min, max, step, renderSnapValue, reverse }: Props) => {
    const snapIndexArr = useMemo(() => {
      const arr = createSnapIndexArray(min, max, step);
      return reverse ? arr.reverse() : arr;
    }, [min, max, step, reverse]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {snapIndexArr
          .filter((v) => !!renderSnapValue(v))
          .map((v) => {
            return <Fragment key={v}>{renderSnapValue(v)}</Fragment>;
          })}
      </div>
    );
  },
);
