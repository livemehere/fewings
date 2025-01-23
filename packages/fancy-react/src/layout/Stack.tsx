import { PropsWithChildren, ComponentProps } from "react";
import { resolveCssValue } from "@fekit/core/converter";

type Props = PropsWithChildren<{
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
}> &
  ComponentProps<"div">;

export const Stack = ({
  children,
  gap = 0,
  align = "stretch",
  justify = "start",
  padding,
  style = {},
  ...props
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: resolveCssValue(gap),
        alignItems: align,
        justifyContent: justify,
        padding: padding ? resolveCssValue(padding) : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
