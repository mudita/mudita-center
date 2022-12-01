/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceFileSystemRequest } from "App/device-file-system/constants"
import { UploadFileLocally, DeviceFile } from "App/device-file-system/dto"

export const uploadDeviceFileLocally = async (
  payload: UploadFileLocally
): Promise<ResultObject<DeviceFile>> => {
  return ipcRenderer.callMain(
    IpcDeviceFileSystemRequest.UploadFileLocally,
    payload
  )
}
