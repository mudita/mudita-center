/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteContactsInState } from "App/contacts/actions/base.action"
import { ContactsEvent } from "App/contacts/constants"
import { ContactID } from "App/contacts/reducers"
import { deleteContactsRequest } from "App/contacts/requests"
import { AppError } from "App/core/errors"

export const deleteContacts = createAsyncThunk<Error | undefined, ContactID[]>(
  ContactsEvent.DeleteContacts,
  async (ids, { dispatch, rejectWithValue }) => {
    const { error } = await deleteContactsRequest(ids)

    if (error && error.data === undefined) {
      return rejectWithValue(
        new AppError(
          ContactsEvent.DeleteContacts,
          "Delete Contacts request failed"
        )
      )
    }

    if (error && error.data !== undefined) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const successIds = ids.filter((id) => error.data.includes(id))
      dispatch(deleteContactsInState(successIds))

      return
    }

    dispatch(deleteContactsInState(ids))

    return
  }
)
