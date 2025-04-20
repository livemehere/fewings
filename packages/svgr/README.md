<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/svgr</h1>      
    <p align="center">
    SVG to React component code generation tool
    <br/>
    Automatically generates TypeScript types and constants for your SVG files, making them easily usable in React applications
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/svgr">npm</a>
          &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/svgr/README.ko.md">한국어</a>
    </p>
</p>

## Motivation

Working with SVG icons in React applications often requires manual setup and maintenance of icon mappings and types.

@fewings/svgr automates this process by:

- Scanning a directory of SVG files
- Generating TypeScript types for your SVGs
- Creating a map of SVG components for easy import
- Optionally creating a ready-to-use Icon component

This allows you to focus on using your SVGs rather than managing the boilerplate code around them.

## Installation

```bash
# npm
npm install --save-dev @fewings/svgr

# yarn
yarn add -D @fewings/svgr

# pnpm
pnpm add -D @fewings/svgr
```

## Getting Started

There are two ways to use @fewings/svgr:

1. CLI tool: ideal for build scripts and one-time generation
2. Vite plugin: provides automatic watching and rebuilding during development

### CLI Usage

The CLI tool lets you generate SVG mappings from your command line or NPM scripts.

```bash
# Basic usage
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon

# With component generation
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --componentName Icon

# With watch mode
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --watch
```

**Adding to your npm scripts:**

```json
"scripts": {
  "build:svgr": "fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --componentName Icon"
}
```

### CLI Options

| Option          | Description                                          | Required | Default                              |
| --------------- | ---------------------------------------------------- | -------- | ------------------------------------ |
| `svgPath`       | Path to the directory containing SVG files           | Yes      | -                                    |
| `outDir`        | Output directory for generated files                 | Yes      | -                                    |
| `constName`     | Name of the generated SVG map constant               | No       | `IconMap`                            |
| `typeName`      | Name of the generated TypeScript type                | No       | `IconKeys`                           |
| `svgImportBase` | Base path for SVG imports (if you use absolute path) | No       | Auto-generated relative path         |
| `componentName` | Name of the generated component                      | No       | No component is generated if omitted |
| `watch`         | Watch for changes in the SVG directory               | No       | `false`                              |

### Vite Plugin Usage

The Vite plugin automatically watches for changes to your SVG files during development.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { fewingsSvgrVitePlugin } from '@fewings/svgr';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(), // Standard SVGR plugin for importing SVGs as React components
    fewingsSvgrVitePlugin({
      svgPath: './public/assets/svg',
      outDir: './src/Icon',
      componentName: 'Icon',
      importBase: '@assets/svg', // Optional: base path for SVG imports
    }),
  ],
});
```

### Plugin Options

| Option          | Description                                | Required | Default                              |
| --------------- | ------------------------------------------ | -------- | ------------------------------------ |
| `svgPath`       | Path to the directory containing SVG files | Yes      | -                                    |
| `outDir`        | Output directory for generated files       | Yes      | -                                    |
| `constName`     | Name of the generated SVG map constant     | No       | `IconMap`                            |
| `typeName`      | Name of the generated TypeScript type      | No       | `IconKeys`                           |
| `svgImportBase` | Base path for SVG imports                  | No       | Auto-generated relative path         |
| `componentName` | Name of the generated component            | No       | No component is generated if omitted |

## Using the Generated Code

After @fewings/svgr has processed your SVG files, it will generate:

1. A map of all your SVG components
2. TypeScript types for type safety
3. Optionally, an Icon component ready to use in your app

### Example Usage:

```tsx
// Using the generated Icon component
import { Icon } from './src/Icon/Icon';

function App() {
  return (
    <div>
      <Icon name="arrow-right" width={24} height={24} />
      <Icon name="home" color="#ff0000" />
    </div>
  );
}

// Using the generated map directly
import { IconMap, IconKeys } from './src/Icon/IconMap';

function CustomIcon({
  name,
  ...props
}: { name: IconKeys } & React.SVGProps<SVGSVGElement>) {
  const SvgComponent = IconMap[name];
  return <SvgComponent {...props} />;
}
```

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request on the [GitHub repository](https://github.com/livemehere/fewings).
