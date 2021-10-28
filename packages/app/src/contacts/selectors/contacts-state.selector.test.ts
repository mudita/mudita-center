/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { ContactsState } from "App/contacts/store/contacts.type"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { contactsStateSelector } from "App/contacts/selectors/contacts-state.selector"

const contactState: ContactsState = {
  db: {},
  collection: [],
  resultsState: ResultsState.Empty,
}

describe("`contactsStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      contacts: contactState,
    } as RootState & ReduxRootState
    expect(contactsStateSelector(state)).toEqual(contactState)
  })
})
