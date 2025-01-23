import { globSync } from "glob";

const packages = globSync("packages/*");
const __dirname = new URL(".", import.meta.url).pathname;

packages.forEach((pkg) => {
  const rootEntry = globSync(`${pkg}/src/index.ts`);
  const entries = globSync(`${pkg}/src/*/index.ts`);
  console.log(rootEntry, entries);
});
