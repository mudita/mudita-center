/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceInfoEvent } from "Core/device-info/constants"
import { DeviceInfo } from "Core/device-info/dto"

export const getDeviceInfoRequest = async (): Promise<
  ResultObject<DeviceInfo>
> => {
  return ipcRenderer.callMain(IpcDeviceInfoEvent.GetDeviceInfo)
}
