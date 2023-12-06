/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { addNewContactsToState } from "Core/contacts/actions/base.action"
import { ContactsEvent } from "Core/contacts/constants"
import { NewContact } from "Core/contacts/reducers"
import { createContactRequest } from "Core/contacts/requests"
import { AppError } from "Core/core/errors"

export const createNewContact = createAsyncThunk<Error | undefined, NewContact>(
  ContactsEvent.AddNewContact,
  async (newContact, { dispatch, rejectWithValue }) => {
    const { data, error } = await createContactRequest(newContact)

    if (error || !data) {
      return rejectWithValue(
        new AppError(
          ContactsEvent.AddNewContact,
          error?.message ?? "Add Contact request failed",
          error?.data
        )
      )
    }

    dispatch(addNewContactsToState([data]))

    return
  }
)
