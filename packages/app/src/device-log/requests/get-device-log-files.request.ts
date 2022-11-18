/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceLogRequest } from "App/device-log/constants"
import { DeviceFilesOption } from "App/device-file-system/types"
import { DeviceFile } from "App/device-file-system/dto"

export const getDeviceLogFiles = async (
  options?: DeviceFilesOption
): Promise<ResultObject<DeviceFile[]>> =>
  ipcRenderer.callMain(IpcDeviceLogRequest.GetLog, options)
