/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { FileManagerServiceEvents } from "device/models"
import { ipcRenderer } from "electron-better-ipc"

export const readAndGetFileRequest = (
  filePath: string
): Promise<ResultObject<string>> => {
  return ipcRenderer.callMain(FileManagerServiceEvents.ReadAndGetFile, {
    filePath,
  })
}
