/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { connect } from "react-redux"
import { History } from "history"
import React, { useCallback, useEffect } from "react"
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
import registerAppContextMenu from "App/__deprecated__/renderer/register-app-context-menu"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import registerAvailableAppUpdateListener from "App/__deprecated__/main/functions/register-avaible-app-update-listener"
import registerNotAvailableAppUpdateListener from "App/__deprecated__/main/functions/register-not-avaible-app-update-listener"
import LicenseApp from "./license-app.component"
import TermsOfServiceApp from "./terms-of-service-app.component"
import PrivacyPolicyApp from "./privacy-policy-app.component"
import { flags, Feature } from "App/feature-flags"
import SarApp from "./sar-app.component"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setAgreementStatus } from "App/device"
import {
  loadSettings,
  setLatestVersion,
  toggleApplicationUpdateAvailable,
  checkUpdateAvailable,
} from "App/settings/actions"
import {
  registerDataSyncListener,
  registerCacheDataListener,
} from "App/data-sync/listeners"
import { initAnalyticDataTracker } from "App/analytic-data-tracker/helpers"
import { registerOutboxNotificationListener } from "App/notification/listeners"
import { registerCrashDumpExistListener } from "App/crash-dump/listeners"
import { EULAAgreement } from "App/eula-agreement/components"
import { useApplicationListener } from "App/application/hooks"
import { getCurrentDevice } from "App/device-manager/actions"
import {
  registerCurrentDeviceChangedListener,
  registerDeviceDetachedListener,
} from "App/device-manager/listeners"
import {
  registerDeviceUnlockedListener,
  registerDeviceLockTimeListener,
  registerDeviceInitializationFailedListener,
} from "App/device/listeners"
import {
  registerClearingUpdateStateOnDeviceAttachedListener,
  registerDownloadCancelOnDeviceDetachedListener,
} from "App/update/listeners"
import { setConnectionStatus } from "App/device/actions"
import { resetUploadingState } from "App/files-manager/actions"

interface Props {
  history: History
  // TODO remove legacy staff
  checkUpdateAvailable: () => void
  toggleApplicationUpdateAvailable: (value: boolean) => void
  setLatestVersion: (value: string) => void
  loadSettings: () => void
  deviceType: DeviceType | null
  setAgreementStatus: (value: boolean) => void
  getCurrentDevice: () => void
  setConnectionStatus: (status: boolean) => void
  resetUploadingState: () => void
}

const RootWrapper: FunctionComponent<Props> = ({
  history,
  setAgreementStatus,
  getCurrentDevice,
  // TODO remove legacy staff
  checkUpdateAvailable,
  toggleApplicationUpdateAvailable,
  setLatestVersion,
  loadSettings,
  setConnectionStatus,
  resetUploadingState,
}) => {
  const onAgreementStatusChangeListener = useCallback(
    (value) => {
      setAgreementStatus(value)
    },
    [setAgreementStatus]
  )

  useApplicationListener(onAgreementStatusChangeListener)

  const mode = new URLSearchParams(window.location.search).get("mode")
  const saveToStore = async (normalizeData: QuestionAndAnswer) =>
    await ipcRenderer.callMain(HelpActions.SetStoreValue, normalizeData)
  const getStoreData = async (key?: string) =>
    await ipcRenderer.callMain(HelpActions.GetStore, key)

  const RenderRoutes = () => {
    if (mode === Mode.ServerError) {
      return <ErrorApp history={history} />
    }

    if (mode === Mode.Help) {
      return (
        <HelpApp
          history={history}
          saveToStore={saveToStore}
          getStoreData={getStoreData}
        />
      )
    }

    if (mode === Mode.License) {
      return <LicenseApp history={history} />
    }

    if (mode === Mode.TermsOfService) {
      return <TermsOfServiceApp history={history} />
    }

    if (mode === Mode.PrivacyPolicy) {
      return <PrivacyPolicyApp history={history} />
    }

    if (mode === Mode.Sar) {
      return <SarApp history={history} />
    }

    return <BaseApp history={history} />
  }

  const handleAppUpdateAvailableCheck = (): void => {
    if (!window.navigator.onLine) {
      toggleApplicationUpdateAvailable(false)
    } else {
      checkUpdateAvailable()
    }
  }

  const onDeviceDetachHandler = () => {
    void resetUploadingState()
    void setConnectionStatus(false)
  }

  useEffect(() => {
    void initAnalyticDataTracker()
  }, [])

  useEffect(() => {
    const dataSync = registerDataSyncListener()
    const dataCache = registerCacheDataListener()
    const outboxNotifications = registerOutboxNotificationListener()
    const deviceUnlocked = registerDeviceUnlockedListener()
    const deviceInitializationFailedListener =
      registerDeviceInitializationFailedListener()
    const deviceLockTimeListener = registerDeviceLockTimeListener()
    const crashDump = registerCrashDumpExistListener()
    const currentDeviceChangedListener = registerCurrentDeviceChangedListener()
    const deviceDetachedListener = registerDeviceDetachedListener(
      onDeviceDetachHandler
    )
    const downloadCancelOnDeviceDetachedListener =
      registerDownloadCancelOnDeviceDetachedListener()
    const clearingUpdateStateOnDeviceAttachedListener =
      registerClearingUpdateStateOnDeviceAttachedListener()

    return () => {
      dataSync()
      dataCache()
      outboxNotifications()
      deviceUnlocked()
      deviceInitializationFailedListener()
      deviceLockTimeListener()
      crashDump()
      currentDeviceChangedListener()
      deviceDetachedListener()
      downloadCancelOnDeviceDetachedListener()
      clearingUpdateStateOnDeviceAttachedListener()
    }
  })

  useEffect(() => {
    getCurrentDevice()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const unregister = registerAvailableAppUpdateListener((version) => {
      toggleApplicationUpdateAvailable(true)
      setLatestVersion(version as string)
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerNotAvailableAppUpdateListener(() => {
      toggleApplicationUpdateAvailable(false)
    })

    return () => unregister()
  })

  useEffect(() => {
    loadSettings()
    if (!mode) {
      handleAppUpdateAvailableCheck()
    }

    const devModeEnabled = flags.get(Feature.DeveloperModeEnabled)
    // Remove this condition to get devMode on production
    if (devModeEnabled) {
      // Register context menu
      registerAppContextMenu(appContextMenu)
      appContextMenu.init()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={localeEn}
      >
        <ModalProvider service={modalService}>
          <EULAAgreement>
            <Normalize />
            <GlobalStyle />
            <RenderRoutes />
          </EULAAgreement>
        </ModalProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

const mapStateToProps = (state: ReduxRootState) => ({
  deviceType: state.device.deviceType,
})

const mapDispatchToProps = {
  checkUpdateAvailable,
  toggleApplicationUpdateAvailable,
  setLatestVersion,
  loadSettings,
  setAgreementStatus,
  getCurrentDevice,
  setConnectionStatus,
  resetUploadingState,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootWrapper)
