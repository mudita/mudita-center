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
import { addNewPhoneNumbersToState } from "App/phone-numbers/actions/add-new-phone-numbers-to-state.action"

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
    const phoneNumberIds = [
      data.primaryPhoneNumberId,
      data.secondaryPhoneNumberId,
    ].filter((id = "") => id !== "")
    await dispatch(addNewPhoneNumbersToState(phoneNumberIds as string[]))

    dispatch(addNewContactsToState([data]))

    return
  }
)
