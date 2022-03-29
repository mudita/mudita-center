/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFilesManagerRequest } from "App/files-manager/constants"
import { McUsbFile } from "App/mc-usb"

export const getFilesRequest = async (): Promise<McUsbFile[]> => {
  return ipcRenderer.callMain(IpcFilesManagerRequest.GetFiles)
}
