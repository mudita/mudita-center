/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/reducers/contacts.interface"

export const exportContacts = (contacts: Contact[]): Promise<boolean> => {
  return ipcRenderer.callMain(IpcRequest.ExportContacts, contacts)
}
