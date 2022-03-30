/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { initialState } from "App/contacts/reducers"
import { flatListSelector } from "App/contacts/selectors/flat-list.selector"

describe("`flatListSelector` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(flatListSelector(state)).toEqual([])
  })
})
