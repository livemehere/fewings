import * as esbuild from "esbuild";
import * as tsup from "tsup";
import { resolve, dirname, basename, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { globSync } from "glob";
import { writeFileSync, rm, existsSync } from "fs";

const EXTERNAL_DEPENDENCIES = ["@fewings/*"];

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_PACKAGES = globSync("packages/*").map((pkg) =>
  resolve(__dirname, `../${pkg}`)
);

const tasks = [];

async function cleanOutputDirectory(outDir) {
  if (existsSync(outDir)) {
    return new Promise((resolve) => {
      rm(outDir, { recursive: true }, () => {
        console.log(`Removed: ${outDir}`);
        resolve();
      });
    });
  }
}

function getEntries(pkg) {
  const indexFile = globSync(`${pkg}/src/index.ts`)[0];
  const subEntries = globSync(`${pkg}/src/*/index.ts`);
  if (indexFile) {
    subEntries.push(indexFile);
  }
  return subEntries;
}

function createEsbuildConfig(entries, outDir, pkg) {
  /** @type{esbuild.BuildOptions} */
  const config = {
    entryPoints: entries,
    outdir: outDir,
    bundle: true,
    logLevel: "silent",
    external: EXTERNAL_DEPENDENCIES,
    outbase: join(pkg, "src"),
    packages: "external",
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"],
    minify: true,
  };
  return config;
}

async function buildWithEsbuild(entries, outDir, pkg) {
  const baseConfig = createEsbuildConfig(entries, outDir, pkg);

  await esbuild.build({
    ...baseConfig,
    format: "esm",
    outExtension: { ".js": ".mjs" },
  });
  console.log(`ESM: Built ${pkg}`);

  await esbuild.build({
    ...baseConfig,
    format: "cjs",
  });
  console.log(`CJS: Built ${pkg}`);
}

async function buildWithTsup(entries, outDir) {
  await tsup.build({
    entry: entries,
    format: ["cjs", "esm"],
    dts: { only: true },
    outDir: outDir,
    silent: true,
    external: EXTERNAL_DEPENDENCIES,
    logLevel: "silent",
  });
  console.log(`TSC: TypeScript build completed`);
}

async function updatePackageJsonExports(pkg, entries) {
  const pkgJsonPath = resolve(pkg, "package.json");
  const pkgJsonUrl = pathToFileURL(pkgJsonPath).href;
  const { default: pkgJson } = await import(pkgJsonUrl, {
    assert: { type: "json" },
  });

  const existingExports = pkgJson.exports || {};

  const expectedKeys = entries.map((entry) => {
    const subPkgName = basename(dirname(entry));
    return subPkgName === "src" ? "." : `./${subPkgName}`;
  });

  const existingKeys = Object.keys(existingExports);

  const shouldRewrite =
    expectedKeys.length !== existingKeys.length ||
    !expectedKeys.every((key) => existingKeys.includes(key));

  if (!shouldRewrite) return;

  const newExports = entries.reduce((acc, entry) => {
    const subPkgName = basename(dirname(entry));
    const isRoot = subPkgName === "src";
    const name = isRoot ? "." : `./${subPkgName}`;
    acc[name] = {
      import: {
        default: isRoot ? "./dist/index.mjs" : `./dist/${subPkgName}/index.mjs`,
        types: isRoot
          ? "./dist/index.d.mts"
          : `./dist/${subPkgName}/index.d.mts`,
      },
      require: {
        default: isRoot ? "./dist/index.js" : `./dist/${subPkgName}/index.js`,
        types: isRoot ? "./dist/index.d.ts" : `./dist/${subPkgName}/index.d.ts`,
      },
    };
    return acc;
  }, {});

  pkgJson.exports = newExports;
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
  console.log(`package.json Updated: ${pkg}`);
}

async function processPackage(pkg) {
  const outDir = resolve(pkg, "dist");

  // Clean previous build outputs
  await cleanOutputDirectory(outDir);

  // Get entry points
  const entries = getEntries(pkg);
  if (entries.length === 0) {
    console.warn(`No entries found in ${pkg}`);
    return;
  }

  // Build with esbuild
  tasks.push(buildWithEsbuild(entries, outDir, pkg));

  // Build TypeScript declarations
  tasks.push(
    buildWithTsup(
      entries.map((entry) => entry.replace(/\\/g, "/")),
      outDir
    )
  );

  // Update package.json exports
  tasks.push(updatePackageJsonExports(pkg, entries));
}

// Main Execution
(async function main() {
  for (const pkg of TARGET_PACKAGES) {
    await processPackage(pkg);
  }

  await Promise.all(tasks);

  console.log("Build completed");
})();
