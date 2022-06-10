/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import React from "react"
import { IntlProvider } from "react-intl"
import translationConfig from "App/translations.config.json"
import localeEn from "App/__deprecated__/renderer/locales/default/en-US.json"
import { ThemeProvider } from "styled-components"
import theme from "../styles/theming/theme"
import extractLanguageKeys from "App/__deprecated__/renderer/utils/extract-test-locale"
import ReactModal from "react-modal"

ReactModal.setAppElement(document.createElement("div"))
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
  return render(
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={process.env.NODE_ENV === "test" ? testLocale : localeEn}
      >
        {ui}
      </IntlProvider>
    </ThemeProvider>,
    // @ts-ignore
    options
  )
}
