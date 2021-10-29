/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { MessagesState } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Renderer/store"

export const isThreadOpenedSelector = (
  phoneNumber: string
): OutputSelector<ReduxRootState, boolean, (res: MessagesState) => boolean> => {
  return createSelector<ReduxRootState, MessagesState, boolean>(
    messagesStateSelector,
    ({ threadMap }) => {
      const numbers: string[] = Object.keys(threadMap).map(
        (key) => threadMap[key].phoneNumber
      )
      return numbers.some((number) => number === phoneNumber)
    }
  )
}
