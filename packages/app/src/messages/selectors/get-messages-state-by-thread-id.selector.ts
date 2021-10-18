/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { MessagesState, ResultState } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Renderer/store"

export const getMessagesStateByThreadIdSelector = (
  threadId: string
): OutputSelector<
  ReduxRootState,
  ResultState,
  (res: MessagesState) => ResultState
> => {
  return createSelector<ReduxRootState, MessagesState, ResultState>(
    messagesStateSelector,
    ({ messagesStateMap }) => {
      return messagesStateMap[threadId] ?? ResultState.Empty
    }
  )
}
