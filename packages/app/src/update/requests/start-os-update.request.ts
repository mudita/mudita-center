/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceUpdateRequest } from "App/update/constants"
import { UpdateOS } from "App/update/dto"

export const startOsUpdate = async (
  payload: UpdateOS
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(IpcDeviceUpdateRequest.UpdateOS, payload)
}
