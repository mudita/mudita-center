/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceCommunicationError, IpcDeviceEvent } from "Core/device/constants"

export const unlockDeviceStatusRequest = async (): Promise<
  ResultObject<unknown, DeviceCommunicationError>
> => {
  return ipcRenderer.callMain(IpcDeviceEvent.UnlockStatus)
}
