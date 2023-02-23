/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceManagerRequest } from "App/device-manager/constants"
import { Device } from "App/device/modules/device"

export const getCurrentDeviceRequest = async (): Promise<
  ResultObject<Device>
> => {
  return ipcRenderer.callMain(IpcDeviceManagerRequest.GetCurrentDevice)
}
