/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "contact"

export enum IpcContactEvent {
  CreateContact = "create-contact",
  EditContact = "edit-contact",
  DeleteContacts = "delete-contacts",
}

export enum IpcContactRequest {
  CreateContact = "contact-create-contact",
  EditContact = "contact-edit-contact",
  DeleteContacts = "contact-delete-contacts",
}
