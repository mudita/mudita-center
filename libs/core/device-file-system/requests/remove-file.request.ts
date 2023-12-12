/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceFileSystemEvent } from "Core/device-file-system/constants"

export const removeFileRequest = (
  filePath: string
): Promise<ResultObject<boolean>> =>
  ipcRenderer.callMain(IpcDeviceFileSystemEvent.RemoveDeviceFile, filePath)
