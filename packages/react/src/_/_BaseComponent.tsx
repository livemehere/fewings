import { ComponentProps, PropsWithChildren } from "react";

type Props = PropsWithChildren<{}> & ComponentProps<"div">;

export const _BaseComponent = ({ children, style = {}, ...props }: Props) => {
  return (
    <div
      {...props}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};
