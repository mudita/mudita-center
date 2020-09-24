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

// https://github.com/formatjs/formatjs/issues/1467#issuecomment-543872950
let index = 0
export const textFormatters = {
  b: (str: string) => <strong key={`bold-${++index}`}>{str}</strong>,
  u: (str: string) => <u key={`underline-${++index}`}>{str}</u>,
  i: (str: string) => <em key={`italics-${++index}`}>{str}</em>,
  s: (str: string) => <s key={`strike-${++index}`}>{str}</s>,
}
