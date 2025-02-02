"use client";

import {
  Sandpack as _Sandpack,
  SandpackProps,
} from "@codesandbox/sandpack-react";

export const Sandpack = ({
  children,
  customSetup: { dependencies, ...customSetup } = {},
  ...props
}: SandpackProps & {
  children: React.ReactNode;
}) => {
  return (
    // @ts-ignore
    <_Sandpack
      customSetup={{
        dependencies: {
          "@fewings/core": "latest",
          ...dependencies,
        },
        ...customSetup,
      }}
      {...props}
    >
      {children}
    </_Sandpack>
  );
};
