/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { editContactInState } from "App/contacts/actions/base.action"
import { ContactsEvent } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers"
import { editContactRequest } from "App/contacts/requests"
import { AppError } from "App/core/errors"

export const editContact = createAsyncThunk<Error | undefined, Contact>(
  ContactsEvent.EditContact,
  async (contact, { dispatch, rejectWithValue }) => {
    const { data, error } = await editContactRequest(contact)

    if (error || !data) {
      return rejectWithValue(
        new AppError(ContactsEvent.EditContact, "Edit Contact request failed")
      )
    }

    dispatch(editContactInState(data))

    return
  }
)
