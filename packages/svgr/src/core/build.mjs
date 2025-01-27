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

  // Read all files and folders recursively
  const svgFilesWithKeys = readFilesRecursively(svgDirPath);
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

  // Create const file
  fs.writeFileSync(
    `${outDirPath}/${constName}.ts`,
    transpileConstMap({
      files: svgFilesWithKeys,
      importBase: svgImportBase ?? relPathFromOutDir,
      constName,
      typeName,
    }),
  );

  // Create icon component file
  if (componentName) {
    fs.writeFileSync(
      `${outDirPath}/${componentName}.tsx`,
      transpileIconComponent({ constName, componentName, typeName }),
    );
  }
}

/**
 * Read files recursively, preserving folder structure
 * @param dirPath {string}
 * @param parentKey {string} Key prefix for nested folders
 * @returns {Array<{ key: string, path: string }>}
 */
function readFilesRecursively(dirPath, parentKey = "") {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    const entryPath = path.join(dirPath, entry.name);
    const entryKey = parentKey
      ? `${parentKey}/${entry.name}`
      : entry.name.replace(".svg", "");

    if (entry.isDirectory()) {
      // If it's a folder, recursively read its contents
      files.push(...readFilesRecursively(entryPath, entryKey));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      // If it's a file, add it to the list
      files.push({ key: entryKey.replace(/\.svg$/, ""), path: entryPath });
    }
  });

  return files;
}

/**
 * Find the common path between two paths
 * @param path1 {string}
 * @param path2 {string}
 * @returns {string}
 */
function findCommonPath(path1, path2) {
  const path1Segments = path1.split("/");
  const path2Segments = path2.split("/");
  const commonSegments = [];

  for (
    let i = 0;
    i < Math.min(path1Segments.length, path2Segments.length);
    i++
  ) {
    if (path1Segments[i] === path2Segments[i]) {
      commonSegments.push(path1Segments[i]);
    } else {
      break;
    }
  }

  return commonSegments.join("/");
}
