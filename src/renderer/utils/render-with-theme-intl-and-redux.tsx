import React from "react"
import { render } from "@testing-library/react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
import store from "Renderer/store"
import theme from "Renderer/styles/theming/theme"
import { ThemeProvider } from "styled-components"

export function renderWithThemeIntlAndRedux(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={LANGUAGE.default}
        locale={LANGUAGE.default}
        messages={localeEn}
      >
        <Provider store={store}>{ui}</Provider>
      </IntlProvider>
    </ThemeProvider>,
    // @ts-ignore
    options
  )
}
