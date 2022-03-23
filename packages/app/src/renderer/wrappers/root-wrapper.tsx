/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDevice, DeviceType } from "@mudita/pure"
import { connect } from "react-redux"
import { History } from "history"
import React, { useEffect } from "react"
import { IntlProvider } from "react-intl"
import localeEn from "Renderer/locales/default/en-US.json"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defaultLanguage } from "App/translations.config.json"
import { ModalProvider } from "Renderer/components/core/modal/modal.service"
import modalService from "Renderer/components/core/modal/modal.service"
import HelpApp from "Renderer/wrappers/help-app.component"
import ErrorApp from "Renderer/wrappers/error-app.component"
import BaseApp from "Renderer/wrappers/base-app.component"
import { Mode } from "Common/enums/mode.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { QuestionAndAnswer } from "App/help/components/help.component"
import registerDeviceConnectedListener, {
  removeDeviceConnectedListener,
} from "Renderer/listeners/register-device-connected.listener"
import registerDeviceDisconnectedListener, {
  removeDeviceDisconnectedListener,
} from "Renderer/listeners/register-device-disconnected.listener"
import registerHotkeys from "Renderer/register-hotkeys"
import registerAppContextMenu from "Renderer/register-app-context-menu"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import registerDeviceLockedListener, {
  removeDeviceLockedListener,
} from "Renderer/listeners/register-device-locked.listener"
import registerDeviceUnlockedListener, {
  removeDeviceUnlockedListener,
} from "Renderer/listeners/register-device-unlocked.listener"
import registerAvailableAppUpdateListener from "App/main/functions/register-avaible-app-update-listener"
import registerNotAvailableAppUpdateListener from "App/main/functions/register-not-avaible-app-update-listener"
import LicenseApp from "./license-app.component"
import TermsOfServiceApp from "./terms-of-service-app.component"
import PrivacyPolicyApp from "./privacy-policy-app.component"
import { flags, Feature } from "App/feature-flags"
import SarApp from "./sar-app.component"

import { TmpDispatch, ReduxRootState } from "Renderer/store"
import {
  connectDevice,
  unlockedDevice,
  lockedDevice,
  getConnectedDevice,
  loadDeviceData,
  setConnectionStatus,
} from "App/device"
import { getCrashDump } from "App/crash-dump"
import {
  registerDataSyncListener,
  registerCacheDataListener,
} from "App/data-sync/listeners"
import { setVisitorMetadataRequest } from "App/analytic-data-tracker/requests"

interface Props {
  history: History
  connect: () => void
  setFalseConnectionStatus: () => void
  connectDevice: (value: DeviceType) => void
  lockedDevice: () => void
  unlockedDevice: () => void
  getCrashDump: () => void
  // TODO remove legacy staff
  checkAppUpdateAvailable: () => void
  toggleAppUpdateAvailable: (value: boolean) => void
  setAppLatestVersion: (value: string) => void
  loadSettings: () => void
  loadDeviceData: (value: DeviceType) => void
  connectedAndUnlocked: boolean
  deviceType: DeviceType | null
}

const RootWrapper: FunctionComponent<Props> = ({
  history,
  connect,
  setFalseConnectionStatus,
  connectDevice,
  lockedDevice,
  unlockedDevice,
  getCrashDump,
  // TODO remove legacy staff
  checkAppUpdateAvailable,
  toggleAppUpdateAvailable,
  setAppLatestVersion,
  loadSettings,
  loadDeviceData,
  connectedAndUnlocked,
  deviceType,
}) => {
  const params = new URLSearchParams(window.location.search)
  const saveToStore = async (normalizeData: QuestionAndAnswer) =>
    await ipcRenderer.callMain(HelpActions.SetStoreValue, normalizeData)
  const getStoreData = async (key?: string) =>
    await ipcRenderer.callMain(HelpActions.GetStore, key)

  const RenderRoutes = () => {
    if (params.get("mode") === Mode.ServerError) {
      return <ErrorApp history={history} />
    }

    if (params.get("mode") === Mode.Help) {
      return (
        <HelpApp
          history={history}
          saveToStore={saveToStore}
          getStoreData={getStoreData}
        />
      )
    }

    if (params.get("mode") === Mode.License) {
      return <LicenseApp history={history} />
    }

    if (params.get("mode") === Mode.TermsOfService) {
      return <TermsOfServiceApp history={history} />
    }

    if (params.get("mode") === Mode.PrivacyPolicy) {
      return <PrivacyPolicyApp history={history} />
    }

    if (params.get("mode") === Mode.Sar) {
      return <SarApp history={history} />
    }

    return <BaseApp history={history} />
  }

  const handleAppUpdateAvailableCheck = (): void => {
    if (!window.navigator.onLine) {
      toggleAppUpdateAvailable(false)
    } else {
      checkAppUpdateAvailable()
    }
  }

  useEffect(() => {
    void setVisitorMetadataRequest({
      ua: window.navigator.userAgent,
      lang: window.navigator.language,
      res: `${window.screen.width * window.devicePixelRatio}x${
        window.screen.height * window.devicePixelRatio
      }`,
    })
  }, [])

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    const dataSync = registerDataSyncListener()
    const dataCache = registerCacheDataListener()

    return () => {
      dataSync()
      dataCache()
    }
  }, [])

  useEffect(() => {
    if (connectedAndUnlocked) {
      getCrashDump()
    }
  }, [connectedAndUnlocked])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (deviceType && connectedAndUnlocked) {
      interval = setInterval(() => loadDeviceData(deviceType), 60000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [deviceType, connectedAndUnlocked])

  useEffect(() => {
    const listener = () => {
      setFalseConnectionStatus()
    }
    const unregister = () => {
      removeDeviceDisconnectedListener(listener)
    }
    registerDeviceDisconnectedListener(listener)
    return () => unregister()
  })

  useEffect(() => {
    const listener = (_: any, props: MuditaDevice) => {
      connectDevice(props.deviceType)
    }
    registerDeviceConnectedListener(listener)
    return () => removeDeviceConnectedListener(listener)
  })

  useEffect(() => {
    const listener = () => {
      lockedDevice()
    }
    const unregister = () => {
      removeDeviceLockedListener(listener)
    }
    registerDeviceLockedListener(listener)
    return () => unregister()
  })

  useEffect(() => {
    const listener = () => {
      if (!connectedAndUnlocked) {
        unlockedDevice()
      }
    }
    registerDeviceUnlockedListener(listener)
    return () => removeDeviceUnlockedListener(listener)
  }, [connectedAndUnlocked])

  useEffect(() => {
    const unregister = registerAvailableAppUpdateListener((version) => {
      toggleAppUpdateAvailable(true)
      setAppLatestVersion(version as string)
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerNotAvailableAppUpdateListener(() => {
      toggleAppUpdateAvailable(false)
    })

    return () => unregister()
  })

  useEffect(() => {
    loadSettings()
    handleAppUpdateAvailableCheck()

    const devModeHidden = flags.get(Feature.DeveloperModeHidden)
    const productionEnvironment = flags.get(Feature.DisabledOnProduction)
    //Remove this condition to get devMode on production
    if (!(devModeHidden && productionEnvironment)) {
      // Register hotkeys
      registerHotkeys()

      // Register context menu
      registerAppContextMenu(appContextMenu)
      appContextMenu.init()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={defaultLanguage}
        locale={defaultLanguage}
        messages={localeEn}
      >
        <ModalProvider service={modalService}>
          <>
            <Normalize />
            <GlobalStyle />
            <RenderRoutes />
          </>
        </ModalProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

const mapStateToProps = (state: ReduxRootState) => ({
  connectedAndUnlocked:
    state.device.status.connected && Boolean(state.device.status.unlocked),
  deviceType: state.device.deviceType,
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  loadDeviceData: (value: DeviceType) => dispatch(loadDeviceData(value)),
  connect: () => dispatch(getConnectedDevice()),
  setFalseConnectionStatus: () => dispatch(setConnectionStatus(false)),
  connectDevice: (value: DeviceType) => dispatch(connectDevice(value)),
  lockedDevice: () => dispatch(lockedDevice()),
  unlockedDevice: () => dispatch(unlockedDevice()),
  getCrashDump: () => dispatch(getCrashDump()),
  // TODO remove legacy staff
  checkAppUpdateAvailable: () => dispatch.settings.checkAppUpdateAvailable(),
  toggleAppUpdateAvailable: (value: boolean) =>
    dispatch.settings.toggleAppUpdateAvailable(value),
  setAppLatestVersion: (value: string) =>
    dispatch.settings.setAppLatestVersion(value),
  loadSettings: () => dispatch.settings.loadSettings(),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootWrapper)
