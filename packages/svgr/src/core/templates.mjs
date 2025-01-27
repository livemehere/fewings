export const constMapTemplate = `import { ComponentProps, FunctionComponent } from 'react';
__IMPORTS__

export type __TYPE_NAME__ = __KEYS__

export const __CONST_NAME__: Record<__TYPE_NAME__, FunctionComponent<ComponentProps<'svg'> & { title?: string; titleId?: string; desc?: string; descId?: string }>> = {
__MAPS__
};
`;

export const iconComponentTemplate = `import { useMemo } from "react";
import { css } from "@emotion/react";
import { __TYPE_NAME__, __CONST_NAME__ } from "./__CONST_NAME__";

export const __COMPONENT_NAME__ = ({
  name,
  fill,
  stroke,
  width,
  height,
}: {
  name: __TYPE_NAME__;
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
}) => {
  const Comp = useMemo(() => __CONST_NAME__[name], [name]);
  return (
    <Comp
      css={css\`
        \${width && \`width:\${width}px;\`}
        \${height && \`height:\${height}px;\`}
                path {
          \${stroke && \`stroke:\${stroke};\`}
          \${fill && \`fill:\${fill};\`}
        }
      \`}
    />
  );
};
`;
