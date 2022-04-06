/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactRequest } from "App/contacts/constants"
import { ContactID } from "App/contacts/reducers/contacts.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export const deleteContactsRequest = async (
  contactIds: ContactID[]
): Promise<RequestResponse<ContactID[]>> => {
  return await ipcRenderer.callMain(
    IpcContactRequest.DeleteContacts,
    contactIds
  )
}
