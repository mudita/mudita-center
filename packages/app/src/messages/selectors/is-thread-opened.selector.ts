/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { MessagesState } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const isThreadOpenedSelector = (
  phoneNumberId: string
): OutputSelector<ReduxRootState, boolean, (res: MessagesState) => boolean> => {
  return createSelector<ReduxRootState, MessagesState, boolean>(
    messagesStateSelector,
    ({ data: { threadMap } }) => {
      const numberIds: string[] = Object.keys(threadMap).map(
        (key) => threadMap[key].phoneNumberId
      )
      return numberIds.some((numberId) => numberId === phoneNumberId)
    }
  )
}
