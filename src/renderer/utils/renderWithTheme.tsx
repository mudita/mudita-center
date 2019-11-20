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
  // @ts-ignore
  return render<Q>(
    <IntlProvider
      defaultLocale={LANGUAGE.default}
      locale={LANGUAGE.default}
      messages={localeEn}
    >
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </IntlProvider>,
    options
  )
}
