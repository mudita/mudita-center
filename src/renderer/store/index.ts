import { applyMiddleware, createStore, Middleware, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "Renderer/reducers"
import RootState from "Renderer/reducers/state"

const index = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: Middleware[] = []
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
  return createStore(rootReducer, initialState, enhancer)
}

const store = index()

if (typeof module.hot !== "undefined") {
  module.hot.accept("../reducers", () =>
    store.replaceReducer(require("../reducers").rootReducer)
  )
}

export default store
