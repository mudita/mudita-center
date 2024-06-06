/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceEvent } from "Core/device/constants"
import { DeviceId } from "Core/device/constants/device-id"

export const unlockDeviceRequest = async (
  code: number[],
  deviceId?: DeviceId
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(IpcDeviceEvent.Unlock, { code, deviceId })
}
