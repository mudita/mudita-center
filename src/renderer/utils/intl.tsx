import React from "react"
import { createIntl } from "react-intl"
import { defaultLanguage } from "App/translations.config.json"
import localeEn from "Renderer/locales/default/en-US.json"
import extractLanguageKeys from "Renderer/utils/extract-test-locale"

const testLocale = extractLanguageKeys(localeEn)

export const intl = createIntl({
  locale: defaultLanguage,
  messages: process.env.NODE_ENV === "test" ? testLocale : localeEn,
})

export const textFormatters = {
  b: (str: string) => <strong>{str}</strong>,
  u: (str: string) => <u>{str}</u>,
  i: (str: string) => <em>{str}</em>,
  s: (str: string) => <s>{str}</s>,
}
