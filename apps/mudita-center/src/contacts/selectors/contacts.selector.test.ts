/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState } from "App/contacts/reducers"
import { contactsSelector } from "App/contacts/selectors/contacts.selector"

describe("`contactsSelector` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(contactsSelector(state)).toEqual([])
  })
})
