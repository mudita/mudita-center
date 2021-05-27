/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
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
import registerDeviceLockedListener, {
  removeDeviceLockedListener,
} from "Renderer/listeners/register-device-locked.listener"
import registerDeviceUnlockedListener, {
  removeDeviceUnlockedListener,
} from "Renderer/listeners/register-device-unlocked.listener"
import checkAppUpdateRequest from "Renderer/requests/check-app-update.request"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN } from "Renderer/constants/urls"
import { RootState } from "Renderer/store"
import registerHotkeys from "Renderer/register-hotkeys"
import registerAppContextMenu from "Renderer/register-app-context-menu"
import appContextMenu from "./app-context-menu"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import CollectingDataModal from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.component"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import registerAvailableAppUpdateListener from "App/main/functions/register-avaible-app-update-listener"
import registerNotAvailableAppUpdateListener from "App/main/functions/register-not-avaible-app-update-listener"

interface Props {
  store: Store
  history: History
  pureFeaturesVisible?: boolean
  deviceConnecting?: boolean
  pureNeverConnected?: boolean
  appUpdateAvailable?: boolean
  settingsLoaded?: boolean
  appCollectingData?: boolean
  appUpdateStepModalDisplayed?: boolean
  toggleDeviceConnected: (deviceConnected: boolean) => void
  toggleDeviceUnlocked: (deviceUnlocked: boolean) => void
  toggleAppUpdateAvailable: (appUpdateAvailable: boolean) => void
  toggleAppCollectingData: (appCollectingData: boolean) => void
  setAppUpdateStepModalDisplayed: () => void
  loadSettings: () => Promise<void>
}

const BaseApp: FunctionComponent<Props> = ({
  store,
  history,
  pureFeaturesVisible,
  deviceConnecting,
  pureNeverConnected,
  appUpdateAvailable,
  settingsLoaded,
  appCollectingData,
  appUpdateStepModalDisplayed,
  toggleDeviceConnected,
  toggleDeviceUnlocked,
  toggleAppUpdateAvailable,
  toggleAppCollectingData,
  setAppUpdateStepModalDisplayed,
  loadSettings,
}) => {
  const appUpdateStepModalVisible =
    !!settingsLoaded &&
    !!appUpdateAvailable &&
    !appUpdateStepModalDisplayed &&
    appCollectingData !== undefined

  const collectingDataModalVisible =
    !!settingsLoaded && appCollectingData === undefined

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
    const listener = () => {
      toggleDeviceUnlocked(false)
    }
    registerDeviceLockedListener(listener)
    return () => removeDeviceLockedListener(listener)
  })

  useEffect(() => {
    const listener = () => {
      toggleDeviceUnlocked(true)
    }
    registerDeviceUnlockedListener(listener)
    return () => removeDeviceUnlockedListener(listener)
  })

  useEffect(() => {
    const unregister = registerAvailableAppUpdateListener(() => {
      toggleAppUpdateAvailable(true)
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerNotAvailableAppUpdateListener(() => {
      setAppUpdateStepModalDisplayed()
      toggleAppUpdateAvailable(false)
    })

    return () => unregister()
  })

  useEffect(() => {
    void loadSettings()
    void checkAppUpdateRequest()

    // Register hotkeys
    registerHotkeys()

    // Register context menu

    registerAppContextMenu(appContextMenu)
    appContextMenu.init()
  }, [])

  useRouterListener(history, {
    [URL_MAIN.contacts]: [store.dispatch.contacts.loadData],
    [URL_MAIN.phone]: [store.dispatch.contacts.loadData],
    [URL_MAIN.overview]: [store.dispatch.basicInfo.loadBasicInfoData],
    [URL_MAIN.messages]: [store.dispatch.messages.loadData],
  })

  useEffect(() => {
    if (deviceConnecting) {
      history.push(URL_ONBOARDING.connecting)
    } else if (!pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.news)
    } else if (!pureFeaturesVisible && pureNeverConnected) {
      history.push(URL_ONBOARDING.root)
    } else if (pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.overview)
    }
  }, [pureFeaturesVisible, pureNeverConnected, deviceConnecting])

  const allowToAppCollectingData = (): void => {
    toggleAppCollectingData(true)
  }

  const disallowToAppCollectingData = (): void => {
    toggleAppCollectingData(false)
  }

  const closeAppUpdateStepModal = (): void => {
    setAppUpdateStepModalDisplayed()
  }

  return (
    <Provider store={store}>
      <NetworkStatusChecker />
      <CollectingDataModal
        open={collectingDataModalVisible}
        onActionButtonClick={allowToAppCollectingData}
        closeModal={disallowToAppCollectingData}
      />
      {appUpdateStepModalVisible && (
        <AppUpdateStepModal closeModal={closeAppUpdateStepModal} />
      )}
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

const selection = select((models: any) => ({
  pureFeaturesVisible: models.basicInfo.pureFeaturesVisible,
  deviceConnecting: models.basicInfo.deviceConnecting,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as {
      pureFeaturesVisible: boolean
      deviceConnecting: boolean
    }),
    pureNeverConnected: state.settings.pureNeverConnected,
    appUpdateAvailable: state.settings.appUpdateAvailable,
    appCollectingData: state.settings.appCollectingData,
    settingsLoaded: state.settings.settingsLoaded,
    appUpdateStepModalDisplayed: state.settings.appUpdateStepModalVisible,
  }
}

const mapDispatchToProps = ({ basicInfo, settings }: any) => ({
  toggleDeviceConnected: basicInfo.toggleDeviceConnected,
  toggleDeviceUnlocked: basicInfo.toggleDeviceUnlocked,
  toggleAppUpdateAvailable: settings.toggleAppUpdateAvailable,
  toggleAppCollectingData: settings.toggleAppCollectingData,
  setAppUpdateStepModalDisplayed: settings.setAppUpdateStepModalDisplayed,
  loadSettings: settings.loadSettings,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
