/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactEvent } from "Core/contacts/constants"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { RequestResponse } from "Core/core/types/request-response.interface"

export const editContactRequest = (
  contact: Contact
): Promise<RequestResponse<Contact>> => {
  return ipcRenderer.callMain(IpcContactEvent.EditContact, contact)
}
