import * as esbuild from "esbuild";
import * as tsup from "tsup";
import { resolve } from "path";
import { globSync } from "glob";

const __dirname = new URL(".", import.meta.url).pathname;

const TARGET_PACKAGES = globSync("packages/*");

const external = ["@webdev-tools/*", "react", "react-dom"];

const pkgRoots = TARGET_PACKAGES.map((pkg) => resolve(__dirname, `../${pkg}`));

pkgRoots.forEach((entry) => {
  const idxFile = resolve(entry, "src/index.ts");
  const outDir = resolve(entry, "dist");
  esbuild
    .build({
      entryPoints: [idxFile],
      outdir: outDir,
      format: "esm",
      bundle: true,
      outExtension: { ".js": ".mjs" },
      external,
    })
    .then(() => console.log(`ESM: Built ${idxFile}`))
    .catch((err) => console.error(err));

  esbuild
    .build({
      entryPoints: [idxFile],
      outdir: outDir,
      format: "cjs",
      bundle: true,
      external,
    })
    .then(() => console.log(`CJS: Built ${idxFile}`))
    .catch((err) => console.error(err));

  tsup
    .build({
      entry: [idxFile],
      format: ["cjs", "esm"],
      dts: { only: true },
      outDir: outDir,
      silent: true,
      external,
    })
    .then(() => console.log(`TSC: Built ${idxFile}`))
    .catch((err) => console.error(err));
});
