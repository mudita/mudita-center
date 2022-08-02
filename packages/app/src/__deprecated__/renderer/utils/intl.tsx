/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { createIntl } from "react-intl"
import translationConfig from "App/translations.config.json"
import localeEn from "App/__deprecated__/renderer/locales/default/en-US.json"
import extractLanguageKeys from "App/__deprecated__/renderer/utils/extract-test-locale"

const testLocale = extractLanguageKeys(localeEn)

export const intl = createIntl({
  locale: translationConfig.defaultLanguage,
  messages: process.env.NODE_ENV === "test" ? testLocale : localeEn,
})

// https://github.com/formatjs/formatjs/issues/1467#issuecomment-543872950
let index = 0
export const textFormatters = {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  b: (str: string) => <strong key={`bold-${++index}`}>{str}</strong>,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  u: (str: string) => <u key={`underline-${++index}`}>{str}</u>,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  i: (str: string) => <em key={`italics-${++index}`}>{str}</em>,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  s: (str: string) => <s key={`strike-${++index}`}>{str}</s>,
}
