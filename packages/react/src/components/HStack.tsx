import { resolveCssValue } from "@fewings/core/converter";

type Props<T extends keyof React.JSX.IntrinsicElements> =
  React.PropsWithChildren<{
    inline?: boolean;
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
    React.ComponentProps<"div">;

export const HStack = <T extends keyof React.JSX.IntrinsicElements>({
  inline,
  children,
  gap = 0,
  align = "stretch",
  justify = "start",
  padding,
  style = {},
  as = "div" as T,
  ...props
}: Props<T>) => {
  const Tag: any = as;
  return (
    <Tag
      style={{
        display: inline ? "inline-flex" : "flex",
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
