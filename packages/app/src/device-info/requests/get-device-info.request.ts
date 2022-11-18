/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceInfoRequest } from "App/device-info/constants"
import { DeviceInfo } from "App/device-info/dto"

export const getDeviceInfoRequest = async (): Promise<
  ResultObject<DeviceInfo>
> => {
  return ipcRenderer.callMain(IpcDeviceInfoRequest.GetDeviceInfo)
}
