/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import {
  messagesReducer,
  MessagesState,
  ResultState,
  VisibilityFilter,
} from "App/messages/reducers"
import { searchValueSelector } from "App/messages/selectors/search-value.selector"

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

describe("`searchValueSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(messageState, {} as any),
    } as ReduxRootState
    expect(searchValueSelector(state)).toEqual(messageState.searchValue)
  })
})

