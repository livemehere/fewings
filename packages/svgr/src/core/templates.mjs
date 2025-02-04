export const constMapTemplate = `import { ComponentProps, FunctionComponent } from 'react';
__IMPORTS__

export type __TYPE_NAME__ = __KEYS__

export const __CONST_NAME__: Record<__TYPE_NAME__, FunctionComponent<ComponentProps<'svg'> & { title?: string; titleId?: string; desc?: string; descId?: string }>> = {
__MAPS__
};
`;

export const iconComponentTemplate = `import { useMemo } from "react";
import { __TYPE_NAME__, __CONST_NAME__ } from "./__CONST_NAME__";

export const __COMPONENT_NAME__ = ({
  name,
  ...props
}: React.ComponentProps<"svg"> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
    name: __TYPE_NAME__;
}) => {
  const Comp = useMemo(() => IconMap[name], [name]);
  return <Comp {...props} />;
};`;
