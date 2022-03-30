/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcContactRequest } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers/contacts.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getContacts = async (): Promise<DeviceResponse<Contact[]>> => {
  return ipcRenderer.callMain(IpcContactRequest.GetContacts)
}

export default getContacts
