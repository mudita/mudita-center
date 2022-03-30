/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "contact"

export enum IpcContactEvent {
  GetContacts = "get-contacts",
  AddContact = "add-contact",
  EditContact = "edit-contact",
  DeleteContacts = "delete-contacts",
}

export enum IpcContactRequest {
  GetContacts = "contact-get-contacts",
  AddContact = "contact-add-contact",
  EditContact = "contact-edit-contact",
  DeleteContacts = "contact-delete-contacts",
}
