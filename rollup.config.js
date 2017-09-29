import uglify from 'rollup-plugin-uglify'
import optimize from 'rollup-plugin-optimize-js'
import babel from 'rollup-plugin-babel'

const name = 'redux-elm-plugin'

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'umd',
    name
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    uglify(),
    optimize()
  ]
}