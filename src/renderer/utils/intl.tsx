import React from "react"
import { createIntl } from "react-intl"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"
import extractLanguageKeys from "Renderer/utils/extract-test-locale"

const testLocale = extractLanguageKeys(localeEn)

export const intl = createIntl({
  locale: LANGUAGE.default,
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
