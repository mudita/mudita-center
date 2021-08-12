/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Store } from "Renderer/store"
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
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { useEffect, useState } from "react"
import { getTranslation } from "Renderer/requests/get-translation.request"
import registerDeviceConnectedListener, {
  removeDeviceConnectedListener,
} from "Renderer/listeners/register-device-connected.listener"
import registerDeviceDisconnectedListener, {
  removeDeviceDisconnectedListener,
} from "Renderer/listeners/register-device-disconnected.listener"
import checkAppUpdateRequest from "Renderer/requests/check-app-update.request"
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

interface Props {
  store: Store
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ store, history }) => {
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

    return <BaseApp store={store} history={history} />
  }

  const handleAppUpdateAvailableCheck = (): void => {
    if (!window.navigator.onLine) {
      store.dispatch.settings.setAppUpdateStepModalDisplayed()
      store.dispatch.settings.toggleAppUpdateAvailable(false)
    } else {
      void checkAppUpdateRequest()
    }
  }

  /**
   * Get translations from store
   */
  const [messages, setMessages] = useState<Record<string, string>>()
  const [locale, setLocale] = useState<string>(defaultLanguage)

  useEffect(() => {
    ;(async () => {
      const { store, language } = await getTranslation()
      setMessages(store)
      setLocale(language)
    })()
  }, [])

  useEffect(() => {
    store.dispatch.basicInfo.connect()
  }, [])

  useEffect(() => {
    const listener = () => {
      modalService.closeModal(true)
      store.dispatch.basicInfo.toggleDeviceConnected(false)
    }
    const unregister = () => {
      removeDeviceDisconnectedListener(listener)
    }
    registerDeviceDisconnectedListener(listener)
    return () => unregister()
  })

  useEffect(() => {
    const listener = () => {
      store.dispatch.basicInfo.toggleDeviceConnected(true)
    }
    registerDeviceConnectedListener(listener)
    return () => removeDeviceConnectedListener(listener)
  })

  useEffect(() => {
    const listener = () => {
      store.dispatch.basicInfo.toggleDeviceUnlocked(false)
    }
    const unregister = () => {
      removeDeviceLockedListener(listener)
    }
    registerDeviceLockedListener(listener)
    return () => unregister()
  })

  useEffect(() => {
    const listener = () => {
      store.dispatch.basicInfo.toggleDeviceUnlocked(true)
    }
    registerDeviceUnlockedListener(listener)
    return () => removeDeviceUnlockedListener(listener)
  })

  useEffect(() => {
    const unregister = registerAvailableAppUpdateListener((version) => {
      store.dispatch.settings.toggleAppUpdateAvailable(true)
      store.dispatch.settings.setAppLatestVersion(version)
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerNotAvailableAppUpdateListener(() => {
      store.dispatch.settings.setAppUpdateStepModalDisplayed()
      store.dispatch.settings.toggleAppUpdateAvailable(false)
    })

    return () => unregister()
  })

  useEffect(() => {
    void store.dispatch.settings.loadSettings()
    handleAppUpdateAvailableCheck()

    //Remove this condition to get devMode on production
    if (process.env.NODE_ENV !== "production") {
      // Register hotkeys
      registerHotkeys()

      // Register context menu
      registerAppContextMenu(appContextMenu)
    }

    appContextMenu.init()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {messages && (
        <IntlProvider
          defaultLocale={defaultLanguage}
          locale={locale}
          messages={messages}
        >
          <ModalProvider service={modalService}>
            <>
              <Normalize />
              <GlobalStyle />
              <RenderRoutes />
            </>
          </ModalProvider>
        </IntlProvider>
      )}
    </ThemeProvider>
  )
}

export default RootWrapper
