/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { initialState } from "App/contacts/store/contacts"
import { contactListSelector } from "App/contacts/selectors/contact-list.selector"

describe("`contactListSelector` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(contactListSelector(state)).toEqual([])
  })
})
