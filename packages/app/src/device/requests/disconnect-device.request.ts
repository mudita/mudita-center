/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceRequest } from "App/device/constants"

export const disconnectDeviceRequest = async (): Promise<
  ResultObject<boolean>
> => {
  return ipcRenderer.callMain(IpcDeviceRequest.Disconnect)
}
