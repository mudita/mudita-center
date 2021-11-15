/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFileSystem } from "App/device-file-system/constants"
import DeviceResponse from "Backend/adapters/device-response.interface"

export const removeFileRequest = (filePath: string): Promise<DeviceResponse> =>
  ipcRenderer.callMain(IpcFileSystem.Remove, filePath)
