/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"

export const mockDefineMessages = (id = "module.news") => {
  const messages = defineMessages({
    exampleMessage: { id },
  })
  return messages.exampleMessage
}
