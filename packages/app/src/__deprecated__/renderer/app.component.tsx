import React from "react"
import { hot } from "react-hot-loader"

import history from "App/__deprecated__/renderer/routes/history"
import store from "App/__deprecated__/renderer/store"
import RootWrapper from "App/__deprecated__/renderer/wrappers/root-wrapper"
import { Provider } from "react-redux"

const App = () => (
  <Provider store={store}>
    <RootWrapper history={history} />
  </Provider>
)

export default hot(module)(App)
