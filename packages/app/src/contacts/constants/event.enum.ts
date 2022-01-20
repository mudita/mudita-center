/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ContactsEvent {
  DevClearAllContacts = "CONTACTS_DEV_CLEAR_ALL_CONTACTS",
  SetContacts = "CONTACTS_SET_CONTACTS",
  Authorize = "CONTACTS_AUTHORIZE",
  AddNewContact = "CONTACTS_ADD_NEW_CONTACT",
  ImportContact = "CONTACTS_IMPORT_CONTACT",
  DeleteContacts = "CONTACTS_DELETE_CONTACTS",
  AddNewContactsToState = "CONTACTS_ADD_NEW_CONTACTS_TO_STATE",
  EditContact = "CONTACTS_EDIT_CONTACT",
  EditContactInState = "CONTACTS_EDIT_CONTACT_IN_STATE",
  DeleteContactsInState = "CONTACTS_DELETE_CONTACTS_IN_STATE",
}
