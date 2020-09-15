import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Store } from "Renderer/store"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
import { ModalProvider } from "Renderer/components/core/modal/modal.service"
import modalService from "Renderer/components/core/modal/modal.service"
import HelpApp from "Renderer/wrappers/help-app.component"
import ErrorApp from "Renderer/wrappers/error-app.component"
import BaseApp from "Renderer/wrappers/base-app.component"
import { Mode } from "Common/enums/mode.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"

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

    return <BaseApp store={store} history={history} />
  }

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={LANGUAGE.default}
        locale={LANGUAGE.default}
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

export default RootWrapper
