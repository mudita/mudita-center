/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { MessagesState } from "Core/messages/reducers"
import { Message } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants"
import { messagesStateSelector } from "Core/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { sortMessages } from "Core/messages/helpers/threads.helpers"

export const getActiveMessagesByThreadIdSelector = (
  threadId: string
): OutputSelector<
  ReduxRootState,
  Message[],
  (res: MessagesState) => Message[]
> => {
  return createSelector<ReduxRootState, MessagesState, Message[]>(
    messagesStateSelector,
    ({ data: { messageIdsInThreadMap, messageMap } }) => {
      const messageIds = messageIdsInThreadMap[threadId] ?? []
      const messages = messageIds
        .map((messageId) => messageMap[messageId])
        .filter((message: Message) => message.messageType !== MessageType.DRAFT)
      return sortMessages(messages)
    }
  )
}
