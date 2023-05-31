import dts from 'rollup-plugin-dts'

const config = [
  {
    input: './temp/reactivity/src/index.d.ts',
    output: [{ file: 'dist/reactivity.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]

export default config
