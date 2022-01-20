/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { Contact, ContactID } from "App/contacts/reducers"

export const setContacts = createAction<Contact[]>(ContactsEvent.SetContacts)

export const addNewContactsToState = createAction<Contact[]>(
  ContactsEvent.AddNewContactsToState
)

export const editContactInState = createAction<Contact>(
  ContactsEvent.EditContactInState
)

export const deleteContactsInState = createAction<ContactID[]>(
  ContactsEvent.DeleteContactsInState
)

export const devClearAllContacts = createAction(
  ContactsEvent.DevClearAllContacts
)
