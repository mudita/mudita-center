/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceId } from "Core/device/constants/device-id"

export const setActiveDeviceRequest = async (id: DeviceId): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(IpcDeviceManagerEvent.SetActiveDevice, id)
}
