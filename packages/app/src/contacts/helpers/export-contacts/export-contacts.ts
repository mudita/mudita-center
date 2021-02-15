/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/store/contacts.type"

export const exportContacts = (contacts: Contact[]) => {
  return ipcRenderer.callMain(IpcRequest.ExportContacts, contacts)
}
