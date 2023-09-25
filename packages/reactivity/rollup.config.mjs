import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

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
          __DEV__: 'false'
        }
      })
    ],
    output: [
      {file: 'dist/index.esm.js', format: 'es'},
      {file: 'dist/index.esm.min.js', format: 'es', plugins:[terser()]},
    ],
  },

];
