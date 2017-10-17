import babel from 'rollup-plugin-babel'
import elm from 'rollup-plugin-elm'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/app.js',
    format: 'umd',
    name: 'App'
  },
  plugins: [
    resolve(),
    elm({
      compiler: {
        debug: true
      }
    }),
    commonjs({
      extensions: ['.js', '.elm']
    }),
    babel(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}