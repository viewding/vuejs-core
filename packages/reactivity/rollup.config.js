import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {dts} from 'rollup-plugin-dts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      esbuild({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        sourceMap: true,
        minify: false,
        define: {
          __DEV__: 'true'
        }
      })
    ],
    output: [
      {file: 'dist/reactivity.js', format: 'es', sourcemap: true},
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      esbuild({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        sourceMap: true,
        minify: false,
        define: {
          __DEV__: 'false'
        }
      })
    ],
    output: [
      {file: 'dist/reactivity.min.js', format: 'es', plugins:[terser()]},
    ],
  },
  {
    input: "dist/temp/reactivity/src/index.d.ts",
    output: [{ file: "dist/reactivity.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
