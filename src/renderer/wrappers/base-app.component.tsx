import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Provider } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { Store } from "Renderer/store"
import { History } from "history"

interface Props {
  store: Store
  history: History
}

const BaseApp: FunctionComponent<Props> = ({ store, history }) => (
  <Provider store={store}>
    <NetworkStatusChecker />
    <Router history={history}>
      <BaseRoutes />
    </Router>
  </Provider>
)

export default BaseApp
