/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDeviceFileSystem } from "App/device-file-system/constants"
import { RequestResponse } from "App/core/types/request-response.interface"

export const removeFileRequest = (filePath: string): Promise<RequestResponse> =>
  ipcRenderer.callMain(IpcDeviceFileSystem.Remove, filePath)
