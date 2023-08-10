/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import {
  IpcDeviceUpdateRequest,
  UpdateErrorServiceErrors,
} from "App/update/constants"

export const checkUpdate = async (): Promise<
  ResultObject<boolean, UpdateErrorServiceErrors>
> => {
  return ipcRenderer.callMain(IpcDeviceUpdateRequest.CheckUpdate)
}
