/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState } from "App/contacts/store/contacts"
import { speedDialChosenListSelector } from "App/contacts/selectors/speed-dial-chosen-list.selector"

describe("`speedDialChosenListSelector` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      contacts: initialState,
    } as RootState & ReduxRootState
    expect(speedDialChosenListSelector(state)).toEqual([])
  })
})
