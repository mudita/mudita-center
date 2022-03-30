/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { AddNewContactError } from "App/contacts/errors/add-new-contact.error"
import { addNewContactsToState } from "App/contacts/actions/base.action"
import addContact from "App/contacts/requests/add-contact.request"
import { NewContact } from "App/contacts/reducers"

export const addNewContact = createAsyncThunk<Error | undefined, NewContact>(
  ContactsEvent.AddNewContact,
  async (newContact, { dispatch, rejectWithValue }) => {
    const { data, error } = await addContact(newContact)

    if (error || !data) {
      return rejectWithValue(
        new AddNewContactError("Add Contact request failed")
      )
    }

    dispatch(addNewContactsToState([data]))

    return
  }
)
