import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import { globalIgnores } from 'eslint/config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['packages/**/*.{js,mjs,cjs,ts,tsx}'],
  },
  globalIgnores([
    '**/dist/**',
    '**/node_modules/**',
    '**/public/**',
    'packages/canvas/**',
    'playground/**',
    'examples/**',
    'docs/**',
  ]),
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: '^19.0.0',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'no-case-declarations': 'off',
    },
  },
];
