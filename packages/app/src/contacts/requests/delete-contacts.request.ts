/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactRequest } from "App/contacts/constants"
import { ContactID } from "App/contacts/reducers/contacts.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const deleteContacts = async (
  contactIds: ContactID[]
): Promise<DeviceResponse<ContactID[]>> => {
  return await ipcRenderer.callMain(IpcContactRequest.DeleteContacts, contactIds)
}

export default deleteContacts
