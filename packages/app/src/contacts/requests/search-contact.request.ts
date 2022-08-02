/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcContactRequest } from "App/contacts/constants"
import { Contact } from "App/contacts/dto"
import { ipcRenderer } from "electron-better-ipc"

export const searchContactRequest = async (
  query: string
): Promise<Contact[]> => {
  return ipcRenderer.callMain(IpcContactRequest.SearchContacts, query)
}
