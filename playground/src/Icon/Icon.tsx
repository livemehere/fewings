import { useMemo } from "react";
import { css } from "@emotion/react";
import { IconKeys, IconMap } from "./IconMap";

export const Icon = ({
  name,
  fill,
  stroke,
  width,
  height,
}: {
  name: IconKeys;
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
}) => {
  const Comp = useMemo(() => IconMap[name], [name]);
  return (
    <Comp
      css={css`
        ${width && `width:${width}px;`}
        ${height && `height:${height}px;`}
                path {
          ${stroke && `stroke:${stroke};`}
          ${fill && `fill:${fill};`}
        }
      `}
    />
  );
};
