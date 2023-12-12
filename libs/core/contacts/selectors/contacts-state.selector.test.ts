/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { contactsStateSelector } from "Core/contacts/selectors/contacts-state.selector"
import { initialState } from "Core/contacts/reducers"

describe("`contactsStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(contactsStateSelector(state)).toEqual(initialState)
  })
})
