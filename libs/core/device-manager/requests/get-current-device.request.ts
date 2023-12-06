/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"
import { Device } from "Core/device/modules/device"

export const getCurrentDeviceRequest = async (): Promise<
  ResultObject<Device>
> => {
  return ipcRenderer.callMain(IpcDeviceManagerEvent.GetCurrentDevice)
}
