/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { EditContactError } from "App/contacts/errors/edit-contact.error"
import { editContactInState } from "App/contacts/actions/base.action"
import { Contact } from "App/contacts/reducers"
import editContactRequest from "Renderer/requests/edit-contact.request"

export const editContact = createAsyncThunk<Error | undefined, Contact>(
  ContactsEvent.AddNewContact,
  async (contact, { dispatch, rejectWithValue }) => {
    const { data, error } = await editContactRequest(contact)

    if (error || !data) {
      return rejectWithValue(
        new EditContactError("Edit Contact request failed")
      )
    }

    dispatch(editContactInState(data))

    return
  }
)
