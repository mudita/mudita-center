/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import { IntlProvider } from "react-intl"
import { init } from "@rematch/core"
import { Provider } from "react-redux"
import Modal from "react-modal"
import selectPlugin from "@rematch/select"
import GlobalStyle from "App/__deprecated__/renderer/styles/global-style.component"
import theme from "App/__deprecated__/renderer/styles/theming/theme"
import localeEn from "App/__deprecated__/renderer/locales/default/en-US.json"
import translationConfig from "../src/translations.config.json"
import devMode from "App/__deprecated__/dev-mode/store/dev-mode"
import StorybookWrapper from "../src/__deprecated__/renderer/components/storybook/storybook-wrapper.component"
Modal.setAppElement("#root")

try {
  require("App/__deprecated__/renderer/fonts/main/style.css")
} catch (e) {
  require("App/__deprecated__/renderer/fonts/fallback/style.css")
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
