/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceLogEvent } from "Core/device-log/constants"
import { DeviceFilesOption } from "Core/device-file-system/types"
import { DeviceFile } from "Core/device-file-system/dto"

export const getDeviceLogFiles = async (
  options?: DeviceFilesOption
): Promise<ResultObject<DeviceFile[]>> =>
  ipcRenderer.callMain(IpcDeviceLogEvent.GetLog, options)
