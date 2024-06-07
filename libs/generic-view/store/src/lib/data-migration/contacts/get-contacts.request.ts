/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/reducers"
import { RequestResponse } from "Core/core/types"
import { ipcRenderer } from "electron-better-ipc"
import { IpcContactEvent } from "Core/contacts/constants"
import { DeviceId } from "Core/device/constants/device-id"

export const getContactsRequest = async (
  deviceId: DeviceId
): Promise<RequestResponse<Contact>> => {
  return ipcRenderer.callMain(IpcContactEvent.GetContacts, deviceId)
}
