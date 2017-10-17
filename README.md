# redux-elm-plugin
Utility package for wrapping Elm application ports into Redux actions and reducers.

The plugin exports the following members from a given Elm app:
+ Specified incoming ports as action creators.
+ Reducer that updates store's state with Elm's state.
+ Middleware that routes actions to/from Elm app's ports.

## Install
`npm install --save redux-elm-plugin`

## Usage
```javascript
import * as elmPlugin 'redux-elm-plugin'

const { actions, reducer, middleware } =
    elmPlugin.app(elmApp, [actionNames], [options])
```

## Options
```javascript
// Default options:
{
  // Application name to be used for Redux action types.
  // ex. "elm/UPDATED"
  name: 'elm',
  // Port name to which the plugin should subscribe to for state
  // updates.
  subscribe: 'updated'
}
```

## Example
### JavaScript
```javascript
import { createStore, applyMiddleware } from 'redux'
import * as elmPlugin from 'redux-elm-plugin'
import Elm from './Counter.elm' // or window.Elm

const counter = elmPlugin.app(
  Elm.Counter,
  [
    // matching incoming port name
    'increment'
  ]
)

const store = createStore(
  counter.reducer,
  // initial state will be provided as flags to the Elm application
  {
    value: 1
  },
  applyMiddleware(
    // required for routing actions to/from Elm ports
    counter.middleware
  )
)

store.dispatch(
  counter.actions.increment()
)
```

### Elm
```elm
port module Counter exposing (main)

import Json.Decode
import Platform


main : Program Model Model Msg
main =
    Platform.programWithFlags
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


-- Invoked when increment action is dispatched through Redux store
port increment : (() -> msg) -> Sub msg


-- Updates Redux state with new value
port updated : Model -> Cmd msg



type alias Model =
    { value : Int
    }


type Msg
    = Increment


init : Model -> ( Model, Cmd Msg )
init model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    increment (always Increment)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            let
                newModel =
                    { model | value = model.value + 1 }
            in
                ( newModel, updated newModel )
```

## Individual creator functions
Actions, reducer and middleware can be created individually as follows:


#### action(name [, options])
```javascript
const increment = elmPlugin.action('increment')
```

#### actions(names [, options])
``` javascript
const actions = elmPlugin.actions([
  'increment',
  'multiply'
])
```

#### actionsFromPorts(ports [, options])
```javascript
const app = Elm.App.worker()

const actions = elmPlugin.actionsFromPorts(app.ports)
```

#### reducer([options])
```javascript
const reducer = elmPlugin.reducer()
```

#### middleware(app [, options])
```javascript
const middleware = elmPlugin.middleware(Elm.App)
```