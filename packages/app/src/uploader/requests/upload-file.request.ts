/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcUploader } from "App/uploader/constants"
import { ipcRenderer } from "electron-better-ipc"

export const uploadFileRequest = async (data: {
  fileName: string
  buffer: Uint8Array
  serialNumber: string
}): Promise<any> => {
  return ipcRenderer.callMain(IpcUploader.UploadFile, data)
}
