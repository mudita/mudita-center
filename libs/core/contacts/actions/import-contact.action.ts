/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "Core/contacts/constants"
import { Contact, NewContact } from "Core/contacts/reducers"
import {
  createContactRequest,
  editContactRequest,
} from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export interface ImportContactArg {
  newContact: NewContact
  activeDeviceId?: string
}
export const importContact = createAsyncThunk<
  Error | Contact,
  ImportContactArg,
  { state: ReduxRootState }
>(
  ContactsEvent.ImportContact,
  async ({ newContact, activeDeviceId }, { rejectWithValue, getState }) => {
    const currentActiveDeviceId = activeDeviceIdSelector(getState())

    if (
      activeDeviceId === undefined ||
      activeDeviceId !== currentActiveDeviceId
    ) {
      return rejectWithValue(
        new AppError(RequestResponseStatus.InternalServerError, "")
      )
    }

    const { data, error, status } = await createContactRequest(newContact)

    // Skipping 409 (Conflict) status code for preventing displaying error about duplicated
    if (status === RequestResponseStatus.Duplicated) {
      const contact = {
        ...newContact,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion
        id: String(error!.data.id),
      } as Contact
      const response = await editContactRequest(contact)
      return response.data ?? contact
    }

    if (status === RequestResponseStatus.InternalServerError) {
      return rejectWithValue(
        new AppError(RequestResponseStatus.InternalServerError, "")
      )
    }

    if (error || !data) {
      return rejectWithValue(
        new AppError(
          ContactsEvent.ImportContact,
          "Import Contact request failed"
        )
      )
    }

    return data
  }
)
