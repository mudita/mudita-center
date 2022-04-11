/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactRequest } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export const editContactRequest = (contact: Contact): Promise<RequestResponse<Contact>> => {
  return ipcRenderer.callMain(IpcContactRequest.EditContact, contact)
}
