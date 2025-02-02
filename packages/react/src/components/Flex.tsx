import {
  PropsWithChildren,
  ComponentProps,
  JSX,
  JSXElementConstructor,
} from "react";
import { resolveCssValue } from "@fewings/core/converter";

type Props<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  PropsWithChildren<{
    justify?:
      | "start"
      | "center"
      | "end"
      | "space-between"
      | "space-around"
      | "space-evenly";
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    gap?: number | string;
    padding?: number | string;
    as?: T;
  }> &
    ComponentProps<T>;

export const Flex = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>({
  children,
  justify = "start",
  align = "stretch",
  direction = "row",
  wrap = "nowrap",
  gap = 0,
  padding,
  style = {},
  as: Tag = "div",
  ...props
}: Props<T>) => {
  return (
    <Tag
      style={{
        display: "flex",
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
        flexWrap: wrap,
        gap: resolveCssValue(gap),
        padding: padding ? resolveCssValue(padding) : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};
