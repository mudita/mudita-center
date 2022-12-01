/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { ExportContactsResult } from "App/contacts/constants"

export const exportContacts = (
  contacts: Contact[]
): Promise<ExportContactsResult> => {
  return ipcRenderer.callMain(IpcRequest.ExportContacts, contacts)
}
