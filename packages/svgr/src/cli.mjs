#!/usr/bin/env node

import { parseArgv } from "@fewings/core/converter";
import path from "path";
import { build as buildFiles } from "./core/build.mjs";
import { debounce } from "@fewings/core/fp";
import { watch } from "chokidar";

/**
 * @description every path are resolved width process.cwd()
 * @type {{
 *     svgPath:String,
 *     outDir:String,
 *     constName:String|undefined,
 *     svgImportBase:String|undefined,
 *     constName:String|undefined,
 *     typeName:String|undefined,
 *     componentName:String|undefined,
 *     watch:Boolean,
 * }}
 */
const opts = parseArgv(process.argv);
const optKeys = ["svgPath", "outDir"];
if (optKeys.some((k) => !opts[k])) {
  console.error(
    `[@fewings-svgr cli error] ${optKeys.join(", ")} are required!`,
  );
  process.exit(1);
}

const build = () => {
  buildFiles({
    rootPath: process.cwd(),
    svgRelPath: opts.svgPath,
    outDirRelPath: opts.outDir,
    svgImportBase: opts.svgImportBase,
    constName: opts.constName,
    typeName: opts.typeName,
    componentName: opts.componentName,
  });
  console.log("🚀 @fewings/svgr build completed");
};
build();
const delayBuild = debounce(build, 100);

if (opts.watch) {
  console.log("✨ svgr map builder watch start...");
  const wc = watch(path.resolve(process.cwd(), opts.svgPath));
  wc.on("all", () => delayBuild());
}
