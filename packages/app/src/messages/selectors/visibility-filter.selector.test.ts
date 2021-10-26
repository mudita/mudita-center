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
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"

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

describe("`visibilityFilterSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(messageState, {} as any),
    } as ReduxRootState
    expect(visibilityFilterSelector(state)).toEqual(messageState.visibilityFilter)
  })
})

