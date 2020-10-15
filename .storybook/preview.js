import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import "Renderer/fonts/fonts.css"
import localeEn from "Renderer/locales/default/en-US.json"
import { IntlProvider } from "react-intl"
import { defaultLanguage } from "../src/translations.config.json"
import { init } from "@rematch/core"
import devMode from "Renderer/models/dev-mode/dev-mode"
import selectPlugin from "@rematch/select"
import { Provider } from "react-redux"
import StorybookWrapper from "../src/renderer/components/storybook/storybook-wrapper.component"

const store = init({ models: { devMode }, plugins: [selectPlugin()] })

export const decorators = [
  (story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={defaultLanguage}
          locale={defaultLanguage}
          messages={localeEn}
        >
          <>
            <GlobalStyle />
            <Normalize />
            <StorybookWrapper>{story()}</StorybookWrapper>
          </>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  ),
]
