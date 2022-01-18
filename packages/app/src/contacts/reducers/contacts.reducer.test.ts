/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  contactsReducer,
  initialState,
} from "App/contacts/reducers/contacts.reducer"
import { ContactsEvent } from "App/contacts/constants"
import { ResultsState } from "App/contacts/reducers/contacts.interface"

describe("Clear All Contacts data functionality", () => {
  test("Event: DevClearAllContacts clear properly db, collection and resultsState", () => {
    expect(
      contactsReducer(
        {
          ...initialState,
        },
        { type: ContactsEvent.DevClearAllContacts }
      )
    ).toEqual({
      ...initialState,
      db: {},
      collection: [],
      resultsState: ResultsState.Empty,
    })
  })
})
