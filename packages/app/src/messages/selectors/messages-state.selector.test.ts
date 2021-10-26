/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import {
  messagesReducer,
  MessagesState,
  ResultState,
  VisibilityFilter,
} from "App/messages/reducers"

const messageState: MessagesState = {
  threadMap: {},
  messageMap: {},
  messageIdsInThreadMap: {},
  searchValue: "",
  threadsState: ResultState.Empty,
  visibilityFilter: VisibilityFilter.All,
  messagesStateMap: {},
  error: null,
}

describe("`messagesStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      messages: messagesReducer(messageState, {} as any),
    } as ReduxRootState
    expect(messagesStateSelector(state)).toEqual(messageState)
  })
})
