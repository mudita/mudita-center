/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ContactsEvent {
  DevClearAllContacts = "CONTACTS_DEV_CLEAR_ALL_CONTACTS",
  LoadContacts = "CONTACTS_LOAD_CONTACTS",
  SetContacts = "CONTACTS_SET_CONTACTS",
  Authorize = "CONTACTS_AUTHORIZE",
  AddNewContact = "CONTACTS_ADD_NEW_CONTACT",
  AddNewContactToState = "CONTACTS_ADD_NEW_CONTACT_TO_STATE",
  EditContact = "CONTACTS_EDIT_CONTACT",
  EditContactInState = "CONTACTS_EDIT_CONTACT_IN_STATE",
}
