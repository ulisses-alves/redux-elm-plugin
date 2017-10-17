import * as _action from './action'
import * as _reducer from './reducer'
import * as _middleware from './middleware'

export const action = _action.create
export const actions = _action.createMany
export const actionsFromPorts = _action.fromPorts
export const reducer = _reducer.create
export const middleware = _middleware.create

export function app (elmApp, actionNames = [], options = {}) {
  return {
    actions: actions(actionNames, options),
    reducer: reducer(options),
    middleware: middleware(elmApp, options)
  }
}