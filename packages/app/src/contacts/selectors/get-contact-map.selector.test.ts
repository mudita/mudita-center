/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { ContactsState } from "App/contacts/store/contacts.type"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { getContactMapSelector } from "App/contacts/selectors/get-contact-map.selector"

const contactState: ContactsState = {
  db: {},
  collection: [],
  resultsState: ResultsState.Empty,
}

describe("`getContactMapSelector` selector", () => {
  test("when initial state is set selector returns empty object as map", () => {
    const state = {
      contacts: contactState,
    } as RootState & ReduxRootState
    expect(getContactMapSelector(state)).toEqual({})
  })
})
