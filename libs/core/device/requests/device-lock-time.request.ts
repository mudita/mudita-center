/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceEvent } from "Core/device/constants"
import { PhoneLockTime } from "Core/device/dto"

export const deviceLockTimeRequest = async (): Promise<
  ResultObject<PhoneLockTime>
> => {
  return ipcRenderer.callMain(IpcDeviceEvent.LockTime)
}
