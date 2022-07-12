/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { MessageType } from "App/messages/constants"
import { Message } from "App/messages/dto"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"

export const getThreadDraftMessagesSelector = (threadId: string) =>
  createSelector(
    messagesStateSelector,
    ({ messageIdsInThreadMap, messageMap }) => {
      const messageIds = messageIdsInThreadMap[threadId] ?? []
      return messageIds
        .map((messageId) => messageMap[messageId])
        .find((message: Message) => message.messageType === MessageType.DRAFT)
    }
  )
