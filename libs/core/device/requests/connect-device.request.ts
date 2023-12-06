/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceEvent } from "Core/device/constants"
import { Device } from "Core/device/modules/device"

export const connectDeviceRequest = async (): Promise<ResultObject<Device>> => {
  return ipcRenderer.callMain(IpcDeviceEvent.Connect)
}
