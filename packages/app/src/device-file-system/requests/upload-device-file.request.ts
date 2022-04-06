/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { UploadFileUIPayload } from "App/device-file-system/listeners/upload-device-file.listener"
import { IpcDeviceFileSystem } from "App/device-file-system"
import { RequestResponse } from "App/core/types/request-response.interface"

const uploadDeviceFile = async (
  payload: UploadFileUIPayload
): Promise<RequestResponse<RequestResponse>> => {
  return await ipcRenderer.callMain(
    IpcDeviceFileSystem.UploadDeviceFile,
    payload
  )
}

export default uploadDeviceFile
