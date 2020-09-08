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
import BaseApp from "Renderer/wrappers/base-app.component"
import { Mode } from "Common/enums/mode.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { useEffect, useState } from "react"
import {
  TranslationEventResponse,
  TranslationEvents,
} from "App/main/functions/register-translation-listener.types"

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

  /**
   * Get translations from store
   */
  const [messages, setMessages] = useState<Record<string, string>>()
  const [locale, setLocale] = useState<string>(defaultLanguage)

  useEffect(() => {
    ;(async () => {
      const { store, language } = (await ipcRenderer.callMain(
        TranslationEvents.Get
      ))
      setMessages(store)
      setLocale(language)
    })()
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
              {params.get("mode") === Mode.Help ? (
                <HelpApp
                  history={history}
                  saveToStore={saveToStore}
                  getStoreData={getStoreData}
                />
              ) : (
                <BaseApp store={store} history={history} />
              )}
            </>
          </ModalProvider>
        </IntlProvider>
      )}
    </ThemeProvider>
  )
}

export default RootWrapper
