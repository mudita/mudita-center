/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { initialState, messagesReducer } from "App/messages/reducers"
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"

describe("`visibilityFilterSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(visibilityFilterSelector(state)).toEqual(
      initialState.visibilityFilter
    )
  })
})
