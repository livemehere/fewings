type Props<T extends keyof React.JSX.IntrinsicElements> =
  React.PropsWithChildren<{
    position?: "absolute" | "fixed" | "relative" | "sticky";
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    zIndex?: number;
    as?: T;
  }> &
    React.ComponentProps<"div">;

export function Float<T extends keyof React.JSX.IntrinsicElements>({
  children,
  position = "absolute",
  top,
  right,
  bottom,
  left,
  zIndex,
  style = {},
  as = "div" as T,
  ...props
}: Props<T>) {
  const Tag: any = as;
  return (
    <Tag
      style={{
        position,
        top,
        right,
        bottom,
        left,
        zIndex,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
