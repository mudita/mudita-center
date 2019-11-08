import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import * as React from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import Routes from "../routes"
import GlobalStyle from "../theming/global-style.component"
import theme from "../theming/theme"
import FunctionComponent from "../types/function-component.interface"

interface Props {
  store: any
  history: History
}

const RootContainer: FunctionComponent<Props> = ({ store, history }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyle />
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </>
    </ThemeProvider>
  )
}

export default RootContainer
