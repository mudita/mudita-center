/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState } from "App/contacts/store/contacts"
import { resultStateSelector } from "App/contacts/selectors/result-state.selector"
import { ResultState } from "App/contacts/reducers"

describe("`resultStateSelector` selector", () => {
  test("when initial state is set selector returns Empty", () => {
    const state = {
      contacts: initialState,
    } as RootState & ReduxRootState
    expect(resultStateSelector(state)).toEqual(ResultState.Empty)
  })
})
