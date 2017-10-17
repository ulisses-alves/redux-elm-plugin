import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'ReduxElmPlugin'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'babel-runtime/regenerator',
    'babel-runtime/core-js/object/assign',
    'babel-runtime/helpers/asyncToGenerator'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    uglify({}, minify)
  ]
}
