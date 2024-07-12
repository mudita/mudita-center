/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceCommunicationError } from "core-device/models"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceEvent } from "Core/device/constants"
import { DeviceId } from "Core/device/constants/device-id"

export const unlockDeviceStatusRequest = async (
  deviceId?: DeviceId
): Promise<ResultObject<unknown, DeviceCommunicationError>> => {
  return ipcRenderer.callMain(IpcDeviceEvent.UnlockStatus, deviceId)
}
