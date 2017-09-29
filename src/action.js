import { defaultOptions } from './options'
import { toConstant } from './util'

export function create (name, options = {}) {
  const opt = Object.assign({}, defaultOptions, options)

  return (message = null) => ({
    type: `${opt.name}/${toConstant(name)}`,
    payload: {
      port: name,
      message
    }
  })
}

export function createMany (actions, options = {}) {
  const opt = Object.assign({}, defaultOptions, options)

  return actions.reduce((obj, name) => Object.assign(obj, {
    [name]: create(name, opt)
  }), {})
}

export function fromPorts (ports, options = {}) {
  const opt = Object.assign({}, defaultOptions, options)
  const names = Object.keys(ports)
  const actions = names.filter(name => ports[name].send)
  return createMany(actions, opt)
}