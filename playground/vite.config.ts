import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import resolvePaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { fewingsSvgrVitePlugin } from '@fewings/svgr';

export default defineConfig({
  plugins: [
    resolvePaths(),
    svgr(),
    react(),
    fewingsSvgrVitePlugin({
      svgPath: './public/assets/svg',
      outDir: './src/Icon',
      componentName: 'Icon',
    }),
  ],
});
