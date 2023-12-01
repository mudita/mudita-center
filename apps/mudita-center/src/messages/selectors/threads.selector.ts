/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { Thread } from "App/messages/dto"
import { MessagesState } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const threadsSelector = createSelector<
  ReduxRootState,
  MessagesState,
  Thread[]
>(messagesStateSelector, ({ data: { threadMap } }) => {
  return Object.keys(threadMap).map((key) => threadMap[key])
})
