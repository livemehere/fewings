import { PropsWithChildren, ComponentProps } from "react";
import { resolveCssValue } from "@fekit/core/converter";

type Props = PropsWithChildren<{
  position?: "absolute" | "fixed" | "relative" | "sticky";
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;
}> &
  ComponentProps<"div">;

export const Float = ({
  children,
  position = "absolute",
  top,
  right,
  bottom,
  left,
  zIndex,
  style = {},
  ...props
}: Props) => {
  return (
    <div
      style={{
        position,
        top: top ? resolveCssValue(top) : undefined,
        right: right ? resolveCssValue(right) : undefined,
        bottom: bottom ? resolveCssValue(bottom) : undefined,
        left: left ? resolveCssValue(left) : undefined,
        zIndex,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
