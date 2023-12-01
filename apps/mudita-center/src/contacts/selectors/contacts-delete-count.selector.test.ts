/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { getContactsDeleteCountSelector } from "./contacts-delete-count.selector"
import { initialState } from "App/contacts/reducers"

describe("`getContactsDeleteCount` selector", () => {
  test("when initial state is set selector returns 0", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(getContactsDeleteCountSelector(state)).toEqual(0)
  })
})
