/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { addNewContactsToState } from "App/contacts/actions/base.action"
import { ContactsEvent } from "App/contacts/constants"
import { NewContact } from "App/contacts/reducers"
import { createContactRequest } from "App/contacts/requests"
import { AppError } from "App/core/errors"

export const createNewContact = createAsyncThunk<Error | undefined, NewContact>(
  ContactsEvent.AddNewContact,
  async (newContact, { dispatch, rejectWithValue }) => {
    const { data, error } = await createContactRequest(newContact)

    if (error || !data) {
      return rejectWithValue(
        new AppError(ContactsEvent.AddNewContact, "Add Contact request failed")
      )
    }

    dispatch(addNewContactsToState([data]))

    return
  }
)
