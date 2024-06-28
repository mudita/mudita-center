/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { OpenDialogOptions } from "electron"
import { FileDialogServiceEvents } from "system-utils/models"
import { ResultObject } from "Core/core/builder"

export const openFileRequest = (
  options: OpenDialogOptions
): Promise<ResultObject<string[]>> => {
  return ipcRenderer.callMain(FileDialogServiceEvents.OpenFile, {
    options,
  })
}
