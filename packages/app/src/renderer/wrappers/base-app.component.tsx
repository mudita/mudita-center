/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { connect, Provider } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { select, Store } from "Renderer/store"
import { History } from "history"
import registerDeviceDisconnectedListener, {
  removeDeviceDisconnectedListener,
} from "Renderer/listeners/register-device-disconnected.listener"
import registerDeviceConnectedListener, {
  removeDeviceConnectedListener,
} from "Renderer/listeners/register-device-connected.listener"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN } from "Renderer/constants/urls"
import { RootState } from "Renderer/store"
import registerHotkeys from "Renderer/register-hotkeys"
import registerAppContextMenu from "Renderer/register-app-context-menu"
import appContextMenu from "./app-context-menu"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import CollectingModal from "App/collecting-data-modal/collecting-modal.component"

interface Props {
  store: Store
  history: History
  toggleDeviceConnected: (deviceConnected: boolean) => void
  pureFeaturesVisible: boolean
}

const BaseApp: FunctionComponent<Props> = ({
  pureFeaturesVisible,
  toggleDeviceConnected,
  store,
  history,
}) => {
  const [pureNeverConnected, setPureNeverConnected] = useState(false)
  useEffect(() => {
    const listener = () => {
      toggleDeviceConnected(false)
    }
    registerDeviceDisconnectedListener(listener)
    return () => removeDeviceDisconnectedListener(listener)
  })

  useEffect(() => {
    const listener = () => {
      toggleDeviceConnected(true)
    }
    registerDeviceConnectedListener(listener)
    return () => removeDeviceConnectedListener(listener)
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

  useRouterListener(history, {
    [URL_MAIN.contacts]: [store.dispatch.contacts.loadData],
    [URL_MAIN.phone]: [store.dispatch.contacts.loadData],
    [URL_MAIN.overview]: [store.dispatch.basicInfo.loadData],
    [URL_MAIN.messages]: [store.dispatch.messages.loadData],
  })

  useEffect(() => {
    if (!pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.news)
    } else if (!pureFeaturesVisible && pureNeverConnected) {
      history.push(URL_ONBOARDING.root)
    } else if (pureFeaturesVisible && pureNeverConnected) {
      history.push(URL_ONBOARDING.connecting)
    } else if (pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.overview)
    }
  }, [pureFeaturesVisible, pureNeverConnected])

  return (
    <Provider store={store}>
      <NetworkStatusChecker />
      <CollectingModal />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

const selection = select((models: any) => ({
  pureFeaturesVisible: models.basicInfo.pureFeaturesVisible,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as { pureFeaturesVisible: boolean }),
  }
}

const mapDispatchToProps = ({ basicInfo }: any) => ({
  toggleDeviceConnected: basicInfo.toggleDeviceConnected,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
