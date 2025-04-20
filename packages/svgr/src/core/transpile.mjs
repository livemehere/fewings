import { toPascalCase } from '@fewings/core/converter';
import { constMapTemplate, iconComponentTemplate } from './templates.mjs';

/**
 * Generates a constant map file content with imports and mappings.
 *
 * @param files {Array<{ key: string, path: string }>} - List of files with `key` and `path`.
 * @param importBase {String} - Base path for import.
 * @param constName {String} - Name of the constant.
 * @param typeName {String} - Name of the type.
 * @returns {string}
 */
export function transpileConstMap({ files, importBase, constName, typeName }) {
  // Map to PascalCase and create imports
  const resolveCompName = (name) => toPascalCase(name).replaceAll('/', '_');
  const imports = files
    .map(
      (file) =>
        `import ${resolveCompName(file.key)}Icon from '${importBase}/${file.key}.svg?react';`
    )
    .join('\n');

  // Generate type keys
  const keys = files.map((file) => `'${file.key}'`).join(' | ');

  // Generate icon map
  const map = files
    .map((file) => `'${file.key}': ${resolveCompName(file.key)}Icon`)
    .join(',\n');

  // Replace template placeholders
  return constMapTemplate
    .replaceAll('__TYPE_NAME__', typeName)
    .replaceAll('__CONST_NAME__', constName)
    .replaceAll('__IMPORTS__', imports)
    .replaceAll('__KEYS__', keys)
    .replaceAll('__MAPS__', map);
}

/**
 * Generates the icon component file content.
 *
 * @param constName {String} - Name of the constant.
 * @param typeName {String} - Name of the type.
 * @param componentName {String} - Name of the component.
 * @returns {string}
 */
export function transpileIconComponent({ constName, componentName, typeName }) {
  return iconComponentTemplate
    .replaceAll('__CONST_NAME__', constName)
    .replaceAll('__TYPE_NAME__', typeName)
    .replaceAll('__COMPONENT_NAME__', componentName);
}
