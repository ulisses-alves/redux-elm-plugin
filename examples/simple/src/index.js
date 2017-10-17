import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import * as elmPlugin from '../../../dist/redux-elm-plugin.es'
import Elm from './Counter.elm'

const counter = elmPlugin.app(
  Elm.Counter,
  [ 'increment' ],
  {
    name: 'counter'
  }
)

const store = createStore(
  counter.reducer,
  {
    value: 0
  },
  applyMiddleware(
    counter.middleware,
    logger
  )
)

const display = document.getElementById('display')
const increment = document.getElementById('increment')

store.subscribe(() => {
  const state = store.getState()
  display.value = state.value.toString()
})

increment.onclick = () => {
  store.dispatch(
    counter.actions.increment()
  )
}