/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { isActiveDeviceSet } from "active-device-registry/feature"
import { deleteContactsInState } from "Core/contacts/actions/base.action"
import { ContactsEvent } from "Core/contacts/constants"
import { ContactID } from "Core/contacts/reducers"
import { deleteContactsRequest } from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const deleteContacts = createAsyncThunk<
  Error | undefined,
  ContactID[],
  { state: ReduxRootState }
>(
  ContactsEvent.DeleteContacts,
  async (ids, { dispatch, rejectWithValue, getState }) => {
    const { error } = await deleteContactsRequest(ids)
    const activeDeviceSet = isActiveDeviceSet(getState())

    if (!activeDeviceSet) {
      return
    }

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
