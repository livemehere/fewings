export const toPascalCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters for camelCase
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with space
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    )
    .replace(/\s/g, ''); // Remove all spaces
};

export const toCamelCase = (str: string): string => {
  return toPascalCase(str).replace(/^[A-Z]/, (letter) => letter.toLowerCase());
};

export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add dash before uppercase letters for camelCase
    .replace(/[_\s]/g, '-') // Replace underscores and spaces with dash
    .toLowerCase();
};
