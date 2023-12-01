/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceEvent } from "App/device/constants"

export const unlockDeviceRequest = async (
  code: number[]
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(IpcDeviceEvent.Unlock, code)
}
