/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceFileSystemEvent } from "Core/device-file-system/constants"
import { UploadFile } from "Core/device-file-system/dto"

export const uploadDeviceFile = async (
  payload: UploadFile
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(
    IpcDeviceFileSystemEvent.UploadFileToDevice,
    payload
  )
}
