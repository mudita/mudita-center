/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDevice, DeviceType } from "@mudita/pure"
import { connect } from "react-redux"
import { History } from "history"
import React, { useEffect } from "react"
import { IntlProvider } from "react-intl"
import localeEn from "App/__deprecated__/renderer/locales/default/en-US.json"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "App/__deprecated__/renderer/styles/global-style.component"
import theme from "App/__deprecated__/renderer/styles/theming/theme"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import translationConfig from "App/translations.config.json"
import { ModalProvider } from "App/__deprecated__/renderer/components/core/modal/modal.service"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import HelpApp from "App/__deprecated__/renderer/wrappers/help-app.component"
import ErrorApp from "App/__deprecated__/renderer/wrappers/error-app.component"
import BaseApp from "App/__deprecated__/renderer/wrappers/base-app.component"
import { Mode } from "App/__deprecated__/common/enums/mode.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { QuestionAndAnswer } from "App/help/components/help.component"
import registerDeviceConnectedListener, {
  removeDeviceConnectedListener,
} from "App/__deprecated__/renderer/listeners/register-device-connected.listener"
import registerDeviceDisconnectedListener, {
  removeDeviceDisconnectedListener,
} from "App/__deprecated__/renderer/listeners/register-device-disconnected.listener"
import registerHotkeys from "App/__deprecated__/renderer/register-hotkeys"
import registerAppContextMenu from "App/__deprecated__/renderer/register-app-context-menu"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import registerDeviceLockedListener, {
  removeDeviceLockedListener,
} from "App/__deprecated__/renderer/listeners/register-device-locked.listener"
import registerDeviceUnlockedListener, {
  removeDeviceUnlockedListener,
} from "App/__deprecated__/renderer/listeners/register-device-unlocked.listener"
import registerAvailableAppUpdateListener from "App/__deprecated__/main/functions/register-avaible-app-update-listener"
import registerNotAvailableAppUpdateListener from "App/__deprecated__/main/functions/register-not-avaible-app-update-listener"
import LicenseApp from "./license-app.component"
import TermsOfServiceApp from "./terms-of-service-app.component"
import PrivacyPolicyApp from "./privacy-policy-app.component"
import { flags, Feature } from "App/feature-flags"
import SarApp from "./sar-app.component"

import { TmpDispatch, ReduxRootState } from "App/__deprecated__/renderer/store"
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
import { initAnalyticDataTracker } from "App/analytic-data-tracker/helpers"
import { registerOutboxNotificationListener } from "App/notification/listeners"
import { registerCrashDumpExistListener } from "App/crash-dump/listeners"

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
    void initAnalyticDataTracker()
  }, [])

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    const dataSync = registerDataSyncListener()
    const dataCache = registerCacheDataListener()
    const outboxNotifications = registerOutboxNotificationListener()
    const crashDump = registerCrashDumpExistListener()

    return () => {
      dataSync()
      dataCache()
      outboxNotifications()
      crashDump()
    }
  })

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
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
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
