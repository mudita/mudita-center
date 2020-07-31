import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Route, Router, Switch } from "react-router"
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
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { URL_MAIN } from "Renderer/constants/urls"
import Answer from "Renderer/modules/help/answer.component"
import Help from "Renderer/modules/help/help.container"

interface Props {
  store: Store
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ store, history }) => {
  const mode = window.location.search
  const baseApp = (
    <Provider store={store}>
      <NetworkStatusChecker />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )

  const helpApp = (
    <Router history={history}>
      <Switch>
        <Route path={`${URL_MAIN.help}/:questionId`} component={Answer} />
        <Route path={URL_MAIN.help} component={Help} />
      </Switch>
    </Router>
  )
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
            {mode === "?help" ? helpApp : baseApp}
          </>
        </ModalProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default RootWrapper
