/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { initialState, messagesReducer } from "App/messages/reducers"

describe("`messagesStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(messagesStateSelector(state)).toEqual(initialState)
  })
})
