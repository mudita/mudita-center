/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import React from "react"
import { IntlProvider } from "react-intl"
import { defaultLanguage } from "App/translations.config.json"
import localeEn from "Renderer/locales/default/en-US.json"
import { ThemeProvider } from "styled-components"
import theme from "../styles/theming/theme"
import extractLanguageKeys from "Renderer/utils/extract-test-locale"

const testLocale = extractLanguageKeys(localeEn)

export function renderWithThemeAndIntl(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function renderWithThemeAndIntl<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult
export function renderWithThemeAndIntl<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q>
): RenderResult {
  return render<Q>(
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={defaultLanguage}
        locale={defaultLanguage}
        messages={process.env.NODE_ENV === "test" ? testLocale : localeEn}
      >
        {ui}
      </IntlProvider>
    </ThemeProvider>,
    // @ts-ignore
    options
  )
}
