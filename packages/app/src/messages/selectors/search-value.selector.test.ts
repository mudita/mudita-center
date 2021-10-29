/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { initialState, messagesReducer } from "App/messages/reducers"
import { searchValueSelector } from "App/messages/selectors/search-value.selector"

describe("`searchValueSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(searchValueSelector(state)).toEqual(initialState.searchValue)
  })
})
