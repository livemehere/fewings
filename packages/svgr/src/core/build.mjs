import { transpileConstMap, transpileIconComponent } from "./transpile.mjs";
import fs from "fs";
import path from "path";

/**
 *
 * @param options.rootPath {string}
 * @param options.svgRelPath {string}
 * @param options.outDirRelPath {string}
 * @param options.svgImportBase {string|undefined}
 * @param options.constName {string|undefined}
 * @param options.typeName {string|undefined}
 * @param options.componentName {string|undefined}
 */
export function build(options) {
  const {
    rootPath,
    svgRelPath,
    outDirRelPath,
    constName = "IconMap",
    typeName = "IconKeys",
    svgImportBase,
    componentName,
  } = options;
  const svgDirPath = path.resolve(rootPath, svgRelPath);
  const outDirPath = path.resolve(rootPath, outDirRelPath);
  const svgFileNames = fs.readdirSync(svgDirPath);
  const basePathOfDirs = findCommonPath(svgDirPath, outDirPath);
  const relPathFromOutDir = path.normalize(
    [
      path.relative(outDirPath, rootPath),
      svgDirPath.replace(basePathOfDirs, ""),
    ].join("/"),
  );

  if (!fs.existsSync(outDirPath)) {
    fs.mkdirSync(outDirPath, { recursive: true });
  }

  // create const file
  fs.writeFileSync(
    `${outDirPath}/${constName}.ts`,
    transpileConstMap({
      files: svgFileNames,
      importBase: svgImportBase ?? relPathFromOutDir,
      constName,
      typeName,
    }),
  );

  // create icon component file
  if (componentName) {
    fs.writeFileSync(
      `${outDirPath}/${componentName}.tsx`,
      transpileIconComponent({ constName, componentName, typeName }),
    );
  }
}

/**
 * @param path1 {string}
 * @param path2 {string}
 * @returns {string}
 */
function findCommonPath(path1, path2) {
  const path1Segments = path1.split("/");
  const path2Segments = path2.split("/");
  const commonSegments = [];

  // Compare each segment of the paths
  for (
    let i = 0;
    i < Math.min(path1Segments.length, path2Segments.length);
    i++
  ) {
    if (path1Segments[i] === path2Segments[i]) {
      commonSegments.push(path1Segments[i]);
    } else {
      break; // Stop when a difference is found
    }
  }

  // Join the common segments to form the common path
  return commonSegments.join("/");
}
