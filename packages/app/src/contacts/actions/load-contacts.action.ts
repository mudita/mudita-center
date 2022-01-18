/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import getContacts from "Renderer/requests/get-contacts.request"
import { LoadContactsError } from "App/contacts/errors"
import { setContacts } from "App/contacts/actions/base.action"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export const loadContacts = createAsyncThunk(
  ContactsEvent.LoadContacts,
  async (_, { dispatch, rejectWithValue }) => {
    const { data = [], status } = await getContacts()

    if (status === DeviceResponseStatus.Error) {
      return rejectWithValue(
        new LoadContactsError("Get Contacts request failed")
      )
    }

    dispatch(setContacts(data))

    return
  }
)
