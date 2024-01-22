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
import ReactModal from "react-modal"
import { ThemeProvider } from "styled-components"
import { IntlProvider } from "react-intl"
import translationConfig from "App/translations.config.json"
import localeEn from "Core/__deprecated__/renderer/locales/default/en-US.json"
import extractLanguageKeys from "Core/__deprecated__/renderer/utils/extract-test-locale"
import theme from "Core/core/styles/theming/theme"

ReactModal.setAppElement(document.createElement("div"))
const testLocale = extractLanguageKeys(localeEn)

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function constructWrapper(ui: React.ReactElement) {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={process.env.NODE_ENV === "test" ? testLocale : localeEn}
      >
        {ui}
      </IntlProvider>
    </ThemeProvider>
  )
}

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
    constructWrapper(ui),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options
  )
}
