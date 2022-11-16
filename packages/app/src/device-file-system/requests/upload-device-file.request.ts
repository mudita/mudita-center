/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDeviceFileSystemRequest } from "App/device-file-system/constants"
import { UploadFile } from "App/device-file-system/dto"

export const uploadDeviceFile = async (
  payload: UploadFile
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(
    IpcDeviceFileSystemRequest.UploadFileToDevice,
    payload
  )
}
