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

export function VStack<T extends keyof React.JSX.IntrinsicElements>({
  inline,
  children,
  gap = 0,
  align = "stretch",
  justify = "start",
  padding,
  style = {},
  as = "div" as T,
  ...props
}: Props<T>) {
  const Tag: any = as;
  return (
    <Tag
      style={{
        display: inline ? "inline-flex" : "flex",
        flexDirection: "column",
        gap,
        alignItems: align,
        justifyContent: justify,
        padding,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
