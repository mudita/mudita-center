import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { connect, Provider } from "react-redux"
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
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN } from "Renderer/constants/urls"
import { RootState } from "Renderer/store"

interface Props {
  store: Store
  history: History
  toggleDisconnectedDevice: (disconnectedDevice: boolean) => void
  disconnectedDevice: boolean
}

const BaseApp: FunctionComponent<Props> = ({
  disconnectedDevice,
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
    if (disconnectedDevice) {
      history.push(URL_MAIN.news)
    } else {
      history.push(URL_MAIN.overview)
    }
  }, [disconnectedDevice])

  useEffect(() => {
    ;(async () => {
      const response = await getAppSettings()
      setPureNeverConnected(response.pureNeverConnected)
    })()
  }, [])

  useEffect(() => {
    if (disconnectedDevice && pureNeverConnected) {
      history.push(URL_ONBOARDING.root)
    }
  }, [pureNeverConnected])

  return (
    <Provider store={store}>
      <NetworkStatusChecker />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    disconnectedDevice: state.basicInfo.disconnectedDevice,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  toggleDisconnectedDevice: (disconnectedDevice: boolean) =>
    dispatch.basicInfo.update({ disconnectedDevice }),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
