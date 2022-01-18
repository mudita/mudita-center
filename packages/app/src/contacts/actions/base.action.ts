/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers"

export const setContacts = createAction<Contact[]>(ContactsEvent.SetContacts)

export const addNewContactToState = createAction<Contact>(
  ContactsEvent.AddNewContactToState
)
export const editContactInState = createAction<Contact>(
  ContactsEvent.EditContactInState
)

export const devClearAllContacts = createAction(
  ContactsEvent.DevClearAllContacts
)
