/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { Message, MessagesState } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Renderer/store"
import { sortMessages } from "App/messages/helpers/threads.helpers"

export const getMessagesByThreadIdSelector = (
  threadId: string
): OutputSelector<
  ReduxRootState,
  Message[],
  (res: MessagesState) => Message[]
> => {
  return createSelector<ReduxRootState, MessagesState, Message[]>(
    messagesStateSelector,
    ({ messageIdsInThreadMap, messageMap }) => {
      const messageIds = messageIdsInThreadMap[threadId] ?? []
      const messages = messageIds.map((messageId) => messageMap[messageId])
      return sortMessages(messages)
    }
  )
}
