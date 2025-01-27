import type { PluginOption } from "vite";
import { build as buildFiles } from "./core/build.mjs";
import { debounce } from "@fewings/core/fp";
import path from "path";
import { watch, FSWatcher } from "chokidar";

type Options = {
  svgPath: string; // Path to the SVG files
  outDir: string; // Output directory for generated files
  constName?: string; // Optional constant name
  svgImportBase?: string; // Optional base path for imports
  typeName?: string; // Optional type name
  componentName?: string; // Optional component name
};

let watcher: FSWatcher;
export const fewingsSvgrVitePlugin = (options: Options): PluginOption => {
  const build = () => {
    buildFiles({
      rootPath: process.cwd(),
      svgRelPath: options.svgPath,
      outDirRelPath: options.outDir,
      constName: options.constName,
      svgImportBase: options.svgImportBase,
      componentName: options.componentName,
      typeName: options.typeName,
    });
    console.log("🚀 @fewings/svgr build completed");
  };
  const delayBuild = debounce(build, 100);

  return [
    {
      name: "vite-plugin-fewings-svgr",
      configureServer() {
        build();
        if (watcher) {
          watcher.close();
          console.log("🚀 @fewings/svgr watcher closed");
        }
        watcher = watch(path.resolve(process.cwd(), options.svgPath));
        watcher.on("all", () => delayBuild());
        console.log("🚀 @fewings/svgr watcher started");
      },
    },
  ];
};
