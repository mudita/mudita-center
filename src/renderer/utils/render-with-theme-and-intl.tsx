import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import React from "react"
import { IntlProvider } from "react-intl"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
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
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={LANGUAGE.default}
        locale={LANGUAGE.default}
        messages={localeEn}
      >
        {ui}
      </IntlProvider>
    </ThemeProvider>,
    // @ts-ignore
    options
  )
}

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function renderWithTheme<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult<Q>
export function renderWithTheme<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, "queries">
) {
  const originalConsoleError = console.error
  console.error = (...args: any) => {
    if (
      !(
        args[0].startsWith("[React Intl] Cannot format message:") ||
        args[0].startsWith("[React Intl] Missing message:")
      )
    ) {
      originalConsoleError.call(console, ...args)
    }
  }
  return render<Q>(
    <ThemeProvider theme={theme}>
      <IntlProvider locale={LANGUAGE.default}>{ui}</IntlProvider>
    </ThemeProvider>,
    // @ts-ignore
    options
  )
}
