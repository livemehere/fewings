import {
  PropsWithChildren,
  ComponentProps,
  JSX,
  JSXElementConstructor,
} from "react";
import { resolveCssValue } from "@fewings/core/converter";

type Props<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  PropsWithChildren<{
    gap?: number | string;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?:
      | "start"
      | "center"
      | "end"
      | "space-between"
      | "space-around"
      | "space-evenly";
    padding?: number | string;
    as?: T;
  }> &
    ComponentProps<T>;

export const HStack = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>({
  children,
  gap = 0,
  align = "stretch",
  justify = "start",
  padding,
  style = {},
  as: Tag = "div",
  ...props
}: Props<T>) => {
  return (
    <Tag
      style={{
        display: "flex",
        flexDirection: "row",
        gap: resolveCssValue(gap),
        alignItems: align,
        justifyContent: justify,
        padding: padding ? resolveCssValue(padding) : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};
