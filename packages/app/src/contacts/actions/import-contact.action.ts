/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import createContactRequest from "App/contacts/requests/create-contact.request"
import { Contact, NewContact } from "App/contacts/reducers"
import editContact from "App/contacts/requests/edit-contact.request"
import { ImportContactError } from "App/contacts/errors/import-contact.error"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const importContact = createAsyncThunk<Error | Contact, NewContact>(
  ContactsEvent.ImportContact,
  async (newContact, { rejectWithValue }) => {
    const { data, error, status } = await createContactRequest(newContact)

    // Skipping 409 (Conflict) status code for preventing displaying error about duplicated
    if (status === RequestResponseStatus.Duplicated) {
      const contact = {
        ...newContact,
        id: String(error!.data.id),
      } as Contact
      const response = await editContact(contact)
      return response.data ?? contact
    }

    if (error || !data) {
      return rejectWithValue(
        new ImportContactError("Import Contact request failed")
      )
    }

    return data
  }
)
