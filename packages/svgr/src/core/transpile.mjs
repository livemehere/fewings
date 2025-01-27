import { toPascalCase } from "@fewings/core/converter";
import { constMapTemplate, iconComponentTemplate } from "./templates.mjs";

/**e
 * @param files {Array<String>} - list of file names .svg
 * @param importBase {String} - base path for import
 * @param constName {String} - name of the constant
 * @param typeName {String} - name of the type
 * @returns {string}
 */
export function transpileConstMap({ files, importBase, constName, typeName }) {
  const names = files.map((f) => /(.+)(\.svg)/g.exec(f)).map((res) => res[1]);

  const imports = names
    .map(
      (n) =>
        `import ${toPascalCase(n)}Icon from '${importBase}/${n}.svg?react';`,
    )
    .join("\n");
  const keys = names.map((n) => `'${n}'`).join(" | ");
  const map = names.map((n) => `'${n}':${toPascalCase(n)}Icon`).join(",\n");

  return constMapTemplate
    .replaceAll("__TYPE_NAME__", typeName)
    .replaceAll("__CONST_NAME__", constName)
    .replaceAll("__IMPORTS__", imports)
    .replaceAll("__KEYS__", keys)
    .replaceAll("__MAPS__", map);
}

/**
 * @param constName {String}
 * @param typeName {String}
 * @param componentName {String}
 * @returns {string}
 */
export function transpileIconComponent({ constName, componentName, typeName }) {
  return iconComponentTemplate
    .replaceAll("__CONST_NAME__", constName)
    .replaceAll("__TYPE_NAME__", typeName)
    .replaceAll("__COMPONENT_NAME__", componentName);
}
