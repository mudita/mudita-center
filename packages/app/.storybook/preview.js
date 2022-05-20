/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import localeEn from "Renderer/locales/default/en-US.json"
import { IntlProvider } from "react-intl"
import translationConfig from "../src/translations.config.json"
import { init } from "@rematch/core"
import devMode from "App/dev-mode/store/dev-mode"
import selectPlugin from "@rematch/select"
import { Provider } from "react-redux"
import StorybookWrapper from "../src/renderer/components/storybook/storybook-wrapper.component"
import Modal from "react-modal"
Modal.setAppElement("#root")

try {
  require("Renderer/fonts/main/style.css")
} catch (e) {
  require("Renderer/fonts/fallback/style.css")
}

const store = init({
  models: { devMode },
  plugins: [selectPlugin()],
})

export const decorators = [
  (story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={translationConfig.defaultLanguage}
          locale={translationConfig.defaultLanguage}
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
