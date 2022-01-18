/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store"
import {
  ContactsState,
  ResultsState,
} from "App/contacts/reducers/contacts.interface"
import { ContactsEvent } from "App/contacts/constants"

export const initialState: ContactsState = {
  db: {},
  collection: [],
  resultsState: ResultsState.Empty,
}

export const contactsReducer = createReducer<ContactsState>(
  initialState,
  (builder) => {
    builder.addCase(
      pendingAction(ContactsEvent.DevClearAllContacts),
      (state) => {
        return {
          ...state,
          db: {},
          collection: [],
          resultsState: ResultsState.Empty,
        }
      }
    )
  }
)
