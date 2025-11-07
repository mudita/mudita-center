/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createIntl, defineMessages as intlDefineMessages } from "react-intl"
import enUS from "./locales/en-US.json"

const appIntl = createIntl({
  locale: "en-US",
  messages: enUS,
  defaultLocale: "en-US",
})

export const formatMessage = appIntl.formatMessage

const customIntl = createIntl({
  locale: "en-US",
  messages: {},
  defaultLocale: "en-US",
})

export const formatCustomMessage = (
  message: string,
  values: Parameters<typeof formatMessage>[1]
) => {
  return customIntl.formatMessage(
    { id: "undefined", defaultMessage: message },
    values
  )
}
formatCustomMessage.textFormatters = {
  b: (chunks: string[]) => <strong>{chunks}</strong>,
  i: (chunks: string[]) => <em>{chunks}</em>,
  u: (chunks: string[]) => <u>{chunks}</u>,
}

export interface Messages {
  id: keyof typeof enUS
}

export const defineMessages = intlDefineMessages as <
  K extends string,
  T extends Messages,
>(
  messages: Record<K, T>
) => Record<K, T>
