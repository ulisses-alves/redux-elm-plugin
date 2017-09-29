import { defaultOptions } from './options'
import { toConstant } from './util'

export function create (options = {}) {
  const opt = Object.assign({}, defaultOptions, options)
  const update = `${opt.name}/${toConstant(opt.subscribe)}`

  return function reducer (state, { type, payload }) {
    switch (type) {
      case update:
        return payload

      default:
        return state
    }
  }
}