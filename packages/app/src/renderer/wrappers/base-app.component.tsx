import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { connect, Provider } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { select, Store } from "Renderer/store"
import { History } from "history"
import registerDisconnectedDeviceListener, {
  removeDisconnectedDeviceListener,
} from "Renderer/listeners/register-disconnected-device.listener"
import registerConnectedDeviceListener, {
  removeConnectedDeviceListener,
} from "Renderer/listeners/register-connected-device.listener"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN } from "Renderer/constants/urls"
import { RootState } from "Renderer/store"
import registerHotkeys from "Renderer/register-hotkeys"
import registerAppContextMenu from "Renderer/register-app-context-menu"
import appContextMenu from "./app-context-menu"

interface Props {
  store: Store
  history: History
  toggleDisconnectedDevice: (disconnectedDevice: boolean) => void
  connected: boolean
}

const BaseApp: FunctionComponent<Props> = ({
  connected,
  toggleDisconnectedDevice,
  store,
  history,
}) => {
  const [pureNeverConnected, setPureNeverConnected] = useState(false)
  useEffect(() => {
    const listener = () => {
      toggleDisconnectedDevice(true)
    }
    registerDisconnectedDeviceListener(listener)
    return () => removeDisconnectedDeviceListener(listener)
  })

  useEffect(() => {
    const listener = () => {
      toggleDisconnectedDevice(false)
    }
    registerConnectedDeviceListener(listener)
    return () => removeConnectedDeviceListener(listener)
  })

  useEffect(() => {
    ;(async () => {
      const response = await getAppSettings()
      setPureNeverConnected(response.pureNeverConnected)
    })()

    // Register hotkeys
    registerHotkeys()

    // Register context menu

    registerAppContextMenu(appContextMenu)
    appContextMenu.init()
  }, [])

  useEffect(() => {
    if (!connected && !pureNeverConnected) {
      history.push(URL_MAIN.news)
    } else if (!connected && pureNeverConnected) {
      history.push(URL_ONBOARDING.root)
    } else if (connected && pureNeverConnected) {
      history.push(URL_ONBOARDING.connecting)
    } else if (connected && !pureNeverConnected) {
      history.push(URL_MAIN.overview)
    }
  }, [connected, pureNeverConnected])

  return (
    <Provider store={store}>
      <NetworkStatusChecker />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

const selection = select((models: any) => ({
  connected: models.basicInfo.isConnected,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as { connected: boolean }),
  }
}

const mapDispatchToProps = ({ basicInfo }: any) => ({
  toggleDisconnectedDevice: basicInfo.toggleDisconnectedDevice,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
