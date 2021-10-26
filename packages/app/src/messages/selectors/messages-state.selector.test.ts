/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { initialState, messagesReducer } from "App/messages/reducers"

describe("`messagesStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(messagesStateSelector(state)).toEqual(initialState)
  })
})
