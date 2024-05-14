/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { ApiContactsServiceEvents } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

// WARNING: FOR DEVELOPMENT PURPOSES ONLY
export const deleteAllContactsRequest = (
  deviceId?: DeviceId
): Promise<ResultObject<undefined>> => {
  return ipcRenderer.callMain(ApiContactsServiceEvents.DeleteAllContacts, {
    deviceId,
  })
}
