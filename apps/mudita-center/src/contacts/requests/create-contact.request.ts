/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactEvent } from "App/contacts/constants"
import { Contact, NewContact } from "App/contacts/reducers/contacts.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export const createContactRequest = async (
  newContact: NewContact
): Promise<RequestResponse<Contact>> => {
  return ipcRenderer.callMain(IpcContactEvent.CreateContact, newContact)
}
