/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import {
  IpcDeviceUpdateEvent,
  UpdateErrorServiceErrors,
} from "Core/update/constants"
import { UpdateOS } from "Core/update/dto"

export const startOsUpdate = async (
  payload: UpdateOS
): Promise<ResultObject<boolean, UpdateErrorServiceErrors>> => {
  return ipcRenderer.callMain(IpcDeviceUpdateEvent.UpdateOS, payload)
}
