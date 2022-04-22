/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFilesManagerRequest } from "App/files-manager/constants"
import { McUsbFile, ObjectResult } from "@mudita/pure"

export const getFilesRequest = async (): Promise<ObjectResult<McUsbFile[]>> => {
  return ipcRenderer.callMain(IpcFilesManagerRequest.GetFiles)
}
