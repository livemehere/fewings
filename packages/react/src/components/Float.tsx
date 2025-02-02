import {
  PropsWithChildren,
  ComponentProps,
  JSX,
  JSXElementConstructor,
} from "react";
import { resolveCssValue } from "@fewings/core/converter";

type Props<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  PropsWithChildren<{
    position?: "absolute" | "fixed" | "relative" | "sticky";
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    zIndex?: number;
    as?: T;
  }> &
    ComponentProps<T>;

export const Float = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>({
  children,
  position = "absolute",
  top,
  right,
  bottom,
  left,
  zIndex,
  style = {},
  as: Tag = "div",
  ...props
}: Props<T>) => {
  return (
    <Tag
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
    </Tag>
  );
};
