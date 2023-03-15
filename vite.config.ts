// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import typescript2 from 'rollup-plugin-typescript2';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  assetsInclude: ['**/*.svg'],
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    commonjsOptions: { include: [] },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'mac-common',
      fileName: (format) => `mac-common.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    {
      ...typescript2(),
      apply: 'build',
    },
  ],
});
