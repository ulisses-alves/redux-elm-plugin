import { defaultOptions } from './options'
import { fail, toConstant } from './util'

export function create (app, options = {}) {
  const opt = Object.assign({}, defaultOptions, options)
  const update = `${opt.name}/${toConstant(opt.subscribe)}`

  return function middleware ({ getState, dispatch }) {
    const flags = getState()
    const { ports } = app.worker(flags)
    const elmUpdate = ports[opt.subscribe]

    if (!elmUpdate) {
      fail(`Could not find required outgoing port named "${opt.subscribe}".`)
    }

    if (!elmUpdate.subscribe) {
      fail(`Port "${opt.subscribe}" is not defined as an outgoing port in Elm application.`)
    }

    elmUpdate.subscribe(model => dispatch({
      type: update,
      payload: model
    }))

    return next => action => {
      if (action.type === update) return next(action)

      if (action.type.indexOf(`${opt.name}/`) === 0) {
        const { port, message } = action.payload
        ports[port].send(message)
      }

      return next(action)
    }
  }
}