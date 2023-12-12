/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { MessagesState } from "Core/messages/reducers"
import { ResultState } from "Core/messages/constants"
import { messagesStateSelector } from "Core/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getMessagesStateByThreadIdSelector = (
  threadId: string
): OutputSelector<
  ReduxRootState,
  ResultState,
  (res: MessagesState) => ResultState
> => {
  return createSelector<ReduxRootState, MessagesState, ResultState>(
    messagesStateSelector,
    ({ data: { messagesStateMap } }) => {
      return messagesStateMap[threadId] ?? ResultState.Empty
    }
  )
}
