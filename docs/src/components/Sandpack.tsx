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
    // @ts-expect-error - children handle with `remark` plugin in `next.config.ts`
    <_Sandpack
      theme={"dark"}
      template={"react"}
      options={{
        showConsole: true,
        showConsoleButton: true,
      }}
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
