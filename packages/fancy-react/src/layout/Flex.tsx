import { PropsWithChildren, ComponentProps } from "react";
import { resolveCssValue } from "@fekit/core/converter";

type Props = PropsWithChildren<{
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
}> &
  ComponentProps<"div">;

export const Flex = ({
  children,
  justify = "start",
  align = "stretch",
  direction = "row",
  wrap = "nowrap",
  gap = 0,
  padding,
  style = {},
  ...props
}: Props) => {
  return (
    <div
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
    </div>
  );
};
