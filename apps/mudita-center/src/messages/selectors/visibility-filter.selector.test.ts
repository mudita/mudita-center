/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState, messagesReducer } from "App/messages/reducers"
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"

describe("`visibilityFilterSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(visibilityFilterSelector(state)).toEqual(
      initialState.data.visibilityFilter
    )
  })
})
