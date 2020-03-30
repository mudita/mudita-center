import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { Store } from "Renderer/store"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"

import BaseRoutes from "Renderer/routes/base-routes"

import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import FunctionComponent from "Renderer/types/function-component.interface"

import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
import { ModalProvider } from "Renderer/components/core/modal/modal.service"
import modalService from "Renderer/components/core/modal/modal.service"

require("dotenv").config()

interface Props {
  store: Store
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ store, history }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider service={modalService}>
        <>
          <Normalize />
          <GlobalStyle />
          <Provider store={store}>
            <IntlProvider
              defaultLocale={LANGUAGE.default}
              locale={LANGUAGE.default}
              messages={localeEn}
            >
              <Router history={history}>
                <BaseRoutes />
              </Router>
            </IntlProvider>
          </Provider>
        </>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default RootWrapper
