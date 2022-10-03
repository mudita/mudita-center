/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  deletedThread: { id: "module.messages.deletedThread" },
  deletedThreads: { id: "module.messages.deletedThreads" },
})

export const getDeletedThreadText = (
  deletedThreadsLength: number
): TranslationMessage => {
  if (deletedThreadsLength === 1) {
    return {
      ...messages.deletedThread,
    }
  } else {
    return {
      ...messages.deletedThreads,
      values: {
        number: deletedThreadsLength,
      },
    }
  }
}
