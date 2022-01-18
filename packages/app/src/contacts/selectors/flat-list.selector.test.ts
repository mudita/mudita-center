/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState } from "App/contacts/store/contacts"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"

describe("`flatListSelector` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      contacts: initialState,
    } as RootState & ReduxRootState
    expect(flatListSelector(state)).toEqual([])
  })
})
