# @fewings/svgr

Code generation for Svg files to `SVGR` components.

## Installation

```bash
yarn add @fewings/svgr
```

There is two ways to use this package:

1. CLI
2. vite-plugin

## CLI

```bash

# cli options
# *svgPath - path to the svg files (required)
# *outDir -  path to the output directory (required)
# constName - name of the constant (default: IconMap)
# typeName - name of the type (default: IconKeys)
# svgImportBase - base path for the svg imports (default: automatically generated relative path)
# componentName - name of the component (default: undefined) - if provided, it will generate a component file.
# watch - watch for changes (default: false)

"build:svgr": "fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --componentName Icon"
```

## Vite Plugin

watch on dev mode.

```ts
import { defineConfig } from "vite";
import { fewingsSvgrVitePlugin } from "@fewings/svgr";
import svgr from "vite-plugin-svgr";

type Options = {
  svgPath: string;
  outDir: string;
  constName?: string;
  svgImportBase?: string;
  typeName?: string;
  componentName?: string;
};

export default defineConfig({
  plugins: [
    svgr(),
    fewingsSvgrVitePlugin({
      svgPath: "./public/assets/svg",
      outDir: "./src/Icon",
      componentName: "Icon",
    }),
  ],
});
```
