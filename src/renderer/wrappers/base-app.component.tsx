import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Provider } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { Store } from "Renderer/store"
import { History } from "history"
import registerDisconnectedDeviceListener, {
  removeDisconnectedDeviceListener,
} from "Renderer/listeners/register-disconnected-device.listener"
import registerConnectedDeviceListener, {
  removeConnectedDeviceListener,
} from "Renderer/listeners/register-connected-device.listener"

interface Props {
  store: Store
  history: History
}

const BaseApp: FunctionComponent<Props> = ({ store, history }) => {
  useEffect(() => {
    const disconnect = () => {
      store.dispatch.basicInfo.update({ disconnectedDevice: true })
    }
    registerDisconnectedDeviceListener(disconnect)
    return () => removeDisconnectedDeviceListener(disconnect)
  })

  useEffect(() => {
    store.dispatch.basicInfo.connect()
    const connect = () => {
      store.dispatch.basicInfo.update({ disconnectedDevice: false })
    }
    registerConnectedDeviceListener(connect)
    return () => removeConnectedDeviceListener(connect)
  })

  return (
    <Provider store={store}>
      <NetworkStatusChecker />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

export default BaseApp
