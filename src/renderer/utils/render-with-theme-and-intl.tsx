import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import React from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
import store from "Renderer/store"
import { ThemeProvider } from "styled-components"
import theme from "../styles/theming/theme"

export function renderWithThemeAndIntl(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function renderWithThemeAndIntl<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult<Q>
export function renderWithThemeAndIntl<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, "queries">
) {
  return render<Q>(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={LANGUAGE.default}
          locale={LANGUAGE.default}
          messages={localeEn}
        >
          {ui}
        </IntlProvider>
      </ThemeProvider>
    </Provider>,
    // @ts-ignore
    options
  )
}
