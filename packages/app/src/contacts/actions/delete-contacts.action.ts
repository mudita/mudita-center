/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { DeleteContactsError } from "App/contacts/errors/delete-contacts.error"
import { deleteContactsInState } from "App/contacts/actions/base.action"
import { ContactID } from "App/contacts/reducers"
import deleteContactsRequest from "Renderer/requests/delete-contacts.request"

export const deleteContacts = createAsyncThunk<Error | undefined, ContactID[]>(
  ContactsEvent.DeleteContacts,
  async (ids, { dispatch, rejectWithValue }) => {
    const { data, error } = await deleteContactsRequest(ids)

    if (error || !data) {
      return rejectWithValue(
        new DeleteContactsError("Delete Contacts request failed")
      )
    }

    dispatch(deleteContactsInState(ids))

    return
  }
)
