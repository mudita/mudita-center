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

interface Messages {
  id: keyof typeof enUS
}

export const defineMessages = intlDefineMessages as <
  K extends string,
  T = Messages,
  U = Record<K, T>,
>(
  messages: U
) => U
